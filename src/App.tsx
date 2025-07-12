import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { DepartmentList } from './components/departments/DepartmentList';
import { FacultyList } from './components/faculty/FacultyList';
import { Dashboard } from './components/Dashboard';
import { DataProvider } from './context/DataContext';
import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <DataProvider>
      <ToastProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            <main className="pt-16">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/departments" element={<DepartmentList />} />
                <Route path="/faculty" element={<FacultyList />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ToastProvider>
    </DataProvider>
  );
}

export default App;