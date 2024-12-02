import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './kanbancss.css'; // 스타일링을 위한 CSS 파일
import { Button } from '@mui/material';
import { toast } from 'react-toastify';



export default function KanbanBoard({ todoData, setTodoData, setTodoArray }) {
    const [columns, setColumns] = useState({});
    const user = JSON.parse(sessionStorage.getItem("user"));


    useEffect(() => {
        if (todoData && Object.keys(todoData).length > 0) {
            setColumns(todoData);
        }
    }, [todoData]);



    const onDragEnd = (result) => {
        const { destination, source } = result;
        if (!destination) return; // 드래그가 드롭되지 않은 경우 리턴

        const sourceColumn = source.droppableId;
        const destinationColumn = destination.droppableId;
        const movedTask = columns[sourceColumn][source.index]; // 이동된 작업

        if (movedTask.employeeId !== user.id) {
            toast.warn("본인의 업무만 이동 가능합니다.");
            return;
        }

        // progress 업데이트: 각 컬럼에 맞는 진행 상태 설정
        let updatedTask = { ...movedTask };
        if (destinationColumn === "진행") {
            updatedTask = { ...updatedTask, progress: "진행" }; // 진행으로 이동시 progress 변경
        } else if (destinationColumn === "완료") {
            updatedTask = { ...updatedTask, progress: "완료" }; // 완료로 이동시 progress 변경
        } else if (destinationColumn === "대기") {
            updatedTask = { ...updatedTask, progress: "대기" }; // 대기로 이동시 progress 변경
        }

        setTodoArray(prevArray => [...prevArray, updatedTask]);

        // 기존 todoData 상태를 복사하여 사용
        const updatedTodoData = { ...todoData };

        // 같은 열 내에서 작업 이동
        if (sourceColumn === destinationColumn) {
            const columnCopy = [...updatedTodoData[sourceColumn]];
            columnCopy.splice(source.index, 1); // 원래 위치에서 삭제
            columnCopy.splice(destination.index, 0, updatedTask); // 새로운 위치에 삽입

            updatedTodoData[sourceColumn] = columnCopy; // 업데이트된 컬럼 반영
        } else {
            // 다른 열로 작업 이동
            const sourceColumnCopy = [...updatedTodoData[sourceColumn]];
            sourceColumnCopy.splice(source.index, 1); // 원본 열에서 작업 삭제

            const destinationColumnCopy = [...updatedTodoData[destinationColumn]];
            destinationColumnCopy.splice(destination.index, 0, updatedTask); // 대상 열에 작업 삽입

            updatedTodoData[sourceColumn] = sourceColumnCopy; // 원본 열 반영
            updatedTodoData[destinationColumn] = destinationColumnCopy; // 대상 열 반영
        }

        // todoData 상태 업데이트
        setTodoData(updatedTodoData);
    };


    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="kanban-board">
                {Object.keys(columns).map((columnId) => (
                    <Droppable droppableId={columnId} key={columnId}>
                        {(provided) => (
                            <div
                                className={`column ${columnId}`} // 열 ID를 클래스 이름으로 추가
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <div className={`title-container ${columnId}`}>
                                    <h3>{columnId.replace('-', ' ').toUpperCase()}</h3>
                                </div>
                                {columns[columnId].map((task, index) => (
                                    <Draggable
                                        draggableId={String(task.id)}
                                        index={index}
                                        key={task.id}
                                    >
                                        {(provided) => (
                                            <div
                                                className="task"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <div className="task-details">
                                                    <div className="task-title">{task.title}</div>
                                                    <div className="task-writer"> {task.department} {task.writer}</div>
                                                </div>
                                                <div className="task-todo">{task.todo}</div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    );
};
