'use strict';

let constants = require('./config/constants');

require('./config/database')(constants);

let data = require('./data');
let app = require('./config/express')(data);

app.listen(constants.port, () => {
    console.log(`In-Da-Game running on ${constants.port}`);
});