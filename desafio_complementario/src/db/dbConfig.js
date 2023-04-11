import mongoose from 'mongoose';

const URI = 'mongodb+srv://desafioComplementario:coderHouse@steveo.bxgkikt.mongodb.net/ecommerce?retryWrites=true&w=majority';

mongoose.connect(URI)
    .then(() => console.log('DB is connected'))
    .catch(error => console.error(error));