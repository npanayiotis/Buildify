// Simple placeholder image API route that generates SVG placeholders
export default function handler(req, res) {
  const { params } = req.query;

  if (!params || params.length < 2) {
    return res.status(400).json({ error: "Invalid parameters" });
  }

  const [width, height] = params;
  const text = params[2] || "Template Preview";
  const backgroundColor = params[3] || "667eea";
  const textColor = params[4] || "ffffff";

  // Generate SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#${backgroundColor}"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="14" fill="#${textColor}" text-anchor="middle" dy=".3em">${text}</text>
    </svg>
  `;

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "public, max-age=31536000");
  res.status(200).send(svg);
}
