import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import PropTypes from 'prop-types'

class SearchPage extends Component {
  static propTypes = {
      books: PropTypes.array.isRequired,
      onChangeShelf: PropTypes.func.isRequired,
    }

  state = {
      query: '',
      booksResult: []
    }

  updateQuery = (query) => {
    this.setState(
      { query: query.trim() },
        () => {this.booksSearch(this.state.query)}
    )
  }

  // Wrapper for BooksAPI.search
  booksSearch = (query) => {
    if (query.length > 0) {
      BooksAPI.search(query).then((booksFound) => {
        if (booksFound.length > 0) {
          //Book component required values
          booksFound = booksFound
                        .filter((bookFound) => 
                          (bookFound.id.length > 0) 
                          && bookFound.imageLinks
                          && bookFound.title
                          && bookFound.authors)
                        .map((bookFound) =>  {
              //Keep book in the same shelf if book already exists 
              for (let book of this.props.books) {
                if(book.id === bookFound.id) {
                  bookFound.shelf = book.shelf
                  return bookFound
                }
                else {
                  bookFound.shelf = 'none'
                }
              }
            return bookFound;
          })
          this.setState({ booksResult: booksFound })
        }
        else {
          this.setState({ booksResult: [] })
        }
      })
    }
    else {
      this.setState({ booksResult: [] })
    }
  }
  
  render () {
      const { onChangeShelf } = this.props
      const { query, booksResult } = this.state

      return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link to='/' className='close-search'>Back to main page</Link>
            <div className='search-books-input-wrapper'>
              <input 
                type='text' 
                placeholder='Search by title or author'
                value={query}
                onChange={(event) => this.updateQuery(event.target.value)}
              />
            </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            {booksResult
              .map(book => 
                  //Re-use Book component as in Shelf
                  (<Book 
                      book={book}
                      key={book.id}
                      onChangeShelf={onChangeShelf}
                  />))
            }
          </ol>
        </div>
      </div>   
      )
    }
}

export default SearchPage
