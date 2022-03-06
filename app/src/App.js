import "./App.css"
import { useEffect, useState } from "react"
const axios = require("axios")

function App() {
  const [item, setItem] = useState("")
  const [items, setItems] = useState([])

  useEffect(()=>{
      const lists = async ()=>{
        let tasks = await axios.get("http://localhost:9000/todo")
        tasks = tasks.data
        setItems(tasks)
      }
      lists()
      return ()=>{}
  }, [items])

  async function handelSubmit(e) {
    e.preventDefault()
    await axios.post('http://localhost:9000/todo', {
      'name':item
    })
    setItem('')
  }
  function handelChange(e) {
    setItem(e.target.value)
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
              <div key={i}>
                <h2>{e.name}</h2>
                <p>{''+e.done}</p>
              </div>
            )
          })
        : "No items"}
    </div>
  )
}

export default App
