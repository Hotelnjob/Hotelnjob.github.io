import { useEffect, useState } from 'react';
import { Grid, Stack, FormLabel, TextField, Button, Box } from '@mui/material';
import ComponentSkeleton from 'pages/component-overview/ComponentSkeleton';
import MainCard from 'components/MainCard';
import ArticleTitle from 'components/utilItem/article-title';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import PhoneInput from 'utils/phoneInput';
import { API_POST, customFetch } from 'utils/common-api';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from "uuid";
import { DaumPostcodeEmbed } from "react-daum-postcode";
import Postcode from 'components/utilItem/PostCode';
import ComboBox from '../../components/utilItem/combo-box';
import KanbanBoard from 'components/kanban/kanban';
import ArticleButtonTitle from 'components/utilItem/button-title';
import TodoModal from './todo-modal';



export default function TodoList() {
  const [modalOpen, setModalOpen] = useState(false);
  const [todoData, setTodoData] = useState({
    대기: [],
    진행: [],
    완료: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [todoArray, setTodoArray] = useState([]);
  const [department, setDepartment] = useState([]);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const searchDepartment = () => {
    customFetch({ path: "/employee/department", method: "GET" }).then((res) => {
      if (res.status === 200) {
        res.json().then((result) => {
          setDepartment(result);
        })
      }
    })
  }

  const handleSelection = (selectedValue) => {
    if (!selectedValue) {
      searchTodo();
    }
    customFetch({ path: "/todo/list/department/" + selectedValue, method: "GET" }).then((res) => {
      if (res.status === 200) {
        res.json().then((result) => {
          const groupedData = {
            대기: result.filter((todo) => todo.progress === "대기"),
            진행: result.filter((todo) => todo.progress === "진행"),
            완료: result.filter((todo) => todo.progress === "완료")
          };

          setTodoData(groupedData);
        })
      }
    })
  };


  const searchTodo = () => {
    customFetch({ path: "/todo/list", method: "GET" }).then((res) => {
      if (res.status === 200) {
        res.json().then((result) => {
          const groupedData = {
            대기: result.filter((todo) => todo.progress === "대기"),
            진행: result.filter((todo) => todo.progress === "진행"),
            완료: result.filter((todo) => todo.progress === "완료")
          };

          setTodoData(groupedData);
        });
      }
    });
  };


  const saveTodoStatus = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    customFetch({ path: "/todo/progress", method: "POST", body: JSON.stringify(todoArray) }).then((res) => {
      if (res.status != 200) {
        toast.error("업무일지 저장 실패", {
          onClose: () => setIsLoading(false)
        })
        return;
      } else {
        toast.success("업무일지 저장 성공", {
          onClose: () => setIsLoading(false)
        })
        setTodoArray([]);
        searchTodo();
      }
    });
  }

  useEffect(() => {
    searchDepartment()
    searchTodo()
  }, [])

  useEffect(() => {
    if (!modalOpen) {
      searchTodo(); // 모달이 닫힐 때 실행
    }
  }, [modalOpen]);

  return (
    <MainCard
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    >
      <ArticleButtonTitle title={"업무일지"} buttonText={"업무 등록"} onButtonClick={handleModalOpen} />
      <ComboBox
        label={"부서 선택"}
        options={department}
        placeholder={"부서를 선택해주세요."}
        onSelect={handleSelection}
      />
      <KanbanBoard
        todoData={todoData}
        setTodoData={setTodoData}
        setTodoArray={setTodoArray}
      />
      <Grid item xs={12} container justifyContent="flex-end">
        <LoadingButton
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={saveTodoStatus}
          loading={isLoading}
          loadingPosition="start"
        >
          저장
        </LoadingButton>
      </Grid>
      <TodoModal open={modalOpen} setOpen={setModalOpen} />
    </MainCard>
  );
}
