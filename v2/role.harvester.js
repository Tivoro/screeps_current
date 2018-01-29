var Creep = require("prototype.creep");

function Harvester(creep, room){
    this.base = Creep;
    this.base(creep, room);
}
module.exports = Harvester;
Harvester.prototype = Object.create(Creep.prototype);

Harvester.prototype.work = function(){
    var creep = this.creep;
    if(creep.memory.status == "deposit" && creep.carry.energy == 0){
        creep.memory.status = "harvest";
    }
    if(creep.memory.status == "harvest" && creep.carry.energy == creep.carryCapacity){
        creep.memory.status = "deposit";
    }
    
    var sources = creep.room.find(FIND_SOURCES);
    if(!creep.memory.source){
        for(source in sources){
            var harvesters = _.filter(Game.creeps, (creep) => (creep.memory.role == 'harvester') && (creep.memory.source == source));
            if(harvesters.length != 1){
                creep.memory.source = source;
            }
        }
    }
    
    if(creep.memory.status == "harvest"){
        if(ERR_NOT_IN_RANGE == creep.harvest(sources[creep.memory.source])){
            creep.moveTo(sources[creep.memory.source]);
        }
    } else {
        var targets = creep.pos.findInRange(FIND_STRUCTURES, 2, {
            filter: function(structure){
                return (structure.structureType == STRUCTURE_CONTAINER)
            }
        });
        if(targets.length > 0){
            var target = creep.pos.findClosestByRange(targets);
            if(ERR_NOT_IN_RANGE == creep.transfer(target, RESOURCE_ENERGY)){
                creep.moveTo(target);
            }
        } else {
            var targets = creep.room.find(FIND_STRUCTURES, {
               filter: function(targets){
                   return targets.structureType == STRUCTURE_SPAWN || targets.structureType == STRUCTURE_EXTENSION;
               } 
            });
            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(targets[0]);
            }
        }
    }
}
