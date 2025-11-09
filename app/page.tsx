import React from 'react';
import {
  Users,
  GraduationCap,
  TrendingUp,
  DollarSign,
  Calendar,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Download
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Dashboard() {
  // Stats data
  const stats = [
    {
      title: 'Total Students',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Faculty Members',
      value: '187',
      change: '+3.2%',
      trend: 'up',
      icon: GraduationCap,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Attendance Rate',
      value: '94.2%',
      change: '-2.1%',
      trend: 'down',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Fee Collection',
      value: '₹45.2L',
      change: '+8.4%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    }
  ];

  // Recent activities
  const activities = [
    {
      id: 1,
      user: 'Sarah Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      action: 'submitted assignment',
      subject: 'Mathematics - Chapter 5',
      time: '5 minutes ago',
      status: 'success',
      icon: CheckCircle2
    },
    {
      id: 2,
      user: 'Michael Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
      action: 'marked absent',
      subject: 'Class 10-A',
      time: '12 minutes ago',
      status: 'warning',
      icon: AlertCircle
    },
    {
      id: 3,
      user: 'Emily Davis',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      action: 'paid fees',
      subject: '₹12,500 (Semester 2)',
      time: '1 hour ago',
      status: 'success',
      icon: CheckCircle2
    },
    {
      id: 4,
      user: 'David Wilson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      action: 'failed to submit',
      subject: 'Science Project',
      time: '2 hours ago',
      status: 'error',
      icon: XCircle
    },
    {
      id: 5,
      user: 'Lisa Anderson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
      action: 'updated grades',
      subject: 'English - Mid Term',
      time: '3 hours ago',
      status: 'success',
      icon: CheckCircle2
    }
  ];

  // Upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: 'Parent-Teacher Meeting',
      date: 'Nov 12, 2025',
      time: '10:00 AM',
      type: 'Meeting'
    },
    {
      id: 2,
      title: 'Annual Sports Day',
      date: 'Nov 15, 2025',
      time: '9:00 AM',
      type: 'Event'
    },
    {
      id: 3,
      title: 'Mid-Term Exams Begin',
      date: 'Nov 20, 2025',
      time: 'All Day',
      type: 'Exam'
    }
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" className='bg-blue-600 hover:bg-blue-700 cursor-pointer'>
              <Download />
              Download Report
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Export Data</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
                    <div className="flex items-end justify-between mt-1">
                      <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                      <div className={`flex items-center gap-1 text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                        {stat.trend === 'up' ? (
                          <ArrowUpRight className="w-4 h-4" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4" />
                        )}
                        {stat.change}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Recent Activity - Takes 2 columns */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates from your school</CardDescription>
                </div>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity) => {
                  const StatusIcon = activity.icon;
                  return (
                    <div
                      key={activity.id}
                      className="flex items-start gap-4 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={activity.avatar} />
                        <AvatarFallback>{activity.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">
                          <span className="font-semibold">{activity.user}</span>
                          {' '}
                          <span className="text-gray-600">{activity.action}</span>
                        </p>
                        <p className="text-sm text-gray-500 mt-0.5">{activity.subject}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-400">{activity.time}</span>
                        </div>
                      </div>
                      <StatusIcon
                        className={`w-5 h-5 ${activity.status === 'success' ? 'text-green-500' :
                          activity.status === 'warning' ? 'text-yellow-500' :
                            'text-red-500'
                          }`}
                      />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}