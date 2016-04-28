var Page = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        cache: false,
        crossDomain: true,
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
  render: function() {
    var posts = this.state.data.map(function(post_id){
      return (
        <Post key={post_id} id={post_id} />
      )
    });
    return (
      <div className="Page">
        <ul className="media-list">
          {posts.slice(0,10)}
        </ul>
      </div>
    );
  }
});

var Post = React.createClass({
  getInitialState: function() {
    return {data: {}};
  },
  componentDidMount: function() {
      var post_url = `https://hacker-news.firebaseio.com/v0/item/${this.props.id}.json`;
      $.ajax({
        url: post_url,
        dataType: 'json',
        cache: false,
        crossDomain: true,
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.data.post_url, status, err.toString());
        }.bind(this)
      });
    },
  render: function() {
    var author_url = `author.html?id=${this.state.data.by}`;
    return (
        <li className="media">
          <div className="media-left">
            <a href={this.state.data.url}>
              <img src="http://lorempixel.com/100/100/abstract"/>
            </a>
          </div>
          <div className="media-body">
            <a href={this.state.data.url}><h4 className="media-heading">{this.state.data.title}</h4></a>
            <a href={author_url}>{this.state.data.by}</a>
          </div>
        </li>
    );
  }
});

ReactDOM.render(
  <Page url="https://hacker-news.firebaseio.com/v0/topstories.json" />,
  document.getElementById('page')
);
