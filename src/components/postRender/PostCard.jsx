// PostCard.js
import React from "react";
import { Link } from "react-router-dom";
import { highlightSearchKeyword } from "@/components/postRender/HighlightedTextComponent"; // Import the highlightSearchKeyword function

const PostCard = ({ post, search, onEdit, onDelete }) => (
  <div
    key={post.id}
    className="relative border border-t-4 border-gradient rounded-lg p-4  my-4 shine-light bg-gradient-to-r from-purple-300 to-pink-400 animate-gradient"
  >
    <p className="text-sm font-semibold">
      <img
        src={post.image}
        alt={`Image for ${post.title}`}
        style={{ maxWidth: "100%" }}
      />
      <Link
        to={`/posts/${post.id}`}
        className="text-purple-500 hover: underline-offset-2 cursor-pointer text-base"
      >
        {highlightSearchKeyword(post.title, search)}
      </Link>
    </p>
    <p className="text-sm font-semibold overflow-ellipsis overflow-hidden max-h-10">
      {highlightSearchKeyword(post.body, search)}
    </p>
    <p className="text-sm font-semibold"> Posted by {post.user}</p>
  </div>
);

export default PostCard;
