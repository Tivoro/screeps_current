module.exports = {
    run(currRoom){
        var towers = currRoom.find(FIND_STRUCTURES, {filter:function(s){
            return s.structureType == STRUCTURE_TOWER
        }})
        var hTargets = findHostiles(currRoom)
        var fTargets = findDamagedAllies(currRoom)
        var repTargets = findDamagedBuildings(currRoom)
        for(i in towers){
            if(hTargets != null){
                towers[i].attack(hTargets[0])
            } else if(fTargets != null){
                towers[i].heal(fTargets[0])
            } else if(repTargets != null){
                towers[i].repair(repTargets[0])
            }
        }
    }
};

function findHostiles(currRoom){
    var hCreeps = currRoom.find(FIND_HOSTILE_CREEPS)
    if(hCreeps.length > 0){
        return hCreeps
    }
    return null
}
function findDamagedAllies(currRoom){
    var fCreeps = currRoom.find(FIND_MY_CREEPS, {filter:function(s){
        return s.hits < s.hitsMax
    }})
    if(fCreeps.length > 0)
        return fCreeps
    return null
}
function findDamagedBuildings(currRoom){
    var buildings = currRoom.find(FIND_STRUCTURES, {filter:function(s){
        if((s.structureType == STRUCTURE_WALL || s.structureType == STRUCTURE_RAMPART) && s.hits < 10000)
            return s
        if (s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART)
            return s.hits < s.hitsMax
        return null
    }})
    if(buildings.length > 0)
        return buildings
    return null
}