var unitMelee = {
    run: function(creep){
        var targetRoom = creep.memory.targetRoom;
        var targetHome = creep.memory.targetHome;
        if(targetRoom != undefined){
            if(creep.room.name != targetRoom){
                creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(targetRoom)));
            }
            if(creep.room.name == targetRoom){
                var target = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES,{
                   filter: function(targets){ return targets.structureType == STRUCTURE_TOWER } 
                });
                if(target){
                    if(creep.attack(target) == ERR_NOT_IN_RANGE){
                        creep.moveTo(target);
                    }
                } else {
                    target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
                    if(target){
                        if(creep.attack(target) == ERR_NOT_IN_RANGE){
                            creep.moveTo(target);
                        }
                    } else {
                        target = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES,{
                           filter: function(targets){ return targets.structureType != STRUCTURE_CONTROLLER } 
                        });
                        if(target){
                            if(creep.attack(target) == ERR_NOT_IN_RANGE){
                                creep.moveTo(target);
                            }
                        }
                    }
                }
            }
        } else {
            if(creep.room.name == targetHome){
                if(creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49){
                    console.log(this.nextStepIntoRoom(creep.pos, creep.memory.targetHome));
                    creep.moveTo(this.nextStepIntoRoom(creep.pos, creep.memory.targetHome));
                }
                creep.moveTo(Game.flags["attackForce"].pos);
            } else {
                creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(targetHome)));
            }
        }
    },
    nextStepIntoRoom: function(pos, roomName){
        var x = pos.x;
        var y = pos.y;
        if(x == 0){ x = 1; }
        if(x == 49){ x = 48; }
        if(y == 0){ y = 1; }
        if(y == 49){ y = 48; }
        return new RoomPosition(x, y, roomName);
    }
}



module.exports = unitMelee;
