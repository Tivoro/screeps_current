var role;

module.exports = {
    run(currRoom){
        removeDead();
        for(var i in Game.creeps){
            doWork(Game.creeps[i], currRoom);
        }
    }
};

function removeDead(){
    for(nCreep in Memory.creeps){
        if(!Game.creeps[nCreep]){
            delete Memory.creeps[nCreep];
            console.log("Removing dead creep: " + nCreep);
        }
    }
}

function doWork(cCreep, currRoom){
    role = require("role."+cCreep.memory.role);
    cCreep = new role(cCreep, currRoom);
    cCreep.WORK();
}