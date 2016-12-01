var Creep = require("prototype.creep");

function Builder(creep, room){
    this.base = Creep;
    this.base(creep, room);
}
module.exports = Builder;
Builder.prototype = Object.create(Creep.prototype);

Builder.prototype.work = function(){
    var creep = this.creep;
    var target = creep.memory.target;
    
    creep.memory.target = findTarget(creep);
    target = Game.getObjectById(target.id);
    if(creep.memory.status == "build" && creep.carry.energy == 0){
        creep.memory.status = "withdraw"
    }
    if(creep.memory.status == "withdraw" && creep.carry.energy == creep.carryCapacity){
        creep.memory.status = "build";
    }
    
    if(creep.memory.status == "withdraw"){
        target = Game.getObjectById(target.id);
        if(target.ticksToRegeneration != undefined){
            if(creep.harvest(target) == ERR_NOT_IN_RANGE){
                creep.moveTo(target);
            }
        } else {
            if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(target);
            }
        }
    } else {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if(targets.length){
            if(ERR_NOT_IN_RANGE == creep.build(targets[0])){
                creep.moveTo(targets[0]);
            }
        }
    }
    
}

function findTarget(creep){
    var storage = creep.room.find(FIND_STRUCTURES, { filter: function(targets){ return targets.structureType == STRUCTURE_STORAGE; }});
    var container = creep.room.find(FIND_STRUCTURES, { filter: function(targets){ return targets.structureType == STRUCTURE_CONTAINER; }});
    storage = creep.pos.findClosestByRange(storage);
    container = creep.pos.findClosestByRange(container);
    var source = creep.pos.findClosestByRange(FIND_SOURCES);
    
    if(storage)
        return storage;
    if(container)
        return container;
    if(source)
        return source;
}