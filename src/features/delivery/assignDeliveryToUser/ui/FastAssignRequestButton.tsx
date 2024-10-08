import {
    Button,
    ButtonProps,
    Popover,
    PopoverContent,
    PopoverProps,
    PopoverTrigger,
} from '@nextui-org/react';
import { modelView } from 'effector-factorio';
import { Delivery } from '@/shared/api';
import { MdLibraryAdd } from 'react-icons/md';
import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { BiSolidError } from 'react-icons/bi';
import { useUnit } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { factory } from '@/features/delivery/assignDeliveryToUser/factory/factory';
import {
    BUTTON_LABEL_CANCEL,
    BUTTON_LABEL_CONFIRM,
    LABEL_ASSIGN_DELIVERY,
    translationNS,
} from '../config';

interface RequestButtonProperties {
    deliverySystemId: Delivery['id'];
    deliveryId: Delivery['deliveryId'];
    popoverProps?: Pick<PopoverProps, 'placement' | 'backdrop'>;
    buttonProps?: Omit<
        ButtonProps,
        'onPress' | 'isLoading' | 'isDisabled' | 'children' | 'isIconOnly'
    >;
}

export const FastAssignRequestButton = modelView(
    factory,
    ({
        deliverySystemId,
        deliveryId,
        popoverProps,
        buttonProps,
        ...rest
    }: RequestButtonProperties) => {
        const model = factory.useModel();
        const { t } = useTranslation(translationNS);

        const [isOpen, setIsOpen] = useState<boolean>(false);
        const [assignedItems, assignPressed, assignConfirmed, assignRejected] =
            useUnit([
                model.$assignedItems,
                model.assignPressed,
                model.assignConfirmed,
                model.assignRejected,
                model.assignCompleted,
            ]);

        const isProcessing = useUnit(model.$processing);
        const isAssigned = deliverySystemId
            ? assignedItems.includes(deliverySystemId)
            : false;
        const isError = false;

        const labelDeliveryId = deliveryId.toString().padStart(6, '0');

        const onOpenChange = (open: boolean): void => {
            if (open && deliverySystemId) {
                assignPressed(deliverySystemId);
                setIsOpen(true);
            } else {
                assignRejected();
                setIsOpen(false);
            }
        };

        const onPressAssign = (): void => {
            assignConfirmed();
        };

        const onPressReject = (): void => {
            assignRejected();
            setIsOpen(false);
        };

        if (isAssigned) {
            return (
                <Button isIconOnly {...buttonProps} {...rest}>
                    <FaCheck className="text-md" />
                </Button>
            );
        }

        if (isError) {
            return (
                <Button isIconOnly {...buttonProps} {...rest}>
                    <BiSolidError className="text-md" />
                </Button>
            );
        }

        return (
            <Popover
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement={popoverProps?.placement}
                backdrop={popoverProps?.backdrop}
                showArrow
            >
                <PopoverTrigger>
                    <Button isIconOnly>
                        {isError ? (
                            <BiSolidError className="text-md" />
                        ) : (
                            <MdLibraryAdd className="text-xl" />
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <div className="flex flex-col gap-2 px-1 py-2">
                        <div className="max-w-48 text-center text-2xl font-bold text-content3">
                            {`#${labelDeliveryId}`}
                        </div>
                        <div className="max-w-48 text-center font-bold">
                            {t(LABEL_ASSIGN_DELIVERY)}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Button onPress={onPressReject}>
                                {t(BUTTON_LABEL_CANCEL)}
                            </Button>
                            <Button
                                isLoading={isProcessing}
                                onPress={onPressAssign}
                                color="primary"
                            >
                                {t(BUTTON_LABEL_CONFIRM)}
                            </Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        );
    },
);
