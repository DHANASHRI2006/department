export interface Department {
  id: string;
  name: string;
  code: string;
  head: string;
  description: string;
  establishedDate: string;
}

export interface Faculty {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  departmentId: string;
  designation: string;
  experience: number;
  qualification: string;
  specialization: string;
  status: 'Active' | 'Inactive';
}