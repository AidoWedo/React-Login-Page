import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import { Spinner } from '@heroui/react';

interface ProtectedRouteProps extends RouteProps {
    component: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
    const { user, loading } = useAuth();

    return (
        <Route
            {...rest}
            render={(props) => {
                if (loading) {
                    return (
                        <div className="flex items-center justify-center h-screen">
                            <Spinner size="lg" color="primary" />
                        </div>
                    );
                }

                if (!user) {
                    return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
                }

                return <Component {...props} />;
            }}
        />
    );
};

export default ProtectedRoute;