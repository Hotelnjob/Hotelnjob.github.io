import { RouterProvider, useNavigate } from 'react-router-dom';

// project import
import router from 'routes';
import ThemeCustomization from 'themes';

import ScrollTop from 'components/ScrollTop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {

  return (
    <ThemeCustomization>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ko"} dateFormats={{ monthShort: `M` }}>
        <ToastContainer
          position="bottom-center"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition:Bounce
        />
        <ScrollTop>
          <RouterProvider router={router} />
        </ScrollTop>
      </LocalizationProvider>
    </ThemeCustomization>
  );
}
