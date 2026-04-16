import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import defaultData from '../../data.json';

const dataFilePath = path.join(process.cwd(), 'data.json');

const DataStoreSchema = new mongoose.Schema({
  password: { type: String, default: 'admin' },
  otp: String,
  otpExpires: Number,
  pages: [mongoose.Schema.Types.Mixed],
  content: mongoose.Schema.Types.Mixed,
  menu: [mongoose.Schema.Types.Mixed],
  gallery: [mongoose.Schema.Types.Mixed]
}, { strict: false });

let DataStore;
if (mongoose.models && mongoose.models.DataStore) {
  DataStore = mongoose.models.DataStore;
} else {
  DataStore = mongoose.model('DataStore', DataStoreSchema);
}

let cachedConn = null;
async function connectMongo() {
  if (cachedConn) return cachedConn;
  if (!process.env.MONGODB_URI) return null;
  cachedConn = await mongoose.connect(process.env.MONGODB_URI, { bufferCommands: false });
  return cachedConn;
}

export async function getDbData() {
  try {
    const conn = await connectMongo();
    if (conn) {
      // Fetch from MongoDB
      let doc = await DataStore.findOne();
      if (!doc) {
        // Init from data.json if Mongo is empty
        doc = await DataStore.create(defaultData);
      }
      return doc.toObject();
    } else {
      // Fallback to local defaultData
      return defaultData;
    }
  } catch (error) {
    console.error('Error reading database:', error);
    // If Mongo fails, at least return the defaultData to avoid breaking the UI
    return defaultData;
  }
}

export async function saveDbData(data) {
  try {
    const conn = await connectMongo();
    if (conn) {
      // Save to MongoDB
      let doc = await DataStore.findOne();
      if (!doc) {
        await DataStore.create(data);
      } else {
        await DataStore.updateOne({ _id: doc._id }, { $set: data });
      }
      return true;
    } else {
      // Fallback to local data.json
      fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
      return true;
    }
  } catch (error) {
    console.error('Error writing to database:', error);
    return false;
  }
}
