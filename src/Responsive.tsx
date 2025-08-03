import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Joystick, Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Code, Brain, Zap, Database, Terminal, Cpu, Globe, Award, Calendar, FileText, Instagram, School, BookOpen, Trophy, Users, LaptopMinimalIcon } from 'lucide-react';

const ResponsiveMobilePortfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle scroll spy for navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

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
      icon: <Database className="w-5 h-5 md:w-6 md:h-6" />,
      href: 'https://github.com/UmarYaksambi/Adaptive-Defense-Wireless-Networks'
    },
    {
      title: 'Federated Learning Healthcare Chatbot',
      tech: ['Flwr', 'TensorFlow Federated', 'PyTorch', 'Llama 7B'],
      description: 'Privacy-preserving healthcare chatbot with federated learning and differential privacy for secure patient data handling.',
      icon: <Brain className="w-5 h-5 md:w-6 md:h-6" />,
      href: 'https://github.com/UmarYaksambi/Vital'
    },
    {
      title: 'Disaster Communication Framework',
      tech: ['Embedded C', 'ESP32', 'IoT'],
      description: 'ESP32-based mesh network for disaster-resilient communication without internet dependency, integrating 5 sensors for disaster prediction.',
      icon: <Zap className="w-5 h-5 md:w-6 md:h-6" />,
      href: 'https://github.com/UmarYaksambi/Disaster-Resilience-Using-ESP_NOW'
    },
    {
      title: 'Invisibility Cloak',
      tech: ['OpenCV', 'YOLO', 'Python'],
      description: 'Computer vision system creating invisibility illusion by capturing static background and overlaying on cloaked objects.',
      icon: <Code className="w-5 h-5 md:w-6 md:h-6" />,
      href: 'https://github.com/UmarYaksambi/The_Invisiblity_Cloak'
    }
  ];

  const experience = [
    {
      role: 'PRODUCT DEVELOPER INTERN',
      company: 'SpikedAI',
      period: 'June 2024 – present',
      location: 'Palo Alto, California (Remote)',
      description: "Built an AI-powered Sales Copilot designed to assist sales teams in real-time during client interactions, combining live Q&A and contextual insight generation.",
      icon: <Brain className="w-5 h-5 md:w-6 md:h-6" />
    },
    {
      role: 'PRISM INTERN',
      company: 'Samsung R&D Institute',
      period: 'May 2025 – present',
      location: 'Bengaluru, KA',
      description: 'Working on advanced computer graphics techniques including Gaussian splatting for 3D scene rendering and enhancement.',
      icon: <LaptopMinimalIcon className="w-5 h-5 md:w-6 md:h-6" />
    },
    {
      role: 'PROJECT INTERN',
      company: 'Wirin (Wipro IISc Innovation Network)',
      period: 'Apr 2024 – Dec 2024',
      location: 'RVCE, Bengaluru, KA',
      description: 'Developed cross-platform app for WiPod autonomous car and contributed to AI-driven chatbot development using Llama3 60B.',
      icon: <Cpu className="w-5 h-5 md:w-6 md:h-6" />
    }
  ];

  const certifications = [
    { name: 'Data Science for Engineers', org: 'NPTEL', achievement: 'Gold certification - Top 5%ile' },
    { name: 'Machine Learning Specialization', org: 'Stanford University & DeepLearning.AI', achievement: 'Completed' },
    { name: 'CS50X', org: 'Harvard University', achievement: 'Completed' }
  ];

  // Contact form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch('https://formspree.io/f/xjkrrdro', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
      });
      
      if (response.ok) {
        setStatus('sent');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
        setError('Failed to send message. Please try again.');
      }
    } catch {
      setStatus('error');
      setError('Failed to send message. Please try again.');
    } finally {
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Mobile Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-sm border-b border-green-500/30 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Terminal className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-mono text-sm sm:text-lg">umar@portfolio:~$</span>
            </div>
            
            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden md:flex space-x-6">
              {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`text-sm font-mono transition-all duration-300 hover:text-green-400 capitalize ${
                    activeSection === item ? 'text-green-400 border-b border-green-400' : 'text-gray-300'
                  }`}
                >
                  {item}
                </button>
              ))}
              <a
                href="/Portfolio/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-green-400 hover:bg-green-400/20 rounded transition-colors"
                title="View Resume"
              >
                <FileText className="w-5 h-5" />
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-green-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-black/95 border-t border-green-500/30">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`block w-full text-left px-3 py-2 capitalize font-mono hover:bg-green-500/20 rounded ${
                      activeSection === item ? 'text-green-400 font-semibold' : 'text-gray-300'
                    }`}
                  >
                    {item}
                  </button>
                ))}
                <a
                  href="/Portfolio/Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-3 py-2 text-green-400 hover:bg-green-500/20 rounded font-mono"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Resume
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-blue-500/10"></div>
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px',
            }}
          ></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-6">
          <div className="mb-6">
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent text-base md:text-lg font-mono">
              Hello, I'm
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
            <div className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
              UMAR
            </div>
            <div className="text-gray-300 text-2xl sm:text-3xl md:text-4xl -mt-1">
              YAKSAMBI
            </div>
          </h1>
          <div className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6">
            Crafting the future with
            <br />
            <span className="text-green-400 font-semibold">Machine Learning</span> & 
            <span className="text-blue-400 font-semibold"> AI Innovation</span>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {['Python', 'TensorFlow', 'React', 'C++', 'Flutter'].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-gray-800/50 border border-gray-600 rounded-full text-sm text-gray-300 hover:border-green-500/50 hover:text-green-400 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto mb-8">
            <div className="bg-green-500/10 backdrop-blur-sm border border-green-500/30 rounded-lg p-3 hover:bg-green-500/20 transition-all duration-300">
              <div className="text-xl md:text-2xl font-bold text-green-400">9.12</div>
              <div className="text-gray-300 text-xs md:text-sm">CGPA</div>
            </div>
            <div className="bg-blue-500/10 backdrop-blur-sm border border-blue-500/30 rounded-lg p-3 hover:bg-blue-500/20 transition-all duration-300">
              <div className="text-xl md:text-2xl font-bold text-blue-400">15+</div>
              <div className="text-gray-300 text-xs md:text-sm">Projects</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={() => scrollToSection('projects')}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full font-semibold hover:from-green-400 hover:to-emerald-500 transition-all duration-300 text-sm md:text-base"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-transparent border-2 border-green-500 text-green-400 px-6 py-3 rounded-full font-semibold hover:bg-green-500 hover:text-white transition-all duration-300 text-sm md:text-base"
            >
              Let's Connect
            </button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-4 mb-8">
            <a href="mailto:umaryaksambi@gmail.com" className="p-3 bg-gray-800/50 hover:bg-green-500/20 rounded-full transition-all duration-300 border border-gray-700 hover:border-green-500/50">
              <Mail className="w-5 h-5 text-gray-400 hover:text-green-400" />
            </a>
            <a href="https://github.com/UmarYaksambi" className="p-3 bg-gray-800/50 hover:bg-blue-500/20 rounded-full transition-all duration-300 border border-gray-700 hover:border-blue-500/50">
              <Github className="w-5 h-5 text-gray-400 hover:text-blue-400" />
            </a>
            <a href="https://www.linkedin.com/in/umaryaksambi" className="p-3 bg-gray-800/50 hover:bg-purple-500/20 rounded-full transition-all duration-300 border border-gray-700 hover:border-purple-500/50">
              <Linkedin className="w-5 h-5 text-gray-400 hover:text-purple-400" />
            </a>
          </div>

          <div className="animate-bounce">
            <ChevronDown className="w-6 h-6 mx-auto text-gray-400" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="pt-16 min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-35">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-blue-500/10"></div>
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px',
            }}
          ></div>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-mono">
              <span className="text-green-400">About</span> Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-6">
              <div className="bg-gray-800/50 p-6 rounded-lg border border-green-500/30">
                <h3 className="text-xl md:text-2xl font-bold text-green-400 mb-4 font-mono">console.log("Hello, World!");</h3>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                  I'm a Computer Science student at RV College of Engineering with a passion for ML and AI. 
                  Currently maintaining a stellar 9.12 CGPA while diving deep into autonomous systems, 
                  federated learning, and cutting-edge computer graphics.
                </p>
              </div>
              
              <div className="bg-gray-800/50 p-6 rounded-lg border border-blue-500/30">
                <h3 className="text-xl md:text-2xl font-bold text-blue-400 mb-4 font-mono">Current Focus</h3>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                  Working on Gaussian splatting at Samsung R&D, building disaster-resilient communication systems, 
                  and exploring the intersection of AI and real-world applications. Always excited about the next 
                  breakthrough in technology!
                </p>
              </div>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-lg border border-purple-500/30">
              <h3 className="text-xl md:text-2xl font-bold text-purple-400 mb-6 font-mono">Education</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold text-sm md:text-base">BE Computer Science & Engineering (Data Sciences)</h4>
                    <p className="text-gray-300 text-sm">RV College Of Engineering, Bengaluru</p>
                    <p className="text-green-400 font-mono text-sm">CGPA: 9.12 | Expected Sep 2027</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Award className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold text-sm md:text-base">Pre University</h4>
                    <p className="text-gray-300 text-sm">Narayana PU College</p>
                    <p className="text-yellow-400 font-mono text-sm">PCMC: 98.75% | 2021 – 2023</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <School className="w-4 h-4 md:w-5 md:h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold text-sm md:text-base">School</h4>
                    <p className="text-gray-300 text-sm">St Paul's High School</p>
                    <p className="text-blue-400 font-mono text-sm">Grade: 88.45% | 2010 – 2021</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gray-800/50 p-6 rounded-lg border border-yellow-500/30 mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-yellow-400 mb-6 font-mono text-center">Quick Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-green-400">15+</div>
                <div className="text-gray-300 text-sm">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-400">3</div>
                <div className="text-gray-300 text-sm">Internships</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-purple-400">3</div>
                <div className="text-gray-300 text-sm">Certifications</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-yellow-400">Top 5%</div>
                <div className="text-gray-300 text-sm">NPTEL Rank</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="pt-16 min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-blue-500/10"></div>
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px',
            }}
          ></div>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-mono">
              <span className="text-green-400">Technical</span> Arsenal
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800/50 p-6 rounded-lg border border-green-500/30">
              <h4 className="text-lg md:text-xl font-bold text-green-400 mb-4 font-mono flex items-center">
                <Code className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Languages
              </h4>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map((skill) => (
                  <span key={skill} className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs md:text-sm font-mono">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-lg border border-blue-500/30">
              <h4 className="text-lg md:text-xl font-bold text-blue-400 mb-4 font-mono flex items-center">
                <Globe className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Frameworks
              </h4>
              <div className="flex flex-wrap gap-2">
                {skills.frameworks.map((skill) => (
                  <span key={skill} className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs md:text-sm font-mono">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-lg border border-purple-500/30">
              <h4 className="text-lg md:text-xl font-bold text-purple-400 mb-4 font-mono flex items-center">
                <Terminal className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Tools
              </h4>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((skill) => (
                  <span key={skill} className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full text-xs md:text-sm font-mono">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="pt-16 min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-blue-500/10"></div>
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px',
            }}
          ></div>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-mono">
              <span className="text-green-400">Projects</span> Portfolio
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-300 text-sm md:text-lg font-mono">Building the future, one commit at a time</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <a
                key={index}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105 block"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="p-3 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-all duration-300 flex-shrink-0">
                    {project.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.tech.map((tech) => (
                        <span key={tech} className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-4">
                  {project.description}
                </p>
                <div className="flex items-center text-green-400 font-mono text-sm group-hover:text-green-300 transition-colors">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Details
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="pt-16 min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-blue-500/10"></div>
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px',
            }}
          ></div>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-mono">
              <span className="text-green-400">Professional</span> Journey
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto"></div>
          </div>

          {/* Experience Timeline */}
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center font-mono">Experience</h3>
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <div key={index} className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-green-500/50 transition-all duration-300">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      {exp.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg md:text-xl font-bold text-green-400 font-mono">{exp.role}</h4>
                      <h5 className="text-base md:text-lg text-white font-semibold">{exp.company}</h5>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-2">
                        <div className="flex items-center text-blue-400 font-mono text-sm mb-1 sm:mb-0">
                          <Calendar className="w-4 h-4 mr-2" />
                          {exp.period}
                        </div>
                        <div className="flex items-center text-gray-400 font-mono text-sm">
                          <MapPin className="w-4 h-4 mr-2" />
                          {exp.location}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center font-mono">Certifications</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-yellow-500/50 transition-all duration-300"
                >
                  <div className="flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 mr-3" />
                    <h4 className="text-base md:text-lg font-bold text-white text-center">{cert.name}</h4>
                  </div>
                  <p className="text-gray-300 mb-2 text-center text-sm md:text-base">{cert.org}</p>
                  <p className="text-yellow-400 font-mono text-sm text-center">{cert.achievement}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership & Societies */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center font-mono">Leadership & Societies</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                <div className="flex items-start space-x-4 mb-4">
                  <Users className="w-6 h-6 md:w-8 md:h-8 text-purple-400 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="text-base md:text-lg font-bold text-purple-400 font-mono">JR CORE MEMBER</h4>
                    <p className="text-white text-sm md:text-base">The Coding Club Of RVCE</p>
                    <div className="flex items-center text-gray-300 text-sm mt-1">
                      <Calendar className="w-4 h-4 mr-1 text-purple-400" />
                      Feb 2025 – present
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">
                  Organized coding events and workshops, mentored juniors in C++, Python, and ML. 
                  Conducted workshops on APIs, LLMs, and competitive programming.
                </p>
              </div>
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-green-500/50 transition-all duration-300">
                <div className="flex items-start space-x-4 mb-4">
                  <Trophy className="w-6 h-6 md:w-8 md:h-8 text-green-400 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="text-base md:text-lg font-bold text-green-400 font-mono">CLUB REPRESENTATIVE</h4>
                    <p className="text-white text-sm md:text-base">Rotaract Club Of RVCE</p>
                    <div className="flex items-center text-gray-300 text-sm mt-1">
                      <Calendar className="w-4 h-4 mr-1 text-green-400" />
                      Oct 2023 – present
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">
                  Coordinated initiatives like Alzheimer's Awareness Walkathon and Fistful food distribution project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="pt-16 min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-blue-500/10"></div>
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px',
            }}
          ></div>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-mono">
              <span className="text-green-400">Get</span> In Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-300 text-sm md:text-lg font-mono">Let's build something amazing together!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gray-800/50 p-6 rounded-lg border border-green-500/30">
                <h3 className="text-xl md:text-2xl font-bold text-green-400 mb-6 font-mono">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-green-500/20 rounded-lg flex-shrink-0">
                      <Mail className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm md:text-base">Email</p>
                      <p className="text-gray-300 font-mono text-xs md:text-sm">umaryaksambi@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-500/20 rounded-lg flex-shrink-0">
                      <Phone className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm md:text-base">Phone</p>
                      <p className="text-gray-300 font-mono text-xs md:text-sm">+91 9902578332</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-purple-500/20 rounded-lg flex-shrink-0">
                      <MapPin className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm md:text-base">Location</p>
                      <p className="text-gray-300 font-mono text-xs md:text-sm">Bengaluru, Karnataka, India</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg border border-blue-500/30">
                <h3 className="text-xl md:text-2xl font-bold text-blue-400 mb-6 font-mono">Connect Online</h3>
                <div className="flex space-x-4 justify-center">
                  <a href="https://github.com/UmarYaksambi/" className="flex items-center justify-center w-12 h-12 bg-gray-700 hover:bg-green-500/20 rounded-lg transition-all duration-300 hover:scale-110">
                    <Github className="w-5 h-5 md:w-6 md:h-6 text-white hover:text-green-400" />
                  </a>
                  <a href="https://www.linkedin.com/in/umaryaksambi" className="flex items-center justify-center w-12 h-12 bg-gray-700 hover:bg-blue-500/20 rounded-lg transition-all duration-300 hover:scale-110">
                    <Linkedin className="w-5 h-5 md:w-6 md:h-6 text-white hover:text-blue-400" />
                  </a>
                  <a href="mailto:umaryaksambi@gmail.com" className="flex items-center justify-center w-12 h-12 bg-gray-700 hover:bg-red-500/20 rounded-lg transition-all duration-300 hover:scale-110">
                    <Mail className="w-5 h-5 md:w-6 md:h-6 text-white hover:text-red-400" />
                  </a>
                  <a href="https://www.instagram.com/umaryaksambiii" className="flex items-center justify-center w-12 h-12 bg-gray-700 hover:bg-pink-500/20 rounded-lg transition-all duration-300 hover:scale-110">
                    <Instagram className="w-5 h-5 md:w-6 md:h-6 text-white hover:text-pink-400" />
                  </a>
                </div>
              </div>
            </div>

            <form
              className="bg-gray-800/50 p-6 rounded-lg border border-yellow-500/30"
              onSubmit={handleSend}
            >
              <h3 className="text-xl md:text-2xl font-bold text-yellow-400 mb-6 font-mono">Quick Message</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-white font-semibold mb-2 font-mono text-sm md:text-base" htmlFor="name">Name</label>
                  <input
                    id="name"
                    type="text"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-green-400 focus:outline-none transition-colors font-mono text-sm md:text-base"
                    placeholder="Your name here..."
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2 font-mono text-sm md:text-base" htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-green-400 focus:outline-none transition-colors font-mono text-sm md:text-base"
                    placeholder="your@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2 font-mono text-sm md:text-base" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-green-400 focus:outline-none transition-colors font-mono text-sm md:text-base"
                    placeholder="Let's collaborate on something amazing..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                  />
                </div>
                {error && (
                  <div className="text-red-400 font-mono text-sm">{error}</div>
                )}
                {status === 'sent' && (
                  <div className="text-green-400 font-mono text-sm">Message sent! I'll get back to you soon.</div>
                )}
                <button
                  type="submit"
                  className={`w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-lg font-mono font-semibold transition-all duration-300 text-sm md:text-base ${
                    status === 'sending' ? 'opacity-60 cursor-not-allowed' : 'hover:from-green-400 hover:to-blue-400 hover:scale-105'
                  }`}
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>

          <div className="mt-12 text-center pb-6">
            <div className="bg-gray-800/50 p-6 md:p-8 rounded-lg border border-green-500/30">
              <h3 className="text-xl md:text-2xl font-bold text-green-400 mb-4 font-mono">Always Ready for New Opportunities</h3>
              <p className="text-gray-300 text-sm md:text-lg mb-6">
                Whether it's cutting-edge ML research, autonomous systems development, or innovative software solutions,
                I'm excited to contribute to projects that push the boundaries of technology.
              </p>
              <div className="flex justify-center items-center space-x-4 text-gray-400 font-mono text-sm">
                <span>Status:</span>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400">Available for collaboration</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-green-500/30 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-2 mb-4 text-center">
  <Joystick className="w-4 h-4 md:w-5 md:h-5 text-pink-400" />
  <span className="text-pink-400 font-mono text-sm md:text-base px-4">
    You scrolled this far? <br /> We should hang out.
  </span>
</div>

          <p className="text-gray-400 font-mono text-xs md:text-sm">
            © 2025 Umar Yaksambi. Built with React, TypeScript & lots of ☕
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ResponsiveMobilePortfolio;