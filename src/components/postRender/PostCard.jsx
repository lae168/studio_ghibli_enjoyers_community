// PostCard.js
import React from "react";
import { Link } from "react-router-dom";
import { highlightSearchKeyword } from "./HighlightedTextComponent"; // Import the highlightSearchKeyword function

const PostCard = ({ post, search, onEdit, onDelete }) => (
  <div
    key={post.id}
    className="relative border border-t-4 border-gradient rounded-lg p-4 mx-auto my-4 bg-gradient-to-r from-purple-300 to-pink-400 animate-gradient shine-light"
  >
    <p className="text-sm font-semibold">
      <img
        src={post.image}
        alt={`Image for ${post.title}`}
        style={{ maxWidth: "100%" }}
      />
      <Link
        to={`/posts/${post.id}`}
        className="text-purple-500 hover:underline cursor-pointer"
      >
        {highlightSearchKeyword(post.title, search)}
      </Link>
    </p>
    <p className="text-sm font-semibold">
      {highlightSearchKeyword(post.body, search)}
    </p>
    <p className="text-sm font-semibold"> Posted by {post.user}</p>
  </div>
);

export default PostCard;
