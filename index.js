import express from 'express';
import { createServer } from "http";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With,Content,Accept,Content-Type,Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET,POST,DELETE,PATCH,OPTIONS'
    );
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

app.get(`/app`, function (req, res) {
	res.status(200).json({msg: `It's a GET request.`});
});

const port = 4000;
const httpServer = createServer(app);

httpServer.listen(process.env.PORT || port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });