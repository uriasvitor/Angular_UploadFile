const knex = require("knex");

const database = knex({
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    port : 9090,
    user: "root",
    password: "123456",
    database: 'fileupload',
  },
});

module.exports = database