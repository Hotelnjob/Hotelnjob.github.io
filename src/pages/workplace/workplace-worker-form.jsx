import { useEffect, useState } from 'react';

// material-ui

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import { FormControlLabel, FormLabel, Input, Radio, RadioGroup, TextField } from '@mui/material';
import Label from 'components/utilItem/label';
import SaveIcon from '@mui/icons-material/Save';
import PhoneInput from 'utils/phoneInput';
import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';
import DateRangePicker from 'components/utilItem/date-range-picker';
import { Article } from '@mui/icons-material';
import ArticleButtonTitle from 'components/utilItem/button-title';



// ============================|| JWT - REGISTER ||============================ //

export default function WorkPlaceWorkerForm({ formValue, setFormValue, onSubmit, isLoading }) {

    const onChange = (e) => {
        let key = e.target.name;
        let value = e.target.value;
        setFormValue({ ...formValue, [key]: value });
    };



    return (
        <>
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
                            InputProps={{
                                readOnly: true,
                            }}
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
                            InputProps={{
                                readOnly: true,
                            }}
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
                            InputProps={{
                                readOnly: true,
                            }}
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
                                readOnly: true,
                            }}
                            value={formValue.contact || ''}
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
                            InputProps={{
                                readOnly: true,
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
                            InputProps={{
                                readOnly: true,
                            }}
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
                            value={formValue.korean || ""}
                        >
                            <FormControlLabel value="가능" control={<Radio />} label="가능" disabled />
                            <FormControlLabel value="불가능" control={<Radio />} label="불가능" disabled />
                        </RadioGroup>
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
}
