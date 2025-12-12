import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import AddCourse from './pages/AddCourse';
import Students from './pages/Students';
import Settings from './pages/Settings';
import { DataProvider } from './context/DataContext';

// Set this to true to use backend, false for static data
const USE_BACKEND = true; // Change to false for development without backend

function App() {
    return (
        <DataProvider useBackend={USE_BACKEND}>
            <Router>
                <Routes>
                    <Route path="/" element={
                        <PrivateRoute>
                            <Layout />
                        </PrivateRoute>
                    }>
                        <Route index element={<Dashboard />} />
                        <Route path="courses" element={<Courses />} />
                        <Route path="add-course" element={<AddCourse />} />
                        <Route path="students" element={<Students />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </DataProvider>
    );
}

export default App;