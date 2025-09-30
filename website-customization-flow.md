# Website Customization & Delivery Flow

## 🔄 Complete Flow: Customize → Save → Deliver

### Step 1: User Customizes Website
```javascript
// User makes changes in GrapesJS editor
const customizationData = {
  websiteId: "website_123",
  userId: "user_456",
  
  // Pages with customized content
  pages: [
    {
      id: "home",
      title: "Home",
      content: `
        <div class="hero">
          <h1 style="color: #3b82f6; font-family: 'Inter', sans-serif;">
            Welcome to My Business
          </h1>
          <p style="color: #6b7280;">
            We provide amazing services to help you grow
          </p>
          <button style="background: #8b5cf6; color: white; padding: 12px 24px;">
            Get Started
          </button>
        </div>
      `,
      metaTitle: "My Business - Professional Services",
      metaDescription: "Leading provider of professional services..."
    },
    {
      id: "about",
      title: "About Us",
      content: `
        <div class="about-section">
          <h2>About Our Company</h2>
          <p>We have been serving customers for over 10 years...</p>
          <img src="/uploads/team-photo.jpg" alt="Our Team">
        </div>
      `
    }
  ],
  
  // Global customizations
  customCSS: `
    .hero {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 80px 20px;
      text-align: center;
    }
    
    .about-section {
      padding: 60px 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
  `,
  
  customJS: `
    // Custom JavaScript for interactivity
    document.addEventListener('DOMContentLoaded', function() {
      // Add smooth scrolling
      // Add form validation
      // Add animations
    });
  `,
  
  // Website settings
  settings: {
    primaryColor: "#3b82f6",
    secondaryColor: "#8b5cf6",
    fontFamily: "Inter",
    logo: "/uploads/my-logo.png",
    favicon: "/uploads/favicon.ico"
  }
};
```

### Step 2: Save Customization to Database
```javascript
// API Call to save customization
const saveCustomization = async (websiteId, customizationData) => {
  const response = await fetch(`/api/websites/${websiteId}/customize`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${userToken}`
    },
    body: JSON.stringify(customizationData)
  });
  
  return response.json();
};

// Database storage (Supabase/PostgreSQL)
const saveToDatabase = async (userId, websiteId, data) => {
  // Update website record
  await supabase
    .from('websites')
    .update({
      custom_css: data.customCSS,
      custom_js: data.customJS,
      settings: data.settings,
      updated_at: new Date()
    })
    .eq('id', websiteId)
    .eq('user_id', userId); // Security: only owner can update
    
  // Update/Insert pages
  for (const page of data.pages) {
    await supabase
      .from('pages')
      .upsert({
        website_id: websiteId,
        slug: page.id,
        title: page.title,
        content_html: page.content,
        meta_title: page.metaTitle,
        meta_description: page.metaDescription,
        updated_at: new Date()
      })
      .eq('website_id', websiteId)
      .eq('slug', page.id);
  }
};
```

### Step 3: Database Structure (What Gets Stored)
```sql
-- Websites table
INSERT INTO websites (
  id, user_id, name, template_id, 
  custom_css, custom_js, settings,
  published, published_at
) VALUES (
  'website_123', 'user_456', 'My Business Website', 'restaurant-template',
  '.hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }',
  'document.addEventListener("DOMContentLoaded", function() { ... });',
  '{"primaryColor": "#3b82f6", "logo": "/uploads/my-logo.png"}',
  true, '2024-01-15 10:30:00'
);

-- Pages table
INSERT INTO pages (website_id, slug, title, content_html, meta_title) VALUES
('website_123', 'home', 'Home', '<div class="hero"><h1>Welcome to My Business</h1>...</div>', 'My Business - Professional Services'),
('website_123', 'about', 'About Us', '<div class="about-section"><h2>About Our Company</h2>...</div>', 'About Us - My Business');

-- Files table (uploaded images)
INSERT INTO files (website_id, file_name, file_path, file_type) VALUES
('website_123', 'my-logo.png', 'website_123/uploads/my-logo.png', 'image/png'),
('website_123', 'team-photo.jpg', 'website_123/uploads/team-photo.jpg', 'image/jpeg');
```

### Step 4: Customer Website Delivery
```javascript
// When visitor visits: mybusiness.elevare.com
// Next.js handles the routing and renders the customized website

// pages/site/[websiteId]/[...slug].js
export default function CustomerWebsite({ website, page, files }) {
  return (
    <html>
      <head>
        <title>{page.metaTitle || website.name}</title>
        <meta name="description" content={page.metaDescription} />
        
        {/* Custom CSS */}
        <style dangerouslySetInnerHTML={{ __html: website.custom_css }} />
        
        {/* Custom JavaScript */}
        <script dangerouslySetInnerHTML={{ __html: website.custom_js }} />
      </head>
      <body>
        {/* Render customized page content */}
        <div dangerouslySetInnerHTML={{ __html: page.content_html }} />
      </body>
    </html>
  );
}

// Server-side data fetching
export async function getServerSideProps({ params, req }) {
  const { websiteId, slug } = params;
  
  // Get website data
  const { data: website } = await supabase
    .from('websites')
    .select('*')
    .eq('id', websiteId)
    .eq('published', true)
    .single();
    
  // Get page content
  const { data: page } = await supabase
    .from('pages')
    .select('*')
    .eq('website_id', websiteId)
    .eq('slug', slug || 'home')
    .single();
    
  // Get uploaded files
  const { data: files } = await supabase
    .from('files')
    .select('*')
    .eq('website_id', websiteId);
    
  return {
    props: {
      website,
      page,
      files
    }
  };
}
```

## 🏗️ Complete Architecture

### Database Tables (Multi-Tenant)
```
users
├── user_456 (John Doe)
└── user_789 (Jane Smith)

websites
├── website_123 (John's Restaurant) → user_456
├── website_124 (Jane's Portfolio) → user_789
└── website_125 (John's Blog) → user_456

pages
├── website_123/home (Restaurant homepage)
├── website_123/menu (Restaurant menu)
├── website_124/home (Portfolio homepage)
└── website_125/home (Blog homepage)

files
├── website_123/restaurant-logo.png
├── website_124/portfolio-image.jpg
└── website_125/blog-featured.jpg
```

### File Storage Structure
```
Supabase Storage:
├── website-assets/
│   ├── website_123/
│   │   ├── logo.png
│   │   ├── menu-images/
│   │   └── gallery/
│   ├── website_124/
│   │   ├── portfolio-images/
│   │   └── profile-photo.jpg
│   └── website_125/
│       └── blog-images/
```

### URL Routing
```
Customer Websites:
├── myrestaurant.elevare.com → website_123
├── janedoe.elevare.com → website_124
├── myblog.elevare.com → website_125
└── custom-domain.com → website_123 (custom domain)

Admin Panel:
└── elevare.com/dashboard → Admin interface
```

## 🔐 Security & Isolation

### Row Level Security (RLS)
```sql
-- Users can only access their own websites
CREATE POLICY "Users can view own websites" ON websites
  FOR SELECT USING (auth.uid() = user_id);

-- Visitors can only see published websites
CREATE POLICY "Public can view published websites" ON websites
  FOR SELECT USING (published = true);
```

### Data Flow Security
```javascript
// 1. User customizes (authenticated)
// ✅ Can only edit their own websites
const canEdit = website.user_id === currentUser.id;

// 2. Data is saved (tenant isolated)
// ✅ Stored with user_id for isolation
await supabase.from('websites').update(data).eq('user_id', currentUser.id);

// 3. Website is delivered (public access)
// ✅ Only published websites are accessible
const website = await supabase
  .from('websites')
  .select('*')
  .eq('id', websiteId)
  .eq('published', true) // Only published sites
  .single();
```

## 📊 Real Example: Restaurant Website

### User Customizes:
```javascript
// User changes restaurant website
const restaurantCustomization = {
  pages: {
    home: {
      content: `
        <div class="hero-restaurant">
          <h1 style="color: #dc2626;">Mario's Italian Restaurant</h1>
          <p>Authentic Italian cuisine since 1985</p>
          <img src="/uploads/mario-restaurant.jpg" alt="Restaurant Interior">
        </div>
      `
    },
    menu: {
      content: `
        <div class="menu-section">
          <h2>Our Menu</h2>
          <div class="menu-item">
            <h3>Spaghetti Carbonara - €18</h3>
            <p>Traditional Roman pasta with eggs, cheese, and pancetta</p>
          </div>
        </div>
      `
    }
  },
  customCSS: `
    .hero-restaurant {
      background: url('/uploads/restaurant-bg.jpg');
      color: white;
      padding: 100px 20px;
    }
    .menu-item {
      border-bottom: 1px solid #e5e7eb;
      padding: 20px 0;
    }
  `
};
```

### Database Storage:
```sql
-- Restaurant website data
website_123: {
  name: "Mario's Italian Restaurant",
  custom_css: ".hero-restaurant { background: url('/uploads/restaurant-bg.jpg'); }",
  settings: {"primaryColor": "#dc2626", "logo": "/uploads/mario-logo.png"}
}

pages: [
  {website_id: "website_123", slug: "home", content: "<div class='hero-restaurant'>..."},
  {website_id: "website_123", slug: "menu", content: "<div class='menu-section'>..."}
]

files: [
  {website_id: "website_123", file_path: "website_123/uploads/mario-restaurant.jpg"},
  {website_id: "website_123", file_path: "website_123/uploads/mario-logo.png"}
]
```

### Customer Visits Website:
```
Visitor goes to: mariosrestaurant.elevare.com
↓
Next.js renders: Mario's Italian Restaurant with custom styling
↓
Shows: Custom hero section, menu, images, colors
↓
Result: Fully customized restaurant website
```

## 🎉 Summary

**The complete flow works like this:**

1. **User customizes** → Changes saved to database (tenant isolated)
2. **Data stored** → Website content, CSS, JS, images in database + storage
3. **Customer visits** → Next.js fetches and renders customized content
4. **Result** → Customer sees fully customized website

**Each customer gets:**
- ✅ Their own customized website data
- ✅ Their own uploaded files and images  
- ✅ Their own domain and styling
- ✅ Complete data isolation and security
- ✅ Fast, scalable delivery

This is exactly how **Webflow**, **Squarespace**, and **WordPress.com** work! 🚀
