var request = require("request");
//var babel = require("babel-core")
var teams =  new Array();
var heads = {
    "X-TBA-App-Id": "joel_bartlett:frc-rankings:v01"   
}

/**
 * Returns a list of teams from a specific region
 * @param region, regionLong (fully written state name)
 * @return teams array
 */
function teamsList(region, regionLong) {
    var promise = new Promise(function(resolve, reject) {
        for (i = 0; i <= 13; i++) {
            request({url: "http://www.thebluealliance.com//api/v2/teams/" + i, headers: heads}, function(err, response, body) {
                if(err) { console.error(err); }
                var tempTeams = JSON.parse(body);
                for (var i in tempTeams) {
                    var tempTeam = tempTeams[i];
                    if(tempTeam.region == region || tempTeam.region == regionLong) {
                        teams.push(tempTeam.team_number);
                        //console.log(teams[teams.length-1]);
                    }
                }
            });
        }   
        //return resolve(teams);
        if(teams.length > 0) {
            resolve(teams);
        } else {
            reject(Error("it broke"));
        }
    });

    //promise.then(console.log(teams));
    //promise.catch(console.log("fail"));
    promise.then(function(result) {
        console.log(teams); // "Stuff worked!"
    }, function(err) {
        console.log(err); // Error: "It broke"
    });
}

module.exports.teamList = teamsList;
//teamsList("CA","California").then(function() {console.log(teams);});
teamsList("CA","California");
