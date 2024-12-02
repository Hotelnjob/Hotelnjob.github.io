import React, { useState, useCallback, useEffect } from "react";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { API_POST, customFetch, formDataFetch } from "utils/common-api";
import { CustomToolbar } from "components/utilItem/custom-toolbar";
import { Split } from "@geoffcox/react-splitter";
import MainCard from "components/MainCard";
import { toast } from "react-toastify";
import ArticleButtonTitle from "components/utilItem/button-title";
import { v4 as uuidv4 } from "uuid";
import { koKR } from '@mui/x-data-grid/locales';
import WorkerManageForm from "./worker-manage-form";
import { workerColumn } from "./worker-column";
import { Box } from "@mui/system";



export default function WorkerManage() {
  const [rows, setRows] = useState([]);
  const [formValue, setFormValue] = useState({
    name: '',
    age: '',
    gender: '',
    contact: '',
    region: '',
    nationality: '',
    visaType: '',
    visaExpiryDate: null,
    career: '',
    korean: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileRows, setFileRows] = useState([]);


  const searchWorker = () => {
    customFetch({ path: "/worker/list", method: "GET" }).then((res) => {
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
    customFetch({ path: "/worker/id/" + e.row.id, method: "GET" }).then((res) => {
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

    const result = await API_POST("/worker/register", updatedFormValue);
    if (result.status != 200) {
      toast.error("인력 정보 저장 실패", {
        onClose: () => setIsLoading(false)
      });
      return;
    } else {
      toast.success("인력 정보 저장 완료", {
        onClose: () => setIsLoading(false)
      });
      searchWorker();
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
      hotelName: '',
      manager: '',
      managerContact: '',
      address: '',
      totalRooms: '',
      totalCleaningStaffs: '',
      hotelContact: '',
      ownedRent: ''
    });
    setFileRows([]);
  };

  useEffect(() => {
    searchWorker();
  }, []);


  return (
    <Split
      initialPrimarySize="40%"
      minPrimarySize="200px"
      style={{ display: 'flex', height: '100vh', width: '100%' }}
    >
      <MainCard
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        <ArticleButtonTitle title="인력 목록" showButton={false} />
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={workerColumn}
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
      <MainCard sx={{ height: '100%' }}>
        <ArticleButtonTitle title="인력 정보" showButton={true} buttonText={"초기화"} onButtonClick={handleReset} />
        <WorkerManageForm
          formValue={formValue}
          setFormValue={setFormValue}
          onSubmit={onSubmit}
          isLoading={isLoading}
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
          fileRows={fileRows}
          setFileRows={setFileRows}
        />
      </MainCard>
    </Split>
  );
}