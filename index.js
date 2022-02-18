const { name } = require('ejs');
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var app = express()

const { Pool } = require('pg');
var pool = new Pool({
    connectionString: process.env.DATABASE_URL || "postgres://postgres:Postgress@localhost:5432/postgres"
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

app.get('/getData:uid',async (req,res)=>{
    var clickedName = req.params.uid

    try {
        
      const result = await pool.query(`SELECT * FROM RECTANGLES WHERE uid='${clickedName}'`);
      const data = { 'rows' : result.rows };
      res.render('pages/display.ejs', data);
    }
    catch (error) {
      res.send(error);
    }
  })
  

app.post('/addNewRectangle', (req,res)=>{
    console.log("post to /login")
    console.log(req.body.params)
    var uniqueId = req.params.uid
    let id=req.body.uid;
    let name=req.body.name;
    let width=req.body.width;
    let height=req.body.height;
    let color=req.body.color;
    var addRectangle=`INSERT INTO RECTANGLES VALUES('${id}','${name}','${width}','${height}','${color}')`
    pool.query(addRectangle,(error,result)=>{
        if (error) {
            res.end(error)
        }
        else {
            var data = { results : result.rows };
            res.redirect(req.protocol + '://' + req.get('host') + '/database')        }
    })
})
app.post('/updateChanges:id', (req,res)=>{
    console.log(req.body)
    console.log(req.params.id)
    let id=req.body.uid;
    let name=req.body.name;
    let width=req.body.width;
    let height=req.body.height;
    let color=req.body.color;
    var updateRectangle=`UPDATE Rectangles SET name='${name}', width='${width}', height='${height}',color='${color}' Where uid=` + req.params.id
    pool.query(updateRectangle,(error,result)=>{
        if (error) {
            res.end(error)
        }
        else {
            console.log(req.protocol + '://' + req.get('host') + '/database')
            res.redirect(req.protocol + '://' + req.get('host') + '/database')
        }
    })
})
app.post('/delete:id', async (req, res) => {
    let targetID=req.body.id
    var dl=`DELETE FROM Rectangles Where uid=`+ req.params.id 
    pool.query(dl,(error,result)=>{
        if (error) {
            res.end(error)
        }
        else {
            console.log(req.protocol + '://' + req.get('host') + '/database')
            res.redirect(req.protocol + '://' + req.get('host') + '/database')
        }
    })
})


  app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
