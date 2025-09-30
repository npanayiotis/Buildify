export const medicalPracticeWebsite = {
  id: "medical-practice-website",
  name: "Medical Practice",
  category: "medical",
  description:
    "Professional medical practice website with appointment booking, doctor profiles, and patient resources",
  preview:
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop&crop=center",
  price: 249,
  isPremium: true,
  features: [
    {
      icon: "📅",
      title: "Appointment Booking",
      description: "Online appointment scheduling system",
    },
    {
      icon: "👨‍⚕️",
      title: "Doctor Profiles",
      description: "Physician biographies and specialties",
    },
    {
      icon: "🏥",
      title: "Services",
      description: "Medical services and treatment options",
    },
    {
      icon: "📋",
      title: "Patient Portal",
      description: "Secure patient information access",
    },
    {
      icon: "📞",
      title: "Emergency Contact",
      description: "24/7 emergency contact information",
    },
    {
      icon: "📱",
      title: "Mobile Responsive",
      description: "Accessible on all devices",
    },
    {
      icon: "🏆",
      title: "Awards & Recognition",
      description: "Medical excellence awards and certifications",
    },
    {
      icon: "📊",
      title: "Health Analytics",
      description: "Patient health tracking and analytics",
    },
    {
      icon: "🩺",
      title: "Telemedicine",
      description: "Virtual consultations and remote care",
    },
  ],
  tags: ["medical", "healthcare", "doctor", "clinic", "appointment", "patient"],
  fullWebsite: {
    hero: {
      title: "Your Health, Our Priority",
      subtitle:
        "Providing comprehensive healthcare services with compassionate care and advanced medical technology. Your well-being is our commitment.",
      buttonText: "Book Appointment",
      buttonSecondary: "Learn More",
      backgroundImage:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    pages: [
      {
        name: "Home",
        slug: "/",
        isActive: true,
        content:
          "Medical practice homepage with services overview and appointment booking",
      },
      {
        name: "About",
        slug: "/about",
        isActive: true,
        content: "Practice history, mission, and physician profiles",
      },
      {
        name: "Services",
        slug: "/services",
        isActive: true,
        content: "Medical services and treatment specialties",
      },
      {
        name: "Doctors",
        slug: "/doctors",
        isActive: true,
        content: "Physician profiles, credentials, and specialties",
      },
      {
        name: "Appointments",
        slug: "/appointments",
        isActive: true,
        content: "Online appointment booking and scheduling",
      },
      {
        name: "Contact",
        slug: "/contact",
        isActive: true,
        content: "Contact information, directions, and emergency procedures",
      },
    ],
    about: {
      title: "About Our Practice",
      content:
        "Established in 1998, our medical practice has been serving the community with comprehensive healthcare services for over 25 years. We combine experienced physicians, modern technology, and compassionate care to provide the highest quality medical treatment.",
      values: ["Compassion", "Excellence", "Integrity", "Innovation"],
      experience: "25+ Years Serving Community",
      patients: "10,000+ Patients Served",
      specialties: [
        "Primary Care",
        "Internal Medicine",
        "Pediatrics",
        "Cardiology",
        "Dermatology",
        "Women's Health",
      ],
    },
    services: [
      {
        name: "Primary Care",
        description:
          "Comprehensive primary healthcare services including routine checkups, preventive care, and chronic disease management.",
        icon: "🩺",
        features: [
          "Annual Physicals",
          "Preventive Care",
          "Chronic Disease Management",
          "Vaccinations",
        ],
        providers: ["Dr. Sarah Johnson", "Dr. Michael Chen"],
      },
      {
        name: "Internal Medicine",
        description:
          "Specialized care for complex medical conditions and diseases affecting internal organs and systems.",
        icon: "🫀",
        features: [
          "Disease Diagnosis",
          "Treatment Planning",
          "Medication Management",
          "Follow-up Care",
        ],
        providers: ["Dr. Sarah Johnson", "Dr. Emily Rodriguez"],
      },
      {
        name: "Pediatrics",
        description:
          "Specialized healthcare for infants, children, and adolescents with age-appropriate medical care.",
        icon: "👶",
        features: [
          "Well-Child Visits",
          "Immunizations",
          "Developmental Screening",
          "Acute Care",
        ],
        providers: ["Dr. David Thompson", "Dr. Lisa Martinez"],
      },
      {
        name: "Cardiology",
        description:
          "Comprehensive heart and cardiovascular care including diagnosis, treatment, and prevention of heart disease.",
        icon: "❤️",
        features: [
          "Heart Disease Screening",
          "Echocardiograms",
          "Stress Tests",
          "Cardiac Rehabilitation",
        ],
        providers: ["Dr. Robert Wilson"],
      },
      {
        name: "Dermatology",
        description:
          "Specialized care for skin, hair, and nail conditions including medical and cosmetic dermatology services.",
        icon: "🧴",
        features: [
          "Skin Cancer Screening",
          "Acne Treatment",
          "Mole Removal",
          "Cosmetic Procedures",
        ],
        providers: ["Dr. Jennifer Lee"],
      },
      {
        name: "Women's Health",
        description:
          "Comprehensive healthcare services specifically designed for women's unique health needs.",
        icon: "👩",
        features: [
          "Annual Exams",
          "Prenatal Care",
          "Family Planning",
          "Menopause Management",
        ],
        providers: ["Dr. Emily Rodriguez", "Dr. Jennifer Lee"],
      },
    ],
    doctors: [
      {
        name: "Dr. Sarah Johnson",
        role: "Internal Medicine Physician",
        image:
          "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        bio: "Dr. Johnson is board-certified in Internal Medicine with over 15 years of experience in primary care and chronic disease management.",
        specialties: [
          "Primary Care",
          "Internal Medicine",
          "Diabetes Management",
        ],
        education: "MD, Johns Hopkins University",
        experience: "15+ years",
        rating: 4.9,
        patients: 2500,
      },
      {
        name: "Dr. Michael Chen",
        role: "Primary Care Physician",
        image:
          "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        bio: "Dr. Chen specializes in preventive medicine and family healthcare with a focus on patient education and wellness.",
        specialties: ["Primary Care", "Preventive Medicine", "Family Medicine"],
        education: "MD, Stanford University",
        experience: "12+ years",
        rating: 4.8,
        patients: 2200,
      },
      {
        name: "Dr. Emily Rodriguez",
        role: "Pediatrician",
        image:
          "https://images.unsplash.com/photo-1594824388852-7a6c8a4b8b8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        bio: "Dr. Rodriguez is passionate about children's health and provides comprehensive pediatric care from infancy through adolescence.",
        specialties: ["Pediatrics", "Child Development", "Adolescent Medicine"],
        education: "MD, Harvard Medical School",
        experience: "10+ years",
        rating: 4.9,
        patients: 1800,
      },
      {
        name: "Dr. Robert Wilson",
        role: "Cardiologist",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        bio: "Dr. Wilson is a board-certified cardiologist specializing in preventive cardiology and heart disease treatment.",
        specialties: [
          "Cardiology",
          "Heart Disease Prevention",
          "Cardiac Rehabilitation",
        ],
        education: "MD, Mayo Clinic",
        experience: "18+ years",
        rating: 4.8,
        patients: 1500,
      },
    ],
    appointments: {
      title: "Schedule Your Appointment",
      description:
        "Book your appointment online or call our office. We offer flexible scheduling to accommodate your needs.",
      onlineBooking: {
        available: true,
        hours: "24/7 Online Booking",
        responseTime: "Confirmation within 2 hours",
      },
      phoneBooking: {
        number: "(555) 123-4567",
        hours: "Monday-Friday: 8:00 AM - 5:00 PM",
        saturday: "Saturday: 9:00 AM - 12:00 PM",
      },
      appointmentTypes: [
        "New Patient Consultation",
        "Follow-up Visit",
        "Annual Physical",
        "Specialty Consultation",
        "Urgent Care",
        "Telemedicine Visit",
      ],
      preparation: {
        title: "Before Your Visit",
        checklist: [
          "Bring photo ID and insurance card",
          "Arrive 15 minutes early",
          "Bring list of current medications",
          "Prepare questions for your doctor",
          "Bring relevant medical records",
        ],
      },
    },
    testimonials: [
      {
        name: "Mary Johnson",
        role: "Patient",
        content:
          "Dr. Johnson has been my primary care physician for over 10 years. Her thoroughness and genuine care for her patients is exceptional. I always feel heard and well-cared for.",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80",
        rating: 5,
      },
      {
        name: "James Wilson",
        role: "Patient",
        content:
          "The entire staff is professional and caring. Dr. Chen took the time to explain my treatment options and made sure I understood everything. Highly recommend this practice.",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80",
        rating: 5,
      },
      {
        name: "Lisa Martinez",
        role: "Parent",
        content:
          "Dr. Rodriguez has been caring for my children since they were born. She's patient, knowledgeable, and always makes the kids feel comfortable. We're so grateful for her care.",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80",
        rating: 5,
      },
    ],
    contact: {
      address:
        "123 Medical Center Drive, Suite 200, Healthcare District, City, ST 12345",
      phone: "(555) 123-4567",
      email: "info@medicalpractice.com",
      emergency: "(555) 911-HELP",
      hours: {
        weekdays: "8:00 AM - 5:00 PM",
        saturday: "9:00 AM - 12:00 PM",
        sunday: "Closed",
        emergency: "24/7 Emergency Line Available",
      },
      insurance: {
        title: "Accepted Insurance Plans",
        plans: [
          "Blue Cross Blue Shield",
          "Aetna",
          "Cigna",
          "UnitedHealthcare",
          "Medicare",
          "Medicaid",
        ],
        note: "Please contact us to verify your specific plan coverage",
      },
    },
    stats: [
      { number: "10,000+", label: "Patients Served" },
      { number: "25+", label: "Years Experience" },
      { number: "6", label: "Specialized Physicians" },
      { number: "98%", label: "Patient Satisfaction" },
    ],
    seo: {
      title: "Medical Practice - Comprehensive Healthcare Services",
      description:
        "Professional medical practice providing primary care, specialty services, and comprehensive healthcare. Experienced physicians dedicated to your health and well-being.",
      keywords: [
        "medical practice",
        "primary care",
        "family medicine",
        "internal medicine",
        "pediatrics",
        "healthcare",
      ],
      ogImage:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
  },
};
