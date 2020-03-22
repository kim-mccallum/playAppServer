const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));

let apps = require('./playstore.js');

// Finish with logic in here: 
app.get('/playstore-apps', (req, res) => {
    let { sort, genre } = req.query;

    if(sort){
        // capitalize the first letter
        sort = sort.charAt(0).toUpperCase() + sort.slice(1);
        // console.log(`here is sort: ${sort}`)
        if(!['Rating','App'].includes(sort)){
            return res.status(400).send('Sort must be one of "Rating" or "App"')
        }
    }

    if(sort){
        apps.sort((a, b) => {
            return a[sort] < b[sort] ? 1 : a[sort] > b[sort] ? -1 : 0;
        })
    }

    if(genre){
        console.log(`here is genre: ${genre}`)
        if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genre)){
            return res.status(400).send("Sort must be one of 'Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade' or 'Card'")
        }
    }

    if(genre){
        apps = apps.filter(item => {
            return item.Genres.includes(genre)
        })
    }

    res.send(apps)

})

app.listen(8000, () => {
    console.log('Server commenced on PORT 8000!')
})