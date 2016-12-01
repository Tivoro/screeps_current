var constructor = {
    run: function(creep){
        if(creep.carry.energy == 0){
            targets = creep.room.find(FIND_DROPPED_ENERGY, {
                filter: function(targets){ return targets.energy >= creep.energyCapacity }
            });
            if(targets.length){
                target = creep.pos.findClosestByRange(targets);
                if(creep.pickup(target) == ERR_NOT_IN_RANGE){
                    creep.moveTo(target);
                }
            } else {
                targets = creep.room.find(FIND_STRUCTURES,{
                    filter: function(targets){ return targets.structureType == STRUCTURE_STORAGE && targets.store[RESOURCE_ENERGY] > creep.carryCapacity } 
                });
                target = creep.pos.findClosestByRange(targets);
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
            } else {
               creep.moveTo(Game.flags["idleConstructors"]);
            }
        }
    },
    runPrimitive: function(creep){
        if(creep.memory.state == undefined){
            creep.memory.state = "harvest";
        }
        if(creep.memory.state == "build" && creep.carry.energy == 0){
            creep.memory.state = "harvest";
        }
        if(creep.memory.state =="harvest" && creep.carry.energy == creep.carryCapacity){
            creep.memory.state = "build";
        }
        
        if(creep.memory.state == "harvest"){
            targets = creep.room.find(FIND_SOURCES);
            if(targets[0]){
                if(creep.harvest(targets[0]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(targets[0]);
                }
            }
        } else {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length){
                if(ERR_NOT_IN_RANGE == creep.build(targets[0])){
                    creep.moveTo(targets[0]);
                }
            } else {
               creep.moveTo(Game.flags["idleConstructors"]);
            }
        }
    }
}

module.exports = constructor;