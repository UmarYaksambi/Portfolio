import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Github, Linkedin, Mail, Phone, MapPin, Code, Brain, Zap, Trophy, Users, BookOpen, ChevronRight, Terminal, Cpu, Database, Smartphone, Globe, Award, Calendar, ExternalLink, Laptop, LaptopMinimal, LaptopMinimalCheck, LaptopMinimalIcon, FileText, Instagram } from 'lucide-react';

const Portfolio = () => {
  const [currentPage, setCurrentPage] = useState<keyof typeof pages>('home');
  const [isLoaded, setIsLoaded] = useState(false);

  // New: Only trigger animation once on initial load
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    if (!hasAnimated) {
      setHasAnimated(true);
    }
    // Remove mousemove event listener logic
  }, [hasAnimated]);

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
      icon: <Database className="w-6 h-6" />,
      href: 'https://github.com/UmarYaksambi/Adaptive-Defense-Wireless-Networks' 
    },
    {
      title: 'Federated Learning Healthcare Chatbot',
      tech: ['Flwr', 'TensorFlow Federated', 'PyTorch', 'Llama 7B'],
      description: 'Privacy-preserving healthcare chatbot with federated learning and differential privacy for secure patient data handling.',
      icon: <Brain className="w-6 h-6" />,
      href: 'https://github.com/UmarYaksambi/Vital'
    },
    {
      title: 'Disaster Communication Framework',
      tech: ['Embedded C', 'ESP32', 'IoT'],
      description: 'ESP32-based mesh network for disaster-resilient communication without internet dependency, integrating 5 sensors for disaster prediction.',
      icon: <Zap className="w-6 h-6" />,
      href: 'https://github.com/UmarYaksambi/Disaster-Resilience-Using-ESP_NOW'
    },
    {
      title: 'Invisibility Cloak',
      tech: ['OpenCV', 'YOLO', 'Python'],
      description: 'Computer vision system creating invisibility illusion by capturing static background and overlaying on cloaked objects.',
      icon: <Code className="w-6 h-6" />,
      href: 'https://github.com/UmarYaksambi/The_Invisiblity_Cloak'
    }
  ];

  const experience = [
    {
      role: 'PRISM INTERN',
      company: 'Samsung R&D Institute',
      period: 'May 2025 – present',
      location: 'Bengaluru, KA',
      description: 'Working on advanced computer graphics techniques including Gaussian splatting for 3D scene rendering and enhancement.',
      icon: <LaptopMinimalIcon className="w-6 h-6" />
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
            {/* Resume Link - Lucide Icon */}
            <a
              href="/portfolio/Resume.pdf"
              download
              className="nav-link resume-btn flex items-center justify-center"
              style={{
                padding: '0.5rem',
                borderRadius: '4px',
                color: '#22c55e',
                marginLeft: '1rem',
                transition: 'background 0.2s',
              }}
              title="Download Resume"
              aria-label="Download Resume"
            >
              <FileText className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );

  const TerminalTyping = () => {
    // Each entry: { text: string, color: string }
    const lines = [
      { text: '$ whoami', color: 'text-green-400' },
      { text: 'Muhammad Umar Yaksambi', color: 'text-white' },
      { text: '$ cat skills.txt', color: 'text-green-400' },
      { text: '🧠 Machine Learning Enthusiast', color: 'text-blue-400' },
      { text: '🚗 Autonomous Vehicle Developer', color: 'text-purple-400' },
      { text: '📱 Full-Stack Engineer', color: 'text-yellow-400' },
      { text: '🔬 AI Research Intern', color: 'text-pink-400' },
      { text: '$ ls achievements/', color: 'text-green-400' },
      { text: 'CGPA_8.98.txt  Samsung_Intern.log  NPTEL_Gold.cert', color: 'text-gray-300' },
      { text: '$ echo $CURRENT_STATUS', color: 'text-green-400' },
      { text: 'Ready to innovate and collaborate! 🚀', color: 'text-green-400 animate-pulse' },
      { text: '$ _', color: 'text-green-400 mt-4' }
    ];

    const [displayedLines, setDisplayedLines] = useState<string[]>([]);
    const [currentLine, setCurrentLine] = useState(0);
    const [typed, setTyped] = useState('');
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
      if (currentLine >= lines.length) {
        setIsDone(true);
        return;
      }
      setTyped('');
      const line = lines[currentLine].text;
      let i = 0;
      const typeInterval = setInterval(() => {
        setTyped(line.slice(0, i + 1));
        i++;
        if (i === line.length) {
          clearInterval(typeInterval);
          setTimeout(() => {
            setDisplayedLines((prev) => [...prev, line]);
            setCurrentLine((prev) => prev + 1);
          }, 400);
        }
      }, 18);
      return () => clearInterval(typeInterval);
      // eslint-disable-next-line
    }, [currentLine]);

    return (
      <div className="space-y-2 text-sm min-h-[220px] font-mono">
        {displayedLines.map((line, idx) => (
          <div key={idx} className={lines[idx].color}>{line}</div>
        ))}
        {!isDone && (
          <div className={lines[currentLine]?.color}>
            {typed}
            <span className="animate-pulse">|</span>
          </div>
        )}
      </div>
    );
  };

  const HomePage = () => {
    // Add this state and effect for animation loop
    const [animateTechStack, setAnimateTechStack] = useState(true);

    useEffect(() => {
      const interval = setInterval(() => {
        setAnimateTechStack(false);
        setTimeout(() => setAnimateTechStack(true), 50); // brief reset to retrigger animation
      }, 5555);
      return () => clearInterval(interval);
    }, []);

    return (
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

        {/* Static, Edge-Biased Code Snippets */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {[
            // Top Edge
            { code: 'console.log("Hello World")', top: '4%', left: '10%' },
            { code: 'import tensorflow as tf', top: '2%', left: '80%' },
            { code: 'while(!awake) meditate();', top: '3%', left: '45%' },

            // Bottom Edge
            { code: 'echo "Code is poetry"', top: '92%', left: '65%' },
            { code: 'sudo launch singularity', top: '95%', left: '25%' },
            { code: 'scp reality.txt root@mars:', top: '94%', left: '85%' },

            // Left Edge
            { code: 'const ai = new Brain()', top: '30%', left: '2%' },
            { code: '#include <neural_net>', top: '55%', left: '1%' },
            { code: 'curl -X POST /api/create-universe', top: '75%', left: '3%' },

            // Right Edge
            { code: 'SELECT * FROM future', top: '12%', left: '92%' },
            { code: 'npm install innovation', top: '48%', left: '95%' },
            { code: 'function becomeLegend() {}', top: '72%', left: '93%' },

            // Center + Spread Around
            { code: 'brain.upload("vision.json")', top: '38%', left: '42%' },
            { code: 'def dream(): pass', top: '51%', left: '53%' },
            { code: 'let code = breathe();', top: '63%', left: '40%' },
            { code: '<AI selfAware={true} />', top: '22%', left: '60%' },
            { code: 'git push origin main', top: '34%', left: '75%' },
            { code: 'for i in range(42): think()', top: '68%', left: '55%' },
            { code: 'export GPT_LEVEL=∞', top: '81%', left: '48%' },
            { code: 'const purpose = find();', top: '58%', left: '30%' },
          ].map(({ code, top, left }, i) => (
            <div
              key={i}
              className="absolute text-green-400/20 font-mono text-sm whitespace-nowrap"
              style={{ top, left }}
            >
              {code}
            </div>
          ))}
        </div>

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
                {/* Terminal Content with typing effect */}
                <TerminalTyping />
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
                  <h1 className="text-5xl lg:text-7xl font-bold text-white mb-4 leading-none">
                    <div className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent mb-2 text-left">
                      UMAR
                    </div>
                    <div className="text-gray-300 text-3xl lg:text-4xl -mt-1 text-left mb-10">
                      &nbsp;YAKSAMBI
                    </div>
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
                      key={tech + (animateTechStack ? 'a' : 'b')} // force remount to retrigger animation
                      className={`px-3 py-1 bg-gray-800/50 border border-gray-600 rounded-full text-sm text-gray-300 hover:border-green-500/50 hover:text-green-400 transition-all duration-300
                        ${animateTechStack ? 'fadeInUp-anim' : ''}`}
                      style={
                        animateTechStack
                          ? {
                              animation: `fadeInUp 1s ease-out forwards`,
                              animationDelay: `${index * 0.3}s`,
                            }
                          : {}
                      }
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
                  href="https://github.com/UmarYaksambi" 
                  className="group p-3 bg-gray-800/50 hover:bg-blue-500/20 rounded-full transition-all duration-300 hover:scale-110 border border-gray-700 hover:border-blue-500/50"
                >
                  <Github className="w-5 h-5 text-gray-400 group-hover:text-blue-400" />
                </a>
                <a 
                  href="www.linkedin.com/in/umaryaksambi" 
                  className="group p-3 bg-gray-800/50 hover:bg-purple-500/20 rounded-full transition-all duration-300 hover:scale-110 border border-gray-700 hover:border-purple-500/50"
                >
                  <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-purple-400" />
                </a>
              </div>
            </div>
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
          .fadeInUp-anim {
            animation: fadeInUp 0.6s ease-out forwards;
          }
        `}</style>
      </div>
    );
  };

  const AboutPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pt-20 px-4">
      <div className="max-w-6xl mx-auto mt-4 pb-1">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4 font-mono">
            <span className="text-green-400">About</span> Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <div className="bg-gray-800/50 p-6 rounded-lg border border-green-500/30">
              <h3 className="text-2xl font-bold text-green-400 mb-4 font-mono">console.log("Hello, World!");</h3>
              <p className="text-gray-300 leading-relaxed text-pretty">
                I'm a Computer Science student at RV College of Engineering with a passion for ML and AI. 
                Currently maintaining a stellar 8.98 CGPA while diving deep into autonomous systems, 
                federated learning, and cutting-edge computer graphics.
              </p>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-lg border border-blue-500/30">
              <h3 className="text-2xl font-bold text-blue-400 mb-4 font-mono">Current Focus</h3>
              <p className="text-gray-300 leading-relaxed text-pretty">
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
                  <div className="text-left w-full">
                    <h4 className="text-white font-semibold">BE Computer Science & Engineering (Data Sciences)</h4>
                    <p className="text-gray-300">RV College Of Engineering, Bengaluru</p>
                    <p className="text-green-400 font-mono">CGPA: 8.98 | Expected Sep 2027</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Award className="w-5 h-5 text-yellow-400 mt-1" />
                  <div className="text-left w-full">
                    <h4 className="text-white font-semibold">Pre University</h4>
                    <p className="text-gray-300">Narayana PU College</p>
                    <p className="text-yellow-400 font-mono"> PCMC: 98.75% | 2021 – 2023</p>
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
      <div className="max-w-6xl mx-auto mt-4 pb-1">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4 font-mono">
            <span className="text-green-400">Projects</span> Portfolio
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg font-mono">Building the future, one commit at a time</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            // Make the entire card a link (replace '#' with your actual project URL if available)
            <a
              key={index}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105 block cursor-pointer"
              style={{ textDecoration: 'none' }}
            >
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
            </a>
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

        {/* Add space below Projects section */}
        <div className="mb-16"></div>
      </div>
    </div>
  );

  const ExperiencePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pt-20 px-4">
      <div className="max-w-6xl mx-auto mt-4 pb-1">
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
                        <h4 className="text-xl font-bold text-green-400 font-mono text-left">{exp.role}</h4>
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
                    <p className="text-gray-300 leading-relaxed text-left">{exp.description}</p>
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
            <div
              key={index}
              className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-yellow-400 mr-3" />
                <h4 className="text-lg font-bold text-white text-pretty">{cert.name}</h4>
              </div>
              <p className="text-gray-300 mb-2 text-center">{cert.org}</p>
              <p className="text-yellow-400 font-mono text-sm text-center">{cert.achievement}</p>
            </div>
          ))}
          </div>
        </div>

        {/* Societies */}
        <div>
          <h3 className="text-3xl font-bold text-white mb-12 text-center font-mono">Leadership & Societies</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Coding Club */}
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
              <div className="flex items-center mb-4 justify-between">
                <div className="flex items-center">
                  <Users className="w-8 h-8 text-purple-400 mr-3" />
                  <div>
                    <h4 className="text-lg font-bold text-purple-400 font-mono text-left">JR CORE MEMBER</h4>
                    <p className="text-white text-left">The Coding Club Of RVCE</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-300 text-sm ml-4">
                  <Calendar className="w-4 h-4 mr-1 text-purple-400" />
                  Feb 2025 – present
                </div>
              </div>
              <p className="text-gray-300 text-sm text-left">
                Organized coding events and workshops, mentored juniors in C++, Python, and ML. 
                Conducted workshops on APIs, LLMs, and competitive programming.
              </p>
            </div>
            {/* Rotaract Club */}
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-green-500/50 transition-all duration-300">
              <div className="flex items-center mb-4 justify-between">
                <div className="flex items-center">
                  <Trophy className="w-8 h-8 text-green-400 mr-3" />
                  <div>
                    <h4 className="text-lg font-bold text-green-400 font-mono text-left">CLUB REPRESENTATIVE</h4>
                    <p className="text-white text-left">Rotaract Club Of RVCE</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-300 text-sm ml-4">
                  <Calendar className="w-4 h-4 mr-1 text-green-400" />
                  Oct 2023 – present
                </div>
              </div>
              <p className="text-gray-300 text-sm text-left">
                Coordinated initiatives like Alzheimer's Awareness Walkathon and Fistful food distribution project.
              </p>
            </div>
            <div className="mb-8"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const ContactPage = React.memo(() => {
    // State for form fields and feedback
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
    const [error, setError] = useState<string | null>(null);
    const nameInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      // Autofocus on name input
      if (nameInputRef.current) {
        nameInputRef.current.focus();
      }
    }, []);

    // Formspree integration
    const handleSend = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);

      // Simple validation
      if (!name.trim() || !email.trim() || !message.trim()) {
        setError('Please fill in all fields.');
        return;
      }
      // Basic email validation
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
          body: JSON.stringify({
            name,
            email,
            message
          })
        });
        const data = await response.json();
        if (response.ok) {
          setStatus('sent');
          setName('');
          setEmail('');
          setMessage('');
        } else {
          setStatus('error');
          setError(data?.errors?.[0]?.message || 'Failed to send message. Please try again.');
        }
      } catch {
        setStatus('error');
        setError('Failed to send message. Please try again.');
      } finally {
        setTimeout(() => setStatus('idle'), 3000);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pt-20 px-4">
        <div className="max-w-6xl mx-auto mt-4 pb-16">
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
                      <p className="text-white font-semibold text-left">Email</p>
                      <p className="text-gray-300 font-mono">umaryaksambi@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-500/20 rounded-lg">
                      <Phone className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-left">Phone</p>
                      <p className="text-gray-300 font-mono">+91 9902578332</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-purple-500/20 rounded-lg">
                      <MapPin className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-left">Location</p>
                      <p className="text-gray-300 font-mono">Bengaluru, Karnataka, India</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg border border-blue-500/30">
                <h3 className="text-2xl font-bold text-blue-400 mb-6 font-mono">Connect Online</h3>
                <div className="flex space-x-4 justify-center">
                  <a href="https://github.com/UmarYaksambi/" className="flex items-center justify-center w-12 h-12 bg-gray-700 hover:bg-green-500/20 rounded-lg transition-all duration-300 hover:scale-110">
                    <Github className="w-6 h-6 text-white hover:text-green-400" />
                  </a>
                  <a href="https://www.linkedin.com/in/umaryaksambi" className="flex items-center justify-center w-12 h-12 bg-gray-700 hover:bg-blue-500/20 rounded-lg transition-all duration-300 hover:scale-110">
                    <Linkedin className="w-6 h-6 text-white hover:text-blue-400" />
                  </a>
                  <a href="mailto:umaryaksambi@gmail.com" className="flex items-center justify-center w-12 h-12 bg-gray-700 hover:bg-red-500/20 rounded-lg transition-all duration-300 hover:scale-110">
                    <Mail className="w-6 h-6 text-white hover:text-red-400" />
                  </a>
                  <a href="https://www.instagram.com/umaryaksambiii" className="flex items-center justify-center w-12 h-12 bg-gray-700 hover:bg-pink-500/20 rounded-lg transition-all duration-300 hover:scale-110">
                    <Instagram className="w-6 h-6 text-white hover:text-red-400" />
                  </a>
                </div>
              </div>
            </div>

            <form
              className="relative z-20 bg-gray-800/50 p-6 rounded-lg border border-yellow-500/30"
              onSubmit={handleSend}
              autoComplete="off"
            >
              <h3 className="text-2xl font-bold text-yellow-400 mb-6 font-mono">Quick Message</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-white font-semibold mb-2 font-mono" htmlFor="name">Name</label>
                  <input
                    ref={nameInputRef}
                    id="name"
                    type="text"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-green-400 focus:outline-none transition-colors font-mono"
                    placeholder="Your name here..."
                    value={name}
                    onChange={e => setName(e.target.value)}
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2 font-mono" htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-green-400 focus:outline-none transition-colors font-mono"
                    placeholder="your@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2 font-mono" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-green-400 focus:outline-none transition-colors font-mono"
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
                  className={`w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-lg font-mono font-semibold transition-all duration-300 transform hover:scale-105 ${
                    status === 'sending' ? 'opacity-60 cursor-not-allowed' : 'hover:from-green-400 hover:to-blue-400'
                  }`}
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
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
  });

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
            © 2025 Umar Yaksambi. Built with React, TypeScript & lots of ☕
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;