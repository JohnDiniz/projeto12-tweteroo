import express from "express";
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors());

const usuarios = [];
const tweets = [];
console.log('initial')

app.post("/sign-up", (req, res) => {
    const newuser = req.body;
    if(newuser.username && newuser.avatar && typeof newuser.username == "string" && typeof newuser.avatar == "string"){
    usuarios.push(newuser);
    res.sendStatus(201).send(usuarios);}
    else{res.sendStatus(400).send('Todos os campos são obrigatórios!')}
})

app.post("/tweets", (req, res) => {
    const newtweet = req.body;
    if(newtweet.username && newtweet.tweet && typeof newtweet.username == "string" && typeof newtweet.tweet == "string"){
    const findUser = usuarios.find(user => user.username === newtweet.username);
    if (!findUser) {
        res.sendStatus(401).send('UNAUTHORIZED');
    }
    else {
        tweets.push(newtweet);
        res.sendStatus(201).send('OK');
    }}
    else{res.sendStatus(400).send('Todos os campos são obrigatórios!')}
})


app.get("/tweets", (req, res) => {
    const formateddata = [];
    for (let i = tweets.length - 1; i >= 0; i--) {
        const finduser = usuarios.findIndex(user => user.username === tweets[i].username)
        const data = {
            username: tweets[i].username,
            avatar: usuarios[finduser].avatar,
            tweet: tweets[i].tweet
        }
        formateddata.push(data);
    }
    if (formateddata.length > 10) {
        const lasttweets = []
        for (let i = formateddata.length - 10; i < formateddata.length; i++) {
            lasttweets.push(formateddata[i]);
        }
        res.send(lasttweets);
    }
    else {
        res.send(formateddata);
    }
})





app.listen(5000)