// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import HotelIcon from '@mui/icons-material/Hotel';
import PeopleIcon from '@mui/icons-material/People';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';



// icons
const icons = {
  FontSizeOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined,
  HotelIcon,
  PeopleIcon,
  BusinessCenterIcon
};


const customer = {
  id: 'customer',
  title: '거래처정보',
  type: 'group',
  children: [
    {
      id: 'hotel',
      title: '호텔정보',
      type: 'item',
      url: '/hotel',
      icon: icons.HotelIcon
    },
    {
      id: 'worker',
      title: '인력정보',
      type: 'item',
      url: '/worker',
      icon: icons.PeopleIcon
    },
    {
      id: 'relCompany',
      title: '연관업체정보',
      type: 'item',
      url: '/relCompany',
      icon: icons.BusinessCenterIcon
    }
  ]
};

export default customer;
