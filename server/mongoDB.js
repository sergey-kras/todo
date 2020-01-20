const mongoose = require('mongoose');

class MongoDBConnect {
    constructor() {
        this.uri =`mongodb+srv://admin:admin@cluster0-vgcvw.mongodb.net/Calendar?retryWrites=true&w=majority`;
        this.connectOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        };
    }

    connect() {
        mongoose
            .connect(this.uri, this.connectOptions)
            .then()
            .catch();
        return this;
    }

    addEventsLogs() {
        const { connection } = mongoose;
        connection.on('error', err => {
            // tslint:disable:no-console
            console.error('Data base connect error');
        });
        connection.once('open', () => {
            // tslint:disable:no-console
            console.info('Data base connect start');
        });
        connection.once('close', () => {
            // tslint:disable:no-console
            console.info('Data base connect close');
        });
    }
}

module.exports = new MongoDBConnect();
