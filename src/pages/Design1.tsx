import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, MapPin, Mail, Phone, ExternalLink, Github, Eye, Server, Code, Cloud, Coffee, Gamepad2, Music, Download, User, Briefcase, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ProcessingState from '@/components/ProcessingState';
import ErrorState from '@/components/ErrorState';

interface SkillCategory {
  name: string;
  icon: any;
  skills: string[];
}

interface UserData {
  name: string;
  title: string;
  summary: string;
  email?: string;
  phone?: string;
  location?: string;
  photo?: string;
  experience: Experience[];
  projects: Project[];
  skillCategories: SkillCategory[];
  softSkills: string[];
  education: Education[];
}

interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Project {
  name: string;
  description: string;
  technologies?: string[];
  link?: string;
  github?: string;
  demo?: string;
}

interface Education {
  institution: string;
  degree: string;
  year: string;
}

const Design1 = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [activeSection, setActiveSection] = useState('about');
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem(`portfolio-${id}`);
    if (storedData) {
      setUserData(JSON.parse(storedData));
    } else {
      // Demo data
      setUserData({
        name: "Alex Johnson",
        title: "Full Stack Developer",
        summary: "Passionate software developer with 5+ years of experience building scalable web applications. Expertise in React, Node.js, and cloud technologies.",
        email: "alex.johnson@email.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        experience: [
          {
            company: "TechCorp Inc.",
            role: "Senior Full Stack Developer",
            startDate: "2022",
            endDate: "Present",
            description: "Lead development of enterprise web applications serving 100k+ users. Implemented microservices architecture reducing system latency by 40%."
          },
          {
            company: "StartupXYZ",
            role: "Software Engineer",
            startDate: "2020",
            endDate: "2022",
            description: "Built scalable React applications and REST APIs. Collaborated with cross-functional teams to deliver high-quality software solutions."
          }
        ],
        projects: [
          {
            name: "E-commerce Platform",
            description: "Full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include payment processing, inventory management, and admin dashboard.",
            technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
            github: "https://github.com/alexjohnson/ecommerce",
            demo: "https://ecommerce-demo.vercel.app"
          },
          {
            name: "Task Management App",
            description: "Real-time collaborative task management application with drag-and-drop functionality and team collaboration features.",
            technologies: ["React", "Socket.io", "MongoDB"],
            github: "https://github.com/alexjohnson/taskapp",
            demo: "https://taskapp-demo.com"
          }
        ],
        skillCategories: [
          {
            name: "Frontend",
            icon: Code,
            skills: ["React", "Vue.js", "TypeScript", "JavaScript", "HTML/CSS", "Tailwind CSS"]
          },
          {
            name: "Backend",
            icon: Server,
            skills: ["Node.js", "Python", "Express.js", "REST APIs", "GraphQL"]
          },
          {
            name: "DevOps & Cloud",
            icon: Cloud,
            skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "MongoDB", "PostgreSQL"]
          }
        ],
        softSkills: ["Gaming", "Music Production", "Photography", "Cooking", "Traveling", "Reading"],
        education: [
          {
            institution: "University of California, Berkeley",
            degree: "Bachelor of Science in Computer Science",
            year: "2019"
          }
        ]
      });
    }
  }, [id]);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const photoUrl = e.target?.result as string;
        setUserData(prev => prev ? { ...prev, photo: photoUrl } : null);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!userData) {
    return <ProcessingState />;
  }

  const sidebarItems = [
    { id: 'about', label: 'About', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'skills', label: 'Skills', icon: Server },
    { id: 'education', label: 'Education', icon: GraduationCap },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="flex">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="fixed left-0 top-0 h-full w-80 glass-strong p-8 z-10"
        >
          {/* Profile Section */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-4">
              {userData.photo ? (
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={userData.photo}
                  alt={userData.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white/20"
                />
              ) : (
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center border-4 border-white/20">
                  <Camera className="w-8 h-8 text-white/60" />
                </div>
              )}
              <button
                onClick={() => setIsPhotoModalOpen(true)}
                className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors"
              >
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-white mb-2"
            >
              {userData.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white/80 mb-4"
            >
              {userData.title}
            </motion.p>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-white/70">
              {userData.email && (
                <div className="flex items-center gap-2 justify-center">
                  <Mail className="w-3 h-3" />
                  <span>{userData.email}</span>
                </div>
              )}
              {userData.phone && (
                <div className="flex items-center gap-2 justify-center">
                  <Phone className="w-3 h-3" />
                  <span>{userData.phone}</span>
                </div>
              )}
              {userData.location && (
                <div className="flex items-center gap-2 justify-center">
                  <MapPin className="w-3 h-3" />
                  <span>{userData.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {sidebarItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </motion.button>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8"
          >
            <Button className="w-full bg-white/20 hover:bg-white/30 text-white border-0">
              <Download className="w-4 h-4 mr-2" />
              Download CV
            </Button>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="ml-80 flex-1 p-8">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeSection === 'about' && (
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="glass rounded-2xl p-8 border-white/10">
                    <h2 className="text-3xl font-bold text-white mb-6">About Me</h2>
                    <p className="text-lg text-white/90 leading-relaxed">{userData.summary}</p>
                  </Card>
                </motion.div>

                {userData.softSkills.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Card className="glass rounded-2xl p-8 border-white/10">
                      <h3 className="text-2xl font-bold text-white mb-6">Interests & Hobbies</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {userData.softSkills.map((skill, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            className="flex items-center gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                          >
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                              {skill === "Gaming" && <Gamepad2 className="w-4 h-4 text-white" />}
                              {skill === "Music Production" && <Music className="w-4 h-4 text-white" />}
                              {skill === "Cooking" && <Coffee className="w-4 h-4 text-white" />}
                              {(skill !== "Gaming" && skill !== "Music Production" && skill !== "Cooking") && <Coffee className="w-4 h-4 text-white" />}
                            </div>
                            <span className="text-white/90 font-medium">{skill}</span>
                          </motion.div>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                )}
              </div>
            )}

            {activeSection === 'experience' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white mb-8">Experience</h2>
                {userData.experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="group"
                  >
                    <Card className="glass rounded-2xl p-6 border-white/10 hover:border-white/20 hover:scale-[1.02] transition-all duration-300">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">{exp.role}</h3>
                          <p className="text-lg text-white/80">{exp.company}</p>
                        </div>
                        <span className="text-white/60 text-sm">{exp.startDate} - {exp.endDate}</span>
                      </div>
                      <p className="text-white/90">{exp.description}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {activeSection === 'projects' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white mb-8">Projects</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {userData.projects.map((project, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="group"
                    >
                      <Card className="glass rounded-2xl p-6 border-white/10 hover:border-white/20 hover:scale-105 transition-all duration-300 h-full">
                        <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-primary transition-colors">{project.name}</h3>
                        <p className="text-white/90 mb-4">{project.description}</p>
                        
                        {project.technologies && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80 hover:bg-white/20 transition-colors"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex gap-3 mt-auto">
                          {project.demo && (
                            <Button
                              asChild
                              size="sm"
                              className="flex-1 bg-white/20 hover:bg-white/30 text-white border-0"
                            >
                              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                <Eye className="w-4 h-4 mr-2" />
                                Live Demo
                              </a>
                            </Button>
                          )}
                          {project.github && (
                            <Button
                              asChild
                              variant="outline"
                              size="sm"
                              className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                            >
                              <a href={project.github} target="_blank" rel="noopener noreferrer">
                                <Github className="w-4 h-4 mr-2" />
                                Code
                              </a>
                            </Button>
                          )}
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'skills' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-8">Technical Skills</h2>
                <div className="grid gap-6">
                  {userData.skillCategories.map((category, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <Card className="glass rounded-2xl p-6 border-white/10 hover:border-white/20 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                            <category.icon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-2xl font-semibold text-white">{category.name}</h3>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {category.skills.map((skill, skillIndex) => (
                            <motion.span
                              key={skillIndex}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 + skillIndex * 0.05 }}
                              className="px-4 py-2 bg-white/10 rounded-lg text-white/80 hover:bg-white/20 hover:scale-105 transition-all duration-200"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'education' && userData.education.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white mb-8">Education</h2>
                {userData.education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <Card className="glass rounded-2xl p-6 border-white/10 hover:border-white/20 hover:scale-[1.02] transition-all duration-300">
                      <h3 className="text-xl font-semibold text-white">{edu.degree}</h3>
                      <p className="text-lg text-white/80">{edu.institution}</p>
                      <p className="text-white/60">{edu.year}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Photo Upload Modal */}
      {isPhotoModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-strong rounded-2xl p-8 max-w-md w-full"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Update Profile Photo</h3>
            <div className="space-y-4">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="w-full p-3 bg-white/10 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white/20 file:text-white hover:file:bg-white/30"
              />
              <div className="flex gap-4">
                <Button
                  onClick={() => setIsPhotoModalOpen(false)}
                  variant="outline"
                  className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => setIsPhotoModalOpen(false)}
                  className="flex-1"
                >
                  Save
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Design1;