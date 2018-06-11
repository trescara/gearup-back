// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost:/gear_up'
  },

  production: {
    client: 'pg',
    connection: 'process.env.DATABASE_URL'
  }

};
