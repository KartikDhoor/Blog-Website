const Agenda = require('agenda');
const Blog = require('../modules/blogModel');

const mongoConnectionString = 'mongodb://localhost:27017/yourdb'; // Replace with your MongoDB connection string

// Here, we set the collection name to 'blogJobs' for storing jobs
const agenda = new Agenda({
  db: {
    address: mongoConnectionString,
    collection: 'blogJobs' // Custom collection name
  }
});
agenda.define('publish blog', async job => {
    const { blogId } = job.attrs.data; // Retrieve the blog ID from the job data
  
    try {
      // Find the blog by ID and update its status
      const blog = await Blog.findById(blogId);
      if (!blog) {
        console.log('Blog not found');
        return;
      }
  
      // Update the status to 'published'
      blog.status = 'published';
      await blog.save();
      console.log(`Blog ${blogId} has been published.`);
    } catch (err) {
      console.error('Error publishing blog:', err);
    }
  });
module.exports = agenda;