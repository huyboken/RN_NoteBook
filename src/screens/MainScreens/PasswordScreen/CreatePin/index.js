import React, {useEffect, useRef, useState} from 'react';
import {PinView} from '../../../../components';
import {t} from 'i18next';
import {Alert, View} from 'react-native';
const CreatePin = () => {
  const pinRef = useRef(null);
  const rePinRef = useRef(null);
  const [createPin, setCreatePin] = useState({
    pin: '',
    repin: '',
    showPin: true,
    showRePin: false,
  });

  useEffect(() => {
    if (createPin.pin.length === 4) {
      setCreatePin({...createPin, showPin: false, showRePin: true});
      pinRef?.current?.clearAll();
    }
  }, [createPin.pin]);

  useEffect(() => {
    if (createPin.repin.length === 4) {
      if (createPin.pin === createPin.repin) {
        setCreatePin({
          ...createPin,
          showPin: false,
          showRePin: false,
          pin: '',
          repin: '',
        });
        rePinRef?.current?.clearAll();
        Alert.alert('success', '123');
      } else {
        setCreatePin({
          ...createPin,
          showPin: false,
          showRePin: false,
          pin: '',
          repin: '',
        });
        Alert.alert('fail', '123');
        rePinRef?.current?.clearAll();
      }
    }
  }, [createPin.repin]);

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      {createPin.showPin && (
        <PinView
          ref={pinRef}
          onPinEntered={e => setCreatePin({...createPin, pin: e})}
          onBiometrics={() => console.log('onBiometrics')}
          title={t('createYourPass')}
          subTitle={t('createYourPassSub')}
        />
      )}
      {createPin.showRePin && (
        <PinView
          ref={rePinRef}
          onPinEntered={e => setCreatePin({...createPin, repin: e})}
          onBiometrics={() => console.log('onBiometrics')}
          title={t('repeatNewPass')}
          subTitle={t('repeatNewPassSub')}
        />
      )}
    </View>
  );
};
export default CreatePin;
