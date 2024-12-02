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
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import { customFetch } from 'utils/common-api';
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from "uuid";
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import PhoneInput from 'src/utils/phoneInput';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';


export default function AuthRegister() {
  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await customFetch({
        path: '/employee/join',
        method: "POST",
        body: JSON.stringify(values)
      });

      if (response.status === 200) {
        toast.success("회원가입 성공!", {
          onClose: () => navigate("/login")
        });
      } else {
        toast.error("회원가입 실패!");
      }
    } catch (error) {
      toast.error("회원가입 요청 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          id: uuidv4(),
          name: '',
          userId: '',
          phone: '',
          birth: '',
          password: ''
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required('이름은 필수입니다.'),
          userId: Yup.string().max(255).required('아이디는 필수입니다.'),
          password: Yup.string().max(255).required('비밀번호는 필수입니다.'),
          phone: Yup.string().max(255).required('전화번호는 필수입니다.'),
          birth: Yup.string().max(255).required('생년월일은 필수입니다.'),
        })}
        onSubmit={async (values, actions) => {
          const errors = await actions.validateForm();
          if (Object.keys(errors).length > 0) {
            toast.error("필수 항목을 모두 입력하세요.");
            actions.setSubmitting(false);
          } else {
            await handleSubmit(values, actions); // 서버 요청
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="name-signup">이름 *</InputLabel>
                  <OutlinedInput
                    id="name-signup"
                    type="text"
                    value={values.name}
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    error={Boolean(touched.name && errors.name)}
                  />
                </Stack>
                {touched.name && errors.name && (
                  <FormHelperText error id="helper-text-firstname-signup">
                    {errors.name}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="phone-signup">전화번호 *</InputLabel>
                  <PhoneInput
                    name="phone"
                    value={values.phone}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    error={Boolean(touched.phone && errors.phone)}
                    fullWidth
                    onBlur={handleBlur}
                  />
                </Stack>
                {touched.phone && errors.phone && (
                  <FormHelperText error id="helper-text-firstname-signup">
                    {errors.phone}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="birth-signup">생년월일 *</InputLabel>
                  <DatePicker
                    value={values.birth ? dayjs(values.birth) : null}
                    format={'YYYY-MM-DD'}
                    onChange={(newValue) => {
                      handleChange({
                        target: { name: 'birth', value: newValue ? newValue.format('YYYY-MM-DD') : null }
                      });
                    }}
                    renderInput={(params) => (
                      <OutlinedInput
                        name="birth"
                        {...params}
                        id="birth-signup"
                        fullWidth
                        onBlur={handleBlur}
                        error={Boolean(touched.birth && errors.birth)}
                      />
                    )}
                  />
                </Stack>
                {touched.birth && errors.birth && (
                  <FormHelperText error id="helper-text-birth-signup">
                    {errors.birth}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="userId-signup">아이디 *</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.userId && errors.userId)}
                    id="userId-signup"
                    type="text"
                    value={values.userId}
                    name="userId"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                </Stack>
                {touched.userId && errors.userId && (
                  <FormHelperText error id="helper-text-email-signup">
                    {errors.userId}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-signup">비밀번호 *</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-signup"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="******"
                    inputProps={{}}
                  />
                </Stack>
                {touched.password && errors.password && (
                  <FormHelperText error id="helper-text-password-signup">
                    {errors.password}
                  </FormHelperText>
                )}
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary" startIcon={<AssignmentIndOutlinedIcon />}>
                    가입하기
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
