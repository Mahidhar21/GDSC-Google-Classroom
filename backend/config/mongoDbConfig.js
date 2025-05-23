import mongoose from 'mongoose';

const connectDb=async ()=>{

    mongoose.connection.on('connected',()=>{
        console.log("Mongodb connected");
    })

    await mongoose.connect(`${process.env.MONGODB_URL}/GoogleClassroom`);
}
// mongoose.set('debug', true);

export default connectDb;