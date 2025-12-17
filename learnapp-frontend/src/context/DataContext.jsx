import React, { createContext, useState, useContext, useEffect } from 'react';
import { courseService } from '../services/apiService';
import { courses as staticCourses, stats as staticStats, students as staticStudents } from '../data/sampleData';
import { useKeycloak } from './KeycloakContext';

const DataContext = createContext();

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within DataProvider');
    }
    return context;
};

export const DataProvider = ({ children, useBackend = false }) => {
    const { authenticated } = useKeycloak();
    const [courses, setCourses] = useState([]);
    const [stats, setStats] = useState(staticStats);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all courses
    const fetchCourses = async () => {
        if (!useBackend) {
            setCourses(staticCourses);
            return;
        }

        setLoading(true);
        try {
            const data = await courseService.getAllCourses();
            setCourses(data);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch courses:', err);
            setError('Failed to load courses from backend. Using static data.');
            setCourses(staticCourses); // Fallback to static data
        } finally {
            setLoading(false);
        }
    };

    // Create new course
    const createCourse = async (courseData) => {
        if (!useBackend) {
            const newCourse = {
                id: courses.length + 1,
                ...courseData
            };
            setCourses(prev => [...prev, newCourse]);
            return newCourse;
        }

        try {
            const createdCourse = await courseService.createCourse(courseData);
            setCourses(prev => [...prev, createdCourse]);
            return createdCourse;
        } catch (err) {
            console.error('Failed to create course:', err);
            throw err;
        }
    };

    // Update course
    const updateCourse = async (id, courseData) => {
        if (!useBackend) {
            setCourses(prev => prev.map(course =>
                course.id === id ? { ...course, ...courseData } : course
            ));
            return { id, ...courseData };
        }

        try {
            const updatedCourse = await courseService.updateCourse(id, courseData);
            setCourses(prev => prev.map(course =>
                course.id === id ? updatedCourse : course
            ));
            return updatedCourse;
        } catch (err) {
            console.error('Failed to update course:', err);
            throw err;
        }
    };

    // Delete course
    const deleteCourse = async (id) => {
        if (!useBackend) {
            setCourses(prev => prev.filter(course => course.id !== id));
            return;
        }

        try {
            await courseService.deleteCourse(id);
            setCourses(prev => prev.filter(course => course.id !== id));
        } catch (err) {
            console.error('Failed to delete course:', err);
            throw err;
        }
    };

    // Search courses
    const searchCourses = async (keyword) => {
        if (!useBackend) {
            return staticCourses.filter(course =>
                course.title.toLowerCase().includes(keyword.toLowerCase()) ||
                course.description.toLowerCase().includes(keyword.toLowerCase())
            );
        }

        try {
            return await courseService.searchCourses(keyword);
        } catch (err) {
            console.error('Failed to search courses:', err);
            return staticCourses.filter(course =>
                course.title.toLowerCase().includes(keyword.toLowerCase()) ||
                course.description.toLowerCase().includes(keyword.toLowerCase())
            );
        }
    };

    // Initialize data
    useEffect(() => {
        if (useBackend && authenticated) {
            fetchCourses();
        } else if (!useBackend) {
            setCourses(staticCourses);
            setStudents(staticStudents);
        }
    }, [useBackend, authenticated]);

    const value = {
        courses,
        stats,
        students,
        loading,
        error,
        createCourse,
        updateCourse,
        deleteCourse,
        searchCourses,
        refreshCourses: fetchCourses,
        useBackend
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};