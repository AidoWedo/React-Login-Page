import React from 'react';
import { Card, CardBody, CardHeader, Switch, Button, Input, Divider } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import SettingsLayout from '../../components/settings-layout';

const AuthSettingsPage: React.FC = () => {
    // In a real app, these would be fetched from your backend/Supabase
    const [emailEnabled, setEmailEnabled] = React.useState(true);
    const [googleEnabled, setGoogleEnabled] = React.useState(false);
    const [githubEnabled, setGithubEnabled] = React.useState(false);
    const [twoFactorEnabled, setTwoFactorEnabled] = React.useState(false);
    const [redirectUrl, setRedirectUrl] = React.useState(window.location.origin + '/dashboard');

    const handleSaveSettings = () => {
        // In a real app, you'd save these settings to your backend/Supabase
        console.log('Auth settings:', {
            providers: {
                email: emailEnabled,
                google: googleEnabled,
                github: githubEnabled,
            },
            twoFactor: twoFactorEnabled,
            redirectUrl,
        });
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
                        <h2 className="text-lg font-medium">Authentication Settings</h2>
                    </CardHeader>
                    <CardBody className="space-y-6">
                        <div>
                            <h3 className="text-medium font-medium mb-3">Authentication Providers</h3>
                            <div className="space-y-4">
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
                            </div>
                        </div>

                        <Divider />

                        <div>
                            <h3 className="text-medium font-medium mb-3">Security Settings</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <Icon icon="lucide:shield" width={20} />
                                            <span>Two-factor authentication</span>
                                        </div>
                                        <p className="text-default-500 text-sm mt-1">
                                            Add an extra layer of security to your account
                                        </p>
                                    </div>
                                    <Switch
                                        isSelected={twoFactorEnabled}
                                        onValueChange={setTwoFactorEnabled}
                                        color="primary"
                                    />
                                </div>
                            </div>
                        </div>

                        <Divider />

                        <div>
                            <h3 className="text-medium font-medium mb-3">Redirect Settings</h3>
                            <Input
                                label="Redirect URL after login"
                                placeholder="https://example.com/dashboard"
                                value={redirectUrl}
                                onValueChange={setRedirectUrl}
                                variant="bordered"
                            />
                            <p className="text-default-500 text-sm mt-1">
                                Users will be redirected to this URL after successful authentication
                            </p>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button color="primary" onPress={handleSaveSettings}>
                                Save Authentication Settings
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </motion.div>
        </SettingsLayout>
    );
};

export default AuthSettingsPage;