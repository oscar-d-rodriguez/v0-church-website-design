"use server";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  isPrayer: boolean;
}

interface NewsletterSignupData {
  email: string;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getMailConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "ocasta06@gmail.com";
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "Hosanna Church <onboarding@resend.dev>";

  return { apiKey, toEmail, fromEmail };
}

async function sendMailWithResend(payload: {
  replyTo: string;
  subject: string;
  html: string;
}) {
  const { apiKey, toEmail, fromEmail } = getMailConfig();

  if (!apiKey) {
    console.error("Missing RESEND_API_KEY. Email was not sent.");
    return {
      success: false as const,
      error: "Email service is not configured yet. Please try again later.",
    };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: payload.replyTo,
      subject: payload.subject,
      html: payload.html,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const details = await response.text();
    console.error("Resend send failure:", details);
    return {
      success: false as const,
      error: "We could not send your message right now. Please try again.",
    };
  }

  return { success: true as const };
}

export async function submitContactForm(data: ContactFormData) {
  try {
    // Validate the data
    if (!data.name || !data.email || !data.message) {
      return { success: false, error: "All fields are required" };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return { success: false, error: "Invalid email address" };
    }

    const safeName = escapeHtml(data.name.trim());
    const safeEmail = escapeHtml(data.email.trim());
    const safeMessage = escapeHtml(data.message.trim()).replaceAll("\n", "<br />");
    const kind = data.isPrayer ? "Prayer Request" : "Contact Form Submission";

    const sendResult = await sendMailWithResend({
      replyTo: data.email.trim(),
      subject: `${kind} - ${data.name.trim()}`,
      html: `
        <h2 style="margin:0 0 16px;">${kind}</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Type:</strong> ${data.isPrayer ? "Prayer" : "General Contact"}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    });

    if (!sendResult.success) {
      return { success: false, error: sendResult.error };
    }

    return { success: true };
  } catch (error) {
    console.error("Contact form error:", error);
    return { success: false, error: "Failed to submit form. Please try again." };
  }
}

export async function submitNewsletterSignup(data: NewsletterSignupData) {
  try {
    if (!data.email) {
      return { success: false, error: "Email is required" };
    }

    const email = data.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: "Invalid email address" };
    }

    const safeEmail = escapeHtml(email);
    const safeTimestamp = escapeHtml(new Date().toISOString());

    const sendResult = await sendMailWithResend({
      replyTo: email,
      subject: `Newsletter Signup - ${email}`,
      html: `
        <h2 style="margin:0 0 16px;">Newsletter Signup</h2>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Timestamp:</strong> ${safeTimestamp}</p>
      `,
    });

    if (!sendResult.success) {
      return { success: false, error: sendResult.error };
    }

    return { success: true };
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return {
      success: false,
      error: "Failed to subscribe right now. Please try again.",
    };
  }
}
