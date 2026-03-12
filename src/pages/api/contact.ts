import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const message = formData.get("message")?.toString().trim();
  const services = formData.get("services")?.toString().trim();

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: "All fields are required." }), {
      status: 400,
    });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: import.meta.env.GMAIL_USER,
      pass: import.meta.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"ericvdub.com" <${import.meta.env.GMAIL_USER}>`,
      to: "ericsvanwagoner@gmail.com",
      replyTo: email,
      subject: `New Contact: ${name}${services ? ` — ${services}` : ""}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        services ? `Services: ${services}` : "",
        "",
        `Message:`,
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Email send error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to send email." }),
      { status: 500 }
    );
  }
};
