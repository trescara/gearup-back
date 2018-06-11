const database = require("./database-connections");

module.exports = {
    list(){
      return database('gear')
    },
    read(id){
      return database('gear').where('id', id).first()
    },
    create(gear_card){
      return database('gear').insert(gear_card)
                                   .returning('*')
                                   .then(record => record[0])
    },
    update(id, gear_info){
      return database('gear').update(gear_info)
                                   .where('id', id)
                                   .returning('*')
                                   .then(record => record[0])
    },
    delete(id){
      return database('gear').delete().where('id', id)
    }
};
