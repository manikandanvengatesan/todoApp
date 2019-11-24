import React, { Component } from "react";
import axios from "axios";
import Autocomplete from '../../node_modules/react-autocomplete/build/lib/Autocomplete.js';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label
} from "reactstrap";

export default class BucketModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem,
            bucketList: [],
            value: '',
            lost: []
        };
    }
    componentDidMount() {
        this.getBucketList();
    }
    getBucketList = () => {
        axios
            .get("http://localhost:8000/api/buckets/")
            .then(res => this.setState({ bucketList: res.data }))
            .catch(err => console.log(err));
    };
    handleChange = e => {
        let { value } = e.target;
        const activeItem = { ...this.state.activeItem, "name": value };
        this.setState({ activeItem });
    };
    render() {
        const { bicketModal, onSave } = this.props;
        const list = this.state.bucketList;
        return (
            <Modal isOpen={true} toggle={bicketModal}>
                <ModalHeader toggle={bicketModal}> Todo Item </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="name">Bucket Name</Label>
                            <Autocomplete 
                                name="name"
                                items={list}
                                shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                getItemValue={item => item.name}
                                renderItem={(item, highlighted) =>
                                    <div
                                        key={item.id}
                                        style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
                                    >
                                        {item.name}
                                    </div>
                                }
                                value={this.state.activeItem.name}
                                onChange={this.handleChange}
                                onSelect={value => this.setState({ value })}
                            />
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