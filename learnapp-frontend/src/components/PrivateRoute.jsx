import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    // In a real app, you would check if user is authenticated
    const isAuthenticated = true; // For demo purposes

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;