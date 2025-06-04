import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardBody, CardHeader, Tabs, Tab } from '@heroui/react';
import { motion } from 'framer-motion';
import AdminLayout from '../../../components/admin-layout';

const AdminSettingsPage: React.FC = () => {
    const history = useHistory();

    const handleTabChange = (key: React.Key) => {
        if (key === 'auth') {
            history.push('/admin/settings/auth');
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-5xl mx-auto p-4 md:p-6">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <h1 className="text-2xl font-semibold mb-6">Admin Settings</h1>

                    <Card className="mb-6">
                        <CardBody className="p-0">
                            <Tabs
                                aria-label="Settings options"
                                selectedKey="general"
                                onSelectionChange={handleTabChange}
                                className="w-full"
                            >
                                <Tab key="general" title="General" />
                                <Tab key="auth" title="Authentication" />
                            </Tabs>
                        </CardBody>
                    </Card>

                    <Card className="mb-6">
                        <CardHeader>
                            <h2 className="text-lg font-medium">Admin Settings</h2>
                        </CardHeader>
                        <CardBody>
                            <p className="text-default-500">
                                Configure general admin settings here. For authentication settings, use the Authentication tab.
                            </p>
                        </CardBody>
                    </Card>
                </motion.div>
            </div>
        </AdminLayout>
    );
};

export default AdminSettingsPage;