import { Component } from 'react/cjs/react.production.min';
import TaskItem from './TaskItem';


class TaskList extends Component {

  constructor(props) {
      super(props);
      this.state = {
          filterName: '',
          filterStatus: -1, //-1: Tất cả, 0: Ẩn, 1: Kích hoạt
      }
  }

  onUpdateStatus = (task) => {
      this.props.onUpdateStatus(task);
  }

  onDeleteTask = (index) => {
      this.props.onDeleteTask(index);
  }

  onUpdateTask = (taskEditing) => {
      this.props.onUpdateTask(taskEditing);
  }

  onFilter = (event) => {
      var target = event.target;
      var value = target.value;
      var name = target.name;
      this.props.onFilter(
          name === 'filterName' ? value : this.state.filterName,
          name === 'filterStatus' ? value : this.state.filterStatus
      );
      this.setState({
          [name]: value
      });
  }

  render() {
      var {tasks} = this.props;
      var {filterName, filterStatus} = this.state
      var elmTasks = tasks.map((task, index) => {
          return <TaskItem task = {task} key = {task.id} index = {index} onUpdateStatus = {this.onUpdateStatus} onDeleteTask = {this.onDeleteTask} onUpdateTask = {this.onUpdateTask}></TaskItem>
      })

      return (
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th className="text-center">STT</th>
              <th className="text-center">Tên</th>
              <th className="text-center">Trạng Thái</th>
              <th className="text-center">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <input 
                  type="text" 
                  className="form-control" 
                  onChange={this.onFilter} 
                  name='filterName' 
                  value={filterName}
                />
              </td>
              <td>
                <select 
                  className="form-control"
                  onChange={this.onFilter}
                  name='filterStatus'
                  value={filterStatus}
                >
                  <option value={-1}>Tất Cả</option>
                  <option value={0}>Ẩn</option>
                  <option value={1}>Kích Hoạt</option>
                </select>
              </td>
              <td></td>
            </tr>
            {elmTasks}
          </tbody>
        </table>
      );
    }
}

export default TaskList;
