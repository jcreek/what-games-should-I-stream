const app = document.getElementById('root');

var clientID = 'xxxxxx'; // Hide this for github, it's my application's Client ID
var topGames = []; // Holds roughly the top thousand games by viewers, although the viewer count per game is unavailable for some reason but this can be calculated by totalling the viewers from all streams for a particular game, if necessary
var topStreams = []; // Need to get a lot more of these to get useful data, and compare using the game ids where they match the top games - N.B. will need to remove/ignore any duplicate streams as between pages the data can change as viewers leave and join streams

async function getTopGamesAsync(){
    console.log('--> getTopGamesAsync');
    // See https://dev.twitch.tv/docs/api/reference/#get-top-games

    // List to hold the top games, to be returned by the function
    var tempGamesList = []; 
    var requestUrlBase = 'https://api.twitch.tv/helix/games/top?first=100';

    var gamesRequest,gamesResponse,gamesData,gamesCursor;

    for (gamesCounter = 0; gamesCounter < 10; gamesCounter++) {
        gamesRequest = new Request(requestUrlBase + (gamesCursor != undefined ? '&after=' + gamesCursor : ''), {headers: new Headers({'Client-ID': clientID})});
        gamesResponse = await fetch(gamesRequest);
        gamesData = await gamesResponse.json();
        // Get the cursor 
        gamesCursor = await gamesData.pagination.cursor;
        // Get each game from the returned JSON data and add it to the list
        gamesData.data.forEach(game => {
            tempGamesList.push(game);
        });
    }

    return tempGamesList;
}

async function getTopStreamsAsync(){
    console.log('--> getTopStreamsAsync');
    // See https://dev.twitch.tv/docs/api/reference/#get-streams

    // List to hold the top streams, to be returned by the function
    var tempStreamsList = []; 
    var requestUrlBase = 'https://api.twitch.tv/helix/streams?first=100';

    var streamsRequest,streamsResponse,streamsData,streamsCursor;

    for (streamsCounter = 0; streamsCounter < 10; streamsCounter++) {
        streamsRequest = new Request(requestUrlBase + (streamsCursor != undefined ? '&after=' + streamsCursor : ''), {headers: new Headers({'Client-ID': clientID})});
        streamsResponse = await fetch(streamsRequest);
        streamsData = await streamsResponse.json();
        // Get the cursor 
        streamsCursor = await streamsData.pagination.cursor;
        // Get each stream from the returned JSON data and add it to the list
        streamsData.data.forEach(stream => {
            tempStreamsList.push(stream);
        });
    }

    return tempStreamsList;
}






// Get back a list of the most popular games by number of viewers
topGames = getTopGamesAsync();

topStreams = getTopStreamsAsync();








// Display logic 
const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);



// finalData.forEach(game => {
//     const card = document.createElement('div');
//     card.setAttribute('class', 'card');

//     const h1 = document.createElement('h1');
//     h1.textContent = game.name;
//     // use game.box_art_url to get the image for each game

//     // Show number of viewers for game, number of streamers and average number of viewers per streamer
//     const p = document.createElement('p');
//     p.textContent = '';

//     container.appendChild(card);
//     card.appendChild(h1);
//     card.appendChild(p);
// })