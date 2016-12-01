var repairer = {
    run: function(creep){
        if(creep.carry.energy == 0){
            targets = creep.room.find(FIND_STRUCTURES,{
               filter: function(targets){ return targets.structureType == STRUCTURE_CONTAINER && targets.store[RESOURCE_ENERGY] > creep.carryCapacity } 
            });
            if(targets.length){
                target = creep.pos.findClosestByRange(targets);
                if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(target);
                }
            }
        } else {
            var structure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
               filter: function(structure){
                    if(structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART){
                        return structure.hits < structure.hitsMax;
                    }
               } 
            });
            if(structure){
                if(ERR_NOT_IN_RANGE == creep.repair(structure)){
                    creep.moveTo(structure);
                }
            } else {
                creep.moveTo(Game.flags['idleConstructors']);
            }
        }
    }
}

module.exports = repairer;