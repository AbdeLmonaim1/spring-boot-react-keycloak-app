import { Outlet } from 'react-router-dom';
import Sidebar from './Dashboard/Sidebar';
import Header from './Dashboard/Header';

const Layout = () => {
    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1" style={{
                marginLeft: '250px',
                minHeight: '100vh',
                backgroundColor: '#f8f9fc'
            }}>
                <Header />
                <div className="px-4 py-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;