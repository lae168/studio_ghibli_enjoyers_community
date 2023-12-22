// PostCard.js
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { highlightSearchKeyword } from "./HighlightedTextComponent";

const PostCardWithUser = ({
  post,
  user,
  selectedPost,
  handleMenuToggle,
  handleEdit,
  handleSaveEdit,
  handleDelete,
  editedPost,
  search,
}) => (
  <div
    key={post.id}
    className="relative border border-t-4 border-gradient rounded-lg p-4 mx-auto my-4 shine-light bg-gradient-to-r from-purple-300 to-pink-400 animate-gradient"
  >
    <p className="text-sm font-semibold">
      {post.userId === user.id && (
        <img
          src="src/assets/menu.png"
          alt="Small Icon"
          className="absolute top-4 right-4 w-4 h-4"
          onClick={() => handleMenuToggle(post)}
        />
      )}
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
    <p className="text-sm font-semibold">
      {post.userId === user.id ? (
        "Posted by you"
      ) : (
        <>
          Posted by{" "}
          <NavLink
            to={`/users/${post.userId}`}
            className="text-purple-500 hover:underline cursor-pointer"
          >
            {post.user}
          </NavLink>
        </>
      )}
    </p>
    {selectedPost === post && (
      <div className="absolute top-8 right-2 bg-white p-2 border border-gray-300 rounded-md">
        {editedPost.title && editedPost.body ? (
          <button
            className="text-green-500 mr-2 text-sm font-bold"
            onClick={() => handleSaveEdit(post)}
          >
            Save
          </button>
        ) : null}
        <button
          className="text-blue-500 mr-2 text-sm font-bold"
          onClick={() => handleEdit(post)}
        >
          Edit
        </button>
        <button
          className="text-red-500 text-sm font-bold"
          onClick={() => handleDelete(post)}
        >
          Delete
        </button>
      </div>
    )}
  </div>
);

export default PostCardWithUser;
