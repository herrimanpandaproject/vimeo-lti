import React, {Component} from 'react';
import {Menu} from '@instructure/ui-menu';
import {Button} from '@instructure/ui-buttons';
import {IconExpandLine} from '@instructure/ui-icons';

class EmbedButton extends Component {
  constructor(props) {
    super(props);
    this.state = {selection: [1]};
  }

  handleSelect = (e, newSelected) => {
    this.setState({
      selection: newSelected,
    });
    this.embed();
  };

  embed() {
    let width = 560, height = 315, multiplier;
    switch (this.state.selection[0]) {
      case 'small':
        multiplier = 1;
        break;
      case 'large':
        multiplier = 2;
        break;
      default:
        multiplier = 1.5;
        break;
    }
    
    this.props.onEmbed({
      width: 560 * multiplier,
      height: Math.round(315 * multiplier),
      src: `https://www.youtube.com/embed/${this.props.videoId}`,
      title: this.props.title,
    });
  }

  render() {
    return (
        <Menu placement = "bottom" trigger = {<Button variant = "primary" margin = "0 x-small 0 0" icon = {IconExpandLine}>Embed</Button>}>
          <Menu.Group
            label = "Size"
            selected = {this.state.selection}
            onSelect = {this.handleSelect}
          >
            <Menu.Item value = "small">Small</Menu.Item>
            <Menu.Item value = "medium">Medium</Menu.Item>
            <Menu.Item value = "large">Large</Menu.Item>
          </Menu.Group>
        </Menu>
    );
  }
}

export default EmbedButton;