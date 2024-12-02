import { useState } from 'react';
import { Stack, FormLabel, TextField } from '@mui/material';

const ValidateInput = ({ label, name, value, onChange, required = false }) => {
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange(e);

        if (required && value.trim() === '') {
            setError(true);
        } else {
            setError(false);
        }
    };

    return (
        <Stack spacing={1}>
            <FormLabel>{label}</FormLabel>
            <TextField
                id={name}
                name={name}
                hiddenLabel
                value={value || ''}
                onChange={handleChange}
                required={required}
                error={error}  // 에러 여부
                helperText={error ? '필수 입력 항목입니다' : ''}
            />
        </Stack>
    );
};

export default ValidateInput;
