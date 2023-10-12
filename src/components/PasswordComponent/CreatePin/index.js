import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import PinView from '../PinView';
import {t} from 'i18next';

const CreatePin = ({onClose = () => {}, onSubmit = () => {}}) => {
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
        onSubmit(+createPin.pin);
      } else {
        setCreatePin({
          ...createPin,
          showPin: true,
          showRePin: false,
          pin: '',
          repin: '',
        });
        rePinRef?.current?.clearAll();
        onClose();
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
          disableIconLeft={true}
        />
      )}
      {createPin.showRePin && (
        <PinView
          ref={rePinRef}
          onPinEntered={e => setCreatePin({...createPin, repin: e})}
          onBiometrics={() => console.log('onBiometrics')}
          title={t('repeatNewPass')}
          subTitle={t('repeatNewPassSub')}
          disableIconLeft={true}
        />
      )}
    </View>
  );
};
export default CreatePin;
