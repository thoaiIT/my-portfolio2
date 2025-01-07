import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // eslint-disable-next-line no-undef
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection error:', error.message);
    // eslint-disable-next-line no-undef
    process.exit(1);
  }
};

export default connectDB;
