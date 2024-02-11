import { createEffect, createEvent, sample } from 'effector';
import { widgetSignInModalModel } from '@/widgets/viewer/sign-in-modal';
import { widgetCookiePolicyModalModel } from '@/widgets/polices/cookie-policy-modal';
import { widgetPrivacyPolicyModalModel } from '@/widgets/polices/privacy-policy-modal';
import { widgetTermsOfUseModalModel } from '@/widgets/polices/terms-of-use-modal';

/**
 * Auth
 */
export const pressSignInButton = createEvent();
sample({
    source: pressSignInButton,
    target: widgetSignInModalModel.setVisible,
});

/**
 * Cookie policy
 */
export const pressOpenCookiePolicyLink = createEvent();

sample({
    source: pressOpenCookiePolicyLink,
    target: [
        widgetSignInModalModel.setHidden,
        widgetCookiePolicyModalModel.setVisible,
    ],
});
sample({
    clock: widgetCookiePolicyModalModel.setHidden,
    target: widgetSignInModalModel.setVisible,
});

/**
 * Privacy policy
 */

export const pressOpenPrivacyPolicyLink = createEvent();
sample({
    source: pressOpenPrivacyPolicyLink,
    target: [
        widgetSignInModalModel.setHidden,
        widgetPrivacyPolicyModalModel.setVisible,
    ],
});
sample({
    clock: widgetPrivacyPolicyModalModel.setHidden,
    target: widgetSignInModalModel.setVisible,
});

/**
 * Terms of use
 */
export const pressOpenTermsOfUseLink = createEvent();
sample({
    source: pressOpenTermsOfUseLink,
    target: [
        widgetSignInModalModel.setHidden,
        widgetTermsOfUseModalModel.setVisible,
    ],
});
sample({
    clock: widgetTermsOfUseModalModel.setHidden,
    target: widgetSignInModalModel.setVisible,
});

/**
 * Sign in
 */
export const redirectAfterFetch = createEffect<string, string, Error>(
    (path) => path,
);