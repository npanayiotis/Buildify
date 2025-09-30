# Quick Start Guide - Website Pages & Admin Dashboards

## 🚀 What's Been Built

### ✅ Completed Features

1. **Universal Contact System**

   - Reusable contact form component
   - API endpoints for submissions
   - Database schema with status tracking
   - Admin dashboard to manage all contacts

2. **Example Website Pages (Full Implementation)**

   - **Blog**: Home page with hero, categories, posts, newsletter
   - **Blog**: Contact page with form and info
   - **Restaurant**: Menu page with categories and items
   - **Restaurant**: Reservations page with booking form
   - **Gym**: Programs page with detailed listings

3. **Admin Dashboards (Examples)**

   - **Universal Contacts Dashboard**: Manage all contact forms
   - **Restaurant Reservations**: Manage table bookings

4. **Complete Website Data**
   - All 8 websites have full data structures
   - Navigation, hero sections, content, testimonials
   - Images, stats, features, and SEO data

## 📦 Installation & Setup

```bash
# 1. Install dependencies
npm install

# 2. Setup environment variables
cp .env.example .env
# Edit .env with your database URL

# 3. Run database migrations
npx prisma migrate dev

# 4. Generate Prisma client
npx prisma generate

# 5. Start development server
npm run dev
```

## 🌐 Access the Websites

### Live Pages (Already Built)

#### Blog Website

- Home: http://localhost:3000/site/blog/home
- Contact: http://localhost:3000/site/blog/contact

#### Restaurant Website

- Menu: http://localhost:3000/site/restaurant/menu
- Reservations: http://localhost:3000/site/restaurant/reservations

#### Gym Website

- Programs: http://localhost:3000/site/gym/programs

### Admin Dashboards

- All Contacts: http://localhost:3000/admin/contacts
- Restaurant Reservations: http://localhost:3000/admin/restaurant/reservations

## 📝 Creating New Pages - Step by Step

### Step 1: Choose Your Website

Pick from:

- `blog` - Professional Blog
- `restaurant` - Restaurant (Bella Vista)
- `gym` - Fitness Gym (FitLife)
- `law` - Law Office
- `portfolio` - Creative Portfolio
- `real-estate` - Real Estate Agency
- `medical` - Medical Practice
- `photography` - Photography Studio

### Step 2: Create the Page File

**Location:** `/src/pages/site/[website-type]/[page-name].js`

**Example:** `/src/pages/site/law/services.js`

### Step 3: Use This Template

```javascript
import { useState } from "react";
import Link from "next/link";
import { WEBSITES } from "../../../lib/saas/websites/websiteData";
import ContactForm from "../../../components/Contact/ContactForm";

export default function PageName() {
  // Find your website data
  const websiteData = WEBSITES.find((w) => w.id === "your-website-id");
  // IDs: professional-blog-website, elegant-restaurant-website,
  //      fitness-gym-website, law-office-website, creative-portfolio-website,
  //      real-estate-agency-website, medical-practice-website,
  //      photography-studio-website

  const { navigation, footer } = websiteData.fullWebsite;

  return (
    <div className="min-h-screen bg-white">
      {/* 🔹 NAVIGATION (copy from any existing page) */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-2xl font-bold text-blue-600">
              {navigation.logo}
            </div>
            <div className="hidden md:flex space-x-8">
              {navigation.links.map((link) => (
                <Link
                  key={link.href}
                  href={`/site/[type]${
                    link.href === "/" ? "/home" : link.href
                  }`}
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* 🔹 HERO SECTION */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Your Page Title
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Your subtitle or description
          </p>
        </div>
      </section>

      {/* 🔹 CONTENT SECTIONS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Section Title
          </h2>

          {/* Your content here - use data from websiteData */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Example: Map over services, team members, etc. */}
          </div>
        </div>
      </section>

      {/* 🔹 CONTACT FORM (if needed) */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Get In Touch
          </h2>
          <ContactForm websiteType="your-website-type" />
        </div>
      </section>

      {/* 🔹 FOOTER (copy from any existing page) */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">{footer.copyright}</div>
        </div>
      </footer>
    </div>
  );
}
```

### Step 4: Customize the Content

Use data from your website's data file:

```javascript
// Access any data from your website
const { services, team, testimonials, stats } = websiteData.fullWebsite;

// Example: Display services
{
  services.map((service, index) => (
    <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
      <div className="text-4xl mb-4">{service.icon}</div>
      <h3 className="text-xl font-bold mb-2">{service.name}</h3>
      <p className="text-gray-600">{service.description}</p>
    </div>
  ));
}
```

## 🎨 Design System Cheat Sheet

### Color Classes by Website

```javascript
Blog:        'blue-600'   'indigo-700'
Restaurant:  'red-600'    'amber-600'
Gym:         'green-600'  'teal-700'
Law:         'blue-700'   'gray-800'
Portfolio:   'purple-600' 'pink-600'
Real Estate: 'indigo-600' 'blue-700'
Medical:     'blue-600'   'green-600'
Photography: 'pink-600'   'purple-700'
```

### Common Button Styles

```jsx
{
  /* Primary Button */
}
<button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition">
  Click Me
</button>;

{
  /* Secondary Button */
}
<button className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold transition">
  Click Me
</button>;

{
  /* Outline Button */
}
<button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition">
  Click Me
</button>;
```

### Common Card Styles

```jsx
{
  /* Standard Card */
}
<div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition">
  <h3 className="text-xl font-bold text-gray-900 mb-2">Title</h3>
  <p className="text-gray-600">Description</p>
</div>;

{
  /* Card with Image */
}
<div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition">
  <img src="..." alt="..." className="w-full h-48 object-cover" />
  <div className="p-6">
    <h3 className="text-xl font-bold text-gray-900 mb-2">Title</h3>
    <p className="text-gray-600">Description</p>
  </div>
</div>;
```

### Grid Layouts

```jsx
{/* 2 Columns */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">

{/* 3 Columns */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

{/* 4 Columns */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
```

## 🔧 Creating Admin Dashboards

### Step 1: Create Dashboard File

**Location:** `/src/pages/admin/[website-type]/[dashboard-name].js`

**Example:** `/src/pages/admin/gym/members.js`

### Step 2: Use This Template

```javascript
import { useState, useEffect } from "react";
import DashboardLayout from "../../../components/Layout/DashboardLayout";

export default function AdminDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ status: "all" });

  useEffect(() => {
    fetchData();
  }, [filter]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch from your API
      const response = await fetch("/api/your-endpoint");
      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard Title
          </h1>
          <p className="text-gray-600">Dashboard description</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-2xl font-bold text-gray-900">123</div>
            <div className="text-sm text-gray-600">Stat Label</div>
          </div>
          {/* More stat cards */}
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
          <div className="grid grid-cols-3 gap-4">
            <select className="px-4 py-2 border rounded-lg">
              <option value="all">All</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Column 1
                </th>
                {/* More headers */}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{item.name}</td>
                  {/* More cells */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
```

## 🗂️ File Structure Reference

```
/src/pages/
├── site/                    # Public website pages
│   ├── blog/
│   │   ├── home.js         ✅ Done
│   │   ├── about.js        ⏳ To do
│   │   ├── posts.js        ⏳ To do
│   │   ├── categories.js   ⏳ To do
│   │   └── contact.js      ✅ Done
│   ├── restaurant/
│   │   ├── menu.js         ✅ Done
│   │   ├── reservations.js ✅ Done
│   │   ├── chef.js         ⏳ To do
│   │   └── ...
│   ├── gym/
│   │   ├── programs.js     ✅ Done
│   │   └── ...
│   └── ... (5 more websites)
│
└── admin/                   # Admin dashboards
    ├── contacts.js          ✅ Done
    ├── restaurant/
    │   └── reservations.js  ✅ Done
    └── ... (7 more dashboards)
```

## 🎯 Next Actions

### Priority 1: Complete Website Pages

1. Pick a website (law, portfolio, real-estate, medical, or photography)
2. Create each page from the navigation
3. Use the template above
4. Copy navigation/footer from existing pages

### Priority 2: Build Admin Dashboards

1. Create CRUD operations for each content type
2. Add filtering and search
3. Include stats and analytics
4. Use the dashboard template above

### Priority 3: Add Advanced Features

1. Authentication system
2. Payment processing
3. Email notifications
4. Search functionality

## 🐛 Common Issues & Solutions

**Issue:** "Module not found: Can't resolve 'components/Contact/ContactForm'"

- **Solution:** Use correct import path: `../../../components/Contact/ContactForm`

**Issue:** "Cannot find website data"

- **Solution:** Check the website ID matches exactly from websiteData.js

**Issue:** "Styles not applying"

- **Solution:** Make sure Tailwind CSS is configured in tailwind.config.js

**Issue:** "API endpoint not found"

- **Solution:** Check the API file is in the correct /pages/api/ directory

## 📚 Useful Links

- [Full Implementation Guide](./WEBSITE_PAGES_IMPLEMENTATION.md)
- [Implementation Summary](./IMPLEMENTATION_SUMMARY.md)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Next.js Routing](https://nextjs.org/docs/routing/introduction)

## ✅ Testing Your Pages

1. **Visual Check:**

   - Does it look good on mobile?
   - Are all images loading?
   - Is the navigation working?

2. **Functional Check:**

   - Do all links work?
   - Does the contact form submit?
   - Are filters functioning?

3. **Browser Check:**
   - Test in Chrome, Firefox, Safari
   - Check console for errors
   - Verify responsive breakpoints

## 💡 Pro Tips

1. **Copy, Don't Rewrite:** Use existing pages as templates
2. **Data-Driven:** Always use data from websiteData files
3. **Component Reuse:** Extract common patterns into components
4. **Mobile First:** Start with mobile design, then scale up
5. **Git Commits:** Commit after each page is complete
6. **Test Often:** Check your work in the browser frequently

## 🎉 You're Ready!

You now have:

- ✅ Working contact form system
- ✅ Example pages to learn from
- ✅ Complete website data
- ✅ Admin dashboard examples
- ✅ Templates and patterns
- ✅ Design system guidelines

**Start creating pages and dashboards following the patterns above!**

---

Need help? Check the full documentation or review the existing page examples.
