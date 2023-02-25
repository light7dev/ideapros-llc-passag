import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import showEye from '../../../assets/img/images/showEye.png';
import closeEye from '../../../assets/img/images/closeEye.png';
import { Toaster } from 'react-hot-toast';
import './style.css';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  Row,
  Spinner,
} from 'reactstrap';
import useForm from 'utils/useForm';
import { connect } from 'react-redux';
import { loginFaluire, loginRequest } from './redux/action';

const Login = (props) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const { loginRequest, requesting, BackendError, loginFaluire } = props;

  useEffect(() => {
    loginFaluire(false);
  }, []);

  const stateSchema = {
    email: {
      value: '',
      error: '',
    },
    password: {
      value: '',
      error: '',
    },
  };

  const validationStateSchema = {
    email: {
      required: true,
    },
    password: {
      required: true,
    },
  };

  const { state, handleOnChange, disable, setState } = useForm(stateSchema, validationStateSchema);

  const handlelogin = () => {
    const data = {
      username: state.email.value,
      password: state.password.value,
    };
    loginRequest(data);
    // setState(validationStateSchema);
    // if (state.email.value && state.password.value) {
    //   // loginFaluire(false)
    // }
    // const data = {
    //   data: {
    //     username: state.email.value,
    //     password: state.password.value
    //   }
    // }
    // } else {
    //   toast.error("Both Fields are required")
    // }
  };

  return (
    <div className="">
      <Toaster position="top-center" />
      <Container>
        <Row
          className="pt-5"
          // className=" align-items-xl-base-line align-items-lg-start"
        >
          <Col className="ml-auto mr-auto" lg="4" md="4">
            <div className="d-flex justify-content-center justify-content-md-start  mt-lg-5 pt-lg-4 mb-4 ">
              <img
                style={{
                  height: '170px',
                  width: '200px',
                }}
                alt="email"
                src={require('assets/img/images/logo.png')}
              />
            </div>
          </Col>
          <Col className="ml-auto mr-auto " lg="6" md="8">
            <div>
              <Form action="" className="form" method="">
                <Card
                  className="card-login"
                  style={{
                    borderRadius: '24px',
                    paddingTop: '40px',
                  }}
                >
                  <CardHeader>
                    <CardHeader>
                      <h3
                        style={{
                          // whiteSpace: 'nowrap',
                          fontWeight: 700,
                          fontSize: '34px',
                          fontFamily: 'Montserrat',
                        }}
                        className="header text-center"
                      >
                        Passages Sign In
                      </h3>
                    </CardHeader>
                    <CardHeader>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-around',
                          borderBottom: '1px solid lightgray',
                          borderWidth: '3px',
                        }}
                      >
                        <h6 style={{ fontWeight: 700, textTransform: 'none', fontSize: '16px' }}>
                          Login
                        </h6>
                        <Link
                          to={'/auth/registration'}
                          style={{
                            color: '#C4C4C4',
                          }}
                        >
                          <h6 style={{ fontWeight: 600, textTransform: 'none', fontSize: '16px' }}>
                            Sign Up
                          </h6>
                        </Link>
                      </div>

                      <div
                        style={{
                          borderBottom: '1px solid #9C2B2E',
                          width: '50%',
                          borderWidth: '3px',
                          marginTop: '-3px',
                        }}
                      ></div>
                    </CardHeader>
                  </CardHeader>

                  <div style={{ padding: '12% 12% 0px 12%', paddingBottom: '0px' }}>
                    <InputGroup
                      style={{
                        borderBottom: '1px solid #C4C4C4',
                        paddingBottom: '19px',
                      }}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText
                          style={{
                            border: 'none',
                            height: '18px',
                            // width: '23px',
                          }}
                        >
                          {/* <i className="nc-icon nc-single-02" /> */}
                          <img
                            style={{
                              height: '16px',
                              width: '21px',
                            }}
                            alt="email"
                            src={require('assets/img/images/email.png')}
                          />
                        </InputGroupText>
                      </InputGroupAddon>

                      <Input
                        style={{
                          border: 'none',
                          fontWeight: 500,
                          fontSize: '16px',
                          height: '18px',
                        }}
                        bsSize="sm"
                        placeholder="Enter email"
                        type="email"
                        value={state.email.value}
                        onChange={(e) => {
                          handleOnChange('email', e.target.value);
                          loginFaluire(false);
                        }}
                      />
                    </InputGroup>
                    {state.email.error && (
                      <label
                        style={{
                          color: 'red',
                          display: 'flex',
                          marginBottom: '0px',
                          paddingBottom: '6px',
                        }}
                      >
                        {state.email.error}
                      </label>
                    )}
                    {BackendError.username && (
                      <label
                        style={{
                          color: 'red',
                          display: 'flex',
                          marginBottom: '0px',
                          paddingBottom: '6px',
                        }}
                      >
                        {BackendError.username}
                      </label>
                    )}
                    {/* <div style={{ display: 'flex' }}> */}
                    <InputGroup
                      style={{
                        borderBottom: '1px solid #C4C4C4',
                        paddingBottom: '19px',
                        paddingTop: '24px',
                      }}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText
                          style={{
                            border: 'none',
                            height: '20px',
                            // width: '19px',
                          }}
                        >
                          <img
                            style={{
                              height: '20px',
                              width: '18px',
                            }}
                            alt="password"
                            src={require('assets/img/images/pass-icon.png')}
                          />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        style={{
                          border: 'none',
                          fontWeight: 500,
                          fontSize: '16px',
                          height: '18px',
                        }}
                        placeholder="Password"
                        type={passwordShown ? 'text' : 'password'}
                        autoComplete="off"
                        value={state.password.value}
                        onChange={(e) => {
                          handleOnChange('password', e.target.value);
                          loginFaluire(false);
                        }}
                      />
                      <img
                        style={{
                          height: '16px',
                          width: '21px',
                          position: 'absolute',
                          right: '11px',
                          top: '25px',
                          zIndex: 4,
                        }}
                        onClick={togglePassword}
                        src={passwordShown ? showEye : closeEye}
                      />
                    </InputGroup>
                    {/* </div> */}
                    {state.password.error && (
                      <label
                        style={{
                          color: 'red',
                          display: 'flex',
                          marginBottom: '0px',
                          paddingBottom: '6px',
                        }}
                      >
                        {state.password.error}
                      </label>
                    )}
                    {BackendError.password && (
                      <label
                        style={{
                          color: 'red',
                          display: 'flex',
                          marginBottom: '0px',
                          paddingBottom: '6px',
                        }}
                      >
                        {BackendError.password}
                      </label>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                      {/* <Link> */}
                      <span
                        style={{
                          color: '#9C2B2E',
                          fontWeight: '600',
                          fontSize: '16px',
                          paddingTop: '10px',
                          cursor: 'pointer',
                          textDecoration: 'underline',
                        }}
                      >
                        Forgot password?{' '}
                      </span>
                      {/* </Link> */}
                    </div>

                    <div
                      style={{
                        paddingTop: '80px',
                        paddingBottom: '60px',
                      }}
                    >
                      <Button
                        block
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          handlelogin();
                        }}
                        style={{
                          borderRadius: '16px',
                          backgroundColor: '#9C2B2E',
                          height: '60px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontWeight: 700,
                          fontSize: '16px',
                        }}
                      >
                        {requesting ? <Spinner size="sm" /> : 'Sign In'}
                      </Button>
                    </div>
                  </div>
                </Card>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      <div
        className="full-page-background"
        style={{
          backgroundImage: `url(${require('assets/img/images/SignIn.png')})`,
          // backgroundColor: '#2C2540',
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  // userData: state.LoginScreen.user,
  requesting: state.Login.requesting,
  BackendError: state.Login.error,
});

const mapDispatchToProps = (dispatch) => ({
  loginRequest: (data) => dispatch(loginRequest(data)),
  loginFaluire: (data) => dispatch(loginFaluire(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
