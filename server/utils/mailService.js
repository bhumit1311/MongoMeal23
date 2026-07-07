/**
 * Sends an email using the Resend API (HTTP) to bypass Render's SMTP blocks.
 * 
 * @param {Object} options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Text version of the body
 * @param {string} [options.html] - HTML version of the body (optional)
 */
const sendEmail = async ({ to, subject, text, html }) => {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.error('[Email Service] Error: RESEND_API_KEY is not configured in environment variables.');
    return;
  }

  console.log(`[Email Service] Email sending via Resend started to: ${to} (Subject: "${subject}")`);

  try {
    // We use standard Node.js fetch (port 443) to bypass Render's port 465 block
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // Resend's default testing address. 
        // Note: Unless you verify your own domain in Resend, you can only send emails TO the email address you signed up with.
        from: 'MongoMeals <onboarding@resend.dev>',
        to: [to],
        subject: subject,
        text: text,
        html: html || text.replace(/\n/g, '<br>')
      })
    });

    if (response.ok) {
      console.log(`[Email Service] Email sent successfully via Resend to: ${to}`);
    } else {
      const errorData = await response.json();
      console.error(`[Email Service] Resend API Error:`, errorData);
    }
  } catch (error) {
    console.error(`[Email Service] Network/Fetch error when sending to ${to}:`, error);
  }
};

module.exports = { sendEmail };
