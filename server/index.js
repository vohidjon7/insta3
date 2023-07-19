const express = require("express");
const dot = require("dotenv");
const cors = require("cors");
const pool = require("./db/db");
dot.config();
const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  try {
    const { login, email, password } = req.body;
    let user1 = await pool.query(
      "SELECT * FROM foydalanuvchi WHERE login = ($1)",
      [login]
    );
    if (!login || !email || !password) {
      return res.json({ xato: "Malumotlarni to`liq kiriting" });
    }
    if (user1.rows[0]) {
      return res.json({ xato: "Bunday loginli foydalanuvchi mavjud" });
    } else {
      let user = await pool.query(
        "INSERT INTO foydalanuvchi(login,email,password) VALUES($1,$2,$3) RETURNING *",
        [login, email, password]
      );
      res.send(user.rows[0]);
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { login, password } = req.body;
    let user = await pool.query(
      "SELECT * FROM foydalanuvchi WHERE login = ($1)",
      [login]
    );
    if (!login || !password) {
      return res.json({ xato: "Malumotlarni to`liq kiriting" });
    }
    if (!user.rows[0]) {
      return res.json({ xato: "Foydalanuvchi topilmadi" });
    }
    if (user.rows[0].password != password) {
      return res.json({ xato: "Password xato" });
    } else {
      res.send(user.rows[0]);
    }
  } catch (error) {
    console.log(error);
  }
});
app.get("/get-user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let user = await pool.query("SELECT * FROM foydalanuvchi WHERE id = ($1)", [
      id,
    ]);
    res.send(user.rows[0]);
  } catch (error) {
    console.log(error);
  }
});
app.put("/edit-profil/:id", async (req, res) => {
  try {
    const { login, email, password, bio, img } = req.body;
    const { id } = req.params;
    if (!login || !email || !password) {
      return res.json({ xato: "Malumotlarni to`liq kiriting" });
    } else {
      let user = await pool.query(
        "UPDATE foydalanuvchi SET login = ($1), email = ($2), password = ($3), bio = ($4), foydalanuvchi_img = ($5) WHERE id = ($6)",
        [login, email, password, bio, img, id]
      );
      res.send(user.rows);
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/add-post/:id", async (req, res) => {
  try {
    const { img, post } = req.body;
    const { id } = req.params;
    if (img.length >= 300) {
      return res.json({ xato: "300 tadan kam busin" });
    }
    if (!img || !post || !id) {
      return res.json({ xato: "Malumotlarni to`liq kiriting" });
    } else {
      let data = await pool.query(
        "INSERT INTO post(img_url,post,user_id) VALUES($1,$2,$3) RETURNING *",
        [img, post, id]
      );
      console.log(data.rows);
      res.send(data.rows);
    }
  } catch (error) {
    console.log(error);
  }
});
app.get("/get-post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let data = await pool.query("SELECT * FROM post WHERE user_id = ($1)", [
      id,
    ]);
    res.send(data.rows);
  } catch (error) {
    console.log(error);
  }
});

app.put("/edit-post/:id", async (req, res) => {
  try {
    const { img_url, post } = req.body;
    const { id } = req.params;
    if (img_url.length >= 300) {
      return res.json({ xato: "300 tadan kam busin" });
    }
    if (!img_url || !post) {
      return res.json({ xato: "Malumotlarni to`liq kiriting" });
    } else {
      let user = await pool.query(
        "UPDATE post SET img_url=($1),post = ($2) WHERE id = ($3)",
        [img_url, post, id]
      );
      res.send(user.rows);
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/get-post1/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let data = await pool.query("SELECT * FROM post WHERE id = ($1)", [id]);
    res.send(data.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/delete-post", async (req, res) => {
  const { id, user_id } = req.body;
  try {
    let data = await pool.query("DELETE FROM post WHERE id = ($1)", [id]);
    let data1 = await pool.query("SELECT * FROM post WHERE user_id = ($1)", [
      user_id,
    ]);
    res.send(data1.rows);
  } catch (error) {
    console.log(error);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is runnig");
});
