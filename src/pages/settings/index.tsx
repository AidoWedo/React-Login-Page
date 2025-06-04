import React from 'react';
import { Card, CardBody, CardHeader, Input, Button } from '@heroui/react';
import { motion } from 'framer-motion';
import SettingsLayout from '../../components/settings-layout';
import { useAuth } from '../../context/auth-context';

const SettingsPage: React.FC = () => {
    const { user } = useAuth();
    const [name, setName] = React.useState('');

    React.useEffect(() => {
        // In a real app, you'd fetch user profile data here
        setName(user?.user_metadata?.name || '');
    }, [user]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you'd update the user profile here
        console.log('Update profile:', { name });
    };

    return (
        <SettingsLayout>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
            >
                <Card className="mb-6">
                    <CardHeader>
                        <h2 className="text-lg font-medium">General Settings</h2>
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                label="Email"
                                value={user?.email || ''}
                                isReadOnly
                                variant="bordered"
                            />
                            <Input
                                label="Display Name"
                                placeholder="Your name"
                                value={name}
                                onValueChange={setName}
                                variant="bordered"
                            />
                            <div className="flex justify-end">
                                <Button color="primary" type="submit">
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </motion.div>
        </SettingsLayout>
    );
};

export default SettingsPage;