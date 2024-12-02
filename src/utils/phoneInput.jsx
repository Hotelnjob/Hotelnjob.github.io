import React from 'react';
import { OutlinedInput } from '@mui/material';

const PhoneInput = ({ value, onChange, InputProps, name, ...props }) => {
  InputProps = InputProps || {};

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, ''); // 모든 비숫자 문자를 제거
    if (cleaned.length <= 3) return cleaned; // 3자리 이하일 경우 그대로 반환
    if (cleaned.length <= 7) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`; // 3-4자리 반환
    }
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`; // 3-4-4 형식으로 반환
  };

  const handleChange = (e) => {
    if (InputProps.readOnly) return; // readOnly일 경우 변경하지 않음
    const formattedValue = formatPhoneNumber(e.target.value);
    onChange({ target: { name: name, value: formattedValue } });
  };

  return (
    <OutlinedInput
      {...props}
      value={value}
      onChange={handleChange}
      InputProps={{ ...InputProps }}
      type="tel"
    />
  );
};

export default PhoneInput;