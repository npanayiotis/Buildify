// Template preview API that generates actual website preview images
export default function handler(req, res) {
  const { templateId } = req.query;

  if (!templateId) {
    return res.status(400).json({ error: "Template ID required" });
  }

  // Template-specific preview data
  const templatePreviews = {
    'personal-blog': {
      title: 'Personal Blog',
      category: 'blog',
      color: '#667eea',
      bgColor: '#ffffff',
      content: [
        { type: 'hero', text: 'Welcome to My Blog', color: '#ffffff', bgColor: '#667eea' },
        { type: 'post', text: 'The Art of Slow Living', color: '#2d3748', bgColor: '#f8f9fa' },
        { type: 'post', text: 'Lessons from Travel', color: '#2d3748', bgColor: '#f8f9fa' },
        { type: 'post', text: 'Building Better Habits', color: '#2d3748', bgColor: '#f8f9fa' }
      ]
    },
    'modern-startup': {
      title: 'Modern Startup',
      category: 'saas',
      color: '#667eea',
      bgColor: '#ffffff',
      content: [
        { type: 'hero', text: 'Build Something Amazing', color: '#ffffff', bgColor: '#667eea' },
        { type: 'feature', text: 'Lightning Fast', color: '#2d3748', bgColor: '#f8f9fa' },
        { type: 'feature', text: 'Beautiful Design', color: '#2d3748', bgColor: '#f8f9fa' },
        { type: 'feature', text: 'Easy to Use', color: '#2d3748', bgColor: '#f8f9fa' }
      ]
    },
    'creative-portfolio': {
      title: 'Creative Portfolio',
      category: 'portfolio',
      color: '#8b5cf6',
      bgColor: '#ffffff',
      content: [
        { type: 'hero', text: 'Creative Portfolio', color: '#ffffff', bgColor: '#8b5cf6' },
        { type: 'project', text: 'Project 1', color: '#2d3748', bgColor: '#f8f9fa' },
        { type: 'project', text: 'Project 2', color: '#2d3748', bgColor: '#f8f9fa' },
        { type: 'project', text: 'Project 3', color: '#2d3748', bgColor: '#f8f9fa' }
      ]
    },
    'ecommerce-fashion': {
      title: 'Fashion Store',
      category: 'ecommerce',
      color: '#ec4899',
      bgColor: '#ffffff',
      content: [
        { type: 'hero', text: 'Fashion Store', color: '#ffffff', bgColor: '#ec4899' },
        { type: 'product', text: 'Product 1', color: '#2d3748', bgColor: '#f8f9fa' },
        { type: 'product', text: 'Product 2', color: '#2d3748', bgColor: '#f8f9fa' },
        { type: 'product', text: 'Product 3', color: '#2d3748', bgColor: '#f8f9fa' }
      ]
    },
    'restaurant-menu': {
      title: 'Restaurant Menu',
      category: 'restaurant',
      color: '#dc2626',
      bgColor: '#ffffff',
      content: [
        { type: 'hero', text: 'Delicious Food', color: '#ffffff', bgColor: '#dc2626' },
        { type: 'menu', text: 'Appetizers', color: '#2d3748', bgColor: '#f8f9fa' },
        { type: 'menu', text: 'Main Course', color: '#2d3748', bgColor: '#f8f9fa' },
        { type: 'menu', text: 'Desserts', color: '#2d3748', bgColor: '#f8f9fa' }
      ]
    },
    'business-corporate': {
      title: 'Business Corporate',
      category: 'business',
      color: '#1e40af',
      bgColor: '#ffffff',
      content: [
        { type: 'hero', text: 'Professional Business', color: '#ffffff', bgColor: '#1e40af' },
        { type: 'service', text: 'Our Services', color: '#2d3748', bgColor: '#f8f9fa' },
        { type: 'service', text: 'About Us', color: '#2d3748', bgColor: '#f8f9fa' },
        { type: 'service', text: 'Contact', color: '#2d3748', bgColor: '#f8f9fa' }
      ]
    }
  };

  const template = templatePreviews[templateId] || templatePreviews['personal-blog'];

  // Generate SVG preview
  const svg = `
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${template.color};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${template.color}dd;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Background -->
      <rect width="100%" height="100%" fill="${template.bgColor}"/>
      
      <!-- Hero Section -->
      <rect x="0" y="0" width="400" height="80" fill="url(#heroGradient)"/>
      <text x="200" y="45" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="${template.content[0].color}" text-anchor="middle">${template.content[0].text}</text>
      
      <!-- Content Sections -->
      <rect x="20" y="100" width="110" height="60" fill="${template.content[1].bgColor}" stroke="#e5e7eb" stroke-width="1" rx="4"/>
      <text x="75" y="125" font-family="Arial, sans-serif" font-size="10" fill="${template.content[1].color}" text-anchor="middle">${template.content[1].text}</text>
      
      <rect x="150" y="100" width="110" height="60" fill="${template.content[2].bgColor}" stroke="#e5e7eb" stroke-width="1" rx="4"/>
      <text x="205" y="125" font-family="Arial, sans-serif" font-size="10" fill="${template.content[2].color}" text-anchor="middle">${template.content[2].text}</text>
      
      <rect x="280" y="100" width="110" height="60" fill="${template.content[3].bgColor}" stroke="#e5e7eb" stroke-width="1" rx="4"/>
      <text x="335" y="125" font-family="Arial, sans-serif" font-size="10" fill="${template.content[3].color}" text-anchor="middle">${template.content[3].text}</text>
      
      <!-- Additional content rows -->
      <rect x="20" y="180" width="110" height="60" fill="${template.content[1].bgColor}" stroke="#e5e7eb" stroke-width="1" rx="4"/>
      <text x="75" y="205" font-family="Arial, sans-serif" font-size="10" fill="${template.content[1].color}" text-anchor="middle">${template.content[1].text}</text>
      
      <rect x="150" y="180" width="110" height="60" fill="${template.content[2].bgColor}" stroke="#e5e7eb" stroke-width="1" rx="4"/>
      <text x="205" y="205" font-family="Arial, sans-serif" font-size="10" fill="${template.content[2].color}" text-anchor="middle">${template.content[2].text}</text>
      
      <rect x="280" y="180" width="110" height="60" fill="${template.content[3].bgColor}" stroke="#e5e7eb" stroke-width="1" rx="4"/>
      <text x="335" y="205" font-family="Arial, sans-serif" font-size="10" fill="${template.content[3].color}" text-anchor="middle">${template.content[3].text}</text>
      
      <!-- Template name -->
      <text x="20" y="270" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#374151">${template.title}</text>
      <text x="20" y="285" font-family="Arial, sans-serif" font-size="10" fill="#6b7280">${template.category}</text>
    </svg>
  `;

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=31536000');
  res.status(200).send(svg);
}
