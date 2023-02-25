import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import showEye from '../../../assets/img/images/showEye.png';
import closeEye from '../../../assets/img/images/closeEye.png';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
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
import { registerFaluire, registerRequest } from './redux/actions';
import useForm from 'utils/useForm';
import { connect } from 'react-redux';

const Registration = (props) => {
  const { requesting } = props;

  const [passwordShown, setPasswordShown] = useState(false);
  const [AgreeTerms, setAgreeTerms] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const { registerRequest, BackendError, registerFaluire } = props;

  // console.log('BackendError', BackendError);

  useEffect(() => {
    registerFaluire(false);
  }, []);

  const stateSchema = {
    name: {
      value: '',
      error: '',
    },
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
    name: {
      required: true,
    },
    email: {
      required: true,
    },
    password: {
      required: true,
    },
  };

  const { state, handleOnChange, disable, setState } = useForm(stateSchema, validationStateSchema);

  const handleSignUp = () => {
    if (AgreeTerms) {
      const data = {
        name: state.name.value,
        email: state.email.value,
        password: state.password.value,
      };
      registerRequest(data);
      setState(stateSchema);
    } else {
      toast.error('Please accept terms & conditions');
    }
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
            <div className="d-flex justify-content-center justify-content-md-start  mt-lg-5 pt-lg-4 mb-4">
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
          <Col className="ml-auto mr-auto" lg="6" md="8">
            <div>
              <Form action="" className="form" method="">
                <Card
                  className="card-login"
                  style={{
                    borderRadius: '24px',
                    paddingTop: '50px',
                  }}
                >
                  <CardHeader>
                    <CardHeader>
                      <h3
                        style={{
                          fontWeight: 700,
                          fontSize: '34px',
                          fontFamily: 'Montserrat',
                        }}
                        className="header text-center"
                      >
                        Passages Sign Up
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
                        <Link
                          to="/auth/login"
                          style={{
                            color: '#C4C4C4',
                          }}
                        >
                          <h6 style={{ fontWeight: 600, textTransform: 'none', fontSize: '16px' }}>
                            Log In
                          </h6>
                        </Link>
                        <h6 style={{ fontWeight: 700, textTransform: 'none', fontSize: '16px' }}>
                          Sign Up
                        </h6>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <div
                          style={{
                            borderBottom: '1px solid #9C2B2E',
                            width: '50%',
                            borderWidth: '3px',
                            marginTop: '-3px',
                            display: 'flex',
                            justifyContent: 'end',
                          }}
                        ></div>
                      </div>
                    </CardHeader>
                  </CardHeader>

                  <div style={{ padding: '10% 10% 0px 10%', paddingBottom: '0px' }}>
                    {/* <InputGroup
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
                            width: '23px',
                          }}
                        >
                          <img
                            alt="username"
                            src={require('../../../../src/assets/img/images/person.png')}
                          />
                        </InputGroupText>
                      </InputGroupAddon>

                      <Input
                        style={{
                          border: 'none',
                          fontWeight: 500,
                          fontSize: '16px',
                          height: '19px',
                        }}
                        placeholder="Enter name"
                        type="text"
                        value={state.name.value}
                        onChange={(e) => handleOnChange('name', e.target.value)}
                      />
                    </InputGroup>
                    {state.name.error && (
                      <label
                        style={{
                          color: 'red',
                          display: 'flex',
                          marginBottom: '0px',
                          paddingBottom: '6px',
                        }}
                      >
                        {state.name.error}
                      </label>
                    )} */}
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
                          height: '19px',
                        }}
                        placeholder="Enter email"
                        type="text"
                        value={state.email.value}
                        onChange={(e) => {
                          handleOnChange('email', e.target.value);
                          registerFaluire(false);
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
                    {BackendError.email && (
                      <label
                        style={{
                          color: 'red',
                          display: 'flex',
                          marginBottom: '0px',
                          paddingBottom: '6px',
                        }}
                      >
                        {BackendError.email}
                      </label>
                    )}
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
                          height: '19px',
                        }}
                        placeholder="Password"
                        type={passwordShown ? 'text' : 'password'}
                        autoComplete="off"
                        value={state.password.value}
                        onChange={(e) => {
                          handleOnChange('password', e.target.value);
                          registerFaluire(false);
                        }}
                      />

                      <img
                        style={{
                          height: '18px',
                          width: '23px',
                          position: 'absolute',
                          /* z-index: 1; */
                          right: '11px',
                          top: '25px',
                          zIndex: 4,
                        }}
                        onClick={togglePassword}
                        src={passwordShown ? showEye : closeEye}
                      />
                    </InputGroup>
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
                    {BackendError.error && (
                      <label
                        style={{
                          color: 'red',
                          display: 'flex',
                          marginBottom: '0px',
                          paddingBottom: '6px',
                        }}
                      >
                        {BackendError.error}
                      </label>
                    )}
                    <FormGroup check style={{ marginTop: '8%', paddingLeft: '7px' }}>
                      <Label style={{ fontWeight: 500, fontSize: '16px' }} check>
                        <div>
                          <Input type="checkbox" onChange={() => setAgreeTerms(!AgreeTerms)} />
                          Agree to
                          <span
                            className="form-check-sign"
                            style={{
                              color: '#9C2B2E',
                              fontWeight: 700,
                              fontSize: '16px',
                              textDecoration: 'underline',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            <a style={{ color: '#9C2B2E' }} className="m-sm-2" href="#">
                              Terms & Conditions
                            </a>
                          </span>
                        </div>
                      </Label>
                    </FormGroup>
                    <div
                      style={{
                        paddingTop: '100px',
                        paddingBottom: '80px',
                      }}
                    >
                      <Button
                        block
                        href="#pablo"
                        onClick={(e) => {
                          {
                            e.preventDefault();
                          }
                          {
                            handleSignUp();
                          }
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
                        {requesting ? <Spinner size="sm" /> : 'Sign Up'}
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
  requesting: state.Registration.requesting,
  BackendError: state.Registration.err,
});

const mapDispatchToProps = (dispatch) => ({
  registerRequest: (data) => dispatch(registerRequest(data)),
  registerFaluire: (data) => dispatch(registerFaluire(data)),

  // resetMsg: () => dispatch(resetMsg())
});
export default connect(mapStateToProps, mapDispatchToProps)(Registration);
