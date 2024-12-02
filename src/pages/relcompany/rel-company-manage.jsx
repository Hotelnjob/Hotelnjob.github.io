import React, { useState, useCallback, useEffect } from "react";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { API_POST, customFetch, formDataFetch } from "utils/common-api";
import { CustomToolbar } from "components/utilItem/custom-toolbar";
import { Split } from "@geoffcox/react-splitter";
import MainCard from "components/MainCard";
import { toast } from "react-toastify";
import ArticleButtonTitle from "components/utilItem/button-title";
import { relCompanyColumn } from "./rel-company-colums";
import { v4 as uuidv4 } from "uuid";
import { koKR } from '@mui/x-data-grid/locales';
import relCompanyManageForm from "./rel-comapny-manage-form";
import RelCompanyManageForm from "./rel-comapny-manage-form";
import { Box } from "@mui/system";

export default function RelCompanyManage() {
  const [rows, setRows] = useState([]);
  const [formValue, setFormValue] = useState({
    companyName: '',
    manager: '',
    managerContact: '',
    address: '',
    businessType: '',
    contractType: '',
    contractDate: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileRows, setFileRows] = useState([]);

  const searchHotel = () => {
    customFetch({ path: "/relCompany/list", method: "GET" }).then((res) => {
      if (res.status === 200) {
        res.json().then((result) => {
          setRows([...result]);
        });
      }
    })
  };

  const searchFile = (requestId) => {
    customFetch({ path: "/files/list/" + requestId, method: "GET" }).then((res) => {
      if (res.status === 200) {
        res.json().then((result) => {
          setFileRows([...result]);
        });
      } else if (res.status === 204) {
        setFileRows([]);
      }
    })
  };

  const onRowClick = (e) => {
    searchFile(e.row.id);
    customFetch({ path: "/relCompany/id/" + e.row.id, method: "GET" }).then((res) => {
      if (res.status === 200) {
        res.json().then((result) => {
          setFormValue(result);
        });
      }
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const updatedFormValue = {
      id: formValue.id || uuidv4(),
      ...formValue,
    };

    if (selectedFiles.length > 0) {
      const fileUploadResult = await fileUpload(updatedFormValue);
      if (!fileUploadResult) {
        toast.error("파일 업로드 실패", {
          onClose: () => setIsLoading(false)
        });
        return;
      }
    }

    const result = await API_POST("/relCompany/register", updatedFormValue);
    if (result.status != 200) {
      toast.error("연관업체 정보 저장 실패", {
        onClose: () => setIsLoading(false)
      });
      return;
    } else {
      toast.success("연관업체 정보 저장 완료", {
        onClose: () => setIsLoading(false)
      });
      searchHotel();
    }
  }


  async function fileUpload(updatedFormValue) {
    if (!selectedFiles || selectedFiles.length === 0) {
      console.log("파일을 선택해주세요.");
      return false;
    }
    const formData = new FormData(); // FormData 객체 생성
    formData.append("requestId", updatedFormValue.id);
    for (let file of selectedFiles) {
      formData.append("files", file);
    }

    try {
      const res = await formDataFetch('/files/upload', "POST", formData);
      if (res.status === 200) {
        console.log("파일 저장 성공")
        return true;
      } else {
        console.log("파일 저장 실패")
        return false;
      }
    } catch (error) {
      console.log("파일 저장 중 오류가 발생했습니다.");
      console.error("파일 저장 중 오류:", error); // 오류 메시지 출력
      return false;
    }
  }



  const handleReset = () => {
    setFormValue({
      companyName: '',
      manager: '',
      managerContact: '',
      address: '',
      businessType: '',
      contractType: '',
      contractDate: '',
    });
    setFileRows([]);
  };

  useEffect(() => {
    searchHotel();
  }, []);


  return (
    <Split
      initialPrimarySize="40%"
      minPrimarySize="200px"
      style={{ display: 'flex', height: '100vh', width: '100%', overflow: 'hidden' }} // 전체 스크롤 숨기기
    >
      <MainCard
        sx={{
          height: '100%', // 왼쪽 카드 높이 설정
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          overflow: 'hidden', // 스크롤 숨기기
        }}
      >
        <ArticleButtonTitle title="연관업체 목록" showButton={false} />
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={relCompanyColumn}
            initialState={{
              density: "compact",
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            slots={{
              toolbar: CustomToolbar,
            }}
            pageSizeOptions={[10]}
            disableRowSelectionOnClick
            onRowClick={onRowClick}
            sx={{
              '& .MuiDataGrid-cell, & .MuiDataGrid-columnSeparator': {
                borderColor: '#ddd',
              },
              '& .MuiDataGrid-columnHeaders': {
                borderBottom: '1px solid #ddd',
              },
            }}
            localeText={koKR.components.MuiDataGrid.defaultProps.localeText}
          />
        </Box>
      </MainCard>
      <MainCard sx={{ height: '100%', overflow: 'hidden' }}>
        <ArticleButtonTitle title="연관업체 정보" showButton={true} buttonText={"초기화"} onButtonClick={handleReset} />
        <div style={{ flexGrow: 1, overflowY: 'auto' }}> {/* 내부에 스크롤 추가 */}
          <RelCompanyManageForm
            formValue={formValue}
            setFormValue={setFormValue}
            onSubmit={onSubmit}
            isLoading={isLoading}
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
            fileRows={fileRows}
            setFileRows={setFileRows}
          />
        </div>
      </MainCard>
    </Split >
  );
}