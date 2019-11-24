import React, { Component } from "react";
import axios from "axios";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label
} from "reactstrap";

export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem,
            bucketList:[]
        };
        console.log(this.state)
    }
    componentDidMount() {
        this.getBucketList();
    }
    getBucketList = () => {
        axios
            .get("http://localhost:8000/api/buckets?user_id="+window.localStorage.getItem("user_id"))
            .then(res => this.setState({ bucketList: res.data }))
            .catch(err => console.log(err));
    };
    handleChange = e => {
        let { name, value } = e.target;
        if (e.target.type === "checkbox") {
            value = e.target.checked;
        }
        const activeItem = { ...this.state.activeItem, [name]: value };
        this.setState({ activeItem });
    };
    render() {
        const { toggle, onSave } = this.props;
        const list = this.state.bucketList;
        return (
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}> Todo Item </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={this.state.activeItem.title}
                                onChange={this.handleChange}
                                placeholder="Enter Todo Title"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={this.state.activeItem.description}
                                onChange={this.handleChange}
                                placeholder="Enter Todo description"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="belongs_to">Bucket</Label>
                            <Input type="select" name="belongs_to" id="belongs_to" onChange={this.handleChange} value={this.state.activeItem.belongs_to}>
                            {list.map(item => (
                                <option value={item.id}>{item.name}</option>
                            ))}
                            </Input>
                        </FormGroup>
                        <FormGroup check>
                            <Label for="completed">
                                <Input
                                    type="checkbox"
                                    name="completed"
                                    checked={this.state.activeItem.completed}
                                    onChange={this.handleChange}
                                />
                                Completed
                            </Label>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => onSave(this.state.activeItem)}>
                        Save
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}