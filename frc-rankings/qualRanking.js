var initTBA = require('thebluealliance');
var tba = new initTBA('node-thebluealliance','Node.js wrapper library for the TBA v2 API','1.1.1');

var events = new Array();
var year = 2017;
var ranks = {};

//qual round performance variabes
var qualRanking; 
var alpha = 1.07;
var numTeams;

//District point assignment
var qualPoints;


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
                qualRanking = rank[0];
            }
        }
    })
}

/**
 * Determines number of teams at an event
 * @param eventId
 * @return total number
 */
function numTeamsEvents(eventId) {
    tba.getTeamsAtEvent(eventId, year, function(err, teams_list) {
        if(err) { console.error(err); }
            numTeams = teams_list.length;
    })
}

/**
 * calculate qual ranking points
 * @param team
 * @return number of points from qual ranking formula
 */
function qualPointsCalc(teamId) {    
    var firstTerm = (numTeams - 2 * qualRanking + 2) / (alpha * numTeams);
    var secondTerm = 10/(1/alpha);
    qualPoints = Math.abs(firstTerm * secondTerm + 12);
    console.log(qualPoints);
}

/*

ranking (254, "casj");
tournaments(254);
numTeamsEvents("casj");
qualPointsCalc(254);
*/

regionTeams.teamList(1,"CA","California");