const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config");

const app = express();

const routes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())



//mongo database
const db = config.MONGO_URI;
console.log(db)
// connet to mongo
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(db)
    .then(() => console.log(`MongoDB Connected`))
    .catch(err => console.log(err));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS, PATCH');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use(routes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
