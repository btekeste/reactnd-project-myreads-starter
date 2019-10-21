import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import MainPage from './MainPage'
import SearchPage from './SearchPage'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount(){
    BooksAPI.getAll()
      .then((books) => {this.setState({books})})
  }

  changeShelf = (book,shelf) => {
    BooksAPI.update (book, shelf)
      .then(() => {BooksAPI.getAll()
                    .then((books) => {this.setState({books})})}
      )
  }

  render() {
    const { books } = this.state;

    return (
      <div className='app'>
        <Route exact path ='/' render={() => (
          <MainPage
            books = {books}
            onChangeShelf = {this.changeShelf}
          />
        )}/>

        <Route path ='/search' render={({ history }) => (
          <SearchPage
            books = {books}
            onChangeShelf = {(book,shelf) => {
              this.changeShelf(book,shelf)
              history.push('/')
            }}
          />
        )}/>
      </div>
    )
  }
}
export default BooksApp
