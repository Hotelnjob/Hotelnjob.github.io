import { Stack, Typography } from "@mui/material";
import Dot from "components/@extended/Dot";
import dayjs from "dayjs";
import Button from "themes/overrides/Button";
import { REQUEST_URL } from "utils/common-api";
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export const fileColumn = [
    {
        field: 'fileName',
        headerName: '파일명',
        flex: 1.5,
        headerAlign: "center",
        align: "center",
        editable: false,
        renderCell: (params) => (
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" sx={{ width: '100%' }}>
                {params.row.isNewFile && <Dot color="success" />}&nbsp;&nbsp;
                {params.value}
            </Stack>
        ),
    },
    {
        field: 'fileType',
        headerName: '파일 타입',
        flex: 1,
        editable: false,
        headerAlign: "center",
        align: "center",
    },
    {
        field: 'uploadDate',
        headerName: '등록일',
        flex: 1,
        editable: false,
        headerAlign: "center",
        align: "center",
        valueFormatter: (params) => {
            return params ? dayjs(params).format("YYYY-MM-DD") : "";
        },
    },
    {
        field: 'download',
        headerName: '다운로드',
        width: 100,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => {
            return (
                <FileDownloadIcon
                    className="text-xl"
                    onClick={() => handleDownload(params.row.fileName)}
                />
            );
        },
    },
]

const handleDownload = (fileName) => {
    const downloadLink = document.createElement('a');
    downloadLink.href = `${REQUEST_URL}/files/download/${fileName}`;
    downloadLink.setAttribute('download', fileName);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
};
