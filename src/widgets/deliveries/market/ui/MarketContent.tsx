import type { PropsWithChildren } from 'react';
import { deliveryUi } from '@/entities/delivery';
import { useList, useUnit } from 'effector-react';
import { sharedConfigRoutes } from '@/shared/config';
import { useNetworkInfo } from '@/shared/config/network';
import { Button, Skeleton } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { RiWifiOffLine } from 'react-icons/ri';
import { $avaliableDeliveries, $isDeliveriesLoading } from '../model';

const { RouteName } = sharedConfigRoutes;
const { DELIVERIES } = RouteName;

const { DeliveryShortInfoCard } = deliveryUi;

/* eslint-disable unicorn/consistent-function-scoping */

/**
 * Layout
 */
const Root: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="flex w-full flex-col gap-6 pb-24">{children}</div>
);

/**
 * Components
 */

const Loading: FunctionComponent = () => {
    return (
        <div className="flex w-full flex-col items-center justify-center gap-4">
            <Skeleton className="w-full rounded-lg">
                <div className="h-48 min-w-full rounded-lg bg-default-300" />
            </Skeleton>
            <Skeleton className="w-full rounded-lg">
                <div className="block h-48 min-w-full" />
            </Skeleton>
            <Skeleton className="w-full rounded-lg">
                <div className="block h-48 w-full min-w-full" />
            </Skeleton>
        </div>
    );
};

const Error: FunctionComponent = () => {
    return (
        <div className="flex w-full flex-col items-center justify-center gap-4">
            <p>Something went wrong</p>
        </div>
    );
};

const Offline: FunctionComponent = () => {
    return (
        <div className="flex w-full flex-col items-center justify-center gap-4 py-8">
            <RiWifiOffLine className="text-5xl text-content3" />
            <div className="text-content3">No internet connection</div>
        </div>
    );
};

/**
 * @name MarketContent
 * @description widget for display available deliveries
 * @constructor
 */
export const MarketContent: FunctionComponent = () => {
    const { online, effectiveType } = useNetworkInfo();
    const isPending = useUnit($isDeliveriesLoading);

    const content = useList($avaliableDeliveries, (delivery, index) => {
        const isFirst = index === 0;

        return (
            <motion.div
                className="relative w-full"
                initial={{
                    opacity: 0,
                    scale: isFirst ? 1 : 0.95,
                }}
                whileInView={{
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.3, delay: 0.08 },
                }}
                viewport={{ once: true }}
            >
                <DeliveryShortInfoCard
                    delivery={delivery}
                    featureSlot={<Button>dsf</Button>}
                />
            </motion.div>
        );
    });

    if (!online) {
        return (
            <Root>
                <Offline />
            </Root>
        );
    }

    return (
        <Root>
            {isPending ? (
                <Loading />
            ) : (
                <div className="relative grid grid-cols-1 gap-4">{content}</div>
            )}
        </Root>
    );
};