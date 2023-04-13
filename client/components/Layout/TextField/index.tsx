import { createElement, useMemo, useState } from 'react';

type TInputProps = {
  as: 'input';
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onFocus' | 'onBlur' | 'className' | 'id'>;

type TTextareaProps = {
  as: 'textarea';
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'onFocus' | 'onBlur' | 'className' | 'id'>;

export type TTextField = (TTextareaProps | TInputProps) & {
  label: string;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (value: string) => void;
};

const TextField: React.FC<TTextField> = ({ label, as, onChange, onFocus, onBlur, ...props }) => {
  const [isFocus, setIsFocus] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const isActive = useMemo(() => hasValue || isFocus, [hasValue, isFocus]);

  const input = createElement(as, {
    ...props,
    className: 'textfield-input',
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocus(true);
      if (onFocus) onFocus(e);
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocus(false);
      if (onBlur) onBlur(e);
    },
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.currentTarget.value);
      if (onChange) onChange(e.currentTarget.value);
    },
  });
  return (
    <div className="textfield">
      <label data-active={isActive} className="textfield-label">
        {label}
      </label>
      {input}
    </div>
  );
};

export default TextField;
