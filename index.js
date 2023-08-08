const express = require('express')
const fs = require('fs')
const users = require('./Products_DB.json')

const app = express();
// Middleware - it pass form data to body
app.use(express.urlencoded({ extended: false }))


//Routes
app.get('/api/products', (req, res) => {
    res.send(users)
})
app.get('/api/products/:userId', (req, res) => {
    const id = Number(req.params.userId)
    const data = users.find(el => el.id === id)
    res.send(data)
})

app.post('/api/products/', (req, res) => {
    const body = req.body
    users.push({ ...body, id: users.length + 1 })
    fs.writeFile('./Products_DB.json', JSON.stringify(users), (err, data) => {
        res.send({ status: "success", id: users.length })
    })
})
app.patch('/api/products/:id', (req, res) => {
    const body = req.body
    const id = Number(req.params.id)
    const newUsers = users.map(el => {
        if (el.id === id) {
            el.first_name = body.first_name
            el.last_name = body.last_name
            el.email = body.email
            el.gender = body.gender
            el.job_title = body.job_title
        }
        return el
    })
    fs.writeFile('./Products_DB.json', JSON.stringify(newUsers), (err, data) => {
        res.send({ status: "success", id: users.length })
    })
})

app.delete('/api/products/:id', (req, res) => {
    const body = req.body
    const id = Number(req.params.id)
    const newUsers = users.filter(el => el.id !== id)
    fs.writeFile('./Products_DB.json', JSON.stringify(newUsers), (err, data) => {
        res.send({ status: "success" })
    })
})
const PORT = 8000
app.listen(PORT, () => {
    console.log(`server started at ${PORT}`)
})