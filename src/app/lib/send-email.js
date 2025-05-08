import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const msg = {
      to: "arhamramay80@gmail.com",
      from: "your-email@example.com", 
      subject: "Lab Data Updated",
      text: "A user has updated the lab data.",
      html: "<strong>A user has updated the lab data.</strong>",
    };

    try {
      await sgMail.send(msg);
      return res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ error: "Failed to send email" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
