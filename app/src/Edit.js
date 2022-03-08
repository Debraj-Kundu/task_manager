import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const axios = require("axios")

function Edit({ itemId }) {
  const [item, setItem] = useState(null)

  useEffect(() => {
    const lists = async () => {
      let task = await axios.get("http://localhost:9000/todo/" + itemId)
      task = task.data
      setItem(task)
      //console.log(tasks)
    };
    lists();
    return () => {};
  }, []);

  
  
  //console.log(item)
  async function handelSubmit() {
    await axios.patch("http://localhost:9000/todo/" + itemId, {
      name: item,
    })
  }
  function handelChange(e) {
    setItem(e.target.value)
  }
  return (
    <div>
      
      {item && ( 
        <form>
          <input type="text" value={item.name} onChange={handelChange} />
          <button type="submit" onClick={handelSubmit}>
            <Link to="/">Submit</Link>
          </button>
        </form>
      )}
    </div>
  )
}

export default Edit
