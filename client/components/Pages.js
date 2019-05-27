import React, {Component} from 'react';
import {Pagination} from '@instructure/ui-pagination';

class Pages extends React.Component {
  constructor (props) {
    super(props)
    this.state = { currentPage: 0 }
  }

  //Increments page, updates state of App
  setPage (page) {
    this.setState({ currentPage: page })
    this.props.nextPage(page)
  }

  render () {
    const pages = Array.from(Array(this.props.pages)).map((v, i) => 
      <Pagination.Page
        key={i}
        onClick={this.setPage.bind(this, i)}
        current={i === this.state.currentPage}>
          {i + 1}
      </Pagination.Page>
    )

    return (
      <Pagination
        as="nav"
        margin="small"
        variant="compact"
        labelNext="Next Page"
        labelPrev="Previous Page"
      >
        {pages}
      </Pagination>
    )
  }
}

export default Pages