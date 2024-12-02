import { Button, TextField, FormLabel, Box, Stack } from '@mui/material';
import React from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';

const Postcode = ({ formValue, setFormValue, label, textFieldId, textFieldName }) => {
    const open = useDaumPostcodePopup("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");

    const handleComplete = (data) => {
        console.log(data);
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }
        setFormValue(prev => ({ ...prev, [textFieldName]: fullAddress }));
    };

    const handleClick = () => {
        open({ onComplete: handleComplete });
    };

    return (
        <Stack spacing={1}>
            {label && <FormLabel>{label}</FormLabel>}
            <Box display="flex" alignItems="center">
                <TextField
                    id={textFieldId}
                    name={textFieldName}
                    hiddenLabel
                    value={formValue[textFieldName] || ''}
                    sx={{ flexGrow: 1, mr: 1 }}
                />
                <Button type='button' onClick={handleClick}>
                    찾기
                </Button>
            </Box>
        </Stack>
    );
};

export default Postcode;
