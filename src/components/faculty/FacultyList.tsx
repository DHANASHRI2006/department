import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Plus, Edit, Trash2, Users, Search, Filter } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { FacultyForm } from './FacultyForm';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import type { Faculty } from '../../types';

export const FacultyList: React.FC = () => {
  const { faculty, departments, deleteFaculty } = useData();
  const { showToast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; faculty: Faculty | null }>({
    isOpen: false,
    faculty: null
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const handleEdit = (facultyMember: Faculty) => {
    setEditingFaculty(facultyMember);
    setIsFormOpen(true);
  };

  const handleDelete = (facultyMember: Faculty) => {
    setDeleteConfirm({ isOpen: true, faculty: facultyMember });
  };

  const confirmDelete = () => {
    if (deleteConfirm.faculty) {
      deleteFaculty(deleteConfirm.faculty.id);
      showToast('Faculty member deleted successfully', 'success');
      setDeleteConfirm({ isOpen: false, faculty: null });
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingFaculty(null);
  };

  const getDepartmentName = (departmentId: string) => {
    const department = departments.find(d => d.id === departmentId);
    return department ? department.name : 'Unknown Department';
  };

  const filteredFaculty = faculty.filter(member => {
    const matchesSearch = 
      member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.designation.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = !filterDepartment || member.departmentId === filterDepartment;
    const matchesStatus = !filterStatus || member.status === filterStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Faculty</h1>
          <p className="text-gray-600">Manage faculty members and their details</p>
        </div>
        <Button 
          onClick={() => setIsFormOpen(true)}
          className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Faculty
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search faculty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Departments</option>
            {departments.map(dept => (
              <option key={dept.id} value={dept.id}>{dept.name}</option>
            ))}
          </select>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Filter className="w-4 h-4" />
            <span>{filteredFaculty.length} faculty found</span>
          </div>
        </div>
      </Card>

      {/* Faculty Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFaculty.map((member) => (
          <Card key={member.id} className="p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-medium">
                    {member.firstName[0]}{member.lastName[0]}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {member.firstName} {member.lastName}
                  </h3>
                  <p className="text-sm text-gray-600">{member.designation}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEdit(member)}
                  className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                  title="Edit Faculty"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(member)}
                  className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                  title="Delete Faculty"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">Department</p>
                <p className="font-medium text-gray-900">{getDepartmentName(member.departmentId)}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-1">Email</p>
                <p className="text-sm text-gray-700">{member.email}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-1">Phone</p>
                <p className="text-sm text-gray-700">{member.phone}</p>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600">Experience</p>
                  <p className="text-sm font-medium text-gray-900">{member.experience} years</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  member.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {member.status}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredFaculty.length === 0 && (
        <Card className="p-12 text-center">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {faculty.length === 0 ? 'No faculty members found' : 'No faculty match your filters'}
          </h3>
          <p className="text-gray-600 mb-4">
            {faculty.length === 0 
              ? 'Get started by adding your first faculty member.'
              : 'Try adjusting your search or filter criteria.'
            }
          </p>
          {faculty.length === 0 && (
            <Button 
              onClick={() => setIsFormOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Faculty
            </Button>
          )}
        </Card>
      )}

      {/* Faculty Form Modal */}
      <FacultyForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        faculty={editingFaculty}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, faculty: null })}
        onConfirm={confirmDelete}
        title="Delete Faculty Member"
        message={`Are you sure you want to delete "${deleteConfirm.faculty?.firstName} ${deleteConfirm.faculty?.lastName}"? This action cannot be undone.`}
        confirmText="Delete"
        confirmVariant="danger"
      />
    </div>
  );
};