import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, X, Camera, Award, Code, Globe } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { useUser } from '../context/UserContext';

export const UserProfile: React.FC = () => {
  const { user, updateUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  const skills = [
    { name: 'React', level: 95, category: 'Frontend' },
    { name: 'TypeScript', level: 90, category: 'Frontend' },
    { name: 'Node.js', level: 88, category: 'Backend' },
    { name: 'PostgreSQL', level: 82, category: 'Database' },
    { name: 'MongoDB', level: 78, category: 'Database' },
    { name: 'Docker', level: 75, category: 'DevOps' },
    { name: 'AWS', level: 70, category: 'Cloud' },
    { name: 'GraphQL', level: 85, category: 'API' }
  ];

  const projects = [
    {
      name: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with React and Node.js',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      status: 'Completed',
      url: 'https://github.com/example/ecommerce'
    },
    {
      name: 'Task Management App',
      description: 'Collaborative task management tool with real-time updates',
      tech: ['React', 'Express', 'Socket.io', 'MongoDB'],
      status: 'In Progress',
      url: 'https://github.com/example/taskmanager'
    },
    {
      name: 'Analytics Dashboard',
      description: 'Business intelligence dashboard with interactive charts',
      tech: ['Vue.js', 'Python', 'FastAPI', 'Redis'],
      status: 'Completed',
      url: 'https://github.com/example/analytics'
    }
  ];

  const achievements = [
    { title: 'Full-Stack Certification', date: '2023', issuer: 'TechCorp Academy' },
    { title: 'AWS Solutions Architect', date: '2023', issuer: 'Amazon Web Services' },
    { title: 'React Advanced Concepts', date: '2022', issuer: 'Meta' },
    { title: 'Node.js Expert', date: '2022', issuer: 'Node.js Foundation' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            User Profile
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Manage your personal information and showcase your skills
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="p-6 lg:col-span-1">
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                  {formData.name.split(' ').map(n => n[0]).join('')}
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-lg border-2 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <Camera className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                </button>
              </div>
              
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="text-xl font-bold text-center bg-transparent border-b-2 border-blue-500 text-slate-900 dark:text-white focus:outline-none"
                />
              ) : (
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {formData.name}
                </h2>
              )}
              
              {isEditing ? (
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="text-slate-600 dark:text-slate-300 text-center bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 mt-2"
                />
              ) : (
                <p className="text-slate-600 dark:text-slate-300 mt-1">
                  {formData.title}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-slate-400" />
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="flex-1 bg-transparent border-b border-gray-300 dark:border-gray-600 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <span className="text-slate-900 dark:text-white">{formData.email}</span>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-slate-400" />
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="flex-1 bg-transparent border-b border-gray-300 dark:border-gray-600 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <span className="text-slate-900 dark:text-white">{formData.phone}</span>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-slate-400" />
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="flex-1 bg-transparent border-b border-gray-300 dark:border-gray-600 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <span className="text-slate-900 dark:text-white">{formData.location}</span>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-slate-400" />
                <span className="text-slate-900 dark:text-white">
                  Joined {new Date(formData.joinDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
              {isEditing ? (
                <div className="space-y-2">
                  <Button onClick={handleSave} className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button onClick={handleCancel} className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button onClick={() => setIsEditing(true)} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio Section */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                About Me
              </h3>
              {isEditing ? (
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {formData.bio}
                </p>
              )}
            </Card>

            {/* Skills Section */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Technical Skills
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        {skill.name}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {skill.category}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Projects Section */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Recent Projects
              </h3>
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div key={index} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-slate-900 dark:text-white">
                        {project.name}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === 'Completed' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {project.tech.map((tech) => (
                          <span 
                            key={tech}
                            className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <a 
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm flex items-center space-x-1"
                      >
                        <Globe className="w-4 h-4" />
                        <span>View</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Achievements Section */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Certifications & Achievements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900 dark:text-white">
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        {achievement.issuer} • {achievement.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};