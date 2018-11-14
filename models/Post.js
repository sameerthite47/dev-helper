const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    category: { type: Schema.Types.ObjectId, ref: 'categories' },
    title: { type: String, required:true },
    description: { type: String },
    imageUrl: { type: String },
    isActive: { type: Boolean, default: true },
    body: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
    comments: [{
            user: { type: Schema.Types.ObjectId, ref: 'users' },
            body: { type: String, required: true },
            createdDate: { type: Date, default: Date.now }
    }],
    likes: [{ user: { type: Schema.Types.ObjectId, ref: 'users' }}]
});

module.exports = Post = mongoose.model('post', PostSchema);

