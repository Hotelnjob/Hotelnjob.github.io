import { TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import dayjs from "dayjs";

export default function DateRangePicker({ formValue, setFormValue }) {
    // formValue에서 startDate와 endDate를 받아 초기값 설정
    const [dateRange, setDateRange] = useState([
        formValue.startDate ? dayjs(formValue.startDate).toDate() : null,
        formValue.endDate ? dayjs(formValue.endDate).toDate() : null
    ]);

    const [startDate, endDate] = dateRange;

    // dateRange가 변경될 때 formValue도 업데이트
    const handleChange = (update) => {
        const formattedStartDate = update[0] ? dayjs(update[0]).format("YYYY-MM-DD") : null;
        const formattedEndDate = update[1] ? dayjs(update[1]).format("YYYY-MM-DD") : null;

        setDateRange(update);
        setFormValue((prevFormValue) => ({
            ...prevFormValue,
            startDate: formattedStartDate,
            endDate: formattedEndDate
        }));
    };

    useEffect(() => {
        // formValue가 변경되면, dateRange도 업데이트
        setDateRange([
            formValue.startDate ? dayjs(formValue.startDate).toDate() : null,
            formValue.endDate ? dayjs(formValue.endDate).toDate() : null
        ]);
    }, [formValue.startDate, formValue.endDate]);

    return (
        <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={handleChange}
            isClearable={true}
            customInput={<TextField fullWidth />}
            locale={ko}
            dateFormat="yyyy년 MM월 dd일"
            minDate={new Date()}
        />
    );
};
