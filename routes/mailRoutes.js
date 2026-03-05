import express from "express"
import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

const router = express.Router()

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

/* CONTACT FORM */
router.post("/contact", async (req, res) => {
  try {

    const { name, email, phone, message } = req.body

    /* EMAIL TO RESTAURANT */

    const adminMail = {
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: "New Contact Form Message",
      html: `
        <h3>New Contact Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    }

    await transporter.sendMail(adminMail)

    /* AUTO REPLY TO CUSTOMER */

    const customerReply = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thanks for contacting Cafe Namasthe",
      html: `
        <h2>Thank you for contacting Cafe Namasthe!</h2>

        <p>Hello ${name},</p>

        <p>
        We have received your message and our team will get back to you shortly.
        We appreciate you reaching out to us.
        </p>

        <p>
        If your inquiry is urgent, feel free to call us at
        <b>(385) 287-7544</b>.
        </p>

        <br/>

        <p>Warm regards,</p>
        <p><b>Cafe Namasthe Team</b></p>
        <p>1438 E Main St Suite #12, Lehi, UT</p>
      `,
    }

    await transporter.sendMail(customerReply)

    res.json({ success: true })

  } catch (error) {

    console.error("Mail error:", error)
    res.status(500).json({ success: false })

  }
})

/* NEWSLETTER */
router.post("/newsletter", async (req, res) => {
  const { email } = req.body

  const mailOptions = {
    from: process.env.EMAIL_USER,
    replyTo: email,
    to: process.env.EMAIL_USER,
    subject: "New Newsletter Subscription",
    html: `<p>${email} subscribed to mailing list.</p>`,
  }

  await transporter.sendMail(mailOptions)

  res.json({ success: true })
})

/* CATERING FORM */
router.post("/catering", async (req, res) => {
  const { name, phone, email, eventDate, guests, message } = req.body

  const mailOptions = {
    from: process.env.EMAIL_USER,
    replyTo: email,
    to: process.env.EMAIL_USER,
    subject: "New Catering Request",
    html: `
      <h3>Catering Request</h3>
      <p><b>Name:</b> ${name}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Event Date:</b> ${eventDate}</p>
      <p><b>Guests:</b> ${guests}</p>
      <p><b>Message:</b> ${message}</p>
    `,
  }

  await transporter.sendMail(mailOptions)

  res.json({ success: true })
})

export default router