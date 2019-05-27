import React, {Component} from "react";
import {Alert} from "@instructure/ui-alerts";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";
import Pages from "./Pages";
import axios from "axios";

class App extends Component {
  apiKey = "AIzaSyBwv3sutjNiWbhJOAL8PLWe1rO_AJg9v2U";

  constructor(props) {
    super(props);
    this.state = {
      stats: [],
      maxResults: 45,
      resultsPerPage: 5,
      currentPage: 0,
    };
  }

  // Passes the Axios request to the Youtube API to get the results. 
  // From there we set result to be equal to the json response, to avoid issues
  // with the interpolation of {this.state.search} in searchUrl. Also allows
  // the Loading indicator to be displayed while the search request is sent and
  // received
  search = () => {
    let self = this;
    let searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${
      this.apiKey
    }&part=snippet&maxResults=${this.state.maxResults}&q=${
      this.state.search
    }&type=video`;
    
    this.setState({loading: "Loading..."})

    axios
      .get(searchUrl)
      .then(function(res) {
        let combinedId = self.combineIds(res.data.items);
        axios
          .get(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${combinedId}&key=${
              self.apiKey
            }`,
          )
          .then(function(res) {
            self.setState({
              stats: res.data.items,
              length: res.data.items.length,
            });
          })
          .catch(function(err) {
            console.log(err);
            self.setState({error: err});
          });
      })
      .catch(function(err) {
        console.log(err);
        self.setState({error: err});
      });
  };

  // Checks if the user presses enter to search for a video
  handleKey = e => {
    if (e.key === "Enter") {
      this.search();
    }
  };

  // Updates the search field as the user types their search
  handleChange = field => {
    this.setState(field.search);
  };

  // Combines the videoId's to allow for a call to the YouTube API, 
  // getting stats on all the videos
  combineIds = items => {
    let combinedVideoIds = "";
    for(let i = 0; i < this.state.maxResults; i++) {
      combinedVideoIds += "%2C" + items[i].id.videoId;
    }
    return combinedVideoIds;
  };

  // Takes the selected video, and size, updates state to give props to embed 
  // an iFrame in the canvas module
  onEmbed = videoProps => {
    this.setState({iframeProps: videoProps});
    console.log(this.state.iframeProps)
  };

  // Increments the page count to move the search result to a new page
  nextPage = page => {
    this.setState({currentPage: page});
  };

  render() {
    return (
      <div>
        <SearchBar
          onChange = {this.handleChange}
          onKeyDown = {this.handleKey}
          search = {this.search}
        />
        {
          this.state.error 
            ? <Alert variant = "error" closeButtonLabel = "Close" margin = "small">
                {this.state.error.message}
              </Alert> 
            : ""
        }
        <SearchResult
          result = {this.state.stats}
          onEmbed = {this.onEmbed}
          page = {this.state.currentPage}
          resultsPerPage = {this.state.resultsPerPage}
          length = {this.state.length}
        />
        {
          this.state.stats.length > 0 
          ? <Pages
              nextPage = {this.nextPage}
              pages = {Math.round(
                this.state.maxResults / this.state.resultsPerPage,
              )}
            />
          : <p style = {{textAlign: "center"}}>{this.state.loading}</p>
        }
      </div>
    );
  }
}

export default App;