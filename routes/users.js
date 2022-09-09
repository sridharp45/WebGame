const express = require('express');
const req = require('express/lib/request');
const passport = require('passport');
const User = require('../models/user');
const router = express.Router();
const CatchAsync = require('../utilities/catchAsync');
const users = require('../controllers/users');

router.get('/', (req, res) => {
    res.render('home')
});
router.route('/register')
    .get(users.renderRegister)
    .post(CatchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)


router.get('/logout', users.logout)
router.get('/guest',(req,res)=>{
    res.redirect('/game');
})
router.get('/game',(req,res)=>{
    res.render('game');
})
module.exports = router;