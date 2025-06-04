import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { addToast } from '@heroui/react';

interface AuthContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
    isAdmin: boolean;
    signIn: (email: string, isAdminRoute?: boolean) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    // Check if user is admin
    const checkAdminStatus = async (userId: string) => {
        try {
            // In a real app, you would query your Supabase database to check admin status
            // For demo purposes, we'll simulate this with localStorage
            const adminUsers = JSON.parse(localStorage.getItem('adminUsers') || '[]');
            const userIsAdmin = adminUsers.includes(userId);
            setIsAdmin(userIsAdmin);
            return userIsAdmin;
        } catch (error) {
            console.error("Error checking admin status:", error);
            setIsAdmin(false);
            return false;
        }
    };

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);

            if (session?.user) {
                checkAdminStatus(session.user.id);
            }

            setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);

            if (session?.user) {
                await checkAdminStatus(session.user.id);
            } else {
                setIsAdmin(false);
            }

            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signIn = async (email: string, isAdminRoute = false) => {
        try {
            const redirectPath = isAdminRoute ? '/admin/dashboard' : '/dashboard';

            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: window.location.origin + redirectPath,
                },
            });

            if (error) {
                throw error;
            }

            addToast({
                title: "Magic link sent",
                description: "Check your email for the login link",
                severity: "success",
            });
        } catch (error: any) {
            addToast({
                title: "Error",
                description: error.message || "Failed to send magic link",
                severity: "danger",
            });
        }
    };

    const signOut = async () => {
        try {
            await supabase.auth.signOut();
            addToast({
                title: "Signed out",
                description: "You have been successfully signed out",
                severity: "success",
            });
        } catch (error: any) {
            addToast({
                title: "Error",
                description: error.message || "Failed to sign out",
                severity: "danger",
            });
        }
    };

    const value = {
        user,
        session,
        loading,
        isAdmin,
        signIn,
        signOut,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};