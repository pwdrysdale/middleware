const express = require('express');
const {mw1, mw2, mw3, mw4, mwe, amw, mwmaybe, catchErr} = require('./middleware');



const app = express();

app.use(mw3)

app.get('/', (req, res)=> {
    res.send('Hello World')
})

app.get('/nomw', (req, res) => {
    return res.send('nomw')
})

app.get('/mw1', mw1, (req, res) => {
    console.log('Route hit for MW1');
    return res.send('mw1');
})

app.get('/mw2', [mw1, mw2], (req, res) => {
    console.log('Route hit for MW2');
    return res.send(req.mw2);
})

app.get('/mw4', mw4('argument 1', 'argument 2'), (req, res) => {
    console.log('Route hit for MW4');
    console.log(req['arg1'], req['arg2']);
    return res.send('mw4');
})

app.get('/mwe', mwe, (req, res) => {
    console.log('Route hit for MW4');
    console.log(req['arg1'], req['arg2']);
    return res.send('mw4');
})

app.get('/amw', amw, (req, res) => {
    console.log('Route hit for AMW');
    return res.send('amw');
})

app.get('/mwmaybe', mwmaybe, (req, res) => {
    console.log('Route hit for MWmaybe');
    return res.send('mwmaybe');
})

app.use(catchErr)

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log('Listening on port ', PORT);
})