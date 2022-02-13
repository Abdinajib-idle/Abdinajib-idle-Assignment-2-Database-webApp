const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const { Pool } = require('pg');
var pool;
pool = new Pool({
  connectionString:process.env.DATABASE_URL
})

var app =express()
  app.use(express.static(path.join(__dirname, 'public')))
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'ejs')
  app.get('/', (req, res) => res.render('pages/index'))
  

  app.get('/database', async(req,res)=>{

    // var getUsersQuery = `SELECT * FROM Rectangles`;
    // pool.query(getUsersQuery, (error,result) => {
    //     if (error) 
    //         res.end(error)
    //         var results={'rows':result.rows}
    //         res.render('pages/db',results)
    // })
    
    try {
        const result = await pool.query(`SELECT * FROM Rectangles`);
        const data = { results : result.rows };
        res.render('pages/db', data);
    }
    catch (error) {
         res.end(error);
    }
     
 })
 


  app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
