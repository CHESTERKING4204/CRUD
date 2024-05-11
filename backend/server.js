const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/userRouter.js');
const cors = require('cors');

app.use(cors());

app.use(express.json());

const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();

mongoose.connect(process.env.URI/*,{ useNewUrlParser: true, useUnifiedTopology: true}*/)
    .then(() => {
        console.log('Connected Successfully');
        app.listen(process.env.PORT || 8000, (err) => {
            if (err) console.log(err);
            console.log('The port is running on ', process.env.PORT || 8000);
        });
    })
    .catch(err => {
        console.log(err, 'This is an error');
    });

app.use(userRoute);




// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const User = require('./models/userModel.js');

// dotenv.config();

// const connectToDatabase = async () => {
//   try {
//     await mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true });

//     console.log('Connected to MongoDB');

//     app.listen(process.env.PORT || 8000, (err) => {
//       if (err) {
//         console.error('Error starting server:', err);
//       } else {
//         console.log('Server is running on port ', process.env.PORT || 8000);
//       }
//     });
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//     // Retry connection after 5 seconds
//     setTimeout(connectToDatabase, 5000);
//   }
// };

// // Set up event listeners
// mongoose.connection.on('error', (err) => {
//   console.error('MongoDB connection error:', err);
//   mongoose.disconnect(); // Disconnect to trigger reconnect
// });

// mongoose.connection.on('disconnected', () => {
//   console.log('MongoDB disconnected');
//   // Retry connection after 5 seconds
//   setTimeout(connectToDatabase, 5000);
// });

// // Initial connection attempt
// connectToDatabase();

// app.get("/", (req, res) => {
//   res.send("API running");
// });
