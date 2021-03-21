// create config
var config = {};

// basic config
config.startCommand = "]start";
config.token = "token";

config.autoBank = true;
config.approvedSearches = ["pantry", "couch", "laundromat", "grass", "tree", "shoe", "coat", "pocket", "discord", "mailbox", "dresser"];
config.unapprovedMessage = "Bro, atleast give me a decent search.. These all suck!";

// tasks to do
config.fish = false;
config.hunt = false;
config.search = true;
config.beg = true;
config.pm = false;
config.hl = true;
// advanced config
config.duplicateRequests = true; // dont change if you dont knnow what your doing. determines whether or not the bot will re-send messages wrapped by ` (necessary for hunting/fishing/pm to prevent dying/breaking, also responds to events)
config.responseDelay = 500;
config.randomMin = 1000;
config.randomMax = 3000;

// export config
module.exports = config;
