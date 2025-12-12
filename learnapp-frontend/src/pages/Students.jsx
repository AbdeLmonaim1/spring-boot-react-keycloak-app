import { students } from '../data/sampleData';
import { Search, Mail, Calendar, User, MoreVertical } from 'lucide-react';

const Students = () => {
    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h3 className="mb-1">Student Management</h3>
                    <p className="text-muted mb-0">View and manage all enrolled students</p>
                </div>
                <button className="btn btn-primary">
                    + Add New Student
                </button>
            </div>

            <div className="row mb-4">
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="text-muted mb-2">Total Students</h6>
                                    <h3 className="mb-0">543</h3>
                                </div>
                                <div className="bg-primary-light rounded-circle p-3">
                                    <User size={24} className="text-primary" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="text-muted mb-2">Active This Month</h6>
                                    <h3 className="mb-0">48</h3>
                                </div>
                                <div className="bg-success-light rounded-circle p-3">
                                    <User size={24} className="text-success" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="text-muted mb-2">Completion Rate</h6>
                                    <h3 className="mb-0">78%</h3>
                                </div>
                                <div className="bg-info-light rounded-circle p-3">
                                    <User size={24} className="text-info" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="text-muted mb-2">Avg. Courses/Student</h6>
                                    <h3 className="mb-0">2.4</h3>
                                </div>
                                <div className="bg-warning-light rounded-circle p-3">
                                    <User size={24} className="text-warning" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col-md-6 mb-3 mb-md-0">
                            <div className="input-group">
                <span className="input-group-text bg-light border-0">
                  <Search size={18} />
                </span>
                                <input
                                    type="text"
                                    className="form-control border-0 bg-light"
                                    placeholder="Search students by name or email"
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="d-flex justify-content-md-end">
                                <select className="form-select w-auto me-3">
                                    <option>Sort by: Newest</option>
                                    <option>Sort by: Name</option>
                                    <option>Sort by: Courses</option>
                                </select>
                                <button className="btn btn-outline-primary">Export Data</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                {students.map(student => (
                    <div key={student.id} className="col-xl-4 col-lg-6 mb-4">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                    <div className="d-flex align-items-center">
                                        <div className="rounded-circle bg-primary me-3" style={{ width: '60px', height: '60px' }}>
                                            <img
                                                src={`https://ui-avatars.com/api/?name=${student.name}&background=4e73df&color=fff&bold=true`}
                                                alt={student.name}
                                                className="rounded-circle w-100 h-100"
                                            />
                                        </div>
                                        <div>
                                            <h5 className="mb-0">{student.name}</h5>
                                            <div className="d-flex align-items-center text-muted">
                                                <Mail size={14} className="me-1" />
                                                <small>{student.email}</small>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="btn btn-link p-0 border-0">
                                        <MoreVertical size={18} />
                                    </button>
                                </div>

                                <div className="row text-center mb-3">
                                    <div className="col-4">
                                        <div className="border rounded py-2">
                                            <h4 className="text-primary mb-0">{student.enrolledCourses}</h4>
                                            <small className="text-muted">Courses</small>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="border rounded py-2">
                                            <h4 className="text-success mb-0">
                                                {Math.floor(student.enrolledCourses * 3.5)}
                                            </h4>
                                            <small className="text-muted">Completed</small>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="border rounded py-2">
                                            <h4 className="text-warning mb-0">
                                                {Math.floor(student.enrolledCourses * 1.2)}
                                            </h4>
                                            <small className="text-muted">Active</small>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center text-muted mb-3">
                                    <Calendar size={14} className="me-2" />
                                    <small>Joined: {student.joinDate}</small>
                                </div>

                                <div className="d-flex gap-2">
                                    <button className="btn btn-sm btn-primary flex-grow-1">View Profile</button>
                                    <button className="btn btn-sm btn-outline-secondary">Message</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Students;