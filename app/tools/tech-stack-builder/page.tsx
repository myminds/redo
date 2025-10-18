'use client';

import { useState } from 'react';

interface TechStack {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
}

interface ProjectType {
  id: string;
  name: string;
  description: string;
  recommendedStack: string[];
}

export default function TechStackBuilder() {
  const [selectedStack, setSelectedStack] = useState<string[]>([]);
  const [projectType, setProjectType] = useState<string>('');
  const [showRecommendations, setShowRecommendations] = useState(false);

  const techStack: TechStack[] = [
    // Frontend
    { id: 'react', name: 'React', category: 'Frontend', description: 'JavaScript library for building user interfaces', icon: '⚛️' },
    { id: 'nextjs', name: 'Next.js', category: 'Frontend', description: 'React framework for production', icon: '▲' },
    { id: 'vue', name: 'Vue.js', category: 'Frontend', description: 'Progressive JavaScript framework', icon: '💚' },
    { id: 'angular', name: 'Angular', category: 'Frontend', description: 'Platform for building mobile and desktop apps', icon: '🅰️' },
    { id: 'svelte', name: 'Svelte', category: 'Frontend', description: 'Component framework for building web apps', icon: '🧡' },
    { id: 'tailwind', name: 'Tailwind CSS', category: 'Frontend', description: 'Utility-first CSS framework', icon: '🎨' },
    { id: 'bootstrap', name: 'Bootstrap', category: 'Frontend', description: 'CSS framework for responsive design', icon: '📱' },
    
    // Backend
    { id: 'nodejs', name: 'Node.js', category: 'Backend', description: 'JavaScript runtime for server-side development', icon: '🟢' },
    { id: 'express', name: 'Express.js', category: 'Backend', description: 'Web framework for Node.js', icon: '🚀' },
    { id: 'python', name: 'Python', category: 'Backend', description: 'High-level programming language', icon: '🐍' },
    { id: 'django', name: 'Django', category: 'Backend', description: 'High-level Python web framework', icon: '🎯' },
    { id: 'flask', name: 'Flask', category: 'Backend', description: 'Lightweight Python web framework', icon: '🌶️' },
    { id: 'java', name: 'Java', category: 'Backend', description: 'Object-oriented programming language', icon: '☕' },
    { id: 'spring', name: 'Spring Boot', category: 'Backend', description: 'Java framework for microservices', icon: '🍃' },
    { id: 'php', name: 'PHP', category: 'Backend', description: 'Server-side scripting language', icon: '🐘' },
    { id: 'laravel', name: 'Laravel', category: 'Backend', description: 'PHP web application framework', icon: '🔴' },
    
    // Database
    { id: 'mysql', name: 'MySQL', category: 'Database', description: 'Relational database management system', icon: '🐬' },
    { id: 'postgresql', name: 'PostgreSQL', category: 'Database', description: 'Advanced open source database', icon: '🐘' },
    { id: 'mongodb', name: 'MongoDB', category: 'Database', description: 'NoSQL document database', icon: '🍃' },
    { id: 'redis', name: 'Redis', category: 'Database', description: 'In-memory data structure store', icon: '🔴' },
    { id: 'sqlite', name: 'SQLite', category: 'Database', description: 'Lightweight embedded database', icon: '🗃️' },
    
    // Cloud & DevOps
    { id: 'aws', name: 'AWS', category: 'Cloud', description: 'Amazon Web Services cloud platform', icon: '☁️' },
    { id: 'azure', name: 'Azure', category: 'Cloud', description: 'Microsoft cloud computing platform', icon: '🔵' },
    { id: 'gcp', name: 'Google Cloud', category: 'Cloud', description: 'Google Cloud Platform services', icon: '🌩️' },
    { id: 'docker', name: 'Docker', category: 'DevOps', description: 'Containerization platform', icon: '🐳' },
    { id: 'kubernetes', name: 'Kubernetes', category: 'DevOps', description: 'Container orchestration platform', icon: '⚓' },
    { id: 'jenkins', name: 'Jenkins', category: 'DevOps', description: 'Automation server for CI/CD', icon: '🔧' },
    { id: 'git', name: 'Git', category: 'DevOps', description: 'Version control system', icon: '📝' },
    { id: 'github', name: 'GitHub', category: 'DevOps', description: 'Code hosting and collaboration platform', icon: '🐙' },
  ];

  const projectTypes: ProjectType[] = [
    {
      id: 'web-app',
      name: 'Web Application',
      description: 'Full-stack web application with user authentication',
      recommendedStack: ['react', 'nextjs', 'nodejs', 'express', 'mongodb', 'tailwind']
    },
    {
      id: 'ecommerce',
      name: 'E-commerce Platform',
      description: 'Online store with payment integration',
      recommendedStack: ['nextjs', 'nodejs', 'postgresql', 'stripe', 'aws', 'docker']
    },
    {
      id: 'mobile-app',
      name: 'Mobile App',
      description: 'Cross-platform mobile application',
      recommendedStack: ['react', 'react-native', 'nodejs', 'mongodb', 'firebase']
    },
    {
      id: 'api',
      name: 'REST API',
      description: 'Backend API service',
      recommendedStack: ['nodejs', 'express', 'postgresql', 'redis', 'docker', 'aws']
    },
    {
      id: 'blog',
      name: 'Blog/CMS',
      description: 'Content management system',
      recommendedStack: ['nextjs', 'tailwind', 'mongodb', 'vercel', 'git']
    },
    {
      id: 'dashboard',
      name: 'Analytics Dashboard',
      description: 'Data visualization and analytics platform',
      recommendedStack: ['react', 'd3', 'python', 'postgresql', 'docker', 'kubernetes']
    }
  ];

  const toggleTech = (techId: string) => {
    setSelectedStack(prev => 
      prev.includes(techId) 
        ? prev.filter(id => id !== techId)
        : [...prev, techId]
    );
  };

  const getSelectedTech = () => {
    return techStack.filter(tech => selectedStack.includes(tech.id));
  };

  const getRecommendations = () => {
    const project = projectTypes.find(p => p.id === projectType);
    return project ? techStack.filter(tech => project.recommendedStack.includes(tech.id)) : [];
  };

  const getTechByCategory = (category: string) => {
    return techStack.filter(tech => tech.category === category);
  };

  const categories = ['Frontend', 'Backend', 'Database', 'Cloud', 'DevOps'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Tech Stack Builder
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Build your perfect tech stack for projects. Select technologies and get 
            recommendations based on your project type and requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Project Type Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Project Type
            </h2>
            
            <div className="space-y-4">
              {projectTypes.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setProjectType(project.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    projectType === project.id
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>

            {projectType && (
              <button
                onClick={() => setShowRecommendations(!showRecommendations)}
                className="w-full mt-4 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                {showRecommendations ? 'Hide' : 'Show'} Recommendations
              </button>
            )}
          </div>

          {/* Tech Stack Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Select Technologies
            </h2>
            
            <div className="space-y-6">
              {categories.map((category) => (
                <div key={category}>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">
                    {category}
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {getTechByCategory(category).map((tech) => (
                      <div
                        key={tech.id}
                        onClick={() => toggleTech(tech.id)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedStack.includes(tech.id)
                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{tech.icon}</span>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {tech.name}
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {tech.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Stack & Recommendations */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Your Tech Stack
            </h2>
            
            {/* Selected Technologies */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">
                Selected ({selectedStack.length})
              </h3>
              {selectedStack.length > 0 ? (
                <div className="space-y-2">
                  {getSelectedTech().map((tech) => (
                    <div key={tech.id} className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-lg">{tech.icon}</span>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{tech.name}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{tech.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  No technologies selected
                </p>
              )}
            </div>

            {/* Recommendations */}
            {showRecommendations && projectType && (
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">
                  Recommended for {projectTypes.find(p => p.id === projectType)?.name}
                </h3>
                <div className="space-y-2">
                  {getRecommendations().map((tech) => (
                    <div key={tech.id} className="flex items-center gap-3 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <span className="text-lg">{tech.icon}</span>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{tech.name}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{tech.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-6 space-y-3">
              <button
                onClick={() => setSelectedStack([])}
                className="w-full py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Clear Selection
              </button>
              <button
                onClick={() => {
                  const recommendations = getRecommendations();
                  setSelectedStack(recommendations.map(tech => tech.id));
                }}
                className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                disabled={!projectType}
              >
                Use Recommendations
              </button>
            </div>
          </div>
        </div>

        {/* Tech Stack Summary */}
        {selectedStack.length > 0 && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Tech Stack Summary
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => {
                const categoryTech = getSelectedTech().filter(tech => tech.category === category);
                if (categoryTech.length === 0) return null;
                
                return (
                  <div key={category} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                      {category}
                    </h3>
                    <div className="space-y-2">
                      {categoryTech.map((tech) => (
                        <div key={tech.id} className="flex items-center gap-2">
                          <span className="text-sm">{tech.icon}</span>
                          <span className="text-sm text-gray-700 dark:text-gray-300">{tech.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Information Section */}
        <div className="mt-8 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-indigo-900 dark:text-indigo-100 mb-4">
            About Tech Stack Builder
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-indigo-800 dark:text-indigo-200">
            <div>
              <h4 className="font-medium mb-2">Frontend Technologies</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>React: Component-based UI library</li>
                <li>Next.js: Full-stack React framework</li>
                <li>Vue.js: Progressive JavaScript framework</li>
                <li>Angular: Enterprise-grade framework</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Backend Technologies</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Node.js: JavaScript runtime</li>
                <li>Python: Versatile programming language</li>
                <li>Java: Enterprise application development</li>
                <li>PHP: Web development language</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Database Options</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>MySQL: Relational database</li>
                <li>PostgreSQL: Advanced open source DB</li>
                <li>MongoDB: NoSQL document database</li>
                <li>Redis: In-memory data store</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Cloud & DevOps</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>AWS: Amazon cloud services</li>
                <li>Docker: Containerization</li>
                <li>Kubernetes: Container orchestration</li>
                <li>Git: Version control system</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
