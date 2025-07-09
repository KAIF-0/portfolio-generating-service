import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle, Zap, Star } from 'lucide-react';
import { ResumeUpload } from '@/components/ResumeUpload';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    setIsProcessing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate a unique ID for the portfolio
    const portfolioId = `${file.name.replace('.pdf', '').toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
    
    // Store mock extracted data
    const mockData = {
      name: "Alex Johnson",
      title: "Full Stack Developer", 
      summary: "Passionate software developer with 5+ years of experience building scalable web applications.",
      email: "alex.johnson@email.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      experience: [
        {
          company: "TechCorp Inc.",
          role: "Senior Full Stack Developer",
          startDate: "2022",
          endDate: "Present",
          description: "Lead development of enterprise web applications serving 100k+ users."
        }
      ],
      projects: [
        {
          name: "E-commerce Platform",
          description: "Full-stack e-commerce solution with React, Node.js, and PostgreSQL.",
          technologies: ["React", "Node.js", "PostgreSQL"]
        }
      ],
      skills: ["JavaScript", "React", "Node.js", "Python", "PostgreSQL", "AWS"],
      education: [
        {
          institution: "University of California, Berkeley",
          degree: "Bachelor of Science in Computer Science", 
          year: "2019"
        }
      ]
    };
    
    localStorage.setItem(`portfolio-${portfolioId}`, JSON.stringify(mockData));
    
    toast({
      title: "Portfolio Generated!",
      description: "Your resume has been transformed into a beautiful portfolio.",
    });
    
    // Navigate to portfolio
    navigate(`/portfolio/${portfolioId}`);
  };

  const features = [
    {
      icon: Zap,
      title: "AI-Powered Extraction",
      description: "Advanced AI analyzes your resume and extracts key information automatically"
    },
    {
      icon: Sparkles,
      title: "Beautiful Design",
      description: "Transform your data into a stunning, modern portfolio with glassmorphism effects"
    },
    {
      icon: Star,
      title: "Instant Generation",
      description: "Get your professional portfolio ready in seconds, not hours"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero font-inter">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <div className="flex justify-center mb-8">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-white to-white/60 rounded-2xl flex items-center justify-center shadow-2xl">
                <Sparkles className="w-10 h-10 text-black" />
              </div>
              <motion.div
                className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-6xl md:text-7xl font-bold font-space text-white mb-8 leading-tight"
          >
            Turn Your Resume into a
            <span className="block bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              Portfolio Instantly
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Upload your PDF resume and watch as our AI transforms it into a stunning, 
            professional portfolio website in seconds.
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="glass rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Upload Section */}
        <ResumeUpload 
          onFileUpload={handleFileUpload}
          isProcessing={isProcessing}
        />

        {uploadedFile && !isProcessing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center"
          >
            <div className="glass rounded-xl p-6 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <span className="text-white font-medium">File uploaded successfully!</span>
              </div>
              <p className="text-white/70 mb-4">{uploadedFile.name}</p>
              <Button
                onClick={() => handleFileUpload(uploadedFile)}
                size="lg"
                className="w-full text-lg font-medium"
                disabled={isProcessing}
              >
                Generate My Portfolio
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Demo Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-20"
        >
          <p className="text-white/60 mb-6">
            Want to see it in action? Try our demo portfolio
          </p>
          <Button
            onClick={() => navigate('/portfolio/demo-alex-johnson-123')}
            variant="outline"
            size="lg"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50"
          >
            View Demo Portfolio
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
