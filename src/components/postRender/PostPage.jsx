// React
import React, { useEffect, useState } from "react";
import axios from "axios";

//context
import { useAuth } from "../../contexts/AuthContext";

//component
import PostCard from "./PostCard";
import PostGrid from "./PostGrid";

function PostPage() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const { user } = useAuth();
  const [selectedPost, setSelectedPost] = useState(null);
  const [editedPost, setEditedPost] = useState({ title: "", body: "" });

  const highlightSearchKeyword = (text, keyword) => {
    if (!keyword) return text; // If no keyword, return original text
    const regex = new RegExp(`(${keyword})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-cyan-400">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const handleMenuToggle = (post) => {
    setSelectedPost(post === selectedPost ? null : post);
    setEditedPost({ title: "", body: "" }); // Reset editedPost when toggling the menu
  };

  const handleEdit = (post) => {
    setSelectedPost(post);

    // a form for editing,collect new data from the user
    const newTitle = prompt("Enter new title:", post.title) || post.title;
    const newBody = prompt("Enter new body:", post.body) || post.body;

    // Update the local state for editing
    setEditedPost({ title: newTitle, body: newBody });
  };

  const handleSaveEdit = async (post) => {
    try {
      // Send a PUT request to the server to update the post
      const updatedPost = {
        ...post,
        title: editedPost.title,
        body: editedPost.body,
      };
      await axios.put(`http://localhost:3030/posts/${post.id}`, updatedPost);

      // Update the local state to reflect the changes
      setPosts((prevPosts) =>
        prevPosts.map((p) => (p.id === post.id ? { ...p, ...updatedPost } : p))
      );

      // Close the small box
      setSelectedPost(null);
      setEditedPost({ title: "", body: "" });

      console.log(`Post ${post.id} updated successfully`);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDelete = async (post) => {
    try {
      // Send a DELETE request to the server to delete the post
      await axios.delete(`http://localhost:3030/posts/${post.id}`);

      // Update the local state to reflect the deletion
      setPosts((prevPosts) => prevPosts.filter((p) => p.id !== post.id));

      // Close the small box
      setSelectedPost(null);

      console.log(`Post ${post.id} deleted successfully`);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3030/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Display the last 10 posts as featured posts
  const featuredPosts = posts.slice(-10);

  const remainingPosts = posts.slice(0);

  if (user) {
    return (
      <div className="flex flex-col">
        {/* search box */}
        <input
          type="text"
          className="mx-auto pl-5 my-2 border border-1 border-rounded 
          bg-gradient-to-r from-purple-300 to-pink-400 animate-gradient shine-light
          border-slate-600 rounded-lg h-10 text-gray-600"
          placeholder="Search Posts' content"
          value={search}
          onChange={(e) => handleSearch(e)}
        />

        <span className="text-center text-2xl font-semibold text-cyan-500">
          <span className="text-purple-600">F</span>eatured{" "}
          <span className="text-purple-600">P</span>osts{" "}
        </span>

        <PostGrid
          posts={featuredPosts}
          user={user}
          selectedPost={selectedPost}
          handleMenuToggle={handleMenuToggle}
          handleEdit={handleEdit}
          handleSaveEdit={handleSaveEdit}
          handleDelete={handleDelete}
          editedPost={editedPost}
          search={search}
        />

        <span className="text-center text-2xl font-semibold text-cyan-500">
          <span className="text-purple-600">A</span>ll{" "}
          <span className="text-purple-600">P</span>osts{" "}
        </span>
        <PostGrid
          posts={remainingPosts}
          user={user}
          selectedPost={selectedPost}
          handleMenuToggle={handleMenuToggle}
          handleEdit={handleEdit}
          handleSaveEdit={handleSaveEdit}
          handleDelete={handleDelete}
          editedPost={editedPost}
          search={search}
        />
      </div>
    );
  } else if (!user) {
    return (
      <div className="flex flex-col">
        <input
          type="text"
          className="mx-auto pl-5 my-2 border border-1 border-rounded 
    bg-gradient-to-r from-purple-300 to-pink-400 animate-gradient 
    bg-purple-200 border-slate-600 rounded-lg h-10 text-gray-700"
          placeholder="Search Posts"
          value={search}
          onChange={(e) => handleSearch(e)}
        />
        <span className="text-center text-2xl font-semibold text-cyan-500">
          <span className="text-purple-600">F</span>eatured{" "}
          <span className="text-purple-600">P</span>osts{" "}
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto w-full sm:w-[80%] lg:w-[60%]">
          {featuredPosts
            .filter((post) => post.body.includes(search))
            .map((post) => (
              <PostCard key={post.id} post={post} search={search} />
            ))}
        </div>

        <span className="text-center text-2xl font-semibold text-cyan-500">
          <span className="text-purple-600">A</span>ll{" "}
          <span className="text-purple-600">P</span>osts{" "}
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto w-full sm:w-[80%] lg:w-[60%]">
          {remainingPosts
            .filter((post) => post.body.includes(search))
            .map((post) => (
              <PostCard key={post.id} post={post} search={search} />
            ))}
        </div>
      </div>
    );
  }
}

export default PostPage;
