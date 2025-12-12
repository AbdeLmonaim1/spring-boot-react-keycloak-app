import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    BookOpen,
    Users,
    BarChart3,
    Settings,
    PlusCircle,
    LogOut,
    ChevronRight
} from 'lucide-react';

const Sidebar = () => {
    const menuItems = [
        { path: '/', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { path: '/courses', name: 'Courses', icon: <BookOpen size={20} /> },
        { path: '/add-course', name: 'Add Course', icon: <PlusCircle size={20} /> },
        { path: '/students', name: 'Students', icon: <Users size={20} /> },
        // { path: '/analytics', name: 'Analytics', icon: <BarChart3 size={20} /> },
        // { path: '/settings', name: 'Settings', icon: <Settings size={20} /> },
    ];

    return (
        <div className="sidebar d-flex flex-column p-3" style={{ width: '250px', position: 'fixed', height: '100vh' }}>
            <div className="d-flex align-items-center mb-4">
                <div className="bg-white rounded-circle p-2 me-3">
                    <BookOpen size={28} className="text-primary" />
                </div>
                <div>
                    <h4 className="mb-0 fw-bold text-primary">CourseMaster</h4>
                    <small className="text-primary">Admin Panel</small>
                </div>
            </div>

            <hr className="my-3 bg-white-50" />

            <ul className="nav nav-pills flex-column mb-auto">
                {menuItems.map((item, index) => (
                    <li className="nav-item mb-2" key={index}>
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                `nav-link d-flex align-items-center justify-content-between ${isActive ? 'active' : ''}`
                            }
                        >
                            <div className="d-flex align-items-center">
                                <span className="me-3">{item.icon}</span>
                                <span>{item.name}</span>
                            </div>
                            <ChevronRight size={16} className="opacity-50" />
                        </NavLink>
                    </li>
                ))}
            </ul>

            {/*<div className="mt-auto">*/}
            {/*    <hr className="bg-white-50" />*/}
            {/*    <div className="d-flex align-items-center mb-3">*/}
            {/*        <div className="rounded-circle bg-light me-3" style={{ width: '45px', height: '45px' }}>*/}
            {/*            <img*/}
            {/*                src="https://ui-avatars.com/api/?name=Admin+User&background=ffffff&color=4e73df&bold=true"*/}
            {/*                alt="User"*/}
            {/*                className="rounded-circle w-100 h-100"*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*        <div className="flex-grow-1">*/}
            {/*            <p className="mb-0 fw-bold text-white">Admin User</p>*/}
            {/*            <small className="text-white-50">admin@example.com</small>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <button className="btn btn-outline-light w-100 mt-2 d-flex align-items-center justify-content-center">*/}
            {/*        <LogOut size={18} className="me-2" />*/}
            {/*        Logout*/}
            {/*    </button>*/}
            {/*</div>*/}
        </div>
    );
};

export default Sidebar;