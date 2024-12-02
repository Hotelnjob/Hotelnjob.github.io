import React, { useState, useCallback, useEffect } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { customFetch } from 'utils/common-api';
import { DataGrid } from "@mui/x-data-grid";
import { workerColumn } from "pages/worker/worker-column";
import { CustomToolbar } from "components/utilItem/custom-toolbar";
import { koKR } from '@mui/x-data-grid/locales';
import ArticleButtonTitle from "components/utilItem/button-title";
import { LoadingButton } from "@mui/lab";
import SaveIcon from '@mui/icons-material/Save';
import { Button } from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    height: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function WorkPlaceModal({ open, setOpen, setFormValue, formValue }) {
    const [workerRows, setWorkerRows] = useState([]);
    const [rowSelection, setRowSelection] = useState([]);

    const handleClose = () => setOpen(false);

    const searchWorker = () => {
        customFetch({ path: "/worker/list", method: "GET" }).then((res) => {
            if (res.status === 200) {
                res.json().then((result) => {
                    setWorkerRows([...result]);
                });
            }
        })
    };

    const handleSelectionChange = (newSelection) => {
        setRowSelection(newSelection);
    };

    const handleSelectButtonClick = () => {
        const selectedData = workerRows.find((row) => rowSelection.includes(row.id));
        setFormValue(selectedData);
        handleClose();
    };





    useEffect(() => {
        searchWorker();
    }, []);


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{ ...style, display: 'flex', flexDirection: 'column' }}>
                <ArticleButtonTitle title="인력 목록" showButton={false} />
                <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
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
                        checkboxSelection
                        disableMultipleRowSelection
                        onRowSelectionModelChange={handleSelectionChange}
                    />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        mt: 2,
                    }}
                >
                    <Button
                        variant="outlined"
                        onClick={handleSelectButtonClick}
                    >
                        선택
                    </Button>
                </Box>
            </Box>

        </Modal>
    );
}
