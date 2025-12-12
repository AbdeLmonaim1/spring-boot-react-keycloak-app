import { Outlet } from 'react-router-dom';
import Sidebar from './Dashboard/Sidebar';
import Header from './Dashboard/Header';

const Layout = () => {
    return (
        <div className="d-flex">
            <Sidebar />
            <div className="main-content flex-grow-1" style={{ marginLeft: '250px' }}>
                <Header />
                <main className="container-fluid mt-4 px-4">
                    <div className="px-lg-4">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;