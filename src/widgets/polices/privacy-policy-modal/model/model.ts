import { createEvent, createStore } from 'effector';

export const setVisible = createEvent();
export const setHidden = createEvent();

export const $isPrivacyPolicyModalVisible = createStore(false)
    .on(setVisible, () => true)
    .on(setHidden, () => false);
