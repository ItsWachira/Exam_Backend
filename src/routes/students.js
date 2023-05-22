/**
 * Module dependencies
 */

import crypto from "crypto";
import { Router } from "express";
import { OAuth2Client } from "google-auth-library";
import nodemailer from "nodemailer";
import { Auth, Database } from "../controllers.js";
import { Student } from "../models.js";
import { Debug } from "../utilities.js";

const router = Router();
const db = new Database(Student);

const { sign, student } = Auth;

/**
 * Login with username and password
 */

router.post("/login/email", (req, res) => {
  db.findOne({ username: req.body.username }, (error, student) => {
    if (error) return res.status(error.code).json(error.message);

    // check if username exists
    if (!student) {
      const error = "Username does not exist";
      Debug.auth(["Login", error]);
      return res.status(404).json({ code: 404, message: error });
    }

    // check if password matches
    student.comparePassword(req.body.password, (error, valid) => {
      if (error) return res.status(500).json(error);

      if (!valid) {
        const error = "Password is incorrect";
        Debug.auth(["Login", error]);
        return res.status(404).json({ code: 404, message: error });
      }

      const token = sign({ _id: student._id, student: true });
      const user = { token, name: student.name, auth: "email" };
      Debug.auth(["Login", "[Student] success"]);

      res.json(user);
    });
  });
});

/**
 * Login with Google
 */

router.post("/login/google", async (req, res) => {
  const client = new OAuth2Client();

  try {
    const ticket = await client.verifyIdToken({ idToken: req.body.token });

    const payload = ticket.getPayload();

    const { email, given_name, family_name } = payload;

    db.findOne({ username: email }, (error, student) => {
      if (error) return res.status(error.code).json(error.message);

      // check if username (google email) exists
      if (!student) {
        Debug.auth(["Login", "Google", "Username does not exist"]);

        const name = { first: given_name, last: family_name };

        return db.create(
          { username: email, password: "Google", name },
          (error, student) => {
            if (error) return res.status(error.code).json(error.message);

            const token = sign({ _id: student._id, student: true });
            const user = { token, name: student.name, auth: "google" };
            Debug.auth(["Register", "Google", "Successful"]);

            return res.json(user);
          }
        );
      }

      const token = sign({ _id: student._id, student: true });
      const user = { token, name: student.name, auth: "google" };
      Debug.auth(["Login", "Google", "Successful"]);

      res.json(user);
    });
  } catch (error) {
    Debug.auth(["Google", "Login Failed"]);
    console.log(error);
    res.status(500).json({ error });
  }
});

/**
 * Register
 */

router.post("/register", (req, res) => {
  db.create(req.body, (error, student) => {
    if (error) return res.status(error.code).json(error.message);

    const token = sign({ _id: student._id, student: true });
    const user = { token, name: student.name, auth: "email" };
    Debug.auth(["Register", "Email", "Successful"]);

    res.json(user);
  });
});

/**
 * Forgot Password
 */

router.post("/password/forgot", (req, res) => {
  const { username, code } = req.body;

  db.findOne({ username }, (error, student) => {
    if (error) return res.status(error.code).json(error.message);

    if (code) {
      if (student.resetPasswordCode === code) {
        // success
        Debug.auth(["Forgot Password", "Valid code"]);
        return res.json(true);
      }

      // failed
      const error = "Invalid code";
      Debug.auth(["Forgot Password", error]);
      return res.status(404).json({ code: 404, message: error });
    }

    // check if username exists
    if (!student) {
      const error = "Username does not exist";
      Debug.auth(["Forgot Password", error]);
      return res.status(404).json({ code: 404, message: error });
    }

    // generate code, send email and save code to database
    const { EMAIL_HOST, EMAIL_PORT, EMAIL_AUTH_USER, EMAIL_AUTH_PASSWORD } =
      process.env;

    const transport = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      auth: {
        user: EMAIL_AUTH_USER,
        pass: EMAIL_AUTH_PASSWORD,
      },
    });

    const resetCode = crypto.randomInt(9999);

    const message = {
      from: "noreply@set2score.com",
      to: username,
      subject: "Password Reset",
      text: `Use the below code to reset your password.\n${resetCode}`,
    };

    student.resetPasswordCode = resetCode;
    student.save();

    transport.sendMail(message, (err, success) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ code: 500, message: "Failed to send email" });
      }

      Debug.auth(["Forgot Password", "Email sent"]);
      res.json(success);
    });
  });
});

/**
 * Change Password
 */

router.post("/password/change", (req, res) => {
  const { username, password } = req.body;

  if (username) {
    return db.updateOne({ username }, { password }, (error, student) => {
      if (error) return res.status(error.code).json(error.message);
      res.json({ success: true });
    });
  }
});

/**
 * View Profile
 */

router.get("/profile", student, (req, res) => {
  db.findById(
    req.user._id,
    (error, student) => {
      if (error) return res.status(error.code).json(error.message);
      res.json(student);
    },
    { fields: "username name mobile" }
  );
});

export default router;
