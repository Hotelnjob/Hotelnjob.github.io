// components/RequireAuth.js
import { Navigate } from 'react-router-dom';

function RequireAuth({ children }) {
    const userSession = JSON.parse(sessionStorage.getItem('user'));

    if (!userSession) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default RequireAuth;
