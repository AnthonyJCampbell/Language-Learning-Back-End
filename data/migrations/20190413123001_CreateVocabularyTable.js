
exports.up = function(knex, Promise) {
  return knex.schema.createTable('vocabulary', users => {
    users.increments('phrase_id')
    users.string('phrase_eng')
      .notNullable()
    users.string('phrase_esp')
      .notNullable();
    users.string('phrase_esp_gender')
    users.string('phrase_esp_plural')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('vocabulary');
};