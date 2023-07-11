require('dotenv').config();

const express = require('express'), 
app = express(), 
connectDB = require('./config/database'), 
logger = require('morgan'),
methodOverride = require('method-override'), 
expressSession = require('express-session'), 
cookieParser = require('cookie-parser'), 
expressValidator = require('express-validator'), 
connectFlash = require('connect-flash'), 
passport = require('passport'), 
MongoStore = require('connect-mongo'),
User = require('./models/User'), 
LocalStrategy = require('passport-local').Strategy,
cors = require('cors'), 
uf = require('./utils/utilityFunctions'), 
cacheFunctions = require('./cacheFunctions/mainCache');





connectDB();

app.set('port', process.env.PORT || 3001);

const corsOptions = {
    //To allow requests from client
    origin: "*",
    credentials: true,
    exposedHeaders: ["set-cookie"],
  };

app.use(cors(corsOptions));

app.use(logger('dev'));

app.use(methodOverride('_method', {
    methods : ['POST', 'GET']
}));

app.use(express.urlencoded({
    extended : true
}));

app.use(express.json());

app.use(cookieParser(process.env.SECRET_PASSCODE));

app.use(expressSession({
    store : MongoStore.create({
        mongoUrl : process.env.MONGO_URI, 
        autoRemove : 'native',
        ttl : 60*60 *1000,  
        autoRemoveInterval : 60, 
        touchAfter : 60 * 60 * 100, 
        mongoOptions: {
            useUnifiedTopology: true,
        }
    }), 
    secret : process.env.SECRET_PASSCODE, 
    resave : false, 
    saveUninitialized : false, 
    cookie : {
        maxAge : 60 * 60 * 1000 * 24
    },
}));


app.use(passport.initialize());

app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());

passport.deserializeUser(User.deserializeUser());


// app.use((request, response, next) => {
//     response.locals.loggedIn = request.isAuthenticated();
//     response.locals.currentUser = request.user;
//     next();
// });

app.use(expressValidator());

cacheFunctions.fetchAllUsers();

app.use('/api', require('./routes/routes'));

app.listen(app.get('port') ,() => {
    console.log(`Server has started and is Listening on Port : ${app.get('port')}`);
});

module.exports = app;