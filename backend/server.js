import express from 'express';
import mongoose from 'mongoose';
import Pusher from 'pusher';
import cors from 'cors';
import mongoMessages from './messageModel.js';


// app config
const app = express();
const port = process.env.PORT || 9000 ;

const pusher = new Pusher({
    appId: "1183405",
    key: "470f630b8e55cfd2fd2c",
    secret: "97469c804c36e303e3d9",
    cluster: "mt1",
    useTLS: true
  });

// middlewares
app.use(express.json());
app.use(cors());


// db config
const mongoURI = 'mongodb+srv://admin:Admin123@cluster0.2l8df.mongodb.net/nawSocialeDatabase?retryWrites=true&w=majority'
mongoose.connect(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.once('open', ()=> {
    console.log('Conncected ye rojla !');

    const chnageStream = mongoose.connection.collection('messages').watch();
    chnageStream.on('change', (change)=> {
        pusher.trigger('messages', 'newMessage', {
            'change': change
          });
    })
})


// api routes
app.get('/',
    (req, res)=> res.status(200).send('Hello there !'));

app.post('/save/message', (req, res)=> {
    const dbMessage = req.body;

    mongoMessages.create(dbMessage, (err, data)=> {
        if (err) {
            res.status(500).send(err);

        } else {
            res.status(201).send(data);
            
        }
    })
})

app.get('/retrieve/conversation', (req, res)=> {
    mongoMessages.find((err, data)=> {
        if (err) {
            res.status(500).send(err);

        } else {
            data.sort((b, a) => {
                return a.timestamp - b.timestamp;
            });

            res.status(200).send(data);
            
        } 
    })
})


// listen
app.listen(port, 
    ()=> console.log(`Listening on localhost: ${port}`));
