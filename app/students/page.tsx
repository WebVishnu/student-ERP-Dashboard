"use client"
import React, { useState } from 'react';
import {
    Search,
    Filter,
    Download,
    UserPlus,
    Mail,
    Phone,
    MapPin,
    Calendar,
    TrendingUp,
    Award,
    Clock,
    MoreVertical,
    Eye,
    Edit,
    Trash2,
    Users,
    X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useRouter } from 'next/navigation';

interface Student {
    id: string;
    name: string;
    rollNo: string;
    class: string;
    attendance: number;
    grade: string;
    phone: string;
    email: string;
    avatar: string;
    status: 'active' | 'inactive';
    feesStatus: 'paid' | 'pending' | 'overdue';
}

type FilterType = 'all' | 'topPerformers' | 'pendingFees' | 'lowAttendance';

export default function StudentsPage() {
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');
    const router = useRouter();
    // Dummy student data
    const students: Student[] = [
        {
            id: '1',
            name: 'Sarah Johnson',
            rollNo: '2024001',
            class: '10-A',
            attendance: 96,
            grade: 'A+',
            phone: '+91 98765 43210',
            email: 'sarah.j@school.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
            status: 'active',
            feesStatus: 'paid'
        },
        {
            id: '2',
            name: 'Michael Chen',
            rollNo: '2024002',
            class: '10-A',
            attendance: 89,
            grade: 'B+',
            phone: '+91 98765 43211',
            email: 'michael.c@school.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
            status: 'active',
            feesStatus: 'pending'
        },
        {
            id: '3',
            name: 'Emily Davis',
            rollNo: '2024003',
            class: '10-B',
            attendance: 94,
            grade: 'A',
            phone: '+91 98765 43212',
            email: 'emily.d@school.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
            status: 'active',
            feesStatus: 'paid'
        },
        {
            id: '4',
            name: 'David Wilson',
            rollNo: '2024004',
            class: '9-C',
            attendance: 78,
            grade: 'C+',
            phone: '+91 98765 43213',
            email: 'david.w@school.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
            status: 'active',
            feesStatus: 'overdue'
        },
        {
            id: '5',
            name: 'Lisa Anderson',
            rollNo: '2024005',
            class: '11-A',
            attendance: 92,
            grade: 'A+',
            phone: '+91 98765 43214',
            email: 'lisa.a@school.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
            status: 'active',
            feesStatus: 'paid'
        },
        {
            id: '6',
            name: 'James Brown',
            rollNo: '2024006',
            class: '12-B',
            attendance: 85,
            grade: 'B',
            phone: '+91 98765 43215',
            email: 'james.b@school.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
            status: 'active',
            feesStatus: 'paid'
        },
        {
            id: '7',
            name: 'Anna Taylor',
            rollNo: '2024007',
            class: '10-A',
            attendance: 97,
            grade: 'A+',
            phone: '+91 98765 43216',
            email: 'anna.t@school.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna',
            status: 'active',
            feesStatus: 'paid'
        },
        {
            id: '8',
            name: 'Robert Lee',
            rollNo: '2024008',
            class: '9-C',
            attendance: 72,
            grade: 'C',
            phone: '+91 98765 43217',
            email: 'robert.l@school.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
            status: 'active',
            feesStatus: 'overdue'
        },
        {
            id: '9',
            name: 'Sophie Clark',
            rollNo: '2024009',
            class: '11-A',
            attendance: 95,
            grade: 'A+',
            phone: '+91 98765 43218',
            email: 'sophie.c@school.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie',
            status: 'active',
            feesStatus: 'pending'
        }
    ];

    // Stats with click handlers
    const stats = [
        {
            id: 'all',
            title: 'Total Students',
            value: students.length.toString(),
            change: '+12% from last month',
            icon: Users,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50'
        },
        {
            id: 'topPerformers',
            title: 'Top Performers',
            value: students.filter(s => s.grade === 'A+').length.toString(),
            change: 'Grade A+ students',
            icon: Award,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50'
        },
        {
            id: 'lowAttendance',
            title: 'Low Attendance',
            value: students.filter(s => s.attendance < 80).length.toString(),
            change: 'Below 80% attendance',
            icon: TrendingUp,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50'
        },
        {
            id: 'pendingFees',
            title: 'Pending Fees',
            value: students.filter(s => s.feesStatus !== 'paid').length.toString(),
            change: 'Requires attention',
            icon: Clock,
            color: 'text-red-600',
            bgColor: 'bg-red-50'
        }
    ];

    // Filter students based on active filter
    const getFilteredStudents = (): Student[] => {
        switch (activeFilter) {
            case 'topPerformers':
                return students.filter(s => s.grade === 'A+');
            case 'pendingFees':
                return students.filter(s => s.feesStatus !== 'paid');
            case 'lowAttendance':
                return students.filter(s => s.attendance < 80);
            default:
                return students;
        }
    };

    const filteredStudents = getFilteredStudents();

    // Get filter title
    const getFilterTitle = (): string => {
        switch (activeFilter) {
            case 'topPerformers':
                return 'Top Performers (A+ Grade)';
            case 'pendingFees':
                return 'Students with Pending Fees';
            case 'lowAttendance':
                return 'Students with Low Attendance';
            default:
                return 'All Students';
        }
    };

    return (
        <div className="w-full min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl  space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Students</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-2 cursor-pointer">
                            <Download className="w-4 h-4" />
                        </Button>
                        <Button onClick={() => {
                            router.push("/students/create")
                        }} size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700 cursor-pointer">
                            <UserPlus className="w-4 h-4" />
                            Add Student
                        </Button>
                    </div>
                </div>

                {/* Stats Grid - Clickable */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        const isActive = activeFilter === stat.id;
                        return (
                            <Card
                                key={stat.id}
                                className={`hover:shadow-md transition-all cursor-pointer ${isActive ? 'ring-2 ring-blue-500 shadow-md' : ''
                                    }`}
                                onClick={() => setActiveFilter(stat.id as FilterType)}
                            >
                                <CardContent className="">
                                    <div className="flex items-center justify-between">
                                        <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                                            <Icon className={`w-6 h-6 ${stat.color}`} />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
                                        <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                                        <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>


                <div className="border border-gray-200 overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50">
                                <TableHead>Student</TableHead>
                                <TableHead>Roll No</TableHead>
                                <TableHead>Class</TableHead>
                                <TableHead>Attendance</TableHead>
                                <TableHead>Grade</TableHead>
                                <TableHead>Fees</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredStudents.length > 0 ? (
                                filteredStudents.map((student) => (
                                    <TableRow key={student.id} onClick={() => {
                                        router.push(`/students/details/${student.id}`)
                                    }} className="hover:bg-gray-50 cursor-pointer">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarImage src={student.avatar} />
                                                    <AvatarFallback>{student.name.substring(0, 2)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium text-gray-900">{student.name}</p>
                                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                                        <Mail className="w-3 h-3" />
                                                        {student.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-mono text-sm">{student.rollNo}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">{student.class}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full ${student.attendance >= 90 ? 'bg-green-500' :
                                                            student.attendance >= 75 ? 'bg-yellow-500' :
                                                                'bg-red-500'
                                                            }`}
                                                        style={{ width: `${student.attendance}%` }}
                                                    />
                                                </div>
                                                <span className="text-sm font-medium text-gray-700">{student.attendance}%</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={
                                                student.grade.startsWith('A') ? 'bg-green-100 text-green-700 border-green-200' :
                                                    student.grade.startsWith('B') ? 'bg-blue-100 text-blue-700 border-blue-200' :
                                                        'bg-orange-100 text-orange-700 border-orange-200'
                                            }>
                                                {student.grade}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={
                                                student.feesStatus === 'paid' ? 'bg-green-100 text-green-700 border-green-200' :
                                                    student.feesStatus === 'pending' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                                                        'bg-red-100 text-red-700 border-red-200'
                                            }>
                                                {student.feesStatus === 'paid' ? 'Paid' :
                                                    student.feesStatus === 'pending' ? 'Pending' : 'Overdue'}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-12">
                                        <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No students found</h3>
                                        <p className="text-gray-500">No students match the current filter</p>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}