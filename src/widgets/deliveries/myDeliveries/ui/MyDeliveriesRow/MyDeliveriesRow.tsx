import { DeliveryCountdownCard, getDeliveryId } from '@/entities/delivery';
import { useList, useUnit } from 'effector-react';
import { sharedUiLayouts } from '@/shared/ui';
import { Button, Skeleton, Spacer, Spinner } from '@nextui-org/react';
import { GoAlert } from 'react-icons/go';
import { AiOutlineReload } from 'react-icons/ai';
import { BsBoxSeam } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { PropsWithChildren } from 'react';
import { $$empty, $$hasError, $fetchedDeliveries } from '../../model';

import {
    BUTTON_RETRY_TEXT_KEY,
    DELIVERY_PREFIX,
    ERROR_TITLE_KEY,
    DATA_EMPTY_KEY,
    translationNS,
} from '../../config';

const { HorizontalScroll } = sharedUiLayouts;

/**
 * Component for rendering horizontally scrollable content.
 */
const ScrollableContent: FunctionComponent<PropsWithChildren> = ({
    children,
}) => (
    <div className="flex flex-nowrap justify-start gap-4 py-4">{children}</div>
);

/**
 * Component rendering a placeholder to indicate no items are available.
 */
const EmptyItemsPlaceholder: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return (
        <div className="block p-4">
            <div className="flex h-44 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-content3 p-4">
                <BsBoxSeam className="text-4xl text-content3" />
                <Spacer y={3} />
                <div>
                    <span className="text-center text-lg text-content3">
                        {t(DATA_EMPTY_KEY)}
                    </span>
                </div>
            </div>
        </div>
    );
};

/**
 * Renders skeletons as placeholders during loading states.
 */
const LoadPlaceholder: FunctionComponent = () => (
    <div className="block py-4">
        <HorizontalScroll>
            <div className="flex flex-nowrap justify-start gap-4 px-4">
                <Skeleton className="rounded-lg">
                    <DeliveryCountdownCard />
                </Skeleton>
                <Skeleton className="rounded-lg">
                    <DeliveryCountdownCard />
                </Skeleton>
                <Skeleton className="rounded-lg">
                    <DeliveryCountdownCard />
                </Skeleton>
            </div>
        </HorizontalScroll>
    </div>
);

/**
 * Component displaying an error message with a retry button.
 */
const ErrorInitPlaceholder: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return (
        <div className="block p-4">
            <div className="flex h-44 w-full flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-content3 p-4">
                <GoAlert className="text-6xl text-content3" />
                <div>
                    <span className="text-content3">{t(ERROR_TITLE_KEY)}</span>
                </div>
                <Spacer y={1} />
                <Button size="sm">
                    <AiOutlineReload />
                    {t(BUTTON_RETRY_TEXT_KEY)}
                </Button>
            </div>
        </div>
    );
};

/**
 * Animates and shows an updating spinner.
 */
const Updater: FunctionComponent = () => (
    <motion.div
        initial={{ opacity: 0, scale: 0, width: 0, marginRight: 0 }}
        animate={{ opacity: 1, scale: 1, width: 'auto', marginRight: 20 }}
        exit={{ opacity: 0, scale: 0, width: 0, marginRight: 0 }}
        transition={{ duration: 0.5 }}
        className="my-auto"
    >
        <Spinner color="primary" />
    </motion.div>
);

/**
 * Main component for displaying a row of deliveries, handling loading, empty, and error states.
 */
export const MyDeliveriesRow: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const hasError = useUnit($$hasError);

    // Simulated states (example purposes)
    const isFirstLoad = false;
    const isUpdating = false;
    const isEmpty = useUnit($$empty);

    const items = useList($fetchedDeliveries, (delivery) => {
        const deliveryId = getDeliveryId(delivery);

        return (
            <div className="flex items-end truncate">
                <div className="relative w-6">
                    <div className="-translate-x-1.5 -translate-y-1.5 -rotate-90 text-content4">
                        {t(DELIVERY_PREFIX, { id: deliveryId })}
                    </div>
                </div>
                <div className="flex-grow">
                    <DeliveryCountdownCard delivery={delivery} />
                </div>
            </div>
        );
    });

    if (hasError && isEmpty) {
        return <ErrorInitPlaceholder />;
    }

    if (isFirstLoad) {
        return <LoadPlaceholder />;
    }

    if (isEmpty) {
        return <EmptyItemsPlaceholder />;
    }

    return (
        <HorizontalScroll className="px-4">
            <AnimatePresence>{isUpdating ? <Updater /> : null}</AnimatePresence>
            <ScrollableContent>{items}</ScrollableContent>
        </HorizontalScroll>
    );
};