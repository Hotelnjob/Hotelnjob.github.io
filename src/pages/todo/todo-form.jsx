import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
    Grid,
    Stack,
    FormLabel,
    TextField,
    Typography,
} from '@mui/material';
import { toast } from 'react-toastify';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import { API_POST } from 'utils/common-api';

// ============================|| TODO FORM ||============================ //

export default function TodoForm({ formValue, setFormValue, handleClose }) {
    const [isLoading, setIsLoading] = useState(false);
    const user = JSON.parse(sessionStorage.getItem("user"));

    const initialValues = {
        title: formValue.title || '',
        todo: formValue.todo || '',
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('업무명은 필수 항목입니다.'),
        todo: Yup.string().required('업무 내용은 필수 항목입니다.')
    });

    const onSubmit = async (values, { setSubmitting }) => {
        setIsLoading(true);
        const updatedFormValue = {
            employeeId: user.id,
            progress: "대기",
            ...values,
        };

        const result = await API_POST("/todo/register", updatedFormValue);
        if (result.status !== 200) {
            toast.error("업무 등록 실패", {
                onClose: () => setIsLoading(false)
            });
        } else {
            toast.success("업무 등록 완료", {
                onClose: () => {
                    handleClose();
                    setIsLoading(false);
                }
            });
        }
        setSubmitting(false);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ errors, touched, handleChange, handleBlur }) => (
                <Form noValidate>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <FormLabel>업무명</FormLabel>
                                <Field
                                    as={TextField}
                                    id="title"
                                    name="title"
                                    fullWidth
                                    variant="outlined"
                                    error={touched.title && Boolean(errors.title)}
                                    helperText={touched.title && errors.title}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <FormLabel>담당자</FormLabel>
                                <TextField
                                    id="name"
                                    name="name"
                                    fullWidth
                                    variant="outlined"
                                    value={formValue.name || user.name}
                                    InputProps={{ readOnly: true }}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <FormLabel>업무 담당팀</FormLabel>
                                <TextField
                                    id="department"
                                    name="department"
                                    fullWidth
                                    variant="outlined"
                                    value={formValue.department || user.department}
                                    InputProps={{ readOnly: true }}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <FormLabel>업무 내용</FormLabel>
                                <Field
                                    as={TextField}
                                    id="todo"
                                    name="todo"
                                    fullWidth
                                    multiline
                                    rows={8}
                                    variant="outlined"
                                    error={touched.todo && Boolean(errors.todo)}
                                    helperText={touched.todo && errors.todo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
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
                </Form>
            )}
        </Formik>
    );
}
