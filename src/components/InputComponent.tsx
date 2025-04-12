import React from 'react';
import { NumberInput, NumberInputProps, InputWrapper, TextInput, TextInputProps } from '@mantine/core';

export interface InputComponentProps extends NumberInputProps {
  leftIcon?: React.ReactNode;
}

const InputNumber: React.FC<InputComponentProps> = ({ leftIcon, style, ...props }) => {
  return (
    <NumberInput
      {...props}
      leftSection={leftIcon}
      className="w-full"
    />
  );
};

export type ManagedInputTextProps = {
  inputType: 'text';
  label: string;
  description?: string;
  leftIcon?: React.ReactNode;
} & TextInputProps;

export type ManagedInputNumberProps = {
  inputType: 'number';
  label: string;
  description?: string;
} & InputComponentProps;

export type ManagedInputProps = ManagedInputTextProps | ManagedInputNumberProps;

const Input: React.FC<ManagedInputProps> = (props) => {
  if (props.inputType === 'number') {
    const { inputType, label, description, ...numberProps } = props;
    return (
      <InputWrapper label={label} description={description}>
        <InputNumber {...(numberProps as InputComponentProps)} />
      </InputWrapper>
    );
  }
  const { inputType, label, description, leftIcon, ...textProps } = props as ManagedInputTextProps;
  return (
    <TextInput
      label={label}
      description={description}
      leftSection={leftIcon}
      {...(textProps as TextInputProps)}
    />
  );
};

export default Input;
