import React from 'react'

var Author = React.createClass({
  getInitialState: function() {
    return {data: {}};
  },
  componentDidMount: function() {
    console.log(this.props.params.author);
    var author_url = `https://hacker-news.firebaseio.com/v0/user/${this.props.params.authorName}.json`;
    $.ajax({
      url: author_url,
      dataType: 'json',
      cache: false,
      crossDomain: true,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(author_url, status, err.toString());
      }.bind(this)
    });
    },
  render: function() {
      return (
        <div className="container">
          <div className="row">
            User:    {this.state.data.id}
          </div>
          <div className="row">
            Created:    {this.state.data.created}
          </div>
          <div className="row">
            Karma:    {this.state.data.karma}
          </div>
          <div className="row">
            About:   <span dangerouslySetInnerHTML={{__html: this.state.data.about}} />
          </div>
        </div>
      );
  }
});

export default Author
