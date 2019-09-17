# what-games-should-I-stream

A web app to show, in real time, which games have most viewers and least streamers, that can be played to best grow a Twitch audience.

## Algorithm

Get top games (in sets of 100) by number of current viewers on Twitch, in order of most popular first -> https://dev.twitch.tv/docs/api/reference/#get-top-games 

Loop through each game and get details of how many streamers there are for that game (in order of most popular first) and how many viewers each has -> https://dev.twitch.tv/docs/api/reference/#get-streams
