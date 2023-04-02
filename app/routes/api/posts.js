const express = require("express");
const {
  httpCreatePost,
  httpCreateComment,
  httpLikeComment,
  httpGetAllPosts,
  httpUpdatePost,
  httpDeletePost,
} = require("../../controllers/postControllers");
const { isLoggedIn } = require("../../middlewares/authMiddlewares");

const postRouter = express.Router();

// all these routes the user to logged in

postRouter.get("/", isLoggedIn, httpGetAllPosts);
postRouter.post("/", isLoggedIn, httpCreatePost);
postRouter.patch("/:postId", isLoggedIn, httpUpdatePost);
postRouter.delete("/:postId", isLoggedIn, httpDeletePost);

// now we will add the routes to the comments

postRouter.post("/:postId/comments", isLoggedIn, httpCreateComment); // this add the comment to the post that has same postid
postRouter.post("/comments/:commentId/like", isLoggedIn, httpLikeComment); // this adds the user who liked the particular comment
module.exports = postRouter;
