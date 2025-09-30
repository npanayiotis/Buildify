import prisma from "../../../../lib/prisma/client";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { id } = req.query;
    const { status } = req.body;

    if (!["new", "in-progress", "resolved", "closed"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const contact = await prisma.contactSubmission.update({
      where: { id },
      data: { status },
    });

    return res.status(200).json({
      success: true,
      contact,
    });
  } catch (error) {
    console.error("Error updating contact status:", error);
    return res.status(500).json({
      error: "Failed to update contact status",
      details: error.message,
    });
  }
}
