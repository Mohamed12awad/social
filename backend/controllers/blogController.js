const Blog = require("../models/blogModel");

exports.getAllBlogs = async (req, res) => {
  try {
    const blog = await Blog.find()
      .sort({ updatedAt: -1 })
      .populate("author", "username");
    res.status(200).json(blog);
  } catch (err) {
    console.log(err);
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const userId = req.user.userId;
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Insufficient data. User ID not provided." });
    }

    const blogs = await Blog.find({ author: userId }).populate(
      "author",
      "username"
    );

    if (!blogs || blogs.length === 0) {
      return res
        .status(404)
        .json({ message: "No blogs found for this author." });
    }

    res.status(200).json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.singleBlog = async (req, res) => {
  id = req.params.id;
  try {
    if (id) {
      const blog = await Blog.findById(id).populate("author", [
        "username",
        "email",
      ]);

      if (!blog) {
        return res.status(404).json({ message: "Blog not found." });
      }

      const authorId = blog.author;
      const otherBlogsByAuthor = await Blog.find({ author: authorId }).limit(
        10
      );

      let otherBlogs = otherBlogsByAuthor.filter((i) => !i._id.equals(id));

      if (!otherBlogs || otherBlogs.length === 0) {
        otherBlogs = ["No other blogs found by this author."];
      }

      res.status(200).json({ blog, otherBlogs });
      // console.log(otherBlogs);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.addBlog = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.userId;
  try {
    const blog = await Blog.create({
      title,
      content,
      author: userId,
    });

    res.status(200).json({ message: "blog was added successfully.." });
  } catch (err) {
    console.log(err);
  }
};

exports.editBlog = async (req, res) => {
  const edit = req.body;
  const blogId = req.params.id;
  const userId = req.user.userId;

  try {
    const blog = await Blog.findOneAndUpdate(
      {
        author: userId,
        _id: blogId,
      },
      edit,
      { new: true }
    );

    res.status(200).json({ message: "blog was edited successfully..", blog });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteBlog = async (req, res) => {
  const blogId = req.params.id;

  try {
    const blog = await Blog.findByIdAndDelete(blogId);

    res.status(200).json({ message: "blog was deleted successfully.." });
  } catch (err) {
    console.log(err);
  }
};
