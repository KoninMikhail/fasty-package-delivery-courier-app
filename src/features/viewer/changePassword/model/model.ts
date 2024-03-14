import { User } from '@/shared/api';
import { combine, createEvent, createStore, Effect, Store } from 'effector';
import { modelFactory } from 'effector-factorio';
import { MIN_PASSWORD_LENGTH } from '../config';

/* eslint-disable no-useless-escape */

interface FactoryOptions {
    targetUser: Store<User>;
    updateUserFx: Effect<User, void, Error>;
}

export const factory = modelFactory((options: FactoryOptions) => {
    const { targetUser, updateUserFx } = options;
    const changePassword = updateUserFx;

    const passwordChanged = createEvent<string>();
    const passwordRepeatChanged = createEvent<string>();
    const submitPressed = createEvent<void>();

    /**
     * Form Data
     */
    const $password = createStore('');
    const $passwordRepeat = createStore('');

    $password.on(passwordChanged, (_, password) => password);
    $passwordRepeat.on(passwordRepeatChanged, (_, password) => password);

    /**
     * Validations
     */
    const $passwordLengthValid = combine(
        $password,
        (password) =>
            /\S/.test(password) && password.length >= MIN_PASSWORD_LENGTH,
    );
    const $passwordHasUpperCaseAndLowerCase = combine(
        $password,
        (password) => /[a-z]/.test(password) && /[A-Z]/.test(password),
    );
    const $passwordHasNumbers = combine($password, (password) =>
        /\d/.test(password),
    );
    const $passwordHasSpecialChars = combine($password, (password) => {
        return /[!"#$%&'()*+,./:;<=>?@[\\\]^_{|}\-]+/.test(password);
    });

    const $formValidated = combine(
        $passwordLengthValid,
        $passwordHasUpperCaseAndLowerCase,
        $passwordHasNumbers,
        (
            passwordNotEmpty,
            passwordHasUpperCaseAndLowerCase,
            passwordHasNumbers,
        ) =>
            passwordNotEmpty &&
            passwordHasUpperCaseAndLowerCase &&
            passwordHasNumbers,
    );

    return {
        changePassword,
        targetUser,
        $password,
        $passwordRepeat,
        $formValidated,
        $passwordHasNumbers,
        $passwordHasUpperCaseAndLowerCase,
        $passwordLengthValid,
        $passwordHasSpecialChars,
        passwordChanged,
        passwordRepeatChanged,
        submitPressed,
    };
});