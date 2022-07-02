import mongoose from 'mongoose';

// Connect to the Database
const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    }).then(() => {
        console.log("Successfully connect to database!");
    }).catch(err => {
        console.log(process.env.MONGODB_URI);
        console.log("Can't connect to the database");
        console.log(err);
    });
};

export default connectDB;
