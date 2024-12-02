import React, { useState, useCallback, useEffect } from "react";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { API_POST, customFetch } from "utils/common-api";
import { CustomToolbar } from "components/utilItem/custom-toolbar";
import { Split } from "@geoffcox/react-splitter";
import EmployeeManageForm from "./employee-manage-form";
import MainCard from "components/MainCard";
import { toast } from "react-toastify";
import ArticleButtonTitle from "components/utilItem/button-title";
import { koKR } from "@mui/x-data-grid/locales";
import dayjs from "dayjs";


const columns = [
  {
    field: 'name',
    headerName: '이름',
    flex: 1.5,
    headerAlign: "center",
    align: "center",
    editable: false,
  },
  {
    field: 'department',
    headerName: '부서',
    flex: 1,
    editable: false,
    headerAlign: "center",
    align: "center",
  },
  {
    field: 'position',
    headerName: '직급',
    flex: 1,
    editable: false,
    headerAlign: "center",
    align: "center",
  },
];

export default function EmployeeList() {
  const [rows, setRows] = useState([]);
  const [formValue, setFormValue] = useState({
    name: '',
    phone: '',
    userId: '',
  });
  const [isLoading, setIsLoading] = useState(false);


  const searchEmployee = () => {
    customFetch({ path: "/employee/emplList", method: "GET" }).then((res) => {
      if (res.status === 200) {
        res.json().then((result) => {
          setRows([...result]);
        });
      }
    })
  };

  const onRowClick = (e) => {
    customFetch({ path: "/employee/" + e.row.id, method: "GET" }).then((res) => {
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
    const result = await API_POST("/employee/join", formValue);
    if (result.status != 200) {
      toast.error("회원정보 수정 실패", {
        onClose: () => setIsLoading(false) // 실패 시에도 로딩 해제
      });
      return;
    } else {
      toast.success("회원정보 수정 완료", {
        onClose: () => setIsLoading(false) // 성공 시에도 로딩 해제
      });
      searchEmployee();
    }
  }


  useEffect(() => {
    searchEmployee();
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
        <ArticleButtonTitle title="직원 목록" showButton={false} />
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            density: 'compact',
          }}
          slots={{
            toolbar: CustomToolbar,
          }}
          onRowClick={onRowClick}
          showCellVerticalBorder
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
      </MainCard>
      <MainCard sx={{ height: '100%' }}>
        <ArticleButtonTitle title="직원 정보" showButton={false} />
        <EmployeeManageForm
          formValue={formValue}
          setFormValue={setFormValue}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </MainCard>
    </Split>
  );
}