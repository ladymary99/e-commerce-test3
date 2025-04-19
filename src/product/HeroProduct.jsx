import { useState } from "react";
import ProductViewer from "./ProductViewer";
import ProductInfo from "./ProductInfo";
import "./HeroProduct.css";
import { useParams } from "react-router-dom";
import products from "../data/products";

function HeroProduct({ addToCart }) {
  const [selectedColor, setSelectedColor] = useState("white");
  const [selectedSize, setSelectedSize] = useState("standard");
  const [quantity, setQuantity] = useState(1);

  const { productId } = useParams();

  // Find product by ID
  const product = products.find((p) => p.id === parseInt(productId));

  // Fallback if product is not found
  if (!product) return <div className="container py-32 text-center">Product not found</div>;

  const handleAddToCart = () => {
    // Get the selected size data
    const selectedSizeData = product.sizes && product.sizes.find(s => s.name === selectedSize);
    const price = selectedSizeData ? selectedSizeData.price : product.price;

    const productToAdd = {
      ...product,
      selectedColor,
      selectedSize,
      price
    };

    addToCart(productToAdd, quantity);
  };

  return (
    <div className="heroproduct">
      <main className="product-container">
        <ProductViewer selectedColor={selectedColor} product={product} />
        <ProductInfo
          product={product}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          quantity={quantity}
          setQuantity={setQuantity}
          onAddToCart={handleAddToCart}
        />
      </main>
    </div>
  );
}

export default HeroProduct;
