import React from 'react';
import { useData } from '../context/DataContext';
import { Building2, Users, UserCheck, Calendar } from 'lucide-react';
import { Card } from './ui/Card';

export const Dashboard: React.FC = () => {
  const { departments, faculty } = useData();

  const stats = [
    {
      title: 'Total Departments',
      value: departments.length,
      icon: Building2,
      color: 'blue',
      description: 'Active departments'
    },
    {
      title: 'Total Faculty',
      value: faculty.length,
      icon: Users,
      color: 'green',
      description: 'Registered faculty members'
    },
    {
      title: 'Active Faculty',
      value: faculty.filter(f => f.status === 'Active').length,
      icon: UserCheck,
      color: 'purple',
      description: 'Currently active faculty'
    },
    {
      title: 'This Month',
      value: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      icon: Calendar,
      color: 'orange',
      description: 'Current period'
    }
  ];

  const recentFaculty = faculty.slice(-5).reverse();
  const departmentStats = departments.map(dept => ({
    ...dept,
    facultyCount: faculty.filter(f => f.departmentId === dept.id).length
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Overview of departments and faculty management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.description}</p>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Overview */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Overview</h3>
          <div className="space-y-4">
            {departmentStats.map((dept) => (
              <div key={dept.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{dept.name}</h4>
                  <p className="text-sm text-gray-600">{dept.code}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-blue-600">{dept.facultyCount}</p>
                  <p className="text-xs text-gray-500">Faculty</p>
                </div>
              </div>
            ))}
            {departmentStats.length === 0 && (
              <p className="text-gray-500 text-center py-4">No departments found</p>
            )}
          </div>
        </Card>

        {/* Recent Faculty */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Faculty</h3>
          <div className="space-y-4">
            {recentFaculty.map((member) => (
              <div key={member.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-medium text-sm">
                    {member.firstName[0]}{member.lastName[0]}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">
                    {member.firstName} {member.lastName}
                  </h4>
                  <p className="text-sm text-gray-600">{member.designation}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    member.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {member.status}
                  </span>
                </div>
              </div>
            ))}
            {recentFaculty.length === 0 && (
              <p className="text-gray-500 text-center py-4">No faculty members found</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};