/**
 * Notification System
 * Handles email and SMS notifications for publishing events
 */

import sgMail from "@sendgrid/mail";

// ========================================
// CONFIGURATION
// ========================================

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@elevare.com";
const FROM_NAME = process.env.FROM_NAME || "Elevare Platform";

// ========================================
// EMAIL NOTIFICATIONS
// ========================================

export async function sendEmailNotification(to, subject, html, text = null) {
  try {
    const msg = {
      to,
      from: {
        email: FROM_EMAIL,
        name: FROM_NAME,
      },
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ""), // Strip HTML for text version
    };

    await sgMail.send(msg);

    return {
      success: true,
      messageId: msg.messageId,
    };
  } catch (error) {
    console.error("Send email notification error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function sendPublishingSuccessNotification(
  userEmail,
  websiteData
) {
  const subject = "🎉 Your website is now live!";
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Website Published Successfully</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #3B82F6, #8B5CF6); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .btn { display: inline-block; background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Congratulations!</h1>
          <p>Your website "${
            websiteData.name
          }" is now live and accessible to the world!</p>
        </div>
        <div class="content">
          <h2>Your Website Details</h2>
          <p><strong>Website Name:</strong> ${websiteData.name}</p>
          <p><strong>URL:</strong> <a href="${websiteData.url}">${
    websiteData.url
  }</a></p>
          <p><strong>Published:</strong> ${new Date().toLocaleString()}</p>
          
          <h3>What's Next?</h3>
          <ul>
            <li>Share your website with your audience</li>
            <li>Monitor your analytics dashboard</li>
            <li>Update content regularly to keep visitors engaged</li>
            <li>Consider our premium services to enhance your site</li>
          </ul>
          
          <div style="text-align: center;">
            <a href="${websiteData.url}" class="btn">Visit Your Website</a>
          </div>
          
          <h3>Need Help?</h3>
          <p>Our support team is here to help you succeed. Contact us anytime for assistance with your website.</p>
        </div>
        <div class="footer">
          <p>Thank you for choosing Elevare Platform!</p>
          <p>This email was sent to ${userEmail}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmailNotification(userEmail, subject, html);
}

export async function sendPublishingFailureNotification(
  userEmail,
  websiteData,
  error
) {
  const subject = "⚠️ Website Publishing Issue";
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Publishing Issue</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #EF4444; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .btn { display: inline-block; background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .error-box { background: #FEF2F2; border: 1px solid #FECACA; padding: 15px; border-radius: 6px; margin: 15px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>⚠️ Publishing Issue</h1>
          <p>We encountered an issue while publishing your website "${
            websiteData.name
          }"</p>
        </div>
        <div class="content">
          <h2>Issue Details</h2>
          <div class="error-box">
            <p><strong>Error:</strong> ${
              error.message || "Unknown error occurred"
            }</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <h3>What We're Doing</h3>
          <ul>
            <li>Our technical team has been notified</li>
            <li>We're working to resolve the issue as quickly as possible</li>
            <li>You'll receive another email once the issue is resolved</li>
          </ul>
          
          <h3>What You Can Do</h3>
          <ul>
            <li>Check your website settings and try publishing again</li>
            <li>Contact our support team if the issue persists</li>
            <li>We're here to help you succeed</li>
          </ul>
          
          <div style="text-align: center;">
            <a href="mailto:support@elevare.com" class="btn">Contact Support</a>
          </div>
        </div>
        <div class="footer">
          <p>We apologize for any inconvenience. Our team is working to resolve this quickly.</p>
          <p>This email was sent to ${userEmail}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmailNotification(userEmail, subject, html);
}

export async function sendDomainSetupNotification(userEmail, domain, status) {
  const subject =
    status === "success"
      ? "✅ Custom Domain Setup Complete"
      : "⚠️ Custom Domain Setup Issue";

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Domain Setup ${status === "success" ? "Complete" : "Issue"}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: ${
          status === "success"
            ? "linear-gradient(135deg, #10B981, #059669)"
            : "#EF4444"
        }; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .btn { display: inline-block; background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${status === "success" ? "✅" : "⚠️"} Domain Setup ${
    status === "success" ? "Complete" : "Issue"
  }</h1>
          <p>Your custom domain "${domain}" ${
    status === "success" ? "is now active" : "needs attention"
  }</p>
        </div>
        <div class="content">
          ${
            status === "success"
              ? `
            <h2>🎉 Your Domain is Live!</h2>
            <p>Your custom domain <strong>${domain}</strong> is now successfully configured and pointing to your website.</p>
            
            <h3>Next Steps</h3>
            <ul>
              <li>Visit your website at <a href="https://${domain}">https://${domain}</a></li>
              <li>Share your professional domain with your audience</li>
              <li>Set up email forwarding if needed</li>
            </ul>
            
            <div style="text-align: center;">
              <a href="https://${domain}" class="btn">Visit Your Website</a>
            </div>
          `
              : `
            <h2>Domain Setup Issue</h2>
            <p>We encountered an issue while setting up your custom domain <strong>${domain}</strong>.</p>
            
            <h3>Common Solutions</h3>
            <ul>
              <li>Check your DNS settings</li>
              <li>Ensure domain is not already in use</li>
              <li>Verify domain registration is active</li>
            </ul>
            
            <div style="text-align: center;">
              <a href="mailto:support@elevare.com" class="btn">Contact Support</a>
            </div>
          `
          }
        </div>
        <div class="footer">
          <p>${
            status === "success"
              ? "Thank you for choosing Elevare Platform!"
              : "We're here to help you resolve this issue."
          }</p>
          <p>This email was sent to ${userEmail}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmailNotification(userEmail, subject, html);
}

// ========================================
// SMS NOTIFICATIONS (Future Implementation)
// ========================================

export async function sendSMSNotification(phoneNumber, message) {
  // This would integrate with SMS providers like Twilio
  // For now, we'll just log the message
  console.log(`SMS to ${phoneNumber}: ${message}`);

  return {
    success: true,
    message: "SMS notification logged (not implemented)",
  };
}

// ========================================
// WEBHOOK NOTIFICATIONS
// ========================================

export async function sendWebhookNotification(webhookUrl, data) {
  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(
        `Webhook failed: ${response.status} ${response.statusText}`
      );
    }

    return {
      success: true,
      status: response.status,
    };
  } catch (error) {
    console.error("Webhook notification error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// ========================================
// NOTIFICATION QUEUE
// ========================================

export class NotificationQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
  }

  add(notification) {
    this.queue.push({
      id: Date.now() + Math.random(),
      ...notification,
      timestamp: new Date(),
    });

    if (!this.processing) {
      this.process();
    }
  }

  async process() {
    this.processing = true;

    while (this.queue.length > 0) {
      const notification = this.queue.shift();

      try {
        await this.sendNotification(notification);
      } catch (error) {
        console.error("Failed to send notification:", error);
        // Retry logic could be implemented here
      }
    }

    this.processing = false;
  }

  async sendNotification(notification) {
    switch (notification.type) {
      case "email":
        return sendEmailNotification(
          notification.to,
          notification.subject,
          notification.html,
          notification.text
        );
      case "sms":
        return sendSMSNotification(
          notification.phoneNumber,
          notification.message
        );
      case "webhook":
        return sendWebhookNotification(
          notification.webhookUrl,
          notification.data
        );
      default:
        throw new Error(`Unknown notification type: ${notification.type}`);
    }
  }
}

// Global notification queue instance
export const notificationQueue = new NotificationQueue();

export default {
  sendEmailNotification,
  sendPublishingSuccessNotification,
  sendPublishingFailureNotification,
  sendDomainSetupNotification,
  sendSMSNotification,
  sendWebhookNotification,
  NotificationQueue,
  notificationQueue,
};
