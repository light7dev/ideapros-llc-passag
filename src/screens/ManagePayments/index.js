import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
} from 'react-native';

import DatePicker from 'react-native-date-picker';
import moment from 'moment';

import validator from 'src/utils/validation';

import { Button, InputField, DataAvailability } from '../../components';
import { deleteCardRequest, paymentsRequest, listCardRequest } from './redux/actions';

// components
import { Layout, Gutters, Images } from 'src/theme';

import { connect } from 'react-redux';

// hooks
import useForm from 'src/hooks/useForm';

import { textInputStyles, titleInputStyles, cardStyles, Color } from './styles';
import { styles } from './styles';

export const IconCard = ({ lTitle, rTitle, data, deleteIt }) => {
  return (
    <View style={cardStyles.mainView}>
      <View style={cardStyles.firstView}>
        <Text style={cardStyles.lTitleStyles}>{lTitle}</Text>
        <Text style={cardStyles.rTitleStyles}>{rTitle}</Text>
      </View>
      <View style={cardStyles.secondView}>
        <Text style={cardStyles.starStyle}>* * * *</Text>
        <Text style={cardStyles.starStyle}>* * * *</Text>
        <Text style={cardStyles.starStyle}>* * * *</Text>
        <Text style={cardStyles.starStyle}>{data.last4}</Text>
      </View>

      <View style={cardStyles.thirdView}>
        <Button
          onPress={() => deleteIt(data.id)}
          text={'Delete Card'}
          color={'secondary'}
          full
          style={cardStyles.deleteBtnStyle}
        />
      </View>
    </View>
  );
};

const ManagePayments = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const { listCardRequest, listCard, requesting } = props;

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    listCardRequest();
  }, [props.deleteCard, props.paymentData]);

  const [onPressButton, setOnPressButton] = useState('pay');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [card, setCard] = useState('');
  const [date, setDate] = useState(new Date());
  const [formateDate, setFormateDate] = useState('');

  const [validationError, setValidationError] = useState({
    name: '',
    number: '',
    card: '',
    date: '',
    formateDate: '',
  });

  const onpay = () => {
    if (!name) {
      return setValidationError({
        name: 'Please enter card holder name.',
        number: '',
        card: '',
        formateDate: '',
      });
    }
    if (!number) {
      return setValidationError({
        name: '',
        number: 'Please enter card number.',
        card: '',
        formateDate: '',
      });
    }
    if (!card) {
      return setValidationError({
        name: '',
        number: '',
        card: 'Please enter card cvc.',
        formateDate: '',
      });
    }

    if (!date) {
      return setValidationError({
        name: '',
        number: '',
        card: '',
        formateDate: 'Please choose the date.',
      });
    }

    const data = {
      name: name,
      card_num: number,
      expiry_month: date.split('-')[0],
      expiry_year: date.split('-')[1],
      cvc: card,
    };
    props.paymentsRequest(data);
    setName('');
    setNumber('');
    setCard('');
    setDate('');
    setModalVisible(!modalVisible);
  };

  const stateSchema = {
    name: {
      value: '',
      error: '',
    },
  };
  const validationStateSchema = {
    name: {
      required: true,
      validator: validator.name,
    },
  };

  const setDateData = (date) => {
    setDate(date);
    const dateValue = moment(date).format('MM-DD-YYYY');
    setFormateDate(dateValue);
  };

  const { fill, row, center, fillGrow } = Layout;

  const cardDateFormatter = (val) => {
    let copy = '-';
    if (val.length === 2) {
      setTimeout(() => {
        setDate(val.concat(copy));
      }, 150);
    }
    setDate(val);
  };
  const { state, handleOnChange, disable } = useForm(stateSchema, validationStateSchema);

  return (
    <>
      <View style={[fill, { borderWidth: 1 }]}>
        <SafeAreaView style={styles.mainViewAlign}>
          <TouchableOpacity onPress={() => props.navigation.goBack()} style={fill}>
            <Image source={Images.BackAeroLight} style={styles.backArrowStyle} />
          </TouchableOpacity>
          <View>
            <Text style={styles.screenTitle}>Manage Payments</Text>
          </View>
          <View style={fill} />
        </SafeAreaView>
        <View style={{ flex: 1 }}>
          <DataAvailability requesting={requesting} hasData={listCard.length > 0} textColor="black">
            <ScrollView contentContainerStyle={fillGrow} keyboardShouldPersistTaps={'always'}>
              <View style={styles.cardWrapper}>
                {listCard &&
                  listCard.length > 0 &&
                  listCard.map((item, index) => {
                    return (
                      <View key={index}>
                        <IconCard
                          lTitle={item.name}
                          rTitle={item.brand}
                          data={item}
                          deleteIt={props.deleteCardRequest}
                        />
                      </View>
                    );
                  })}
              </View>
            </ScrollView>
          </DataAvailability>
        </View>
        <Button
          onPress={() => setModalVisible(true)}
          text={'Add New Card'}
          color={'primary'}
          full
          style={styles.addCardBtn}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
          style={[styles.modalView, { flex: 1 }]}
        >
          <View style={styles.modalInnerView}>
            <KeyboardAvoidingView style={{ height: '100%' }}>
              <ScrollView
                keyboardShouldPersistTaps={'always'}
                contentContainerStyle={{ flexGrow: 1 }}
              >
                <View style={titleInputStyles.container}>
                  <View style={[titleInputStyles.logoSecond]}>
                    <View style={titleInputStyles.labelParent}>
                      <Text style={titleInputStyles.label}>{'Add card details'}</Text>
                    </View>
                    <View style={titleInputStyles.cardStyle}>
                      <View style={fill}>
                        <InputField
                          value={name}
                          onChangeText={(value) => {
                            handleOnChange('name', value);
                            setName(value);
                          }}
                          showFirstImage={true}
                          sourceFirst={Images.userImage}
                          inputContainerStyle={styles.PH15}
                          maxLength={50}
                          placeholderTextColor={Color.steel}
                          placeholder={name ? name : 'Card holder name'}
                          mainContainerStyle={styles.PH15}
                          validationText={validationError.name || validationError.email}
                          keyboardType={'email-address'}
                        />
                        {state.name.error ? (
                          <View>
                            <Text style={textInputStyles.error}>{state.name.error || ''}</Text>
                          </View>
                        ) : null}

                        <InputField
                          value={number}
                          onChangeText={(value) => setNumber(value)}
                          showFirstImage={true}
                          sourceFirst={Images.cardNumber}
                          inputContainerStyle={styles.PH15}
                          maxLength={16}
                          placeholderTextColor={Color.steel}
                          placeholder={number ? number : 'Card number'}
                          mainContainerStyle={styles.PH15}
                          validationText={validationError.number}
                          keyboardType={'numeric'}
                        />
                      </View>
                      <View style={row}>
                        <InputField
                          value={card}
                          onChangeText={(value) => setCard(value)}
                          showFirstImage={true}
                          sourceFirst={Images.cvvNumber}
                          inputContainerStyle={styles.PH15}
                          maxLength={3}
                          placeholderTextColor={Color.steel}
                          placeholder={card ? card : '***'}
                          mainContainerStyle={styles.PH15}
                          topMainContainer={{ flex: 1 }}
                          validationText={validationError.card}
                          keyboardType={'numeric'}
                          secureTextEntry={true}
                          multiline={false}
                        />

                        <View style={{ width: 20 }} />
                        <InputField
                          value={date}
                          onChangeText={(value) => cardDateFormatter(value)}
                          showFirstImage={true}
                          sourceFirst={Images.date}
                          inputContainerStyle={styles.PH15}
                          maxLength={5}
                          placeholder={'MM-YY'}
                          placeholderTextColor={Color.steel}
                          mainContainerStyle={styles.PH15}
                          topMainContainer={fill}
                          validationText={validationError.formateDate}
                          keyboardType={'numeric'}
                          secureTextEntry={false}
                        />
                      </View>

                      <View style={styles.addandBackBtnStyle}>
                        <TouchableOpacity
                          onPress={() => {
                            setOnPressButton('pay'), onpay();
                          }}
                          style={[
                            styles.buttonText,
                            {
                              backgroundColor: onPressButton === 'pay' ? '#9C2B2E' : 'white',
                              borderColor: onPressButton === 'pay' ? 'white' : '#9C2B2E',
                            },
                          ]}
                        >
                          {props.requesting ? (
                            <View style={[fill, center]}>
                              <ActivityIndicator
                                color={props.loadingColor ? props.loadingColor : Color.white}
                                style={props.loadingStyle}
                              />
                            </View>
                          ) : (
                            <Text
                              style={[
                                styles.textButton,
                                { color: onPressButton === 'pay' ? 'white' : '#9C2B2E' },
                              ]}
                            >
                              Add
                            </Text>
                          )}
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            setOnPressButton(!onPressButton), setModalVisible(!modalVisible);
                          }}
                          style={[
                            styles.buttonText,
                            {
                              backgroundColor: onPressButton === 'back' ? '#9C2B2E' : 'white',
                              borderColor: onPressButton === 'back' ? 'white' : '#9C2B2E',
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.textButton,
                              { color: onPressButton === 'back' ? 'white' : '#9C2B2E' },
                            ]}
                          >
                            Back
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
          <Modal
            visible={isVisible}
            style={styles.modalDateMainView}
            onRequestClose={() => setIsVisible(!isVisible)}
          >
            <View style={styles.modalDateInnerView}>
              <DatePicker
                mode="date"
                date={date}
                onDateChange={setDateData}
                minimumDate={new Date()}
                style={{ backgroundColor: 'white' }}
              />
              <Button
                onPress={() => {
                  setIsVisible(false), setDateData(date);
                }}
                text={'Add Date'}
                color={'primary'}
                style={styles.modalAddBtn}
                full={true}
              />
            </View>
          </Modal>
        </Modal>
      </View>
    </>
  );
};

const mapStateToProps = (state) => ({
  deleteCard: state.managePayments.deleteCard,
  listCard: state.managePayments.listCard,
  paymentData: state.managePayments.payment,
  requesting: state.managePayments.requesting,
});

const mapDispatchToProps = (dispatch) => ({
  listCardRequest: (data) => dispatch(listCardRequest(data)),
  deleteCardRequest: (data) => dispatch(deleteCardRequest(data)),
  paymentsRequest: (data) => dispatch(paymentsRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManagePayments);
