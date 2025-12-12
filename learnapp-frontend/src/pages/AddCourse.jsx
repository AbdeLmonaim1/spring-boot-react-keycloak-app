import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Save, Book, ArrowLeft, AlertCircle } from 'lucide-react';

const AddCourse = () => {
    const navigate = useNavigate();
    const { createCourse } = useData();
    const [courseData, setCourseData] = useState({
        title: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!courseData.title.trim()) {
            setError('Course title is required');
            return;
        }

        if (!courseData.description.trim()) {
            setError('Course description is required');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await createCourse(courseData);

            // Reset form and navigate back to courses
            setCourseData({
                title: '',
                description: ''
            });

            navigate('/courses');

        } catch (err) {
            setError('Failed to create course. Please try again.');
            console.error('Create course error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <button
                        className="btn btn-outline-secondary btn-sm mb-2 d-flex align-items-center"
                        onClick={() => navigate('/courses')}
                    >
                        <ArrowLeft size={16} className="me-1" />
                        Back to Courses
                    </button>
                    <h3 className="mb-1 fw-bold">Create New Course</h3>
                    <p className="text-muted mb-0">Add a new course to your platform</p>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            {error && (
                                <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
                                    <AlertCircle size={20} className="me-2" />
                                    <div>{error}</div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="title" className="form-label fw-medium">Course Title *</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        id="title"
                                        name="title"
                                        value={courseData.title}
                                        onChange={handleChange}
                                        placeholder="Enter course title"
                                        disabled={loading}
                                        required
                                    />
                                    <small className="text-muted">Keep it clear and descriptive</small>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="description" className="form-label fw-medium">Course Description *</label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        value={courseData.description}
                                        onChange={handleChange}
                                        rows="8"
                                        placeholder="Enter detailed course description. Describe what students will learn, prerequisites, and learning outcomes."
                                        disabled={loading}
                                        required
                                    ></textarea>
                                    <div className="d-flex justify-content-between mt-2">
                                        <small className="text-muted">Be detailed about what students will learn</small>
                                        <small className="text-muted">{courseData.description.length}/1000 characters</small>
                                    </div>
                                </div>

                                <div className="d-flex gap-3 pt-3 border-top">
                                    <button
                                        type="submit"
                                        className="btn btn-primary d-flex align-items-center px-4"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <div className="spinner-border spinner-border-sm me-2" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                                Creating...
                                            </>
                                        ) : (
                                            <>
                                                <Save size={18} className="me-2" />
                                                Create Course
                                            </>
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => navigate('/courses')}
                                        disabled={loading}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm mb-4">
                        <div className="card-header bg-white border-0 py-3">
                            <h5 className="mb-0 fw-bold d-flex align-items-center">
                                <Book size={20} className="me-2 text-primary" />
                                Quick Tips
                            </h5>
                        </div>
                        <div className="card-body">
                            <div className="mb-3 pb-3 border-bottom">
                                <h6 className="fw-medium">Course Title</h6>
                                <p className="text-muted small mb-0">
                                    Make it clear and descriptive. Include keywords that students might search for.
                                </p>
                            </div>

                            <div className="mb-3 pb-3 border-bottom">
                                <h6 className="fw-medium">Description</h6>
                                <p className="text-muted small mb-0">
                                    Be detailed about what students will learn, prerequisites, and learning outcomes.
                                    Use bullet points to make it scannable.
                                </p>
                            </div>

                            <div>
                                <h6 className="fw-medium">Best Practices</h6>
                                <ul className="text-muted small mb-0 ps-3">
                                    <li>Keep descriptions between 100-300 words</li>
                                    <li>Focus on benefits for the student</li>
                                    <li>Include clear learning objectives</li>
                                    <li>Be honest about difficulty level</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-white border-0 py-3">
                            <h5 className="mb-0 fw-bold">Course Preview</h5>
                        </div>
                        <div className="card-body">
                            {courseData.title || courseData.description ? (
                                <div>
                                    <div className="mb-3">
                                        <h6 className="text-muted small mb-1">Title Preview:</h6>
                                        <p className="fw-medium mb-0">{courseData.title || 'No title yet'}</p>
                                    </div>
                                    <div className="mb-3">
                                        <h6 className="text-muted small mb-1">Description Preview:</h6>
                                        <p className="small mb-0" style={{
                                            display: '-webkit-box',
                                            WebkitLineClamp: 4,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}>
                                            {courseData.description || 'No description yet'}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-3">
                                    <Book size={32} className="text-muted mb-3" />
                                    <p className="text-muted mb-0">Start typing to see a preview</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddCourse;