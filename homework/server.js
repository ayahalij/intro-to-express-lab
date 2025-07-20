const express = require('express')
const app=express()

app.listen(3000, ()=> {
    console.log('Intro to Express Lab ')
})


//Lab Exercise 1
app.get('/greetings/:username', (req,res) =>{
    console.log(req.params.username)
    res.send(`Hello there, ${req.params.username}!`)
})


//Lab Exercise 2
app.get('/roll/:num', (req,res) =>{
    console.log(req.params.num)
    req.params.num = parseInt(req.params.num, 10)

    if (isNaN(req.params.num)){
        res.send('You must specify a number')
    }

    else{
        console.log('It`s a number')
        const randomRoll=Math.floor(Math.random()*(req.params.num +1))       
        res.send(`You rolled a ${randomRoll}`)
    }
})


//Lab Exercise 3
const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

app.get('/collectibles/:index', (req,res) =>{
    req.params.index = parseInt(req.params.index, 10)
    console.log(req.params.index)
    const i = collectibles[req.params.index]

    if (i) {
        console.log('Array check')
        res.send(`So, you want the ${i.name}? For ${i.price}, it can be yours!`)
    }

    else{
        res.send('This item is not yet in stock. Check back soon!')
    }

})


//Using Query Parameters
app.get('/hello', (req, res) => {
    res.send(`Hello there, ${req.query.name}! I hear you are ${req.query.age} years old!`)
})


//Lab Exercise 4
const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req,res)=>{
    console.log(req.query)

    const min=parseFloat(req.query['min-price'])
    const max=parseFloat(req.query['max-price'])
    const type=req.query.type

    let display = shoes

    if (!isNaN(min)) {
        display=display.filter(shoe=>shoe.price >= min)
    }

    else if (!isNaN(max)) {
        display=display.filter(shoe=>shoe.price <= max)
    }

    else if (type) {
        display=display.filter(shoe=>shoe.type.toLowerCase()===type.toLowerCase())
    }

    res.json(display)
})




