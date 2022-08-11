import { Component } from 'react/cjs/react.production.min';

class TaskForm extends Component {


  constructor(props) {
      super(props);
      this.state = {
          id: '',
          name: '',
          status: false,
      }
  }

  componentDidMount() {
      if(this.props.taskEditing) {
          this.setState({
              id: this.props.taskEditing.id,
              name: this.props.taskEditing.name,
              status: this.props.taskEditing.status,
          });
      }
  }

  UNSAFE_componentWillReceiveProps(nextprops) {   //Hàm này dùng để thay đổi giá trị của prop trước khi render => Mỗi lần bấm vào nút sửa thì sẽ cập nhật giá trị của state ngay trước khi render ra giao diện
      //nextProps ở đây là props của TaskForm(gồm onHideTaskForm, onSubmit, taskEditing)
      if(nextprops && nextprops.taskEditing) {
          this.setState({
            id: nextprops.taskEditing.id,
            name: nextprops.taskEditing.name,
            status: nextprops.taskEditing.status,
          })
      }else if(!nextprops.taskEditing) {  //Bấm vào nút sửa rồi bấm vào nút khác (Cụ thể là nút Thêm công việc)
          this.setState({
              id: '',
              name: '',
              status: false,
          })
      }
  }


  onSettingDefault = () => {
      this.props.onSettingDefault();
  }

  onHideTaskForm = () => {
      this.props.onHideTaskForm();
  }

  onAdd = (event) => {
      var target = event.target;
      var name = target.name;
      var value = target.value;
      if(name === 'status') {
          value = value === 'true' ? true : false
      }
      this.setState({
          [name]: value,
      });
  }

  onClear = () => {
      this.setState({
          name: '',
          status: false,
      });
  }

  onSubmit = (event) => {
      event.preventDefault();
      this.props.onSubmit(this.state);
      this.props.onHideTaskForm();
      this.onClear();
  }

  render() {

      return (
        <div className="panel panel-warning">
          <div className="panel-heading">
            <h3 className="panel-title">
                {this.state.id === '' ? 'Thêm công việc' : 'Cập nhật công việc'}
              <span
                className="fa fa-times-circle text-right"
                onClick={this.onHideTaskForm}
              ></span>
            </h3>
          </div>

          <div className="panel-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Tên :</label>
                <input 
                    type="text" 
                    className="form-control" 
                    name='name'
                    value={this.state.name}
                    onChange={this.onAdd}
                />
              </div>
              <label>Trạng Thái :</label>
              <select 
                  className="form-control" 
                  required="required"
                  name='status'
                  value={this.state.status}
                  onChange={this.onAdd}
              >
                <option value={true}>Kích Hoạt</option>
                <option value={false}>Ẩn</option>
              </select>
              <br />
              <div className="text-center">
                <button 
                  type="submit" 
                  className="btn btn-warning"
                
                >
                  {this.state.id === '' ? 'Thêm' : 'Cập nhật'}
                </button>
                &nbsp;
                <button 
                  type="button" 
                  className="btn btn-danger"
                  onClick={this.onClear}
                >
                  Hủy Bỏ
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
}

export default TaskForm;
