// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';
import FactCheckIcon from '@mui/icons-material/FactCheck';

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined,
  FactCheckIcon,
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
  id: 'support',
  title: '근무지 정보',
  type: 'group',
  children: [
    {
      id: 'workplace',
      title: '근무지 등록',
      type: 'item',
      url: '/workplace',
      icon: icons.FactCheckIcon,
    },
    {
      id: 'workhistory',
      title: '근무 이력',
      type: 'item',
      url: '/workhistory',
      icon: icons.FactCheckIcon,
    },
    {
      id: 'map',
      title: '지도로 검색',
      type: 'item',
      url: '/map',
      icon: icons.FactCheckIcon,
    },
    {
      id: 'documentation',
      title: 'Documentation',
      type: 'item',
      url: 'https://codedthemes.gitbook.io/mantis/',
      icon: icons.QuestionOutlined,
      external: true,
      target: true
    }
  ]
};

export default support;
