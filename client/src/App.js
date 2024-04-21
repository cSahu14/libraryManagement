import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react"
import axios from "axios"

function App() {
  const [books, setBooks] = useState([])
  const [memberId, setMemberId] = useState(null)

  useEffect(() => {
    const booksFun = async () => {
      axios.get("http://localhost:5000/api/books").then(res => {
        console.log(res.data)
        setBooks(res.data.message)
      })
    }

    booksFun()

  }, [])

  const findMember = (id) => {
    setMemberId(id)
    console.log(id)
  }


  const checkout = async (bookName, bookId) => {
    if (memberId == null || memberId == undefined) {
      alert("please add memberId")
      return;
    }
    console.log(bookName, bookId)
    let data = {
      eventType: "checkout",
      book_name: bookName,
      book_id: bookId,
      member_id: Number(memberId)
    }
    axios.post("http://localhost:5000/api/books/checkout", data).then(res => {
      alert(res.data.message)
    }).catch(err => {
      alert(err.message)
    })
  }

  const returnBook = async (bookId) => {
    console.log(bookId)
    if (memberId == null || memberId == undefined) {
      alert("please add memberId")
      return;
    }
    let data = {
      eventType: "return",
      book_id: bookId,
      member_id: Number(memberId)
    }
    axios.post("http://localhost:5000/api/books/return", data).then(res => {
      alert(res.data.message)
    }).catch(err => {
      alert(err.message)
    })
  }

  return (
    <div className="App">
      {books.map(book => {
        return <div key={book._id} className='card'>
          <p>{book.BookName}</p>
          <input placeholder='Member id' onChange={(e) => findMember(e.target.value)} type='number' />
          <button onClick={(e) => checkout(book.BookName, book.BookID)}>checkout</button>
          <button onClick={(e) => returnBook(book.BookID)}>return</button>
        </div>
      })}
    </div>
  );
}

export default App;
