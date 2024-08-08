import { Link } from "react-router-dom";
import "./card.css";

interface BookCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
}

export const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  image,
  price,
}) => {
  return (
    <div className="card aspect-[2/1] ">
      <div className="card-content" />
      <Link to={`/product/${id}`} className="">
        <img src={image} alt={title} className=" object-cover mb-2 z" />
        <div className="flex flex-col justify-between flex-grow">
          <h2 className="font-semibold z">{title}</h2>
          <p className="text-gray-400 z">${price}</p>
        </div>
      </Link>
    </div>
  );
};
