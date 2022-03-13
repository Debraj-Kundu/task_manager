import "./Home.css"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
const axios = require("axios")

function Home({ setItemId }) {
  const [item, setItem] = useState("")
  const [items, setItems] = useState([])
  const [ind, setInd] = useState([])


  useEffect(() => {
    const lists = async () => {
      let tasks = await axios.get("http://localhost:9000/todo")
      tasks = tasks.data
      let newT = tasks.map((obj)=>({...obj, style:obj.done?'done':'notDone'}))
      setItems(newT)
    }
    lists()
    return () => {}
  }, [items])

  async function handelSubmit(e) {
    e.preventDefault()
    await axios.post("http://localhost:9000/todo", {
      name: item,
    })
    setItem("")
  }
  function handelChange(e) {
    setItem(e.target.value)
  }

  async function handelDelete(id) {
    await axios.delete("http://localhost:9000/todo/" + id)
  }
  async function handelEdit(id) {
    setItemId(id)
  }
  async function handelClik(id, i){
    let don = await axios.get("http://localhost:9000/todo/" + id)
    don=don.data.done
    don = !don
    await axios.patch("http://localhost:9000/todo/" + id, {
      done: don,
    })
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
              <div id="task" key={e._id} onClick={()=>handelClik(e._id, i)}>
                <h2 className={e.style}>{e.name}</h2>
                <button onClick={() => handelEdit(e._id)}>
                  <Link to="/edit">edit</Link>
                </button>
                <button onClick={() => handelDelete(e._id)}>delete</button>
              </div>
            )
          })
        : "No items"}
    </div>
  )
}

export default Home
