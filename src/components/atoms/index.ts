// 나누어 쪼개질 수 없는 형태의 컴포넌트를 생성한다.
// ex div,input, button 등등..

// 체크 박스, 라디오 버튼, 셀렉트 박스를 위한 옵션

import { PropsWithChildren } from 'react';
import { InputProps } from './InputComponent';

export type TSelectOption<T = string> = {
  value: T;
  label?: string;
};

export type TCheckValue = { checked: boolean; value: unknown };
export type CheckContextProp = {
  disabled?: boolean;
  value?: string;
  onChange?: ({ checked, value }: TCheckValue) => void;
};

export type CheckboxGroupProp = {
  label: string;
  children: React.ReactNode;
  name: string;
  disabled?: boolean;
  value?: string;
  onChange?: ({ checked, value }: TCheckValue) => void;
};

export type RadioContextProp = {
  name: string;
  disabled?: boolean;
  value?: string;
  onChange?: (value: TSelectOption) => void;
};

export type RadioGroupProp = {
  label: string;
  children: React.ReactNode;
  name: string;
  disabled?: boolean;
  value?: string;
  onChange?: (value: TSelectOption) => void;
};

// 체크 박스 기능 컴포넌트 Props
export type CheckComponentProps = TSelectOption &
  InputProps & {
    activeComponent: React.ReactNode;
    inactiveComponent: React.ReactNode;
  };
export type CheckComponentOriginProps = TSelectOption & PropsWithChildren & InputProps;

export * from './Div';
export * from './DivColumn';
export * from './DivRow';
export * from './DivGrid';
export * from './MainColumn';
export * from './InputComponent';
export * from './TextAreaComponent';
// export * from './RadioButtonWithLabel';

export * from './LoadingSpinner';
