import { useEffect, useState } from 'react';
import { Grid, Stack, FormLabel, TextField, Button, Box } from '@mui/material';
import ComponentSkeleton from 'pages/component-overview/ComponentSkeleton';
import ComponentWrapper from 'pages/component-overview/ComponentWrapper';
import MainCard from 'components/MainCard';
import ArticleTitle from 'components/utilItem/article-title';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import PhoneInput from 'utils/phoneInput';
import { API_POST, customFetch } from 'utils/common-api';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from "uuid";
import { DaumPostcodeEmbed } from "react-daum-postcode";
import Postcode from 'components/utilItem/PostCode';



export default function CompanyInfo() {
  const [formValue, setFormValue] = useState({
    companyName: "",
    registerNumber: "",
    address: "",
    contact: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenPostPopup, setIsOpenPostPopup] = useState(false);


  const user = JSON.parse(sessionStorage.getItem("user"));
  const userType = user.userType || "";

  const isEditable = userType === 'admin';

  const handleChange = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    setFormValue({ ...formValue, [key]: value });
  };

  const renderCompanyInfo = () => {
    customFetch({ path: "/companyInfo/info/fad7fe52-9c36-40c1-9d41-76df33c7d9f7", method: "GET" }).then((res) => {
      if (res.status === 200) {
        res.json().then((result) => {
          setFormValue({
            ...result
          });
        })
      }
    })
  }


  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const updatedFormValue = {
      id: formValue.id || uuidv4(),
      ...formValue,
    };

    //추후에 변경예정
    customFetch({ path: "/companyInfo/register", method: "POST", body: JSON.stringify(updatedFormValue) }).then((res) => {
      if (res.status != 200) {
        toast.error("회사정보 저장 실패", {
          onClose: () => setIsLoading(false)
        })
        return;
      } else {
        toast.success("회사정보 저장 성공", {
          onClose: () => setIsLoading(false)
        })
        renderCompanyInfo();
      }
    });
  };

  const openPostPopup = () => setIsOpenPostPopup((prev) => !prev);


  useEffect(() => {
    renderCompanyInfo();
  }, []);

  return (
    <MainCard
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    >
      <ArticleTitle title={"회사정보"} />
      <form noValidate onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Stack spacing={1}>
              <FormLabel>회사명</FormLabel>
              <TextField
                id="companyName"
                name="companyName"
                value={formValue.companyName}
                onChange={handleChange}
                fullWidth
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              <FormLabel>사업자번호</FormLabel>
              <TextField
                id="registerNumber"
                name="registerNumber"
                value={formValue.registerNumber}
                onChange={handleChange}
                fullWidth
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
              <FormLabel>전화번호</FormLabel>
              <PhoneInput
                id="contact"
                name="contact"
                hiddenLabel
                value={formValue.contact || ''}
                InputProps={{
                  readOnly: !isEditable,
                }}
                onChange={handleChange}
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
    </MainCard>
  );
}
