const e = require('express');
const express = require('express');
const router = express.Router();
let videoGames = require('../models/Games')

router.get('/get-all-games', (req, res) => {
    if (videoGames.length) {
        return res.status(200).json({confirmation: 'List all games Success', videoGames});
    } else {
        return res.status(400).json({confirmation: 'fail', message: 'No games listed.'});
    }
});

router.get('/get-single-game/:id', (req, res) => {
    let foundGame = videoGames.filter(game => {
        if (game.id === req.params.id) {
            return res.status(200).json({confirmation: 'Find single game success', game});
        }
    });
    if (!foundGame.length) {
        return res.status(400).json({confirmation: 'fail', message: 'No game with that ID found'});
    }
});

router.post('/create-game', (req, res) => {
    
    if (!req.body.name || !req.body.description) {
        return res
            .status(400)
            .json({confirmation: 'fail', message: 'Name and Description Must Be Filled.'});
    }

    let existingGame = videoGames.filter((game) => game.name === req.body.name);
    if (existingGame.length) {
            return res.status(400).send('Game Already Exists');
        }
    
    const newGame = {};

    newGame.id = String(videoGames.length + 1);
    newGame.name = req.body.name;
    newGame.description = req.body.description;
    newGame.released = req.body.released;
    newGame.playtime = req.body.playtime;

    videoGames.push(newGame);
    return res.status(200).json({ confirmation: 'success', newGame});
});

router.put('/update-game/:id', (req, res) => {
    let updatedGame = req.body;
    videoGames.filter((game) => {
        if(game.id === req.params.id) {
            game.name = updatedGame.name 
                ? updatedGame.name 
                : game.name;
            game.description = updatedGame.description 
                ?updatedGame.description
                : game.description;
            game.released = updatedGame.released 
                ? updatedGame.released 
                : game.released;
            game.playtime = updatedGame.playtime 
                ?updatedGame.playtime
                : game.playtime;
        }
    });
    return res.status(200).json({message: 'Game Updated', videoGames})
}); 

module.exports = router;
