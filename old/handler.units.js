var unitBuilder = {
    run: function(spawn){
        for(var cName in Memory.creeps)
        {
            if(!Game.creeps[cName]){
                delete Memory.creeps[cName];
                console.log("Removing dead creep: " + cName);
            }
        }
        var currRoom = Game.spawns[spawn].room;
        var mem = currRoom.memory;
        var roomCreeps = currRoom.find(FIND_MY_CREEPS);
        var harvesters = _.filter(roomCreeps, (creep) => creep.memory.role == 'harvester');
        var builders = _.filter(roomCreeps, (creep) => creep.memory.role == 'builder');
        var constructors = _.filter(roomCreeps, (creep) => creep.memory.role == 'constructor');
        //var repairers = _.filter(roomCreeps, (creep) => creep.memory.role == 'repairer');
        var trucks = _.filter(roomCreeps, (creep) => creep.memory.role == 'trucker');
        if(harvesters.length < mem.harvesters.count){
            Game.spawns[spawn].createCreep(mem.harvesters.parts, undefined, {role: "harvester"});
        }
        if(trucks.length < mem.truckers.count){
            Game.spawns[spawn].createCreep(mem.truckers.parts, undefined, {role: "trucker"});
        }
        if(trucks.length >= mem.truckers.count && harvesters.length >= mem.harvesters.count){
            if(builders.length < mem.builders.count){
                Game.spawns[spawn].createCreep(mem.builders.parts, undefined, {role: "builder"});
            }
            if(constructors.length < mem.constructors.count){
                Game.spawns[spawn].createCreep(mem.constructors.parts, undefined, {role: "constructor"});
            }
        }
    }
}

module.exports = unitBuilder;