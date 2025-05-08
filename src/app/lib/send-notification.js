import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  console.log('Email notification request received:', req.method, req.body);

  if (req.method !== 'POST') {
    console.log('Method not allowed - returning 405');
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { labName, updatedName, userEmail, originalData } = req.body;
    console.log('Processing notification for:', { labName, updatedName, userEmail });

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'arhamramay80@gmail.com',
        pass: 'Arham786;'
      },
    });

    // Verify connection
    try {
      await transporter.verify();
      console.log('Server is ready to take our messages');
    } catch (verifyError) {
      console.error('SMTP connection verification failed:', verifyError);
      throw new Error('SMTP connection failed');
    }

    // Email options with more detailed information
    const mailOptions = {
      from: '"Lab Space Update System" <arhamramay80@gmail.com>',
      to: 'arhamramay80@gmail.com',
      subject: `Lab Space Updated: ${labName}`,
      html: `
        <h2>Lab Space Data Updated</h2>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px;">
          <h3 style="color: #2c3e50;">Update Details</h3>
          <p><strong>Original Lab Name:</strong> ${labName}</p>
          <p><strong>New Lab Name:</strong> ${updatedName}</p>
          <p><strong>Updated By:</strong> ${userEmail}</p>
          <p><strong>Update Time:</strong> ${new Date().toLocaleString()}</p>
        </div>
        
        <div style="margin-top: 20px; background-color: #e8f4fd; padding: 15px; border-radius: 5px;">
          <h3 style="color: #2c3e50;">Original Data Snapshot</h3>
          <pre style="white-space: pre-wrap; font-family: monospace;">${JSON.stringify(originalData, null, 2)}</pre>
        </div>
        
        <p style="margin-top: 20px;">Please review these changes in the Airtable.</p>
      `,
    };

    console.log('Attempting to send email with options:', mailOptions);

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);

    res.status(200).json({ 
      success: true,
      messageId: info.messageId
    });
  } catch (error) {
    console.error('Full error sending email:', {
      message: error.message,
      stack: error.stack,
      response: error.response
    });
    res.status(500).json({ 
      message: 'Error sending notification email',
      error: error.message
    });
  }
}