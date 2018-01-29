function Creep(creep, room){
    this.creep = creep;
    this.memory = creep.memory;
    this.room = room;
    this.name = creep.name;
    this.id = creep.id;
}

Creep.prototype.work = function(){ console.log("Prot: WORK"); }

module.exports = Creep;