
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {user_id: 1,username: 'john', email_address: 'john@gmail.com', password: '123'},
        {user_id: 2, username: 'mike', email_address: 'mike@hotmail.com', password: 'hunter2'},
        {user_id: 3, username: 'josh', email_address: 'john@protonmail.com', password: '8008s'}
      ]);
    });
};
