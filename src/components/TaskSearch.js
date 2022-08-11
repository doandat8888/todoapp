
import { Component } from 'react/cjs/react.production.min';


class TaskSearch extends Component {

  constructor(props) {
      super(props);
      this.state = {
          keyword: '',
      }
  }


  onChange = (event) => {
      var target = event.target;
      var name = target.name;
      var value = target.value;
      this.setState({
          [name]: value
      });
  }

  onFind = () => {
      this.props.onFind(this.state.keyword);
  }

  

  render() {
      return (
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Nhập từ khóa..."
              name='keyword'
              onChange={this.onChange}
              value={this.state.keyword}
            />
            <span className="input-group-btn">
              <button 
                  className="btn btn-primary" 
                  type="button"
                  onClick={this.onFind}
              >
                <span className="fa fa-search mr-5"></span>Tìm
              </button>
            </span>
          </div>
        </div>
      );
    }
}

export default TaskSearch;
