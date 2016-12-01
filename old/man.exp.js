function findExp(roomName){
    console.log(roomName);
    console.log(Game.rooms[roomName])
    console.log(Game.rooms[roomName].controller.level);
}

module.exports = {
    findExp: findExp
}