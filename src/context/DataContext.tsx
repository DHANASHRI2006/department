import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import type { Department, Faculty } from '../types';

interface DataContextType {
  departments: Department[];
  faculty: Faculty[];
  addDepartment: (department: Omit<Department, 'id'>) => void;
  updateDepartment: (id: string, department: Omit<Department, 'id'>) => void;
  deleteDepartment: (id: string) => void;
  addFaculty: (faculty: Omit<Faculty, '_id'>) => void;
  updateFaculty: (id: string, faculty: Omit<Faculty, '_id'>) => void;
  deleteFaculty: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Sample fallback data if MongoDB isn't working
const sampleDepartments: Department[] = [
  {
    id: '1',
    name: 'Computer Science',
    code: 'CS',
    head: 'Dr. John Smith',
    description:
      'Department of Computer Science and Engineering focusing on software development, algorithms, and artificial intelligence.',
    establishedDate: '1995-08-15'
  }
];

const sampleFaculty: Faculty[] = [
  {
    _id: '1',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@college.edu',
    phone: '+1-555-0101',
    departmentId: '1',
    designation: 'Professor',
    experience: 15,
    qualification: 'Ph.D. in Computer Science',
    specialization: 'AI, ML',
    status: 'Active'
  }
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [faculty, setFaculty] = useState<Faculty[]>([]);

  useEffect(() => {
    // Load departments
    axios
      .get('http://localhost:5000/api/departments')
      .then(res => setDepartments(res.data))
      .catch(err => {
        console.error('Department fetch error:', err);
        setDepartments(sampleDepartments);
      });

    // Load faculty
    axios
      .get('http://localhost:5000/api/faculty')
      .then(res => setFaculty(res.data))
      .catch(err => {
        console.error('Faculty fetch error:', err);
        setFaculty(sampleFaculty);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('departments', JSON.stringify(departments));
  }, [departments]);

  useEffect(() => {
    localStorage.setItem('faculty', JSON.stringify(faculty));
  }, [faculty]);

  // ---------- Department Methods ----------
  const addDepartment = (department: Omit<Department, 'id'>) => {
    const newDepartment: Department = {
      ...department,
      id: Date.now().toString()
    };
    setDepartments(prev => [...prev, newDepartment]);

    axios
      .post('http://localhost:5000/api/departments', department)
      .then(() => console.log('✅ Department saved'))
      .catch(err => console.error('❌ Department save failed:', err));
  };

  const updateDepartment = (id: string, department: Omit<Department, 'id'>) => {
    setDepartments(prev =>
      prev.map(dept => (dept.id === id ? { ...department, id } : dept))
    );

    axios
      .put(`http://localhost:5000/api/departments/${id}`, department)
      .then(() => console.log('✅ Department updated'))
      .catch(err => console.error('❌ Department update failed:', err));
  };

  const deleteDepartment = (id: string) => {
    setDepartments(prev => prev.filter(dept => dept.id !== id));
    // Optional: connect to DELETE API
  };

  // ---------- Faculty Methods (with MongoDB _id) ----------
  const addFaculty = (facultyMember: Omit<Faculty, '_id'>) => {
    axios
      .post('http://localhost:5000/api/faculty', facultyMember)
      .then(res => {
        const newFaculty = res.data; // MongoDB returns full doc with _id
        setFaculty(prev => [...prev, newFaculty]);
        console.log('✅ Faculty added');
      })
      .catch(err => console.error('❌ Faculty save failed:', err));
  };

  const updateFaculty = (id: string, facultyMember: Omit<Faculty, '_id'>) => {
    setFaculty(prev =>
      prev.map(member => (member._id === id ? { ...facultyMember, _id: id } : member))
    );

    axios
      .put(`http://localhost:5000/api/faculty/${id}`, facultyMember)
      .then(() => console.log('✅ Faculty updated'))
      .catch(err => console.error('❌ Faculty update failed:', err));
  };

  const deleteFaculty = (id: string) => {
    setFaculty(prev => prev.filter(member => member._id !== id));

    axios
      .delete(`http://localhost:5000/api/faculty/${id}`)
      .then(() => console.log('✅ Faculty deleted'))
      .catch(err => console.error('❌ Faculty delete failed:', err));
  };

  return (
    <DataContext.Provider
      value={{
        departments,
        faculty,
        addDepartment,
        updateDepartment,
        deleteDepartment,
        addFaculty,
        updateFaculty,
        deleteFaculty
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
