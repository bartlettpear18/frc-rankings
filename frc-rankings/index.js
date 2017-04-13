var initTBA = require('thebluealliance');
var tba = new initTBA('node-thebluealliance','Node.js wrapper library for the TBA v2 API','1.1.1');
 

var n = null;
var a = 1.02; 

var events = new Array();
var year = 2017;
var ranks = {};
var r; 

/**
function qualPoints(b,n,a,) {
    var firstTerm = (n-2*r+2)/(a*n);
    var secondTerm = (10/(1/a));
    var total = firstTerm * secondTerm + 12
    var totalAbs = Math.abs(total);
    return totalAbs;
}

function allianceCaptains(rank) {
    return (17-rank); 
}

function draftOrderAcceptance(invitation) {
    return (17 - invitation);
}
*/


/**
 * @param desired teamNumber and tournament they competed at
 * @return their rank at the tournamnet
 */
function rank (teamNumber, event) {
    var teamRank;

    request({url: "http://www.thebluealliance.com/api/v2/event/" + event + "/rankings", headers: heads}, function(error, response, body) {
        console.error('error:', error); // Print the error if one occurred 
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
        ranks = JSON.parse(body);
        for (var i in ranks) {
            teams = ranks[i];
            var num = teams[1];
            if(teamNumber == num) {
                console.log(teams[0]);
                teamRank = teams[0];
            }
        }
    })
}

/**
 * Determines which events a team will/did go to
 * @param team number
 * @return array of eventIds that team attends
 */
function tournaments(teamId) {
    tba.getEventsForTeam(teamId, year, function (err, eventInfo) {
        if(err) { console.error(err); }
        for (var i in eventInfo) {
            events[events.length] = eventInfo[i].key;
        }
        return events;
    })
}

/**
 * Determines a teams ranking at an event
 * @param eventId
 * @return ranking at this event
 */
function ranking(teamNumber, eventId) {
    tba.getRankingsAtEvent(eventId, year, function(err, rankings_list) {
        if(err) { console.error(err); }
        for (var i in rankings_list) {
            rank = rankings_list[i];
            if(rank[1] == teamNumber) {
                r = rank[0];
            }
        }
    })
}




ranking (971, "casj");
tournaments(254);