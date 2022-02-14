const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var app = express()

const { Pool } = require('pg');
var pool = new Pool({
    connectionString: process.env.DATABASE_URL || "postgres://postgres:Postgress@localhost/Recs"
})
  
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))
app.get('/database',(req,res)=>{
    var getUsersQuery = `SELECT * FROM rectangles`;
    pool.query(getUsersQuery, (error,result) => {
        if (error) {
            res.end(error)
        }
        else {
            // data ?
            var data = { results : result.rows };
            res.render('pages/db', data);
        }
    })
    
   
    
})

  app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
