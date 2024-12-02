import MainCard from "components/MainCard";
import React, { useEffect, useState } from "react";
import { API_POST, customFetch, formDataFetch } from "utils/common-api";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { DataGrid } from "@mui/x-data-grid";
import { CustomToolbar } from "components/utilItem/custom-toolbar";
import { koKR } from '@mui/x-data-grid/locales';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchOutlined from '@ant-design/icons/SearchOutlined'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './calendar.css';
import Modal from '@mui/material/Modal';
import { Box } from "@mui/system";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import interactionPlugin from '@fullcalendar/interaction';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { v4 as uuidv4 } from "uuid";
import { addDays } from 'date-fns';


export default function Calendar() {

    const [schedules, setSchedules] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [newEventTitle, setNewEventTitle] = useState("");
    const [newEventDescription, setNewEventDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [employeeId, setEmployeeId] = useState("");
    const [employeeName, setEmployeeName] = useState("");
    const user = JSON.parse(sessionStorage.getItem("user"));

    // 일정 목록 가져오기
    const fetchEvents = () => {
        customFetch({ path: "/calendar/list", method: "GET" }).then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    // 받은 데이터를 FullCalendar 이벤트 형식으로 변환
                    const events = data.map(event => ({
                        id: event.id,  // 서버에서 받은 이벤트 ID
                        title: event.title,  // 이벤트 제목
                        description: event.description,  // 이벤트 설명
                        start: event.startDate,  // 시작 날짜
                        end: new Date(event.endDate),  // 종료 날짜
                        extendedProps: {
                            description: event.description,  // 추가 정보는 extendedProps에 포함
                            employeeName: event.employeeName,
                            empmployeeId: event.employeeId,
                        },

                    }));
                    setSchedules(events);  // 상태 업데이트
                });
            }
        });
    };

    // 새 일정 추가
    const addEvent = () => {
        setSelectedEvent(null);
        const newEvent = {
            id: uuidv4(),
            title: newEventTitle,
            description: newEventDescription,
            startDate: startDate,
            endDate: endDate,
            employeeId: user.id,
            employeeName: user.name,

        };
        customFetch({ path: "/calendar/register", method: "POST", body: JSON.stringify(newEvent) }).then((res) => {
            if (res.status === 200) {
                fetchEvents();
                closeModal();
            }
        });
    };

    const handleEventClick = (info) => {
        setSelectedEvent({
            id: info.event.id,
            title: info.event.title,
            description: info.event.extendedProps.description,
            start: info.event.start,
            end: info.event.end,
            employeeId: info.event.extendedProps.employeeId,
            employeeName: info.event.extendedProps.employeeName,
        });
        setModalOpen(true);
    };




    // 날짜 클릭 시 모달 열기
    const openModal = (info) => {
        setSelectedEvent(null);  // 새 일정을 추가할 때 기존 선택된 이벤트를 초기화
        setSelectedDate(info.dateStr); // 클릭한 날짜 저장
        setStartDate(info.dateStr); // 클릭한 날짜를 startDate로 설정
        setEndDate(info.dateStr); // 종료 날짜도 시작 날짜와 동일하게 설정 (필요에 따라 조정)
        setModalOpen(true);
    };

    // 모달 닫기
    const closeModal = () => {
        setModalOpen(false);
        setSelectedEvent(null);  // 모달을 닫을 때 selectedEvent 초기화
        setNewEventTitle("");  // 제목 초기화
        setNewEventDescription("");  // 설명 초기화
        setStartDate("");  // 시작 날짜 초기화
        setEndDate("");  // 종료 날짜 초
        setModalOpen(false);
        setSelectedEvent(null);  // 모달을 닫을 때 selectedEvent 초기화
    };



    useEffect(() => {
        console.log('스케줄 조회', schedules);
        fetchEvents();
    }, []);

    return (
        <MainCard>
            <div><h2>일정</h2></div>
            <div id="calendar-container">
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    height="auto"
                    headerToolbar={{
                        start: "prev next",
                        center: "title",
                        end: "dayGridMonth dayGridWeek",
                    }}
                    locale={'ko'}
                    events={schedules}
                    dateClick={openModal} // 날짜 클릭 시 openModal 호출
                    eventClick={handleEventClick}  // 이벤트 클릭 핸들러 등록

                    displayEventTime={false}
                />
            </div>

            <Modal
                open={modalOpen}
                onClose={closeModal}
                aria-labelledby="event-modal"
                aria-describedby="modal-to-view-or-add-event"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    {/* 새 일정 추가 또는 이벤트 상세보기 모달 */}
                    {selectedEvent ? (
                        <>
                            <h2>일정 상세보기</h2>
                            <p><strong>제목:</strong> {selectedEvent.title}</p>
                            <p><strong>설명:</strong> {selectedEvent.description}</p>
                            <p><strong>시작 날짜:</strong> {new Date(selectedEvent.start).toLocaleDateString()}</p>
                            <p><strong>종료 날짜:</strong> {selectedEvent.end ? new Date(selectedEvent.end).toLocaleDateString() : "N/A"}</p>
                            <p><strong>담당:</strong> {selectedEvent.employeeName}</p>
                            <Button variant="contained" color="primary" fullWidth onClick={closeModal} sx={{ mt: 2 }}>
                                닫기
                            </Button>
                        </>
                    ) : (
                        <>
                            <h2>새 일정 추가</h2>
                            <TextField
                                fullWidth
                                label="일정 제목"
                                variant="outlined"
                                value={newEventTitle}
                                onChange={(e) => setNewEventTitle(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <TextareaAutosize
                                minRows={3}
                                placeholder="일정 설명"
                                value={newEventDescription}
                                onChange={(e) => setNewEventDescription(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    fontSize: '16px',
                                    borderRadius: '4px',
                                    borderColor: '#ccc',
                                    marginBottom: '16px',
                                }}
                            />
                            <TextField
                                fullWidth
                                label="시작 날짜"
                                variant="outlined"
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                sx={{ mb: 2 }}
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                fullWidth
                                label="종료 날짜"
                                variant="outlined"
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                sx={{ mb: 2 }}
                                InputLabelProps={{ shrink: true }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={addEvent}
                            >
                                일정 추가
                            </Button>
                        </>
                    )}
                </Box>
            </Modal>
        </MainCard>
    );
}