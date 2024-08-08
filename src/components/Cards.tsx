import { Products } from "../types";
import { BookCard } from "./BookCard";
import "./card.css";

const Cards = ({
  products,
  loading,
}: {
  products: Products;
  loading: boolean;
}) => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    for (const child of e.currentTarget.children) {
      const card = child as HTMLDivElement;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    }
  };

  return (
    <div
      className="grid grid-cols-2 lg:grid-cols-3 gap-5 cards w-full h-full"
      onMouseMove={handleMouseMove}
    >
      {loading ? (
        <div className="flex flex-col justify-center items-center h-svh w-full">
          Loading...
        </div>
      ) : (
        products.map((product) => (
          <BookCard
            key={product.id}
            id={product.id}
            title={product.title}
            image={product.thumbnail}
            price={product.price}
          />
        ))
      )}
    </div>
  );
};

export default Cards;
