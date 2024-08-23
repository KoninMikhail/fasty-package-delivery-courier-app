import { Button, Divider, Spacer } from '@nextui-org/react';
import { RiWifiOffFill } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';
import { useUnit } from 'effector-react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import clsx from 'clsx';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { sharedServicesSubway } from '@/shared/services';
import {
    getDeliveryAddress,
    getDeliveryContents,
    getDeliveryCoordinates,
    getDeliveryId,
    getDeliveryMetro,
    getDeliveryPickupDateTime,
} from '@/entities/delivery';
import { MdOutlineLocationSearching } from 'react-icons/md';
import { sharedConfigRoutes } from '@/shared/config';
import { useNavigate } from 'react-router-dom';
import { $isOnline } from '@/widgets/deliveries/market/model';
import { $myDeliveriesStore } from '@/widgets/deliveries/myDeliveries/model/stores';
import {
    DEFAULT_MAP_CENTER,
    DEFAULT_MAP_ZOOM,
    ERROR_NO_INTERNET_TEXT_KEY,
    translationNS,
} from '../../config';

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

const { SubwayStationWithIcon } = sharedServicesSubway;
const { RouteName } = sharedConfigRoutes;
const { DELIVERIES } = RouteName;

const OfflinePlaceholder: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return (
        <div className="block h-full w-full p-4">
            <div className="flex h-full w-full flex-col items-center justify-center">
                <RiWifiOffFill className="text-8xl text-content3" />
                <Spacer y={3} />
                <div>
                    <span className="text-center text-lg text-content3">
                        {t(ERROR_NO_INTERNET_TEXT_KEY)}
                    </span>
                </div>
            </div>
        </div>
    );
};

const MapControls: FunctionComponent = () => {
    const map = useMap();
    const onClickReturnToTarget = (): void => {
        map.flyTo(DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM);
    };

    const onClickZoomIn = (): void => {
        map.zoomIn();
    };

    const onClickZoomOut = (): void => {
        map.zoomOut();
    };

    return (
        <div
            className={clsx(
                'absolute right-0 top-1/2 z-[5000] flex -translate-x-1/2 -translate-y-1/2 transform flex-col gap-2',
                'rounded-2xl bg-background p-2 shadow-md',
            )}
        >
            <Button
                className="z-[6000] rounded-xl"
                onPress={onClickReturnToTarget}
                isIconOnly
            >
                <MdOutlineLocationSearching />
            </Button>
            <Button
                color="primary"
                variant="flat"
                className="z-[6000] rounded-xl"
                onPress={onClickZoomIn}
                isIconOnly
            >
                <FaPlus />
            </Button>
            <Button
                color="primary"
                variant="flat"
                className="z-[6000] rounded-xl"
                onPress={onClickZoomOut}
                isIconOnly
            >
                <FaMinus />
            </Button>
        </div>
    );
};

const Map: FunctionComponent = () => {
    const deliveries = useUnit($myDeliveriesStore);
    const navigate = useNavigate();
    return (
        <MapContainer
            center={DEFAULT_MAP_CENTER}
            zoom={DEFAULT_MAP_ZOOM}
            scrollWheelZoom={false}
            className="h-full w-full"
            attributionControl={false}
            zoomControl={false}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {deliveries.map((delivery) => {
                const address = getDeliveryAddress(delivery);
                const id = getDeliveryId(delivery);
                const contents = getDeliveryContents(delivery);
                const station = getDeliveryMetro(delivery);
                const pickupDateTime = getDeliveryPickupDateTime(
                    delivery,
                    true,
                    true,
                );

                const coordinates = getDeliveryCoordinates(delivery);

                const onPressDetailsPageLink = (): void =>
                    navigate(`${DELIVERIES}/${id}`);

                return (
                    <Marker
                        key={delivery.id}
                        position={{
                            lat: Number.parseInt(coordinates?.lat ?? '0', 10),
                            lng: Number.parseInt(coordinates?.lng ?? '0', 10),
                        }}
                    >
                        <Popup autoPan minWidth={300}>
                            <div className="font-serif font- relative flex w-[300px] flex-col gap-1">
                                <div className="!font-4xl font-bold">
                                    Доставка: {id}
                                </div>
                                <Divider className="my-1 invert" />
                                <div>
                                    <div>Груз:</div>
                                    <div>{contents}</div>
                                </div>
                                <div>
                                    <div>Метро:</div>
                                    <div>
                                        <SubwayStationWithIcon
                                            value={station}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div>Адрес:</div>
                                    <div>{address}</div>
                                </div>
                                <div>
                                    <div>Время:</div>
                                    <div>{pickupDateTime}</div>
                                </div>
                                <Divider className="my-1 invert" />
                                <Button
                                    onPress={onPressDetailsPageLink}
                                    size="sm"
                                >
                                    Посмотреть
                                </Button>
                            </div>
                        </Popup>
                    </Marker>
                );
            })}
            <MapControls />
        </MapContainer>
    );
};

interface MyDeliveriesMapProperties {
    classNames?: {
        cardsRow?: string;
    };
}
export const MyDeliveriesMap: FunctionComponent<MyDeliveriesMapProperties> = ({
    classNames,
}) => {
    const online = useUnit($isOnline);
    return online ? <Map /> : <OfflinePlaceholder />;
};
