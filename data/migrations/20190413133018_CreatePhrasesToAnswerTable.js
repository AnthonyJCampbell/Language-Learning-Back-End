
exports.up = function(knex, Promise) {
  return knex.schema.createTable('phrases_to_answers', table => {
    table
      .integer('phrase_id')
      .notNullable()
      .unsigned()
      .references('phrase_id')
      .inTable('phrases')

    table
      .integer('answer_id')
      .notNullable()
      .unsigned()
      .references('answer_id')
      .inTable('answers')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('phrases_to_answers');
};