// React
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

//Axios
import axios from "axios";

//Context
import { useAuth } from "../contexts/AuthContext";



function PostDetailPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [showOptions, setShowOptions] = useState(null);
  const [selectedComment, setSelectedComment] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState("");

  const navigator = useNavigate();
  const { user } = useAuth();

  // Function to toggle the selected comment
  const toggleSelectedComment = (comment) => {
    if (selectedComment && selectedComment.id === comment.id) {
      // If the clicked comment is the same as the selected one, close the box
      setSelectedComment(null);
    } else {
      // Otherwise, open the box for the clicked comment
      setSelectedComment(comment);
    }
  };


  const handleEditComment = async () => {
    try {
      if (!selectedComment) {
        console.error("No comment selected for editing.");
        return;
      }

      // Use a temporary variable to store the edited comment text
      const editedText = prompt(
        "Enter the updated comment:",
        selectedComment.comment
      );

      // Check if the user clicked "Cancel" in the prompt
      if (editedText === null) {
        return;
      }

      // Update the state with the edited comment text
      setEditedCommentText(editedText);

      console.log(editedText); // Log the updated comment text

      // Make an API call to update the comment
      await axios.patch(`http://localhost:3030/comments/${selectedComment.id}`, {
        comment: editedText,
      });

      // Update the comment in the post
      const updatedComments = post.comment.map((c) =>
        c.id === selectedComment.id ? { ...c, comment: editedText } : c
      );

      // Update the post with the new comments
      await axios.patch(`http://localhost:3030/posts/${postId}`, {
        comment: updatedComments,
      });

      // Fetch updated post details
      await fetchPostDetails();

      // Close the options box
      setSelectedComment(null);
    } catch (error) {
      console.error("Error editing comment:", error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  // Function to fetch post details
  const fetchPostDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3030/posts/${postId}?_embed=comments`
      );
      setPost(response.data);
    } catch (error) {
      console.error("Error fetching post details:", error);
    }
  };

  useEffect(() => {
    // Call fetchPostDetails when the component mounts
    fetchPostDetails();
  }, [postId]);

  const handleCommentSubmit = async () => {
    if (!user) {
      // Redirect to login if not authenticated
      navigator("/login");
      return;
    }

    const newComment = {
      postId: post.id,
      userId: user.id,
      user: user.name,
      comment: commentText,
    };

    try {
      // Send the comment to the server
      const commentResponse = await axios.post(
        `http://localhost:3030/comments`,
        newComment
      );

      // Update the post with the new comment ID
      const commentId = commentResponse.data;
      await axios.patch(`http://localhost:3030/posts/${postId}`, {
        comment: [...post.comment, commentId],
      });

      // Fetch updated post details including the new comment
       await  fetchPostDetails();
    } catch (error) {
      console.error("Error adding comment:", error);
    }

    // Clear the comment input field
    setCommentText("");
  };

  const handleDeleteComment = async () => {
    try {
      // Make an API call to delete the comment
      await axios.delete(
        `http://localhost:3030/comments/${selectedComment.id}`
      );

      // Remove the deleted comment from the post
      const updatedComments = post.comment.filter(
        (comment) => comment.id !== selectedComment.id
      );

      // Update the post with the new comments
      await axios.patch(`http://localhost:3030/posts/${postId}`, {
        comment: updatedComments,
      });

      // Fetch updated post details
      await fetchPostDetails();

      // Close the options box
      setSelectedComment(null);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  
  

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div
        className="block mx-[42%] my-10  p-2  border rounded-lg border-y-2 
        border-cyan-300 font-bold bg-gradient-to-r from-purple-300 to-pink-400 animate-gradient 
    shadow-md text-center w-64 "
      >
        <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img
            src={post.image}
            className="overflow-hidden w-20 h-30 bg-gray-300 rounded-lg"
          />
        </div>
        <div>
          <h2 className="mb-3 mt-10 text-lg flex mx-3 text-cyan-200">
            This is Post Detail Page
          </h2>

          <label className="flex font-bold  ml-5  text-sm  text-cyan-200">
            Title:
            <div className="w-35 mb-5 ml-2 border-gray-300 rounded-md">
              {post.title}
            </div>
          </label>

          <label className="flex font-bold  ml-5  text-sm  text-cyan-200">
            Body:
            <div className="w-40 mb-5  ml-2  border-gray-300 rounded-md">
              {post.body}
            </div>
          </label>

          <label className="flex font-bold  ml-5  text-sm  text-cyan-200">
            Category:
            <div className="w-35 mb-5  ml-2 border-gray-300 ">
              {post.category}
            </div>
          </label>

          <label className="flex font-bold  ml-5  text-sm  text-cyan-200">
            Posted by:
            <div className="w-35 mb-5 ml-2  border-gray-300 ">{post.user}</div>
          </label>
        </div>
      </div>

      <div
        className="block mx-[42%] my-10  p-2  border rounded-lg border-y-2 border-cyan-300 font-bold
    shadow-md text-center w-64 bg-gradient-to-r from-purple-400 to-pink-400 animate-gradient"
      >
        <p className="text-lg text-cyan-300">Comments</p>
        {/* showing comments */}
        {post.comment.map((comment) => (
          <div
            className="relative w-[100%] border border-t-2 border-purple-400 rounded-lg p-3 gap-4 mx-auto mb-5 bg-slate-300 flex items-center "
            key={comment.id}
            onMouseEnter={() => setShowOptions(comment.id)}
            onMouseLeave={() => setShowOptions(null)}
          >
            <p className="text-sm font-semibold text-cyan-500 hover:underline cursor-pointer">
              <Link to={user ? `/users/${comment.userId}` : `/login`}>
                {comment.user}
              </Link>
            </p>
            <p className="text-sm font-semibold">{comment.comment}</p>
            <p className="text-sm text-gray-500">
              Posted on: November 25, 2023
            </p>

            {/* Conditionally render the small icon at the top-right */}
            {user && comment.user === user.name && (
  <svg
    className="absolute top-1 right-1 w-4 h-4 cursor-pointer"
    onClick={() => toggleSelectedComment(comment)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="red"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 6h16M4 12h16m-7 6h7"
    />
  </svg>
)}


          </div>
        ))}

        {/* Show the options box if a comment is selected */}
        {selectedComment && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 border border-gray-300 rounded-md">
            <button
              className="mr-2 px-2 py-1 bg-blue-500 text-white rounded-md"
              onClick={
                handleEditComment
              }
            >
              Edit
            </button>
            <button
              className="px-2 py-1 bg-red-500 text-white rounded-md"
              onClick={handleDeleteComment}
            >
              Delete
            </button>
          </div>
        )}

        {/* input box for new comments */}
        <div className="w-[100%] flex items-center gap-4">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="border border-1 border-purple-400 rounded-lg p-2 w-[70%] text-xs"
            placeholder="Add a comment..."
          />
          {/* Button to submit the comment */}
          <button
            onClick={handleCommentSubmit}
            className="border border-1 border-purple-400 bg-purple-600 rounded-lg p-2 w-[70%] text-xs"
          >
            Post
          </button>
        </div>
      </div>
    </>
  );
}

export default PostDetailPage;
