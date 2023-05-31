import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Single = () => {
  const [data, setData] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const getSingleData = async () => {
      const res = await fetch(`http://localhost:5000/albums/${id}`);
      const data = await res.json();
      console.log(data.data.existingUser);
      setData(data.data.existingUser);
    };
    getSingleData();
  }, [id]);

  return (
    <div className="container mx-auto">
      <div className="max-w rounded overflow-hidden shadow-lg">
        <img className="w-full" src={data?.url} alt="Sunset in the mountains" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{data?.title}</div>
          <p className="text-gray-700 text-base">{data?.body}</p>
        </div>
      </div>
    </div>
  );
};

export default Single;
