import { Contact, Delivery, DeliveryStates } from '@/shared/api';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
    Spacer,
} from '@nextui-org/react';
import Highlighter from 'react-highlight-words';
import { useTranslation } from 'react-i18next';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { sharedConfigRoutes } from '@/shared/config';
import { useNavigate } from 'react-router-dom';
import React, { useCallback } from 'react';
import { LuMail, LuPhone, LuUser } from 'react-icons/lu';

import {
    LABEL_ID,
    LABEL_STORAGE,
    translationNS,
    LABEL_ADDRESS,
    LABEL_CONTACT_PERSON,
    BUTTON_MORE,
    STATUS_DONE,
    STATUS_DELIVERING,
    STATUS_CANCELLED,
    STATUS_CREATED,
    LABEL_DATE,
} from '../../config';
import { getDeliverySystemId } from '../../lib/utils/getDeliverySystemId';
import { getDeliveryStatus } from '../../lib/utils/getDeliveryStatus';
import { getDeliveryContents } from '../../lib/utils/getDeliveryContents';
import { getDeliveryClientName } from '../../lib/utils/getDeliveryClientName';
import { getDeliveryAddress } from '../../lib/utils/getDeliveryAdress';
import { getDeliveryPickupDateTime } from '../../lib/utils/getDeliveryPickupDateTime';

const { RouteName } = sharedConfigRoutes;
const { DELIVERIES } = RouteName;

const ID: FunctionComponent<{ id: string; query: string[] }> = ({
    id,
    query,
}) => {
    const { t } = useTranslation(translationNS);
    return (
        <div className="flex flex-col">
            <span>{t(LABEL_ID)}</span>
            <Spacer y={0.5} />
            <span className="text-md font-bold">
                <Highlighter
                    highlightClassName="bg-yellow-200 px-0.5 text-default-400"
                    searchWords={query}
                    autoEscape
                    textToHighlight={`# ${id}`}
                />
            </span>
        </div>
    );
};

const Client: FunctionComponent<{ client: string; query: string[] }> = ({
    client,
    query,
}) => {
    return (
        <div className="text-right">
            <p className="truncate">
                <Highlighter
                    highlightClassName="bg-yellow-200 px-0.5 text-default-400"
                    searchWords={query}
                    autoEscape
                    textToHighlight={client}
                />
            </p>
        </div>
    );
};

const Address: FunctionComponent<{ address: string; query: string[] }> = ({
    address,
    query,
}) => {
    const { t } = useTranslation(translationNS);
    return (
        <div>
            <h4 className="text-medium font-bold text-default-900">
                {t(LABEL_ADDRESS)}
            </h4>
            <p>
                <Highlighter
                    autoEscape
                    highlightClassName="bg-yellow-200 px-0.5 text-default-400"
                    searchWords={query}
                    textToHighlight={address}
                />
            </p>
        </div>
    );
};

const ContactPerson: FunctionComponent<{
    contactPerson: Contact;
    query: string[];
}> = ({ contactPerson, query }) => {
    const { t } = useTranslation(translationNS);
    const { name, phone, email } = contactPerson;
    return (
        <div className="flex flex-col gap-1 text-default-900">
            <h4 className="text-medium font-bold">{t(LABEL_CONTACT_PERSON)}</h4>
            <div className="flex w-full items-center gap-2">
                <LuUser />
                <Highlighter
                    autoEscape
                    highlightClassName="bg-yellow-200 px-0.5 text-default-400"
                    searchWords={query}
                    textToHighlight={name}
                />
            </div>
            <div className="flex w-full items-center gap-2">
                <LuPhone />
                <Highlighter
                    autoEscape
                    highlightClassName="bg-yellow-200 px-0.5 text-default-400"
                    searchWords={query}
                    textToHighlight={phone}
                />
            </div>
            <div className="flex w-full items-center gap-2">
                <LuMail />
                <Highlighter
                    autoEscape
                    highlightClassName="bg-yellow-200 px-0.5 text-default-400"
                    searchWords={query}
                    textToHighlight={email || ''}
                />
            </div>
        </div>
    );
};

const Status: FunctionComponent<{ state: DeliveryStates }> = ({ state }) => {
    const { t } = useTranslation(translationNS);
    const stateBadge = {
        done: (
            <Chip color="success" variant="dot" size="sm">
                {t(STATUS_DONE)}
            </Chip>
        ),
        canceled: (
            <Chip color="danger" variant="dot" size="sm">
                {t(STATUS_CANCELLED)}
            </Chip>
        ),
        created: (
            <Chip variant="dot" size="sm">
                {t(STATUS_CREATED)}
            </Chip>
        ),
        delivering: (
            <Chip color="warning" variant="dot" size="sm">
                {t(STATUS_DELIVERING)}
            </Chip>
        ),
    }[state];

    return (
        <div className="flex flex-grow items-center justify-end gap-1 text-default">
            {stateBadge}
        </div>
    );
};

const Content: FunctionComponent<{ content: string; query: string[] }> = ({
    content,
    query,
}) => {
    const { t } = useTranslation(translationNS);
    return (
        <div>
            <h4 className="text-medium font-bold text-default-900">
                {t(LABEL_STORAGE)}
            </h4>
            <p>
                <Highlighter
                    autoEscape
                    highlightClassName="bg-yellow-200 px-0.5 text-default-400-400"
                    searchWords={query}
                    textToHighlight={content}
                />
            </p>
        </div>
    );
};

const ButtonMore: FunctionComponent<{
    onPress: () => void;
}> = ({ onPress }) => {
    const { t } = useTranslation(translationNS);
    return (
        <Button color="primary" fullWidth onPress={onPress}>
            {t(BUTTON_MORE)}
        </Button>
    );
};

interface DeliverySearchResultCardProperties {
    delivery: Delivery;
    query: string;
}

export const DeliverySearchResultCard: FunctionComponent<DeliverySearchResultCardProperties> =
    React.memo(({ delivery, query }) => {
        const { t } = useTranslation(translationNS);
        const navigate = useNavigate();
        const queryWords = query.split(' ');

        const id = getDeliverySystemId(delivery);
        const deliveryId = delivery.deliveryId.toString();
        const state = getDeliveryStatus(delivery);
        const contactPerson = delivery.contact;
        const content = getDeliveryContents(delivery);
        const clientName = getDeliveryClientName(delivery);
        const address = getDeliveryAddress(delivery);
        const pickupDateTime = getDeliveryPickupDateTime(
            delivery,
            false,
            false,
        );

        const onPressButtonMore = useCallback(() => {
            navigate(`${DELIVERIES}/${id}`);
        }, [id, navigate]);

        return (
            <Card className="">
                <CardHeader className="justify-between">
                    <div className="grid w-full grid-cols-[max-content_auto] gap-5">
                        <ID id={deliveryId} query={queryWords} />
                        <div>
                            <Status state={state} />
                            <Spacer y={0.5} />
                            <Client client={clientName} query={queryWords} />
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="px-3 py-0 text-small text-default-400">
                    <Address address={address} query={queryWords} />
                    <Spacer y={2} />
                    <ContactPerson
                        contactPerson={contactPerson}
                        query={queryWords}
                    />
                    <Spacer y={2} />
                    <Content content={content} query={queryWords} />
                </CardBody>
                <CardFooter className="gap-4">
                    <div>
                        <h4 className="font-bold text-default-900">
                            {t(LABEL_DATE)}
                        </h4>
                        <div className="flex flex-grow items-center gap-1 text-default">
                            <FaRegCalendarAlt />
                            <p className="text-small font-semibold text-default-400">
                                {pickupDateTime ? (
                                    <Highlighter
                                        autoEscape
                                        searchWords={queryWords}
                                        textToHighlight={pickupDateTime}
                                    />
                                ) : null}
                            </p>
                        </div>
                    </div>

                    <ButtonMore onPress={onPressButtonMore} />
                </CardFooter>
            </Card>
        );
    });
