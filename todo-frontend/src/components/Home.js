import React, { Component } from 'react'
import Modal from './CustomModal';
import BucketModal from './BucketModal';
import axios from "axios";


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewCompleted: false,
            activeItem: {
                title: "",
                description: "",
                completed: false,
                belongs_to: "",
                assigned_to: ""
            },
            todoList: []
        };
    }
    componentDidMount() {
        this.refreshList();
    }
    refreshList = () => {
        axios
            .get("http://localhost:8000/api/todos?user_id="+window.localStorage.getItem("user_id"))
            .then(res => this.setState({ todoList: res.data }))
            .catch(err => console.log(err));
    };
    displayCompleted = status => {
        if (status) {
            return this.setState({ viewCompleted: true });
        }
        return this.setState({ viewCompleted: false });
    };
    renderTabList = () => {
        return (
            <div className="my-5 tab-list">
                <span
                    onClick={() => this.displayCompleted(true)}
                    className={this.state.viewCompleted ? "active" : ""}
                >
                    complete
            </span>
                <span
                    onClick={() => this.displayCompleted(false)}
                    className={this.state.viewCompleted ? "" : "active"}
                >
                    Incomplete
            </span>
            </div>
        );
    };
    renderItems = () => {
        const { viewCompleted } = this.state;
        const newItems = this.state.todoList.filter(
            item => item.completed === viewCompleted
        );
        return newItems.map(item => (
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
                        onClick={() => this.editItem(item)}
                        className="btn btn-secondary mr-2"
                    >
                        {" "}
                        Edit{" "}
                    </button>
                    <button
                        onClick={() => this.handleDelete(item)}
                        className="btn btn-danger"
                    >
                        Delete{" "}
                    </button>
                </span>
            </li>
        ));
    };
    toggle = () => {
        this.setState({ modal: !this.state.modal });
    };
    bucketToggle = () => {
        this.setState({ bicketModal: !this.state.bicketModal });
    };
    handleSubmit = item => {
        this.toggle();
        if (item.id) {
            axios
                .put(`http://localhost:8000/api/todos/${item.id}/`, item)
                .then(res => this.refreshList());
            return;
        }
        axios
            .post("http://localhost:8000/api/todos/", item)
            .then(res => this.refreshList());
    };
    handleBucketSubmit = item => {
        this.bucketToggle();
        axios
            .post("http://localhost:8000/api/buckets/", item)
            .then(res => this.refreshList());
    };
    handleDelete = item => {
        axios
            .delete(`http://localhost:8000/api/todos/${item.id}`)
            .then(res => this.refreshList());
    };
    createItem = () => {
        const item = { title: "", description: "", completed: false, belongs_to: "", assigned_to: localStorage.getItem('user_id') };
        this.setState({ activeItem: item, modal: !this.state.modal });
    };
    createBucket = () => {
        const item = { name: "", belongs_to: localStorage.getItem('user_id') };
        this.setState({ activeItem: item, bicketModal: !this.state.bicketModal });
    };
    logout = () => {
        localStorage.setItem('user_id', "");
        window.location='/';
    };
    editItem = item => {
        this.setState({ activeItem: item, modal: !this.state.modal });
    };
    render() {
        return (
            <main className="content">
                <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
                <div className="row ">
                    <div className="col-md-6 col-sm-10 mx-auto p-0">
                        <div className="card p-3">
                            <div className="">
                                <button onClick={this.createItem} className="btn btn-primary">
                                    Add task
                                </button>
                                <button style={{ marginLeft: "10px" }} onClick={this.createBucket} className="btn btn-primary">
                                    Add bucket
                                </button>
                                <button style={{ marginLeft: "10px" }} onClick={this.logout} className="btn btn-primary">
                                    Logout
                                </button>
                            </div>
                            {this.renderTabList()}
                            <ul className="list-group list-group-flush">
                                {this.renderItems()}
                            </ul>
                        </div>
                    </div>
                </div>
                {this.state.modal ? (
                    <Modal
                        activeItem={this.state.activeItem}
                        toggle={this.toggle}
                        onSave={this.handleSubmit}
                    />
                ) : null}
                {this.state.bicketModal ? (
                    <BucketModal
                        activeItem={this.state.activeItem}
                        bucketToggle={this.bucketToggle}
                        onSave={this.handleBucketSubmit}
                    />
                ) : null}
            </main>
        );
    }
}
