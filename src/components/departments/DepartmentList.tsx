import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Plus, Edit, Trash2, Building2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { DepartmentForm } from './DepartmentForm';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import type { Department } from '../../types';

export const DepartmentList: React.FC = () => {
  const { departments, faculty, deleteDepartment } = useData();
  const { showToast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; department: Department | null }>({
    isOpen: false,
    department: null
  });

  const handleEdit = (department: Department) => {
    setEditingDepartment(department);
    setIsFormOpen(true);
  };

  const handleDelete = (department: Department) => {
    const facultyCount = faculty.filter(f => f.departmentId === department.id).length;
    if (facultyCount > 0) {
      showToast(`Cannot delete department. ${facultyCount} faculty members are assigned to this department.`, 'error');
      return;
    }
    setDeleteConfirm({ isOpen: true, department });
  };

  const confirmDelete = () => {
    if (deleteConfirm.department) {
      deleteDepartment(deleteConfirm.department.id);
      showToast('Department deleted successfully', 'success');
      setDeleteConfirm({ isOpen: false, department: null });
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingDepartment(null);
  };

  const getDepartmentFacultyCount = (departmentId: string) => {
    return faculty.filter(f => f.departmentId === departmentId).length;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Departments</h1>
          <p className="text-gray-600">Manage college departments and their details</p>
        </div>
        <Button 
          onClick={() => setIsFormOpen(true)}
          className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Department
        </Button>
      </div>

      {/* Department Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((department) => (
          <Card key={department.id} className="p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{department.name}</h3>
                  <p className="text-sm text-gray-600">{department.code}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEdit(department)}
                  className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                  title="Edit Department"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(department)}
                  className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                  title="Delete Department"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">Head of Department</p>
                <p className="font-medium text-gray-900">{department.head}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-1">Description</p>
                <p className="text-sm text-gray-700 line-clamp-2">{department.description}</p>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600">Faculty Count</p>
                  <p className="text-lg font-semibold text-blue-600">
                    {getDepartmentFacultyCount(department.id)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Established</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(department.establishedDate).getFullYear()}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {departments.length === 0 && (
        <Card className="p-12 text-center">
          <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No departments found</h3>
          <p className="text-gray-600 mb-4">Get started by creating your first department.</p>
          <Button 
            onClick={() => setIsFormOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Department
          </Button>
        </Card>
      )}

      {/* Department Form Modal */}
      <DepartmentForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        department={editingDepartment}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, department: null })}
        onConfirm={confirmDelete}
        title="Delete Department"
        message={`Are you sure you want to delete "${deleteConfirm.department?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        confirmVariant="danger"
      />
    </div>
  );
};