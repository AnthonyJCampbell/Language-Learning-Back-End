
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('vocabulary').del()
    .then(function () {
      // Inserts seed entries
      return knex('vocabulary').insert([
        {
          phrase_id: 1,
          phrase_eng: 'car', 
          phrase_esp: 'coche', 
          phrase_esp_gender: 'male', 
          phrase_esp_plural: 'los coches'
        },
        {
          phrase_id: 2,
          phrase_eng: 'bicycle', 
          phrase_esp: 'bicicleta', 
          phrase_esp_gender: 'female', 
          phrase_esp_plural: 'las bicicletas'
        },
        {
          phrase_id: 3,
          phrase_eng: 'shoe', 
          phrase_esp: 'zapato', 
          phrase_esp_gender: 'male', 
          phrase_esp_plural: 'los zapatos'
        },
      ]);
    });
};
