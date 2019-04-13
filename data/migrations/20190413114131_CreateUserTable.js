exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', users => {
    users
      .increments('user_id')
    users
      .string('username', 126)
      .notNullable()
      .unique();
    users
      .string('email_address', 256)
      .notNullable()
      .unique()
    users
      .string('password', 256)
      .notNullable();
    users
      .timestamp('last_session_at')
      .unsigned()
      .references('end_of_session')
      .inTable('sessions')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    users
      .timestamp('created_at')
      .defaultTo(knex.fn.now())
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};