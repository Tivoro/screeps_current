module.exports = {
    getRole: function(role){
        return require("role."+role);
    }
};