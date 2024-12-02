import React, { useState, useCallback, useEffect } from "react";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { API_POST, customFetch, formDataFetch } from "utils/common-api";
import { CustomToolbar } from "components/utilItem/custom-toolbar";
import { Split } from "@geoffcox/react-splitter";
import MainCard from "components/MainCard";
import ArticleButtonTitle from "components/utilItem/button-title";
import { koKR } from '@mui/x-data-grid/locales';
import { Box } from "@mui/system";
import { hotelColumn } from "pages/hotel/hotel-colums";
import { workerColumn } from "pages/worker/worker-column";
import { historyColumn } from "./history-column";



export default function WorkHistoryManage() {
  const [hotelRows, setHotelRows] = useState([]);
  const [workerRows, setWorkerRows] = useState([]);
  const [historyRows, setHistoryRows] = useState([]);

  const searchHotel = () => {
    customFetch({ path: "/hotel/list", method: "GET" }).then((res) => {
      if (res.status === 200) {
        res.json().then((result) => {
          setHotelRows([...result]);
        });
      }
    })
  };

  const searchWorker = () => {
    customFetch({ path: "/worker/list", method: "GET" }).then((res) => {
      if (res.status === 200) {
        res.json().then((result) => {
          setWorkerRows([...result]);
        });
      }
    })
  };

  const onRowClick = (e, isHotel) => {
    const path = isHotel ? `/history/hotelId/` : `/history/workerId/`;
    customFetch({ path: path + e.row.id, method: "GET" }).then((res) => {
      if (res.status == 200) {
        res.json().then((result) => {
          console.log(result);
          setHistoryRows([...result]);
        })
      }
    })
  }


  useEffect(() => {
    searchHotel();
    searchWorker();
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
        <Box sx={{ height: '50%', width: '100%' }}>
          <DataGrid
            rows={hotelRows}
            columns={hotelColumn}
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
            onRowClick={(e) => onRowClick(e, true)}
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
            onRowClick={(e) => onRowClick(e, false)}
          />
        </Box>
      </MainCard>
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
        <ArticleButtonTitle title="이력" showButton={false} />
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            rows={historyRows}
            columns={historyColumn}
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
    </Split >
  );
}