//load libs
const express = require('express')
const hbs = require('express-handlebars')
const fetch = require('node-fetch')
const withQuery = require('with-query').default

//configure to env
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000;

//express instance and handlebars
const app = express(); 
app.engine('hbs',hbs({defaultLayout: 'default.hbs'}))
app.set('view engine', 'hbs')

//config app
app.get('/',(req,res)=>{
    res.status(200)
    res.type('text/html')
    res.render('index')
})

//access to statics file
app.use(express.static(__dirname + '/static'))


//start the server
app.listen(PORT,()=>{
    console.log('app is running on port',PORT);
})