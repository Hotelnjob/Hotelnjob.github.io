import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { API_POST, customFetch } from 'utils/common-api';
import LoginIcon from '@mui/icons-material/Login';


// ============================|| JWT - LOGIN ||============================ //

export default function AuthLogin({ isDemo = false }) {
  const [checked, setChecked] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await API_POST("/employee/login", values).then((res) => {
        if (res.status === 200) {
          res.json().then((result) => {
            console.log(result);
            //세션에 저장
            sessionStorage.setItem("user", JSON.stringify(result));
          })
          toast.success("로그인 성공", {
            autoClose: 1000,
            onClose: () => navigate("/dashboard"),
          });
        } else {
          toast.error("로그인 실패");
        }
      });
    } catch (error) {
      toast.error("로그인 요청 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <Formik
        initialValues={{
          userId: '',
          password: '',
        }}
        validationSchema={Yup.object().shape({
          userId: Yup.string().max(255).required('아이디는 필수입니다.'),
          password: Yup.string().max(255).required('비밀번호는 필수입니다.')
        })}
        onSubmit={async (values, actions) => {
          const errors = await actions.validateForm();
          if (Object.keys(errors).length > 0) {
            toast.error("필수 항목을 모두 입력하세요.");
            actions.setSubmitting(false);
          } else {
            await handleSubmit(values, actions);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="userId-login">아이디</InputLabel>
                  <OutlinedInput
                    id="userId-login"
                    type="text"
                    value={values.userId}
                    name="userId"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="아이디를 입력하세요"
                    fullWidth
                    error={Boolean(touched.userId && errors.userId)}
                  />
                </Stack>
                {touched.userId && errors.userId && (
                  <FormHelperText error id="standard-weight-helper-text-email-login">
                    {errors.userId}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">비밀번호</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
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
                    placeholder="비밀번호를 입력하세요."
                  />
                </Stack>
                {touched.password && errors.password && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {errors.password}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                        size="small"
                      />
                    }
                    label={<Typography variant="h6">로그인 유지</Typography>}
                  />
                  {/* <Link variant="h6" component={RouterLink} color="text.primary">
                    Forgot Password?
                  </Link> */}
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary" startIcon={<LoginIcon />}>
                    로그인
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

AuthLogin.propTypes = { isDemo: PropTypes.bool };
