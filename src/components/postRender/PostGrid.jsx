// PostGrid.js
import React from "react";
import PostCardWithUser from "./PostCardWithUser";

const PostGrid = ({
  posts,
  user,
  selectedPost,
  handleMenuToggle,
  handleEdit,
  handleSaveEdit,
  handleDelete,
  editedPost,
  search,
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto w-full sm:w-[80%] lg:w-[60%]">
    {posts
      .filter((post) => post.body.includes(search))
      .map((post) => (
        <PostCardWithUser
          key={post.id}
          post={post}
          user={user}
          selectedPost={selectedPost}
          handleMenuToggle={handleMenuToggle}
          handleEdit={handleEdit}
          handleSaveEdit={handleSaveEdit}
          handleDelete={handleDelete}
          editedPost={editedPost}
          search={search}
        />
      ))}
  </div>
);

export default PostGrid;
