import React from 'react';
import { Card, CardBody, CardHeader } from '@heroui/react';
import { motion } from 'framer-motion';
import AdminLayout from '../../components/admin-layout';
import { useAuth } from '../../context/auth-context';

const AdminDashboardPage: React.FC = () => {
    const { user } = useAuth();

    return (
        <AdminLayout>
            <div className="max-w-5xl mx-auto p-4 md:p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>

                    <Card className="mb-6">
                        <CardHeader>
                            <h2 className="text-lg font-medium">Welcome, Admin!</h2>
                        </CardHeader>
                        <CardBody>
                            <p>You are signed in as: <span className="font-medium">{user?.email}</span></p>
                            <p className="text-default-500 mt-2">This is the admin dashboard with elevated privileges.</p>
                        </CardBody>
                    </Card>
                </motion.div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboardPage;