import {
  useEffect,
  memo,
  useState,
  useCallback,
  ChangeEventHandler,
} from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

const categories = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

// To avoid unnecessary re-render we can wrap the component with memo, and use useCallback to memoize the updateCategory function
const CategoryDropDown = memo(
  ({
    updateCategory,
  }: {
    updateCategory: ChangeEventHandler<HTMLSelectElement>;
  }) => {
    console.log("UseCallback: categoryDropDown re-rendered");
    return (
      <select onChange={updateCategory}>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    );
  }
);

const UseCallback = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [count, setCount] = useState(0);

  const fetchProducts = async (category: string) => {
    const products = await fetch(
      `https://fakestoreapi.com/products/category/${category}`
    ).then((res) => res.json());
    setProducts(products);
  };

  // memoize functions based on dependecy, so it doesn't recreated on each render.
  const onCategoryChange: ChangeEventHandler<HTMLSelectElement> = useCallback(
    ({ target }) => {
      fetchProducts(target.value);
    },
    []
  );

  useEffect(() => {
    console.log("UseCallback: useeffect triggered");
    fetchProducts(categories[0]);
  }, []);

  console.log("UseCallback: usecallback re-rendered");
  return (
    <section id="useCallback">
      <CategoryDropDown updateCategory={onCategoryChange} />
      <div>
        {products.map((product) => (
          <p key={product.id}>{JSON.stringify(product)}</p>
        ))}
      </div>
      <button onClick={() => setCount(count + 1)}>Count++</button>
      <span>Count is {count}</span>
    </section>
  );
};

export default UseCallback;
