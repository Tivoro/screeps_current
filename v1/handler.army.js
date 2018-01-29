var unitBuilder = {
    run: function(){
        var gameWarriors = Game.creeps;
        
        var melee = _.filter(gameWarriors, (creep) => creep.memory.role == 'melee');
        var beef = _.filter(gameWarriors, (creep) => creep.memory.role == 'beef');
        var healer = _.filter(gameWarriors, (creep) => creep.memory.role == 'healer')
        if(melee.length < 1){
            Game.spawns['Spawn1'].createCreep(
                [ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: "melee", targetHome: "W17S63"});
        }
        if(beef.length < 0){
            Game.spawns['Spawn1'].createCreep(
                [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: "beef"});
        }
        if(healer.length < 0){
            Game.spawns['Spawn1'].createCreep([HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE], undefined, {role: "healer"});
        }
    }
}

module.exports = unitBuilder;
