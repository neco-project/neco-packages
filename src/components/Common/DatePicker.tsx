// AdvancedDatePicker.tsx
import React, { useState } from 'react';
import { DatePicker, DatePickerProps } from '@mantine/dates';

export interface AdvancedDatePickerProps extends Omit<DatePickerProps, 'value' | 'onChange' | 'allowSingleDateInRange'> {
  value?: Date | Date[] | [Date | null, Date | null] | null;
  onChange?: (value: Date | Date[] | [Date | null, Date | null] | null) => void;
  allowDeselect?: boolean;
  multipleDates?: boolean;
  dateRange?: boolean;
  allowSingleDateInRange?: boolean;
  defaultDate?: Date;
  controlled?: boolean;
}

const AdvancedDatePicker: React.FC<AdvancedDatePickerProps> = (props) => {
  const {
    allowDeselect,
    multipleDates,
    dateRange,
    allowSingleDateInRange,
    defaultDate,
    controlled,
    value,
    onChange,
    ...rest
  } = props;

  let pickerType: DatePickerProps['type'] = 'default';
  if (multipleDates) {
    pickerType = 'multiple';
  } else if (dateRange) {
    pickerType = 'range';
  }

  const [internalValue, setInternalValue] = useState<Date | Date[] | [Date | null, Date | null] | null>(
    value !== undefined
      ? value
      : pickerType === 'multiple'
      ? [] 
      : pickerType === 'range'
      ? [null, null]
      : defaultDate || null
  );

  const handleChange = (val: Date | Date[] | [Date | null, Date | null] | null) => {
    if (controlled && onChange) {
      onChange(val);
    } else {
      setInternalValue(val);
      if (onChange) {
        onChange(val);
      }
    }
  };

  return (
    <DatePicker
      {...rest}
      type={pickerType}
      allowDeselect={allowDeselect}
      allowSingleDateInRange={allowSingleDateInRange}
      defaultDate={defaultDate}
      value={controlled ? value : internalValue}
      onChange={handleChange}
    />
  );
};

export default AdvancedDatePicker;
