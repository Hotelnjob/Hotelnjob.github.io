import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const ComboBox = ({ options, label, placeholder, onSelect }) => {
    const handleSelect = (event, newValue) => {
        onSelect(newValue);
    };
    return (
        <Autocomplete
            disablePortal
            options={options}
            sx={{ width: 300 }}
            onChange={handleSelect}
            renderInput={(params) => <TextField {...params} label={label} placeholder={placeholder} />}
        />
    );
}

export default ComboBox;