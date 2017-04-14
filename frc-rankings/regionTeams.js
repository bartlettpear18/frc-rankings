var request = require("request");
//var babel = require("babel-core")
var teams =  new Array();
var heads = {
    "X-TBA-App-Id": "joel_bartlett:frc-rankings:v01"   
}

var arrays = new Array();
arrays.push(1);
/**
 * Returns a list of teams from a specific region
 * @param region, regionLong (fully written state name)
 * @return teams array
 */
function loop (region, regionLong) {
    for (i = 0; i <= 13; i++) {
        request({url: "http://www.thebluealliance.com//api/v2/teams/" + i, headers: heads}, function(err, response, body) {
            if(err) { console.error(err); }
            var tempTeams = JSON.parse(body);
            for (var i in tempTeams) {
                var tempTeam = tempTeams[i];
                if(tempTeam.region == region || tempTeam.region == regionLong) {
                    teams.push(tempTeam.team_number);
                    console.log(teams[teams.length-1]);
                }
            }
        });
    } 
}


function test(region, regionLong){
    return new Promise( 
        function(resolve, reject) {
            loop(region, regionLong);
            resolve(teams.length>0);
            reject(error);
        }
    )
}

//loop("CA","California");
test("CA","California")
.then(result => { console.log(teams); })
.catch(error => {console.error(error); });
