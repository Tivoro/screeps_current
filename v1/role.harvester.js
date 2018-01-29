var harvester = {
    run: function(creep){
        if(creep.memory.state == "deposit" && creep.carry.energy == 0){
            creep.memory.state == "harvest";
        }
        if(creep.memory.state == "harvest" && creep.carry.energy == creep.carryCapacity){
            creep.memory.state == "deposit";
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
        
        if(ERR_NOT_IN_RANGE == creep.harvest(sources[creep.memory.source])){
            creep.moveTo(sources[creep.memory.source]);
        } else {
            var targets = creep.pos.findInRange(FIND_STRUCTURES, 2, {
                filter: function(structure){
                    return (structure.structureType == STRUCTURE_CONTAINER)
                }
            });
            if(targets.length > 0){
                if(ERR_NOT_IN_RANGE == creep.transfer(targets[0], RESOURCE_ENERGY)){
                    creep.moveTo(targets[0]);
                }
            }
        }
    },
    runPrimitive: function(creep){
        if(creep.memory.state == undefined){ creep.memory.state = "harvest"; }
        if(creep.memory.state == "deposit" && creep.carry.energy == 0){
            creep.memory.state = "harvest";
        }
        if(creep.memory.state == "harvest" && creep.carry.energy == creep.carryCapacity){
            creep.memory.state = "deposit";
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
        if(creep.memory.state == "harvest"){
            if(ERR_NOT_IN_RANGE == creep.harvest(sources[creep.memory.source])){
                creep.moveTo(sources[creep.memory.source]);
            }
        } else {
            var targets = creep.room.find(FIND_MY_SPAWNS);
            if(targets[0]){
                if(ERR_NOT_IN_RANGE == creep.transfer(targets[0], RESOURCE_ENERGY)){
                    creep.moveTo(targets[0]);
                }
            }
        }
    }
}

module.exports = harvester;
