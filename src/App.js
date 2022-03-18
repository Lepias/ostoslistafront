
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
  const [list, setList] = useState([]);

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
        setList(response.data);
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
      setList(item => [...item, response.data]);
      setItems({
        description:'',
        amount:''
      });

    }).catch(error => {
      alert(error.response ? error.response.data.error : error);
    });
  }
 

  function remove(id) {
    const json = JSON.stringify({id:id})
    axios.post(URL + 'delete.php',json, {
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then(() => {
      const deleteItem = list.filter((items) => items.id !== id);
      setList(deleteItem);
    })
  }

  return (
    <div className="container">

      <form onSubmit={add}>
        <label>New item:</label>
        <input value={items.description} name='description' placeholder='type description' onChange={handleChange}/> Amount:
        <input value={items.amount} name='amount' placeholder='type amount' onChange={handleChange} />

        <button>Add</button>
      </form>

      <ol>
        {list?.map(item => (
          <li key={item.id}>{item.description}&nbsp;{item.amount} &nbsp;
             <a href="#" className='delete' onClick={() => remove(item.id)}>Delete</a></li>
          
        ))}
      </ol>
    </div>

  );
}

export default App;
