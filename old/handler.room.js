var roomAI = {
    run: function(currRoom){
        mem = currRoom.memory;
        if(currRoom.controller.level == 1){
            mem.defcon = 1;
            mem.harvesters = {
                "count":currRoom.find(FIND_SOURCES).length,
                "parts":[WORK,CARRY,MOVE,MOVE]};
            mem.truckers = {"count":0};
            mem.constructors = {
                "count":1,
                "parts":[WORK,CARRY,MOVE,MOVE]};
            mem.builders = {
                "count":1,
                "parts":[WORK,CARRY,MOVE,MOVE]};
            mem.structures = {
                "wall":{
                    "health":0
                }};
        }
        if(currRoom.controller.level == 2){
            mem.defcon = 2;
            mem.harvesters = {
                "count":currRoom.find(FIND_SOURCES).length,
                "parts":[WORK,CARRY,MOVE,MOVE]};
            mem.truckers = {
                "count":currRoom.find(FIND_SOURCES).length,
                "parts":[WORK,CARRY,MOVE,MOVE]};
            mem.constructors = {
                "count":2,
                "parts":[WORK,CARRY,MOVE,MOVE]};
            mem.builders = {
                "count":1,
                "parts":[WORK,CARRY,MOVE,MOVE]};
            mem.structures = {
                "wall":{
                    "health":0
                }};
        }
        if(currRoom.controller.level == 3){
            mem.defcon = 3;
            mem.harvesters = {
                "count":currRoom.find(FIND_SOURCES).length,
                "parts":[WORK,WORK,WORK,WORK,WORK,CARRY,MOVE]};
            mem.truckers = {
                "count":currRoom.find(FIND_SOURCES).length + 1,
                "parts":[CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]};
            mem.constructors = {
                "count":2,
                "parts":[WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]};
            mem.builders = {
                "count":3,
                "parts":[WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE]};
            mem.structures = {
                "wall":{
                    "health":25000
                }};
        }
        if(currRoom.controller.level == 4){
            mem.defcon = 4;
            mem.harvesters = {
                "count":currRoom.find(FIND_SOURCES).length,
                "parts":[WORK,WORK,WORK,WORK,WORK,CARRY,MOVE]};
            mem.truckers = {
                "count":currRoom.find(FIND_SOURCES).length + 1,
                "parts":[CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]};
            mem.constructors = {
                "count":1,
                "parts":[WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]};
            mem.builders = {
                "count":4,
                "parts":[WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE]};
            mem.structures = {
                "wall":{
                    "health":50000
                }};
        }
    }
}

module.exports = roomAI;