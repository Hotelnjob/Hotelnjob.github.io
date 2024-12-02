// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import BusinessIcon from '@mui/icons-material/Business';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import MenuBookIcon from '@mui/icons-material/MenuBook';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined,
  AccountBoxIcon,
  BusinessIcon,
  FormatListBulletedIcon,
  MenuBookIcon,
};

const pages = {
  id: 'authentication',
  title: '회사정보',
  type: 'group',
  children: [
    {
      id: 'companyInfo1',
      title: '회사정보',
      type: 'item',
      url: '/companyInfo',
      icon: icons.BusinessIcon,
    },
    {
      id: 'employeeManage',
      title: '직원정보',
      type: 'item',
      url: '/employee-manage',
      icon: icons.AccountBoxIcon
    },
    {
      id: 'calendar',
      title: '일정',
      type: 'item',
      url: '/calendar',
      icon: icons.AccountBoxIcon
    },
    {
      id: 'todo',
      title: '업무일지',
      type: 'item',
      url: '/todo',
      icon: MenuBookIcon
    },
  ]
};

export default pages;