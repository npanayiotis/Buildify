import React, { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lazy3DCanvas from "../../../components/Templates/Lazy3DCanvas";
import {
  OptimizedSphere,
  OptimizedBox,
  OptimizedTorus,
  OptimizedOrbitControls,
} from "../../../components/Templates/Performance3DComponents";

const TechStartupTemplate = memo(() => {
  const [services, setServices] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    // Fetch services and team data
    fetchServices();
    fetchTeamMembers();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/templates/tech-startup/services");
      const data = await response.json();
      if (data.success) {
        setServices(data.data);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      // Set default services if API fails
      setServices([
        {
          id: "1",
          title: "Web Development",
          description: "Custom web applications built with modern technologies",
          icon: "🌐",
          price: 2999,
          features: [
            "React/Next.js",
            "Node.js Backend",
            "Database Design",
            "API Integration",
          ],
        },
        {
          id: "2",
          title: "Mobile Apps",
          description: "Native and cross-platform mobile applications",
          icon: "📱",
          price: 4999,
          features: [
            "iOS & Android",
            "React Native",
            "Flutter",
            "App Store Deployment",
          ],
        },
        {
          id: "3",
          title: "AI Solutions",
          description: "Machine learning and AI-powered business solutions",
          icon: "🤖",
          price: 7999,
          features: [
            "Custom ML Models",
            "Data Analysis",
            "Automation",
            "Integration",
          ],
        },
      ]);
    }
  };

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch("/api/templates/tech-startup/team");
      const data = await response.json();
      if (data.success) {
        setTeamMembers(data.data);
      }
    } catch (error) {
      console.error("Error fetching team members:", error);
      // Set default team if API fails
      setTeamMembers([
        {
          id: "1",
          name: "Sarah Johnson",
          position: "CEO & Founder",
          bio: "Tech entrepreneur with 10+ years of experience in building successful startups.",
          image: "",
          linkedinUrl: "",
          twitterUrl: "",
        },
        {
          id: "2",
          name: "Mike Chen",
          position: "CTO",
          bio: "Full-stack developer and technology architect with expertise in scalable systems.",
          image: "",
          linkedinUrl: "",
          twitterUrl: "",
        },
        {
          id: "3",
          name: "Emily Rodriguez",
          position: "Lead Designer",
          bio: "Creative director specializing in user experience and modern design systems.",
          image: "",
          linkedinUrl: "",
          twitterUrl: "",
        },
      ]);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/templates/tech-startup/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactForm),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitMessage(
          "Message sent successfully! We'll get back to you soon."
        );
        setContactForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitMessage("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setSubmitMessage("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setContactForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Optimized 3D Background */}
      <Lazy3DCanvas camera={{ position: [0, 0, 5], fov: 75 }} className="z-0">
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        <OptimizedSphere
          position={[-2, 1, -2]}
          color="#3B82F6"
          scale={1.2}
          args={[1, 32, 32]}
        />
        <OptimizedSphere
          position={[2, -1, -1]}
          color="#6366F1"
          scale={0.8}
          args={[1, 32, 32]}
        />
        <OptimizedBox
          position={[0, 0, -3]}
          color="#8B5CF6"
          scale={1}
          args={[0.4, 0.4, 0.4]}
        />
        <OptimizedBox
          position={[-1.5, -1, -2]}
          color="#06B6D4"
          scale={0.6}
          args={[0.3, 0.3, 0.3]}
        />
        <OptimizedTorus
          position={[1.5, 1, -1]}
          color="#F59E0B"
          scale={0.8}
          args={[1, 0.3, 16, 100]}
        />

        <OptimizedOrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={0.3}
        />
      </Lazy3DCanvas>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">TS</span>
          </div>
          <span className="text-xl font-bold">TechStart</span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a href="#home" className="hover:text-blue-300 transition-colors">
            Home
          </a>
          <a href="#services" className="hover:text-blue-300 transition-colors">
            Services
          </a>
          <a href="#about" className="hover:text-blue-300 transition-colors">
            About
          </a>
          <a href="#contact" className="hover:text-blue-300 transition-colors">
            Contact
          </a>
        </div>

        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative z-10 flex items-center justify-center min-h-screen px-6"
      >
        <div className="text-center max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-indigo-300 bg-clip-text text-transparent"
          >
            Building the Future of Technology
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto"
          >
            We create innovative solutions that transform businesses and drive
            digital transformation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2">
              <span>Start Your Project</span>
              <span>→</span>
            </button>
            <button className="border-2 border-blue-400 text-blue-400 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-400 hover:text-white transition-all duration-300">
              Learn More
            </button>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-indigo-300 bg-clip-text text-transparent">
              Our Services
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Comprehensive technology solutions to accelerate your business
              growth
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {service.title}
                </h3>
                <p className="text-blue-100 mb-6">{service.description}</p>

                {service.price && (
                  <div className="text-3xl font-bold text-green-400 mb-4">
                    ${service.price.toLocaleString()}
                  </div>
                )}

                {service.features && service.features.length > 0 && (
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-blue-100"
                      >
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                  Learn More
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="about" className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-indigo-300 bg-clip-text text-transparent">
              Meet Our Team
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              The passionate individuals driving innovation and excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-white">
                      {member.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold mb-2 text-white">
                  {member.name}
                </h3>
                <p className="text-blue-300 mb-4">{member.position}</p>
                <p className="text-blue-100 mb-6">{member.bio}</p>

                <div className="flex justify-center space-x-4">
                  {member.linkedinUrl && (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      LinkedIn
                    </a>
                  )}
                  {member.twitterUrl && (
                    <a
                      href={member.twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Twitter
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-indigo-300 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Ready to start your next project? Let&apos;s discuss how we can
              help you achieve your goals.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-blue-100 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-100 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-100 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={contactForm.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-100 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={contactForm.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              {submitMessage && (
                <div
                  className={`p-4 rounded-lg ${
                    submitMessage.includes("successfully")
                      ? "bg-green-500/20 text-green-300"
                      : "bg-red-500/20 text-red-300"
                  }`}
                >
                  {submitMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-white/20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">TS</span>
            </div>
            <span className="text-xl font-bold">TechStart</span>
          </div>

          <p className="text-blue-100 mb-6">
            Building the future of technology, one project at a time.
          </p>

          <div className="flex justify-center space-x-8 text-blue-200">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>

          <p className="text-blue-300 mt-6 text-sm">
            © 2024 TechStart. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
});

TechStartupTemplate.displayName = "TechStartupTemplate";

export default TechStartupTemplate;
