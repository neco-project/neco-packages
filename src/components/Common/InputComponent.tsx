import React from 'react';
import {
  NumberInput,
  NumberInputProps,
  InputWrapper,
  TextInput,
  TextInputProps,
  Textarea,
  TextareaProps,
} from '@mantine/core';

// برای حالت عددی
export interface InputComponentProps extends NumberInputProps {
  leftIcon?: React.ReactNode;
  maxLength?: number;
}

// برای حالت تکست (ورودی معمولی)
export type ManagedInputTextProps = {
  inputType: 'text';
  label: string;
  description?: string;
  leftIcon?: React.ReactNode;
  maxLength?: number;
} & TextInputProps;

// برای حالت عددی
export type ManagedInputNumberProps = {
  inputType: 'number';
  label: string;
  description?: string;
  maxLength?: number;
} & InputComponentProps;

// برای حالت تکست اریا (textarea) به‌صورت جداگانه
export type ManagedInputTextareaProps = {
  inputType: 'textarea';
  label: string;
  description?: string;
  leftIcon?: React.ReactNode;
  maxLength?: number;
} & TextareaProps;

// در نهایت یک نوع کلی تعریف می‌کنیم
export type ManagedInputProps =
  | ManagedInputTextProps
  | ManagedInputNumberProps
  | ManagedInputTextareaProps;

const InputNumber: React.FC<InputComponentProps> = ({ leftIcon, maxLength, ...props }) => {
  // در صورتی که NumberInput به صورت مستقیم maxLength قبول نکند، از type assertion استفاده می‌کنیم
  return (
    <NumberInput
      {...props}
      leftSection={leftIcon}
      className="w-full"
      {...(maxLength ? ({ maxLength } as any) : {})}
    />
  );
};

const Input: React.FC<ManagedInputProps> = (props) => {
  if (props.inputType === 'number') {
    const { inputType, label, description, maxLength, ...numberProps } = props;
    return (
      <InputWrapper label={label} description={description}>
        <InputNumber {...(numberProps as InputComponentProps)} maxLength={maxLength} />
      </InputWrapper>
    );
  } else if (props.inputType === 'textarea') {
    const { inputType, label, description, leftIcon, maxLength, ...textareaProps } =
      props as ManagedInputTextareaProps;
    return (
      <InputWrapper label={label} description={description}>
        <Textarea
          {...(textareaProps as TextareaProps)}
          leftSection={leftIcon}
          maxLength={maxLength}
          className="w-full"
        />
      </InputWrapper>
    );
  } else {
    const { inputType, label, description, leftIcon, maxLength, ...textProps } = props as ManagedInputTextProps;
    return (
      <TextInput
        label={label}
        description={description}
        leftSection={leftIcon}
        maxLength={maxLength}
        {...(textProps as TextInputProps)}
        className="w-full"
      />
    );
  }
};

export default Input;
