import mongoose from 'mongoose';

const JournalSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: [true, 'Please provide a title'],
        maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    content: {
        type: String,
        required: [true, 'Please provide content'],
    },
    sentiment: {
        type: String,
        enum: ['Positive', 'Neutral', 'Negative'],
        default: 'Neutral',
    },    mood: {
        type: String,
        required: false,
    },
    moodManuallySet: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Journal || mongoose.model('Journal', JournalSchema);
