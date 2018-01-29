var tower = require("def.tower")

module.exports = {
    run(currRoom){
        tower.run(currRoom)
        if(currRoom.memory.wallsL1 == undefined && currRoom.memory.buildWalls == 1){
            makeScreepsGreatAgainL1(currRoom)
        }
    }
};

function makeScreepsGreatAgainL1(currRoom){
    exit = currRoom.find(FIND_EXIT_BOTTOM)
    if(exit.length > 0)
        for(i in exit){ buildWall(new RoomPosition(exit[i].x, exit[i].y - 2, exit[i].roomName), exit.length/2) }
    exit = currRoom.find(FIND_EXIT_RIGHT)
    if(exit.length > 0)
        for(i in exit){ buildWall(new RoomPosition(exit[i].x - 2, exit[i].y, exit[i].roomName), exit.length/2) }
    exit = currRoom.find(FIND_EXIT_TOP)
    if(exit.length > 0)
        for(i in exit){ buildWall(new RoomPosition(exit[i].x, exit[i].y + 2, exit[i].roomName), exit.length/2) }
    exit = currRoom.find(FIND_EXIT_LEFT)
    if(exit.length > 0)
        for(i in exit){ buildWall(new RoomPosition(exit[i].x + 2, exit[i].y, exit[i].roomName), exit.length/2) }
}

function buildWall(pos, middle){
    if(pos.lookFor(LOOK_TERRAIN) == "plain"){
        if(i == middle -1 || i == middle + 1 || i == middle){
            pos.createConstructionSite(STRUCTURE_RAMPART)
        } else {
            pos.createConstructionSite(STRUCTURE_WALL)
        }
    }
}