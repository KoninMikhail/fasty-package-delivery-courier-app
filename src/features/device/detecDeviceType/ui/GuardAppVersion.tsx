import { Button, Spacer } from '@nextui-org/react';
import { useUnit } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { IoReloadSharp } from 'react-icons/io5';
import clsx from 'clsx';
import { sessionModel } from '@/entities/viewer';
import {
    ERROR_SCREEN_RELOAD_BUTTON_TEXT,
    ERROR_SCREEN_HEADING,
    translationNS,
    ERROR_SCREEN_DESCRIPTION,
} from '../config';
import { $$isDesktop } from '../model';

const { $viewerDataReceived } = sessionModel;

const ReloadButton: FunctionComponent<{
    onClick: () => void;
    buttonText: string;
}> = ({ onClick, buttonText }) => (
    <Button onPress={onClick} color="primary">
        <IoReloadSharp />
        {buttonText}
    </Button>
);

const ErrorContent: FunctionComponent<{
    heading: string;
    description: string;
    onClick: () => void;
    buttonText: string;
}> = ({ heading, description, onClick, buttonText }) => (
    <div className="flex flex-col gap-4 text-center">
        <h3 className="text-3xl font-bold">{heading}</h3>
        <span>{description}</span>
        <Spacer y={6} />
        <ReloadButton onClick={onClick} buttonText={buttonText} />
    </div>
);

export const GuardAppVersion: FunctionComponent = () => {
    const { isDesktop, hasViewerData } = useUnit({
        isDesktop: $$isDesktop,
        hasViewerData: $viewerDataReceived,
    });

    const { t } = useTranslation(translationNS);

    const onClickReload = (): void => window.location.reload();

    if (!hasViewerData) return null;

    return (
        <div
            className={clsx(
                'fixed z-[9996] h-screen w-screen items-center justify-center bg-background',
                {
                    'flex lg:hidden': isDesktop,
                    'hidden xl:flex': !isDesktop,
                },
            )}
        >
            <div
                className={clsx('text-center', {
                    'w-2/3': isDesktop,
                    'w-1/3': !isDesktop,
                })}
            >
                <ErrorContent
                    heading={t(ERROR_SCREEN_HEADING)}
                    description={t(ERROR_SCREEN_DESCRIPTION)}
                    onClick={onClickReload}
                    buttonText={t(ERROR_SCREEN_RELOAD_BUTTON_TEXT)}
                />
            </div>
        </div>
    );
};
