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
  order by "eventId"
  where "userId" = ${userId}
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/events', (req, res, next) => {
  const userId = 1;
  const { eventName, artistName, venueName, eventLocation, eventDate, covidRisk } = req.body;
  const sql = `
    insert into "events" ("userId", "eventName", "artistName", "venueName", "eventLocation", "eventDate", "covidRisk")
         values ($1, $2, $3, $4, $5, $6, $7)
      returning *
  `;
  const params = [userId, eventName, artistName, venueName, eventLocation, eventDate, covidRisk];
  db.query(sql, params)
    .then(result => {
      const [event] = result.rows;
      res.status(201).json(event);
    })
    .catch(err => next(err));
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
