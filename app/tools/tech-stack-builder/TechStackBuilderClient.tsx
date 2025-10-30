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

function TechStackBuilderClient() {
  const [selectedStack, setSelectedStack] = useState<string[]>([]);
  const [projectType, setProjectType] = useState<string>('');
  const [showRecommendations, setShowRecommendations] = useState(false);

  const techStack: TechStack[] = [
    // Frontend
    { id: 'react', name: 'React', category: 'Frontend', description: 'JavaScript library for building user interfaces', icon: '⚛️' },
    { id: 'nextjs', name: 'Next.js', category: 'Frontend', description: 'React framework for production', icon: '▲' },
    { id: 'vue', name: 'Vue.js', category: 'Frontend', description: 'Progressive JavaScript framework', icon: '💚' },
    { id: 'angular', name: 'Angular', category: 'Frontend', description: 'Platform for building mobile and desktop apps', icon: '🅰️' },
    { id: 'svelte', name: 'Svelte', category: 'Frontend', description: 'Cybernetically enhanced web apps', icon: '🧡' },
    { id: 'html', name: 'HTML5', category: 'Frontend', description: 'Markup language for web pages', icon: '🌐' },
    { id: 'css', name: 'CSS3', description: 'Styling language for web pages', category: 'Frontend', icon: '🎨' },
    { id: 'javascript', name: 'JavaScript', category: 'Frontend', description: 'Programming language for web development', icon: '🟨' },
    { id: 'typescript', name: 'TypeScript', category: 'Frontend', description: 'Typed superset of JavaScript', icon: '🔷' },
    { id: 'tailwind', name: 'Tailwind CSS', category: 'Frontend', description: 'Utility-first CSS framework', icon: '🎯' },
    { id: 'bootstrap', name: 'Bootstrap', category: 'Frontend', description: 'CSS framework for responsive design', icon: '🎪' },
    { id: 'sass', name: 'Sass', category: 'Frontend', description: 'CSS preprocessor', icon: '💎' },

    // Backend
    { id: 'nodejs', name: 'Node.js', category: 'Backend', description: 'JavaScript runtime for server-side development', icon: '🟢' },
    { id: 'express', name: 'Express.js', category: 'Backend', description: 'Web framework for Node.js', icon: '🚀' },
    { id: 'python', name: 'Python', category: 'Backend', description: 'High-level programming language', icon: '🐍' },
    { id: 'django', name: 'Django', category: 'Backend', description: 'High-level Python web framework', icon: '🎸' },
    { id: 'flask', name: 'Flask', category: 'Backend', description: 'Lightweight Python web framework', icon: '🌶️' },
    { id: 'fastapi', name: 'FastAPI', category: 'Backend', description: 'Modern Python web framework', icon: '⚡' },
    { id: 'java', name: 'Java', category: 'Backend', description: 'Object-oriented programming language', icon: '☕' },
    { id: 'spring', name: 'Spring Boot', category: 'Backend', description: 'Java framework for microservices', icon: '🍃' },
    { id: 'csharp', name: 'C#', category: 'Backend', description: 'Microsoft programming language', icon: '🔷' },
    { id: 'dotnet', name: '.NET', category: 'Backend', description: 'Microsoft development platform', icon: '🟣' },
    { id: 'php', name: 'PHP', category: 'Backend', description: 'Server-side scripting language', icon: '🐘' },
    { id: 'laravel', name: 'Laravel', category: 'Backend', description: 'PHP web application framework', icon: '🔴' },
    { id: 'ruby', name: 'Ruby', category: 'Backend', description: 'Dynamic programming language', icon: '💎' },
    { id: 'rails', name: 'Ruby on Rails', category: 'Backend', description: 'Web application framework', icon: '🛤️' },
    { id: 'go', name: 'Go', category: 'Backend', description: 'Google programming language', icon: '🐹' },
    { id: 'rust', name: 'Rust', category: 'Backend', description: 'Systems programming language', icon: '🦀' },

    // Database
    { id: 'mysql', name: 'MySQL', category: 'Database', description: 'Relational database management system', icon: '🐬' },
    { id: 'postgresql', name: 'PostgreSQL', category: 'Database', description: 'Advanced open-source database', icon: '🐘' },
    { id: 'mongodb', name: 'MongoDB', category: 'Database', description: 'NoSQL document database', icon: '🍃' },
    { id: 'redis', name: 'Redis', category: 'Database', description: 'In-memory data structure store', icon: '🔴' },
    { id: 'sqlite', name: 'SQLite', category: 'Database', description: 'Lightweight database engine', icon: '🗃️' },
    { id: 'cassandra', name: 'Cassandra', category: 'Database', description: 'Distributed NoSQL database', icon: '🌊' },
    { id: 'elasticsearch', name: 'Elasticsearch', category: 'Database', description: 'Search and analytics engine', icon: '🔍' },

    // Cloud & DevOps
    { id: 'aws', name: 'AWS', category: 'Cloud', description: 'Amazon Web Services cloud platform', icon: '☁️' },
    { id: 'azure', name: 'Azure', category: 'Cloud', description: 'Microsoft cloud platform', icon: '🔵' },
    { id: 'gcp', name: 'Google Cloud', category: 'Cloud', description: 'Google Cloud Platform', icon: '🌩️' },
    { id: 'docker', name: 'Docker', category: 'DevOps', description: 'Containerization platform', icon: '🐳' },
    { id: 'kubernetes', name: 'Kubernetes', category: 'DevOps', description: 'Container orchestration', icon: '⚓' },
    { id: 'jenkins', name: 'Jenkins', category: 'DevOps', description: 'Automation server', icon: '👨‍💻' },
    { id: 'git', name: 'Git', category: 'DevOps', description: 'Version control system', icon: '📚' },
    { id: 'github', name: 'GitHub', category: 'DevOps', description: 'Code hosting platform', icon: '🐙' },
    { id: 'gitlab', name: 'GitLab', category: 'DevOps', description: 'DevOps platform', icon: '🦊' },

    // Mobile
    { id: 'reactnative', name: 'React Native', category: 'Mobile', description: 'Cross-platform mobile development', icon: '📱' },
    { id: 'flutter', name: 'Flutter', category: 'Mobile', description: 'Google mobile UI framework', icon: '🦋' },
    { id: 'swift', name: 'Swift', category: 'Mobile', description: 'Apple programming language', icon: '🍎' },
    { id: 'kotlin', name: 'Kotlin', category: 'Mobile', description: 'Android programming language', icon: '🟣' },
    { id: 'ionic', name: 'Ionic', category: 'Mobile', description: 'Cross-platform mobile framework', icon: '⚡' },
    { id: 'xamarin', name: 'Xamarin', category: 'Mobile', description: 'Microsoft mobile framework', icon: '🔷' }
  ];

  const projectTypes: ProjectType[] = [
    {
      id: 'webapp',
      name: 'Web Application',
      description: 'Full-stack web application with frontend and backend',
      recommendedStack: ['react', 'nextjs', 'nodejs', 'express', 'mongodb', 'aws']
    },
    {
      id: 'ecommerce',
      name: 'E-commerce Platform',
      description: 'Online shopping platform with payment integration',
      recommendedStack: ['nextjs', 'nodejs', 'postgresql', 'redis', 'stripe', 'aws']
    },
    {
      id: 'mobileapp',
      name: 'Mobile Application',
      description: 'Cross-platform mobile app',
      recommendedStack: ['reactnative', 'nodejs', 'mongodb', 'firebase', 'aws']
    },
    {
      id: 'api',
      name: 'REST API',
      description: 'Backend API service',
      recommendedStack: ['nodejs', 'express', 'postgresql', 'redis', 'docker', 'aws']
    },
    {
      id: 'microservices',
      name: 'Microservices',
      description: 'Distributed microservices architecture',
      recommendedStack: ['nodejs', 'docker', 'kubernetes', 'mongodb', 'redis', 'aws']
    },
    {
      id: 'dataanalytics',
      name: 'Data Analytics Platform',
      description: 'Data processing and analytics platform',
      recommendedStack: ['python', 'django', 'postgresql', 'elasticsearch', 'aws']
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

  const getTechByCategory = (category: string) => {
    return techStack.filter(tech => tech.category === category);
  };

  const getRecommendations = () => {
    const project = projectTypes.find(p => p.id === projectType);
    return project ? project.recommendedStack : [];
  };

  const applyRecommendations = () => {
    const recommendations = getRecommendations();
    setSelectedStack(recommendations);
    setShowRecommendations(false);
  };

  const clearSelection = () => {
    setSelectedStack([]);
  };

  const categories = ['Frontend', 'Backend', 'Database', 'Cloud', 'DevOps', 'Mobile'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Tech Stack Builder
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Build your perfect technology stack for any project. 
            Choose from modern technologies and get recommendations.
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
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    projectType === project.id
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-purple-300'
                  }`}
                  onClick={() => setProjectType(project.id)}
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>

            {projectType && (
              <div className="mt-6">
                <button
                  onClick={() => setShowRecommendations(!showRecommendations)}
                  className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  {showRecommendations ? 'Hide' : 'Show'} Recommendations
                </button>
                
                {showRecommendations && (
                  <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                      Recommended Stack:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {getRecommendations().map(techId => {
                        const tech = techStack.find(t => t.id === techId);
                        return tech ? (
                          <span
                            key={techId}
                            className="px-2 py-1 bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 rounded text-sm"
                          >
                            {tech.icon} {tech.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                    <button
                      onClick={applyRecommendations}
                      className="mt-3 w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                    >
                      Apply Recommendations
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Tech Stack Selection */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Technology Stack
              </h2>
              <button
                onClick={clearSelection}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
              >
                Clear All
              </button>
            </div>

            <div className="space-y-6">
              {categories.map((category) => (
                <div key={category}>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {category}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {getTechByCategory(category).map((tech) => (
                      <div
                        key={tech.id}
                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedStack.includes(tech.id)
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-purple-300'
                        }`}
                        onClick={() => toggleTech(tech.id)}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{tech.icon}</span>
                          <span className="font-medium text-gray-900 dark:text-white text-sm">
                            {tech.name}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {tech.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Stack Summary */}
        {selectedStack.length > 0 && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Your Selected Tech Stack
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getSelectedTech().map((tech) => (
                <div
                  key={tech.id}
                  className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-700"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{tech.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {tech.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {tech.category}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    {tech.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Stack Summary:
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                You have selected <strong>{selectedStack.length}</strong> technologies across{' '}
                <strong>{[...new Set(getSelectedTech().map(tech => tech.category))].length}</strong> categories.
              </p>
            </div>
          </div>
        )}

        {/* Information Section */}
        <div className="mt-8 bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-4">
            About Tech Stack Builder
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-purple-800 dark:text-purple-200">
            <div>
              <h4 className="font-medium mb-2">Categories</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Frontend: User interface technologies</li>
                <li>Backend: Server-side technologies</li>
                <li>Database: Data storage solutions</li>
                <li>Cloud: Cloud platforms and services</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Benefits</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Plan your project architecture</li>
                <li>Choose compatible technologies</li>
                <li>Get expert recommendations</li>
                <li>Understand technology stack</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Tips</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Consider project requirements</li>
                <li>Evaluate team expertise</li>
                <li>Check technology compatibility</li>
                <li>Plan for scalability</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Considerations</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Learning curve and documentation</li>
                <li>Community support and ecosystem</li>
                <li>Performance and scalability</li>
                <li>Cost and licensing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechStackBuilderClient;







