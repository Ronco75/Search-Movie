const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const { query } = require("express");
const fetch = require("node-fetch");

const PORT = process.env.port || 3000;

//bodyParser
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

//EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));


//Set today date
let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
let yyyy = today.getFullYear();
today = dd + "/" + mm + "/" + yyyy;


app.get("/", (req, res) => {
    res.render("search", {
        todayDate: today
    });
});

app.post('/movies', (req, res) => {
    var userSearch = req.body.userSearch;
    console.log(userSearch);

    res.redirect("movies");


    app.get('/movies', (req, res) => {

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=2e003b0ce1fa329d3ab031ae957988b8&query=${userSearch}`)
        .then(res => res.json())
        .then(data => res.render('movies', {
            todayDate: today,
                userSearch: userSearch,
                data: data
            }));
        });
        
});




app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});