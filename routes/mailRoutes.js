import express from "express"
import dotenv from "dotenv"
import { Resend } from "resend"

dotenv.config()

const router = express.Router()

const resend = new Resend(process.env.RESEND_API_KEY)

router.post("/contact", async (req, res) => {

  try {

    const { name, email, phone, message } = req.body

    await resend.emails.send({
      from: "Cafe Namasthe <onboarding@resend.dev>",
      to: ["cafenamasthelehi@gmail.com"],
      subject: "New Contact Form Message",
      html: `
        <h3>New Contact Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Message:</b> ${message}</p>
      `
    })

    await resend.emails.send({
      from: "Cafe Namasthe <onboarding@resend.dev>",
      to: [email],
      subject: "Thanks for contacting Cafe Namasthe",
      html: `
        <h2>Thank you for contacting Cafe Namasthe!</h2>
        <p>Hello ${name},</p>
        <p>We received your message and will respond shortly.</p>
      `
    })

    res.json({ success: true })

  } catch (error) {

    console.error(error)
    res.status(500).json({ success: false })

  }

})

export default router