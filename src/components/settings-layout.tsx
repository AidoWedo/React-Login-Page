import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Tabs, Tab, Card, CardBody } from '@heroui/react';
import AppLayout from './app-layout';

interface SettingsLayoutProps {
    children: React.ReactNode;
}

const SettingsLayout: React.FC<SettingsLayoutProps> = ({ children }) => {
    const location = useLocation();
    const history = useHistory();
    const currentPath = location.pathname;

    const selectedKey = currentPath === '/settings' ? 'general' :
        currentPath === '/settings/auth' ? 'auth' : 'general';

    const handleTabChange = (key: React.Key) => {
        if (key === 'general') {
            history.push('/settings');
        } else if (key === 'auth') {
            history.push('/settings/auth');
        }
    };

    return (
        <AppLayout>
            <div className="max-w-5xl mx-auto p-4 md:p-6">
                <h1 className="text-2xl font-semibold mb-6">Settings</h1>

                <Card className="mb-6">
                    <CardBody className="p-0">
                        <Tabs
                            aria-label="Settings options"
                            selectedKey={selectedKey}
                            onSelectionChange={handleTabChange}
                            className="w-full"
                        >
                            <Tab key="general" title="General" />
                            <Tab key="auth" title="Authentication" />
                        </Tabs>
                    </CardBody>
                </Card>

                {children}
            </div>
        </AppLayout>
    );
};

export default SettingsLayout;