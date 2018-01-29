module.exports = {
    run(spawner, currRoom){
        spawnCreeps(spawner, currRoom);
    }
};

function spawnCreeps(spawner, currRoom){
    var queue = populateQueue(currRoom);
    if(!spawner.spawning && queue != ""){
        var name = queue[0].role + "-" + currRoom.memory.workers[queue[0].role].totalSpawns + "-" + currRoom.name;
        if(spawner.spawnCreep(queue[0].parts, name, {memory: {"role": queue[0].role}}) == 0){
            currRoom.memory.workers[queue[0].role].totalSpawns += 1;
        }
    }
}
function populateQueue(currRoom){
    var list = [];
    for(type in currRoom.memory.workers){
        var cCount = _.filter(currRoom.find(FIND_MY_CREEPS), (creep) => creep.memory.role == type).length;
        for(i = 0; i < currRoom.memory.workers[type].count - cCount; i++){
            list.push({
                "role": type,
                "parts": currRoom.memory.workers[type].parts,
                "prio": currRoom.memory.workers[type].prio});
        }
    }
    list.sort(function(a, b) { return parseFloat(a.prio) - parseFloat(b.prio); });
    return list;
}