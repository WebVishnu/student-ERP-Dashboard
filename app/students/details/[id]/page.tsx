"use client"
import React, { useState } from 'react';
import {
    ArrowLeft,
    Mail,
    Phone,
    MapPin,
    Calendar,
    User,
    GraduationCap,
    TrendingUp,
    DollarSign,
    FileText,
    Edit,
    Download,
    Clock,
    CheckCircle2,
    XCircle,
    AlertCircle,
    Award,
    BookOpen
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export default function StudentDetails() {
    // Dummy student data
    const student = {
        id: '1',
        name: 'Sarah Johnson',
        rollNo: '2024001',
        class: '10-A',
        email: 'sarah.j@school.com',
        phone: '+91 98765 43210',
        dateOfBirth: '2008-05-15',
        gender: 'Female',
        bloodGroup: 'A+',
        address: '123 Main Street, Downtown',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        admissionDate: '2020-04-01',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        status: 'active',
        
        // Academic Info
        attendance: 96,
        grade: 'A+',
        totalPresent: 192,
        totalAbsent: 8,
        
        // Parent Info
        parentName: 'John Johnson',
        parentPhone: '+91 98765 43200',
        parentEmail: 'john.j@email.com',
        relationship: 'Father',
        
        // Fee Info
        feesStatus: 'paid',
        totalFees: 50000,
        paidFees: 50000,
        pendingFees: 0,
        lastPaymentDate: '2024-09-01'
    };

    // Recent grades data
    const recentGrades = [
        { subject: 'Mathematics', marks: 95, grade: 'A+', maxMarks: 100, exam: 'Mid-Term' },
        { subject: 'Science', marks: 92, grade: 'A+', maxMarks: 100, exam: 'Mid-Term' },
        { subject: 'English', marks: 88, grade: 'A', maxMarks: 100, exam: 'Mid-Term' },
        { subject: 'History', marks: 90, grade: 'A+', maxMarks: 100, exam: 'Mid-Term' },
        { subject: 'Geography', marks: 87, grade: 'A', maxMarks: 100, exam: 'Mid-Term' }
    ];

    // Attendance history
    const attendanceHistory = [
        { date: '2024-11-08', status: 'present', day: 'Friday' },
        { date: '2024-11-07', status: 'present', day: 'Thursday' },
        { date: '2024-11-06', status: 'present', day: 'Wednesday' },
        { date: '2024-11-05', status: 'absent', day: 'Tuesday' },
        { date: '2024-11-04', status: 'present', day: 'Monday' },
        { date: '2024-11-01', status: 'present', day: 'Friday' },
        { date: '2024-10-31', status: 'present', day: 'Thursday' }
    ];

    // Fee history
    const feeHistory = [
        { date: '2024-09-01', amount: 12500, type: 'Term 3 Fees', status: 'paid', method: 'Online' },
        { date: '2024-06-01', amount: 12500, type: 'Term 2 Fees', status: 'paid', method: 'Cheque' },
        { date: '2024-03-01', amount: 12500, type: 'Term 1 Fees', status: 'paid', method: 'Cash' },
        { date: '2024-01-01', amount: 12500, type: 'Admission Fees', status: 'paid', method: 'Online' }
    ];

    return (
        <div className="w-full min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Student Profile Card */}
                <Card>
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Profile Image */}
                            <div className="flex-shrink-0">
                                <Avatar className="w-32 h-32 border-4 border-gray-100">
                                    <AvatarImage src={student.avatar} />
                                    <AvatarFallback>{student.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                            </div>

                            {/* Basic Info */}
                            <div className="flex-1 space-y-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h2 className="text-2xl font-bold text-gray-900">{student.name}</h2>
                                        <Badge className="bg-green-100 text-green-700 border-green-200">
                                            Active
                                        </Badge>
                                    </div>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-1">
                                            <User className="w-4 h-4" />
                                            Roll No: <span className="font-medium">{student.rollNo}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <GraduationCap className="w-4 h-4" />
                                            Class: <span className="font-medium">{student.class}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            DOB: <span className="font-medium">{new Date(student.dateOfBirth).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Info Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Mail className="w-4 h-4 text-gray-400" />
                                        <div>
                                            <p className="text-xs text-gray-500">Email</p>
                                            <p className="font-medium text-gray-900">{student.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Phone className="w-4 h-4 text-gray-400" />
                                        <div>
                                            <p className="text-xs text-gray-500">Phone</p>
                                            <p className="font-medium text-gray-900">{student.phone}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <MapPin className="w-4 h-4 text-gray-400" />
                                        <div>
                                            <p className="text-xs text-gray-500">City</p>
                                            <p className="font-medium text-gray-900">{student.city}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                        <CardContent>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                                    <TrendingUp className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Attendance</p>
                                    <p className="text-2xl font-bold text-gray-900">{student.attendance}%</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                                    <Award className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Grade</p>
                                    <p className="text-2xl font-bold text-gray-900">{student.grade}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                                    <CheckCircle2 className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Days</p>
                                    <p className="text-2xl font-bold text-gray-900">{student.totalPresent}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                                    <DollarSign className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Fees</p>
                                    <Badge className="bg-green-100 text-green-700 border-green-200 mt-1">
                                        Paid
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabs Section */}
                <Tabs defaultValue="overview" className="space-y-4">
                    <TabsList className="bg-white border border-gray-200">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="attendance">Attendance</TabsTrigger>
                        <TabsTrigger value="grades">Grades</TabsTrigger>
                        <TabsTrigger value="fees">Fees</TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {/* Personal Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="w-5 h-5" />
                                        Personal Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-sm text-gray-500">Full Name</span>
                                        <span className="text-sm font-medium text-gray-900">{student.name}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-sm text-gray-500">Gender</span>
                                        <span className="text-sm font-medium text-gray-900">{student.gender}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-sm text-gray-500">Blood Group</span>
                                        <span className="text-sm font-medium text-gray-900">{student.bloodGroup}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-sm text-gray-500">Address</span>
                                        <span className="text-sm font-medium text-gray-900 text-right">{student.address}</span>
                                    </div>
                                    <div className="flex justify-between py-2">
                                        <span className="text-sm text-gray-500">Admission Date</span>
                                        <span className="text-sm font-medium text-gray-900">{new Date(student.admissionDate).toLocaleDateString()}</span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Parent Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="w-5 h-5" />
                                        Parent/Guardian Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-sm text-gray-500">Name</span>
                                        <span className="text-sm font-medium text-gray-900">{student.parentName}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-sm text-gray-500">Relationship</span>
                                        <span className="text-sm font-medium text-gray-900">{student.relationship}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-sm text-gray-500">Phone</span>
                                        <span className="text-sm font-medium text-gray-900">{student.parentPhone}</span>
                                    </div>
                                    <div className="flex justify-between py-2">
                                        <span className="text-sm text-gray-500">Email</span>
                                        <span className="text-sm font-medium text-gray-900">{student.parentEmail}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Attendance Tab */}
                    <TabsContent value="attendance">
                        <Card>
                            <CardHeader>
                                <CardTitle>Attendance History</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Day</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {attendanceHistory.map((record, index) => (
                                            <TableRow key={index}>
                                                <TableCell className="font-medium">{new Date(record.date).toLocaleDateString()}</TableCell>
                                                <TableCell>{record.day}</TableCell>
                                                <TableCell>
                                                    <Badge className={
                                                        record.status === 'present'
                                                            ? 'bg-green-100 text-green-700 border-green-200'
                                                            : 'bg-red-100 text-red-700 border-red-200'
                                                    }>
                                                        {record.status === 'present' ? (
                                                            <><CheckCircle2 className="w-3 h-3 mr-1 inline" /> Present</>
                                                        ) : (
                                                            <><XCircle className="w-3 h-3 mr-1 inline" /> Absent</>
                                                        )}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Grades Tab */}
                    <TabsContent value="grades">
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Grades</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Subject</TableHead>
                                            <TableHead>Exam</TableHead>
                                            <TableHead>Marks</TableHead>
                                            <TableHead>Grade</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {recentGrades.map((grade, index) => (
                                            <TableRow key={index}>
                                                <TableCell className="font-medium">{grade.subject}</TableCell>
                                                <TableCell>{grade.exam}</TableCell>
                                                <TableCell>{grade.marks}/{grade.maxMarks}</TableCell>
                                                <TableCell>
                                                    <Badge className={
                                                        grade.grade.startsWith('A')
                                                            ? 'bg-green-100 text-green-700 border-green-200'
                                                            : 'bg-blue-100 text-blue-700 border-blue-200'
                                                    }>
                                                        {grade.grade}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Fees Tab */}
                    <TabsContent value="fees">
                        <Card>
                            <CardHeader>
                                <CardTitle>Fee Payment History</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead>Method</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {feeHistory.map((fee, index) => (
                                            <TableRow key={index}>
                                                <TableCell className="font-medium">{new Date(fee.date).toLocaleDateString()}</TableCell>
                                                <TableCell>{fee.type}</TableCell>
                                                <TableCell className="font-semibold">₹{fee.amount.toLocaleString()}</TableCell>
                                                <TableCell>{fee.method}</TableCell>
                                                <TableCell>
                                                    <Badge className="bg-green-100 text-green-700 border-green-200">
                                                        <CheckCircle2 className="w-3 h-3 mr-1 inline" />
                                                        Paid
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}