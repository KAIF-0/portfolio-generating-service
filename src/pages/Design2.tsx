import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, MapPin, Mail, Phone, ExternalLink, Github, Eye, Server, Code, Cloud, Coffee, Gamepad2, Music, Calendar, ArrowRight, Star, Award } from 'lucide-react';
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

const Design2 = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState<UserData | null>(null);
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

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        
        {/* Hero Section with Diagonal Split */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative overflow-hidden rounded-3xl glass-strong p-12 mb-16"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="relative inline-block mb-6">
                {userData.photo ? (
                  <motion.img
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    src={userData.photo}
                    alt={userData.name}
                    className="w-40 h-40 rounded-2xl object-cover border-4 border-white/20 shadow-2xl"
                  />
                ) : (
                  <div className="w-40 h-40 bg-white/10 rounded-2xl flex items-center justify-center border-4 border-white/20">
                    <Camera className="w-16 h-16 text-white/60" />
                  </div>
                )}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsPhotoModalOpen(true)}
                  className="absolute -bottom-2 -right-2 w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors shadow-lg"
                >
                  <Camera className="w-6 h-6 text-white" />
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-5xl font-bold text-white mb-4 leading-tight"
              >
                {userData.name}
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-2xl text-white/80 mb-6"
              >
                {userData.title}
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="space-y-3 mb-8"
              >
                {userData.email && (
                  <div className="flex items-center gap-3 text-white/70">
                    <Mail className="w-5 h-5" />
                    <span>{userData.email}</span>
                  </div>
                )}
                {userData.phone && (
                  <div className="flex items-center gap-3 text-white/70">
                    <Phone className="w-5 h-5" />
                    <span>{userData.phone}</span>
                  </div>
                )}
                {userData.location && (
                  <div className="flex items-center gap-3 text-white/70">
                    <MapPin className="w-5 h-5" />
                    <span>{userData.location}</span>
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <Button className="bg-white/20 hover:bg-white/30 text-white border-0 px-8 py-3">
                  Let's Connect
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-16"
        >
          <Card className="glass rounded-3xl p-8 border-white/10 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            <h2 className="text-3xl font-bold text-white mb-6 relative z-10">About Me</h2>
            <p className="text-lg text-white/90 leading-relaxed relative z-10">{userData.summary}</p>
          </Card>
        </motion.div>

        {/* Timeline Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Career Journey</h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary/50 to-white/20 rounded-full"></div>
            
            {userData.experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.2, duration: 0.8 }}
                className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <Card className="glass rounded-2xl p-6 border-white/10 hover:border-white/20 hover:scale-105 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span className="text-white/60 text-sm">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{exp.role}</h3>
                    <p className="text-lg text-white/80 mb-3">{exp.company}</p>
                    <p className="text-white/90">{exp.description}</p>
                  </Card>
                </div>
                
                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-white/20 z-10"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Projects Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Featured Projects</h2>
          <div className="space-y-8">
            {userData.projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.2, duration: 0.8 }}
                className="group"
              >
                <Card className="glass rounded-3xl p-8 border-white/10 hover:border-white/20 hover:scale-[1.02] transition-all duration-500 overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-full -translate-y-12 translate-x-12"></div>
                  
                  <div className="grid md:grid-cols-3 gap-8 items-center relative z-10">
                    <div className="md:col-span-2">
                      <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-white/90 mb-6 leading-relaxed">{project.description}</p>
                      
                      {project.technologies && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.technologies.map((tech, techIndex) => (
                            <motion.span
                              key={techIndex}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.7 + techIndex * 0.05 }}
                              className="px-4 py-2 bg-white/10 rounded-full text-sm text-white/80 hover:bg-white/20 transition-colors"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col gap-3">
                      {project.demo && (
                        <Button
                          asChild
                          className="w-full bg-white/20 hover:bg-white/30 text-white border-0"
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
                          className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                        >
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            Source Code
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Matrix */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Technical Expertise</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {userData.skillCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, rotateY: -15 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ delay: 0.6 + index * 0.2, duration: 0.8 }}
                className="group"
              >
                <Card className="glass rounded-2xl p-6 border-white/10 hover:border-white/20 hover:scale-105 transition-all duration-300 h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="w-14 h-14 bg-gradient-to-br from-primary/30 to-white/20 rounded-xl flex items-center justify-center"
                    >
                      <category.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                  </div>
                  
                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + skillIndex * 0.1 }}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <Star className="w-4 h-4 text-primary" />
                        <span className="text-white/90">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Interests Section */}
        {userData.softSkills.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Beyond Code</h2>
            <Card className="glass rounded-3xl p-8 border-white/10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {userData.softSkills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                    className="flex flex-col items-center gap-3 p-4 bg-white/10 rounded-2xl hover:bg-white/20 hover:scale-110 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/30 to-white/20 rounded-full flex items-center justify-center group-hover:from-primary/50 transition-colors">
                      {skill === "Gaming" && <Gamepad2 className="w-6 h-6 text-white" />}
                      {skill === "Music Production" && <Music className="w-6 h-6 text-white" />}
                      {skill === "Cooking" && <Coffee className="w-6 h-6 text-white" />}
                      {(skill !== "Gaming" && skill !== "Music Production" && skill !== "Cooking") && <Coffee className="w-6 h-6 text-white" />}
                    </div>
                    <span className="text-white/90 font-medium text-center text-sm">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Education Section */}
        {userData.education.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Education</h2>
            <div className="space-y-6">
              {userData.education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.2, duration: 0.8 }}
                >
                  <Card className="glass rounded-2xl p-6 border-white/10 hover:border-white/20 hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/30 to-white/20 rounded-xl flex items-center justify-center">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{edu.degree}</h3>
                        <p className="text-lg text-white/80">{edu.institution}</p>
                        <p className="text-white/60">{edu.year}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Photo Upload Modal */}
      {isPhotoModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
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

export default Design2;