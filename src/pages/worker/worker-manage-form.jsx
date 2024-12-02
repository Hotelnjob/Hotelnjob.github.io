import { useEffect, useState } from 'react';

// material-ui
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';

// third party
// project import

// assets
import { FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import Label from 'components/utilItem/label';
import SaveIcon from '@mui/icons-material/Save';
import PhoneInput from 'utils/phoneInput';
import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers';
import Postcode from 'components/utilItem/PostCode';
import InputFileUpload from 'utils/fileInput';
import { DataGrid } from '@mui/x-data-grid';
import { fileColumn } from 'components/utilItem/fileColumn';
import { koKR } from '@mui/x-data-grid/locales';




// ============================|| JWT - REGISTER ||============================ //

export default function WorkerManageForm({ formValue, setFormValue, onSubmit, isLoading }) {

    const onChange = (e) => {
        let key = e.target.name;
        let value = e.target.value;
        setFormValue({ ...formValue, [key]: value });
    };


    return (
        <>
            <form noValidate onSubmit={onSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <FormLabel>
                                이름
                            </FormLabel>
                            <TextField
                                id="name"
                                name="name"
                                hiddenLabel
                                value={formValue.name || ''}
                                onChange={onChange}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <FormLabel>
                                나이
                            </FormLabel>
                            <TextField
                                id="age"
                                name="age"
                                type='number'
                                hiddenLabel
                                value={formValue.age || ''}
                                onChange={onChange}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <FormLabel>
                                성별
                            </FormLabel>
                            <TextField
                                id="gender"
                                name="gender"
                                hiddenLabel
                                value={formValue.gender || ''}
                                onChange={onChange}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <FormLabel>
                                연락처
                            </FormLabel>
                            <PhoneInput
                                id="contact"
                                name="contact"
                                hiddenLabel
                                InputProps={{
                                    readOnly: false,
                                }}
                                value={formValue.contact || ''}
                                onChange={onChange}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Postcode
                            formValue={formValue}
                            setFormValue={setFormValue}
                            label="거주지"
                            textFieldId="region"
                            textFieldName="region"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <FormLabel>
                                국적
                            </FormLabel>
                            <TextField
                                id="nationality"
                                name="nationality"
                                hiddenLabel
                                value={formValue.nationality || ''}
                                onChange={onChange}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <FormLabel>
                                비자
                            </FormLabel>
                            <TextField
                                id="visaType"
                                name="visaType"
                                hiddenLabel
                                value={formValue.visaType || ''}
                                onChange={onChange}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <FormLabel>
                                비자만기일
                            </FormLabel>
                            <DatePicker
                                value={formValue.visaExpiryDate ? dayjs(formValue.visaExpiryDate) : null}
                                format={'YYYY-MM-DD'}
                                onChange={(newValue) => {
                                    onChange({
                                        target: {
                                            name: 'visaExpiryDate',
                                            value: newValue ? newValue.format('YYYY-MM-DDTHH:mm:ss') : null
                                        }
                                    });
                                }}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <FormLabel>
                                경력
                            </FormLabel>
                            <TextField
                                id="career"
                                name="career"
                                hiddenLabel
                                value={formValue.career || ''}
                                onChange={onChange}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <FormLabel id="demo-row-radio-buttons-group-label">한국어 가능 여부</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="korean"
                                onChange={onChange}
                                value={formValue.korean || ''}
                            >
                                <FormControlLabel value="가능" control={<Radio />} label="가능" />
                                <FormControlLabel value="불가능" control={<Radio />} label="불가능" />
                            </RadioGroup>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} container justifyContent="flex-end">
                        <LoadingButton
                            variant="contained"
                            startIcon={<SaveIcon />}
                            type="submit"
                            loading={isLoading}
                            loadingPosition="start"
                        >
                            저장
                        </LoadingButton>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}
