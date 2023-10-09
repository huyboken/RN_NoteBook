import {Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import ReactNativePinView from 'react-native-pin-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import styles from './style';

const PinView = React.forwardRef(
  (
    {title, subTitle, onBiometrics = () => {}, onPinEntered = () => {}},
    ref,
  ) => {
    const handlePinEntered = value => {
      onPinEntered(value);
    };

    return (
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        {title && <Text style={styles.title}>{title}</Text>}
        {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}

        <ReactNativePinView
          inputSize={32}
          ref={ref}
          pinLength={4}
          buttonSize={60}
          onValueChange={handlePinEntered}
          buttonAreaStyle={{
            marginTop: 24,
            padding: 30,
          }}
          inputAreaStyle={{
            marginBottom: 24,
          }}
          inputViewEmptyStyle={{
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: '#00D3ED',
          }}
          inputViewFilledStyle={{
            backgroundColor: '#00D3ED',
          }}
          buttonViewStyle={{
            borderWidth: 1,
            borderColor: 'grey',
          }}
          buttonTextStyle={{
            color: 'black',
            fontSize: 30,
          }}
          onButtonPress={key => {
            if (key === 'custom_left') {
              onBiometrics();
            }
            if (key === 'custom_right') {
              ref.current?.clear();
            }
          }}
          customLeftButton={
            <Ionicons name={'finger-print-sharp'} size={36} color={'#00D3ED'} />
          }
          customRightButton={
            <Feather name={'delete'} size={30} color={'#00D3ED'} />
          }
        />
      </View>
    );
  },
);

export default PinView;
