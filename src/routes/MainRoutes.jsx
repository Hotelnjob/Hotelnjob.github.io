import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import RequireAuth from './RequireAuth';
import HotelManage from 'pages/hotel/hotel-manage';
import WorkerManage from 'pages/worker/worker-manage';
import RelCompanyManage from 'pages/relcompany/rel-company-manage';
import WorkPlaceManage from 'pages/workplace/workplace-manage';
import WorkHistoryManage from 'pages/workhisory/workhistory-manage';
import ShowMap from 'pages/map/show-map';
import Calendar from 'pages/calendar/calendar';
import TodoList from 'pages/todo/todoList';


const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
const CompanyInfo = Loadable(lazy(() => import('pages/company/companyInfo')));

// render - sample page
const EmployeeManage = Loadable(lazy(() => import('pages/employee/employee-manage')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <RequireAuth><Dashboard /></RequireAuth>,
  children: [
    {
      path: '/dashboard',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'companyInfo',
      element: <CompanyInfo />
    },
    {
      path: 'employee-manage',
      element: <EmployeeManage />
    },
    {
      path: 'hotel',
      element: <HotelManage />
    },
    {
      path: 'worker',
      element: <WorkerManage />
    },
    {
      path: 'relCompany',
      element: <RelCompanyManage />
    },
    {
      path: 'workplace',
      element: <WorkPlaceManage />
    },
    {
      path: 'workhistory',
      element: <WorkHistoryManage />
    },
    {
      path: 'map',
      element: <ShowMap />
    },
    {
      path: 'calendar',
      element: <Calendar />
    },
    {
      path: 'todo',
      element: <TodoList />
    },

  ]
};

export default MainRoutes;
