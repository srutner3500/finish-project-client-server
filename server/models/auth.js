const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./models/user");
const SECRET = process.env.JWT_SECRET || "secret123";

router.post("/google", async (req, res) => {
  try {
    const { uid, displayName, email, photoURL } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // האם המשתמש קיים?
    let user = await User.findOne({ email });

    if (!user) {
      // אם לא קיים – ליצור משתמש חדש

      user = await User.create({
        userName: uid,                 // חייב unique – אז נשתמש ב-uid
        password: await bcrypt.hash(uid, 10), // סיסמה דמה (לא נכנסת בשימוש)
        name: displayName || "No Name",
        email: email,
        roles: "User"
      });
    }

    // יצירת JWT
    const token = jwt.sign(
      {
        id: user._id,
        userName: user.userName,
        name: user.name,
        email: user.email,
        roles: user.roles
      },
      SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });

  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
