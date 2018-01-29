var builder = {
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
        }else{
            var target = creep.room.controller;
            if(ERR_NOT_IN_RANGE == creep.upgradeController(target)){
                creep.moveTo(target);
            }
            
        }
    },
    runPrimitive: function(creep){
        if(creep.carry.energy == 0){
            targets = creep.room.find(FIND_MY_SPAWNS);
            if(targets.length){
                target = creep.pos.findClosestByRange(targets);
                if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(target);
                }
            }
        }else{
            var target = creep.room.controller;
            if(ERR_NOT_IN_RANGE == creep.upgradeController(target)){
                creep.moveTo(target);
            }
            
        }
        
    }
}

module.exports = builder;
