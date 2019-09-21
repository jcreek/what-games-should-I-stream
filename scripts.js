const app = document.getElementById('root');

var clientID = 'xxxxxx'; // Hide this for github, it's my application's Client ID
var streamDataSet = [];
var finalData = [];

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

    for (streamsCounter = 0; streamsCounter < 100; streamsCounter++) {
        console.log('    ==> on loop ' + streamsCounter + ' of 100');
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

async function consolidateDataSet() {
    // Get back a list of the most popular games by number of viewers
    // Holds roughly the top thousand games by viewers, although the viewer count per game is unavailable for some reason but this can be calculated by totalling the viewers from all streams for a particular game, if necessary
    let topGames = await getTopGamesAsync();

    // Get back a list of the most popular steams by number of viewers
    // Need to get a lot more of these to get useful data, and compare using the game ids where they match the top games - N.B. will need to remove/ignore any duplicate streams as between pages the data can change as viewers leave and join streams
    let topStreams = await getTopStreamsAsync();


    // For each game in topGames, get each stream with the same gameId 
    topGames.forEach(function(game) {
        game.streams = topStreams.filter(stream => {
            return stream.game_id === game.id;
          })
        game.numStreams = game.streams.length;

        var tempViewerCount = 0;
        game.streams.forEach(function(stream) {
            tempViewerCount += stream.viewer_count;
        })
        game.numViewers = tempViewerCount;

        // Calculate weighting 
        var numStreamersToFavour = 10;
        var weighting =  Math.exp(0 - game.numStreams);

        // Calculate score 
        var ratio = game.numViewers / game.numStreams;
        game.score = ratio * weighting;
    });

    return topGames;
}

function displayData() {
    // Display logic 
    const appContainer = document.createElement('div');
    appContainer.setAttribute('class', 'appContainer');

    app.appendChild(appContainer);

    // Sort the dataset by the game scores we calculated
    var orderedStreamDataSet = streamDataSet.sort(function (a, b) {
        return a.score - b.score;
    })

    finalData = orderedStreamDataSet.slice(0,21); // Set to first 21 for testing purposes 

    finalData.forEach(game => {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');

        const img = document.createElement('img');
        img.setAttribute('style', 'width:100%');
        img.src = game.box_art_url.replace('{width}', '376').replace('{height}', '500');

        const container = document.createElement('div');
        container.setAttribute('class', 'container');

        const h4 = document.createElement('h4');
        h4.textContent = game.name;

        // Show number of viewers for game, number of streamers and average number of viewers per streamer
        const ul = document.createElement('ul');
        const li1 = document.createElement('li');
        const li2 = document.createElement('li');
        const li3 = document.createElement('li');
        const li4 = document.createElement('li');

        li1.textContent = 'Score: ' + game.score;
        li2.textContent = 'Number of streams: ' + game.numStreams;
        li3.textContent = 'Number of viewers: ' + game.numViewers;
        li4.textContent = 'Mean average viewers per stream: ' + (game.numViewers /game.numStreams);

        // const p = document.createElement('p');
        // p.textContent = '';

        appContainer.appendChild(card);
        card.appendChild(img);
        card.appendChild(container);
        container.appendChild(h4);
        container.appendChild(ul);
        ul.appendChild(li1);
        ul.appendChild(li2);
        ul.appendChild(li3);
        ul.appendChild(li4);
        // container.appendChild(p);
    })
}




consolidateDataSet().then((result) => {
    console.log('--> streamDataSet is ready for analysis');
    streamDataSet = result;
    console.log(streamDataSet);
}).then(() => {
    document.getElementsByClassName('spinner')[0].style.display = 'none';
    displayData();
});