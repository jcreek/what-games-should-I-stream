const app = document.getElementById('root');

var clientID = 'xxxxxx'; // Hide this for github, it's my application's Client ID
var topGames = []; // Holds roughly the top thousand games by viewers, although the viewer count per game is unavailable for some reason but this can be calculated by totalling the viewers from all streams for a particular game, if necessary
var topStreams = []; // Need to get a lot more of these to get useful data, and compare using the game ids where they match the top games - N.B. will need to remove/ignore any duplicate streams as between pages the data can change as viewers leave and join streams

async function getTopGamesAsync(){
    console.log('--> getTopGamesAsync');
    // See https://dev.twitch.tv/docs/api/reference/#get-top-games

    // List to hold the top games, to be returned by the function
    var tempList = []; 
    var requestUrlBase = 'https://api.twitch.tv/helix/games/top?first=100';

    var request1 = new Request(requestUrlBase, {headers: new Headers({'Client-ID': clientID})});
    let response1 = await fetch(request1);
    let data1 = await response1.json();
    // Get the cursor 
    let cursor1 = await data1.pagination.cursor;
    // Get each game from the returned JSON data and add it to the list
    data1.data.forEach(game => {
        tempList.push(game);
    });

    var request2 = new Request(requestUrlBase + '&after=' + cursor1, {headers: new Headers({'Client-ID': clientID})});
    let response2 = await fetch(request2);
    let data2 = await response2.json();
    // Get the cursor 
    let cursor2 = await data1.pagination.cursor;
    // Get each game from the returned JSON data and add it to the list
    data2.data.forEach(game => {
        tempList.push(game);
    });

    var request3 = new Request(requestUrlBase + '&after=' + cursor1, {headers: new Headers({'Client-ID': clientID})});
    let response3 = await fetch(request3);
    let data3 = await response3.json();
    // Get the cursor 
    let cursor3 = await data2.pagination.cursor;
    // Get each game from the returned JSON data and add it to the list
    data3.data.forEach(game => {
        tempList.push(game);
    });

    var request4 = new Request(requestUrlBase + '&after=' + cursor1, {headers: new Headers({'Client-ID': clientID})});
    let response4 = await fetch(request4);
    let data4 = await response4.json();
    // Get the cursor 
    let cursor4 = await data3.pagination.cursor;
    // Get each game from the returned JSON data and add it to the list
    data4.data.forEach(game => {
        tempList.push(game);
    });

    var request5 = new Request(requestUrlBase + '&after=' + cursor1, {headers: new Headers({'Client-ID': clientID})});
    let response5 = await fetch(request5);
    let data5 = await response5.json();
    // Get the cursor 
    let cursor5 = await data4.pagination.cursor;
    // Get each game from the returned JSON data and add it to the list
    data5.data.forEach(game => {
        tempList.push(game);
    });

    var request6 = new Request(requestUrlBase + '&after=' + cursor1, {headers: new Headers({'Client-ID': clientID})});
    let response6 = await fetch(request6);
    let data6 = await response6.json();
    // Get the cursor 
    let cursor6 = await data5.pagination.cursor;
    // Get each game from the returned JSON data and add it to the list
    data6.data.forEach(game => {
        tempList.push(game);
    });

    var request7 = new Request(requestUrlBase + '&after=' + cursor1, {headers: new Headers({'Client-ID': clientID})});
    let response7 = await fetch(request7);
    let data7 = await response7.json();
    // Get the cursor 
    let cursor7 = await data6.pagination.cursor;
    // Get each game from the returned JSON data and add it to the list
    data7.data.forEach(game => {
        tempList.push(game);
    });

    var request8 = new Request(requestUrlBase + '&after=' + cursor1, {headers: new Headers({'Client-ID': clientID})});
    let response8 = await fetch(request8);
    let data8 = await response8.json();
    // Get the cursor 
    let cursor8 = await data7.pagination.cursor;
    // Get each game from the returned JSON data and add it to the list
    data8.data.forEach(game => {
        tempList.push(game);
    });

    var request9 = new Request(requestUrlBase + '&after=' + cursor1, {headers: new Headers({'Client-ID': clientID})});
    let response9 = await fetch(request9);
    let data9 = await response9.json();
    // Get the cursor 
    let cursor9 = await data8.pagination.cursor;
    // Get each game from the returned JSON data and add it to the list
    data9.data.forEach(game => {
        tempList.push(game);
    });

    var request10 = new Request(requestUrlBase + '&after=' + cursor1, {headers: new Headers({'Client-ID': clientID})});
    let response10 = await fetch(request10);
    let data10 = await response10.json();
    // Get the cursor 
    let cursor10 = await data9.pagination.cursor;
    // Get each game from the returned JSON data and add it to the list
    data10.data.forEach(game => {
        tempList.push(game);
    });


    return tempList;
}

async function getTopStreamsAsync(){
    console.log('--> getTopStreamsAsync');
    // See https://dev.twitch.tv/docs/api/reference/#get-streams

    // List to hold the top streams, to be returned by the function
    var tempList = []; 
    var requestUrlBase = 'https://api.twitch.tv/helix/streams?first=100';

    // var request1 = new Request(requestUrlBase, {headers: new Headers({'Client-ID': clientID})});
    // let response1 = await fetch(request1);
    // let data1 = await response1.json();
    // // Get the cursor 
    // let cursor1 = await data1.pagination.cursor;
    // // Get each stream from the returned JSON data and add it to the list
    // data1.data.forEach(stream => {
    //     tempList.push(stream);
    // });

    var request,response,data,cursor;

    for (i = 0; i < 10; i++) {
        request = new Request(requestUrlBase + (cursor != undefined ? '&after=' + cursor : ''), {headers: new Headers({'Client-ID': clientID})});
        response = await fetch(request);
        data = await response.json();
        // Get the cursor 
        cursor = await data.pagination.cursor;
        // Get each stream from the returned JSON data and add it to the list
        data.data.forEach(stream => {
            tempList.push(stream);
        });
    }





    return tempList;
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