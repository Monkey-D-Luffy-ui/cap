const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  let connected = false;

  if (uri && uri !== 'your_mongodb_connection_string') {
    try {
      console.log(`[DB] Attempting connection to MongoDB: ${uri.split('@').pop()}`);
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 2000
      });
      console.log('[DB] Connected successfully to primary MongoDB!');
      connected = true;
    } catch (err) {
      console.warn(`[DB] Could not connect to primary MONGODB_URI: ${err.message}`);
      console.log('[DB] Switching to in-memory MongoDB fallback...');
    }
  }

  if (!connected) {
    try {
      mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri);
      console.log(`[DB] Connected to In-Memory MongoDB at ${mongoUri}`);
      console.log('[DB] Hackathon Demo Ready: Database initialized in memory.');
    } catch (error) {
      console.error('[DB] Failed to start In-Memory MongoDB:', error);
    }
  }
};

module.exports = connectDB;
