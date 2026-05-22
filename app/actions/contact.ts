"use server";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  isPrayer: boolean;
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

    // In production, you would send an email here using a service like:
    // - Resend (recommended for Vercel)
    // - SendGrid
    // - Nodemailer with SMTP
    
    // For now, we'll log the submission and return success
    console.log("Contact form submission:", {
      name: data.name,
      email: data.email,
      message: data.message,
      isPrayer: data.isPrayer,
      timestamp: new Date().toISOString(),
    });

    // You can add email sending logic here when ready:
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'Hosanna Church <no-reply@hosannachurch.com>',
    //   to: 'iglesia.hosanna@gmail.com',
    //   subject: data.isPrayer ? 'New Prayer Request' : 'New Contact Form Submission',
    //   html: `
    //     <h2>${data.isPrayer ? 'Prayer Request' : 'Contact Form'}</h2>
    //     <p><strong>Name:</strong> ${data.name}</p>
    //     <p><strong>Email:</strong> ${data.email}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${data.message}</p>
    //   `,
    // });

    return { success: true };
  } catch (error) {
    console.error("Contact form error:", error);
    return { success: false, error: "Failed to submit form. Please try again." };
  }
}
