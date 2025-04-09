// LeftIconNumberInput.tsx
import React from 'react';
import { NumberInput, NumberInputProps } from '@mantine/core';

export interface LeftIconNumberInputProps extends NumberInputProps {
  leftIcon?: React.ReactNode;
}

const LeftIconNumberInput: React.FC<LeftIconNumberInputProps> = ({
  leftIcon,
  style,
  ...props
}) => {
  return (
      <NumberInput
        {...props}
        leftSection={leftIcon}
        className="w-full"
      />
  );
};

export default LeftIconNumberInput;
