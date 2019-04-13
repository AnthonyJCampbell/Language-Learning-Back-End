
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('answers').del()
    .then(function () {
      // Inserts seed entries
      return knex('answers').insert([
        {answer_id: 1, answer_eng: 'bicycle', answer_esp: 'bicicleta' },
        {answer_id: 2, answer_eng: 'the bicycle is red', answer_esp: 'la bicicleta es roja'}
      ]);
    });
};
