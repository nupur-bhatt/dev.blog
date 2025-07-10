import express from 'express';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import methodOverride from 'method-override';

const app = express();
const port = 3000;
var postsArray = [];
var mainTitle = "dev.blog";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.get("/", (req,res)=>{
    const editingId = req.query.edit;
    var year = new Date().getFullYear();
    res.render("index.ejs", res.locals = {
        title : mainTitle,
        currentYear: year,
        posts : postsArray,
        editingId: editingId 
    });
}); 

app.post("/post", (req,res)=>{
    const newPost = {
        id: uuidv4(),
        author : req.body.author,
        title : req.body.title,
        content : req.body.content,
    }
    postsArray.push(newPost);
    res.redirect('/');
});

app.put("/post/:id", (req,res)=>{
    const id = req.params.id; 
    postsArray = postsArray.map(post =>
    post.id === id
      ? {
          ...post,
          author: req.body.author,
          title: req.body.title,
          content: req.body.content,
        }
      : post
    );
    res.redirect("/");
});

app.delete("/post/:id", (req,res)=>{
    const id = req.params.id;
    postsArray = postsArray.filter(post => post.id !== id);
    res.redirect("/");

});

app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
});