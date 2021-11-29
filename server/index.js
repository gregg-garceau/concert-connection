require('dotenv/config');
const pg = require('pg');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);

const jsonMiddleware = express.json();

app.use(jsonMiddleware);

app.use(errorMiddleware);

app.get('/api/events', (req, res, next) => {
  const userId = 1;
  const sql = `
    select *
      from "events"
     where "userId" = $1
  order by "eventId";
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/events', (req, res, next) => {
  const userId = 1;
  const { eventName, artistName, venueName, eventLocation, eventDate, covidRisk, resultId } = req.body;
  const sql = `
    insert into "events" ("userId", "eventName", "artistName", "venueName", "eventLocation", "eventDate", "covidRisk", "resultId")
         values ($1, $2, $3, $4, $5, $6, $7, $8)
      returning *
  `;
  const params = [userId, eventName, artistName, venueName, eventLocation, eventDate, covidRisk, resultId];
  db.query(sql, params)
    .then(result => {
      const [event] = result.rows;
      res.status(201).json(event);
    })
    .catch(err => next(err));
});

app.delete('/api/events/:resultId', (req, res, next) => {
  const userId = 1;
  const { resultId } = req.body;

  const sql = `
    delete from "events"
    where ("resultId" = $1 AND "userId" = $2)
    returning *;
  `;

  const params = [resultId, userId];

  db.query(sql, params)
    .then(result => {
      const event = result.rows;
      res.status(201).json(event);
    })
    .catch(err => next(err));
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
