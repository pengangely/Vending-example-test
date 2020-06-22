import * as React from 'react';

type Props = {
  children: React.ReactNode
};

type Product = {
  id: number,
  title: string,
  img: string,
  price: number
}

type State = {
  products: Array<Product>,
  selectedIds: Array<number>,
  isLoaded: boolean,
  pay: (callback: (data: {ok: boolean}) => void) => void,
  selectProduct: (id: number) => void,
  clearIds: () => void
}

const mockProducts = [
  {
    id: 0,
    title: 'Iphone 5',
    img: 'https://go3.imgsmail.ru/imgpreview?key=7370401e0fde1acd&mb=storage&w=540',
    price: 599.99
  },
  {
    id: 1,
    title: 'Iphone 6',
    img: 'https://img.mvideo.ru/Pdb/30036781b.jpg',
    price: 699.99
  },
  {
    id: 2,
    title: 'Iphone 7',
    img: 'https://img.mvideo.ru/Pdb/small_pic/480/30026135b.jpg',
    price: 799.99
  },
  {
    id: 3,
    title: 'Iphone 8',
    img: 'https://img.mvideo.ru/Pdb/small_pic/480/30030157b.jpg',
    price: 899.99
  },
  {
    id: 4,
    title: 'Iphone X',
    img: 'https://img.mvideo.ru/Pdb/30030164b.jpg',
    price: 1099.99
  }
]

const defaultState: State = {
  products: [] as Array<Product>,
  selectedIds: [] as Array<number>,
  isLoaded: false,
  pay: () => {},
  selectProduct: (id: number) => {},
  clearIds: () => {}
};

export const ProductsContext = React.createContext(defaultState);

const ProductsProvider: React.FC<Props> = (props: Props) => {
  const [ products, setProducts ] = React.useState<Array<Product>>([]);
  const [ isLoaded, setLoaded ] = React.useState(false);
  const [ selectedIds, setSelectedIds ] = React.useState<Array<number>>([]);

  React.useEffect(() => {
    async function fetchProducts() {
      const promise = new Promise(res => {
        setTimeout(() => {
          res(mockProducts);
        }, 2000)
      });

      const products = await promise as Array<Product>;

      setProducts(products);
      setLoaded(true);
    };

    fetchProducts();
  }, []);

  function selectProduct(id: number) {
    setSelectedIds(
      prevIds => prevIds.includes(id) ? 
        prevIds.filter(i => id !== i) :
        prevIds.concat(id)
    );
  }

  async function pay(callback: (data: {ok: boolean}) => void) {
    const promise = new Promise(
      resolve => setTimeout(() => resolve({ok: true}), 2000)
    );
    const res = await promise as {ok: boolean};
    
    callback(res);
  }

  function clearIds() { setSelectedIds([]) }

  const value = {
    products,
    selectedIds,
    isLoaded,
    pay,
    selectProduct,
    clearIds
  }
  return (
    <ProductsContext.Provider value={value}>
      {props.children}
    </ProductsContext.Provider>
  );
}

export default ProductsProvider;