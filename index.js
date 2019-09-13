const mysql= require('mysql');
const express = require('express');
var app=express();
const bodyparser = require('body-parser');
const PORT=3500;
app.use(bodyparser.json());

var mysqlConn=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database: 'ToyStore',
    multipleStatements: true
});

mysqlConn.connect((err)=>{
    if(!err)
    console.log("db is working");
    else
    console.log(JSON.stringify(err,undefined,2));
});



app.listen(PORT,()=>console.log('express'));


// getting product details from the database
app.get('/toystore/getproducts',(req,res)=> {
    mysqlConn.query('select * from Products',(err,rows,fields)=>{
        if(!err)
        {
        res.send(rows);
        }
        else
        console.log(err);
    })
});



// get all the uers
app.get('/t',(req,res)=> {
    mysqlConn.query('select * from Users',(err,rows,fields)=>{
        if(!err)
        {
        res.send(rows);
        }
        else
        console.log(err);
    })
});

// get the specific user

app.get('/t/u/:id',(req,res)=> {
    mysqlConn.query('select * from Users where Uid = ?',[req.params.id],(err,rows,fields)=>{
        if(!err)
        {
         {
        res.send(rows);
        
          }
        }
        else
        console.log("deleted");
    })
});

// delete the specific user

app.delete('/t/u/:id',(req,res)=> {
    mysqlConn.query('delete from Users where Uid = ?',[req.params.id],(err,rows,fields)=>{
        if(!err)
        {
        res.send("deleted");
        
        }
        else
        console.log(err);
    })
});

// insert the specific user

app.post('/',(req,res)=> {
    let user=req.body;
    var sql = "SET @Uid=?; SET @Email=?; SET @Password=?; SET @Phone=?; \
    CALL UsersAddOrEdit(@Uid,@Email,@Password,@Phone);";
    mysqlConn.query(sql,[user[0].Uid, user[0].Email,user[0].Password,user[0].Phone],(err,rows,fields)=>{
        if(!err)
        {
            res.send(rows[4][0]);
        // rows.forEach(element => {
        //     if(element.constructor== Array)
        //     res.send(element[0].Uid);
        // });
        }
        else
        console.log(err);
    })
    
});



app.get('/',(req,res)=> {
  res.send('Hello world');  
});