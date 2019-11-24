import React, { Component } from 'react';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
} from 'reactstrap';
import axios from "axios";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            userData:[]
        }
    }

    handleChange = async (event) => {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        await this.setState({
            [name]: value,
        });
    }

    async submitForm(e) {
        e.preventDefault();
        await axios
            .get(`http://localhost:8000/api/login?email=${this.state.email}&password=${this.state.password}`)
            .then(
                res => this.setState({ userData: res.data })
            )
            .catch(err => console.log(err));
            if(this.state.userData.length>0){
                localStorage.setItem('user_id', this.state.userData[0].id);
                this.props.history.push('/home');
            }else{
                alert("Incorrect username or password");
            }
    }

    render() {
        const { email, password } = this.state;
        return (
            <Container className="App">
                <h2>Sign In</h2>
                <Form className="form" onSubmit={(e) => this.submitForm(e)}>
                    <Col>
                        <FormGroup>
                            <Label>Username</Label>
                            <Input
                                type="email"
                                name="email"
                                id="exampleEmail"
                                value={email}
                                onChange={(e) => {
                                    this.handleChange(e)
                                }}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="examplePassword"
                                value={password}
                                onChange={(e) => this.handleChange(e)}
                            />
                        </FormGroup>
                    </Col>
                    <Button>Submit</Button>
                </Form>
            </Container>
        );
    }
}