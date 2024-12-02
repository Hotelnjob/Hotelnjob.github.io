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
import { Box } from "@mui/system";
import { hotelColumn } from "pages/hotel/hotel-colums";
import { workerColumn } from "pages/worker/worker-column";
import WorkPlaceModal from "./workplace-modal";
import WorkPlaceWorkerForm from "./workplace-worker-form";
import WorkPlaceManageForm from "./workplace-manage-form";



export default function WorkPlaceManage() {
  const [hotelRows, setHotelRows] = useState([]);
  const [workerRows, setWorkerRows] = useState([]);
  const [formValue, setFormValue] = useState({
    id: '',
    name: '',
    age: '',
    gender: '',
    contact: '',
    visaType: '',
    career: '',
    korean: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [workPlaceModalOpen, setWorkPlaceModalOpen] = useState(false);
  const [workPlaceForm, setWorkPlaceForm] = useState({
    hotelId: '',
    workType: '',        // 근무형태
    workPlace: '',       // 근무지
    transCompany: '',    // 송출업체
    startDate: null,     // 시작 날짜
    endDate: null,       // 종료 날짜
  });

  const searchHotel = () => {
    customFetch({ path: "/hotel/list", method: "GET" }).then((res) => {
      if (res.status === 200) {
        res.json().then((result) => {
          setHotelRows([...result]);
        });
      }
    })
  };


  const onHotelRowClick = (e) => {
    customFetch({ path: "/hotel/workers/" + e.row.id, method: "GET" }).then((res) => {
      if (res.status === 200) {
        res.json().then((result) => {
          setFormValue({});
          setWorkPlaceForm({
            hotelId: e.row.id,
            workPlace: result.hotelName,
            workType: '',
            transCompany: '',
            startDate: null,
            endDate: null,
          });
          setWorkerRows([...result.workers])
        });
      }
    });
  };

  const onWorkerRowClick = (e) => {
    customFetch({ path: "/worker/id/" + e.row.id, method: "GET" }).then((res) => {
      if (res.status === 200) {
        res.json().then((result) => {
          setFormValue({
            ...result,
          })
          setWorkPlaceForm({
            ...result,
          })
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
      ...workPlaceForm,
    };


    customFetch({ path: "/worker/register", method: "POST", body: JSON.stringify(updatedFormValue) }).then((res) => {
      if (res.status != 200) {
        toast.error("근무지 정보 저장 실패", {
          onClose: () => setIsLoading(false)
        });
        return;
      } else {
        toast.success("근무지 정보 저장 완료", {
          onClose: () => {
            setIsLoading(false)
            setFormValue([]);
            setWorkPlaceForm([]);
          }
        });
      }
    }
    )
  }

  const handleModalOpen = () => {
    setWorkPlaceModalOpen(true);
  };


  useEffect(() => {
    searchHotel();
  }, []);


  return (
    <Split
      initialPrimarySize="40%"
      minPrimarySize="200px"
      style={{ display: 'flex', height: '100hz', width: '100%', overflow: 'hidden' }}
    >
      <MainCard
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          overflow: 'hidden', // 스크롤 숨기기
        }}
      >
        <ArticleButtonTitle title="호텔 목록" showButton={false} />
        <Box sx={{ height: '60%', width: '100%' }}>
          <DataGrid
            rows={hotelRows}
            columns={hotelColumn}
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
            onRowClick={onHotelRowClick}
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
        <ArticleButtonTitle title="근무자 목록" showButton={false} />
        <Box sx={{ height: '50%', width: '100%' }}>
          <DataGrid
            rows={workerRows}
            columns={workerColumn}
            initialState={{
              density: "compact",
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            slots={{
              toolbar: CustomToolbar,
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            sx={{
              '& .MuiDataGrid-cell, & .MuiDataGrid-columnSeparator': {
                borderColor: '#ddd',
              },
              '& .MuiDataGrid-columnHeaders': {
                borderBottom: '1px solid #ddd',
              },
            }}
            localeText={koKR.components.MuiDataGrid.defaultProps.localeText}
            onRowClick={onWorkerRowClick}
          />
        </Box>
      </MainCard>
      <MainCard sx={{ height: '100%', overflow: 'hidden' }}>
        <ArticleButtonTitle title="인력 정보" showButton={true} buttonText={"검색"} onButtonClick={handleModalOpen} />
        <WorkPlaceModal open={workPlaceModalOpen} setOpen={setWorkPlaceModalOpen} setFormValue={setFormValue} formValue={formValue} />
        <div style={{ flexGrow: 1, overflowY: 'auto' }}> {/* 내부에 스크롤 추가 */}
          <WorkPlaceWorkerForm
            formValue={formValue}
          />
          <ArticleButtonTitle title="근무 조건" showButton={false} />
          <WorkPlaceManageForm
            formValue={workPlaceForm}
            setFormValue={setWorkPlaceForm}
            onSubmit={onSubmit}
            isLoading={isLoading}
          />
        </div>
      </MainCard>
    </Split >
  );
}