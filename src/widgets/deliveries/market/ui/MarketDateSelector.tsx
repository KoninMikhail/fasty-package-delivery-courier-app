import {
    HorizontalScroll,
    HorizontalSliderWithControls,
} from '@/shared/ui/layouts';
import { useState } from 'react';
import { HorizontalDatePicker } from '@/shared/ui/components';
import { DatePeriod } from '@/shared/ui/components/forms/horizontal-date-picker/types';
import { useUnit } from 'effector-react';
import { datesRangePicked } from '../model/model';
import { OfflineBlock } from './common/OfflineBlocker';

/**
 * @name MarketDateSelector
 * @description filter for widget with display available deliveries
 * @constructor
 */
export const MarketDateSelector: FunctionComponent<{
    typePicker: 'scroll' | 'slider';
}> = ({ typePicker }) => {
    const [selectedDates, setSelectedDates] =
        useState<Optional<DatePeriod>>(null);
    const setDatesRange = useUnit(datesRangePicked);

    const onChangeDate = (work: DatePeriod): void => {
        if (
            selectedDates?.dateFrom === work.dateFrom &&
            selectedDates?.toDate === work.toDate
        ) {
            setSelectedDates(() => null);
            setDatesRange(null as unknown as DatePeriod);
        }

        if (
            selectedDates?.dateFrom !== work.dateFrom ||
            selectedDates?.toDate !== work.toDate ||
            !selectedDates
        ) {
            setDatesRange(work);
            setSelectedDates(() => work);
        }
    };

    if (typePicker === 'scroll') {
        return (
            <OfflineBlock>
                <HorizontalScroll>
                    <HorizontalDatePicker
                        selectedDates={selectedDates}
                        onChangeDate={onChangeDate}
                        offsetY="3"
                    />
                </HorizontalScroll>
            </OfflineBlock>
        );
    }
    return (
        <OfflineBlock>
            <HorizontalSliderWithControls>
                <HorizontalDatePicker
                    selectedDates={selectedDates}
                    onChangeDate={onChangeDate}
                    offsetY="3"
                />
            </HorizontalSliderWithControls>
        </OfflineBlock>
    );
};
