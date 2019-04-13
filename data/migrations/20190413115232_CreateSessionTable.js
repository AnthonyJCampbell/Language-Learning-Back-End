exports.up = function(knex, Promise) {
  return knex.schema.createTable('sessions', sessions => {
    sessions
      .increments('session_id')
    sessions
      .integer('user_id', 126)
      .notNullable()
      .unsigned()
      .references('user_id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

      sessions
        .timestamp('start_of_session')
        .defaultTo(knex.fn.now())
        .notNullable();
      sessions
        .integer('length_of_session')
        .nullable();
      sessions
        .timestamp('end_of_session')
        .nullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('sessions');
};