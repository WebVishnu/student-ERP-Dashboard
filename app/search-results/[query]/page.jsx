"use client"
import React, { useState } from 'react';
import {
    Search,
    Users,
    GraduationCap,
    BookOpen,
    Calendar,
    DollarSign,
    FileText,
    Building,
    TrendingUp,
    X,
    Filter,
    ChevronRight,
    Mail,
    Phone,
    MapPin,
    Clock
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useParams } from 'next/navigation';


export default function page() {
    const params = useParams()
    const [searchQuery] = useState(params.query);
    const [selectedCategory] = useState('Students');
    const [sortBy, setSortBy] = useState('relevance');

    // Dummy search results
    const searchResults = [
        {
            id: '1',
            type: 'Students',
            title: 'John Smith',
            subtitle: 'Class 10-A',
            description: 'Roll No: 2024001 | Student ID: STU001',
            image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
            metadata: [
                { label: 'Email', value: 'john.smith@school.com', icon: Mail },
                { label: 'Phone', value: '+91 98765 43210', icon: Phone },
                { label: 'Attendance', value: '94%', icon: TrendingUp }
            ],
            badge: 'Active',
            badgeColor: 'bg-green-100 text-green-700'
        },
        {
            id: '2',
            type: 'Students',
            title: 'John Doe',
            subtitle: 'Class 12-B',
            description: 'Roll No: 2024042 | Student ID: STU042',
            image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JohnDoe',
            metadata: [
                { label: 'Email', value: 'john.doe@school.com', icon: Mail },
                { label: 'Phone', value: '+91 98765 43211', icon: Phone },
                { label: 'Attendance', value: '89%', icon: TrendingUp }
            ],
            badge: 'Active',
            badgeColor: 'bg-green-100 text-green-700'
        },
        {
            id: '3',
            type: 'Faculty',
            title: 'Dr. John Williams',
            subtitle: 'Mathematics Department',
            description: 'Employee ID: FAC005 | Experience: 12 years',
            image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JohnWilliams',
            metadata: [
                { label: 'Email', value: 'john.williams@school.com', icon: Mail },
                { label: 'Phone', value: '+91 98765 43212', icon: Phone },
                { label: 'Classes', value: '5 Classes', icon: BookOpen }
            ],
            badge: 'Professor',
            badgeColor: 'bg-purple-100 text-purple-700'
        },
        {
            id: '4',
            type: 'Students',
            title: 'Johnny Davis',
            subtitle: 'Class 9-C',
            description: 'Roll No: 2024089 | Student ID: STU089',
            image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Johnny',
            metadata: [
                { label: 'Email', value: 'johnny.davis@school.com', icon: Mail },
                { label: 'Phone', value: '+91 98765 43213', icon: Phone },
                { label: 'Attendance', value: '96%', icon: TrendingUp }
            ],
            badge: 'Active',
            badgeColor: 'bg-green-100 text-green-700'
        },
        {
            id: '5',
            type: 'Students',
            title: 'John Anderson',
            subtitle: 'Class 11-A',
            description: 'Roll No: 2024123 | Student ID: STU123',
            image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JohnAnderson',
            metadata: [
                { label: 'Email', value: 'john.anderson@school.com', icon: Mail },
                { label: 'Phone', value: '+91 98765 43214', icon: Phone },
                { label: 'Attendance', value: '91%', icon: TrendingUp }
            ],
            badge: 'Active',
            badgeColor: 'bg-green-100 text-green-700'
        }
    ].filter(result => String(result.title).toLowerCase().includes(searchQuery.toLowerCase()));
    console.log(searchResults)

    const getCategoryIcon = (type) => {
        switch (type) {
            case 'Students': return Users;
            case 'Faculty': return GraduationCap;
            case 'Courses': return BookOpen;
            case 'Classes': return Building;
            case 'Attendance': return Calendar;
            case 'Fees': return DollarSign;
            case 'Grades': return TrendingUp;
            case 'Library': return FileText;
            default: return Search;
        }
    };

    const getCategoryColor = (type) => {
        switch (type) {
            case 'Students': return 'text-blue-600 bg-blue-50';
            case 'Faculty': return 'text-purple-600 bg-purple-50';
            case 'Courses': return 'text-green-600 bg-green-50';
            case 'Classes': return 'text-orange-600 bg-orange-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    return (
        <div className="w-full min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 mt-12">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Search Results */}
                <div className="space-y-4">
                    {searchResults.map((result) => {
                        const Icon = getCategoryIcon(result.type);
                        const colorClass = getCategoryColor(result.type);

                        return (
                            <Card key={result.id} className="hover:shadow-md transition-all duration-200 cursor-pointer group">
                                <CardContent className="p-6">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        {/* Avatar/Image */}
                                        <div className="flex-shrink-0">
                                            <Avatar className="h-16 w-16 border-2 border-gray-100">
                                                <AvatarImage src={result.image} />
                                                <AvatarFallback>{result.title.substring(0, 2)}</AvatarFallback>
                                            </Avatar>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    {/* Title & Subtitle */}
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                            {result.title}
                                                        </h3>
                                                        {result.badge && (
                                                            <Badge className={`${result.badgeColor} border-0 text-xs`}>
                                                                {result.badge}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-600 mb-2">{result.subtitle}</p>
                                                    <p className="text-sm text-gray-500">{result.description}</p>

                                                    {/* Metadata */}
                                                    <div className="flex flex-wrap items-center gap-4 mt-4">
                                                        {result.metadata?.map((meta, index) => {
                                                            const MetaIcon = meta.icon;
                                                            return (
                                                                <div key={index} className="flex items-center gap-1.5 text-sm text-gray-600">
                                                                    {MetaIcon && <MetaIcon className="w-4 h-4 text-gray-400" />}
                                                                    <span className="text-xs text-gray-500">{meta.label}:</span>
                                                                    <span className="font-medium">{meta.value}</span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>

                                                {/* Category Badge & Action */}
                                                <div className="flex flex-col items-end gap-2">
                                                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${colorClass}`}>
                                                        <Icon className="w-4 h-4" />
                                                        <span className="text-xs font-medium">{result.type}</span>
                                                    </div>
                                                    <Button variant="ghost" size="sm" className="group-hover:bg-blue-50 group-hover:text-blue-600">
                                                        View Details
                                                        <ChevronRight className="w-4 h-4 ml-1" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {searchResults.length === 0 && (
                    <Card className="p-12">
                        <div className="text-center">
                            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
                            <p className="text-gray-500">Try adjusting your search or filters</p>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
}