import { PropsWithChildren, useState } from 'react';
import { widgetNavbarDesktopUi } from '@/widgets/layout/navbar-desktop';
import { useUnit } from 'effector-react';
import { UserCardRow } from '@/entities/user';
import { Spacer, Tab, Tabs } from '@nextui-org/react';
import { sessionModel } from '@/entities/viewer';
import { widgetMyDeliveriesUi } from '@/widgets/deliveries/myDeliveries';
import {
    MyDeliveriesFilters,
    MyDeliveriesList,
} from '@/widgets/deliveries/myDeliveries/ui';

const { MyDeliveriesMap } = widgetMyDeliveriesUi;
const { Navbar } = widgetNavbarDesktopUi;

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="relative grid h-screen w-screen overflow-hidden">
        {children}
    </div>
);

const Sidebar: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="fixed z-[5100] h-full w-48 border-r border-gray-200 bg-white">
        {children}
    </div>
);

const MainContainer: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="relative h-full w-full overflow-hidden overflow-y-scroll pl-64">
        {children}
    </main>
);

const ListSection: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="h-inherit w-full overflow-hidden px-8 pl-16">
        <div className="relative block w-full">{children}</div>
    </div>
);

const Toolbar: FunctionComponent<{
    heading: string;
    onSelectTab: (key: Key) => void;
}> = ({ heading, onSelectTab }) => {
    const user = useUnit(sessionModel.$viewerProfileData);
    return (
        <div className="fixed left-64 right-0 top-0 z-[5000] flex items-center justify-between bg-gradient-to-b from-background to-transparent px-8 py-6 pl-16">
            <h1 className="text-4xl">{heading}</h1>
            <div>
                <Tabs
                    key="lg"
                    size="md"
                    radius="full"
                    onSelectionChange={onSelectTab}
                    aria-label="Tabs sizes"
                >
                    <Tab key="list" title="Списком" />
                    <Tab key="map" title="На карте" />
                </Tabs>
            </div>
            <div>
                <UserCardRow user={user} avatarPosition="right" />
            </div>
        </div>
    );
};

export const DesktopMyDeliveriesPageView: FunctionComponent = () => {
    const [selectedTab, setSelectedTab] = useState<string>('list');

    const onSelectedTab = (key: string): void => {
        setSelectedTab(key);
    };

    return (
        <Layout>
            <Sidebar>
                <Navbar />
            </Sidebar>
            <MainContainer>
                <Toolbar heading="Мои доставки" onSelectTab={onSelectedTab} />
                {selectedTab === 'map' ? (
                    <MyDeliveriesMap />
                ) : (
                    <ListSection>
                        <Spacer y={24} />
                        <MyDeliveriesFilters />
                        <Spacer y={6} />
                        <MyDeliveriesList />
                    </ListSection>
                )}
            </MainContainer>
        </Layout>
    );
};
