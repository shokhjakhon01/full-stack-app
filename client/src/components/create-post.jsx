import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [textArea, setTeaxtArea] = useState("");
  const [urlVal, setUrlVal] = useState("");
  const [user, setUser] = useState(null);

  const notify = () => toast("Post created!");

  const submitPost = async (e) => {
    e.preventDefault();

    if (title !== "" || textArea !== "" || urlVal !== "") {
      const newUser = {
        title: title,
        body: textArea,
        url: urlVal,
      };

      const res = await fetch("http://localhost:5000/albums", {
        method: "POST",
        body: JSON.stringify(newUser),
      });
      const data = await res.json();
      setUser(data);
    }
    notify();
    setTeaxtArea("");
    setTitle("");
    setUrlVal("");
  };

  return (
    <div className="container mx-auto mt-20">
      <div className="heading text-center font-bold text-2xl m-5 text-gray-800">
        New Post
      </div>
      {user && <ToastContainer />}
      <form
        onSubmit={submitPost}
        className="bg-slate-200 mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl"
      >
        <input
          className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
          placeholder="Title"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
          placeholder="Describe everything about this post here"
          required
          value={textArea}
          onChange={(e) => setTeaxtArea(e.target.value)}
        ></textarea>
        <input
          className="title mt-1 bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
          placeholder="url image"
          type="url"
          required
          value={urlVal}
          onChange={(e) => setUrlVal(e.target.value)}
        />
        <div className="buttons flex">
          <button
            type="button"
            className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto"
          >
            Cancel
          </button>
          <button className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
