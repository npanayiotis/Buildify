export const gymWebsite = {
  id: "fitness-gym-website",
  name: "FitLife Gym",
  category: "gym",
  description:
    "Modern fitness center with state-of-the-art equipment and expert trainers",
  preview:
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center",
  price: 149,
  isPremium: false,
  features: [
    {
      icon: "📅",
      title: "Class Schedules",
      description: "Weekly class schedules and online booking",
    },
    {
      icon: "👨‍💼",
      title: "Personal Trainers",
      description: "Certified trainers with personalized programs",
    },
    {
      icon: "💳",
      title: "Membership Plans",
      description: "Flexible membership options and pricing",
    },
    {
      icon: "🏋️",
      title: "Premium Equipment",
      description: "State-of-the-art fitness equipment and machines",
    },
    {
      icon: "🥗",
      title: "Nutrition Coaching",
      description: "Personalized nutrition plans and meal prep",
    },
    {
      icon: "🏆",
      title: "Success Stories",
      description: "Member transformation stories and testimonials",
    },
    {
      icon: "📱",
      title: "Mobile App",
      description: "Track workouts and book classes on the go",
    },
    {
      icon: "🏃‍♀️",
      title: "Group Classes",
      description: "Variety of fitness classes for all levels",
    },
    {
      icon: "💪",
      title: "Personal Training",
      description: "One-on-one training sessions",
    },
    {
      icon: "🏊‍♂️",
      title: "Swimming Pool",
      description: "Olympic-size pool and aqua classes",
    },
  ],
  tags: [
    "gym",
    "fitness",
    "health",
    "training",
    "wellness",
    "personal-training",
    "group-classes",
  ],
  fullWebsite: {
    hero: {
      title: "Transform Your Life",
      subtitle:
        "Join FitLife Gym and achieve your fitness goals with our world-class facilities, expert trainers, and supportive community",
      buttonText: "Start Your Journey",
      buttonSecondary: "View Classes",
      backgroundImage:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      overlay: "rgba(0, 0, 0, 0.6)",
      stats: [
        { number: "5,000+", label: "Active Members" },
        { number: "50+", label: "Expert Trainers" },
        { number: "15+", label: "Years Experience" },
      ],
      featured: {
        title: "New Member Special",
        description:
          "Get 3 months for the price of 2 plus a free personal training session",
        validUntil: "End of Month",
        image:
          "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
    },
    about: {
      title: "About FitLife",
      content:
        "FitLife Gym is more than just a fitness center - it's a community dedicated to helping you achieve your health and wellness goals. With cutting-edge equipment and certified trainers, we provide the support you need to succeed.",
      experience: "15+ Years",
      interests: [
        "Weight Training",
        "Cardio",
        "Yoga",
        "Personal Training",
        "Group Classes",
      ],
      socialLinks: {
        instagram: "https://instagram.com/fitlife_gym",
        facebook: "https://facebook.com/fitlife_gym",
        youtube: "https://youtube.com/fitlife_gym",
      },
    },
    programs: [
      {
        name: "Personal Training",
        description:
          "One-on-one sessions with certified trainers for personalized fitness guidance",
        price: "$80/session",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        features: [
          "Customized workout plans",
          "Nutrition guidance",
          "Progress tracking",
          "Goal setting",
          "Form correction",
        ],
        popular: true,
      },
      {
        name: "Group Classes",
        description: "High-energy group fitness classes for all fitness levels",
        price: "Included in membership",
        image:
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        features: [
          "Yoga",
          "Pilates",
          "HIIT",
          "Spin",
          "Zumba",
          "CrossFit",
          "Boxing",
        ],
        popular: true,
      },
      {
        name: "Nutrition Counseling",
        description:
          "Professional nutrition guidance from certified dietitians",
        price: "$60/session",
        image:
          "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        features: [
          "Meal planning",
          "Supplement advice",
          "Lifestyle coaching",
          "Weight management",
          "Sports nutrition",
        ],
      },
      {
        name: "Youth Programs",
        description: "Specialized fitness programs for children and teenagers",
        price: "$45/month",
        image:
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        features: [
          "Age-appropriate exercises",
          "Fun fitness games",
          "Coordination development",
          "Team building",
        ],
      },
      {
        name: "Senior Fitness",
        description: "Gentle fitness programs designed for older adults",
        price: "$35/month",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        features: [
          "Low-impact exercises",
          "Balance training",
          "Flexibility work",
          "Social interaction",
        ],
      },
    ],
    trainers: [
      {
        name: "Alex Johnson",
        specialty: "Strength Training",
        experience: "8 years",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        bio: "Certified personal trainer specializing in strength and conditioning with a passion for helping clients achieve their fitness goals",
        certifications: ["NASM-CPT", "CSCS", "CrossFit Level 2"],
        achievements: [
          "Former Powerlifting Champion",
          "500+ Client Transformations",
        ],
        specialties: ["Powerlifting", "Bodybuilding", "Athletic Performance"],
      },
      {
        name: "Maria Garcia",
        specialty: "Yoga & Pilates",
        experience: "10 years",
        image:
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        bio: "Yoga instructor and Pilates specialist with a focus on flexibility, mindfulness, and holistic wellness",
        certifications: ["RYT-500", "PMA-CPT", "Yin Yoga Certified"],
        achievements: [
          "International Yoga Teacher",
          "Wellness Coach of the Year",
        ],
        specialties: ["Vinyasa Flow", "Yin Yoga", "Pilates", "Meditation"],
      },
      {
        name: "David Chen",
        specialty: "Functional Training",
        experience: "6 years",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        bio: "Functional movement specialist helping clients improve daily life performance and prevent injuries",
        certifications: ["FMS", "TRX", "Corrective Exercise Specialist"],
        achievements: [
          "Injury Prevention Expert",
          "Movement Quality Specialist",
        ],
        specialties: [
          "Functional Movement",
          "Injury Prevention",
          "Athletic Recovery",
        ],
      },
      {
        name: "Sarah Williams",
        specialty: "Nutrition & Wellness",
        experience: "5 years",
        image:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        bio: "Registered dietitian and wellness coach specializing in sports nutrition and lifestyle transformation",
        certifications: ["RD", "CSSD", "Wellness Coach"],
        achievements: [
          "Sports Nutritionist of the Year",
          "500+ Client Success Stories",
        ],
        specialties: [
          "Sports Nutrition",
          "Weight Management",
          "Lifestyle Coaching",
        ],
      },
      {
        name: "Mike Rodriguez",
        specialty: "Boxing & MMA",
        experience: "12 years",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        bio: "Former professional boxer and MMA trainer with extensive experience in combat sports and fitness",
        certifications: [
          "Boxing Coach",
          "MMA Trainer",
          "Strength & Conditioning",
        ],
        achievements: ["Former Pro Boxer", "Champion Trainer"],
        specialties: ["Boxing", "MMA", "Combat Sports", "Conditioning"],
      },
    ],
    membership: {
      plans: [
        {
          name: "Basic",
          price: "$49/month",
          features: [
            "Access to gym floor",
            "Locker room access",
            "Basic equipment",
            "Group classes (limited)",
            "Free fitness assessment",
            "Mobile app access",
          ],
          popular: false,
          description: "Perfect for beginners starting their fitness journey",
        },
        {
          name: "Premium",
          price: "$79/month",
          features: [
            "Everything in Basic",
            "All group classes",
            "Sauna access",
            "Guest passes (2/month)",
            "Nutrition consultation",
            "Towel service",
            "Priority class booking",
            "Fitness tracking",
          ],
          popular: true,
          description: "Most popular choice with comprehensive benefits",
        },
        {
          name: "Elite",
          price: "$129/month",
          features: [
            "Everything in Premium",
            "Personal training (2 sessions)",
            "Priority booking",
            "Guest passes (5/month)",
            "Nutrition counseling",
            "Massage therapy",
            "Locker rental",
            "24/7 access",
            "Nutrition supplements",
          ],
          popular: false,
          description: "Ultimate fitness experience with premium services",
        },
        {
          name: "Family",
          price: "$199/month",
          features: [
            "Everything in Premium",
            "Up to 4 family members",
            "Youth programs included",
            "Family fitness classes",
            "Childcare services",
            "Family nutrition planning",
            "Priority family booking",
          ],
          popular: false,
          description: "Perfect for families committed to fitness together",
        },
      ],
    },
    successStories: {
      title: "Member Success Stories",
      description: "Real transformations from our amazing members",
      stories: [
        {
          name: "Jennifer Smith",
          age: 28,
          transformation: "Lost 45 lbs in 6 months",
          beforeImage:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          afterImage:
            "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          quote:
            "FitLife gave me the tools and support to completely transform my life. I'm stronger, healthier, and more confident than ever!",
          trainer: "Mike Johnson",
          duration: "6 months",
        },
        {
          name: "Robert Wilson",
          age: 35,
          transformation: "Gained 20 lbs muscle mass",
          beforeImage:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          afterImage:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          quote:
            "The personal training program exceeded my expectations. I achieved my strength goals faster than I ever imagined possible.",
          trainer: "Sarah Williams",
          duration: "8 months",
        },
        {
          name: "Emily Rodriguez",
          age: 24,
          transformation: "Ran first marathon",
          beforeImage:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          afterImage:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          quote:
            "From never running to completing a marathon - FitLife's training program made it all possible. I'm forever grateful!",
          trainer: "Mike Rodriguez",
          duration: "10 months",
        },
      ],
    },
    nutritionProgram: {
      title: "Nutrition & Wellness Program",
      description: "Complete health and wellness support for optimal results",
      services: [
        {
          name: "Personal Nutrition Counseling",
          description: "One-on-one sessions with certified nutritionists",
          image:
            "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          features: [
            "Custom meal plans",
            "Macro tracking",
            "Supplement guidance",
            "Progress monitoring",
          ],
          price: "$80/session",
        },
        {
          name: "Group Nutrition Classes",
          description: "Educational sessions on healthy eating habits",
          image:
            "https://images.unsplash.com/photo-1546554137-f86b9593a222?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          features: [
            "Weekly classes",
            "Recipe demonstrations",
            "Q&A sessions",
            "Take-home materials",
          ],
          price: "Included in membership",
        },
        {
          name: "Meal Prep Services",
          description: "Fresh, healthy meals prepared daily",
          image:
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          features: [
            "Daily fresh meals",
            "Custom portion sizes",
            "Dietary restrictions",
            "Pickup service",
          ],
          price: "$12/meal",
        },
      ],
    },
    facilities: {
      title: "State-of-the-Art Facilities",
      description:
        "Premium equipment and amenities for the ultimate fitness experience",
      areas: [
        {
          name: "Cardio Zone",
          description: "Latest cardio equipment with entertainment systems",
          image:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          equipment: [
            "Treadmills",
            "Ellipticals",
            "Stationary Bikes",
            "Rowing Machines",
          ],
          features: [
            "Individual TV screens",
            "Heart rate monitoring",
            "Climate control",
            "24/7 access",
          ],
        },
        {
          name: "Strength Training Area",
          description: "Comprehensive weight training equipment",
          image:
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          equipment: [
            "Free weights",
            "Weight machines",
            "Functional trainers",
            "Power racks",
          ],
          features: [
            "Olympic lifting platforms",
            "Personal trainers available",
            "Spotter assistance",
            "Equipment variety",
          ],
        },
        {
          name: "Group Fitness Studio",
          description: "Spacious studio for classes and group training",
          image:
            "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          equipment: [
            "Yoga mats",
            "Resistance bands",
            "Kettlebells",
            "TRX systems",
          ],
          features: [
            "Sound system",
            "Mirrored walls",
            "Air conditioning",
            "Class scheduling",
          ],
        },
        {
          name: "Locker Rooms",
          description: "Clean, modern locker rooms with premium amenities",
          image:
            "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          equipment: [
            "Personal lockers",
            "Shower facilities",
            "Sauna",
            "Steam room",
          ],
          features: [
            "Towels provided",
            "Hair dryers",
            "Body wash",
            "Private changing areas",
          ],
        },
      ],
    },
    testimonials: [
      {
        name: "Jennifer Smith",
        role: "Member",
        content:
          "FitLife Gym has completely transformed my fitness journey. The trainers are amazing and the community is so supportive. I've never felt stronger!",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        rating: 5,
        beforeAfter: {
          before: "/testimonials/jennifer_before.jpg",
          after: "/testimonials/jennifer_after.jpg",
        },
      },
      {
        name: "Robert Wilson",
        role: "Member",
        content:
          "The facilities are top-notch and the staff is incredibly knowledgeable. I've achieved goals I never thought possible. Highly recommended!",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        rating: 5,
        beforeAfter: {
          before: "/testimonials/robert_before.jpg",
          after: "/testimonials/robert_after.jpg",
        },
      },
      {
        name: "Lisa Martinez",
        role: "Member",
        content:
          "The group classes are fantastic and the trainers really care about your progress. It's more than a gym - it's a family!",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        rating: 5,
        beforeAfter: {
          before: "/testimonials/lisa_before.jpg",
          after: "/testimonials/lisa_after.jpg",
        },
      },
    ],
    trainers: {
      title: "Meet Our Expert Trainers",
      description:
        "Certified professionals dedicated to helping you achieve your fitness goals",
      headTrainer: {
        name: "Mike Johnson",
        title: "Head Trainer & Fitness Director",
        experience: "15+ Years",
        specialties: [
          "Strength Training",
          "Olympic Lifting",
          "Sports Performance",
        ],
        bio: "Mike is a certified personal trainer with over 15 years of experience. He specializes in strength training and has helped hundreds of clients achieve their fitness goals.",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop&crop=face",
        certifications: [
          "NASM Certified Personal Trainer",
          "ACSM Health Fitness Specialist",
          "USA Weightlifting Coach",
          "CrossFit Level 3 Trainer",
        ],
      },
      team: [
        {
          name: "Sarah Davis",
          title: "Yoga & Pilates Instructor",
          specialty: "Mind-Body Connection",
          image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
          experience: "8+ Years",
        },
        {
          name: "Carlos Rodriguez",
          title: "Cardio & HIIT Specialist",
          specialty: "High-Intensity Training",
          image:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
          experience: "10+ Years",
        },
        {
          name: "Emma Thompson",
          title: "Nutrition Coach",
          specialty: "Weight Management",
          image:
            "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
          experience: "6+ Years",
        },
      ],
    },
    facilities: {
      title: "World-Class Facilities",
      description: "State-of-the-art equipment and spacious workout areas",
      features: [
        {
          name: "Weight Training Area",
          description:
            "Extensive free weights, machines, and functional training equipment",
          image:
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop",
          equipment: [
            "Olympic Barbells",
            "Dumbbells",
            "Cable Machines",
            "Power Racks",
          ],
        },
        {
          name: "Cardio Zone",
          description: "Latest cardio equipment with entertainment systems",
          image:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
          equipment: ["Treadmills", "Ellipticals", "Bikes", "Rowing Machines"],
        },
        {
          name: "Group Class Studio",
          description: "Spacious studio for group fitness classes",
          image:
            "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop",
          classes: ["Yoga", "Pilates", "HIIT", "Zumba", "Spin"],
        },
        {
          name: "Swimming Pool",
          description: "Olympic-size pool with aqua classes",
          image:
            "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&h=400&fit=crop",
          features: [
            "6 Lanes",
            "Aqua Classes",
            "Lifeguard on Duty",
            "Locker Rooms",
          ],
        },
      ],
    },
    programs: {
      title: "Fitness Programs",
      description: "Specialized programs designed for every fitness level",
      categories: [
        {
          name: "Weight Loss",
          description:
            "Comprehensive program combining cardio, strength training, and nutrition",
          duration: "12 weeks",
          price: "$299",
          features: [
            "Personal Training",
            "Nutrition Plan",
            "Progress Tracking",
          ],
          image:
            "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
        },
        {
          name: "Strength Building",
          description:
            "Progressive strength training program for muscle building",
          duration: "16 weeks",
          price: "$399",
          features: [
            "Custom Workout Plan",
            "Technique Coaching",
            "Supplement Guide",
          ],
          image:
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
        },
        {
          name: "Sports Performance",
          description:
            "Athletic training program for sports performance enhancement",
          duration: "8 weeks",
          price: "$249",
          features: ["Speed Training", "Agility Drills", "Injury Prevention"],
          image:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
        },
      ],
    },
    nutrition: {
      title: "Nutrition Coaching",
      description:
        "Personalized nutrition plans to complement your fitness journey",
      services: [
        {
          name: "Nutrition Assessment",
          description:
            "Comprehensive evaluation of your current diet and lifestyle",
          price: "$99",
          includes: ["Diet Analysis", "Goal Setting", "Meal Planning"],
        },
        {
          name: "Custom Meal Plans",
          description:
            "Personalized meal plans based on your goals and preferences",
          price: "$149",
          includes: [
            "Weekly Meal Plans",
            "Recipe Collection",
            "Shopping Lists",
          ],
        },
        {
          name: "Supplement Consultation",
          description: "Expert advice on supplements for your fitness goals",
          price: "$79",
          includes: ["Supplement Review", "Recommendations", "Dosage Guidance"],
        },
      ],
    },
    stats: [
      { number: "800+", label: "Active Members" },
      { number: "20+", label: "Years Experience" },
      { number: "75+", label: "Classes Weekly" },
      { number: "15", label: "Certified Trainers" },
      { number: "95%", label: "Member Satisfaction" },
      { number: "24/7", label: "Access" },
    ],
    navigation: {
      logo: "FitLife",
      links: [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Programs", href: "/programs" },
        { name: "Trainers", href: "/trainers" },
        { name: "Facilities", href: "/facilities" },
        { name: "Nutrition", href: "/nutrition" },
        { name: "Membership", href: "/membership" },
        { name: "Contact", href: "/contact" },
      ],
    },
    pages: {
      home: "Home page with hero section and featured programs",
      about: "About page with gym story and facilities",
      programs: "Programs page with class schedules and descriptions",
      trainers: "Trainers page with staff profiles and certifications",
      facilities: "Facilities page with equipment and amenities",
      nutrition: "Nutrition coaching and meal planning services",
      membership: "Membership page with pricing plans",
      contact: "Contact page with location and hours",
    },
    features: {
      classSchedules: "Weekly class schedules and booking",
      trainerProfiles: "Detailed trainer profiles and specialties",
      membershipPlans: "Flexible membership options",
      equipmentGallery: "Photos of gym equipment and facilities",
      nutritionTips: "Health and nutrition resources",
      successStories: "Member transformation stories",
    },
    footer: {
      description:
        "Join FitLife Gym and become part of a community dedicated to health, fitness, and personal growth.",
      quickLinks: [
        { name: "About Us", url: "/about" },
        { name: "Programs", url: "/programs" },
        { name: "Membership", url: "/membership" },
        { name: "Contact", url: "/contact" },
      ],
      socialLinks: {
        instagram: "https://instagram.com/fitlife_gym",
        facebook: "https://facebook.com/fitlife_gym",
        youtube: "https://youtube.com/fitlife_gym",
        tiktok: "https://tiktok.com/@fitlife_gym",
      },
      copyright: "© 2024 FitLife Gym. All rights reserved.",
    },
  },
};
