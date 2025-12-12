import { Edit, Trash2, Eye, Book, Users } from 'lucide-react';
import { getCourseColor, getInitials } from '../../data/sampleData';

const CourseTable = ({ courses }) => {
    return (
        <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center py-3">
                <h5 className="mb-0 fw-bold">All Courses</h5>
                <button className="btn btn-primary btn-sm d-flex align-items-center">
                    <Book size={16} className="me-1" />
                    Add New Course
                </button>
            </div>
            <div className="card-body p-0">
                <div className="table-responsive">
                    <table className="table table-hover mb-0">
                        <thead className="table-light">
                        <tr>
                            <th style={{ width: '50px' }}>ID</th>
                            <th>Course</th>
                            <th>Description</th>
                            <th style={{ width: '120px' }}>Students</th>
                            <th style={{ width: '120px' }}>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {courses.map((course) => {
                            const courseColor = getCourseColor(course.id);
                            return (
                                <tr key={course.id}>
                                    <td className="fw-bold text-muted">#{course.id}</td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <div className={`rounded-circle bg-${courseColor}-light d-flex align-items-center justify-content-center me-3`}
                                                 style={{ width: '40px', height: '40px' }}>
                                                <div className={`text-${courseColor} fw-bold`}>
                                                    {getInitials(course.title)}
                                                </div>
                                            </div>
                                            <div>
                                                <h6 className="mb-0 fw-medium">{course.title}</h6>
                                                <small className="text-muted">Created recently</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p className="mb-0 small text-muted" style={{
                                            maxWidth: '300px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            {course.description}
                                        </p>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <div className="bg-light rounded-circle d-flex align-items-center justify-content-center me-2"
                                                 style={{ width: '30px', height: '30px' }}>
                                                <Users size={14} className="text-muted" />
                                            </div>
                                            <span className="fw-medium">
                          {Math.floor(Math.random() * 100) + 20}
                        </span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <button className={`btn btn-sm btn-outline-${courseColor}`}>
                                                <Eye size={16} />
                                            </button>
                                            <button className="btn btn-sm btn-outline-warning">
                                                <Edit size={16} />
                                            </button>
                                            <button className="btn btn-sm btn-outline-danger">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CourseTable;