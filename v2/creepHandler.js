var roleHandler = require("roleHandler");

function run(){
    for(nSpawn in Game.spawns){
        var currSpawn = Game.spawns[nSpawn];
        var currRoom = currSpawn.room;
        var mem = currRoom.memory;
        
        checkRoomMemory(currRoom, mem);
        removeDead();
        spawnCreeps(nSpawn, currRoom, mem);
    }
    for(nCreep in Game.creeps){
        var creep = Game.creeps[nCreep];
        var cRole = creep.memory.role;
        
        var reqRole = roleHandler.getRole(cRole);
        var newCreep = new reqRole(creep, mem.homeRoom);
        newCreep.work();
    }
}

function removeDead(){
    for(nCreep in Memory.creeps){
        if(!Game.creeps[nCreep]){
            delete Memory.creeps[nCreep];
            console.log("Removing dead creep: " + nCreep);
        }
    }
}
function spawnCreeps(currSpawn, currRoom, mem){
    var roomCreeps = currRoom.find(FIND_MY_CREEPS);
    var harvesters = _.filter(roomCreeps, (creep) => creep.memory.role == 'harvester').length;
    var builders = _.filter(roomCreeps, (creep) => creep.memory.role == 'builder').length;
    var upgraders = _.filter(roomCreeps, (creep) => creep.memory.role == 'upgrader').length;
    var truckers = _.filter(roomCreeps, (creep) => creep.memory.role == 'trucker').length;
    var storTrucks = _.filter(roomCreeps, (creep) => creep.memory.role == 'storTrucker').length;
    var logTrucks = _.filter(roomCreeps, (creep) => creep.memory.role == 'logTrucker').length;
    if(harvesters < mem.harvesters.count){
        Game.spawns[currSpawn].createCreep(mem.harvesters.parts, undefined, {role: "harvester", status: "harvest", homeRoom: currRoom.name});
    } else {
        if(truckers < mem.truckers.count && mem.containers >= 1){
            Game.spawns[currSpawn].createCreep(mem.truckers.parts, undefined, {role: "trucker", status: "withdraw", homeRoom: currRoom.name});
        } else {
            if(builders < mem.builders.count){
                Game.spawns[currSpawn].createCreep(mem.builders.parts, undefined, {role: "builder", status: "withdraw", homeRoom: currRoom.name});
            }
            if(upgraders < mem.upgraders.count){
                Game.spawns[currSpawn].createCreep(mem.upgraders.parts, undefined, {role: "upgrader", status: "withdraw", homeRoom: currRoom.name});
            }
        }
    }
}

function checkRoomMemory(currRoom, mem){
    mem.containers = _.filter(currRoom.find(FIND_STRUCTURES), (structure) => structure.structureType == STRUCTURE_CONTAINER).length;
    mem.extensions = _.filter(currRoom.find(FIND_STRUCTURES), (structure) => structure.structureType == STRUCTURE_EXTENSION).length;
    if(currRoom.controller.level == 1){
        mem.defcon = 1;
        mem.harvesters = {
            "count": currRoom.find(FIND_SOURCES).length,
            "parts": [WORK,WORK,CARRY,MOVE]};
        mem.upgraders = {
            "count": 1,
            "parts": [WORK,CARRY,MOVE,MOVE]};
        mem.builders = {
            "count": 2,
            "parts": [WORK,WORK,CARRY,MOVE]};
    }
    if(currRoom.controller.level == 2){
        mem.defcon = 2;
        mem.truckers = {
            "count": 1,
            "parts": [CARRY,CARRY,MOVE,MOVE]};
    }
}

module.exports = {
    run: run
};
