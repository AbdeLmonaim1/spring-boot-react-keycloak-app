import { Navigate } from 'react-router-dom';
import { useKeycloak } from '../context/KeycloakContext';

const PrivateRoute = ({ children }) => {
    const { authenticated } = useKeycloak();

    return authenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;