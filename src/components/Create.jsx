//React
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//axios
import axios from "axios";
//context
import { useAuth } from "../contexts/AuthContext";
import InputField from "./InputField";

const PostCreate = () => {
  // user data from AuthContext
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("Tech");
  const [comment, setComment] = useState("");
  const [image, setImage] = useState("");
  const navigator = useNavigate();
  const handleButtonClick = () => {
    // Use navigate(-1) to navigate back
    navigator(-1);
  };

  //creating new post
  const handlePostCreate = async () => {
    try {
      // Validate inputs
      if (!user || !title || !body || !category || !comment || !image) {
        alert("Please fill in all fields.");
        return;
      }

      // Create new post object
      const newPost = {
        user: user.name,
        title,
        body,
        category,
        userId: user.id,
        comment: [
          {
            id: Math.random(), // Generate a random ID
            comment,
            postId: null, // Will be set by the server
            userId: user.id,
            user: user.name,
          },
        ],
        image, // Include the image in the post object
      };

      // Send the new post data to the server
      const response = await axios.post("http://localhost:3030/posts", newPost);

      console.log("Post created successfully:", response.data);
      window.location.href = "/posts";

      //error if new data were not sent
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div
      className="block mx-auto my-10 p-2  border rounded-lg border-y-2 border-cyan-300 font-bold
    shadow-md text-center w-64 bg-gradient-to-r from-purple-300 to-pink-400 animate-gradient"
    >
      <h2 className="mb-3 text-lg flex mx-10 text-cyan-200">
        Create a New Post
      </h2>
      <form>
        <InputField
          label="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div>
          <label className="flex font-bold  ml-20 text-sm  text-cyan-200">
            Body:{" "}
          </label>
          <textarea
            className="w-40 mb-5 border border-solid border-gray-300 rounded-md"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        <div>
          <label className="flex font-bold  ml-20 text-sm  text-cyan-200">
            Category:{" "}
          </label>
          <select
            className="w-85  px-5  mb-6 font-mono text-md bg-slate-600 text-cyan-200 border-none rounded-sm cursor-pointer"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Tech">Tech</option>
            <option value="Science">Science</option>
            <option value="Bussiness">Bussiness</option>
            <option value="Programming">Programming</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <InputField
          label="Comment"
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <InputField
          label="Img Url"
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button
          type="button"
          onClick={handlePostCreate}
          className="w-85  px-5  mb-6 font-mono text-md bg-slate-600 text-cyan-200 border-none rounded-sm cursor-pointer"
        >
          Create Post
        </button>

        <div>
          <button
            type="button"
            onClick={handleButtonClick}
            className="w-85 px-5 mb-6 font-mono text-md bg-slate-600 text-cyan-200 border-none rounded-sm cursor-pointer"
          >
            back
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostCreate;
