var Creep = require("prototype.creep");

function Upgrader(creep, room){
    this.base = Creep;
    this.base(creep, room);
}
module.exports = Upgrader;
Upgrader.prototype = Object.create(Creep.prototype);

Upgrader.prototype.work = function(){
    var creep = this.creep;
    if(creep.carry.energy == 0){
            targets = creep.room.find(FIND_STRUCTURES,{
               filter: function(targets){ return targets.structureType == STRUCTURE_CONTAINER && targets.store[RESOURCE_ENERGY] > creep.carryCapacity } 
            });
            if(targets.length){
                target = creep.pos.findClosestByRange(targets);
                if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(target);
                }
            }
        }else{
            var target = creep.room.controller;
            if(ERR_NOT_IN_RANGE == creep.upgradeController(target)){
                creep.moveTo(target);
            }
        }
}