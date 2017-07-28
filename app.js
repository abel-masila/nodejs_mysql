const express=require('express');
const mysql=require('mysql');

//create connection
const db=mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'nodemysql'
});

//connect to db
db.connect((err)=>{
    if (err){
        throw err;
    }
    console.log("Mysql Connected!"); 
});

const app=express();

//Create Db from code
app.get('/createDb',(req,res)=>{
    let sql='CREATE DATABASE nodemysql';
    db.query(sql,(err,result)=>{
        if (err) throw err;
        console.log(result);
        res.send("Database created");
        
    });
});

//Create Table
app.get('/createPostTable',(req,res)=>{
    let sql='CREATE TABLE Posts(id int AUTO_INCREMENT,title varchar(255),body varchar(255), primary key(id))';
    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send("Post table created");
    });
});
//Insert into table
app.get('/insertToTable',(req,res)=>{
    let post={
        title:"post 1",
        body: "This is post Number 1"
    };
    let sql='INSERT INTO Posts SET ?';
    let query=db.query(sql,post,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send("Post added...");
    });
});
//Insert into table
app.get('/insertToTable1',(req,res)=>{
    let post={
        title:"post 2",
        body: "This is post Number 2"
    };
    let sql='INSERT INTO Posts SET ?';
    let query=db.query(sql,post,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send("Post added...");
    });
});

//select from db
app.get('/Posts',(req,res)=>{
    let sql="SELECT * FROM Posts";
    let query=db.query(sql,(err,results)=>{
        if(err) throw err;
        console.log(results);
        res.send("Posts fetched..");
    });
});
//Get specific post
app.get('/getPost/:id',(req,res)=>{
    let sql=`SELECT * FROM Posts WHERE id=${req.params.id}`;
    let query=db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send("Post fetched..");
    });
});

//Update post
app.get('/updatePost/:id',(req,res)=>{
    let Newtitle="New updated title";
    let sql=`UPDATE Posts set title='${Newtitle}' WHERE id=${req.params.id}`;
    let query=db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send("Post updated..");
    });
});

//Delete post
app.get('/DeletePost/:id',(req,res)=>{
    let Newtitle="New updated title";
    let sql=`DELETE FROM Posts WHERE id=${req.params.id}`;
    let query=db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send("Post Deleted..");
    });
});

app.listen('3000',()=>{
    console.log("server started on port  3000");
});