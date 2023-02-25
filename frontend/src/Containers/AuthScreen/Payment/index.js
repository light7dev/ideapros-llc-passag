import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import './style.css';

import { useHistory } from 'react-router-dom';

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
import {
  discountCodeFaluire,
  paymentRequest,
  discountCodeSuccess,
  createSubscriptionRequest,
  discountCode,
} from './redux/action';

const Payment = (props) => {
  const {
    paymentRequest,
    requesting,
    createSubscriptionRequest,
    discountCode,
    BackendError,
    requestingDiscount,
    validCode,
    couponCode,
    codeResponse,
    accessToken,
    plans,
    planName,
    discountCodeFaluire,
    discountCodeSuccess,
    addCardStatus,
    requestingSubscription,
  } = props;

  const history = useHistory();

  useEffect(() => {
    return history.listen((location) => {
      if (history.action === 'POP') {
        props.history.push('/payment/payment-subscription');
      }
    });
  }, []);

  // useEffect(() => {
  //   !accessToken && history.push('/auth/login');
  // }, []);

  // const onLeave = () => {
  //   props.history.push('/payment/payment-subscription');
  // };
  // props.router.setRouteLeaveHook();

  const [isCheck, setIsCheck] = useState(1);
  const [saveForLater, setsaveForLater] = useState(false);
  const [date, setDate] = useState(null);
  const [expMonth, setMonth] = useState('');
  const [expYear, setYear] = useState('');
  const [cardNumber, setCardNumber] = useState({ value: null });
  const [cardCVV, setCardCVV] = useState({ value: null });
  const [prodID, setProdID] = useState(plans && plans[0].id);

  useState(() => {
    discountCodeFaluire(false);
    discountCodeSuccess(false);
  }, []);
  const stateSchema = {
    discountCode: {
      value: '',
      error: '',
    },
    cardHolderName: {
      value: '',
      error: '',
    },
    cardNumber: {
      value: '',
      error: '',
    },
    ccv: {
      value: '',
      error: '',
    },
    date: {
      value: '',
      error: '',
    },
  };

  const validationStateSchema = {
    discountCode: {
      required: true,
    },
    cardHolderName: {
      required: true,
    },
    cardNumber: {
      required: true,
    },
    ccv: {
      required: true,
    },
    date: {
      required: true,
    },
  };

  const { state, handleOnChange, disable } = useForm(stateSchema, validationStateSchema);

  const makePayment = () => {
    if (state.cardHolderName.value && cardCVV.value && cardNumber.value && date) {
      const data = {
        token: accessToken,
        data: {
          name: state.cardHolderName.value,
          card_num: cardNumber.value,
          cvc: cardCVV.value,
          expiry_month: expMonth,
          expiry_year: expYear,
        },
      };
      paymentRequest(data);
    } else {
      // alert("Fields required")
      toast.error('All Card Details are Required');
    }
  };

  useEffect(() => {
    addCardStatus && handleSubscription();
  }, [addCardStatus]);

  const formatDate = (e) => {
    const value = e.substring(0, 2);
    if (value > 12) {
      setDate('');
    } else {
      const expDateFormatter =
        e.replace(/[^0-9]/g, '').substring(0, 2) +
        (e.length > 2 ? '/' : '') +
        e.replace(/[^0-9]/g, '').substring(2, 4);
      const month = expDateFormatter.slice(0, 2);
      const year = expDateFormatter.slice(3);
      setMonth(month);
      setYear(year);
      setDate(expDateFormatter);
    }
  };

  const handleCardNumber = ({ target: { value } }) =>
    setCardNumber(
      (state) => (value.length <= 16 && value >= 0 && !isNaN(Number(value)) && { value }) || state,
    );
  const handleCVV = ({ target: { value } }) =>
    setCardCVV(
      (state) => (value.length <= 3 && value >= 0 && !isNaN(Number(value)) && { value }) || state,
    );

  const handleSubscription = () => {
    const data = {
      product_id: prodID,
      subscription_name: planName,
      coupon: couponCode ? couponCode : '',
      save: saveForLater,
    };

    createSubscriptionRequest(data);
  };

  const handleDiscount = () => {
    const data = {
      coupon: state.discountCode.value,
    };
    discountCode(data);
  };

  return (
    <div className="" style={{ overflow: 'hidden' }}>
      <Toaster position="top-center" />
      <Container>
        <Row style={{ justifyContent: 'center' }} className="mx-sm-3 px-sm-3">
          <Col lg="12">
            {/* <Form action="" className="form" method=""> */}
            <Card
              className="card-plain"
              style={{
                borderRadius: '24px',
                backgroundColor: 'white',
              }}
            >
              <CardHeader className="pt-5 m-0">
                <h3
                  style={{
                    fontWeight: 700,
                    fontSize: '34px',
                    fontFamily: 'Montserrat',
                    color: '#2C2540',
                    margin: 0,
                  }}
                  className="header text-center"
                >
                  Payment Details
                </h3>
              </CardHeader>

              <CardBody>
                <Row
                  className="p-lg-5 "
                  style={{ display: 'flex', justifyContent: 'center', margin: 0 }}
                >
                  <Col lg="5" md="12" sm="12">
                    <div className="mt-3">
                      <span style={{ fontWeight: 600, fontSize: '18px', color: '#2C2540' }}>
                        {' '}
                        Confirm Plan
                      </span>

                      <div
                        className="L1"
                        style={{
                          border: isCheck === 1 ? '2px solid  #9C2B2E' : '2px solid gray',
                          marginTop: '35px',
                          borderRadius: '38px',
                          padding: '37px',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            alignItems: 'center',
                          }}
                        >
                          {isCheck === 1 ? (
                            <img
                              onClick={() => {
                                setIsCheck(1);
                                setProdID(plans[0].id);
                                // setTimeout(() => {
                                //   handleSubscription();
                                // }, 3000);
                              }}
                              style={{ height: '24px', width: '24px', marginBottom: '15px' }}
                              alt="checkbox"
                              src={require('../../../../src/assets/img/images/checkbox.png')}
                            />
                          ) : (
                            <img
                              onClick={() => {
                                setIsCheck(1);
                                setProdID(plans[0].id);
                                // setTimeout(() => {
                                //   handleSubscription();
                                // }, 3000);
                              }}
                              style={{ height: '24px', width: '24px', marginBottom: '15px' }}
                              alt="checkbox"
                              src={require('../../../../src/assets/img/images/uncheck.png')}
                            />
                          )}

                          <p
                            style={{
                              marginBottom: '26px',
                              fontWeight: 600,
                              fontSize: '18px',
                              color: '#7E7E7F',
                            }}
                          >
                            Per Year
                          </p>
                          <p
                            style={{
                              marginBottom: '10px',
                              fontWeight: 600,
                              fontSize: '36px',
                              color: '#9C2B2E',
                            }}
                          >
                            ${/* 44.95 */}
                            {plans && plans[0]?.nickname === null ? '0' : plans[0]?.nickname}
                          </p>
                          <p style={{ fontWeight: 500, fontSize: '16px', color: '#7E7E7F' }}>
                            loram ipsum dolor sit amet.
                          </p>
                        </div>
                      </div>
                      {planName === 'Free' ? null : (
                        <div>
                          <div
                            className="L2"
                            style={{
                              border: isCheck === 2 ? '2px solid #9C2B2E' : '2px solid gray',
                              marginTop: '37px',
                              borderRadius: '38px',
                              padding: '37px',
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                alignItems: 'center',
                              }}
                            >
                              {isCheck === 2 ? (
                                <img
                                  onClick={() => {
                                    setIsCheck(2);
                                    setProdID(plans[1].id);
                                    // setTimeout(() => {
                                    //   handleSubscription();
                                    // }, 3000);
                                  }}
                                  style={{ height: '24px', width: '24px', marginBottom: '15px' }}
                                  alt="checkbox"
                                  src={require('../../../../src/assets/img/images/checkbox.png')}
                                />
                              ) : (
                                <img
                                  onClick={() => {
                                    setIsCheck(2);
                                    setProdID(plans[1].id);
                                    // setTimeout(() => {
                                    //   handleSubscription();
                                    // }, 3000);
                                  }}
                                  style={{ height: '24px', width: '24px', marginBottom: '15px' }}
                                  alt="checkbox"
                                  src={require('../../../../src/assets/img/images/uncheck.png')}
                                />
                              )}

                              <p
                                style={{
                                  marginBottom: '26px',
                                  fontWeight: 600,
                                  fontSize: '18px',
                                  color: '#7E7E7F',
                                }}
                              >
                                Per Quarter
                              </p>
                              <p
                                style={{
                                  marginBottom: '10px',
                                  fontWeight: 600,
                                  fontSize: '36px',
                                  color: '#9C2B2E',
                                }}
                              >
                                ${/* 44.95 */}
                                {/* {plans.length < 2 ? 0 : plans[1].amount_decimal} */}
                                {plans && plans[1]?.nickname}
                              </p>
                              <p style={{ fontWeight: 500, fontSize: '16px', color: '#7E7E7F' }}>
                                loram ipsum dolor sit amet.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </Col>
                  <Col style={{ padding: 0 }} lg="1" md="1"></Col>
                  <Col lg="5" md="12" sm="12" style={{}} className="">
                    <div className="mt-3">
                      <span style={{ fontWeight: 600, fontSize: '18px', color: '#2C2540' }}>
                        {' '}
                        Add Discount Code{' '}
                      </span>
                      <div className="R1" style={{ marginTop: '39px' }}>
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
                              }}
                            >
                              <img
                                style={{
                                  height: '18px',
                                  width: '23px',
                                }}
                                alt="email"
                                src={require('../../../../src/assets/img/images/discount-icon.png')}
                              />
                            </InputGroupText>
                          </InputGroupAddon>

                          <Input
                            style={{
                              border: 'none',
                              fontWeight: 500,
                              fontSize: '16px',
                            }}
                            placeholder="Add discount code (optional)"
                            type="text"
                            value={state.discountCode.value}
                            onChange={(e) => {
                              handleOnChange('discountCode', e.target.value);
                              discountCodeFaluire(false);
                            }}
                          />
                        </InputGroup>
                        {/* {state.discountCode.error && (
                          <label
                            style={{
                              color: 'red',
                              display: 'flex',
                              marginBottom: '0px',
                            }}
                          >
                            {state.discountCode.error}
                          </label>
                        )} */}
                        {BackendError && (
                          <label
                            style={{
                              color: 'red',
                              display: 'flex',
                              marginBottom: '0px',
                            }}
                          >
                            {BackendError.msg}
                          </label>
                        )}
                        {codeResponse && (
                          <label
                            style={{
                              color: 'green',
                              display: 'flex',
                              marginBottom: '0px',
                              fontWeight: 'bold',
                            }}
                          >
                            {codeResponse.name}
                          </label>
                        )}
                        <div
                          style={{
                            // paddingTop: '47px',
                            paddingBottom: '33px',
                          }}
                          className="d-flex justify-content-center"
                        >
                          <Button
                            block
                            href="#pablo"
                            onClick={(e) => {
                              e.preventDefault();
                              handleDiscount();
                            }}
                            style={{
                              borderRadius: '16px',
                              backgroundColor: '#9C2B2E',
                              height: '50px',
                              width: '230px',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              fontWeight: 700,
                              fontSize: '16px',
                            }}
                          >
                            {requestingDiscount ? <Spinner size="sm" /> : 'APPLY CODE'}
                          </Button>
                        </div>
                      </div>
                      <div className="">
                        <span style={{ fontWeight: 600, fontSize: '18px', color: '#2C2540' }}>
                          {' '}
                          Add Card Details
                        </span>
                        {/* card holder input */}
                        <div style={{ marginTop: '35px' }}>
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
                                }}
                              >
                                <img
                                  style={{
                                    height: '22px',
                                    width: '23px',
                                  }}
                                  alt="email"
                                  src={require('../../../../src/assets/img/images/person.png')}
                                />
                              </InputGroupText>
                            </InputGroupAddon>

                            <Input
                              style={{
                                border: 'none',
                                fontWeight: 500,
                                fontSize: '16px',
                              }}
                              placeholder="Card holder name"
                              type="text"
                              value={state.cardHolderName.value}
                              onChange={(e) => handleOnChange('cardHolderName', e.target.value)}
                            />
                          </InputGroup>
                          {state.cardHolderName.error && (
                            <label
                              style={{
                                color: 'red',
                                display: 'flex',
                                marginBottom: '0px',
                              }}
                            >
                              {state.cardHolderName.error}
                            </label>
                          )}
                        </div>
                        {/* card number input  */}
                        <div>
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
                                }}
                              >
                                <img
                                  style={{
                                    height: '18px',
                                    width: '23px',
                                    borderRadius: '0px',
                                  }}
                                  alt="email"
                                  src={require('../../../../src/assets/img/images/card.png')}
                                />
                              </InputGroupText>
                            </InputGroupAddon>

                            <Input
                              style={{
                                border: 'none',
                                fontWeight: 500,
                                fontSize: '16px',
                              }}
                              placeholder="Card number"
                              type="number"
                              maxlength="16"
                              value={cardNumber.value}
                              onChange={(e) => {
                                // handleOnChange('cardNumber', e.target.value);
                                handleCardNumber(e);
                              }}
                            />
                          </InputGroup>
                          {cardNumber.value == '' && (
                            <label
                              style={{
                                color: 'red',
                                display: 'flex',
                                marginBottom: '0px',
                              }}
                            >
                              {'Field Required'}
                            </label>
                          )}
                          {/* {BackendError && (
                            <label
                              style={{
                                color: 'red',
                                display: 'flex',
                                marginBottom: '0px',
                              }}
                            >
                              {BackendError.cardNumber.error}
                            </label>
                          )} */}
                        </div>
                        {/* date and ccv  */}
                        <div
                          className="D&CCV main"
                          style={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'space-between',
                          }}
                        >
                          <div>
                            <InputGroup
                              style={{
                                borderBottom: '1px solid #C4C4C4',
                                paddingBottom: '16px',
                                // width: '180px',
                                width: '90%',
                              }}
                            >
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText
                                  style={{
                                    border: 'none',
                                  }}
                                >
                                  {/* <i className="nc-icon nc-single-02" /> */}
                                  <img
                                    style={{
                                      height: '22px',
                                      width: '23px',
                                      borderRadius: '0px',
                                    }}
                                    alt="email"
                                    src={require('../../../../src/assets/img/images/ccv.png')}
                                  />
                                </InputGroupText>
                              </InputGroupAddon>

                              <Input
                                style={{
                                  border: 'none',
                                  fontWeight: 500,
                                  fontSize: '16px',
                                }}
                                placeholder="***"
                                type="number"
                                value={cardCVV.value}
                                onChange={(e) => {
                                  // handleOnChange('ccv', e.target.value);
                                  handleCVV(e);
                                }}
                              />
                            </InputGroup>
                            {cardCVV.value == '' && (
                              <label
                                style={{
                                  color: 'red',
                                  display: 'flex',
                                  marginBottom: '0px',
                                }}
                              >
                                {'Field Required'}
                              </label>
                            )}
                          </div>
                          <div>
                            <InputGroup
                              style={{
                                borderBottom: '1px solid #C4C4C4',
                                paddingBottom: '18px',
                                // width: '180px',
                                // width:"80%",

                                // marginLeft: '25px',
                              }}
                            >
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText
                                  style={{
                                    border: 'none',
                                  }}
                                >
                                  <img
                                    style={{
                                      height: '18px',
                                      width: '23px',
                                      borderRadius: '0px',
                                    }}
                                    alt="email"
                                    src={require('../../../../src/assets/img/images/date.png')}
                                  />
                                </InputGroupText>
                              </InputGroupAddon>

                              <Input
                                style={{
                                  border: 'none',
                                  fontWeight: 500,
                                  fontSize: '16px',
                                }}
                                placeholder="00/00"
                                type="text"
                                value={date}
                                onChange={(e) => {
                                  //handleOnChange('date', e.target.value);
                                  formatDate(`${e.target.value}`);
                                }}
                              />
                            </InputGroup>
                            {date == '' && (
                              <label
                                style={{
                                  color: 'red',
                                  display: 'flex',
                                  marginBottom: '0px',
                                }}
                              >
                                {'Field Required'}
                              </label>
                            )}
                          </div>
                        </div>
                        <FormGroup check style={{ whiteSpace: 'nowrap', marginTop: 35 }}>
                          <Label style={{ fontWeight: 500, fontSize: '16px' }} check>
                            <Input
                              type="checkbox"
                              onChange={() => setsaveForLater(!saveForLater)}
                            />
                            <span
                              className="form-check-sign"
                              style={{
                                color: '#2C2540',
                                fontWeight: 600,
                                fontSize: '16px',
                                marginLeft: '10px',
                              }}
                            >
                              Save for later
                            </span>
                          </Label>
                        </FormGroup>
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>

              <div
                style={{
                  paddingBottom: '23px',
                }}
                className="d-flex justify-content-center mx-3"
              >
                <Button
                  block
                  href="#pablo"
                  onClick={(e) => {
                    e.preventDefault();
                    makePayment();
                  }}
                  style={{
                    borderRadius: '16px',
                    backgroundColor: '#9C2B2E',
                    height: '60px',
                    width: '400px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontWeight: 700,
                    fontSize: '16px',
                  }}
                >
                  {requesting || requestingSubscription ? <Spinner size="sm" /> : 'PAY'}
                </Button>
              </div>
            </Card>
            {/* </Form> */}
          </Col>
        </Row>
      </Container>
      <div
        className="full-page-background"
        style={{
          backgroundImage: `url(${require('../../../../src/assets/img/images/paymentDetail-bg.png')})`,
          // backgroundColor: '#2C2540',
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  requesting: state.Payment.requesting,
  BackendError: state.Payment.error,
  requestingDiscount: state.Payment.requestingDiscount,
  validCode: state.Payment.validCode,
  couponCode: state.Payment.couponCode,
  codeResponse: state.Payment.codeResponse,
  addCardStatus: state.Payment.addCardStatus,
  accessToken: state.Login.accessToken,
  plans: state.Login.plans,
  planName: state.Login.planName,
  requestingSubscription: state.Payment.requestingSubscription,
});

const mapDispatchToProps = (dispatch) => ({
  paymentRequest: (data) => dispatch(paymentRequest(data)),
  createSubscriptionRequest: (data) => dispatch(createSubscriptionRequest(data)),
  discountCode: (data) => dispatch(discountCode(data)),
  discountCodeFaluire: (data) => dispatch(discountCodeFaluire(data)),
  discountCodeSuccess: (data) => dispatch(discountCodeSuccess(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Payment);
