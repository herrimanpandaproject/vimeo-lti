import React, {Component} from 'react';
import {TextInput} from '@instructure/ui-text-input';
import {Button} from '@instructure/ui-buttons';
import {Flex, FlexItem} from '@instructure/ui-layout';
import {IconSearchLine} from '@instructure/ui-icons';
import {Img} from '@instructure/ui-elements'

class SearchBar extends Component {
  state = {};

  //Updates the text box, and the state of the search in the App
  onChange = e => {
    let field = {
      event: e,
      search: {
        search: e.target.value
      }
    };
    this.props.onChange(field);
  }

  render() {
    return (
      <Flex margin = "none">
        <FlexItem shrink padding = "none none none x-small" width = "7.5%">
          <Img
            src = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/YouTube_social_white_squircle_%282017%29.svg/1024px-YouTube_social_white_squircle_%282017%29.svg.png"
            alt = "img not found"
            style = {{width: '100%', height: '100%'}}
          />
        </FlexItem>
        <FlexItem grow padding = "small">
          <TextInput
            label = ""
            placeholder = "Search..."
            value = {this.props.value}
            onChange = {e => this.onChange(e)}
            onKeyDown = {e => this.props.onKeyDown(e)}
          />
        </FlexItem>
        <FlexItem>
          <Button icon = {IconSearchLine} onClick = {this.props.search}>Search</Button>
        </FlexItem>
      </Flex>
    );
  }
}

export default SearchBar;