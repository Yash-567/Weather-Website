const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
app.use(express.static(path.join(__dirname,'../public')))//provides app the path for all the files to be uploaded to the site i.e. images, html, css and js if we need an output to be seen when running app in browser terminal
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath =  path.join(__dirname,'../templates/partials')
app.set('view engine', 'hbs')//tells js file that use files in 'views' folder that should be in the location we provided using app.use(express.static(whatever))
app.set('views', viewsPath)//tells js file to check files to use as the /pages in new path instead of views
hbs.registerPartials(partialsPath)//hbs declared for this statement only and this tells the js file to register the given location as the location of partials
app.get('', (req,res)=>{
    res.render('index',{
        title: 'Weather' ,
        name: 'Yash Sonar'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About' ,
        name: 'Yash Sonar'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name: 'Yash Sonar',
        help:'this is the help message'
    })
})
app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            Error: 'Please provide an address!'
        })
    }
    geocode(req.query.address, (Error, {latitude,longitude,location} = {}) => {
        if(Error){
            return res.send({
                Error
            })
        }
        forecast(latitude,longitude, (Error, forecastData) => {
            if(Error){
                return res.send({
                    Error
                })
            }
            console.log(latitude,longitude);
            res.send({
                location,
                forecast : forecastData,
                address: req.query.address
            })
        })
    })
})
app.get('/help/*',(req,res) =>{
    res.render('404',{
        title: '404',
        name: 'Yash Sonar',
        errorMessage:'Help article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Yash Sonar',
        errorMessage:'Page not found'
    })
})
app.listen(port, () => {
    console.log('Server is up on port '+ port)
})