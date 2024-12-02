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
import { useFormik } from 'formik';

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
import Postcode from 'components/utilItem/PostCode';
import InputFileUpload from 'utils/fileInput';
import { DataGrid } from '@mui/x-data-grid';
import { koKR } from '@mui/x-data-grid/locales';
import { fileColumn } from 'components/utilItem/fileColumn';
import ButtonTitle from 'components/utilItem/button-title';
import Dot from 'components/@extended/Dot';
import ValidateInput from 'components/utilItem/validationInput';



// ============================|| JWT - REGISTER ||============================ //

export default function HotelManageForm({ formValue, setFormValue, onSubmit, isLoading, setSelectedFiles, fileRows, setFileRows, validateError, setValidateError }) {

    if (formValue.hotelName) {
        setValidateError(false);
    } else {
        setValidateError(true);
    }

    const onChange = (e) => {
        const { name, value } = e.target;

        setFormValue((prevFormValue) => ({
            ...prevFormValue,
            [name]: value,
        }));

        if (e.target.validity.valid) {
            setValidateError(false);
        } else {
            setValidateError(true);
        }
    };

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);
        const newFileRows = newFiles.map((file, index) => ({
            id: fileRows.length + index + 1,
            fileName: file.name,
            fileType: file.type,
            uploadDate: new Date().toLocaleDateString(),
            isNewFile: true,
        }));
        setFileRows((prevRows) => [...prevRows, ...newFileRows]);
        setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };


    return (
        <>
            <form noValidate onSubmit={onSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <FormLabel>
                                호텔명
                            </FormLabel>
                            <TextField
                                required
                                error={validateError}
                                id="hotelName"
                                name="hotelName"
                                hiddenLabel
                                InputProps={{
                                    readOnly: false,
                                }}
                                value={formValue.hotelName || ''}
                                onChange={onChange}
                                helperText={validateError ? "호텔명은 필수입니다." : ""}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <FormLabel>
                                담당자
                            </FormLabel>
                            <TextField
                                id="manager"
                                name="manager"
                                hiddenLabel
                                InputProps={{
                                    readOnly: false,
                                }}
                                value={formValue.manager || ''}
                                onChange={onChange}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <FormLabel>
                                담당자 번호
                            </FormLabel>
                            <PhoneInput
                                id="managerContact"
                                name="managerContact"
                                hiddenLabel
                                InputProps={{
                                    readOnly: false,
                                }}
                                value={formValue.managerContact || ''}
                                onChange={onChange}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Postcode
                            formValue={formValue}
                            setFormValue={setFormValue}
                            label="호텔 위치"
                            textFieldId="address"
                            textFieldName="address"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <FormLabel>
                                객실 수
                            </FormLabel>
                            <TextField
                                id="totalRooms"
                                name="totalRooms"
                                type='number'
                                hiddenLabel
                                value={formValue.totalRooms || ''}
                                InputProps={{
                                    readOnly: false,
                                }}
                                onChange={onChange}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <FormLabel>
                                청소 인원수
                            </FormLabel>
                            <TextField
                                id="totalCleaningStaffs"
                                name="totalCleaningStaffs"
                                hiddenLabel
                                type='number'
                                value={formValue.totalCleaningStaffs || ''}
                                InputProps={{
                                    readOnly: false,
                                }}
                                onChange={onChange}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <FormLabel>
                                호텔 유선번호
                            </FormLabel>
                            <PhoneInput
                                id="hotelContact"
                                name="hotelContact"
                                hiddenLabel
                                value={formValue.hotelContact || ''}
                                InputProps={{
                                    readOnly: false,
                                }}
                                onChange={onChange}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <FormLabel id="demo-row-radio-buttons-group-label">임대여부</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="ownedRent"
                                onChange={onChange}
                                value={formValue.ownedRent}
                            >
                                <FormControlLabel value="임대건물" control={<Radio />} label="임대건물" />
                                <FormControlLabel value="자가" control={<Radio />} label="자가" />
                            </RadioGroup>
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputFileUpload onChange={handleFileChange} />
                            <Box sx={{ height: 200, width: '100%' }}>
                                <DataGrid
                                    rows={fileRows}
                                    columns={fileColumn}
                                    initialState={{
                                        density: "compact",
                                        pagination: {
                                            paginationModel: {
                                                pageSize: 5,
                                            },
                                        },
                                    }}
                                    pageSizeOptions={[5]}
                                    disableRowSelectionOnClick
                                    localeText={koKR.components.MuiDataGrid.defaultProps.localeText}
                                />
                            </Box>
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
