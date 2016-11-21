var Whyer = React.createClass({
  getInitialState() {
    return {
      whyer: this.props.whyer,
      editMode: false,
      errors: {}
    }
  },

  setEditMode() {
    this.setState({editMode: true});
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

  toggleManagerStatus: function () {
    var newWhyer = this.state.whyer
    newWhyer.manager = !this.state.whyer.manager
    this.handleWhyerUpdate();
  },

  handleWhyerUpdate() {
    var that = this;
    $.ajax({
      method: 'PUT',
      data: {
        whyer: that.state.whyer,
      },
      url: '/whyers/' + that.state.whyer.id + '.json',
      success: function(res) {
        that.setState({
          errors: {},
          whyer: res,
          editMode: false
        });
      },
      error: function(res) {
        that.setState({errors: res.responseJSON.errors});
      }
    });
  },

  handleWhyerFire() {
    var that = this;
    $.ajax({
      method: 'DELETE',
      url: '/whyers/' + that.state.whyer.id + '.json',
      success: function(res) {
        that.props.onFireWhyer(that.state.whyer);
      }
    })
  },

  render() {
    if ( this.state.editMode ) {
      markup = (
        <tr>
          <td>
            <input
              type="text"
              value={this.state.whyer.name}
              onChange={this.handleNameChange} />
            <span style={{color: 'red'}}>{this.state.errors.name}</span>
          </td>
          <td>
            <input
              type="text"
              value={this.state.whyer.email}
              onChange={this.handleEmailChange} />
            <br />
            <span style={{color: 'red'}}>{this.state.errors.email}</span>
          </td>
          <td>
            <input
              type="checkbox"
              value={this.state.whyer.manager}
              onChange={this.handleManagerChange} />
          </td>
          <td>
            <button onClick={this.handleWhyerUpdate}>Save</button>
          </td>
        </tr>
      );
    } else {
      markup = (
        <tr>
          <td>{this.state.whyer.name}</td>
          <td>{this.state.whyer.email}</td>
          <td>{this.state.whyer.manager ? '✔' : ''}</td>
          <td>
            <button onClick={this.setEditMode}>Edit</button>
            <button onClick={this.toggleManagerStatus}>{this.state.whyer.manager ? 'Demote' : 'Promote'}</button>
            <button onClick={this.handleWhyerFire} style={{color: 'red'}}>Fire</button>
          </td>
        </tr>
      );
    }
    return markup;
  }
});
