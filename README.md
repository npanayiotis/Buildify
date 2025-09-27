# Buildify - SaaS Website CRM Platform

A comprehensive SaaS platform that provides 8 fully functional website templates with real-time customization capabilities, database integration, and admin dashboards.

## 🚀 Features

### 8 Professional Website Templates
- **Tech Startup** - Modern technology company website
- **Consulting Firm** - Professional business consulting site
- **Photography Portfolio** - Creative photographer showcase
- **Restaurant** - Elegant dining establishment site
- **Personal Blog** - Personal blogging platform
- **Fashion Boutique** - Stylish fashion store
- **Online Store** - E-commerce platform
- **Travel Agency** - Adventure travel booking site

### Real-time Customization System
- **Live Preview** - See changes instantly as you customize
- **Color Customization** - Primary, secondary, accent, and background colors
- **Typography Control** - Font selection and sizing
- **Content Editing** - Text, images, and layout modifications
- **Template Switching** - Easy switching between different templates
- **Responsive Design** - Mobile-first approach with Tailwind CSS

### Advanced Features
- **Three.js Animations** - Interactive 3D backgrounds and effects
- **Database Integration** - PostgreSQL with Prisma ORM
- **RESTful APIs** - Complete backend for all templates
- **Admin Dashboards** - Management interfaces for each template
- **Multi-tenant Architecture** - Support for multiple clients
- **Authentication System** - JWT-based security
- **Performance Optimized** - Lazy loading and memoization

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Animations**: Three.js, Framer Motion
- **Icons**: Lucide React
- **Authentication**: JWT
- **Deployment**: Vercel-ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/npanayiotis/Buildify.git
   cd Buildify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   # Create a PostgreSQL database
   # Update the DATABASE_URL in .env.local
   npx prisma generate
   npx prisma db push
   ```

4. **Run the development server**
```bash
npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Template Selection
1. Go to the Templates page
2. Browse through the 8 available templates
3. Click "Customize" on your preferred template

### Customization
1. Use the template selector dropdown to choose a template
2. Customize colors, fonts, and content in the sidebar
3. See real-time preview of your changes
4. Save your customizations
5. Publish your website

### Admin Management
1. Access admin dashboards for each template
2. Manage content, orders, bookings, etc.
3. View analytics and performance metrics

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Next.js pages and API routes
│   ├── templates/      # Template pages
│   ├── admin/          # Admin dashboards
│   └── api/            # Backend API routes
├── templates/          # Template-specific components
├── shared/             # Shared utilities and configurations
└── styles/             # Global styles and customization CSS
```

## 🔧 API Endpoints

Each template includes comprehensive API endpoints:
- **CRUD Operations** - Create, Read, Update, Delete
- **Authentication** - JWT-based security
- **Data Validation** - Input validation and sanitization
- **Error Handling** - Comprehensive error responses

## 🎨 Customization System

The platform features a sophisticated customization system:
- **Real-time Preview** - Instant visual feedback
- **Debounced Updates** - Performance-optimized input handling
- **Template Switching** - Seamless template transitions
- **Persistent Storage** - Save and restore customizations
- **Export Capabilities** - Download customized templates

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on every push

### Manual Deployment
1. Build the application: `npm run build`
2. Start the production server: `npm start`
3. Configure your hosting platform

## 📊 Database Schema

The application uses Prisma ORM with PostgreSQL:
- **Multi-tenant Architecture** - Isolated data per client
- **Template-specific Models** - Customized schemas for each template
- **Relationships** - Proper foreign key relationships
- **Migrations** - Version-controlled database changes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- 3D animations powered by [Three.js](https://threejs.org/)
- Icons by [Lucide](https://lucide.dev/)

## 📞 Support

For support, email support@buildify.com or create an issue in this repository.

---

**Buildify** - Build beautiful websites with ease! 🎨✨