"use client"
import React, { useEffect, useState } from 'react';
import {
    LayoutDashboard,
    Users,
    GraduationCap,
    BookOpen,
    Calendar,
    ClipboardCheck,
    DollarSign,
    FileText,
    Settings,
    Bell,
    MessageSquare,
    BarChart3,
    ChevronDown,
    LogOut,
    Menu
} from 'lucide-react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from '@/components/ui/sheet';
import { usePathname, useRouter } from 'next/navigation';

interface NavItem {
    id: string;
    label: string;
    icon: React.ElementType;
    href?: string;
    badge?: number;
    subItems?: { id: string; label: string; href: string }[];
    showInBottomNav?: boolean;
}

// Navigation items
const navItems: NavItem[] = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
        href: '/',
        showInBottomNav: true
    },
    {
        id: 'students',
        label: 'Students',
        href: '/students',
        icon: Users,
        showInBottomNav: true,
    },
    {
        id: 'faculty',
        href: '/faculty',
        label: 'Faculty',
        icon: GraduationCap,
        showInBottomNav: true,
    },
    {
        id: 'fees',
        href: '/fees',
        label: 'Fees',
        icon: DollarSign,
        showInBottomNav: false,
    },
    {
        id: 'reports',
        label: 'Reports',
        icon: BarChart3,
        href: '/reports',
        showInBottomNav: false
    },
    {
        id: 'AI Chatbot',
        label: 'AI Chatbot',
        icon: MessageSquare,
        href: '/chat/hi',
        badge: 5,
        showInBottomNav: true
    }
];

export default function Sidebar() {
    const pathname = usePathname();
    const [activeItem, setActiveItem] = useState<string>(navItems.find(item => String(item.href).split("/")[1] === pathname.split("/")[1])?.id || 'dashboard');
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
    const router = useRouter();


    const toggleSubmenu = (itemId: string) => {
        setOpenSubmenu(openSubmenu === itemId ? null : itemId);
    };

    const handleItemClick = (itemId: string) => {
        setActiveItem(itemId);
        router.push(navItems.find(item => item.id === itemId)?.href || '/');
    };


    useEffect(() => {
        const currentItem = navItems.find(item => String(item.href).split("/")[1] === pathname.split("/")[1])?.id;
        if (currentItem) {
            setActiveItem(currentItem);
        }
    }, [pathname]);

    // Filter items for bottom nav (mobile)
    const bottomNavItems = navItems.filter(item => item.showInBottomNav);

    // Sidebar content component (reused in both desktop and mobile sheet)
    const SidebarContent = () => (
        <>

            {/* User Profile */}
            <div className="p-1 border-b border-gray-200">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <Avatar>
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
                        <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">Admin User</p>
                        <p className="text-xs text-gray-500 truncate">admin@school.com</p>
                    </div>
                </div>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const hasSubItems = item.subItems && item.subItems.length > 0;
                    const isActive = activeItem === item.id;
                    const isSubmenuOpen = openSubmenu === item.id;

                    if (hasSubItems) {
                        return (
                            <Collapsible
                                key={item.id}
                                open={isSubmenuOpen}
                                onOpenChange={() => toggleSubmenu(item.id)}
                            >
                                <CollapsibleTrigger asChild>
                                    <button
                                        className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                      transition-all duration-150 group
                      ${isActive
                                                ? 'bg-blue-50 text-blue-600'
                                                : 'text-gray-700 hover:bg-gray-50'
                                            }
                    `}
                                    >
                                        <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                                        <span className="flex-1 text-left font-medium text-sm">{item.label}</span>
                                        {item.badge && (
                                            <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                                {item.badge}
                                            </span>
                                        )}
                                        <ChevronDown
                                            className={`w-4 h-4 transition-transform ${isSubmenuOpen ? 'rotate-180' : ''}`}
                                        />
                                    </button>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="mt-1 space-y-1">
                                    {item.subItems?.map((subItem) => (
                                        <button
                                            key={subItem.id}
                                            onClick={() => handleItemClick(subItem.id)}
                                            className="w-full flex items-center gap-3 pl-12 pr-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                                        >
                                            {subItem.label}
                                        </button>
                                    ))}
                                </CollapsibleContent>
                            </Collapsible>
                        );
                    }

                    return (
                        <button
                            key={item.id}
                            onClick={() => handleItemClick(item.id)}
                            className={`cursor-pointer 
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                transition-all duration-150 group
                ${isActive
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }
              `}
                        >
                            <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                            <span className="flex-1 text-left font-medium text-sm">{item.label}</span>
                            {item.badge && (
                                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {item.badge}
                                </span>
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* Bottom Section */}
            <div className="p-4 border-t border-gray-200 space-y-1">
                <button
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    <Settings className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-medium">Settings</span>
                </button>
                <button
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-medium">Logout</span>
                </button>
            </div>
        </>
    );

    return (
        <>
            {/* Desktop Sidebar - Always visible on large screens */}
            <aside className="hidden lg:flex lg:flex-col fixed top-0 left-0 h-screen bg-white border-r border-gray-200 w-60 z-40">
                <SidebarContent />
            </aside>

            {/* Mobile Bottom Navigation Bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 pb-safe">
                <div className="flex items-center justify-around px-2 py-2">
                    {bottomNavItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeItem === item.id;

                        return (
                            <button
                                key={item.id}
                                onClick={() => handleItemClick(item.id)}
                                className="flex flex-col items-center gap-1 min-w-0 flex-1 px-2 py-1.5 relative group"
                            >
                                <div className="relative">
                                    <Icon
                                        className={`w-6 h-6 transition-all duration-200 ${isActive ? 'text-blue-600 scale-110' : 'text-gray-400 group-active:scale-95'
                                            }`}
                                    />
                                    {item.badge && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full min-w-[16px] h-4 px-1 flex items-center justify-center font-semibold">
                                            {item.badge}
                                        </span>
                                    )}
                                </div>
                                {isActive && (
                                    <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-10 h-1 bg-blue-600 rounded-b-full" />
                                )}
                            </button>
                        );
                    })}

                    {/* Menu button for full navigation */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <button className="flex flex-col items-center gap-1 min-w-0 flex-1 px-2 py-1.5 relative group">
                                <Menu className="w-6 h-6 text-gray-400 group-active:scale-95 transition-transform" />
                            </button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0 w-72">
                            <div className="flex flex-col h-full">
                                <SidebarContent />
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </>
    );
}