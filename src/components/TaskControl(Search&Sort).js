import { Component } from 'react/cjs/react.production.min';
import TaskSearch from './TaskSearch';
import TaskSort from './TaskSort';

class TaskControl extends Component {

    onFind = (keyword) => {
        this.props.onFind(keyword);
    }

    onSort = (sortBy, sortValue) => {
        this.props.onSort(sortBy, sortValue);
    }

    render() {
        
        return (
            <div className="row mt-15">
                {/* Search */}
                <TaskSearch onFind = {this.onFind}></TaskSearch>
                {/* Sort */}
                <TaskSort onSort = {this.onSort}></TaskSort>
            </div>
        );
    }
}

export default TaskControl;
