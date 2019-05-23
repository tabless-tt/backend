const bcrypt = require('bcryptjs')
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
  // .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'lambda', password: bcrypt.hashSync('password', 10)},
        {username: 'michael', password: bcrypt.hashSync('password', 10)},
        {username: 'irving', password: bcrypt.hashSync('password', 10)}
      ]);
    });
};
