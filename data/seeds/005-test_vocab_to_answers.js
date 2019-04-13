
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('vocab_to_answers').del()
    .then(function () {
      // Inserts seed entries
      return knex('vocab_to_answers').insert([
        {phrase_id: 2, answer_id: 1},
        {phrase_id: 2, answer_id: 2},
      ]);
    });
};
