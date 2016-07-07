const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
require('mongoose-type-url');

const port = process.env.PORT || 1337;
const dbAddress = process.env.DB_ADDRESS || 'mongodb://localhost/cars_db';

const app = express();
const pathToStatic = path.join(__dirname, 'static');


// ======= MongoDB setup =======

const Schema = mongoose.Schema;
const connection = mongoose.createConnection(dbAddress);
autoIncrement.initialize(connection);

const CarSchema = new Schema({
    name: { type: String, required: true, trim: true },  // name of the car
    author: { type: String, required: true, trim: true }, // name of the user who added the car
    description: { type: String, required: true, trim: true }, // description of the car
    photoUrl: { type: mongoose.SchemaTypes.Url, required: true }, // url to the image of the car
});

CarSchema.plugin(autoIncrement.plugin, { model: 'Car', startAt: 1 });
const Car = connection.model('Car', CarSchema);


express.static(path.join(__dirname, 'static'));
app.use(express.static(pathToStatic));
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/api/cars', (req, res) => {
    return Car.find((err, cars) => {
        if (!err) {
            return res.send(cars);
        } else {
            console.log(err);
            res.statusCode = 500;
            return res.send({ error: 'Server error' });
        }
    });
});

app.post('/api/cars', (req, res) => {
    let car = new Car({
        name: req.body.name,
        author: req.body.author,
        description: req.body.description,
        photoUrl: req.body.photoUrl
    });

    car.save(err => {
        if (!err) {
            return res.send({ status: 'OK', car });
        } else {
            console.log(err);

            if (err.name === 'ValidationError') {
                res.statusCode = 400;
                res.send({ error: 'Validation error' });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
            }
        }
    });
});

app.get('/api/cars/:id', (req, res) => {
    return Car.findById(req.params.id, (err, car) => {
        if (!car) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        if (!err) {
            return res.send({ status: 'OK', car });
        } else {
            console.log(err);
            res.statusCode = 500;
            return res.send({ error: 'Server error' });
        }
    });
});

app.put('/api/cars/:id', (req, res) => {
    return Car.findById(req.params.id, (err, car) => {
        if (!car) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }

        car.name = req.body.name;
        car.author = req.body.author;
        car.description = req.body.description;
        car.photoUrl = req.body.photoUrl;

        return car.save(err => {
            if (!err) {
                return res.send({ status: 'OK', car });
            } else {
                console.log(err);

                if (err.name === 'ValidationError') {
                    res.statusCode = 400;
                    res.send({ error: 'Validation error' });
                } else {
                    res.statusCode = 500;
                    res.send({ error: 'Server error' });
                }
            }
        });
    });
});

app.delete('/api/cars/:id', (req, res) => {
    return Car.findById(req.params.id, (err, car) => {
        if (!car) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        return car.remove(err => {
            if (!err) {
                return res.send({ status: 'OK' });
            } else {
                res.statusCode = 500;
                return res.send({ error: 'Server error' });
            }
        });
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(pathToStatic, 'index.html'));
});

app.listen(port, () => {
    console.log(`Express server is listening on port ${port}`);
});
