// React
import React, { useState } from "react";
// hook to navigate page to page
import { useNavigate } from "react-router-dom";
// axios
import axios from "axios";
import InputField from "./InputField";

function Register() {


  // hooks to keep track of new data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  // hook to navigate page to page
  const navigator = useNavigate();

  // Regular expressions for validation
  const nameRegex = /^[a-zA-Z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^09\d{9}$/; // Assumes a 10-digit phone number starting with 09
  const passwordRegex = /^\d{4}$/; // Assumes a 4-digit password
  

  const validateField = (fieldName, value, regex, errorMessage) => {
    if (!value.match(regex)) {
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: errorMessage }));
      return false;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
    return true;
  };

  // State to store errors
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    image: "",
  });

  // Function to validate inputs
  const validateInputs = () => {
    const isValidName = validateField("name", name, nameRegex, "Please enter a valid name.");
    const isValidEmail = validateField("email", email, emailRegex, "Please enter a valid email address.");
    const isValidPhone = validateField("phone", phone, phoneRegex, "Please enter a valid phone number starting with 09.");
    const isValidPassword = validateField("password", password, passwordRegex, "Please enter a valid 4-digit password.");
    const isValidImage = validateField("image", image, /^(ftp|http|https):\/\/[^ "]+$/, "Please enter a valid image URL.");

    return isValidName && isValidEmail && isValidPhone && isValidPassword && isValidImage;
  };

  // Creating a new user
  const handleRegister = async () => {
    const newErrors = validateInputs();

   if (!validateInputs()) {
      alert("Please fix the validation errors before submitting the form.");
      return;
    }

    try {
      const newUser = {
        name,
        image,
        email,
        phone,
        password,
      };

      // Send the user registration data to the server
      const response = await axios.post("http://localhost:3030/users", newUser);

      console.log("User registration successful:", response.data);
      // Redirect to the login page after successful registration
      navigator("/login");
      // error if a new user was not created
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="block mx-auto my-10 p-2 border rounded-lg border-y-2 
    border-cyan-300 font-bold
      shadow-md text-center w-64 bg-gradient-to-r from-purple-300 to-pink-400 animate-gradient"
    >
      <h1 className="mb-3 text-lg flex mx-10 text-cyan-200">Registration</h1>
      <form>
      <InputField
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />

        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />

        <InputField
          label="Phone"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={errors.phone}
        />

        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />

        <InputField
          label="Profile Picture Link"
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          error={errors.image}
        />
        <button
          type="button"
          onClick={handleRegister}
          className="w-85  px-5  mb-6 font-mono text-md bg-slate-600 text-cyan-200 border-none rounded-sm cursor-pointer"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
