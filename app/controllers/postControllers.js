const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

const httpGetAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate({
        path: `createdBy`,
        select: `name`,
      })
      .populate({
        path: `comments`,
        populate: [
          {
            path: `sentBy`,
            select: `name`,
          },
          {
            path: `likedBy`,
            select: `name`,
          },
        ],
      });

    res.status(200).send({
      data: posts,
      success: true,
      msg: `successfully fetched all the posts`,
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      err: `there was a problem while fethcing all posts`,
    });
  }
};
const httpCreatePost = async (req, res) => {
  try {
    const userId = req.headers[`userId`];
    const message = req.body.message;

    const postObj = {
      createdBy: userId,
      message: message,
    };
    const post = await Post.create(postObj);
    return res.status(201).send({
      data: post,
      success: true,
      msg: `post is successfully created `,
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      err: `there was a problem while creating a post`,
    });
  }
};

const httpUpdatePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.headers[`userId`];
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(400).send({
        err: `post not found it may have deleted`,
      });
    }

    // we must not allow any other user to modify other post

    if (userId !== post.createdBy.toString()) {
      // he is try to access other post
      return res.status(403).send({
        err: `your have no access to perform this operation`,
      });
    }

    const newPost = await Post.findOneAndUpdate(postId, req.body, {
      new: true,
    });
    return res.status(200).send({
      data: newPost,
      success: true,
      msg: `post updated succesfully`,
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      err: `there was a problem while updating a  post`,
    });
  }
};

const httpDeletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.headers[`userId`];
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(400).send({
        err: `post not found it may have deleted`,
      });
    }

    // we must not allow any other user to delete other post

    if (userId !== post.createdBy.toString()) {
      // he is try to access other post
      return res.status(403).send({
        err: `your have no access to perform this operation`,
      });
    }

    const delPost = await Post.findByIdAndDelete(postId);
    return res.status(200).send({
      data: delPost,
      success: true,
      msg: `post deleted successfully`,
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      err: `there was a problem while deleting a  post`,
    });
  }
};
const httpCreateComment = async (req, res) => {
  try {
    const userId = req.headers[`userId`];
    const sentAt = req.params.postId;
    const post = await Post.findById(sentAt);
    if (!post) {
      res.status(400).send({
        err: `post is not found it may have got deleted`,
      });
    }
    const commentObj = {
      sentBy: userId,
      sentAt: sentAt,
      message: req.body.message,
    };

    const comment = await Comment.create(commentObj);

    post.comments.push(comment._id);
    await post.save();
    return res.status(201).send({
      data: comment,
      success: true,
      msg: `comment successfully created for the requested post`,
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      err: `there was a problem while creating comment`,
    });
  }
};

httpLikeComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const comment = await Comment.findById(commentId);
    const userId = req.headers[`userId`];
    if (!comment) {
      return res.status(400).send({
        err: `comment not found`,
      });
    }

    if (!comment.likedBy.includes(userId)) {
      comment.likedBy.push(userId);
      await comment.save();
    }

    res.status(200).send({
      data: comment._id,
      success: true,
      msg: `succesfully liked the comment`,
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      err: `there was problem while liking the comment`,
    });
  }
};
module.exports = {
  httpCreatePost,
  httpCreateComment,
  httpLikeComment,
  httpGetAllPosts,
  httpUpdatePost,
  httpDeletePost,
};
