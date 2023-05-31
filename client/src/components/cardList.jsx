import { useEffect, useState } from "react";
import Card from "./card";

const CardList = () => {
  const [data, setData] = useState([]);

  const handleDeletePost = (postId) => {
    const updatedPosts = data.filter((post) => post.id !== postId);
    setData(updatedPosts);
  };

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:5000/albums");
      const data = await res.json();
      setData(data.users.users);
    };
    getData();
  }, []);

  const deletePost = (postId) => {
    fetch(`http://localhost:5000/albums/${postId}`, {
      method: "delete",
    })
      .then(() => {
        handleDeletePost(postId);
      })
      .catch((error) => {
        console.log("Error occurred while deleting post:", error);
      });
  };

  return (
    <div className="grid grid-cols-4  gap-5">
      {data.map((d) => (
        <Card key={d.id} onDelete={deletePost} data={d} />
      ))}
    </div>
  );
};

export default CardList;
