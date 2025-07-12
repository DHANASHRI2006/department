import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import type { Department, Faculty } from '../types';

interface DataContextType {
  departments: Department[];
  faculty: Faculty[];
  addDepartment: (department: Omit<Department, 'id'>) => void;
  updateDepartment: (id: string, department: Omit<Department, 'id'>) => void;
  deleteDepartment: (id: string) => void;
  addFaculty: (faculty: Omit<Faculty, 'id'>) => void;
  updateFaculty: (id: string, faculty: Omit<Faculty, 'id'>) => void;
  deleteFaculty: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Sample data
const sampleDepartments: Department[] = [
  {
    id: '1',
    name: 'Computer Science',
    code: 'CS',
    head: 'Dr. John Smith',
    description:
      'Department of Computer Science and Engineering focusing on software development, algorithms, and artificial intelligence.',
    establishedDate: '1995-08-15'
  },
  {
    id: '2',
    name: 'Mathematics',
    code: 'MATH',
    head: 'Dr. Sarah Johnson',
    description:
      'Department of Mathematics offering pure and applied mathematics courses with research in various mathematical fields.',
    establishedDate: '1980-01-10'
  },
  {
    id: '3',
    name: 'Physics',
    code: 'PHY',
    head: 'Dr. Michael Brown',
    description:
      'Department of Physics conducting research in theoretical and experimental physics with state-of-the-art laboratories.',
    establishedDate: '1985-03-20'
  }
];

const sampleFaculty: Faculty[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@college.edu',
    phone: '+1-555-0101',
    departmentId: '1',
    designation: 'Professor',
    experience: 15,
    qualification: 'Ph.D. in Computer Science',
    specialization: 'Artificial Intelligence, Machine Learning',
    status: 'Active'
  },
  {
    id: '2',
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@college.edu',
    phone: '+1-555-0102',
    departmentId: '1',
    designation: 'Assistant Professor',
    experience: 8,
    qualification: 'Ph.D. in Software Engineering',
    specialization: 'Web Development, Database Systems',
    status: 'Active'
  },
  {
    id: '3',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@college.edu',
    phone: '+1-555-0103',
    departmentId: '2',
    designation: 'Professor',
    experience: 20,
    qualification: 'Ph.D. in Mathematics',
    specialization: 'Calculus, Linear Algebra, Statistics',
    status: 'Active'
  },
  {
    id: '4',
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael.brown@college.edu',
    phone: '+1-555-0104',
    departmentId: '3',
    designation: 'Professor',
    experience: 18,
    qualification: 'Ph.D. in Physics',
    specialization: 'Quantum Physics, Thermodynamics',
    status: 'Active'
  },
  {
    id: '5',
    firstName: 'Lisa',
    lastName: 'Wilson',
    email: 'lisa.wilson@college.edu',
    phone: '+1-555-0105',
    departmentId: '2',
    designation: 'Associate Professor',
    experience: 12,
    qualification: 'Ph.D. in Applied Mathematics',
    specialization: 'Numerical Analysis, Mathematical Modeling',
    status: 'Active'
  }
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [faculty, setFaculty] = useState<Faculty[]>([]);

  useEffect(() => {
    // Load from MongoDB
    axios
      .get('http://localhost:5000/api/departments')
      .then(res => {
        setDepartments(res.data);
      })
      .catch(err => {
        console.error('Failed to fetch departments from server:', err);
      });

    // Load faculty from localStorage or fallback
    const savedFaculty = localStorage.getItem('faculty');
    if (savedFaculty) {
      setFaculty(JSON.parse(savedFaculty));
    } else {
      setFaculty(sampleFaculty);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('departments', JSON.stringify(departments));
  }, [departments]);

  useEffect(() => {
    localStorage.setItem('faculty', JSON.stringify(faculty));
  }, [faculty]);

  const addDepartment = (department: Omit<Department, 'id'>) => {
    const newDepartment: Department = {
      ...department,
      id: Date.now().toString()
    };
    setDepartments(prev => [...prev, newDepartment]);

    axios
      .post('http://localhost:5000/api/departments', department)
      .then(() => console.log('✅ Department saved to MongoDB'))
      .catch(err => console.error('❌ MongoDB save failed:', err));
  };

  const updateDepartment = (id: string, department: Omit<Department, 'id'>) => {
    setDepartments(prev =>
      prev.map(dept => (dept.id === id ? { ...department, id } : dept))
    );

    axios
      .put(`http://localhost:5000/api/departments/${id}`, department)
      .then(() => console.log('✅ Department updated in MongoDB'))
      .catch(err => console.error('❌ MongoDB update failed:', err));
  };

  const deleteDepartment = (id: string) => {
    setDepartments(prev => prev.filter(dept => dept.id !== id));
  };

  const addFaculty = (facultyMember: Omit<Faculty, 'id'>) => {
    const newFaculty: Faculty = {
      ...facultyMember,
      id: Date.now().toString()
    };
    setFaculty(prev => [...prev, newFaculty]);
  };

  const updateFaculty = (id: string, facultyMember: Omit<Faculty, 'id'>) => {
    setFaculty(prev =>
      prev.map(member => (member.id === id ? { ...facultyMember, id } : member))
    );
  };

  const deleteFaculty = (id: string) => {
    setFaculty(prev => prev.filter(member => member.id !== id));
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
