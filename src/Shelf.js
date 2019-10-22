import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

Shelf.PropTypes = {
  books: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired
}

function Shelf (props) { 
      return (
        <div className='bookshelf'>
            <h2 className='bookshelf-title'>{props.shelfDescription}</h2>
            <div className='bookshelf-books'>
                <ol className='books-grid'>
                    {props.books
                        .filter(book => book.shelf === props.shelfShortname)
                        .map(book => 
                            (<Book 
                                book={book}
                                key={book.id}
                                onChangeShelf={props.onChangeShelf}
                            />))
                    }
                </ol>
            </div>
        </div>
      )
}

export default Shelf
