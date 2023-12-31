import React, { useEffect, useState } from 'react';
import './App.css';

const LoginComponent = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const token = 'your_generated_token';
    onLogin(token);
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

const HomePage = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `api/products?search=${searchTerm}&minPrice=${minPrice}&maxPrice=${maxPrice}`
      );
      const data = await response.json();
      setProducts(data);
    };

    fetchData();
  }, [searchTerm, minPrice, maxPrice]);


  const addSampleProducts = () => {
    setProducts([
      { id: 1, name: 'Product 1', price: 20 },
      { id: 2, name: 'Product 2', price: 30 },
      { id: 3, name: 'Product 3', price: 25 },
      
    ]);
  };

  return (
    <div className="container">
      <h2>Home Page</h2>
      <button onClick={addSampleProducts}>Add Sample Products</button>
      <input
        type="text"
        placeholder="Search products"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      <div className="product-list">
        {products.map((product) => (
          <div className="product" key={product.id}>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <div className="cart">
        <p>Cart Count: {cart.length}</p>
        <p>Total Amount: ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}</p>
      </div>
    </div>
  );
};

const App = () => {
  const [token, setToken] = useState(null);

  const handleLogin = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  return (
    <div>
      {token ? <HomePage token={token} /> : <LoginComponent onLogin={handleLogin} />}
    </div>
  );
};

export default App;







