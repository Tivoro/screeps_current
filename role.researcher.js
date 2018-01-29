var Creep = require("role.prototype");

function researcher(creep,room){
    this.base = Creep;
    this.base(creep,room);
}
module.exports = researcher;
researcher.prototype = Object.create(Creep.prototype);

researcher.prototype.WORK = function(){
    var creep = this.creep;
    if(creep.carry.energy == 0){
        var target = creep.pos.findClosestByPath(FIND_STRUCTURES,{
           filter: function(targets){ return targets.structureType == STRUCTURE_CONTAINER } 
        });
        if(target != undefined){
            if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(target);
            }
        } else {
            var targets = creep.room.find(FIND_STRUCTURES, {
               filter: function(targets){
                   return (targets.structureType == STRUCTURE_SPAWN || targets.structureType == STRUCTURE_EXTENSION) && targets.energy >= 300;
               } 
            });
            if(creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(targets[0]);
            }
        }
    }else{
        target = creep.room.controller;
        if(ERR_NOT_IN_RANGE == creep.upgradeController(target)){
            creep.moveTo(target);
        }
    }
}