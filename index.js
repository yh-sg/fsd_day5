//load libs
const express = require('express')
const hbs = require('express-handlebars')
const fetch = require('node-fetch')
const withQuery = require('with-query').default

//configure to env
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000;
const API_KEY = process.env.API_KEY
const URL = 'https://newsapi.org/v2/top-headlines'

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

app.get('/result', (req,res)=>{
    res.status(200)
    res.type('text/html')
    res.render('result')
})

/************** Breakdown the url **************/
//!https://newsapi.org/v2/top-headlines
//?country=de
//&q=trump
//&category=business
//&apiKey=b09895f28f3f4851906803ecf2cddd79

app.post('/index',
    express.urlencoded({extended: true}), 
    (req,res,next)=>{
        console.log(req.body)
        const url = withQuery(
            URL,
            {
                q: req.body.search,
                country: req.body.country,
                category: req.body.category,
                apiKey: API_KEY,
            }
        )
        console.log(url)
})

//access to statics file
app.use(express.static(__dirname + '/static'))


//start the server
app.listen(PORT,()=>{
    console.log('app is running on port',PORT);
})

// if(API_KEY)
//     app.listen(PORT, ()=>{
//         console.log(`App is running on ${PORT} at ${new Date()} key ${API_KEY}`);
//     })
// else
//     console.error('API_KEY is not set')