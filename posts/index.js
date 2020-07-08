import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';
import { randomBytes } from 'crypto';

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex'); // create random id
  const { title } = req.body;
  posts[id] = { id, title };

  // event bus
  await axios.post('http://localhost:4005/events', {
    type: 'PostCreated',
    data: {
      id,
      title,
    }
  });

  res.status(201).send(posts[id]);
});

app.post('/events', async (req, res) => {
  console.log('Received Event', req.body.type);
  res.send({});
});

app.listen(4000, () => {
  console.log('Listening on 4000');
});
