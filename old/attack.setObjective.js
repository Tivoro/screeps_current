function targetRoom(target){
    for(cName in Game.creeps){
        var creep = Game.creeps[cName];
        if(creep.memory.role == "melee"){
            creep.memory.targetRoom = target;
        }
    }
}
function targetHome(target){
    for(cName in Game.creeps){
        var creep = Game.creeps[cName];
        if(creep.memory.role == "melee"){
            creep.memory.targetHome = target;
        }
    }
}

module.exports = {
    targetRoom: targetRoom,
    targetHome: targetHome
}