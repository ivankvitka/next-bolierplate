const express = require('express');
const next = require('next');
const routes = require('./routes');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const handler = routes.getRequestHandler(app);

/* eslint no-console:0 */
app.prepare()
  .then(() => {
    const server = express();
    console.log(process.env.PORT);

    server.set('port', process.env.PORT || 3000);

    server.use(handler);

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(server.get('port'), (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${server.get('port')}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
