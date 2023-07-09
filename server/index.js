const express = require('express');
const dot = require('dotenv');
const cors = require('cors')
const pool = require('./db/db');
dot.config()
const app = express()

app.use(express.json())
app.use(cors())

app.post('/register', async (req, res) => {
    try {
        const { login, email, password } = req.body;
        let user1 = await pool.query('SELECT * FROM foydalanuvchi WHERE login = ($1)', [login])
        if (!login || !email || !password) {
            return res.json({ xato: 'Malumotlarni to`liq kiriting' })
        } if (user1.rows[0]) {
            return res.json({ xato: 'Bunday loginli foydalanuvchi mavjud' })
        }
        else {
            let user = await pool.query('INSERT INTO foydalanuvchi(login,email,password) VALUES($1,$2,$3) RETURNING *', [login, email, password])
            res.send(user.rows[0])
        }
    } catch (error) {
        console.log(error);
    }
})

app.post('/login', async (req, res) => {
    try {
        const { login, password } = req.body;
        let user = await pool.query('SELECT * FROM foydalanuvchi WHERE login = ($1)', [login])
        if (!login || !password) {
            return res.json({ xato: 'Malumotlarni to`liq kiriting' })
        } if (!user.rows[0]) {
            return res.json({ xato: 'Foydalanuvchi topilmadi' })
        } if (user.rows[0].password != password) {
            return res.json({ xato: 'Password xato' })
        } else {
            res.send(user.rows[0])
        }
    } catch (error) {
        console.log(error);
    }
})
app.get('/get-user/:id',async (req,res)=>{
    const {id} = req.params;
    try {
        let user = await pool.query('SELECT * FROM foydalanuvchi WHERE id = ($1)',[id])
        res.send(user.rows[0])
    } catch (error) {
        console.log(error);
    }
})
app.put('/edit-profil/:id', async (req, res) => {
    try {
        const { login, email, password, bio, img } = req.body;
        const {id} = req.params;
        if (!login || !email || !password) {
            return res.json({ xato: 'Malumotlarni to`liq kiriting' })
        }
        else {
            let user = await pool.query('UPDATE foydalanuvchi SET login = ($1), email = ($2), password = ($3), bio = ($4), foydalanuvchi_img = ($5) WHERE id = ($6)', [login, email, password, bio, img, id])
            res.send(user.rows)
        }
    } catch (error) {
        console.log(error);
    }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Server is runnig');
})