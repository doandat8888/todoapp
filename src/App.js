
import './App.css';
import { Component } from 'react/cjs/react.production.min';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl(Search&Sort)';
import TaskList from './components/TaskList';


class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
        tasks: [],
        isDisplayForm: true,
        taskEditing: null,
        filter: {
            name: '',
            status: -1,
        },
        keyword: '',
        sortBy: 'name', 
        sortValue: 1 
    };
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  generateId() {
    return (
      this.s4() +this.s4() +"-" +this.s4() +"-" +this.s4() + "-" + this.s4() + "-" +this.s4() +this.s4() +this.s4()
    );
  }

  componentDidMount = () => {      
    if (localStorage && localStorage.getItem("tasks")) {
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      console.log(tasks);
      this.setState({
        tasks: tasks,
      })
    }
  }

  //Đóng form Add-Edit
  onHideTaskForm = () => {
    this.setState({
      isDisplayForm: false,
    });
  };

  //Mở form Add-Edit
  onToggleForm = () => {
    if(this.state.isDisplayForm && this.state.taskEditing !== null) { //Bấm vào nút sửa sau đó bấm vào nút thêm
      this.setState({
          isDisplayForm: true,
          taskEditing: null,
      });
    }else{   //Bấm nút thêm rồi bấm nút sửa
        this.setState({
            isDisplayForm: !this.state.isDisplayForm,
            taskEditing: null,
        })
    }
  };

  findIndex = (id) => {
      var result = -1;
      var {tasks} = this.state;
      tasks.forEach((task, index) => {
          if(task.id === id) {
              result = index;
          }
      });
      return result;
  };

  //Thêm công việc
  onSubmit = (task) => {
    var { tasks } = this.state;
    if(task.id === '') {    //Trường hợp them thì id sẽ rỗng
        task.id = this.generateId();
        tasks.push(task);
    }else{  //Trường hợp cập nhật
        var index = this.findIndex(task.id);
        tasks[index] = task;
    }
    this.setState({
        tasks: tasks,
        taskEditing: null,
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  onUpdateStatus = (task) => {
      var {tasks} = this.state;
      task.status = !task.status;
      this.setState({
          tasks: tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  onDeleteTask = (index) => {
      var {tasks} = this.state;
      tasks.splice(index, 1);
      this.setState({
          tasks: tasks,
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }


  onUpdateTask = (taskEditing) => {
      this.setState({
          taskEditing: taskEditing,
          isDisplayForm: true,
      });
  }

  onFilter = (filterName, filterStatus) => {
      console.log(filterName, ' - ', filterStatus);
      filterStatus = parseInt(filterStatus, 10);
      this.setState({
          filter: {
              name: filterName.toLowerCase(),
              status: filterStatus,
          }
      })
  }

  onFind = (keyword) => {
      this.setState({
          keyword: keyword.toLowerCase(),
      })
  }

  onSort = (sortBy, sortValue) => {
      this.setState({
          sortBy: sortBy,
          sortValue: sortValue,
      });
  }


  render() {

    var {taskEditing, filter, tasks, keyword, sortBy, sortValue} = this.state;
    if(filter) {
        if(filter.name) {
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(filter.name) !== -1;
            });
        }
        tasks = tasks.filter((task) => {
            if(filter.status === -1) {
                return task
            }else{
                return task.status === (filter.status === 1 ? true : false);
            }
        })
    }

    if(keyword) {
        tasks = tasks.filter((task) => {
            return task.name.toLowerCase().indexOf(keyword) !== -1;
        })
    }

    if(sortBy) {
        if(sortBy === 'name') {
            tasks = tasks.sort((a, b) => {
                if(a.name > b.name) {
                    return sortValue
                }else if(a.name < b.name){
                    return -sortValue
                }else{
                    return 0;
                }
            })
        }
        if(sortBy === "status") {
            tasks = tasks.sort((a, b) => {
              if (a.status > b.status) {
                  return -sortValue;
              }else if (a.status < b.status) {
                  return sortValue;
              }else {
                  return 0;
              }
            });
        }
    }

    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            {this.state.isDisplayForm === true ? (
              <TaskForm
                  onHideTaskForm={this.onHideTaskForm}
                  onSubmit={this.onSubmit}
                  taskEditing = {taskEditing}
              ></TaskForm>
            ) : (
              ""
            )}
          </div>
          <div
            className={
              this.state.isDisplayForm === true
                ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
                : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
            }
          >
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onToggleForm}
            >
              <span className="fa fa-plus mr-5"></span>Thêm Công Việc
            </button>
            <button
              type="button"
              className="btn btn-danger ml-5"
              onClick={this.onGenerteData}
            >
              Generate Data
            </button>
            <TaskControl onFind = {this.onFind} onSort = {this.onSort}></TaskControl>
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList
                  tasks={tasks}
                  onUpdateStatus={this.onUpdateStatus}
                  onDeleteTask={this.onDeleteTask}
                  onUpdateTask = {this.onUpdateTask}
                  onFilter = {this.onFilter}
                ></TaskList>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
