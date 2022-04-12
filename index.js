const express = require('express')
const app = express()
const mongoose = require('mongoose')
const CoffeeModel = require('./modules/Coffees')
const cors = require('cors')
const req = require('express/lib/request')

app.use(express.json())
app.use(cors())

mongoose.connect('mongodb+srv://newuser:KHOj9Mcm0wQJ0vL3@cluster0.rsqna.mongodb.net/coffe_test?retryWrites=true&w=majority' ,{
    useNewUrlParser: true
})

app.post('/insert', async(req,res) =>{
    const names  = req.body.names
    const amount = req.body.amount

    const coffee = new CoffeeModel({
        coffeeName: names, 
        amountCoffee: amount
    })
    
    try {
        await coffee.save()
        res.send('Data has been set')
    } catch (error) {
        console.log(error)
    }
})

app.get('/list', async(req, res) =>{
    CoffeeModel.find({}, (err, result) =>{
        if(err){
            res.send(err)
        }
        res.send(result)
    })
})

app.post('/update', async(req,res) =>{
    const newName  = req.body.newName
    const id = req.body.id
    try {
        await CoffeeModel.findById(id, (err, updatedCoffee) =>{
            updatedCoffee.coffeeName = newName
            updatedCoffee.save()
            res.send("updated")
        })
    } catch (error) {
        console.log(error)
    }
})

app.delete('/delete/:id', async(req, res) =>{
    const id = req.params.id
    await CoffeeModel.findByIdAndRemove(id).exec()
    res.send("deleted")
})

app.listen(3001, () => {
    console.log('Server running at')
})
