import {
  useMemo,
  useState,
  memo,
  ChangeEventHandler,
  useCallback,
  useEffect,
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

const CategoryDropDown = memo(
  ({
    categories,
    updateCategory,
  }: {
    categories: string[];
    updateCategory: ChangeEventHandler<HTMLSelectElement>;
  }) => {
    console.log("UseMemo: categoryDropDown re-rendered");
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

const categories = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

const fieldsToSearch = Array.from<keyof Product>([
  "category",
  "description",
  "title",
]);

// To avoid unnecessary re-render we can wrap the component with memo, and use useMemo to memoize the products list
const PrintProducts = memo(({ products }: { products: Product[] }) => {
  console.log("UseMemo: printProducts re-rendered");
  return (
    <div>
      {products.map((product) => (
        <p key={product.id}>{JSON.stringify(product)}</p>
      ))}
    </div>
  );
});

const UseMemo = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
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

  const updateSearch: ChangeEventHandler<HTMLInputElement> = ({ target }) =>
    setSearch(target.value);

  useEffect(() => {
    console.log("UseMemo: useeffect triggered");
    fetchProducts(categories[0]);
  }, []);

  // we can use useMemo memoize the search functionality only when products list or search text changes
  const searchedProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          !search ||
          fieldsToSearch.some((field) =>
            (product[field] as string)
              .toLowerCase()
              .trim()
              .includes(search.toLowerCase().trim())
          )
      ),
    [products, search]
  );

  console.log("UseMemo: usememo re-rendered");
  return (
    <section id="useMemo">
      <CategoryDropDown
        categories={categories}
        updateCategory={onCategoryChange}
      />
      <input value={search} onChange={updateSearch} />
      <PrintProducts products={searchedProducts} />
      <button onClick={() => setCount(count + 1)}>Count++</button>
      <span>Count is {count}</span>
    </section>
  );
};

export default UseMemo;
