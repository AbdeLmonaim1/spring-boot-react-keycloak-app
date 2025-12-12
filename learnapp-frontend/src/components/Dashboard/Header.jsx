import { Bell, Search, Calendar, Menu } from 'lucide-react';

const Header = () => {
    return (
        <nav className="navbar navbar-light bg-white shadow-sm py-3 px-4">
            <div className="container-fluid p-0">
                <div className="d-flex align-items-center">
                    <button className="btn btn-outline-secondary d-lg-none me-3">
                        <Menu size={20} />
                    </button>
                    <div>
                        <h3 className="mb-0 text-dark fw-bold">Dashboard</h3>
                        <small className="text-muted">
                            <Calendar size={14} className="me-1" />
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </small>
                    </div>
                </div>

                <div className="d-flex align-items-center">
                    <div className="input-group me-3 d-none d-lg-flex" style={{ width: '300px' }}>
            <span className="input-group-text bg-light border-end-0">
              <Search size={18} className="text-muted" />
            </span>
                        <input
                            type="text"
                            className="form-control border-start-0 ps-0 bg-light"
                            placeholder="Search courses, students..."
                        />
                    </div>

                    <div className="dropdown me-3">
                        <button
                            className="btn btn-light position-relative rounded-circle border"
                            type="button"
                            data-bs-toggle="dropdown"
                            style={{ width: '44px', height: '44px' }}
                        >
                            <Bell size={20} className="text-dark" />
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-white">
                3
              </span>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end p-2 shadow-sm" style={{ minWidth: '280px' }}>
                            <li><h6 className="dropdown-header fw-bold text-dark">Notifications</h6></li>
                            <li><a className="dropdown-item d-flex align-items-center py-2" href="#">
                                <div className="bg-primary-light rounded-circle p-2 me-3">
                                    <Bell size={16} className="text-primary" />
                                </div>
                                <div>
                                    <p className="mb-0 small fw-medium">New student enrolled</p>
                                    <small className="text-muted">5 minutes ago</small>
                                </div>
                            </a></li>
                            <li><a className="dropdown-item d-flex align-items-center py-2" href="#">
                                <div className="bg-success-light rounded-circle p-2 me-3">
                                    <Bell size={16} className="text-success" />
                                </div>
                                <div>
                                    <p className="mb-0 small fw-medium">Course completed</p>
                                    <small className="text-muted">2 hours ago</small>
                                </div>
                            </a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item text-center text-primary fw-medium" href="#">View all notifications</a></li>
                        </ul>
                    </div>

                    <div className="dropdown">
                        <button
                            className="btn p-0 border-0 d-flex align-items-center"
                            type="button"
                            data-bs-toggle="dropdown"
                        >
                            <div className="rounded-circle border border-primary border-2 me-2" style={{ width: '44px', height: '44px' }}>
                                <img
                                    src="https://ui-avatars.com/api/?name=Admin+User&background=4e73df&color=fff&bold=true&size=44"
                                    alt="User"
                                    className="rounded-circle w-100 h-100"
                                />
                            </div>
                            <div className="d-none d-md-block">
                                <p className="mb-0 small fw-medium text-dark">Admin User</p>
                                <small className="text-muted">Administrator</small>
                            </div>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                            <li><a className="dropdown-item d-flex align-items-center" href="#">
                                <div className="bg-primary-light rounded-circle p-2 me-2">
                                    <Bell size={16} className="text-primary" />
                                </div>
                                Profile
                            </a></li>
                            <li><a className="dropdown-item d-flex align-items-center" href="#">
                                <div className="bg-warning-light rounded-circle p-2 me-2">
                                    <Bell size={16} className="text-warning" />
                                </div>
                                Settings
                            </a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item d-flex align-items-center text-danger" href="#">
                                <div className="bg-danger-light rounded-circle p-2 me-2">
                                    <Bell size={16} className="text-danger" />
                                </div>
                                Logout
                            </a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;