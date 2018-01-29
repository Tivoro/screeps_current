var tower = {
    run: function(tower){
        var hostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        var damaged = tower.pos.findClosestByRange(FIND_CREEPS,{
            filter: function(creep){ return creep.hits < creep.hitsMax }
        })
        if(hostile){
            tower.attack(hostile);
        } else {
            if(damaged){
                tower.heal(damaged);
            } else {
                var structure = tower.pos.findInRange(FIND_STRUCTURES, 30, {
                   filter: function(structure){
                        if(structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART){
                            return structure.hits < tower.room.memory.structures.wall.health
                        } else {
                            return structure.hits < structure.hitsMax
                        }
                   } 
                });
                if(structure){
                    tower.repair(structure[0]);
                }
            }
        } 
    }
}

module.exports = tower;
