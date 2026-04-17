import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

interface ProductState {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
}

function App() {
  const [products, setProducts] = useState<ProductState[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalCount = 10;
  const lastIndex = totalCount * currentPage;
  const firstIndex = lastIndex - totalCount;
  const totalPages = products.length / totalCount;
  const productList = products.slice(firstIndex, lastIndex);

  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      if(response){
        console.log(response)
        setProducts(response.data);

      }
    } catch (error) {

      console.log(error)
    }
  };

  return (
    <>
      <div>
        <div className="min-h-screen max-width bg-white shadow-2xl grid grid-cols-12 gap-4 items-center justify-items-center">
          {productList.map((items: ProductState) => (
            <>
              <div key={items.id} className="col-span-3 border border-gray-200 rounded-2xl max-h-125 m-2">
                <img src={items.image} alt="product-img" className=" object-cover rounded-xl h-40 w-40 px-6 py-6" />
                <div>
                  <p className="px-5">
                    <span className="font-bold"> Price:</span>
                    {items.price}{" "}
                  </p>
                  <p className="px-5">
                    <span className="font-bold">Tittle:</span>
                    {items.title.slice(0, 20)}{" "}
                  </p>
                  <p className="px-5">
                    <span className="font-bold">category:</span>
                    {items.category}{" "}
                  </p>
                  <p className="px-5 py-2">
                    <span className="font-bold"> Description:</span>
                    {items.description.slice(0, 100)}{" "}
                  </p>
                  <p className="px-5 py-2">
                    <span className="font-bold"> Rating:</span>
                    {items.rating?.rate}{" "}
                  </p>
                </div>
              </div>
            </>
          ))}
        </div>
        <div className="flex justify-center gap-4 bg-white p-5">
          <button className="border rounded p-2" disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>
            prev
          </button>
          <button className="border rounded p-2" disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)}>
            next
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
