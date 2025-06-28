'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FaUsers, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { RiMenuUnfold3Line, RiMenuUnfold4Line } from 'react-icons/ri';
import { Tooltip } from 'react-tooltip';

const tabs = [
    {
        tab: {
            _id: '685aeab57a5743ec8f9411df',
            name: 'User Management',
            icon: FaUsers
        },
        permissions: [
            { _id: '1', label: 'Add Users', route: '/auth/user' },
            { _id: '2', label: 'View Users', route: '/auth/user' },
            { _id: '3', label: 'Edit Users', route: '/auth/user' },
            { _id: '4', label: 'Delete Users', route: '/auth/user' }
        ]
    }
];

export const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(true);
    const [openTab, setOpenTab] = useState<string | null>(null);

    const toggleCollapse = () => setCollapsed((prev) => !prev);
    const handleTabClick = (id: string) =>
        setOpenTab((prev) => (prev === id ? null : id));

    return (
        <div
            className={`h-screen bg-white dark:bg-gray-900 border-e border-gray-300 dark:border-gray-700 fixed z-10 transition-all duration-300 ${collapsed ? 'w-[60px]' : 'w-[220px]'
                }`}
        >
            {/* Toggle Button */}
            <div className={`p-2 py-4 flex ${collapsed ? "justify-center" : "justify-end"}`}>
                {
                    !collapsed && <Image src={"/next.svg"} width={100} height={20} className='m-auto drop-shadow-xs drop-shadow-gray-50' alt='Logo' />
                }

                <button
                    className="text-gray-600 dark:text-gray-200"
                    onClick={toggleCollapse}
                >
                    {collapsed ? <RiMenuUnfold3Line className='text-2xl text-primary m-auto' /> : <RiMenuUnfold4Line className='text-2xl text-primary m-auto' />}
                </button>
            </div>

            {/* Tabs */}
            <div className="space-y-2">
                {tabs.map(({ tab, permissions }) => {
                    const Icon = tab.icon;
                    const isOpen = openTab === tab._id;

                    return (
                        <div key={tab._id}>
                            <button
                                onClick={() => handleTabClick(tab._id)}
                                className={`flex items-center gap-3 px-4 py-2 w-full text-left transition-colors ${collapsed ? 'justify-center' : ''
                                    } hover:bg-gray-100 dark:hover:bg-gray-800`}
                                data-tooltip-id={`tooltip-${tab._id}`}
                                data-tooltip-content={tab.name}
                            >
                                <Icon className={`${collapsed ? "text-3xl" : "text-xl"}`} />
                                {!collapsed && <span className="flex-1 text-sm">{tab.name}</span>}
                                {!collapsed &&
                                    (isOpen ? <FaChevronUp className='text-sm' /> : <FaChevronDown className='text-sm' />)}
                            </button>

                            {/* Tooltip when collapsed */}
                            {collapsed && (
                                <Tooltip id={`tooltip-${tab._id}`} place="right" />
                            )}

                            {/* Submenu */}
                            {!collapsed && isOpen && (
                                <div className="ml-10 mt-1 space-y-1">
                                    {permissions.map((perm) => (
                                        <a
                                            key={perm._id}
                                            href={perm.route}
                                            className="block text-sm text-gray-600 dark:text-gray-300 hover:text-primary"
                                        >
                                            {perm.label}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
