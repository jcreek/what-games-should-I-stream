const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

// !todo - Currently only getting top 100 games (a single page of results), need to get more for more accurate data analysi

function getTopGames(cursor) {
    console.log('--> getTopGames');
    // See https://dev.twitch.tv/docs/api/reference/#get-top-games
    
    var requestUrl = 'https://api.twitch.tv/helix/games/top?first=100';
    if(cursor.length > 0)
    {
        requestUrl += '&after=' + cursor;
    }
    var request = new Request(requestUrl, {
        headers: new Headers({
            'Client-ID': 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx' // Hide this for github, it's my application's Client ID
        })
    });

    // List to hold the top games, to be returned by the function
    var tempList = []; 
    var tempCursor = '';

    fetch(request)
    .then(response => {
        return response.json()
    })
    .then(data => {
        // Get the cursor 
        console.log(data.pagination.cursor);
        tempCursor = data.pagination.cursor;
        
        // Get each game from the returned JSON data and add it to the list
        data.data.forEach(game => {
            tempList.push(game);
        });
        
    })
    .catch(err => {
        // Do something for an error here
        const errorMessage = document.createElement('marquee')
        errorMessage.textContent = `Gah, it's not working! Error is ` + err
        app.appendChild(errorMessage)
    })

    return { 'data': tempList, 'cursor': tempCursor };
}


var numberOfResultsToReturn = 1000;
var topGames = [];

// Loop to get the right amount of data back
var cursor1 = '';
for (i = 0; i < (numberOfResultsToReturn / 100); i++) {
    console.log('--> loop ' + i);
    // Get back a list of 100 games and data.pagination.cursor as a string
    var returnedData = getTopGames(cursor1);
    console.log(returnedData);
    // Concatenate that list and save the next cursor
    topGames = topGames.concat(returnedData.data);
    cursor1 = returnedData.cursor;
};





function getTopStreams() {
    // See https://dev.twitch.tv/docs/api/reference/#get-streams
    var request = new Request('https://api.twitch.tv/helix/streams?first=100', {
        headers: new Headers({
            'Client-ID': 'eawzslliv2kz89gj58ul8tvy6p7fm3' // Hide this for github, it's my application's Client ID
        })
    });

    // List to hold the top games, to be returned by the function
    var tempList = []; 

    fetch(request)
    .then(response => {
        return response.json()
    })
    .then(data => {
        // Get each game from the returned JSON data and add it to the list
        data.data.forEach(game => {
            tempList.push(game);
        });
    })
    .catch(err => {
        // Do something for an error here
        const errorMessage = document.createElement('marquee')
        errorMessage.textContent = `Gah, it's not working! Error is ` + err
        app.appendChild(errorMessage)
    })

    return tempList;
}





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