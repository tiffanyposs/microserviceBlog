import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';
import { randomBytes } from 'crypto';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  const comment = { id: commentId, content, postId: req.params.id };
  comments.push(comment);
  commentsByPostId[req.params.id] = comments;

  // event bus
  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: comment
  });

  res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
  console.log('Received Event', req.body.type);
  res.send({});
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});
