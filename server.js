const PORT = process.env.PORT || 3000
const favicon = require('serve-favicon')
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.static('public'))
const employees = [{
    fullName: 'joel', 
    city: 'gotham',
    email: 'saf@sd.se',
    salary: 5643334
}]

// Returns a middleware to serve favicon
app.use(favicon(__dirname + '/favicon.ico'));


app.get('/')




app.get('/employees', (req, res) => {
    res.json(employees)
})

app.post('/employees', (req, res) => {
    employees.push(req.body)
    res.send()
})

app.put('/employees/:orgEmail', (req, res) => {
    const orgEmail = req.params.orgEmail
    const { fullName, email, city, salary } = req.body
    console.log(email)
    const index = employees.findIndex(x => x.email === orgEmail)
    if (index > -1) {
        employees[index].fullName = fullName
        employees[index].email = email
        employees[index].city = city
        employees[index].salary = salary
        return res.send()
    }
    res.status(404).send()
})

app.delete('/employees/:email', (req, res) =>{
    const email = req.params.email
    const index = employees.findIndex((x) => x.email === email)
    if (index > -1) {
        employees.splice(index, 1)
        return res.send()
    }
    res.status(404).send()
})








app.listen(PORT, () => {
    console.log(`Listening to ${PORT}`)
})


