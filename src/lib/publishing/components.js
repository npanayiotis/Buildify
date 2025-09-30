/**
 * Publishing Components
 * Reusable components for the publishing system
 */

// ========================================
// COMPONENT GENERATORS
// ========================================

export function generateHeaderComponent(websiteData) {
  const { name, logo, navigation } = websiteData;

  return {
    type: "header",
    content: `
      <header class="navbar">
        <div class="nav-container">
          <a href="/" class="nav-logo">
            ${logo ? `<img src="${logo}" alt="${name}" />` : name}
          </a>
          <nav class="nav-menu">
            ${
              navigation
                ?.map(
                  (item) =>
                    `<a href="${item.url}" class="nav-link">${item.label}</a>`
                )
                .join("") || ""
            }
          </nav>
        </div>
      </header>
    `,
  };
}

export function generateHeroComponent(websiteData) {
  const { hero } = websiteData;

  return {
    type: "hero",
    content: `
      <section class="hero">
        <div class="container">
          <h1 class="hero-title">${hero?.title || "Welcome"}</h1>
          <p class="hero-subtitle">${hero?.subtitle || ""}</p>
          ${
            hero?.cta
              ? `<a href="${hero.cta.url}" class="btn">${hero.cta.text}</a>`
              : ""
          }
        </div>
      </section>
    `,
  };
}

export function generateFooterComponent(websiteData) {
  const { footer } = websiteData;

  return {
    type: "footer",
    content: `
      <footer class="footer">
        <div class="container">
          <p>&copy; ${new Date().getFullYear()} ${
      websiteData.name || "Website"
    }. All rights reserved.</p>
          ${
            footer?.links
              ? `
            <div class="footer-links">
              ${footer.links
                .map((link) => `<a href="${link.url}">${link.label}</a>`)
                .join("")}
            </div>
          `
              : ""
          }
        </div>
      </footer>
    `,
  };
}

export function generateSectionComponent(sectionData) {
  const { type, title, content, columns } = sectionData;

  let sectionContent = "";

  switch (type) {
    case "text":
      sectionContent = `
        <div class="section">
          <div class="container">
            <h2 class="section-title">${title || ""}</h2>
            <div class="section-content">
              ${content || ""}
            </div>
          </div>
        </div>
      `;
      break;

    case "columns":
      sectionContent = `
        <div class="section">
          <div class="container">
            <h2 class="section-title">${title || ""}</h2>
            <div class="grid grid-cols-${columns?.length || 3}">
              ${
                columns
                  ?.map(
                    (col) => `
                <div class="col">
                  <h3>${col.title || ""}</h3>
                  <p>${col.content || ""}</p>
                </div>
              `
                  )
                  .join("") || ""
              }
            </div>
          </div>
        </div>
      `;
      break;

    case "cards":
      sectionContent = `
        <div class="section">
          <div class="container">
            <h2 class="section-title">${title || ""}</h2>
            <div class="grid grid-cols-3">
              ${
                content
                  ?.map(
                    (card) => `
                <div class="card">
                  <div class="card-body">
                    <h3>${card.title || ""}</h3>
                    <p>${card.description || ""}</p>
                    ${
                      card.image
                        ? `<img src="${card.image}" alt="${card.title}" />`
                        : ""
                    }
                  </div>
                </div>
              `
                  )
                  .join("") || ""
              }
            </div>
          </div>
        </div>
      `;
      break;

    default:
      sectionContent = `
        <div class="section">
          <div class="container">
            <h2 class="section-title">${title || ""}</h2>
            <div class="section-content">
              ${content || ""}
            </div>
          </div>
        </div>
      `;
  }

  return {
    type: "section",
    content: sectionContent,
  };
}

export function generateContactFormComponent(formData) {
  const { fields, submitText = "Send Message" } = formData;

  return {
    type: "contact-form",
    content: `
      <div class="contact-form">
        <form id="contact-form">
          ${
            fields
              ?.map((field) => {
                switch (field.type) {
                  case "text":
                  case "email":
                    return `
                  <div class="form-group">
                    <label class="form-label" for="${field.name}">${
                      field.label
                    }</label>
                    <input 
                      type="${field.type}" 
                      id="${field.name}" 
                      name="${field.name}" 
                      class="form-input" 
                      ${field.required ? "required" : ""}
                    />
                  </div>
                `;
                  case "textarea":
                    return `
                  <div class="form-group">
                    <label class="form-label" for="${field.name}">${
                      field.label
                    }</label>
                    <textarea 
                      id="${field.name}" 
                      name="${field.name}" 
                      class="form-input" 
                      rows="5"
                      ${field.required ? "required" : ""}
                    ></textarea>
                  </div>
                `;
                  default:
                    return "";
                }
              })
              .join("") || ""
          }
          <button type="submit" class="btn">${submitText}</button>
        </form>
      </div>
    `,
  };
}

// ========================================
// COMPONENT ASSEMBLER
// ========================================

export function assemblePageComponents(websiteData, pageData) {
  const components = [];

  // Add header
  components.push(generateHeaderComponent(websiteData));

  // Add hero if it's the homepage
  if (pageData.path === "/" && websiteData.hero) {
    components.push(generateHeroComponent(websiteData));
  }

  // Add page sections
  if (pageData.sections) {
    pageData.sections.forEach((section) => {
      components.push(generateSectionComponent(section));
    });
  }

  // Add contact form if page has one
  if (pageData.contactForm) {
    components.push(generateContactFormComponent(pageData.contactForm));
  }

  // Add footer
  components.push(generateFooterComponent(websiteData));

  return components;
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

export function validateComponent(component) {
  if (!component.type || !component.content) {
    return {
      valid: false,
      error: "Component must have type and content",
    };
  }

  const validTypes = ["header", "hero", "footer", "section", "contact-form"];

  if (!validTypes.includes(component.type)) {
    return {
      valid: false,
      error: `Invalid component type: ${component.type}`,
    };
  }

  return {
    valid: true,
  };
}

export function sanitizeComponentContent(content) {
  // Basic HTML sanitization
  return content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "");
}

export default {
  generateHeaderComponent,
  generateHeroComponent,
  generateFooterComponent,
  generateSectionComponent,
  generateContactFormComponent,
  assemblePageComponents,
  validateComponent,
  sanitizeComponentContent,
};
