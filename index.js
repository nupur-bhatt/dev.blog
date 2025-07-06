import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req,res)=>{
    var date = new Date();
    var year = date.getFullYear();
    res.render("index.ejs", res.locals ={
        title : "dev.blog",
        currentYear: year
    });
}); 

app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
});