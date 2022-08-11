import './App.css'
import { useState } from 'react'

function App() {
  const [list, setList] = useState([])
  const [inputText, setInputText] = useState('')
  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState('')
  const [editingElement, setEditingElement] = useState('')

  const saveEditedElement = id => {
    setEditing(true)
    const updatedList = [...list].map(item => {
      if (item.id === id) {
        item.title = editText
      }
      return item
    })
    setList(updatedList)
    setEditText('')
    setEditing(false)
  }
  const createNewTodo = title => {
    if (title !== '') {
      const customId = new Date().getTime()
      setList([...list, { id: customId, title: inputText }])
      setInputText('')
    }
  }

  const deleteElement = itemId => {
    setList(prev => {
      return [...prev].filter(elem => elem.id !== itemId)
    })
  }
  const editElement = element => {
    setEditing(true)
    setEditingElement(element)
    setEditText(element.title)
  }
  return (
    <div id="list">
      <input
        id="completed"
        type="text"
        value={inputText}
        onChange={e => {
          setInputText(e.target.value)
        }}
        placeholder="Запиши задачу"
      />
      <button onClick={() => createNewTodo(inputText)}>Add</button>

      <ul>
        {list.map(item => {
          return (
            <li key={item.id}>
              {editing && editingElement.id === item.id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={e => {
                      setEditText(e.target.value)
                    }}
                  />
                  <button onClick={() => saveEditedElement(item.id)}>+</button>
                </>
              ) : (
                <>
                  <span>{item.title}</span>
                  <button onClick={() => editElement(item)}>Редагувати</button>
                </>
              )}
              <button onClick={() => deleteElement(item.id)}>x</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default App
