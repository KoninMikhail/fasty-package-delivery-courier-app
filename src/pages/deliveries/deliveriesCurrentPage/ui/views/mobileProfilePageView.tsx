import { PropsWithChildren, useEffect } from 'react';

import { widgetInProgressDeliveriesUi } from '@/widgets/deliveries/in-progress-deliveries';
import { widgetNavbarMobileUi } from '@/widgets/layout/navbar-mobile';
import { widgetAccountDeliveriesMapUi } from '@/widgets/deliveries/account-deliveries-map';
import { sharedUiComponents } from '@/shared/ui';
import { viewerUi } from '@/entities/viewer';
import { useScroll } from 'framer-motion';
import { apiClient } from '@/shared/api';

const { Authorized } = viewerUi;
const { InProgressDeliveriesList } = widgetInProgressDeliveriesUi;
const { AccountDeliveriesMap } = widgetAccountDeliveriesMapUi;
const { NavbarMobile } = widgetNavbarMobileUi;
const { Heading, Text, NativeScroll } = sharedUiComponents;

const Wrapper: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="mx-auto h-full w-full flex-col rounded-t-3xl pb-24 lg:w-[750px]">
        {children}
    </div>
);

const FilterSection: FunctionComponent = () => <div className="">фильтры</div>;

const DeliveriesSection: FunctionComponent<PropsWithChildren> = ({
    children,
}) => <div className="-mt-4 rounded-t-2xl bg-background p-2">{children}</div>;

const MapSection: FunctionComponent = () => (
    <div className="flex h-36 items-center justify-center rounded-t-2xl bg-amber-200">
        карта
    </div>
);

const Header: FunctionComponent = () => {
    const { scrollY, scrollYProgress } = useScroll();
    return (
        <header className="max-w-full gap-4 bg-black px-4 pb-12 pt-6">
            <div>
                <Heading size="large" weight="bold">
                    Ваши доставки
                </Heading>
                <Text as="span" size="small">
                    Получайте информацию и удобно управляейте
                </Text>
            </div>
        </header>
    );
};

export const MobileProfilePageView: FunctionComponent = () => {
    useEffect(() => {
        const data = async () => apiClient.getActiveDeliveries();
        console.log(data());
    }, []);
    return (
        <Authorized>
            <Wrapper>
                <Header />
                <FilterSection>filters</FilterSection>
                <MapSection>map</MapSection>
                <DeliveriesSection>
                    <InProgressDeliveriesList />
                </DeliveriesSection>
            </Wrapper>
            <NavbarMobile />
        </Authorized>
    );
};