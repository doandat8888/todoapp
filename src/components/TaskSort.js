
import { Component } from 'react/cjs/react.production.min';


class TaskSort extends Component {

  constructor(props) {
      super(props);
      this.state = {
          sortBy: 'name',
          sortValue: 1,
      }
  }

  
  onSort = (sortBy, sortValue) => {
      this.setState({
          sortBy: sortBy,
          sortValue: sortValue,
      });
      this.props.onSort(sortBy, sortValue);
  }

  render() {
      return (
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <div className="dropdown">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenu1"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="true"
            >
              Sắp Xếp <span className="fa fa-caret-square-o-down ml-5"></span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
              <li onClick={() => this.onSort('name' , 1)}>
                <a role="button" className={this.state.sortBy === 'name' && this.state.sortValue === 1 ? 'sort-selected' : ''}>
                  <span className="fa fa-sort-alpha-asc pr-5">Tên A-Z</span>
                </a>
              </li>
              <li onClick={() => this.onSort('name' , -1)}>
                <a role="button" className={this.state.sortBy === 'name' && this.state.sortValue === -1 ? 'sort-selected' : ''}>
                  <span className="fa fa-sort-alpha-desc pr-5">Tên Z-A</span>
                </a>
              </li>
              <li role="separator" className="divider"></li>
              <li onClick={() => this.onSort('status' , 1)}>
                <a role="button" className={this.state.sortBy === 'status' && this.state.sortValue === 1 ? 'sort-selected' : ''}>Trạng Thái Kích Hoạt</a>
              </li>
              <li onClick={() => this.onSort('status' , -1)}>
                <a role="button" className={this.state.sortBy === 'status' && this.state.sortValue === -1 ? 'sort-selected' : ''}>Trạng Thái Ẩn</a>
              </li>
            </ul>
          </div>
        </div>
      );
    }
}

export default TaskSort;
