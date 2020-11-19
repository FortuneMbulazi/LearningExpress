import express from "express";
import favicon from "serve-favicon";
import path from "path";
import data from "./data/data.json";

const app = express();
const PORT = 3000;

//this is for public folder
app.use(express.static("public"));

//Method to use json
// app.use(express.json());
app.use(express.urlencoded({extended: true}));

//This is for proxy
app.set("trust proxy", "loopback");

//this is for images folder
app.use("/images", express.static("images"));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.get("/", (req, res) => {
    // GET DATA FIRST 
    res.json(data);
});

//JSON data
//{"hello": "JSON is cool"}
//URLEncoded data
// hello=URLEncoded+is+cool

app.post("/newItem", (req, res) =>{
    console.log(req.body);
    res.send(req.body);
});

app.get("/item/:id", (req, res, next) => {
    //this is the middleware that pulls the data
    console.log(req.params.id);
    let user = Number(req.params.id);
    console.log(user);
    console.log(data[user]);
    //middleware that uses the request object
    console.log(`Request from: ${req.originalUrl}`);
    console.log(`Request type: ${req.method}`);
    //Everything above is middleware
    res.send(data[user]);
    next();
}, (req, res) =>{
    console.log("Did you get the right data")
}
)


app.route("/item")
    .get((req, res) => {
        //throw new Error();
        //res.download("images/rocket.jpg");
        //res.redirect("http://linkedin.com");
        //res.end();
        res.send(`a put request with /item route on port ${PORT}`);
    })
    .put((req, res) => 
        res.send(`a put request with /newitem route on port ${PORT}`)
     )
    .delete((req, res) => 
        res.send(`a delete request with /item route on port ${PORT}`)
 );

 // Error handling function
 app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`Red alert! Red alert!: ${err.stack}`);
 });

app.listen(PORT, () =>{
    console.log(`your server is running on port ${PORT}`);
    console.log(data);
}
);
