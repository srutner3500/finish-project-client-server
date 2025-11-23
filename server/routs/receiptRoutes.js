// server/routs/receiptRoutes.js
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
  console.log("==== /api/receipt called ====");
  console.log("Request body:", req.body);

  const { email, items, totalPrice } = req.body;

  if (!email || !items || !items.length) {
    console.log("Missing email or items");
    return res.status(400).json({ message: "Missing email or items" });
  }

  try {
    // יצירת transporter עם Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // המייל של העסק
        pass: process.env.EMAIL_PASS  // App Password
      },
      tls: {
    rejectUnauthorized: false
  }
    });

    // הכנת HTML למוצרים
    const itemsHtml = items.map(
      item => `<li>${item.productName} - ${item.quantity} x ₪${item.price} = ₪${item.price * item.quantity}</li>`
    ).join("");

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email, // המייל של המשתמש שמקבל את הקבלה
      subject: "קבלה על רכישתך",
      html: `
        <h2>תודה על הקנייה!</h2>
        <ul>${itemsHtml}</ul>
        <h3>סה"כ לתשלום: ₪${totalPrice}</h3>
      `
    };

    // שליחת מייל
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Send mail error:", error);
        return res.status(500).json({ message: "Error sending email", error });
      }
      console.log("Email sent:", info.response);
      res.status(200).json({ message: "Receipt sent" });
    });

  } catch (err) {
    console.error("Catch error:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

module.exports = router;
