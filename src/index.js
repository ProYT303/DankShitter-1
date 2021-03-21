// stop after 18 hours (anitcheat)
setTimeout(() => {
  console.log("turning off")
  process.exit()
}, 64800000)

const Discord = require("discord.js");
const fs = require("fs");
const clc = require("cli-color");
const ConsoleTitle = require("node-bash-title");

var config = require("./../config");

const debug = true;
const bot = new Discord.Client();
var channel;

var responseQueue = [];
var fishDelay = Math.floor(Math.random() * (72000 - 62000) + 62000);
var huntDelay = Math.floor(Math.random() * (72000 - 62000) + 62000);
var searchDelay = Math.floor(Math.random() * (47000 - 37000) + 37000);
var pmDelay = Math.floor(Math.random() * (72000 - 62000) + 62000);
var begDelay = Math.floor(Math.random() * (57000 - 47000) + 47000);
var hlDelay = Math.floor(Math.random() * (42000 - 32000) + 32000);
var bankDelay = 80000;

function pushResponse(response) {
    responseQueue.push(response);

    //if (debug) {
    //    console.log(clc.yellow("Response pushed: " + response));
    //}
}

function unshiftResponse(response) {
    responseQueue.unshift(response);

    //if (debug) {
    //    console.log(clc.yellow("Response unshifted: " + response));
    //}
}

function handleResponse() {
    if (responseQueue.length > 0) {
        var response = responseQueue.shift();

        if (response) {
            
            channel.startTyping()
            setTimeout(() => {
                channel.stopTyping()
                channel.send(response);
            }, 1000)
            

            if (debug) {
                console.log(clc.yellow("Response called: " + response));
            }
        } else {
            console.log(clc.red("Error: Expected to call response, but no response was returned on queue shift."));
        }
        
    } else if (debug) {
        console.log(clc.yellow("No response called"));
    }

    var delay = Math.floor(config.responseDelay + config.randomMin + (config.randomMax - config.randomMin) * Math.random());

    //if (debug) {
    //    console.log(clc.yellow("Calling next response in " + delay + "ms"))
    //}

    setTimeout(handleResponse, delay);
}

function startBot() {
    if (config.beg) {
  
        setInterval(() => {
            channel.startTyping()
            setTimeout(() => {
                channel.stopTyping()
                pushResponse("pls beg");
            }, 1000)
        }, begDelay);
        
    }

    if (config.fish) {
        
        setInterval(() => {
            channel.startTyping()
            setTimeout(() => {
                channel.stopTyping()
                pushResponse("pls fish");
            }, 1000)
        }, fishDelay);

    }

    if (config.hunt) {
        
        setInterval(() => {
            channel.startTyping()
            setTimeout(() => {
                channel.stopTyping()
                pushResponse("pls hunt");
            }, 1000)
        }, huntDelay);

    } 

    if (config.pm) {

        setInterval(() => {
            channel.startTyping()
            setTimeout(() => {
                channel.stopTyping()
                pushResponse("pls pm");
            }, 1000)
        }, pmDelay);

    }

    if (config.search) {
        
        setInterval(() => {
            channel.startTyping()
            setTimeout(() => {
                channel.stopTyping()
                pushResponse("pls search");
            }, 1000)
        }, searchDelay);

    }

    if (config.autoBank) {
        
        setInterval(() => {
            channel.startTyping()
            setTimeout(() => {
                channel.stopTyping()
                pushResponse("pls dep all");
            }, 1000)
        }, bankDelay);

    }

    if (config.hl) {

        setInterval(() => {
            channel.startTyping()
            setTimeout(() => {
                channel.stopTyping()
                pushResponse("pls hl");
            }, 1000)
        }, hlDelay);
    }
}

bot.on("ready", async () => {
    //check if dank memer is offline(anticheat)
    var thanos123 = await bot.fetchUser("270904126974590976")
    setInterval(() => {
      if(thanos123.presence.status === "offline") {
        console.log("Bot offline")
        process.exit()
      }
    }, 6000);


    console.log(clc.green(`Logged in as ${bot.user.username}`))
    console.log(clc.yellow("Listening for start command " + process.env.startCommand + " in initial channel."));
    console.log(clc.red("Warning: Do NOT use this bot in a public server, use it in a private server in a channel only you will be in."));
})
let responded = true // (for now)
bot.on("message", async message => {
    
  
    if (responded == false) {
      console.log(clc.red("Seems like dank memer wont responce to your messages.."))
    }

    if (channel) {
        if (channel == message.channel) {
            // Check if dank memer wont responce
            if (message.author.id == "270904126974590976"){
               responded = true
               setTimeout(()=>{
                responded = false
               }, 62000)
            }
            
            //if (debug) {
            //    console.log(clc.yellow("Message received: " + message.content));
            //}
        

            try {
                
                if (message.embeds[0].description) {
                    if (!message.embeds[0].description.includes("A number secret")) return
                    if (message.embeds[0].author.name.includes(bot.user.username)) {
                        if (message.author.id === "270904126974590976") {
                            
                            let testlol = message.embeds[0].description.split("**")
                            testlol = testlol[1]
        
                            if (testlol > 50) {
                                message.channel.startTyping()
                                setTimeout(() => {
                                    message.channel.stopTyping()
                                    message.channel.send("low")
                                    
                                    console.log(clc.green(`Sent low (pls hl)`));
                                }, 300)
        
                            } else {
                                setTimeout(() => {
                                    message.channel.stopTyping()
                                    message.channel.send("high")
                                    
                                    console.log(clc.green(`Sent high (pls hl)`));
                                }, 300)
                            }
                        }
                    }
                }
            } catch(err) {
                // 60% of hl made by walter
            }


            if (message.content.includes("pls lottery")) {
                return
            }
        
            if (message.content.includes("is broken lmao")) {
              if (message.author.id === "270904126974590976") {
                if (message.content.includes(`<@${bot.user.id}>`) | message.content.includes(`<@!${bot.user.id}>`)) {
                    message.channel.startTyping()
                        console.log(`Buying new laptop`)
                        setTimeout(() => {
                            message.channel.stopTyping()
                            message.channel.send('pls buy laptop')
                        }, 1000)
                }
              }
            }


            var contentPieces = message.content.split(" ");
            var wrappedPieces = message.content.split("`");

            //if (debug) {
            //    console.log(clc.yellow("Content #: " + contentPieces.length + ", Wrapped #: " + wrappedPieces.length));
            //}
            
            if (message.content.includes("Where do you want to search?")) {
                
                if (message.author.id === "270904126974590976") {
                
                try {
                    var option1 = contentPieces[16].split("`")[1];
                    var option2 = contentPieces[17].split("`")[1];
                    var option3 = contentPieces[18].split("`")[1];
        
                    console.log(clc.green("Provided search options: ", option1, option2, option3));
                    var optionChosen;
        
                    for (i = 0; i < config.approvedSearches.length; i++) {
                        var option = config.approvedSearches[i];
        
                        if (option1 == option) {
                            optionChosen = option1;
                            break;
        
                        } else if (option2 == option) {
                            optionChosen = option2;
                            break;
        
                        } else if (option3 == option) {
                            optionChosen = option3;
                            break;
                        } 
                    }
        
                    if (optionChosen) {
                        console.log(clc.green("Search option selected: " + optionChosen));
                        unshiftResponse(optionChosen);
        
                    } else {
                        console.log(clc.red("No good search options provided, responding with unapproved message."));
                        pushResponse(config.unapprovedMessage);
                    } 
                
                } catch (error) {
                    console.log(clc.red("Error when searching: " + error));
                }


                }
            } else if (wrappedPieces.length > 1 && ((contentPieces.length > 1 && contentPieces[1] != "searched") || contentPieces.length <= 1)) {
                var wrappedPiece = wrappedPieces[1];

                if (wrappedPiece) {
                    if(wrappedPiece === "pls search") {
                        return
                    }
                    unshiftResponse(wrappedPiece);
                    
                }
            }
        }

    } else if (message.content === config.startCommand) {
        if (bot.user.id === message.author.id) {
            message.delete()
            channel = message.channel;

            try {
                console.log(clc.green("Connecting to channel [" + channel.name ? channel.name : "UNKNOWN" + "]..."));
            } catch(error) {
                console.log(clc.green("Connecting to channel..."));
            }

            setTimeout(() => {
                handleResponse();

                console.clear();
                console.log(clc.green("Bot connected successfully, starting bot."));

                startBot();
            }, 2000);

        } 
    
    } else if (message.content === "!credits") {
        if (bot.user.id === message.author.id) {
            message.delete()
            message.channel.send("Cristian\nWalter#0005")
        }
    }
})

ConsoleTitle("Dank Memer Bot by Cristian and Walter");
bot.login(config.token);
