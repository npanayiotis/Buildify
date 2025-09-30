import prisma from "../../../lib/prisma/client";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      name,
      email,
      phone,
      subject,
      message,
      preferredContact,
      websiteType,
      websiteId,
      submittedAt,
    } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    // Save to database
    const contact = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject,
        message,
        preferredContact: preferredContact || "email",
        websiteType: websiteType || "general",
        websiteId: websiteId || null,
        status: "new",
        submittedAt: submittedAt ? new Date(submittedAt) : new Date(),
      },
    });

    // TODO: Send email notification to admin
    // TODO: Send confirmation email to user

    return res.status(200).json({
      success: true,
      message: "Contact form submitted successfully",
      contactId: contact.id,
    });
  } catch (error) {
    console.error("Contact form submission error:", error);
    return res.status(500).json({
      error: "Failed to submit contact form",
      details: error.message,
    });
  }
}
