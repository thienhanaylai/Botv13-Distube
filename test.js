const { getLyrics, getSong } = require('genius-lyrics-api');
const util = require("util")
try {


    const title = 'tháng năm';
    const options = {
        apiKey: 'fxRWwdEIxgyNPOOldRyqbzdKVTq5bEJOCb5hu23GaLKYvaOxN0rDuQFE3swNG6pP',
        title: title,
        artist: '',
        optimizeQuery: true
    };
    getSong(options).then(function(song) {
        let thumbnail;
        let url = song.thumbnail;
        /*if (url === null) {
            thumbnail = 'https://i0.wp.com/s1.uphinh.org/2021/09/25/Untitled2e84e3ca63fb3550.th.png';
        } else {
            thumbnail = song.thumbnail;
        }*/
        let str = util.inspect(song, {
            depth: 1,
        });
        console.log(str)

        console.log(`${song.lyrics}`)

    })





} catch (e) {
    console.error(e)
}