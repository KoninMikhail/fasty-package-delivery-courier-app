import { Modal, ModalContent, Spacer, useDisclosure } from '@nextui-org/react';
import { RiWifiOffFill } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';
import { useList, useUnit } from 'effector-react';
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    ZoomControl,
} from 'react-leaflet';
import { HorizontalScroll } from '@/shared/ui/layouts';
import { DeliveryMapCard } from '@/entities/delivery';
import { sessionModel } from '@/entities/viewer';
import {
    DEFAULT_MAP_CENTER,
    DEFAULT_MAP_ZOOM,
    ERROR_NO_INTERNET_TEXT_KEY,
    translationNS,
    WIDGET_MAP_TITLE_KEY,
} from '../../config';
import { $$deliveriesMarkers } from '../../model/deliveriesMapMarkers';
import { $deliveriesStore } from '../../model/deliveriesStore';

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

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

const Map: FunctionComponent = () => {
    const markers = useUnit($$deliveriesMarkers);
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
            {markers.map((marker, index) => (
                <Marker key={index} position={marker}>
                    <Popup>маркер</Popup>
                </Marker>
            ))}
            <ZoomControl position="topleft" />
        </MapContainer>
    );
};

const CardsRow: FunctionComponent = () => {
    const deliveries = useList($deliveriesStore, (delivery) => (
        <DeliveryMapCard delivery={delivery} />
    ));

    return (
        <HorizontalScroll>
            <div className="flex flex-row flex-nowrap gap-4  px-4">
                {deliveries}
            </div>
        </HorizontalScroll>
    );
};

export const MyDeliveriesMapPopup: FunctionComponent = () => {
    const online = useUnit(sessionModel.$$isOnline);
    const { t } = useTranslation(translationNS);
    const { isOpen, onOpen: onMapClick, onClose } = useDisclosure();

    return (
        <>
            <div
                className="w-full rounded-t-3xl bg-map-light bg-center dark:bg-map-dark"
                onClick={onMapClick}
            >
                <div className="w-full pb-28 pt-8 text-center">
                    {t(WIDGET_MAP_TITLE_KEY)}
                </div>
            </div>
            <Modal
                size="full"
                isOpen={isOpen}
                onClose={onClose}
                classNames={{
                    closeButton: 'z-[5000]',
                }}
            >
                <ModalContent>
                    {online ? (
                        <div className="relative h-full w-full">
                            <div className="absolute -bottom-[30px] z-[6000] h-40 w-full py-4 text-red-600">
                                <CardsRow />
                            </div>
                            <Map />
                        </div>
                    ) : (
                        <OfflinePlaceholder />
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};
