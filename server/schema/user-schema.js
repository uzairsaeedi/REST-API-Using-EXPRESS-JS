import mongoose from 'mongoose';

// Define the counter schema
const counterSchema = mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', counterSchema);

// Define the user schema
const userSchema = mongoose.Schema({
    userId: { type: Number, unique: true },
    name: String,
    username: String,
    email: String,
    phone: Number
});

// Pre-save hook to auto-increment userId
userSchema.pre('save', async function (next) {
    const doc = this;
    if (doc.isNew) {
        try {
            const counter = await Counter.findByIdAndUpdate(
                { _id: 'userId' },
                { $inc: { seq: 1 } },
                { new: true, upsert: true }
            );
            doc.userId = counter.seq;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

// Turn it into a model
const User = mongoose.model('user', userSchema);

// Initialize the counter for the first time (if needed)
// async function initializeCounter() {
//     const userCounter = await Counter.findOne({ _id: 'userId' });
//     if (!userCounter) {
//         const newCounter = new Counter({ _id: 'userId', seq: 0 });
//         await newCounter.save();
//     }
// }

// Call this function somewhere in your initialization code
//initializeCounter();

export default User;