exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('gear').del()
    .then(function () {
      // Inserts seed entries
      return knex('gear').insert([
        { id: 1, gear_type: 'tent', category: 'camp', owner: '', available: true, cost_per_day: 5, manufacturer: 'Coleman', renter: '', image_url: '' },
        { id: 2, gear_type: 'harness', category: 'climb', owner: '', available: true, cost_per_day: 5, manufacturer: 'Black Diamond', renter: '', image_url: '' },
        { id: 3, gear_type: 'bicycle', category: 'cycle', owner: '', available: true, cost_per_day: 25, manufacturer: 'Giant', renter: '', image_url: '' },
        { id: 4, gear_type: 'kayak', category: 'paddle', owner: '', available: true, cost_per_day: 30, manufacturer: 'REI', renter: '', image_url: '' },
        { id: 5, gear_type: 'snowboard', category: 'snow', owner: '', available: true, cost_per_day: 5, manufacturer: 'Burton', renter: '', image_url: '' },
        { id: 6, gear_type: 'backpack', category: 'hike', owner: '', available: true, cost_per_day: 2, manufacturer: 'Patagonia', renter: '', image_url: '' },
      ]);
    });
  .then(function () {
    // Moves id column (PK) auto-incrementer to correct value after inserts
    return knex.raw("SELECT setval('gear_id_seq', (SELECT MAX(id) FROM gear))")
  })
};