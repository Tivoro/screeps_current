var Creep = require("role.prototype");

function builder(creep,room){
    this.base = Creep;
    this.base(creep,room);
}
module.exports = builder;
builder.prototype = Object.create(Creep.prototype);

builder.prototype.WORK = function(){
    var creep = this.creep;
    
    if (creep.memory.status != undefined){
        if(creep.memory.status == "building" && creep.carry.energy == 0){
            creep.memory.status = "pickup"
        }
        if(creep.memory.status == "pickup" && creep.carry.energy == creep.carryCapacity){
            creep.memory.status = "building"
        }
    } else {
        creep.memory.status = "pickup";
    }
    
    if(creep.memory.status == "pickup"){
        var target = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, { filter: function(s){
            return s.resourceType == RESOURCE_ENERGY
        }})
        if(target != undefined){
            if(ERR_NOT_IN_RANGE == creep.pickup(target)){
                creep.moveTo(target);
            }
        }
    } else {
        var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        if(target != undefined){
            if(ERR_NOT_IN_RANGE == creep.build(target)){
                creep.moveTo(target);
            }
        } else {
            var target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, { filter: function(s){
                return (s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_SPAWN) && s.energy != s.energyCapacity
            }})
            if(target == undefined){
                target = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter:function(s){
                    return s.structureType == STRUCTURE_CONTAINER && s.store.energy != s.storeCapacity
                }})
            }
            if(target != undefined){
                if(ERR_NOT_IN_RANGE == creep.transfer(target, RESOURCE_ENERGY)){
                    creep.moveTo(target);
                }
            }
        }
    }
}