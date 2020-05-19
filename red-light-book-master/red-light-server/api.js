require('dotenv').config();

const express = require("express");
const Database = require("better-sqlite3");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");

const auth = require("./middleware/authentication");
const chapter = require("./routes/chapters");
const section = require("./routes/sections");
const tip = require("./routes/tips");
const tipextra = require("./routes/tipextras");

const db = new Database("./db/red-light.db", { verbose: console.log });
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// CHAPTERS
app.get("/chapters", (req, res) => {
  chapter.getChapters(req, res, db);
});
app.post("/chapter/add", auth.checkAuth, (req, res) => {
  chapter.addChapter(req, res, db);
});
app.delete("/chapter/delete", auth.checkAuth, (req, res) => {
  chapter.deleteChapter(req, res, db);
});
app.put("/chapter/update", auth.checkAuth, (req, res) => {
  chapter.updateChapter(req, res, db)
});

// CHAPTER SECTIONS
app.get('/sections', (req, res) => {
  section.getSections(req, res, db);
});
app.post("/section/add", auth.checkAuth, (req, res) => {
  section.addSection(req, res, db);
});
app.delete("/section/delete", auth.checkAuth, (req, res) => {
  section.deleteSection(req, res, db);
});
app.put("/section/update", auth.checkAuth, (req, res) => {
  section.updateSection(req, res, db)
});


// TIPS
app.get('/tips/:sectionid', (req, res) => {
  tip.getTips(req, res, db);
});
app.post("/tip/add", auth.checkAuth, (req, res) => {
  tip.addTip(req, res, db);
});
app.delete("/tip/delete", auth.checkAuth, (req, res) => {
  tip.deleteTip(req, res, db);
});
app.put("/tip/update", auth.checkAuth, (req, res) => {
  tip.updateTip(req, res, db);
});

// TIP EXTRA
app.get('/tipextras/:tipid', (req, res) => {
  tipextra.getTipExtra(req, res, db);
});
app.post("/tipextra/add", auth.checkAuth, (req, res) => {
  tipextra.addTipExtra(req, res, db);
});
app.delete("/tipextra/delete", auth.checkAuth, (req, res) => {
  tipextra.deleteTipExtra(req, res, db);
});
app.put("/tipextra/update", auth.checkAuth, (req, res) => {
  tipextra.updateTipExtra(req, res, db);
});

// signup method -- using bcryp
// not included because only Dr. Shulman should use this as of now
app.post("/signup/", (req, res) => {
  let user = req.body.user;
  let pass = req.body.pass;
  let stmt = db.prepare("INSERT INTO users(user, pass) VALUES(?,?)");
  bcrypt.hash(pass, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err
      });
    } else {
      try {
        stmt.run(user, hash);
        res.json("User '" + user + "' added");
      } catch (err) {
        console.log(err);
        res.json("Error adding user. User may already exist.");
      }
    }
  });
});

// login request and returns an accessToken
// refreshToken is saved in cookies
// the refreshToken is saved as httpOnly
// httpOnly will prevent security risks
app.post("/login/", (req, res) => {
  const user = req.body.user;
  const pass = req.body.pass;
  // get user pass from db
  const row = db.prepare("SELECT * from users WHERE user=?").get(user);
  if (row) {
    bcrypt.compare(pass, row.pass, (err, result) => {
      if (!err && result) {
        const accessToken = auth.createAccessToken(row);
        const refreshToken = auth.createRefreshToken(row);

        res.cookie("jwtrt", refreshToken, {
          httpOnly: true
        });

        return res.status(200).json({
          message: "Authentication successful",
          accessToken: accessToken
        });
      } else {
        res.json("Error loggin in");
      }
    });
  } else {
    res.json("Error logging in");
  }
});

// clear the refresh token so user can logout
app.post("/logout/", (req, res) => {
  try {
    res.clearCookie("jwtrt");
    res.json("User Logged Out");
  } catch (err) {
    console.log(err);
    res.json("Unexpected error clearing cookies");
  }
});

// handles jwt token refresh
// ensure user exists (pass in through body)
// ensure token is valid (passed in from cookies, if no cookies, no refresh)
// if those conditions true, return a new accessToken and refreshes cookie.
app.post("/refreshtoken/", (req, res) => {
  const user = req.body.user;
  const token = req.cookies.jwtrt;

  let error = 0;
  const row = db.prepare("SELECT * from users WHERE user=?").get(user);

  if (token && row) {
    try {
      jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
      const accessToken = auth.createAccessToken(row);
      const refreshToken = auth.createRefreshToken(row);
      res.cookie("jwtrt", refreshToken, {
        httpOnly: true
      });
      return res.status(200).json({
        message: "Authentication successful",
        accessToken: accessToken
      });
    } catch (err) {
      console.log(err);
      error = err;
    }
  } else {
    return res.send({ ok: false, accessToken: '' });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
