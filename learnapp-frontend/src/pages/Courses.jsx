import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseCard from '../components/Dashboard/CourseCard';
import { useData } from '../context/DataContext';
import { Search, Filter, Grid, List, Plus, AlertCircle, Loader } from 'lucide-react';

const Courses = () => {
    const navigate = useNavigate();
    const { courses, loading, error, deleteCourse, searchCourses } = useData();
    const [viewMode, setViewMode] = useState('grid');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        setFilteredCourses(courses);
    }, [courses]);

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            setFilteredCourses(courses);
            return;
        }

        setIsSearching(true);
        try {
            const results = await searchCourses(searchTerm);
            setFilteredCourses(results);
        } catch (err) {
            console.error('Search failed:', err);
            // Fallback to local search
            const localResults = courses.filter(course =>
                course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (course.description && course.description.toLowerCase().includes(searchTerm.toLowerCase()))
            );
            setFilteredCourses(localResults);
        } finally {
            setIsSearching(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                await deleteCourse(id);
                // Course will be removed from context state
            } catch (err) {
                alert('Failed to delete course. Please try again.');
            }
        }
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h3 className="mb-1 fw-bold">Course Management</h3>
                    <p className="text-muted mb-0">Manage all your courses in one place</p>
                </div>
                <button
                    className="btn btn-primary d-flex align-items-center"
                    onClick={() => navigate('/add-course')}
                >
                    <Plus size={18} className="me-2" />
                    Create New Course
                </button>
            </div>

            {error && (
                <div className="alert alert-warning d-flex align-items-center mb-4" role="alert">
                    <AlertCircle size={20} className="me-2" />
                    <div>{error}</div>
                </div>
            )}

            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body py-3">
                    <div className="row align-items-center">
                        <div className="col-md-8">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control border-0 bg-light"
                                    placeholder="Search courses by title or description..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                />
                                <button
                                    className="btn btn-primary d-flex align-items-center"
                                    onClick={handleSearch}
                                    disabled={isSearching}
                                >
                                    {isSearching ? (
                                        <Loader size={18} className="me-2 animate-spin" />
                                    ) : (
                                        <Search size={18} className="me-2" />
                                    )}
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className="col-md-4 mt-3 mt-md-0">
                            <div className="d-flex gap-3 justify-content-md-end">
                                <div className="dropdown">
                                    <button className="btn btn-outline-secondary d-flex align-items-center" type="button" data-bs-toggle="dropdown">
                                        <Filter size={18} className="me-2" />
                                        Filter
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="#" onClick={() => setFilteredCourses(courses)}>All Courses</a></li>
                                        <li><a className="dropdown-item" href="#">Most Popular</a></li>
                                        <li><a className="dropdown-item" href="#">Recently Added</a></li>
                                    </ul>
                                </div>

                                <div className="btn-group">
                                    <button
                                        className={`btn ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline-primary'}`}
                                        onClick={() => setViewMode('grid')}
                                    >
                                        <Grid size={18} />
                                    </button>
                                    <button
                                        className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-outline-primary'}`}
                                        onClick={() => setViewMode('list')}
                                    >
                                        <List size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary mb-3" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="text-muted">Loading courses...</p>
                </div>
            ) : filteredCourses.length === 0 ? (
                <div className="text-center py-5">
                    <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                         style={{ width: '80px', height: '80px' }}>
                        <Search size={32} className="text-muted" />
                    </div>
                    <h4 className="fw-bold mb-2">No courses found</h4>
                    <p className="text-muted mb-4">Try adjusting your search criteria</p>
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate('/add-course')}
                    >
                        Create New Course
                    </button>
                </div>
            ) : viewMode === 'grid' ? (
                <div className="row">
                    {filteredCourses.map(course => (
                        <div key={course.id} className="col-xl-3 col-lg-4 col-md-6 mb-4">
                            <CourseCard course={course} onDelete={() => handleDelete(course.id)} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="card border-0 shadow-sm">
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table table-hover mb-0">
                                <thead className="table-light">
                                <tr>
                                    <th style={{ width: '60px' }}>ID</th>
                                    <th>Course Title</th>
                                    <th>Description</th>
                                    <th style={{ width: '100px' }}>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredCourses.map(course => (
                                    <tr key={course.id}>
                                        <td className="fw-bold text-muted">#{course.id}</td>
                                        <td>
                                            <h6 className="mb-0 fw-medium">{course.title}</h6>
                                        </td>
                                        <td>
                                            <p className="text-muted small mb-0" style={{
                                                maxWidth: '300px',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden'
                                            }}>
                                                {course.description}
                                            </p>
                                        </td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                <button
                                                    className="btn btn-sm btn-outline-primary"
                                                    onClick={() => navigate(`/courses/${course.id}`)}
                                                >
                                                    View
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-warning"
                                                    onClick={() => navigate(`/courses/edit/${course.id}`)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => handleDelete(course.id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-4">
                <p className="text-muted small">
                    Showing {filteredCourses.length} of {courses.length} courses
                </p>
            </div>
        </>
    );
};

export default Courses;