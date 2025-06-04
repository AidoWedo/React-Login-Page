import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useAuth } from '../context/auth-context';

interface AppLayoutProps {
    children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    const { user, signOut } = useAuth();
    const history = useHistory();
    const location = useLocation();

    const handleSignOut = async () => {
        await signOut();
        history.push('/login');
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar maxWidth="xl">
                <NavbarBrand>
                    <Link href="/dashboard" className="font-bold text-inherit">Supabase Auth</Link>
                </NavbarBrand>
                <NavbarContent justify="end">
                    <NavbarItem>
                        <Button
                            as={Link}
                            href="/dashboard"
                            variant={location.pathname === '/dashboard' ? 'solid' : 'flat'}
                            color={location.pathname === '/dashboard' ? 'primary' : 'default'}
                        >
                            Dashboard
                        </Button>
                    </NavbarItem>
                    <NavbarItem>
                        <Button
                            as={Link}
                            href="/settings"
                            variant={location.pathname.startsWith('/settings') ? 'solid' : 'flat'}
                            color={location.pathname.startsWith('/settings') ? 'primary' : 'default'}
                        >
                            Settings
                        </Button>
                    </NavbarItem>
                    <NavbarItem>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button variant="flat" isIconOnly>
                                    <Icon icon="lucide:user" width={20} />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="User actions">
                                <DropdownItem key="email" isReadOnly className="opacity-70">
                                    {user?.email}
                                </DropdownItem>
                                <DropdownItem key="settings" onPress={() => history.push('/settings')}>
                                    Settings
                                </DropdownItem>
                                <DropdownItem key="logout" color="danger" onPress={handleSignOut}>
                                    Sign Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
            <div className="flex-grow">
                {children}
            </div>
        </div>
    );
};

export default AppLayout;