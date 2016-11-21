var Whyers = React.createClass({
  getInitialState() {
    return {
      whyers: this.props.whyers,
      whyer: {
        name: '',
        email: '',
        manager: false
      },
      errors: {}
    }
  },

  handleNameChange(e) {
    var newWhyer = this.state.whyer
    newWhyer.name = e.target.value
    this.setState({whyer: newWhyer});
  },

  handleEmailChange(e) {
    var newWhyer = this.state.whyer
    newWhyer.email = e.target.value
    this.setState({whyer: newWhyer});
  },

  handleManagerChange(e) {
    var newWhyer = this.state.whyer
    newWhyer.manager = e.target.value
    this.setState({whyer: newWhyer});
  },

  handleHireWhyer() {
    var that = this;
    $.ajax({
      method: 'POST',
      data: {
        whyer: that.state.whyer,
      },
      url: '/whyers.json',
      success: function(res) {
        var newWhyerList = that.state.whyers;
        newWhyerList.push(res);
        that.setState({
          whyers: newWhyerList,
          whyer: {
            name: '',
            email: '',
            manager: false
          },
          errors: {}
        });
      },
      error: function(res) {
        that.setState({errors: res.responseJSON.errors})
      }
    });
  },

  handleFireWhyer(whyer) {
    var whyerList = this.state.whyers.filter(function(item) {
      return whyer.id !== item.id;
    });
    this.setState({whyers: whyerList});
  },

  render() {
    var that = this;
    whyers = this.state.whyers.map( function(whyer) {
      return (
        <Whyer whyer={whyer} key={whyer.id} onFireWhyer={that.handleFireWhyer} />
      );
    });
    return (
      <div>
        <h1>Whyers</h1>
        <div id="whyers">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Manager</th>
              </tr>
            </thead>
            <tbody>
              {whyers}
              <tr>
                <td>
                  <input type="text" value={this.state.whyer.name} onChange={this.handleNameChange} /><br />
                  <span style={{color: 'red'}}>{this.state.errors.name}</span>
                </td>
                <td>
                  <input value={this.state.whyer.email} type="text" onChange={this.handleEmailChange} /><br />
                  <span style={{color: 'red'}}>{this.state.errors.email}</span>
                </td>
                <td><input value={this.state.whyer.manager} type="checkbox" onChange={this.handleManagerChange} /></td>
                <td><button onClick={this.handleHireWhyer}>Hire</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});
