import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const axios = require("axios");

function Home({ setItemId }) {
  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const lists = async () => {
      let tasks = await axios.get("http://localhost:9000/todo");
      tasks = tasks.data;
      setItems(tasks);
      //console.log(tasks)
    };
    lists();
    return () => {};
  }, [items]);

  async function handelSubmit(e) {
    e.preventDefault();
    await axios.post("http://localhost:9000/todo", {
      name: item,
    });
    setItem("");
  }
  function handelChange(e) {
    setItem(e.target.value);
  }

  async function handelDelete(id) {
    await axios.delete("http://localhost:9000/todo/" + id);
  }
  async function handelEdit(id) {
    setItemId(id);
  }
  return (
    <div className="App">
      <form onSubmit={handelSubmit}>
        <input type="text" value={item} onChange={handelChange} />
        <input type="submit" value="Submit" />
      </form>
      {items.length > 0
        ? items.map((e, i) => {
            return (
              <div key={e._id}>
                <h2>{e.name}</h2>
                <button onClick={() => handelEdit(e._id)}>
                  <Link to="/edit">edit</Link>
                </button>
                <button onClick={() => handelDelete(e._id)}>delete</button>
              </div>
            );
          })
        : "No items"}
    </div>
  );
}

export default Home;
