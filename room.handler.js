var spawnHandler = require("room.spawnHandler");
var workHandler = require("room.workHandler");
var defHandler = require("def.handler")

module.exports = {
    run(){
        for(var i in Game.spawns){
            if(Game.spawns[i].room.memory.initialized === undefined){
                initializeMemory(Game.spawns[i].room);
            }
            checkMemory(Game.spawns[i].room);
            
            defHandler.run(Game.spawns[i].room)
            spawnHandler.run(Game.spawns[i], Game.spawns[i].room);
            workHandler.run(Game.spawns[i].room);    
        }
    }
};

function buildRoads(from, to){
    var coords = from.pos.findPathTo(to)
    for(i in coords){
        var rPos = new RoomPosition(coords[i].x, coords[i].y, from.room.name)
        rPos.createConstructionSite(STRUCTURE_ROAD)
    }
}
function buildExtensions(currRoom, count){
    var pos = currRoom.find(FIND_MY_SPAWNS)[0].pos
    
    if(new RoomPosition(pos.x - 1, pos.y - 1, pos.roomName).lookFor(LOOK_STRUCTURES) == "" &&
        new RoomPosition(pos.x - 1, pos.y - 1, pos.roomName).lookFor(LOOK_TERRAIN) != "wall"){
        new RoomPosition(pos.x - 1, pos.y - 1, pos.roomName).createConstructionSite(STRUCTURE_EXTENSION)
        count++
        if(count == 5){ return; }
    }
    if(new RoomPosition(pos.x - 1, pos.y + 1, pos.roomName).lookFor(LOOK_STRUCTURES) == "" &&
        new RoomPosition(pos.x - 1, pos.y + 1, pos.roomName).lookFor(LOOK_TERRAIN) != "wall"){
        new RoomPosition(pos.x - 1, pos.y + 1, pos.roomName).createConstructionSite(STRUCTURE_EXTENSION)
        count++
        if(count == 5){ return; }
    }
    if(new RoomPosition(pos.x + 1, pos.y - 1, pos.roomName).lookFor(LOOK_STRUCTURES) == "" &&
        new RoomPosition(pos.x + 1, pos.y - 1, pos.roomName).lookFor(LOOK_TERRAIN) != "wall"){
        new RoomPosition(pos.x + 1, pos.y - 1, pos.roomName).createConstructionSite(STRUCTURE_EXTENSION)
        count++
        if(count == 5){ return; }
    }
    if(new RoomPosition(pos.x + 1, pos.y + 1, pos.roomName).lookFor(LOOK_STRUCTURES) == "" &&
        new RoomPosition(pos.x + 1, pos.y + 1, pos.roomName).lookFor(LOOK_TERRAIN) != "wall"){
        new RoomPosition(pos.x + 1, pos.y + 1, pos.roomName).createConstructionSite(STRUCTURE_EXTENSION)
        count++
        if(count == 5){ return; }
    }
    
    var extensions = currRoom.find(FIND_MY_STRUCTURES, {filter:function(s){
        return s.structureType == STRUCTURE_EXTENSION
    }})
    for(i in extensions){
        pos = extensions[i].pos
    if(new RoomPosition(pos.x - 1, pos.y - 1, pos.roomName).lookFor(LOOK_STRUCTURES) == "" &&
        new RoomPosition(pos.x - 1, pos.y - 1, pos.roomName).lookFor(LOOK_TERRAIN) != "wall"){
        new RoomPosition(pos.x - 1, pos.y - 1, pos.roomName).createConstructionSite(STRUCTURE_EXTENSION)
        count++
        if(count == 5){ return; }
    }
    if(new RoomPosition(pos.x - 1, pos.y + 1, pos.roomName).lookFor(LOOK_STRUCTURES) == "" &&
        new RoomPosition(pos.x - 1, pos.y + 1, pos.roomName).lookFor(LOOK_TERRAIN) != "wall"){
        new RoomPosition(pos.x - 1, pos.y + 1, pos.roomName).createConstructionSite(STRUCTURE_EXTENSION)
        count++
        if(count == 5){ return; }
    }
    if(new RoomPosition(pos.x + 1, pos.y - 1, pos.roomName).lookFor(LOOK_STRUCTURES) == "" &&
        new RoomPosition(pos.x + 1, pos.y - 1, pos.roomName).lookFor(LOOK_TERRAIN) != "wall"){
        new RoomPosition(pos.x + 1, pos.y - 1, pos.roomName).createConstructionSite(STRUCTURE_EXTENSION)
        count++
        if(count == 5){ return; }
    }
    if(new RoomPosition(pos.x + 1, pos.y + 1, pos.roomName).lookFor(LOOK_STRUCTURES) == "" &&
        new RoomPosition(pos.x + 1, pos.y + 1, pos.roomName).lookFor(LOOK_TERRAIN) != "wall"){
        new RoomPosition(pos.x + 1, pos.y + 1, pos.roomName).createConstructionSite(STRUCTURE_EXTENSION)
        count++
        if(count == 5){ return; }
    }
    }
}

function initializeMemory(currRoom){
    currRoom.memory.workers = {};
    currRoom.memory.workers.bigMiner = {
        "count": 2,
        "parts": [WORK,WORK,MOVE],
        "totalSpawns": 0,
        "prio": 1
    }
    currRoom.memory.workers.hauler = {
        "count": 1,
        "parts": [CARRY,CARRY,MOVE],
        "totalSpawns": 0,
        "prio": 2
    }
    currRoom.memory.workers.researcher = {
        "count": 1,
        "parts": [WORK,CARRY,MOVE],
        "totalSpawns": 0,
        "prio": 3
    }
    currRoom.memory.initialized = 1
}
function checkMemory(currRoom){
    var memWorkers = currRoom.memory.workers;
    var containers = _.filter(currRoom.find(FIND_STRUCTURES), (structure) => structure.structureType == STRUCTURE_CONTAINER).length;
    var storage = _.filter(currRoom.find(FIND_STRUCTURES), (structure) => structure.structureType == STRUCTURE_STORAGE).length;
    var roomEnergy = currRoom.energyCapacityAvailable;
    
    if(currRoom.controller.level == 2 && currRoom.memory.initialized < 2){
        memWorkers.builder = {
            "count": 2,
            "parts": [WORK,CARRY,MOVE],
            "totalSpawns": 0,
            "prio": 4
        }
        buildExtensions(currRoom, 5)
        buildRoads(currRoom.find(FIND_MY_SPAWNS)[0], currRoom.controller)
        var sources = currRoom.find(FIND_SOURCES)
        for(i in sources){
            buildRoads(currRoom.find(FIND_MY_SPAWNS)[0], sources[i])
        }
        currRoom.memory.initialized = 2
    }
    if(currRoom.controller.level == 3 && currRoom.memory.initialized < 3){
        buildExtensions(currRoom, 5)
        currRoom.memory.initialized = 3
    }
    if(currRoom.controller.level == 4 && currRoom.memory.initialized < 4){
        buildExtensions(currRoom, 10)
        currRoom.memory.wHealth = 1000
        currRoom.memory.buildWalls = 1
        currRoom.memory.initialized = 4
    }
    if(containers > 0 && memWorkers.repairer === undefined){
        memWorkers.repairer = {
            "count": 1,
            "parts": [WORK,CARRY,MOVE],
            "totalSpawns": 0,
            "prio": 4
        }
    }
    
    if(roomEnergy > 300 && roomEnergy < 550){ }
    if(roomEnergy >= 550){
        memWorkers.researcher.count = 2
        memWorkers.researcher.parts = [WORK,WORK,WORK,CARRY,MOVE,MOVE]
        memWorkers.bigMiner.parts = [WORK,WORK,WORK,WORK,MOVE,MOVE]
        memWorkers.hauler.parts = [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE]
        memWorkers.builder.parts = [WORK,WORK,CARRY,CARRY,MOVE,MOVE]
        if(memWorkers.repairer != undefined){
            memWorkers.repairer.parts = [CARRY,CARRY,CARRY,WORK,MOVE,MOVE]
        }
    }
}