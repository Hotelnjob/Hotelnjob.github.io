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
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import { FormLabel, TextField } from '@mui/material';
import Label from 'components/utilItem/label';
import SaveIcon from '@mui/icons-material/Save';
import PhoneInput from 'utils/phoneInput';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { LoadingButton } from '@mui/lab';


// ============================|| JWT - REGISTER ||============================ //

export default function EmployeeManageForm({ formValue, setFormValue, onSubmit, isLoading }) {

    const user = JSON.parse(sessionStorage.getItem("user"));
    const userType = user.userType || "";

    const isEditable = userType === 'admin';


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
                                직원명
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
                                전화번호
                            </FormLabel>
                            <PhoneInput
                                id="phone"
                                name="phone"
                                hiddenLabel
                                value={formValue.phone || ''}
                                InputProps={{
                                    readOnly: !isEditable,
                                }}
                                onChange={onChange}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <FormLabel>
                                생년월일
                            </FormLabel>
                            <TextField
                                id="birth"
                                name="birth"
                                hiddenLabel
                                value={formValue.birth || ''}
                                InputProps={{
                                    readOnly: !isEditable,
                                }}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <FormLabel>
                                부서
                            </FormLabel>
                            <TextField
                                id="department"
                                name="department"
                                hiddenLabel
                                value={formValue.department || ''}
                                InputProps={{
                                    readOnly: !isEditable,
                                }}
                                onChange={onChange}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <FormLabel>
                                직급
                            </FormLabel>
                            <TextField
                                id="position"
                                name="position"
                                hiddenLabel
                                value={formValue.position || ''}
                                InputProps={{
                                    readOnly: !isEditable,
                                }}
                                onChange={onChange}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <FormLabel>
                                입사일
                            </FormLabel>
                            <DatePicker
                                value={formValue.joinedDate ? dayjs(formValue.joinedDate) : null}
                                format={'YYYY-MM-DD'}
                                onChange={(newValue) => {
                                    onChange({
                                        target: {
                                            name: 'joinedDate',
                                            value: newValue ? newValue.format('YYYY-MM-DDTHH:mm:ss') : null
                                        }
                                    });
                                }}
                            />
                        </Stack>
                    </Grid>
                    {userType === 'admin' && (
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
                    )}
                </Grid>
            </form>
        </>
    );
}
