import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

// ONE POST EXAMPLE
// {
//   'abc123': {
//     id: 'abc123',
//     title: 'post title',
//     comments: [
//       { id: '23f23', content: 'comment content' },
//     ]
//   }
// }
const posts = {}

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId } = data;
    posts[postId].comments.push({
      id, content
    });
  }

  res.send({});
});

app.listen(4002, () => {
  console.log('Listening on 4002');
});
