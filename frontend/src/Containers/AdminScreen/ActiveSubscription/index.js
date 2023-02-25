import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

// reactstrap components
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

import {
  CancelSubscriptionRequest,
  GetCardRequest,
  GetSubscriptionListRequest,
} from './redux/action';
import './style.css';
import { Toaster } from 'react-hot-toast';

const ActiveSubscription = (props) => {
  const [date, setDate] = useState(false);
  const [endData, setEndDate] = useState('');
  const [subscriptionDetail, setSubscriptionDetail] = useState([]);
  const [card, setCard] = useState([]);
  const [formatedDate, setformatedDate] = useState('');

  useEffect(() => {
    GetCardRequest();
    GetSubscriptionList();
  }, []);

  const {
    GetCardRequest,
    CardDetails,
    CancelSubscription,
    GetSubscriptionList,
    subscriptionList,
    requesting,
    cancelRequest,
  } = props;

  useEffect(() => {
    subscriptionList && setSubscriptionDetail(subscriptionList.data);
    CardDetails && setCard(CardDetails.data);
    subscriptionList && setDate(new Date(subscriptionList?.data[0]?.current_period_end * 1000));
  }, [subscriptionList, CardDetails]);

  const handleSubscription = (item) => {
    const data = {
      subscription_id: item,
    };
    CancelSubscription(data);
  };

  useEffect(() => {
    if (date) {
      const editDate = moment(date);
      const formateDate = editDate.format('MMMM d, yyyy');
      setformatedDate(formateDate);
    }
  }, [date]);

  return (
    <div className="content pt-3 px-5">
      <Toaster position="top-center" />
      {requesting ? (
        <div style={{ marginTop: 400 }} className="d-flex justify-content-center mb-3">
          <Spinner style={{ width: '4rem', height: '4rem' }} size="lg" />
        </div>
      ) : (
        <div style={{}} className="maindiv py-2 ">
          <div className="d-sm-flex justify-content-sm-center pt-sm-5 d-lg-block pt-lg-0">
            <p
              style={{
                fontWeight: 700,
                fontSize: '28px',
                marginBottom: '35px',
                color: '#2C2540',
                marginTop: 20,
              }}
            >
              Current Plan
            </p>
          </div>
          {requesting ? (
            <div style={{}} className="d-flex justify-content-center mb-3">
              <Spinner style={{}} size="lg" />
            </div>
          ) : subscriptionList && subscriptionDetail.length > 0 ? (
            subscriptionDetail?.map((item) => (
              <div
                style={{
                  border: '2px solid #9C2B2E',

                  borderRadius: '38px',
                  // display: 'flex',
                  // justifyContent: 'space-around',
                }}
                className="d-lg-flex justify-content-lg-around p-lg-5 p-3"
              >
                <p
                  style={{
                    fontWeight: 600,
                    fontSize: '24px',
                    color: '#2C2540',
                    fontFamily: 'Montserrat',
                    alignSelf: 'center',
                  }}
                >
                  {item.plan.interval_count} {item.plan.interval}
                </p>

                <div>
                  <p
                    style={{
                      fontWeight: 500,
                      fontSize: '16px',
                      color: '#7E7E7F',
                      fontFamily: 'Montserrat',
                    }}
                  >
                    Subscription renewal date
                  </p>
                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: '24px',
                      color: '#9C2B2E',
                      fontFamily: 'Montserrat',
                    }}
                  >
                    {formatedDate}
                  </p>
                </div>

                <div>
                  <p
                    style={{
                      fontWeight: 500,
                      fontSize: '16px',
                      color: '#7E7E7F',
                      fontFamily: 'Montserrat',
                    }}
                  >
                    What you will be charged
                  </p>
                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: '24px',
                      color: '#9C2B2E',
                      fontFamily: 'Montserrat',
                    }}
                  >
                    ${item.plan.nickname === null ? '0' : item.plan.nickname}
                  </p>
                </div>

                {/* {cancelRequest ? (
                  <div
                    style={{
                      borderRadius: '16px',
                      backgroundColor: '#9C2B2E',
                      height: '60px',
                      // width: '280px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',

                      // whiteSpace:"nowrap"
                    }}
                  >
                    {<Spinner size="sm" />}
                  </div>
                ) : (
                  
                )} */}
                <div className="Btnsize">
                  <Button
                    block
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      {
                        handleSubscription(item.id);
                      }
                    }}
                    style={{
                      borderRadius: '16px',
                      backgroundColor: '#9C2B2E',
                      height: '60px',
                      // maxWidth: '340px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontWeight: 700,
                      fontSize: '16px',
                      // whiteSpace:"nowrap"
                    }}
                  >
                    {cancelRequest ? <Spinner size="sm" /> : 'CANCEL SUBSCRIPTION'}
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <h6>No Payment Plan</h6>
          )}

          <p style={{ fontWeight: 700, fontSize: '28px', color: '#2C2540' }} className="my-5 ml-0">
            Payment Details
          </p>
          <Row className="p-0 m-0">
            {card.length > 0 ? (
              card?.map((item) => (
                <div
                  style={{
                    backgroundColor: '#9C2B2E',
                    width: '520px',
                    height: '280px',
                    borderRadius: '16px',
                    paddingTop: '36px',
                    paddingBottom: '36px',
                    paddingRight: '18px',
                    paddingLeft: '18px',
                  }}
                >
                  <div className="d-flex justify-content-between">
                    <p
                      style={{
                        fontWeight: 700,
                        fontSize: '18px',
                        color: '#FBFCFE',
                        fontFamily: 'Montserrat',
                      }}
                    >
                      Payment Method
                    </p>
                    <p
                      style={{
                        fontWeight: 700,
                        fontSize: '18px',
                        color: '#FBFCFE',
                        fontFamily: 'Montserrat',
                      }}
                    >
                      {item.brand}
                    </p>
                  </div>

                  <div
                    style={{
                      fontWeight: 500,
                      fontSize: '40px',
                      color: '#FBFCFE',
                      fontFamily: 'Montserrat',
                      marginBottom: '40px',
                    }}
                  >
                    <span>.... .... ....</span>
                    <span
                      style={{
                        fontSize: '24px',
                        position: ' absolute',
                        paddingTop: '24px',
                        paddingLeft: '10px',
                      }}
                    >
                      {' '}
                      {item.last4}
                    </span>
                  </div>
                  <div className="d-flex justify-content-end">
                    <Button
                      block
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      style={{
                        borderRadius: '16px',
                        backgroundColor: '#FBFCFE',
                        height: '50px',
                        width: '230px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontWeight: 700,
                        fontSize: '16px',
                        color: '#9C2B2E',
                      }}
                    >
                      UPDATE CARD
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <h6>No Payment Details</h6>
            )}
          </Row>
        </div>
      )}

      <div
        className="full-page-background"
        style={{
          // backgroundImage: `url(${require('assets/img/images/scbscription-bg.png')})`,
          backgroundColor: 'red !important',
        }}
      />
    </div>
  );
};

// export default ActiveSubscription;

const mapStateToProps = (state) => ({
  CardDetails: state.ActiveSubscription.cardData,
  subscriptionList: state.ActiveSubscription.subscriptionList,
  requesting: state.ActiveSubscription.requesting,
  cancelRequest: state.ActiveSubscription.cancelRequest,
});

const mapDispatchToProps = (dispatch) => ({
  GetCardRequest: () => dispatch(GetCardRequest()),
  GetSubscriptionList: () => dispatch(GetSubscriptionListRequest()),
  CancelSubscription: (data) => dispatch(CancelSubscriptionRequest(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ActiveSubscription);
