import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { type Product as ProductType } from "../types";

export const Product = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get<ProductType>(`https://dummyjson.com/products/${id}`)
        .then((res) => {
          setProduct(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5 flex flex-col items-center justify-start">
      <button className="mb-5 py-2 px-4 rounded" onClick={() => navigate(-1)}>
        Back
      </button>

      <img
        src={product.images[0]}
        alt={product.title}
        className="w-[50%] h-auto mb-5"
      />
      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
      <p className="text-gray-400 mb-4 w-[70%]">${product.description}</p>
      <div className="flex">
        <p> Price : {product.price}</p>
        <p className="ml-10">Rating : {product.rating}</p>
      </div>
    </div>
  );
};
