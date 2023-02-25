import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { getSubscriptionList, getPlanList } from './redux/action';

import { paymentSuccess } from '../Payment/redux/action';

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
import { push } from 'connected-react-router';
import { setPlansData } from '../Login/redux/action';

const Subscription = (props) => {
  const {
    getSubscriptionList,
    subscriptionsData,
    getPlanList,
    plansData,
    requestingList,
    history,
    accessToken,
    setPlansData,
    paymentSuccess,
  } = props;
  const [premium_Plans, setPremiumPlans] = useState([]);
  const [basic_Plans, setBasicPlans] = useState([]);
  const [free_Plans, setFreePlans] = useState([]);

  // useEffect(() => {
  //   !accessToken && history.push('/auth/login');
  // }, []);

  // const getToken = async () => {
  //   // accessToken == 'null'
  //   //   ? null
  //   //   :
  // };

  useEffect(() => {
    getSubscriptionList();
    getPlanList();
    paymentSuccess(false);
  }, []);

  // useEffect(() => {
  //   console.log('SUBS DATA.........................', subscriptionsData);
  //   //let data = subscriptionsData.data;
  //   console.log('PLANS DATA.......................', plansData);
  // }, [plansData, subscriptionsData]);

  useEffect(() => {
    subscriptionsData && plansData && getDetails();
  }, [subscriptionsData, plansData]);

  var premiumPlans = [];
  var basicPlans = [];
  var freePlans = [];

  const getDetails = () => {
    for (let i = 0; i < subscriptionsData.data.length; i++) {
      for (let j = 0; j < plansData.data.length; j++) {
        if (subscriptionsData.data[i].id === plansData.data[j].product) {
          if (subscriptionsData.data[i].name === 'Premium') {
            premiumPlans.push(plansData.data[j]);
          }
          if (subscriptionsData.data[i].name === 'Basic') {
            basicPlans.push(plansData.data[j]);
          }
          if (subscriptionsData.data[i].name === 'Free') {
            freePlans.push(plansData.data[j]);
          }
        }
      }
    }

    setPremiumPlans(premiumPlans);
    setBasicPlans(basicPlans);
    setFreePlans(freePlans);
  };

  return (
    <div className="">
      <Toaster position="top-center" />
      <Container>
        <Row>
          <Col className="ml-auto mr-auto" lg="4" md="6 mx-auto">
            <div className="d-flex justify-content-center mb-3">
              <img
                style={{
                  height: '140px',
                  width: '152px',
                }}
                alt="email"
                src={require('assets/img/images/logo.png')}
              />
            </div>
          </Col>
        </Row>
        {requestingList ? (
          <div style={{ marginTop: 200 }} className="d-flex justify-content-center mb-3">
            <Spinner size="lg" color="white" />
          </div>
        ) : (
          <Row
            lg="12"
            md="6"
            style={{
              marginTop: '116px',
            }}
          >
            {/* first colum */}

            {/* <Col className="ml-auto mr-auto" lg="4" md="6">
            <Form action="" className="form" method="">
              <Card
                className="card-login"
                style={{
                  borderRadius: '24px',
                  // paddingTop: '50px',
                }}
              >
                <CardHeader>
                  <CardHeader>
                    <h3
                      style={{
                        fontWeight: 700,
                        fontSize: '34px',
                        fontFamily: 'Montserrat',
                        color: '#9C2B2E',
                      }}
                      className="header text-center"
                    >
                      {subscriptionsData ? subscriptionsData.data[2].name : ''}
                    </h3>
                  </CardHeader>
                </CardHeader>

                <div className="mx-auto">
                  <p
                    className="text-center"
                    style={{ fontWeight: 500, fontSize: '14px', width: '247px', height: '42px' }}
                  >
                    PASSAGES is FREE to join so everyone can capture their story{' '}
                  </p>
                </div>

                <CardHeader
                  style={{
                    fontWeight: 700,
                    fontSize: '34px',
                    fontFamily: 'Montserrat',
                  }}
                  className="header text-center"
                >
                  2 GB
                </CardHeader>
                <p className="header text-center" style={{ fontWeight: 600, fontSize: '16px' }}>
                  of Storage Space
                </p>

                <div
                  style={{
                    paddingTop: '210px',
                    paddingBottom: '33px',
                  }}
                  className="d-flex justify-content-center"
                >
                  <Button
                    block
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    style={{
                      borderRadius: '16px',
                      backgroundColor: '#9C2B2E',
                      height: '60px',
                      width: '260px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontWeight: 700,
                      fontSize: '16px',
                    }}
                  >
                    SELECT
                  </Button>
                </div>
              </Card>
            </Form>
          </Col> */}
            {/* second colum */}
            {/* <Col className="ml-auto mr-auto" lg="4" md="6">
            <Form action="" className="form" method="">
              <Card
                className="card-login"
                style={{
                  borderRadius: '24px',
                  // paddingTop: '50px',
                }}
              >
                <CardHeader>
                  <CardHeader>
                    <h3
                      style={{
                        fontWeight: 700,
                        fontSize: '34px',
                        fontFamily: 'Montserrat',
                        color: '#9C2B2E',
                      }}
                      className="header text-center"
                    >
                      {subscriptionsData ? subscriptionsData.data[1].name : ''}
                    </h3>
                  </CardHeader>
                </CardHeader>

                <div className="mx-auto">
                  <p
                    className="text-center"
                    style={{ fontWeight: 500, fontSize: '14px', width: '247px', height: '42px' }}
                  >
                    Amet minim mollit non deserunt ullamco est sit aliqua dolor.
                  </p>
                </div>

                <CardHeader
                  style={{
                    fontWeight: 700,
                    fontSize: '34px',
                    fontFamily: 'Montserrat',
                  }}
                  className="header text-center"
                >
                  50 GB
                </CardHeader>
                <p className="header text-center" style={{ fontWeight: 600, fontSize: '16px' }}>
                  of Storage Space
                </p>

                <div>
                  <CardHeader
                    style={{
                      fontWeight: 700,
                      fontSize: '34px',
                      fontFamily: 'Montserrat',
                      color: '#9C2B2E',
                    }}
                    className="header text-center"
                  >
                    $22.95 <span style={{ fontWeight: 400, fontSize: '18px' }}>per quarter</span>
                  </CardHeader>
                </div>

                <div style={{ marginTop: '10px' }}>
                  <p
                    style={{ fontWeight: 600, fontSize: '18px', color: '#7E7E7F' }}
                    className="headere text-center"
                  >
                    or
                  </p>
                </div>

                <div style={{ marginTop: '-24px' }}>
                  <CardHeader
                    style={{
                      fontWeight: 700,
                      fontSize: '34px',
                      fontFamily: 'Montserrat',
                      color: '#9C2B2E',
                    }}
                    className="header text-center"
                  >
                    $79.95 <span style={{ fontWeight: 400, fontSize: '18px' }}>per year</span>
                  </CardHeader>
                </div>

                <div
                  style={{
                    paddingTop: '47px',
                    paddingBottom: '33px',
                  }}
                  className="d-flex justify-content-center"
                >
                  <Button
                    block
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    style={{
                      borderRadius: '16px',
                      backgroundColor: '#9C2B2E',
                      height: '60px',
                      width: '260px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontWeight: 700,
                      fontSize: '16px',
                    }}
                  >
                    SELECT
                  </Button>
                </div>
              </Card>
            </Form>
          </Col> */}
            {subscriptionsData
              ? subscriptionsData.data.map((item) => (
                  <Col key={item.id} className="ml-auto mr-auto mt-md-3 mt-lg-0 mt-3" lg="4" md="6">
                    {/* {console.log("ITEM................",item)} */}
                    {item.name === 'Premium' ? (
                      <div
                        style={{
                          position: 'absolute',
                          zIndex: 1,
                          top: '1px',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                        }}
                        className="d-flex justify-content-center"
                      >
                        <Button
                          block
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          style={{
                            width: '200px',
                            height: '40px',
                            borderRadius: '14px',
                            backgroundColor: '#9C2B2E',
                          }}
                        >
                          MOST POPULAR
                        </Button>
                      </div>
                    ) : null}

                    <Form action="" className="form" method="">
                      <Card
                        className="card-login"
                        style={{
                          borderRadius: '24px',
                          // paddingTop: '50px',
                        }}
                      >
                        <CardHeader>
                          <CardHeader>
                            <h3
                              style={{
                                fontWeight: 700,
                                fontSize: '34px',
                                fontFamily: 'Montserrat',
                                color: '#9C2B2E',
                              }}
                              className="header text-center"
                            >
                              {item.name}
                            </h3>
                          </CardHeader>
                        </CardHeader>
                        <div className="mx-auto">
                          <p
                            className="text-center"
                            style={{
                              fontWeight: 500,
                              fontSize: '14px',
                              width: '247px',
                              height: '42px',
                            }}
                          >
                            {item.description}
                          </p>
                        </div>
                        <CardHeader
                          style={{
                            fontWeight: 700,
                            fontSize: '34px',
                            fontFamily: 'Montserrat',
                          }}
                          className="header text-center"
                        >
                          {/* 500GB */}
                          {item.unit_label}
                        </CardHeader>
                        <p
                          className="header text-center"
                          style={{ fontWeight: 600, fontSize: '16px' }}
                        >
                          of Storage Space
                        </p>
                        {/* {premium_Plans.length >0 && premium_Plans.map(()=> ( */}
                        {item.name === 'Free' ? (
                          <div
                            style={{
                              height: 160,
                              // width: 350,
                            }}
                          >
                            <div>
                              <CardHeader
                                style={{
                                  fontWeight: 700,
                                  fontSize: '34px',
                                  fontFamily: 'Montserrat',
                                  color: '#9C2B2E',
                                }}
                                className="header text-center"
                              >
                                <span style={{ fontWeight: 400, fontSize: '18px' }}></span>
                              </CardHeader>
                            </div>

                            <div style={{ marginTop: '10px' }}>
                              <p
                                style={{ fontWeight: 600, fontSize: '18px', color: '#7E7E7F' }}
                                className="headere text-center"
                              ></p>
                            </div>

                            <div style={{ marginTop: '-24px' }}>
                              <CardHeader
                                style={{
                                  fontWeight: 700,
                                  fontSize: '34px',
                                  fontFamily: 'Montserrat',
                                  color: '#9C2B2E',
                                }}
                                className="header text-center"
                              >
                                {/* $
                              {item.name === 'Premium' &&
                                premium_Plans.length > 0 &&
                                premium_Plans[0]?.amount}
                              {item.name === 'Basic' &&
                                basic_Plans.length > 0 &&
                                basic_Plans[0]?.amount} */}
                                {/* {item.name === 'Free' && free_Plans.length > 0 && free_Plans[0]?.amount} */}
                                <span style={{ fontWeight: 400, fontSize: '18px' }}></span>
                              </CardHeader>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div>
                              <CardHeader
                                style={{
                                  fontWeight: 700,
                                  fontSize: '34px',
                                  fontFamily: 'Montserrat',
                                  color: '#9C2B2E',
                                }}
                                className="header text-center"
                              >
                                $
                                {item.name === 'Premium' &&
                                  premium_Plans.length > 0 &&
                                  premium_Plans[1]?.nickname}
                                {item.name === 'Basic' &&
                                  basic_Plans.length > 0 &&
                                  basic_Plans[1]?.nickname}
                                {/* {item.name === 'Free' && free_Plans.length > 0 && free_Plans[1]?.amount} */}
                                <span
                                  style={{
                                    marginLeft: 16,
                                    fontWeight: 400,
                                    fontSize: '18px',
                                    color: '#9C2B2E',
                                    opacity: 0.5,
                                  }}
                                >
                                  per quarter
                                </span>
                              </CardHeader>
                            </div>

                            <div style={{ marginTop: '10px' }}>
                              <p
                                style={{ fontWeight: 600, fontSize: '18px', color: '#7E7E7F' }}
                                className="headere text-center"
                              >
                                or
                              </p>
                            </div>

                            <div style={{ marginTop: '-24px' }}>
                              <CardHeader
                                style={{
                                  fontWeight: 700,
                                  fontSize: '34px',
                                  fontFamily: 'Montserrat',
                                  color: '#9C2B2E',
                                }}
                                className="header text-center"
                              >
                                $
                                {item.name === 'Premium' &&
                                  premium_Plans.length > 0 &&
                                  premium_Plans[0]?.nickname}
                                {item.name === 'Basic' &&
                                  basic_Plans.length > 0 &&
                                  basic_Plans[0]?.nickname}
                                {/* {item.name === 'Free' && free_Plans.length > 0 && free_Plans[0]?.amount} */}
                                <span
                                  style={{
                                    marginLeft: 16,
                                    fontWeight: 400,
                                    fontSize: '18px',
                                    color: '#9C2B2E',
                                    opacity: 0.5,
                                  }}
                                >
                                  per year
                                </span>
                              </CardHeader>
                            </div>
                          </div>
                        )}

                        {/*  ))} */}
                        <div
                          style={{
                            paddingTop: '47px',
                            paddingBottom: '33px',
                          }}
                          className="d-flex justify-content-center"
                        >
                          <Button
                            block
                            href="#pablo"
                            onClick={(e) => {
                              e.preventDefault();
                              {
                                item.name === 'Premium' &&
                                  // props.history.push('/auth/payment', {
                                  //   plans: premium_Plans,
                                  //   planName: 'Premium',
                                  // });
                                  setPlansData({ plans: premium_Plans, planName: 'Premium' });
                                props.history.push('/payment/payment-details');
                              }
                              {
                                item.name === 'Basic' &&
                                  setPlansData({ plans: basic_Plans, planName: 'Basic' });
                                // props.history.push('/auth/payment', {
                                //   plans: basic_Plans,
                                //   planName: 'Basic',
                                // });
                                props.history.push('/payment/payment-details');
                              }
                              {
                                item.name === 'Free' &&
                                  setPlansData({ plans: free_Plans, planName: 'Free' });
                                // props.history.push('/auth/payment', {
                                //   plans: free_Plans,
                                //   planName: 'Free',
                                // });
                                props.history.push('/payment/payment-details');
                              }
                            }}
                            style={{
                              borderRadius: '16px',
                              backgroundColor: '#9C2B2E',
                              height: '60px',
                              width: '260px',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              fontWeight: 700,
                              fontSize: '16px',
                            }}
                          >
                            SELECT
                          </Button>
                        </div>
                      </Card>
                    </Form>
                  </Col>
                ))
              : null}

            {/* Third colum */}
          </Row>
        )}
      </Container>
      <div
        className="full-page-background"
        style={{
          backgroundImage: `url(${require('assets/img/images/paymentDetail-bg.png')})`,
          // backgroundColor: '#2C2540',
        }}
      />
    </div>
  );
};

//export default Subscription;

const mapStateToProps = (state) => ({
  requestingSubscription: state.Subscription.requestingSubscription,
  subscriptionsData: state.Subscription.subscriptionsData,
  plansData: state.Subscription.plansData,
  requestingPlans: state.Subscription.requestingPlans,
  requestingList: state.Subscription.requestingList,
  accessToken: state.Login.accessToken,
});

const mapDispatchToProps = (dispatch) => ({
  getSubscriptionList: () => dispatch(getSubscriptionList()),
  getPlanList: () => dispatch(getPlanList()),
  setPlansData: (data) => dispatch(setPlansData(data)),
  paymentSuccess: (data) => dispatch(paymentSuccess(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Subscription);
