export const courses = [
    {
        id: 1,
        title: 'React Fundamentals',
        description: 'Learn React from scratch with hands-on projects and modern best practices.'
    },
    {
        id: 2,
        title: 'JavaScript Mastery',
        description: 'Master JavaScript fundamentals and advanced concepts with practical examples.'
    },
    {
        id: 3,
        title: 'UI/UX Design Principles',
        description: 'Understand the core principles of user interface and experience design.'
    },
    {
        id: 4,
        title: 'Database Management',
        description: 'Learn database design, SQL, and optimization techniques.'
    },
    {
        id: 5,
        title: 'Mobile App Development',
        description: 'Build cross-platform mobile applications using modern frameworks.'
    },
    {
        id: 6,
        title: 'Web Security Essentials',
        description: 'Learn essential security practices for web applications.'
    },
    {
        id: 7,
        title: 'DevOps Fundamentals',
        description: 'Introduction to DevOps practices and tools for modern development.'
    },
    {
        id: 8,
        title: 'Cloud Computing Basics',
        description: 'Understand cloud services and deployment strategies.'
    },
    {
        id: 9,
        title: 'Python for Data Science',
        description: 'Learn Python programming with focus on data analysis and visualization.'
    },
    {
        id: 10,
        title: 'Agile Methodology',
        description: 'Master Agile project management and Scrum framework.'
    }
];

export const stats = {
    totalCourses: courses.length,
    activeStudents: 543,
    totalRevenue: '$12,450',
    completionRate: '78%'
};

export const students = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', enrolledCourses: 3, joinDate: '2023-01-15' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', enrolledCourses: 2, joinDate: '2023-02-20' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', enrolledCourses: 5, joinDate: '2023-03-10' },
    { id: 4, name: 'Diana Prince', email: 'diana@example.com', enrolledCourses: 1, joinDate: '2023-04-05' },
    { id: 5, name: 'Edward Wilson', email: 'edward@example.com', enrolledCourses: 4, joinDate: '2023-05-12' },
];

// Helper function to generate color based on course ID
export const getCourseColor = (id) => {
    const colors = ['primary', 'success', 'info', 'warning', 'danger', 'secondary'];
    return colors[id % colors.length];
};

// Helper function to get initials from title
export const getInitials = (title) => {
    return title
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
};