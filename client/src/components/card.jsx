import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";

const Card = ({ data, onDelete }) => {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [textArea, setTextArea] = useState("");
  const [urlValue, setUrlValue] = useState("");

  const showModal = () => {
    setModal(true);
    setTitle(data.title);
    setTextArea(data.body);
    setUrlValue(data.url);
  };

  const handleDelete = () => {
    onDelete(data.id);
  };

  const updatePostSubmit = (postId) => {
    if (title !== "" && textArea !== "" && urlValue !== "") {
      const updatedPost = {
        title: title,
        body: textArea,
        url: urlValue,
      };
      fetch(`http://localhost:5000/albums/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPost),
      })
        .then(() => {
          console.log("updated");
        })
        .catch((error) => {
          console.log("Error occurred while deleting post:", error);
        });
    }
    setModal(false);
    window.location.reload(true);
  };

  return (
    <div className=" bg-white border flex flex-col justify-between border-gray-200 rounded-lg shadow-lg">
      <Link to={`single/${data.id}`}>
        <img className="rounded-t-lg w-full h-[200px]" src={data?.url} alt="" />
      </Link>
      <div className="p-5">
        <Link className="hover:text-red-500" to={`single/${data.id}`}>
          <h5 className="hover:text-red-500 mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {data?.title}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {data?.body}
        </p>
        <div className="flex justify-between">
          <div>
            <AiFillEdit
              onClick={showModal}
              className="cursor-pointer text-2xl hover:text-red-500"
            />
          </div>
          <div>
            <AiFillDelete
              onClick={handleDelete}
              className="text-2xl cursor-pointer hover:text-red-500"
            />
          </div>
        </div>
      </div>
      {modal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-[600px]">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Update Post</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setModal(false)}
                  >
                    <span className="bg-black text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form
                  onSubmit={() => updatePostSubmit(data.id)}
                  className="relative p-6 flex flex-col w-full"
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
                    onChange={(e) => setTextArea(e.target.value)}
                  ></textarea>
                  <input
                    className="title mt-1 bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
                    placeholder="url image"
                    type="url"
                    required
                    value={urlValue}
                    onChange={(e) => setUrlValue(e.target.value)}
                  />
                </form>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setModal(false)}
                  >
                    Close
                  </button>
                  <button
                    onClick={() => updatePostSubmit(data.id)}
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </div>
  );
};

Card.propTypes = {
  data: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Card;
