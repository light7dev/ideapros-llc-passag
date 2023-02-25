import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Color } from './styles';

const ProfileDropDown = (props) => {
  const { data, function1, selectedCategoryId } = props;

  return (
    <View
      style={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: Color.white,
        borderRadius: 8,
        zIndex: 100,
        elevation: 5,
      }}
    >
      {data?.map((item, index) => {
        return (
          <View
            key={index + ''}
            style={{ marginVertical: 8, backgroundColor: Color.white, height: 30, borderRadius: 8 }}
          >
            <TouchableOpacity onPress={() => function1(index, item)}>
              <View
                style={{
                  backgroundColor: selectedCategoryId == index ? Color.red : Color.white,
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 4,
                  height: 35,
                  top: -8,
                }}
              >
                <View style={{ marginHorizontal: 30, marginTop: 5 }}>
                  <Text
                    style={{
                      fontSize: 15,
                      letterSpacing: 1,
                      color: selectedCategoryId == index ? Color.white : Color.black,
                    }}
                  >
                    {item}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default ProfileDropDown;
