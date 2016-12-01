function Creep(creep, room) {
   this.creep = creep;
   this.room = room;
   this.name = creep.name;
   this.id = creep.id;
}

Creep.prototype.work = function(){ console.log("Prototype WORK") };

module.exports = Creep;