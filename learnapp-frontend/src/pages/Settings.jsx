import { Save, Bell, Lock, User, Globe } from 'lucide-react';
import { useState } from 'react';

const Settings = () => {
    const [settings, setSettings] = useState({
        emailNotifications: true,
        courseUpdates: true,
        studentMessages: false,
        newsletter: true,
        theme: 'light',
        language: 'en'
    });

    const handleToggle = (setting) => {
        setSettings(prev => ({
            ...prev,
            [setting]: !prev[setting]
        }));
    };

    const handleSave = () => {
        alert('Settings saved successfully!');
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h3 className="mb-1">Settings</h3>
                    <p className="text-muted mb-0">Manage your application preferences</p>
                </div>
                <button className="btn btn-primary d-flex align-items-center" onClick={handleSave}>
                    <Save size={18} className="me-2" />
                    Save Changes
                </button>
            </div>

            <div className="row">
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm mb-4">
                        <div className="card-header bg-white border-0 d-flex align-items-center">
                            <Bell size={20} className="me-2 text-primary" />
                            <h5 className="mb-0">Notification Settings</h5>
                        </div>
                        <div className="card-body">
                            <div className="mb-3 d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="mb-1">Email Notifications</h6>
                                    <p className="text-muted small mb-0">Receive email notifications for important updates</p>
                                </div>
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={settings.emailNotifications}
                                        onChange={() => handleToggle('emailNotifications')}
                                        style={{ width: '3em', height: '1.5em' }}
                                    />
                                </div>
                            </div>

                            <div className="mb-3 d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="mb-1">Course Updates</h6>
                                    <p className="text-muted small mb-0">Get notified when courses are updated</p>
                                </div>
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={settings.courseUpdates}
                                        onChange={() => handleToggle('courseUpdates')}
                                        style={{ width: '3em', height: '1.5em' }}
                                    />
                                </div>
                            </div>

                            <div className="mb-3 d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="mb-1">Student Messages</h6>
                                    <p className="text-muted small mb-0">Receive notifications for student messages</p>
                                </div>
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={settings.studentMessages}
                                        onChange={() => handleToggle('studentMessages')}
                                        style={{ width: '3em', height: '1.5em' }}
                                    />
                                </div>
                            </div>

                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="mb-1">Newsletter</h6>
                                    <p className="text-muted small mb-0">Subscribe to our monthly newsletter</p>
                                </div>
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={settings.newsletter}
                                        onChange={() => handleToggle('newsletter')}
                                        style={{ width: '3em', height: '1.5em' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-white border-0 d-flex align-items-center">
                            <Lock size={20} className="me-2 text-primary" />
                            <h5 className="mb-0">Security Settings</h5>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label htmlFor="currentPassword" className="form-label">Current Password</label>
                                <input type="password" className="form-control" id="currentPassword" />
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="newPassword" className="form-label">New Password</label>
                                    <input type="password" className="form-control" id="newPassword" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                                    <input type="password" className="form-control" id="confirmPassword" />
                                </div>
                            </div>
                            <button className="btn btn-primary">Update Password</button>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm mb-4">
                        <div className="card-header bg-white border-0 d-flex align-items-center">
                            <User size={20} className="me-2 text-primary" />
                            <h5 className="mb-0">Profile Information</h5>
                        </div>
                        <div className="card-body">
                            <div className="text-center mb-4">
                                <div className="rounded-circle bg-primary mx-auto mb-3" style={{ width: '100px', height: '100px' }}>
                                    <img
                                        src="https://ui-avatars.com/api/?name=Admin+User&background=4e73df&color=fff&bold=true&size=100"
                                        alt="Admin"
                                        className="rounded-circle w-100 h-100"
                                    />
                                </div>
                                <h5 className="mb-1">Admin User</h5>
                                <p className="text-muted mb-0">admin@example.com</p>
                            </div>
                            <button className="btn btn-outline-primary w-100">Edit Profile</button>
                        </div>
                    </div>

                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-white border-0 d-flex align-items-center">
                            <Globe size={20} className="me-2 text-primary" />
                            <h5 className="mb-0">Appearance & Language</h5>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label htmlFor="theme" className="form-label">Theme</label>
                                <select
                                    className="form-select"
                                    id="theme"
                                    value={settings.theme}
                                    onChange={(e) => setSettings(prev => ({ ...prev, theme: e.target.value }))}
                                >
                                    <option value="light">Light</option>
                                    <option value="dark">Dark</option>
                                    <option value="auto">Auto (System)</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="language" className="form-label">Language</label>
                                <select
                                    className="form-select"
                                    id="language"
                                    value={settings.language}
                                    onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                                >
                                    <option value="en">English</option>
                                    <option value="es">Spanish</option>
                                    <option value="fr">French</option>
                                    <option value="de">German</option>
                                </select>
                            </div>
                            <button className="btn btn-primary w-100">Apply Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Settings;