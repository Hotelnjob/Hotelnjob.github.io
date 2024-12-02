import { useEffect, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

// assets
import { Box, FormControlLabel, FormLabel, Input, Radio, RadioGroup, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import PhoneInput from 'utils/phoneInput';
import { LoadingButton } from '@mui/lab';
import Postcode from 'components/utilItem/PostCode';
import InputFileUpload from 'utils/fileInput';
import { DataGrid } from '@mui/x-data-grid';
import { koKR } from '@mui/x-data-grid/locales';
import { fileColumn } from 'components/utilItem/fileColumn';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';



// ============================|| JWT - REGISTER ||============================ //

export default function RelCompanyManageForm({ formValue, setFormValue, onSubmit, isLoading, setSelectedFiles, fileRows, setFileRows }) {

    const onChange = (e) => {
        let key = e.target.name;
        let value = e.target.value;
        setFormValue({ ...formValue, [key]: value });
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
                                업체명
                            </FormLabel>
                            <TextField
                                id="companyName"
                                name="companyName"
                                hiddenLabel
                                value={formValue.companyName || ''}
                                onChange={onChange}
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
                            label="주소"
                            textFieldId="address"
                            textFieldName="address"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <FormLabel>
                                업종
                            </FormLabel>
                            <TextField
                                id="businessType"
                                name="businessType"
                                hiddenLabel
                                value={formValue.businessType || ''}
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
                                거래 형태
                            </FormLabel>
                            <TextField
                                id="contractType"
                                name="contractType"
                                hiddenLabel
                                value={formValue.contractType || ''}
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
                                거래시작일
                            </FormLabel>
                            <DatePicker
                                value={formValue.contractDate ? dayjs(formValue.contractDate) : null}
                                format={'YYYY-MM-DD'}
                                onChange={(newValue) => {
                                    onChange({
                                        target: {
                                            name: 'contractDate',
                                            value: newValue ? newValue.format('YYYY-MM-DDTHH:mm:ss') : null
                                        }
                                    });
                                }}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputFileUpload onChange={handleFileChange} />
                            <Box
                                sx={{ height: 200, width: '100%' }}>
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
