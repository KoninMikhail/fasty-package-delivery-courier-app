import { PropsWithChildren, useState } from 'react';

import { widgetNavbarMobileUi } from '@/widgets/layout/navbar-mobile';
import { sharedUiLayouts } from '@/shared/ui';
import { Button, Divider, Image, Input, Spacer } from '@nextui-org/react';
import { SlSocialVkontakte } from 'react-icons/sl';
import { IoLogoYoutube } from 'react-icons/io';
import { useTranslation } from 'react-i18next';
import { ChangeColorModeSwitchButton } from '@/features/viewer/changeColorMode';
import { ChangeLanguageButton } from '@/features/viewer/changeLanguage';
import { resetDeliveryById } from '@/entities/delivery/model/effects/resetDeliveryById';
import { translationNS } from '../../config';

const { Section } = sharedUiLayouts;
const { NavbarMobile } = widgetNavbarMobileUi;
/*
 * Layout
 */
const MainContainer: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="h-full w-full flex-col px-2 lg:mx-auto lg:w-[750px]">
        {children}
    </main>
);

/**
 * @name MobileSettingsPageView
 * @constructor
 */
export const MobileSettingsPageView: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const [id, setId] = useState<string>('0');

    const onResetPress = () => {
        if (id !== '0') {
            void resetDeliveryById(id);
            setId('0');
        }
    };

    return (
        <>
            <MainContainer>
                <Section>
                    <div className="flex items-center justify-center gap-2">
                        <Image
                            width={180}
                            src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
                            alt="NextUI Album Cover"
                            className="m-5"
                        />
                    </div>
                </Section>
                <Spacer />
                <Divider />
                <Spacer />
                <div>
                    <div>Связаться с поддержкой</div>
                    <div className="flex w-full">
                        <div className="flex h-20 flex-1 items-center justify-center">
                            <Button color="primary">Позвонить</Button>
                        </div>
                        <div className="flex h-20 flex-1 items-center justify-center">
                            <Button color="primary">Чат</Button>
                        </div>
                    </div>
                </div>
                <Spacer />
                <Divider />
                <Spacer />
                <div className="flex w-full">
                    <div className="flex h-20 flex-1 items-center justify-center">
                        <SlSocialVkontakte className="text-5xl" />
                    </div>
                    <div className="flex h-20 flex-1 items-center justify-center">
                        <IoLogoYoutube className="text-5xl text-primary" />
                    </div>
                </div>
                <Input
                    type="text"
                    value={id}
                    onValueChange={(value) => setId(value)}
                    variant="bordered"
                    className="max-w-xs"
                />
                <Button onPress={onResetPress}>Сбросить</Button>
                <Spacer />
                <Divider />
                <Spacer />
                <Section>
                    <div className="flex items-center gap-2">
                        <div className="flex-grow">{t('language.title')}</div>
                        <div>
                            <ChangeLanguageButton />
                        </div>
                    </div>
                </Section>
                <Section>
                    <div className="flex items-center gap-2">
                        <div className="flex-grow">{t('theme.title')}</div>
                        <div>
                            <ChangeColorModeSwitchButton />
                        </div>
                    </div>
                </Section>
                <Spacer />
            </MainContainer>
            <NavbarMobile />
        </>
    );
};
