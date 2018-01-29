var Creep = require("role.prototype");

function repairer(creep,room){
    this.base = Creep;
    this.base(creep,room);
}
module.exports = repairer;
repairer.prototype = Object.create(Creep.prototype);

repairer.prototype.WORK = function(){
    var creep = this.creep;
    
    if(creep.memory.status != undefined){
        if(creep.memory.status == "working" && creep.carry.energy == 0){
            creep.memory.status = "pickup"
        }
        if(creep.memory.status == "pickup" && creep.carry.energy == creep.carryCapacity){
            creep.memory.status = "working"
        }
    } else {
        creep.memory.status = "pickup"
    }
    
    if(creep.memory.status == "working"){
        var target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {filter:function(s){
            return s.structureType == STRUCTURE_TOWER && s.energy != s.energyCapacity
        }})
        if(target != undefined){
            if(ERR_NOT_IN_RANGE == creep.transfer(target, RESOURCE_ENERGY)){
                creep.moveTo(target)
            }
        } else {
            target = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter:function(s){
                return s.hits < s.hitsMax;
            }})
            if(target != undefined){
                if(ERR_NOT_IN_RANGE == creep.repair(target)){
                    creep.moveTo(target)
                }
            }
        }
    } else {
        var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter:function(s){
            return s.structureType == STRUCTURE_CONTAINER && s.store.energy > creep.carryCapacity
        }})
        if(target != undefined){
            if(ERR_NOT_IN_RANGE == creep.withdraw(target, RESOURCE_ENERGY)){
                creep.moveTo(target)
            }
        }
    }
}