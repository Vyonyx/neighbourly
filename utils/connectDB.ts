import mongoose from "mongoose"

export default async function connectDB() {
  return await mongoose.connect('mongodb+srv://shaneel1234:shaneel1234@neighbourlycluster.1eqmpht.mongodb.net/?retryWrites=true&w=majority')
}