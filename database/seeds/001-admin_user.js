
exports.seed = function(knex) {
  return knex('users')
    .truncate()
    .then(function () {
      return knex('users').insert([
        {username: 'Admin', password: 'Isitasecret?keepitsafe'}
      ]);
    });
};
