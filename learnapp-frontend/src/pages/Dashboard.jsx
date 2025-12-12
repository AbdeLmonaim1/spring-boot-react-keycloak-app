import { useEffect, useState } from 'react';
import StatsCard from '../components/Dashboard/StatsCard';
import CourseCard from '../components/Dashboard/CourseCard';
import CourseTable from '../components/Dashboard/CourseTable';
import { useData } from '../context/DataContext';
import {
    BookOpen,
    Users,
    DollarSign,
    TrendingUp,
    Calendar,
    BarChart3,
    PieChart,
    AlertCircle
} from 'lucide-react';

const Dashboard = () => {
    const { courses, stats, loading, error } = useData();
    const [recentCourses, setRecentCourses] = useState([]);

    useEffect(() => {
        // Get 4 most recent courses (by ID as proxy for recency)
        const sorted = [...courses].sort((a, b) => b.id - a.id).slice(0, 4);
        setRecentCourses(sorted);
    }, [courses]);

    if (loading && courses.length === 0) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                <div className="text-center">
                    <div className="spinner-border text-primary mb-3" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="text-muted">Loading dashboard data...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            {error && (
                <div className="alert alert-warning d-flex align-items-center mb-4" role="alert">
                    <AlertCircle size={20} className="me-2" />
                    <div>{error}</div>
                </div>
            )}

            <div className="row mb-4">
                <div className="col-xl-3 col-md-6 mb-4">
                    <StatsCard
                        title="Total Courses"
                        value={courses.length}
                        change={12}
                        icon={BookOpen}
                        color="primary"
                    />
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                    <StatsCard
                        title="Active Students"
                        value={stats.activeStudents}
                        change={8}
                        icon={Users}
                        color="success"
                    />
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                    <StatsCard
                        title="Total Revenue"
                        value={stats.totalRevenue}
                        change={15}
                        icon={DollarSign}
                        color="info"
                    />
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                    <StatsCard
                        title="Completion Rate"
                        value={stats.completionRate}
                        change={5}
                        icon={TrendingUp}
                        color="warning"
                    />
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-lg-8 mb-4">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center py-3">
                            <h5 className="mb-0 fw-bold">Recent Courses</h5>
                            <div className="d-flex align-items-center">
                                <Calendar size={18} className="me-2 text-muted" />
                                <select className="form-select form-select-sm w-auto border-0 bg-light">
                                    <option>Last 30 days</option>
                                    <option>Last 3 months</option>
                                    <option>Last year</option>
                                </select>
                            </div>
                        </div>
                        <div className="card-body p-4">
                            {recentCourses.length > 0 ? (
                                <div className="row">
                                    {recentCourses.map(course => (
                                        <div key={course.id} className="col-md-6 mb-3">
                                            <div className="card border h-100">
                                                <div className="card-body">
                                                    <div className="d-flex align-items-start">
                                                        <div className="rounded-circle bg-primary-light d-flex align-items-center justify-content-center me-3"
                                                             style={{ width: '50px', height: '50px' }}>
                                                            <BookOpen size={24} className="text-primary" />
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <h6 className="fw-bold mb-1">{course.title}</h6>
                                                            <p className="text-muted small mb-2" style={{
                                                                display: '-webkit-box',
                                                                WebkitLineClamp: 2,
                                                                WebkitBoxOrient: 'vertical',
                                                                overflow: 'hidden'
                                                            }}>
                                                                {course.description}
                                                            </p>
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <small className="text-muted">ID: #{course.id}</small>
                                                                <small className="text-success fw-medium">
                                                                    {Math.floor(Math.random() * 50) + 50}% completion
                                                                </small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-5">
                                    <BookOpen size={48} className="text-muted mb-3" />
                                    <h5 className="text-muted">No courses yet</h5>
                                    <p className="text-muted mb-0">Create your first course to get started</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 mb-4">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-header bg-white border-0 py-3">
                            <h5 className="mb-0 fw-bold">Course Summary</h5>
                        </div>
                        <div className="card-body p-4">
                            <div className="d-flex align-items-center justify-content-center mb-4">
                                <div className="position-relative" style={{ width: '150px', height: '150px' }}>
                                    <PieChart size={150} className="text-primary opacity-25" />
                                    <div className="position-absolute top-50 start-50 translate-middle text-center">
                                        <h4 className="mb-0 fw-bold">{courses.length}</h4>
                                        <small className="text-muted">Total Courses</small>
                                    </div>
                                </div>
                            </div>

                            <div className="list-group list-group-flush">
                                <div className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 py-2">
                                    <div className="d-flex align-items-center">
                                        <div className="rounded-circle p-1 me-3 bg-primary-light">
                                            <div className="rounded-circle" style={{
                                                width: '8px',
                                                height: '8px',
                                                backgroundColor: 'var(--primary-color)'
                                            }}></div>
                                        </div>
                                        <span className="text-dark">Total Courses</span>
                                    </div>
                                    <span className="badge bg-primary text-white fw-medium">
                    {courses.length}
                  </span>
                                </div>
                                <div className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 py-2">
                                    <div className="d-flex align-items-center">
                                        <div className="rounded-circle p-1 me-3 bg-success-light">
                                            <div className="rounded-circle" style={{
                                                width: '8px',
                                                height: '8px',
                                                backgroundColor: 'var(--success-color)'
                                            }}></div>
                                        </div>
                                        <span className="text-dark">Avg. Students/Course</span>
                                    </div>
                                    <span className="badge bg-success text-white fw-medium">
                    {Math.floor(Math.random() * 50) + 20}
                  </span>
                                </div>
                                <div className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 py-2">
                                    <div className="d-flex align-items-center">
                                        <div className="rounded-circle p-1 me-3 bg-info-light">
                                            <div className="rounded-circle" style={{
                                                width: '8px',
                                                height: '8px',
                                                backgroundColor: 'var(--info-color)'
                                            }}></div>
                                        </div>
                                        <span className="text-dark">Completion Rate</span>
                                    </div>
                                    <span className="badge bg-info text-white fw-medium">
                    {stats.completionRate}
                  </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="fw-bold mb-0">Latest Courses</h4>
                        <a href="/courses" className="text-primary text-decoration-none fw-medium">
                            View All →
                        </a>
                    </div>
                </div>
                {recentCourses.length > 0 ? (
                    recentCourses.map(course => (
                        <div key={course.id} className="col-xl-3 col-lg-4 col-md-6 mb-4">
                            <CourseCard course={course} />
                        </div>
                    ))
                ) : (
                    <div className="col-12">
                        <div className="text-center py-4">
                            <p className="text-muted">No courses available. Create your first course!</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="row">
                <div className="col-12">
                    <CourseTable courses={courses.slice(0, 6)} />
                </div>
            </div>
        </>
    );
};

export default Dashboard;