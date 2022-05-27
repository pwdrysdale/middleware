// middleware functions

const mw1= (req, res, next) => {
    console.log('mw1');
    next();
}

const mw2= (req, res, next) => {
    console.log('mw2');
    req.mw2 = "mw2 added things"
    next();
}

const mw3= (req, res, next) => {
    console.log('Running MW3');
    console.log('This will run before or after the routes, depending on where it is placed');
    // throw new Error('Error thrown from MW3');
    next();
}

// middleware with args
const mw4 = ( arg1, arg2) => {
    return (req, res, next) => {
        console.log('mw4', arg1, arg2);
        req['arg1']= arg1;
        req['arg2']= arg2;
        next();
    }
}

const mwe = (req, res, next) => {
    throw new Error("Yeah not so much")
}

// async middleware
const amw = async (req, res, next) => {

    await new Promise((resolve) => {
        setTimeout(() => {
            console.log('amw');
            resolve(next());
        }, 1000);
    })
}

const mwmaybe = (req, res, next) => {
    const num = Math.random()
    if (num > 0.5) {
        return next()
    } else {
        res.send("Nope for you main fn...")
    }
}

// async middleware with args
const amw2 = async (arg1, arg2) => {
    return async (req, res, next) => {
        await new Promise((resolve) => {
            setTimeout(() => {
                console.log('amw2', arg1, arg2);
                resolve(next());
            }, 1000);
        })
    }
}

catchErr = (err, req, res, next)=> {
    console.log("Caught error: ",err);
    return res.status(500).send('Error');
}

module.exports =  {mw1, mw2, mw3, mw4, mwe, amw, amw2, mwmaybe, catchErr};