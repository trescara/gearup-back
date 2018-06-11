exports.up = function (knex, Promise) {
  return knex.schema.createTable('gear', table => {
    table.increments('id')
    table.text('gear_type')
    table.text('category')
    table.text('owner')
    table.bool('available')
    table.integer('cost_per_day')
    table.text('manufacturer')
    table.text('renter')
    table.text('image_url')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('gear')
}