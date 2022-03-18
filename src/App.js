
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const URL = 'http://localhost/ostoslista/'

function App() {
  //input
  const [items, setItems] = useState({
    description:'',
    amount:''
  });
  //output
  const [item, setItem] = useState([]);

  function handleChange(e) {
    const value = e.target.value;
    setItems({
      ...items,
      [e.target.name]: value
    });
  }

  useEffect(() => {
    axios.get(URL)
      .then((response) => {
        setItem(response.data);
      }).catch(error => {
        alert(error.response ? error.response.data.error : error);
      });
  }, []);

  function add(e) {
    e.preventDefault();

    const json = JSON.stringify(items)
    
    axios.post(URL + 'add.php',json,{
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then((response) => {
      setItem(item => [...item, response.data]);
      setItems({
        description:'',
        amount:''
      });

    }).catch(error => {
      alert(error.response ? error.response.data.error : error);
    });
  }

  return (
    <div className="container">

      <form onSubmit={add}>
        <label>New item:</label>
        <input value={items.description} name='description' placeholder='type description' onChange={handleChange}/* { e=> setItems(e.target.value)} */ /> Amount:
        <input value={items.amount} name='amount' placeholder='type amount' onChange={handleChange} />

        <button>Add</button>
      </form>

      <ol>
        {item?.map(item => (
          <li key={item.id}>{item.description}{item.amount}</li>
        ))}
      </ol>
    </div>

  );
}

export default App;
