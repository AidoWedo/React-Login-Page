import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardBody, CardHeader, Input, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/auth-context';

const LoginPage: React.FC = () => {
    const [email, setEmail] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const { signIn, user } = useAuth();
    const history = useHistory();
    const isAdminRoute = window.location.pathname === '/admin';

    React.useEffect(() => {
        if (user) {
            history.push(isAdminRoute ? '/admin/dashboard' : '/dashboard');
        }
    }, [user, history, isAdminRoute]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        try {
            await signIn(email, isAdminRoute);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4 bg-gradient-to-br from-background to-content2">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-md"
            >
                <Card className="shadow-lg border border-content3/30">
                    <CardHeader className="flex flex-col gap-2 items-center pb-0 pt-8">
                        <div className="bg-primary/10 p-4 rounded-full mb-3">
                            <Icon icon={isAdminRoute ? "lucide:shield" : "lucide:user"} className="text-primary" width={28} height={28} />
                        </div>
                        <h1 className="text-2xl font-semibold">{isAdminRoute ? "Admin Login" : "User Login"}</h1>
                        <p className="text-default-500 text-center text-sm max-w-xs">
                            We'll email you a secure magic link for password-free access
                        </p>
                    </CardHeader>
                    <CardBody className="px-8 py-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input
                                label="Email address"
                                placeholder="Enter your email"
                                type="email"
                                value={email}
                                onValueChange={setEmail}
                                isRequired
                                variant="bordered"
                                size="lg"
                                startContent={
                                    <Icon icon="lucide:mail" className="text-default-400" width={18} />
                                }
                            />
                            <Button
                                type="submit"
                                color="primary"
                                className="w-full font-medium"
                                size="lg"
                                isLoading={isLoading}
                            >
                                Send magic link
                            </Button>
                        </form>
                    </CardBody>
                </Card>
            </motion.div>
        </div>
    );
};

export default LoginPage;