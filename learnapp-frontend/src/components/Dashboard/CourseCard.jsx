import { Users, Clock, Book, MoreVertical, Eye, Trash2, Edit } from 'lucide-react';
import { getCourseColor, getInitials } from '../../data/sampleData';

const CourseCard = ({ course, onDelete, onEdit }) => {
    const courseColor = getCourseColor(course.id);

    return (
        <div className="card border-0 hover-shadow h-100">
            <div className="card-body d-flex flex-column">
                <div className="d-flex align-items-start mb-3">
                    <div className={`rounded-circle bg-${courseColor}-light d-flex align-items-center justify-content-center me-3`}
                         style={{ width: '60px', height: '60px' }}>
                        <div className={`text-${courseColor} fw-bold fs-4`}>
                            {getInitials(course.title)}
                        </div>
                    </div>
                    <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start">
                            <h6 className="card-title mb-1 fw-bold text-dark">{course.title}</h6>
                            <div className="dropdown">
                                <button className="btn btn-link p-0 border-0 text-muted" data-bs-toggle="dropdown">
                                    <MoreVertical size={18} />
                                </button>
                                <ul className="dropdown-menu">
                                    <li><button className="dropdown-item" onClick={() => onEdit && onEdit(course.id)}>
                                        <Edit size={14} className="me-2" />
                                        Edit
                                    </button></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><button className="dropdown-item text-danger" onClick={() => onDelete && onDelete(course.id)}>
                                        <Trash2 size={14} className="me-2" />
                                        Delete
                                    </button></li>
                                </ul>
                            </div>
                        </div>
                        <p className="text-muted small mb-0" style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                        }}>
                            {course.description}
                        </p>
                    </div>
                </div>

                <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="d-flex align-items-center">
                            <div className="rounded-circle bg-light border d-flex align-items-center justify-content-center me-2"
                                 style={{ width: '30px', height: '30px' }}>
                                <Users size={14} className="text-muted" />
                            </div>
                            <small className="text-muted">
                                {Math.floor(Math.random() * 100) + 20} students
                            </small>
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="rounded-circle bg-light border d-flex align-items-center justify-content-center me-2"
                                 style={{ width: '30px', height: '30px' }}>
                                <Clock size={14} className="text-muted" />
                            </div>
                            <small className="text-muted">
                                {Math.floor(Math.random() * 8) + 4} weeks
                            </small>
                        </div>
                    </div>

                    <div className="progress mb-3" style={{ height: '6px' }}>
                        <div
                            className={`progress-bar bg-${courseColor}`}
                            role="progressbar"
                            style={{ width: `${Math.floor(Math.random() * 50) + 50}%` }}
                            aria-valuenow="75"
                            aria-valuemin="0"
                            aria-valuemax="100"
                        ></div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <Book size={16} className="text-muted me-1" />
                            <small className="text-muted">Course ID: {course.id}</small>
                        </div>
                        <button className={`btn btn-sm btn-${courseColor} px-3 d-flex align-items-center`}>
                            <Eye size={16} className="me-1" />
                            View
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

CourseCard.defaultProps = {
    onDelete: null,
    onEdit: null
};

export default CourseCard;