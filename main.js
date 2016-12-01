var harvester = require('role.harvester');
var creepHandler = require('creepHandler');

var activeWorkers = [];

module.exports.loop = function () {
    
    creepHandler.run();
    
    //var currRoom = Game.spawns['Spawn1'].room;
    //var roomCreeps = currRoom.find(FIND_MY_CREEPS);
    //var harvesters = _.filter(roomCreeps, (creep) => creep.memory.role == 'harvester');
    //if(harvesters.length < 1){
    //    Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE,MOVE], undefined, {role: "harvester"});
    //}
    //var test = harvester(harvesters[0], "W8N3");
}