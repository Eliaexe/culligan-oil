import mongoose, { Schema, Document } from 'mongoose';

export interface BlogPostDocument extends Document {
  title: string;
  content: string;
  category?: string;
  tags: string[];
  author: string;
  image: string;
}

const BlogPostSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: false },
  tags: { type: [String], required: true },
  author: { type: String, required: true },
  image: { type: String, reqired: true}
});

const BlogPost = mongoose.models.BlogPost || mongoose.model<BlogPostDocument>('BlogPost', BlogPostSchema);

export default BlogPost;
