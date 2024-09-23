const express = require("express")
const app = express()
const port = 8080
const path = require("path")
const { v4: uuidv4 } = require('uuid');
// uuidv4(); 
// uuidv4() is function jha hum ise call karege vha ek autometic unique random id aa jaygi

app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, "views"))

app.use(express.static(path.join(__dirname, "public")))

let posts = [
    {
        // id: '1a',
        id: uuidv4(),
        username: "skill earn",
        content: 'i love coding'
    },
    {
        // id: '1b',
        id: uuidv4(),
        username: "sharuk",
        content: 'i love coder who will make design for all'
    },
    {
        // id: '1c',
        id: uuidv4(),
        username: "rahulKumar",
        content: 'i love coder who will teach coding to all'
    },
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts })
})



app.get("/posts/new", (req, res) => {  //it will render form
    res.render("new.ejs")
})

app.post("/posts", (req, res) => {
    // console.log(req.body)
    // console.log(req)
    let { username, content } = req.body;

    let id = uuidv4(); //create unique id in new posts also 
    posts.push({ id, username, content })

    // posts.push({ username, content })
    // res.send('post request send')
    res.redirect("/posts")

})
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    // console.log(id )
    let post = posts.find((p) => id === p.id) //find indivisual id from the posts and store in the variable posts and undefind will print on wrong id in console

    // console.log(post)
    // res.send("request working")
    res.render('show.ejs', { post }) // show error on wrong id

})

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params; //patch request me jo bhe id aai hogi usse deconstruct karke nikal rhe hai
    let newContent = req.body.content //for print the content isley isley request ki body me jo content hai usse ek variable me store kra deya
    // console.log(id)
    let post = posts.find((p) => id === p.id)
    post.content = newContent //post content ko humne reset kar deya apne post.content me
    console.log(post)
    res.send('patch request working')
})
//patch request ko directly bejne ki jagha hum hopscotch se patch request bejenge
//hoppscoth me patch request ko select karenge and then  body ke ander kis tarha ka data bejna hai vo select karnge Application/x-www-from-urlencoded data hum bejne wale hai
// uske baad request body aaygi jisme hum parameters and value ko bej sakte hai 
//uske baad hum url likenge http://locaalhost8080/posts/695f1379-3c8f-40b6-bcbd-0fe07752bdc5(id)


app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id)
    res.render('edit.ejs')
})


app.get("/", (req, res) => {
    res.send('serving working well')
})
app.listen(port, () => {
    console.log(`app is listean to port 8080`)
})