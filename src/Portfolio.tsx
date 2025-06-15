import React, { useState, useEffect } from 'react';
import { ChevronDown, Github, Linkedin, Mail, Phone, MapPin, Code, Brain, Zap, Trophy, Users, BookOpen, ChevronRight, Terminal, Cpu, Database, Smartphone, Globe, Award, Calendar, ExternalLink } from 'lucide-react';

const Portfolio = () => {
  const [currentPage, setCurrentPage] = useState<keyof typeof pages>('home');
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const skills = {
    languages: ['Python', 'C++', 'Embedded C', 'SQL', 'JavaScript', 'R', 'TypeScript'],
    frameworks: ['TensorFlow', 'PyTorch', 'LangChain', 'OpenCV', 'YOLO', 'FastAPI', 'Flask', 'Flutter', 'React'],
    tools: ['Git', 'GitHub', 'Supabase', 'Firebase', 'Android Studio', 'Linux', 'Figma', 'Docker']
  };

  const projects = [
    {
      title: 'Adoptive Defenses for Wireless IOT Networks',
      tech: ['Python', 'Game Theory', 'Q-Learning'],
      description: 'Dynamic defense strategies for IoT networks using game-theoretic models and Q-learning to counter jamming attacks, achieving 7% performance improvement.',
      icon: <Database className="w-6 h-6" />
    },
    {
      title: 'Federated Learning Healthcare Chatbot',
      tech: ['Flwr', 'TensorFlow Federated', 'PyTorch', 'Llama 7B'],
      description: 'Privacy-preserving healthcare chatbot with federated learning and differential privacy for secure patient data handling.',
      icon: <Brain className="w-6 h-6" />
    },
    {
      title: 'Disaster Communication Framework',
      tech: ['Embedded C', 'ESP32', 'IoT'],
      description: 'ESP32-based mesh network for disaster-resilient communication without internet dependency, integrating 5 sensors for disaster prediction.',
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: 'Invisibility Cloak',
      tech: ['OpenCV', 'YOLO', 'Python'],
      description: 'Computer vision system creating invisibility illusion by capturing static background and overlaying on cloaked objects.',
      icon: <Code className="w-6 h-6" />
    }
  ];

  const experience = [
    {
      role: 'PRISM INTERN',
      company: 'Samsung R&D Institute',
      period: 'May 2025 – present',
      location: 'Bengaluru, KA',
      description: 'Working on advanced computer graphics techniques including Gaussian splatting for 3D scene rendering and enhancement.',
      icon: <Smartphone className="w-6 h-6" />
    },
    {
      role: 'PROJECT INTERN',
      company: 'Wirin (Wipro IISc Innovation Network)',
      period: 'Apr 2024 – Dec 2024',
      location: 'RVCE, Bengaluru, KA',
      description: 'Developed cross-platform app for WiPod autonomous car and contributed to AI-driven chatbot development using Llama3 60B.',
      icon: <Cpu className="w-6 h-6" />
    }
  ];

  const certifications = [
    { name: 'Data Science for Engineers', org: 'NPTEL', achievement: 'Gold certification - Top 5%ile' },
    { name: 'Machine Learning Specialization', org: 'Stanford University & DeepLearning.AI', achievement: 'Completed' },
    { name: 'CS50X', org: 'Harvard University', achievement: 'Completed' }
  ];

  const NavBar = () => (
    <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-sm border-b border-green-500/30 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Terminal className="w-6 h-6 text-green-400" />
            <span className="text-green-400 font-mono text-lg">umar@portfolio:~$</span>
          </div>
          <div className="flex space-x-8">
            {(Object.keys(pages) as Array<keyof typeof pages>).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`text-sm font-mono transition-all duration-300 hover:text-green-400 ${
                  currentPage === page ? 'text-green-400 border-b border-green-400' : 'text-gray-300'
                }`}
              >
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-blue-500/10"></div>
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite'
          }}
        ></div>
      </div>

      {/* Floating Code Snippets */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          'console.log("Hello World")',
          'import tensorflow as tf',
          'const ai = new Brain()',
          'SELECT * FROM future',
          'git push origin main',
          'npm install innovation'
        ].map((code, i) => (
          <div
            key={i}
            className="absolute text-green-400/30 font-mono text-sm animate-pulse"
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${10 + (i * 12)}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i}s`
            }}
          >
            {code}
          </div>
        ))}
      </div>

      {/* Holographic Mouse Follower */}
      <div
        className="fixed w-32 h-32 pointer-events-none z-10 transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 64,
          top: mousePosition.y - 64,
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, transparent 70%)',
          borderRadius: '50%'
        }}
      />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Interactive Terminal */}
          <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="bg-gray-900/90 backdrop-blur-sm rounded-lg border border-green-500/30 p-6 font-mono">
              {/* Terminal Header */}
              <div className="flex items-center space-x-2 mb-4 pb-3 border-b border-gray-700">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-400 text-sm ml-4">umar@portfolio:~$</span>
              </div>
              
              {/* Terminal Content */}
              <div className="space-y-2 text-sm">
                <div className="text-green-400">$ whoami</div>
                <div className="text-white">Muhammad Umar Yaksambi</div>
                <div className="text-green-400">$ cat skills.txt</div>
                <div className="text-blue-400">🧠 Machine Learning Enthusiast</div>
                <div className="text-purple-400">🚗 Autonomous Vehicle Developer</div>
                <div className="text-yellow-400">📱 Full-Stack Engineer</div>
                <div className="text-pink-400">🔬 AI Research Intern</div>
                <div className="text-green-400">$ ls achievements/</div>
                <div className="text-gray-300">CGPA_8.98.txt  Samsung_Intern.log  NPTEL_Gold.cert</div>
                <div className="text-green-400">$ echo $CURRENT_STATUS</div>
                <div className="text-green-400 animate-pulse">Ready to innovate and collaborate! 🚀</div>
                <div className="text-green-400 mt-4">$ _</div>
              </div>
            </div>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-green-500/10 backdrop-blur-sm border border-green-500/30 rounded-lg p-4 hover:bg-green-500/20 transition-all duration-300">
                <div className="text-2xl font-bold text-green-400">8.98</div>
                <div className="text-gray-300 text-sm">CGPA</div>
              </div>
              <div className="bg-blue-500/10 backdrop-blur-sm border border-blue-500/30 rounded-lg p-4 hover:bg-blue-500/20 transition-all duration-300">
                <div className="text-2xl font-bold text-blue-400">15+</div>
                <div className="text-gray-300 text-sm">Projects</div>
              </div>
            </div>
          </div>

          {/* Right Side - Hero Content */}
          <div className={`text-center lg:text-left transform transition-all duration-1000 delay-300 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="mb-8">
              <div className="inline-block mb-4">
                <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent text-lg font-mono">
                  Hello, I'm
                </span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                  UMAR
                </span>
                <br />
                <span className="text-gray-300 text-3xl lg:text-4xl">YAKSAMBI</span>
              </h1>
              
              <div className="text-xl text-gray-300 mb-6">
                Crafting the future with
                <br />
                <span className="text-green-400 font-semibold">Machine Learning</span> & 
                <span className="text-blue-400 font-semibold"> AI Innovation</span>
              </div>

              {/* Animated Tech Stack */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-8">
                {['Python', 'TensorFlow', 'React', 'C++', 'Flutter'].map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-800/50 border border-gray-600 rounded-full text-sm text-gray-300 hover:border-green-500/50 hover:text-green-400 transition-all duration-300"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animation: 'fadeInUp 0.6s ease-out forwards'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <button
                onClick={() => setCurrentPage('projects')}
                className="group bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:from-green-400 hover:to-emerald-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/25"
              >
                View My Work
                <ChevronRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => setCurrentPage('contact')}
                className="bg-transparent border-2 border-green-500 text-green-400 px-8 py-3 rounded-full font-semibold hover:bg-green-500 hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                Let's Connect
              </button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start space-x-4">
              <a 
                href="mailto:umaryaksambi@gmail.com" 
                className="group p-3 bg-gray-800/50 hover:bg-green-500/20 rounded-full transition-all duration-300 hover:scale-110 border border-gray-700 hover:border-green-500/50"
              >
                <Mail className="w-5 h-5 text-gray-400 group-hover:text-green-400" />
              </a>
              <a 
                href="#" 
                className="group p-3 bg-gray-800/50 hover:bg-blue-500/20 rounded-full transition-all duration-300 hover:scale-110 border border-gray-700 hover:border-blue-500/50"
              >
                <Github className="w-5 h-5 text-gray-400 group-hover:text-blue-400" />
              </a>
              <a 
                href="#" 
                className="group p-3 bg-gray-800/50 hover:bg-purple-500/20 rounded-full transition-all duration-300 hover:scale-110 border border-gray-700 hover:border-purple-500/50"
              >
                <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-purple-400" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center animate-bounce">
          <span className="text-gray-400 text-sm mb-2 font-mono">scroll down</span>
          <ChevronDown className="w-6 h-6 text-green-400" />
        </div>
      </div>

      {/* Add CSS animation for grid movement */}
      <style>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );

  const AboutPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4 font-mono">
            <span className="text-green-400">About</span> Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <div className="bg-gray-800/50 p-6 rounded-lg border border-green-500/30">
              <h3 className="text-2xl font-bold text-green-400 mb-4 font-mono">System.out.println("Hello World!");</h3>
              <p className="text-gray-300 leading-relaxed">
                I'm a Computer Science student at RV College of Engineering with a passion for ML and AI. 
                Currently maintaining a stellar 8.98 CGPA while diving deep into autonomous systems, 
                federated learning, and cutting-edge computer graphics.
              </p>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-lg border border-blue-500/30">
              <h3 className="text-2xl font-bold text-blue-400 mb-4 font-mono">Current Focus</h3>
              <p className="text-gray-300 leading-relaxed">
                Working on Gaussian splatting at Samsung R&D, building disaster-resilient communication systems, 
                and exploring the intersection of AI and real-world applications. Always excited about the next 
                breakthrough in technology!
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-800/50 p-6 rounded-lg border border-purple-500/30">
              <h3 className="text-2xl font-bold text-purple-400 mb-6 font-mono">Education</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <BookOpen className="w-5 h-5 text-green-400 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold">BE Computer Science & Engineering (Data Sciences)</h4>
                    <p className="text-gray-300">RV College Of Engineering, Bengaluru</p>
                    <p className="text-green-400 font-mono">CGPA: 8.98 | Expected Sep 2027</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Award className="w-5 h-5 text-yellow-400 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold">Pre University</h4>
                    <p className="text-gray-300">Narayana PU College PCMC</p>
                    <p className="text-yellow-400 font-mono">98.75% | 2021 – 2023</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-lg border border-yellow-500/30">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4 font-mono">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">15+</div>
                  <div className="text-gray-300 text-sm">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">2</div>
                  <div className="text-gray-300 text-sm">Internships</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">3</div>
                  <div className="text-gray-300 text-sm">Certifications</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">Top 5%</div>
                  <div className="text-gray-300 text-sm">NPTEL Rank</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white mb-8 text-center font-mono">
            <span className="text-green-400">Technical</span> Arsenal
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 p-6 rounded-lg border border-green-500/30">
              <h4 className="text-xl font-bold text-green-400 mb-4 font-mono flex items-center">
                <Code className="w-5 h-5 mr-2" />
                Languages
              </h4>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map((skill, index) => (
                  <span key={index} className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-mono">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-lg border border-blue-500/30">
              <h4 className="text-xl font-bold text-blue-400 mb-4 font-mono flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Frameworks
              </h4>
              <div className="flex flex-wrap gap-2">
                {skills.frameworks.map((skill, index) => (
                  <span key={index} className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-mono">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-lg border border-purple-500/30">
              <h4 className="text-xl font-bold text-purple-400 mb-4 font-mono flex items-center">
                <Terminal className="w-5 h-5 mr-2" />
                Tools
              </h4>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((skill, index) => (
                  <span key={index} className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm font-mono">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ProjectsPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4 font-mono">
            <span className="text-green-400">Projects</span> Portfolio
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg font-mono">Building the future, one commit at a time</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-start space-x-4 mb-4">
                <div className="p-3 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-all duration-300">
                  {project.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-sm font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {project.description}
              </p>
              <div className="mt-4 flex items-center text-green-400 font-mono text-sm group-hover:text-green-300 transition-colors">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Details
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gray-800/50 p-8 rounded-lg border border-green-500/30">
            <h3 className="text-2xl font-bold text-green-400 mb-4 font-mono">More Projects Coming Soon...</h3>
            <p className="text-gray-300 mb-6">
              Currently working on exciting new projects involving computer graphics, federated learning, and autonomous systems.
              Stay tuned for updates!
            </p>
            <div className="flex justify-center space-x-4">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ExperiencePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4 font-mono">
            <span className="text-green-400">Professional</span> Journey
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto"></div>
        </div>

        {/* Experience Timeline */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white mb-12 text-center font-mono">Experience</h3>
          <div className="space-y-12">
            {experience.map((exp, index) => (
              <div key={index} className="relative">
                <div className="flex items-start space-x-8">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                      {exp.icon}
                    </div>
                  </div>
                  <div className="flex-1 bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-green-500/50 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-green-400 font-mono">{exp.role}</h4>
                        <h5 className="text-lg text-white font-semibold">{exp.company}</h5>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-blue-400 font-mono text-sm mb-1">
                          <Calendar className="w-4 h-4 mr-2" />
                          {exp.period}
                        </div>
                        <div className="flex items-center text-gray-400 font-mono text-sm">
                          <MapPin className="w-4 h-4 mr-2" />
                          {exp.location}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white mb-12 text-center font-mono">Certifications</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="flex items-center mb-4">
                  <Award className="w-8 h-8 text-yellow-400 mr-3" />
                  <h4 className="text-lg font-bold text-white">{cert.name}</h4>
                </div>
                <p className="text-gray-300 mb-2">{cert.org}</p>
                <p className="text-yellow-400 font-mono text-sm">{cert.achievement}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Societies */}
        <div>
          <h3 className="text-3xl font-bold text-white mb-12 text-center font-mono">Leadership & Societies</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
              <div className="flex items-center mb-4">
                <Users className="w-8 h-8 text-purple-400 mr-3" />
                <div>
                  <h4 className="text-lg font-bold text-purple-400 font-mono">JR CORE MEMBER</h4>
                  <p className="text-white">The Coding Club Of RVCE</p>
                </div>
              </div>
              <p className="text-gray-300 mb-2">Feb 2025 – present</p>
              <p className="text-gray-300 text-sm">
                Organized coding events and workshops, mentored juniors in C++, Python, and ML. 
                Conducted workshops on APIs, LLMs, and competitive programming.
              </p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-green-500/50 transition-all duration-300">
              <div className="flex items-center mb-4">
                <Trophy className="w-8 h-8 text-green-400 mr-3" />
                <div>
                  <h4 className="text-lg font-bold text-green-400 font-mono">CLUB REPRESENTATIVE</h4>
                  <p className="text-white">Rotaract Club Of RVCE</p>
                </div>
              </div>
              <p className="text-gray-300 mb-2">Oct 2023 – present</p>
              <p className="text-gray-300 text-sm">
                Coordinated initiatives like Alzheimer's Awareness Walkathon and Fistful food distribution project.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4 font-mono">
            <span className="text-green-400">Get</span> In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg font-mono">Let's build something amazing together!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-gray-800/50 p-6 rounded-lg border border-green-500/30">
              <h3 className="text-2xl font-bold text-green-400 mb-6 font-mono">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-500/20 rounded-lg">
                    <Mail className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Email</p>
                    <p className="text-gray-300 font-mono">umaryaksambi@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-500/20 rounded-lg">
                    <Phone className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Phone</p>
                    <p className="text-gray-300 font-mono">+91 9902578332</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-purple-500/20 rounded-lg">
                    <MapPin className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Location</p>
                    <p className="text-gray-300 font-mono">Bengaluru, Karnataka, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-lg border border-blue-500/30">
              <h3 className="text-2xl font-bold text-blue-400 mb-6 font-mono">Connect Online</h3>
              <div className="flex space-x-4">
                <a href="#" className="flex items-center justify-center w-12 h-12 bg-gray-700 hover:bg-green-500/20 rounded-lg transition-all duration-300 hover:scale-110">
                  <Github className="w-6 h-6 text-white hover:text-green-400" />
                </a>
                <a href="#" className="flex items-center justify-center w-12 h-12 bg-gray-700 hover:bg-blue-500/20 rounded-lg transition-all duration-300 hover:scale-110">
                  <Linkedin className="w-6 h-6 text-white hover:text-blue-400" />
                </a>
                <a href="mailto:umaryaksambi@gmail.com" className="flex items-center justify-center w-12 h-12 bg-gray-700 hover:bg-red-500/20 rounded-lg transition-all duration-300 hover:scale-110">
                  <Mail className="w-6 h-6 text-white hover:text-red-400" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-lg border border-yellow-500/30">
            <h3 className="text-2xl font-bold text-yellow-400 mb-6 font-mono">Quick Message</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-white font-semibold mb-2 font-mono">Name</label>
                <input
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-green-400 focus:outline-none transition-colors font-mono"
                  placeholder="Your name here..."
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2 font-mono">Email</label>
                <input
                  type="email"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-green-400 focus:outline-none transition-colors font-mono"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2 font-mono">Message</label>
                <textarea
                  rows={4}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-green-400 focus:outline-none transition-colors font-mono"
                  placeholder="Let's collaborate on something amazing..."
                />
              </div>
              <button className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-lg font-mono font-semibold hover:from-green-400 hover:to-blue-400 transition-all duration-300 transform hover:scale-105">
                Send Message
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gray-800/50 p-8 rounded-lg border border-green-500/30">
            <h3 className="text-2xl font-bold text-green-400 mb-4 font-mono">Always Ready for New Opportunities</h3>
            <p className="text-gray-300 text-lg mb-6">
              Whether it's cutting-edge ML research, autonomous systems development, or innovative software solutions,
              I'm excited to contribute to projects that push the boundaries of technology.
            </p>
            <div className="flex justify-center items-center space-x-4 text-gray-400 font-mono">
              <span>Status:</span>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400">Available for collaboration</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const pages = {
    home: HomePage,
    about: AboutPage,
    projects: ProjectsPage,
    experience: ExperiencePage,
    contact: ContactPage
  };

  const CurrentPage = pages[currentPage];

  return (
    <div className="bg-black min-h-screen font-sans">
      <NavBar />
      <CurrentPage />
      
      {/* Footer */}
      <footer className="bg-black border-t border-green-500/30 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Terminal className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-mono">umar@portfolio:~$ echo "Thanks for visiting!"</span>
          </div>
          <p className="text-gray-400 font-mono text-sm">
            © 2025 Muhammad Umar Yaksambi. Built with React, TypeScript & lots of ☕
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;