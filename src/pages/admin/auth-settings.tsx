import React from 'react';
import { Card, CardBody, CardHeader, Switch, Button, Input, Divider, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import AdminLayout from '../../components/admin-layout';

// Mock user data - in a real app, this would come from Supabase
const mockUsers = [
    { id: '1', email: 'admin@example.com', isAdmin: true },
    { id: '2', email: 'user1@example.com', isAdmin: false },
    { id: '3', email: 'user2@example.com', isAdmin: false },
    { id: '4', email: 'manager@example.com', isAdmin: true },
];

const AdminAuthSettingsPage: React.FC = () => {
    // In a real app, these would be fetched from your backend/Supabase
    const [emailEnabled, setEmailEnabled] = React.useState(true);
    const [googleEnabled, setGoogleEnabled] = React.useState(false);
    const [githubEnabled, setGithubEnabled] = React.useState(false);
    const [users, setUsers] = React.useState(mockUsers);
    const [redirectUrl, setRedirectUrl] = React.useState(window.location.origin + '/dashboard');
    const [adminRedirectUrl, setAdminRedirectUrl] = React.useState(window.location.origin + '/admin/dashboard');

    const handleSaveSettings = () => {
        // In a real app, you'd save these settings to your backend/Supabase
        console.log('Auth settings:', {
            providers: {
                email: emailEnabled,
                google: googleEnabled,
                github: githubEnabled,
            },
            redirectUrl,
            adminRedirectUrl,
        });

        // Save admin users to localStorage for demo purposes
        const adminUserIds = users.filter(user => user.isAdmin).map(user => user.id);
        localStorage.setItem('adminUsers', JSON.stringify(adminUserIds));
    };

    const toggleAdminStatus = (userId: string) => {
        setUsers(users.map(user =>
            user.id === userId ? { ...user, isAdmin: !user.isAdmin } : user
        ));
    };

    return (
        <AdminLayout>
            <div className="max-w-5xl mx-auto p-4 md:p-6">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <h1 className="text-2xl font-semibold mb-6">Authentication Settings</h1>

                    <Card className="mb-6">
                        <CardHeader>
                            <h2 className="text-lg font-medium">Authentication Providers</h2>
                        </CardHeader>
                        <CardBody className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Icon icon="lucide:mail" width={20} />
                                    <span>Passwordless Email</span>
                                </div>
                                <Switch
                                    isSelected={emailEnabled}
                                    onValueChange={setEmailEnabled}
                                    color="primary"
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Icon icon="logos:google-icon" width={20} />
                                    <span>Google</span>
                                </div>
                                <Switch
                                    isSelected={googleEnabled}
                                    onValueChange={setGoogleEnabled}
                                    color="primary"
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Icon icon="logos:github-icon" width={20} />
                                    <span>GitHub</span>
                                </div>
                                <Switch
                                    isSelected={githubEnabled}
                                    onValueChange={setGithubEnabled}
                                    color="primary"
                                />
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="mb-6">
                        <CardHeader>
                            <h2 className="text-lg font-medium">Redirect Settings</h2>
                        </CardHeader>
                        <CardBody className="space-y-4">
                            <Input
                                label="User Redirect URL"
                                placeholder="https://example.com/dashboard"
                                value={redirectUrl}
                                onValueChange={setRedirectUrl}
                                variant="bordered"
                            />
                            <Input
                                label="Admin Redirect URL"
                                placeholder="https://example.com/admin/dashboard"
                                value={adminRedirectUrl}
                                onValueChange={setAdminRedirectUrl}
                                variant="bordered"
                            />
                        </CardBody>
                    </Card>

                    <Card className="mb-6">
                        <CardHeader>
                            <h2 className="text-lg font-medium">User Management</h2>
                        </CardHeader>
                        <CardBody>
                            <Table removeWrapper aria-label="User management table">
                                <TableHeader>
                                    <TableColumn>EMAIL</TableColumn>
                                    <TableColumn>ROLE</TableColumn>
                                    <TableColumn>ACTIONS</TableColumn>
                                </TableHeader>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    color={user.isAdmin ? "primary" : "default"}
                                                    variant="flat"
                                                >
                                                    {user.isAdmin ? "Admin" : "User"}
                                                </Chip>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    size="sm"
                                                    color={user.isAdmin ? "danger" : "primary"}
                                                    variant="flat"
                                                    onPress={() => toggleAdminStatus(user.id)}
                                                >
                                                    {user.isAdmin ? "Remove Admin" : "Make Admin"}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardBody>
                    </Card>

                    <div className="flex justify-end pt-4">
                        <Button color="primary" onPress={handleSaveSettings}>
                            Save Authentication Settings
                        </Button>
                    </div>
                </motion.div>
            </div>
        </AdminLayout>
    );
};

export default AdminAuthSettingsPage;