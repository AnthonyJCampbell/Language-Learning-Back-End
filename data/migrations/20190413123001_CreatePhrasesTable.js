
exports.up = function(knex, Promise) {
  return knex.schema.createTable('phrases', table => {
    table.increments('phrase_id')
    table.string('phrase_eng')
      .notNullable()
    table.string('phrase_esp')
      .notNullable();
    table.string('phrase_esp_gender')
    table.string('phrase_esp_plural')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('phrases');
};