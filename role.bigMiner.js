var Creep = require("role.prototype");

function bigMiner(creep,room){
    this.base = Creep;
    this.base(creep,room);
}
module.exports = bigMiner;
bigMiner.prototype = Object.create(Creep.prototype);

bigMiner.prototype.WORK = function(){
    var creep = this.creep;
    
    var sources = creep.room.find(FIND_SOURCES);
    if(!creep.memory.source){
        for(source in sources){
            var bigMiners = _.filter(Game.creeps, (creep) => (creep.memory.role == 'bigMiner') && (creep.memory.source == sources[source].id));
            if(bigMiners.length != 1){
                creep.memory.source = sources[source].id;
            }
        }
    }
    
    var source = Game.getObjectById(creep.memory.source)
    if(ERR_NOT_IN_RANGE == creep.harvest(source)){
        creep.moveTo(source);
    }
}