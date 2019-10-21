import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

class Shelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
  }

    render () {
      return (
        <div className='bookshelf'>
            <h2 className='bookshelf-title'>{this.props.shelfDescription}</h2>
            <div className='bookshelf-books'>
                <ol className='books-grid'>
                    {this.props.books
                        .filter(book => book.shelf === this.props.shelfShortname)
                        .map(book => 
                            (<Book 
                                book={book}
                                key={book.id}
                                onChangeShelf={this.props.onChangeShelf}
                            />))
                    }
                </ol>
            </div>
        </div>
      )
    }
}

export default Shelf
