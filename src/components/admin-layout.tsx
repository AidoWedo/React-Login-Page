import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useAuth } from '../context/auth-context';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const { user, signOut } = useAuth();
    const history = useHistory();
    const location = useLocation();

    const handleSignOut = async () => {
        await signOut();
        history.push('/admin');
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar maxWidth="xl" className="bg-primary text-white">
                <NavbarBrand>
                    <Link href="/admin/dashboard" className="font-bold text-inherit">
                        <div className="flex items-center gap-2">
                            <Icon icon="lucide:shield" width={20} />
                            <span>Admin Portal</span>
                        </div>
                    </Link>
                </NavbarBrand>
                <NavbarContent justify="end">
                    <NavbarItem>
                        <Button
                            as={Link}
                            href="/admin/dashboard"
                            variant={location.pathname === '/admin/dashboard' ? 'solid' : 'flat'}
                            color="default"
                        >
                            Dashboard
                        </Button>
                    </NavbarItem>
                    <NavbarItem>
                        <Button
                            as={Link}
                            href="/admin/settings"
                            variant={location.pathname.startsWith('/admin/settings') ? 'solid' : 'flat'}
                            color="default"
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
                                    {user?.email} (Admin)
                                </DropdownItem>
                                <DropdownItem key="settings" onPress={() => history.push('/admin/settings')}>
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

export default AdminLayout;