var getQueryString = function ( field, url ) {
    var href = url ? url : window.location.href;
    var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
    var string = reg.exec(href);
    return string ? string[1] : null;
};

  var Page = React.createClass({
    getInitialState: function() {
      return {data: {}};
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
      return (
        <div className="Page" className="container">
          <Author key={this.state.data.id} id={this.state.data.id} />
        </div>
      );
    }
  });

  var Author = React.createClass({
    getInitialState: function() {
      return {data: {}};
    },
    componentDidMount: function() {
        var author_url = `https://hacker-news.firebaseio.com/v0/user/${this.props.id}.json`;
        $.ajax({
          url: author_url,
          dataType: 'json',
          cache: false,
          crossDomain: true,
          success: function(data) {
            this.setState({data: data});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.data.author_url, status, err.toString());
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

  var author_url = `https://hacker-news.firebaseio.com/v0/user/${getQueryString('id')}.json`;
  ReactDOM.render(
    <Page url={author_url} id={getQueryString('id')} />,
    document.getElementById('page')
  );
