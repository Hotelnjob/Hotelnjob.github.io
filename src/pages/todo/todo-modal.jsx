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
import TodoForm from "./todo-form";
import MainCard from "components/MainCard";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    height: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function TodoModal({ open, setOpen, taskId }) {
    const [formValue, setFormValue] = useState({
        name: "",
        department: "",
    })



    const handleClose = () => {
        setFormValue({})
        setOpen(false)
    };

    useEffect(() => {
    }, [formValue])


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{ ...style, display: 'flex', flexDirection: 'column' }}>
                <ArticleButtonTitle title="업무 일지" showButton={false} />
                <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                    <MainCard>
                        <TodoForm formValue={formValue} setFormValue={setFormValue} handleClose={handleClose} />
                    </MainCard>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        mt: 2,
                    }}
                >
                </Box>
            </Box>

        </Modal>
    );
}
