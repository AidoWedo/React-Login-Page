import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthProvider } from './context/auth-context';
import ProtectedRoute from './components/protected-route';
import AdminRoute from './components/admin-route';
import LoginPage from './pages/login';
import DashboardPage from './pages/dashboard';
import SettingsPage from './pages/settings';
import AuthSettingsPage from './pages/settings/auth-settings';
import AdminDashboardPage from './pages/admin/dashboard';
import AdminSettingsPage from './pages/admin/settings';
import AdminAuthSettingsPage from './pages/admin/auth-settings';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Switch>
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/admin" component={LoginPage} />
                <ProtectedRoute exact path="/dashboard" component={DashboardPage} />
                <ProtectedRoute exact path="/settings" component={SettingsPage} />
                <ProtectedRoute exact path="/settings/auth" component={AuthSettingsPage} />
                <AdminRoute exact path="/admin/dashboard" component={AdminDashboardPage} />
                <AdminRoute exact path="/admin/settings" component={AdminSettingsPage} />
                <AdminRoute exact path="/admin/settings/auth" component={AdminAuthSettingsPage} />
                <Redirect exact from="/" to="/dashboard" />
                <Redirect exact from="/admin/" to="/admin/dashboard" />
            </Switch>
        </AuthProvider>
    );
};

export default App;