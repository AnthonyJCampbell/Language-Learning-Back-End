
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('sessions').del()
    .then(function () {
      // Inserts seed entries
      return knex('sessions').insert([
        {user_id: 1, end_of_session: knex.fn.now()},
        {user_id: 1, end_of_session: knex.fn.now()},
        {user_id: 2, end_of_session: knex.fn.now()},
      ]);
    });
};
