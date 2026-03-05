import express from "express"
import dotenv from "dotenv"
import { Resend } from "resend"

dotenv.config()

const router = express.Router()

const resend = new Resend(process.env.RESEND_API_KEY)

/* CONTACT FORM */
router.post("/contact", async (req, res) => {

  try {

    const { name, email, phone, message } = req.body

    /* EMAIL TO RESTAURANT */

    await resend.emails.send({
      from: "Cafe Namasthe <contact@cafenamasthe.in>",
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

    /* AUTO REPLY TO CUSTOMER */

    await resend.emails.send({
      from: "Cafe Namasthe <contact@cafenamasthe.in>",
      to: [email],
      subject: "Thanks for contacting Cafe Namasthe",
      html: `
        <h2>Thank you for contacting Cafe Namasthe!</h2>
        <p>Hello ${name},</p>

        <p>
        We have received your message and our team will get back to you shortly.
        </p>

        <p>
        If your inquiry is urgent, feel free to call us at
        <b>(385) 287-7544</b>.
        </p>

        <br/>

        <p>Warm regards,</p>
        <p><b>Cafe Namasthe Team</b></p>
        <p>1438 E Main St Suite #12, Lehi, UT</p>
      `
    })

    res.json({ success: true })

  } catch (error) {

    console.error("Contact error:", error)
    res.status(500).json({ success: false })

  }

})


/* NEWSLETTER */
router.post("/newsletter", async (req, res) => {

  try {

    const { email } = req.body

    await resend.emails.send({
      from: "Cafe Namasthe <contact@cafenamasthe.in>",
      to: ["cafenamasthelehi@gmail.com"],
      subject: "New Newsletter Subscription",
      html: `<p>${email} subscribed to the mailing list.</p>`
    })

    res.json({ success: true })

  } catch (error) {

    console.error("Newsletter error:", error)
    res.status(500).json({ success: false })

  }

})


/* CATERING REQUEST */
router.post("/catering", async (req, res) => {

  try {

    const { name, phone, email, eventDate, guests, message } = req.body

    await resend.emails.send({
      from: "Cafe Namasthe <contact@cafenamasthe.in>",
      to: ["cafenamasthelehi@gmail.com"],
      subject: "New Catering Request",
      html: `
        <h3>Catering Request</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Event Date:</b> ${eventDate}</p>
        <p><b>Guests:</b> ${guests}</p>
        <p><b>Message:</b> ${message}</p>
      `
    })

    res.json({ success: true })

  } catch (error) {

    console.error("Catering error:", error)
    res.status(500).json({ success: false })

  }

})

export default router