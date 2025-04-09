// LeftIconNumberInput.tsx
import React from 'react';
import { NumberInput, NumberInputProps } from '@mantine/core';

export interface LeftIconNumberInputProps extends NumberInputProps {
  leftIcon?: React.ReactNode;
}

/**
 * کامپوننت LeftIconNumberInput یک وارپِر برای Mantine NumberInput است که با استفاده از Tailwind،
 * امکان قرارگیری آیکن در سمت چپ به صورت وسط عمودی و نمایش اینپوت به صورت تمام عرض را فراهم می‌کند.
 */
const LeftIconNumberInput: React.FC<LeftIconNumberInputProps> = ({
  leftIcon,
  style,
  ...props
}) => {
  return (
    <div className="relative w-full">
      {leftIcon && (
        <div className="absolute left-3 justify-center top-1/3 inset-y-0 flex items-center pointer-events-none">
          {leftIcon}
        </div>
      )}
      <NumberInput
        {...props}
        style={{ ...style, paddingLeft: leftIcon ? '2.5rem' : undefined }}
        className="w-full"
      />
    </div>
  );
};

export default LeftIconNumberInput;
