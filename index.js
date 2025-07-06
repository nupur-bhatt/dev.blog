import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
var postArray = [];
var mainTitle = "dev.blog";

app.get("/", (req,res)=>{
    var date = new Date();
    var year = date.getFullYear();
    res.render("index.ejs", res.locals = {
        title : mainTitle,
        currentYear: year,
        arraysBlog : postArray 
    });
}); 

app.post("/submit", (req,res)=>{
    postArray.push({
        author : req.body.author,
        blogTitle : req.body.blogTitle,
        content : req.body.content,
    });
    res.redirect('/');
});

app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
});