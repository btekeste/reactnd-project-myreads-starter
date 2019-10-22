import React from 'react'
import { Link } from 'react-router-dom'
import Shelf from './Shelf'
import PropTypes from 'prop-types'

MainPage.PropTypes = {
  books: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired
}

function MainPage (props) { 
    const shelves = {
        currentlyReading: 'Currently Reading',
        wantToRead: 'Want to Read',
        read: 'Read'
    }
    return (
      <div className='list-books'>
        <div className='list-books-title'>
        <h1>MyReads</h1>
        </div>
        <div className='list-books-content'>
          <div>
            {Object.keys(shelves).map((shelf) =>
              <Shelf
                key = {shelf}
                shelfShortname = {shelf}
                shelfDescription = {shelves[shelf]}
                books = {props.books}
                onChangeShelf = {props.onChangeShelf}                    
              />
            )}
          </div>
        </div>  
        <div className='open-search'>
          <Link to='/search'>Search for a new book</Link>
        </div>  
      </div>
    )
  }

export default MainPage
