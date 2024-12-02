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

export default function WorkPlaceManageForm({ formValue, setFormValue, onSubmit, isLoading }) {

    const onChange = (e) => {
        let key = e.target.name;
        let value = e.target.value;
        setFormValue({ ...formValue, [key]: value });
    };



    return (
        <>
            <form noValidate onSubmit={onSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <FormLabel>
                                근무형태
                            </FormLabel>
                            <TextField
                                id="workType"
                                name="workType"
                                hiddenLabel
                                value={formValue.workType || ''}
                                onChange={onChange}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <FormLabel>
                                근무지
                            </FormLabel>
                            <TextField
                                id="workPlace"
                                name="workPlace"
                                hiddenLabel
                                value={formValue.workPlace || ''}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <FormLabel>
                                근무날짜
                            </FormLabel>
                            <DateRangePicker
                                formValue={formValue}
                                setFormValue={setFormValue}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <FormLabel>
                                송출업체
                            </FormLabel>
                            <TextField
                                id="transCompany"
                                name="transCompany"
                                hiddenLabel
                                value={formValue.transCompany || ''}
                                InputProps={{
                                    readOnly: false,
                                }}
                                onChange={onChange}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} container justifyContent="flex-end">
                        <LoadingButton
                            variant="contained"
                            startIcon={<SaveIcon />}
                            type="submit"
                        // loading={isLoading}
                        // loadingPosition="start"
                        >
                            저장
                        </LoadingButton>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}
