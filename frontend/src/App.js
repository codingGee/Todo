import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";

const todoItems = [
  {
    id: 1,
    title: "Study Django backend Framework",
    description: "Buy ingredients to prepare dinner",
    completed: true,
  },
  {
    id: 2,
    title: "Study Django restful api",
    description: "Read Algebra and History textbook for the upcoming test",
    completed: false,
  },
  {
    id: 3,
    title: "Study React frontend Framework",
    description: "Go to library to return Sammy's books",
    completed: true,
  },
  {
    id: 4,
    title: "Learn unit jest testing with React",
    description: "Write article on how to use Django with React",
    completed: false,
  },
  {
    id: 5,
    title: "Learn testing on Django",
    description: "Write article on how to use Django with React",
    completed: false,
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      todoList: [],
      modal: false,
      activeItem: {
        title: "",
        description: "",
        completed: false
      },
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("http://localhost:8000/api/todos/")
      .then((res) => this.setState({ todoList: res.data }))
      .catch(err => console.log(err))
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  }

  handleSubmit = item => {
    this.toggle();

    if(item.id){
      axios
        .put(`http://localhost:8000/api/todos/${item.id}/`, item)
        .then((res) => this.refreshList())
      return;
    }  
    axios
      .post('http://localhost:8000/api/todos/', item)
      .then((res) => this.refreshList());
  }

  handleDelete = item => {
    axios
      .delete(`http://localhost:8000/api/todos/${item.id}/`)
      .then((res) => this.refreshList())
  }

  createItem = () => {
    const item = { title: "", description: "", completed: false};
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  }

  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };

  renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          className={this.state.viewCompleted ? "nav-link active" : "nav-link"}
          onClick={() => this.displayCompleted(true)}
        >
          Complete
        </span>
        <span
          className={this.state.viewCompleted ? "nav-link" : "nav-link active"}
          onClick={() => this.displayCompleted(false)}
        >
          Incomplete
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      (item) => item.completed === viewCompleted
    );

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item)}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="container">
        <h1 className="text-uppercase text-center my-4">Todo app</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button
                  className="btn btn-primary"
                  onClick={this.createItem}
                >
                  Add task
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        { this.state.modal ? (
          <Modal
          activeItem={this.state.activeItem}
          toggle={this.toggle}
          onSave={this.handleSubmit}
        />
        ) : null}

      </main>
    );
  }
}

export default App;