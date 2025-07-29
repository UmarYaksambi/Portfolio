import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Code, Brain, Zap, Database, Terminal, Cpu, Globe, Award, Calendar, FileText, Instagram, School, BookOpen, Trophy, Users, Laptop } from 'lucide-react';

// A custom hook for detecting scroll position
const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
    };
    window.addEventListener('scroll', updatePosition);
    updatePosition();
    return () => window.removeEventListener('scroll', updatePosition);
  }, []);

  return scrollPosition;
};

// Section Wrapper Component
const Section = ({ id, title, subtitle, children }: { id: string, title: string, subtitle: string, children: React.ReactNode }) => (
  <section id={id} className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">{title}</h2>
        <p className="text-lg text-gray-500">{subtitle}</p>
        <div className="w-20 h-1 bg-amber-400 mx-auto mt-4"></div>
      </div>
      {children}
    </div>
  </section>
);


const RefinedPortfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const scrollPosition = useScrollPosition();

  // Data for the portfolio sections
  const navLinks = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
  
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
      description: 'A computer vision system that creates an invisibility illusion by capturing a static background and overlaying it on cloaked objects.',
      icon: <Code className="w-6 h-6" />,
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
      icon: <Brain className="w-8 h-8" />
    },
    {
      role: 'PRISM INTERN',
      company: 'Samsung R&D Institute',
      period: 'May 2025 – present',
      location: 'Bengaluru, KA',
      description: 'Working on advanced computer graphics techniques including Gaussian splatting for 3D scene rendering and enhancement.',
      icon: <Laptop className="w-8 h-8" />
    },
    {
      role: 'PROJECT INTERN',
      company: 'Wirin (Wipro IISc Innovation Network)',
      period: 'Apr 2024 – Dec 2024',
      location: 'RVCE, Bengaluru, KA',
      description: 'Developed cross-platform app for WiPod autonomous car and contributed to AI-driven chatbot development using Llama3 60B.',
      icon: <Cpu className="w-8 h-8" />
    }
  ];
  
  const certifications = [
    { name: 'Data Science for Engineers', org: 'NPTEL', achievement: 'Gold certification - Top 5%ile' },
    { name: 'Machine Learning Specialization', org: 'Stanford University & DeepLearning.AI', achievement: 'Completed' },
    { name: 'CS50X', org: 'Harvard University', achievement: 'Completed' }
  ];

  // Scroll spy effect
  useEffect(() => {
    const sections = navLinks.map(id => document.getElementById(id));
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      for (const section of sections) {
        if (section && scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
          setActiveSection(section.id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMenuOpen(false);
  };

  // Contact form state and handler
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [formError, setFormError] = useState<string | null>(null);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setFormError('Please fill in all fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    setFormStatus('sending');
    try {
      const response = await fetch('https://formspree.io/f/xjkrrdro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formState)
      });
      if (response.ok) {
        setFormStatus('sent');
        setFormState({ name: '', email: '', message: '' });
      } else {
        throw new Error('Form submission failed');
      }
    } catch {
      setFormStatus('error');
      setFormError('Failed to send message. Please try again later.');
    } finally {
      setTimeout(() => setFormStatus('idle'), 4000);
    }
  };

  // Header visibility based on scroll
  const isHeaderVisible = scrollPosition > 100;

  return (
    <div className="bg-[#0a0a0a] text-gray-300 font-sans leading-relaxed selection:bg-amber-500/80 selection:text-white">
      
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isHeaderVisible ? 'bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-gray-800 shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="text-2xl font-bold font-serif tracking-wider text-white">
              <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>UY.</a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map(item => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item); }}
                  className={`capitalize text-sm font-medium transition-colors duration-300 ${activeSection === item ? 'text-amber-400' : 'text-gray-400 hover:text-white'}`}
                >
                  {item}
                </a>
              ))}
            </nav>
            
            <div className="hidden md:flex items-center space-x-4">
                <a
                    href="/Portfolio/Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 border border-amber-400 text-amber-400 rounded-md text-sm font-medium hover:bg-amber-400 hover:text-black transition-all duration-300"
                >
                    <FileText className="w-4 h-4" />
                    <span>Resume</span>
                </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white focus:outline-none">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#111] border-t border-gray-800">
            <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map(item => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item); }}
                  className={`block px-3 py-2 rounded-md text-base font-medium capitalize ${activeSection === item ? 'bg-gray-800 text-amber-400' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                >
                  {item}
                </a>
              ))}
              <a
                href="/Portfolio/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Resume
              </a>
            </nav>
          </div>
        )}
      </header>
      
      <main>
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center relative bg-grid-pattern">
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-[#0a0a0a] z-0"></div>
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-extrabold text-white mb-4">
              Umar Yaksambi
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto">
              A passionate Computer Science engineer specializing in Machine Learning and AI, dedicated to building intelligent systems that solve real-world problems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => scrollToSection('projects')} className="bg-amber-400 text-black px-8 py-3 rounded-md font-semibold hover:bg-amber-300 transition-all duration-300 transform hover:scale-105">
                Explore My Work
              </button>
              <button onClick={() => scrollToSection('contact')} className="bg-transparent border-2 border-gray-600 text-gray-300 px-8 py-3 rounded-md font-semibold hover:bg-gray-800 hover:border-gray-500 transition-all duration-300">
                Get In Touch
              </button>
            </div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
              <ChevronDown className="w-8 h-8 text-gray-600" />
            </div>
          </div>
        </section>

        {/* About Section */}
        <Section id="about" title="About Me" subtitle="A brief introduction to my journey">
          <div className="grid md:grid-cols-5 gap-10 lg:gap-16 items-center">
            <div className="md:col-span-3 space-y-6 text-gray-400 text-base md:text-lg leading-relaxed">
              <p>
                I am a Computer Science undergraduate at RV College of Engineering, deeply fascinated by the potential of Artificial Intelligence. With a strong academic record (9.12 CGPA), I am driven by a passion for developing innovative solutions in autonomous systems, federated learning, and computer graphics.
              </p>
              <p>
                My journey involves hands-on experience at places like Samsung R&D and SpikedAI, where I've contributed to cutting-edge projects. I thrive on challenges and am constantly seeking opportunities to apply my skills to create impactful technology.
              </p>
            </div>
            <div className="md:col-span-2 bg-[#111] p-6 rounded-lg border border-gray-800 space-y-4">
               <div className="flex items-start space-x-4">
                  <BookOpen className="w-6 h-6 text-amber-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold">B.E in Computer Science (Data Sciences)</h4>
                    <p className="text-gray-400 text-sm">RV College Of Engineering, Bengaluru</p>
                    <p className="text-amber-400 font-mono text-xs mt-1">CGPA: 9.12 | Expected Sep 2027</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <School className="w-6 h-6 text-amber-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold">Pre University</h4>
                    <p className="text-gray-400 text-sm">Narayana PU College</p>
                    <p className="text-amber-400 font-mono text-xs mt-1">PCMC: 98.75% | 2021 – 2023</p>
                  </div>
                </div>
            </div>
          </div>
        </Section>

        {/* Skills Section */}
        <Section id="skills" title="Technical Arsenal" subtitle="My proficiency in various technologies">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#111] p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center"><Code className="w-5 h-5 mr-3 text-amber-400"/>Languages</h3>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map(s => <span key={s} className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">{s}</span>)}
              </div>
            </div>
            <div className="bg-[#111] p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center"><Globe className="w-5 h-5 mr-3 text-amber-400"/>Frameworks & Libraries</h3>
              <div className="flex flex-wrap gap-2">
                {skills.frameworks.map(s => <span key={s} className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">{s}</span>)}
              </div>
            </div>
            <div className="bg-[#111] p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center"><Terminal className="w-5 h-5 mr-3 text-amber-400"/>Tools & Platforms</h3>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map(s => <span key={s} className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">{s}</span>)}
              </div>
            </div>
          </div>
        </Section>

        {/* Projects Section */}
        <Section id="projects" title="Featured Projects" subtitle="A selection of my key work">
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((p, i) => (
              <a href={p.href} key={i} target="_blank" rel="noopener noreferrer" className="group block bg-[#111] p-6 rounded-lg border border-gray-800 hover:border-amber-400/50 hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="text-amber-400 flex-shrink-0 mt-1">{p.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors duration-300 mb-2">{p.title}</h3>
                    <p className="text-gray-400 mb-3">{p.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {p.tech.map(t => <span key={t} className="bg-gray-800 text-gray-400 px-2 py-1 rounded text-xs font-mono">{t}</span>)}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 group-hover:text-white transition-colors duration-300">
                      View Project <ExternalLink className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </Section>
        
        {/* Experience Section */}
        <Section id="experience" title="Professional Journey" subtitle="My internships and leadership roles">
            <div className="space-y-12 relative before:absolute before:top-0 before:left-4 before:w-0.5 before:h-full before:bg-gray-800">
                {experience.map((exp, index) => (
                    <div key={index} className="relative pl-12">
                        <div className="absolute top-0 left-0 w-8 h-8 bg-gray-800 rounded-full border-4 border-[#0a0a0a] flex items-center justify-center">
                            <div className="w-4 h-4 text-amber-400">{exp.icon}</div>
                        </div>
                        <div className="bg-[#111] p-6 rounded-lg border border-gray-800">
                            <p className="text-amber-400 font-semibold text-sm mb-1">{exp.period}</p>
                            <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                            <p className="text-gray-400 font-medium mb-3">{exp.company} &bull; {exp.location}</p>
                            <p className="text-gray-500">{exp.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-16">
                 <h3 className="text-2xl font-serif font-bold text-white mb-8 text-center">Certifications & Leadership</h3>
                 <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-[#111] p-6 rounded-lg border border-gray-800">
                        <h4 className="text-lg font-semibold text-white mb-4 flex items-center"><Award className="w-5 h-5 mr-3 text-amber-400"/>Certifications</h4>
                        <ul className="space-y-3">
                            {certifications.map(c => (
                                <li key={c.name}>
                                    <p className="font-semibold text-gray-300">{c.name}</p>
                                    <p className="text-gray-500 text-sm">{c.org} <span className="text-amber-400/80 font-mono text-xs">({c.achievement})</span></p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-[#111] p-6 rounded-lg border border-gray-800">
                        <h4 className="text-lg font-semibold text-white mb-4 flex items-center"><Users className="w-5 h-5 mr-3 text-amber-400"/>Leadership</h4>
                        <ul className="space-y-3">
                             <li>
                                <p className="font-semibold text-gray-300">Jr. Core Member</p>
                                <p className="text-gray-500 text-sm">The Coding Club of RVCE</p>
                            </li>
                             <li>
                                <p className="font-semibold text-gray-300">Club Representative</p>
                                <p className="text-gray-500 text-sm">Rotaract Club of RVCE</p>
                            </li>
                        </ul>
                    </div>
                 </div>
            </div>
        </Section>

        {/* Contact Section */}
        <Section id="contact" title="Get In Touch" subtitle="Let's connect and build something great">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
                <p className="text-lg text-gray-400">
                    I'm currently available for freelance projects and open to discussing new opportunities. Whether you have a question or just want to say hi, feel free to reach out.
                </p>
                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <Mail className="w-5 h-5 text-amber-400" />
                        <a href="mailto:umaryaksambi@gmail.com" className="text-gray-300 hover:text-white transition-colors">umaryaksambi@gmail.com</a>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Phone className="w-5 h-5 text-amber-400" />
                        <span className="text-gray-300">+91 9902578332</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <MapPin className="w-5 h-5 text-amber-400" />
                        <span className="text-gray-300">Bengaluru, Karnataka, India</span>
                    </div>
                </div>
                <div className="flex space-x-4 pt-4">
                    <a href="https://github.com/UmarYaksambi" className="p-3 bg-gray-800 hover:bg-amber-400/10 rounded-full text-gray-400 hover:text-amber-400 transition-all"><Github /></a>
                    <a href="https://www.linkedin.com/in/umaryaksambi" className="p-3 bg-gray-800 hover:bg-amber-400/10 rounded-full text-gray-400 hover:text-amber-400 transition-all"><Linkedin /></a>
                    <a href="https://www.instagram.com/umaryaksambiii" className="p-3 bg-gray-800 hover:bg-amber-400/10 rounded-full text-gray-400 hover:text-amber-400 transition-all"><Instagram /></a>
                </div>
            </div>
            <form onSubmit={handleFormSubmit} className="bg-[#111] p-8 rounded-lg border border-gray-800 space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                    <input type="text" name="name" id="name" value={formState.name} onChange={handleFormChange} className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:border-amber-400 focus:ring-0 outline-none transition-colors" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                    <input type="email" name="email" id="email" value={formState.email} onChange={handleFormChange} className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:border-amber-400 focus:ring-0 outline-none transition-colors" />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                    <textarea name="message" id="message" rows={4} value={formState.message} onChange={handleFormChange} className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:border-amber-400 focus:ring-0 outline-none transition-colors"></textarea>
                </div>
                 {formError && <p className="text-red-400 text-sm">{formError}</p>}
                 {formStatus === 'sent' && <p className="text-green-400 text-sm">Message sent successfully! I'll be in touch soon.</p>}
                <button type="submit" disabled={formStatus === 'sending'} className="w-full bg-amber-400 text-black py-3 rounded-md font-semibold hover:bg-amber-300 transition-all duration-300 disabled:bg-gray-600">
                    {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
            </form>
          </div>
        </Section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] border-t border-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
            <p className="text-sm">&copy; {new Date().getFullYear()} Umar Yaksambi. All Rights Reserved.</p>
            <p className="text-xs mt-2">Built with React, Tailwind CSS, and a love for clean design.</p>
        </div>
      </footer>
    </div>
  );
};

export default RefinedPortfolio;

