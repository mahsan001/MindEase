'use client';

import { useState, useEffect } from 'react';
import { User, Lock, Bell, Shield, Palette, Download, Trash2, Save, Eye, EyeOff, Key, Copy, Upload } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { hasEncryptionKey, exportEncryptionKey, importEncryptionKey, clearEncryptionKey } from '@/lib/encryption';

interface UserProfile {
    name: string;
    email: string;
}

interface NotificationSettings {
    emailNotifications: boolean;
    dailyReminders: boolean;
    weeklyInsights: boolean;
    moodAlerts: boolean;
}

interface PrivacySettings {
    dataSharing: boolean;
    analyticsTracking: boolean;
}

export default function SettingsPage() {
    const { showToast } = useToast();
    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Profile state
    const [profile, setProfile] = useState<UserProfile>({
        name: '',
        email: '',
    });

    // Password state
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    // Notification settings
    const [notifications, setNotifications] = useState<NotificationSettings>({
        emailNotifications: true,
        dailyReminders: true,
        weeklyInsights: false,
        moodAlerts: true,
    });

    // Privacy settings
    const [privacy, setPrivacy] = useState<PrivacySettings>({
        dataSharing: false,
        analyticsTracking: true,
    });

    // Theme preference
    const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('light');

    // Encryption key state
    const [hasKey, setHasKey] = useState(false);
    const [showEncryptionKey, setShowEncryptionKey] = useState(false);
    const [encryptionKeyBackup, setEncryptionKeyBackup] = useState('');

    // Load user data on mount
    useEffect(() => {
        loadUserData();
        setHasKey(hasEncryptionKey());
    }, []);

    const loadUserData = async () => {        try {
            const res = await fetch('/api/user/profile');
            if (res.ok) {
                const data = await res.json();
                setProfile({
                    name: data.name || '',
                    email: data.email || '',
                });
            }
        } catch {
            // Failed to load user data
        }
    };

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/user/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profile),
            });            if (res.ok) {
                showToast('Profile updated successfully!', 'success');
            } else {
                showToast('Failed to update profile', 'error');
            }
        } catch {
            showToast('An error occurred', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            showToast('Passwords do not match', 'error');
            return;
        }

        if (passwordData.newPassword.length < 6) {
            showToast('Password must be at least 6 characters', 'error');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/user/password', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword,
                }),
            });

            if (res.ok) {
                showToast('Password updated successfully!', 'success');
                setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            } else {                const data = await res.json();
                showToast(data.error || 'Failed to update password', 'error');
            }
        } catch {
            showToast('An error occurred', 'error');
        } finally {
            setLoading(false);
        }
    };    const handleNotificationUpdate = async () => {
        setLoading(true);
        try {
            // API call would go here
            await new Promise(resolve => setTimeout(resolve, 500));
            showToast('Notification settings updated!', 'success');
        } catch {
            showToast('Failed to update settings', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handlePrivacyUpdate = async () => {
        setLoading(true);
        try {
            // API call would go here
            await new Promise(resolve => setTimeout(resolve, 500));
            showToast('Privacy settings updated!', 'success');
        } catch {
            showToast('Failed to update settings', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleExportData = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/user/export');
            if (res.ok) {
                const data = await res.json();
                
                // Decrypt journal entries before export
                if (data.journals && data.journals.length > 0) {
                    const { decryptText } = await import('@/lib/encryption');
                    
                    const decryptedJournals = await Promise.all(
                        data.journals.map(async (journal: any) => {
                            try {
                                return {
                                    ...journal,
                                    title: journal.title ? await decryptText(journal.title) : '',
                                    content: await decryptText(journal.content),
                                };
                            } catch (error) {
                                return {
                                    ...journal,
                                    title: '[Encrypted - Unable to decrypt]',
                                    content: '[This entry cannot be decrypted]',
                                };
                            }
                        })
                    );
                    
                    data.journals = decryptedJournals;
                }
                
                // Create and download the decrypted data
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `mindease-data-${new Date().toISOString().split('T')[0]}.json`;
                a.click();
                window.URL.revokeObjectURL(url);
                
                showToast('Data exported successfully!', 'success');
            } else {
                showToast('Failed to export data', 'error');
            }
        } catch (error) {
            console.error('Export error:', error);
            showToast('An error occurred during export', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm(
            'Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently deleted.'
        );

        if (!confirmed) return;

        const doubleConfirm = window.confirm(
            'This is your final warning. Type DELETE to confirm account deletion.'
        );

        if (!doubleConfirm) return;

        setLoading(true);
        try {
            const res = await fetch('/api/user/account', {
                method: 'DELETE',
            });

            if (res.ok) {
                showToast('Account deleted successfully', 'success');
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            } else {
                showToast('Failed to delete account', 'error');
            }
        } catch {
            showToast('An error occurred', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleExportKey = async () => {
        try {
            const key = await exportEncryptionKey();
            setEncryptionKeyBackup(key);
            setShowEncryptionKey(true);
            showToast('Encryption key displayed. Please save it securely!', 'info');
        } catch (error) {
            showToast('No encryption key found', 'error');
        }
    };

    const handleCopyKey = async () => {
        try {
            await navigator.clipboard.writeText(encryptionKeyBackup);
            showToast('Encryption key copied to clipboard!', 'success');
        } catch {
            showToast('Failed to copy to clipboard', 'error');
        }
    };

    const handleImportKey = () => {
        const keyInput = prompt('Paste your encryption key backup:');
        if (!keyInput) return;

        try {
            importEncryptionKey(keyInput);
            setHasKey(true);
            showToast('Encryption key imported successfully!', 'success');
            // Recommend page reload to decrypt entries
            if (confirm('Key imported! Reload the page to decrypt your entries?')) {
                window.location.reload();
            }
        } catch {
            showToast('Invalid encryption key format', 'error');
        }
    };

    const handleClearKey = () => {
        const confirmed = window.confirm(
            '⚠️ WARNING: Clearing your encryption key will make all your encrypted journal entries unrecoverable! Make sure you have backed up your key first. Are you sure?'
        );

        if (!confirmed) return;

        const doubleConfirm = window.confirm(
            'This is your final warning. All encrypted data will be PERMANENTLY UNRECOVERABLE. Continue?'
        );

        if (!doubleConfirm) return;

        clearEncryptionKey();
        setHasKey(false);
        setEncryptionKeyBackup('');
        setShowEncryptionKey(false);
        showToast('Encryption key cleared', 'info');
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'security', label: 'Security', icon: Lock },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'privacy', label: 'Privacy', icon: Shield },
        { id: 'appearance', label: 'Appearance', icon: Palette },
        { id: 'data', label: 'Data & Account', icon: Download },
    ];    return (
        <div className="w-full max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-6 md:mb-8">
                <h1 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-2">Settings</h1>
                <p className="text-muted-foreground text-sm md:text-base">Manage your account preferences and settings</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                                activeTab === tab.id
                                    ? 'bg-secondary text-white shadow-lg'
                                    : 'bg-white hover:bg-gray-50 text-gray-700'
                            }`}
                        >
                            <Icon size={18} />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                    <form onSubmit={handleProfileUpdate} className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-heading font-bold text-secondary mb-4">Profile Information</h2>
                            <p className="text-muted-foreground mb-6">Update your personal information</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={profile.name}
                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={profile.email}
                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                placeholder="your.email@example.com"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-xl font-medium hover:bg-secondary-hover transition-all disabled:opacity-50"
                        >
                            <Save size={18} />
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </form>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                    <div className="space-y-8">
                        {/* Password Section */}
                        <form onSubmit={handlePasswordUpdate} className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-heading font-bold text-secondary mb-4">Change Password</h2>
                                <p className="text-muted-foreground mb-6">Update your password to keep your account secure</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Current Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showCurrentPassword ? 'text' : 'password'}
                                        value={passwordData.currentPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        placeholder="Enter current password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showNewPassword ? 'text' : 'password'}
                                        value={passwordData.newPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        placeholder="Enter new password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={passwordData.confirmPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        placeholder="Confirm new password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-xl font-medium hover:bg-secondary-hover transition-all disabled:opacity-50"
                            >
                                <Lock size={18} />
                                {loading ? 'Updating...' : 'Update Password'}
                            </button>
                        </form>

                        {/* Encryption Key Management Section */}
                        <div className="border-t border-gray-200 pt-8">
                            <div>
                                <h2 className="text-2xl font-heading font-bold text-secondary mb-4">Journal Encryption</h2>
                                <p className="text-muted-foreground mb-6">Manage your end-to-end encryption key for journal entries</p>
                            </div>

                            <div className="space-y-4">
                                {/* Key Status */}
                                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                            <Key size={20} className="text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">Encryption Status</h3>
                                            <p className="text-sm text-gray-600">
                                                {hasKey ? '✓ Encryption key is active' : '⚠ No encryption key found'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Info Box */}
                                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                                    <p className="text-sm text-blue-800">
                                        <strong>🔒 End-to-End Encryption:</strong> Your journal entries are encrypted on your device before being sent to the server. 
                                        The encryption key is stored locally in your browser. <strong>Important:</strong> If you clear your browser data or 
                                        use a different device, you'll need to import your backup key to access encrypted entries.
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <button
                                        onClick={handleExportKey}
                                        disabled={!hasKey}
                                        className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl font-medium hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Download size={18} />
                                        Backup Encryption Key
                                    </button>

                                    <button
                                        onClick={handleImportKey}
                                        className="flex items-center justify-center gap-2 bg-green-600 text-white px-5 py-3 rounded-xl font-medium hover:bg-green-700 transition-all"
                                    >
                                        <Upload size={18} />
                                        Import Encryption Key
                                    </button>
                                </div>

                                {/* Show Encryption Key */}
                                {showEncryptionKey && encryptionKeyBackup && (
                                    <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                                        <div className="flex items-start justify-between mb-2">
                                            <h4 className="font-medium text-yellow-900">⚠️ Your Encryption Key</h4>
                                            <button
                                                onClick={handleCopyKey}
                                                className="flex items-center gap-1 text-sm text-yellow-700 hover:text-yellow-900"
                                            >
                                                <Copy size={16} />
                                                Copy
                                            </button>
                                        </div>
                                        <p className="text-sm text-yellow-800 mb-3">
                                            Save this key in a secure location. You'll need it to recover your encrypted journal entries.
                                        </p>
                                        <div className="bg-white p-3 rounded-lg border border-yellow-300 font-mono text-xs break-all">
                                            {encryptionKeyBackup}
                                        </div>
                                    </div>
                                )}

                                {/* Danger Zone */}
                                <div className="border-t border-gray-200 pt-4">
                                    <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                                        <h4 className="font-medium text-red-900 mb-2">⚠️ Danger Zone</h4>
                                        <p className="text-sm text-red-700 mb-3">
                                            Clearing your encryption key will make all encrypted journal entries permanently unrecoverable.
                                        </p>
                                        <button
                                            onClick={handleClearKey}
                                            disabled={!hasKey}
                                            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                        >
                                            <Trash2 size={16} />
                                            Clear Encryption Key
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-heading font-bold text-secondary mb-4">Notification Preferences</h2>
                            <p className="text-muted-foreground mb-6">Choose how you want to be notified</p>
                        </div>

                        <div className="space-y-4">
                            {[
                                { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive updates via email' },
                                { key: 'dailyReminders', label: 'Daily Reminders', description: 'Get reminded to journal daily' },
                                { key: 'weeklyInsights', label: 'Weekly Insights', description: 'Receive weekly mental health insights' },
                                { key: 'moodAlerts', label: 'Mood Alerts', description: 'Get notified about mood patterns' },
                            ].map((item) => (
                                <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <div>
                                        <h3 className="font-medium text-gray-900">{item.label}</h3>
                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={notifications[item.key as keyof NotificationSettings]}
                                            onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                                    </label>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={handleNotificationUpdate}
                            disabled={loading}
                            className="flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-xl font-medium hover:bg-secondary-hover transition-all disabled:opacity-50"
                        >
                            <Save size={18} />
                            {loading ? 'Saving...' : 'Save Preferences'}
                        </button>
                    </div>
                )}

                {/* Privacy Tab */}
                {activeTab === 'privacy' && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-heading font-bold text-secondary mb-4">Privacy Settings</h2>
                            <p className="text-muted-foreground mb-6">Control your data and privacy preferences</p>
                        </div>

                        <div className="space-y-4">
                            {[
                                { key: 'dataSharing', label: 'Data Sharing', description: 'Share anonymized data for research purposes' },
                                { key: 'analyticsTracking', label: 'Analytics Tracking', description: 'Help us improve by allowing usage analytics' },
                            ].map((item) => (
                                <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <div>
                                        <h3 className="font-medium text-gray-900">{item.label}</h3>
                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={privacy[item.key as keyof PrivacySettings]}
                                            onChange={(e) => setPrivacy({ ...privacy, [item.key]: e.target.checked })}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                                    </label>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={handlePrivacyUpdate}
                            disabled={loading}
                            className="flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-xl font-medium hover:bg-secondary-hover transition-all disabled:opacity-50"
                        >
                            <Save size={18} />
                            {loading ? 'Saving...' : 'Save Settings'}
                        </button>
                    </div>
                )}

                {/* Appearance Tab */}
                {activeTab === 'appearance' && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-heading font-bold text-secondary mb-4">Appearance</h2>
                            <p className="text-muted-foreground mb-6">Customize how MindEase looks</p>
                        </div>

                        <div>
                            <h3 className="font-medium text-gray-900 mb-3">Theme</h3>
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { value: 'light', label: 'Light', icon: '☀️' },
                                    { value: 'dark', label: 'Dark', icon: '🌙' },
                                    { value: 'auto', label: 'Auto', icon: '⚡' },
                                ].map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => setTheme(option.value as any)}
                                        className={`p-4 rounded-xl border-2 transition-all ${
                                            theme === option.value
                                                ? 'border-secondary bg-secondary/5'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <div className="text-3xl mb-2">{option.icon}</div>
                                        <div className="font-medium">{option.label}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="p-4 bg-blue-50 rounded-xl">
                            <p className="text-sm text-blue-800">
                                <strong>Note:</strong> Dark mode is coming soon! We're working hard to bring you a beautiful dark theme.
                            </p>
                        </div>
                    </div>
                )}

                {/* Data & Account Tab */}
                {activeTab === 'data' && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-heading font-bold text-secondary mb-4">Data & Account Management</h2>
                            <p className="text-muted-foreground mb-6">Export your data or delete your account</p>
                        </div>

                        <div className="space-y-4">
                            {/* Export Data */}
                            <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="font-heading font-bold text-lg text-gray-900 mb-2">Export Your Data</h3>
                                        <p className="text-muted-foreground mb-4">
                                            Download a copy of all your journal entries, mood data, and account information in JSON format.
                                        </p>
                                        <button
                                            onClick={handleExportData}
                                            disabled={loading}
                                            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-all disabled:opacity-50"
                                        >
                                            <Download size={18} />
                                            {loading ? 'Exporting...' : 'Export Data'}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Delete Account */}
                            <div className="p-6 bg-red-50 rounded-xl border border-red-100">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="font-heading font-bold text-lg text-red-900 mb-2">Delete Account</h3>
                                        <p className="text-red-700 mb-4">
                                            Permanently delete your account and all associated data. This action cannot be undone.
                                        </p>
                                        <button
                                            onClick={handleDeleteAccount}
                                            disabled={loading}
                                            className="flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-red-700 transition-all disabled:opacity-50"
                                        >
                                            <Trash2 size={18} />
                                            {loading ? 'Deleting...' : 'Delete Account'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
