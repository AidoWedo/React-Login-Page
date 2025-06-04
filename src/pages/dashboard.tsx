import React from 'react';
import { Card, CardBody, CardHeader } from '@heroui/react';
import { motion } from 'framer-motion';
import AppLayout from '../components/app-layout';
import { useAuth } from '../context/auth-context';

const DashboardPage: React.FC = () => {
    const { user } = useAuth();

    return (
        <AppLayout>
            <div className="max-w-5xl mx-auto p-4 md:p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

                    <Card className="mb-6">
                        <CardHeader>
                            <h2 className="text-lg font-medium">Welcome back!</h2>
                        </CardHeader>
                        <CardBody>
                            <p>You are signed in as: <span className="font-medium">{user?.email}</span></p>
                            <p className="text-default-500 mt-2">This is a blank dashboard page. Add your content here.</p>
                        </CardBody>
                    </Card>
                </motion.div>
            </div>
        </AppLayout>
    );
};

export default DashboardPage;