exports.up = function(knex, Promise) {
  return knex.schema.createTable('answers', table => {
    table.increments('answer_id')
    table.string('answer_eng').notNullable();
    table.string('answer_esp').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('answers');
};