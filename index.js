const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const exphbs = require('express-handlebars');
const PORT = process.env.PORT || 3000;
const todoRouters = require('./routers/todo');

const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(todoRouters);

async function start() {
    try{
        await mongoose.connect('mongodb+srv://user:user@cluster0.onoopb9.mongodb.net/todo',{
        })
        app.listen(PORT, ()=>{
            console.log('STARTED!');
        })
    }catch (e) {
        console.log(e);
    }
}

start()