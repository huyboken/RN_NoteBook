import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, Pressable, Text, View, TouchableOpacity, Linking} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../../constant';
import {Display} from '../../../utils';
import styles from './style';
import {t} from 'i18next';

const MessageModal = ({
  visible,
  message = '',
  type = 'warning',
  isProcessing = false,
  hasActions = false,
  remember = '',
  onClose = () => {},
  onSubmit = () => {},
  onCancel = () => {},
  onHiden = () => {},
  autoClose = true,
}) => {
  const [counter, setCounter] = useState(0);
  const [intervalId, setIntervalId] = useState(-1);
  const counterRef = useRef();
  counterRef.current = counter;
  useEffect(() => {
    if ((type === 'success' || type === 'failure') && visible && autoClose && !isProcessing && intervalId === -1) {
      if (type === 'success') {
        setCounter(0.5);
        setTimeout(() => {
          onClose();
        }, 500);
      } else {
        setCounter(5);
        setIntervalId(
          setInterval(() => {
            if (counterRef.current - 1 > 0) {
              setCounter(counterRef.current - 1);
            } else {
              onClose();
            }
          }, 1000),
        );
      }
    }
  }, [type, visible]);

  const onBackdropPress = () => {
    if (!isProcessing) {
      onClose();
    }
  };

  const getIconName = () => {
    if (type === 'warning') {
      return 'warning-outline';
    }
    if (type === 'success') {
      return 'checkmark-circle-outline';
    }
    if (type === 'failure') {
      return 'close-circle';
    }
    if (type === 'notice') {
      return 'information-circle-outline';
    }
  };

  const getTypeColor = () => {
    if (isProcessing) {
      return '#00D3ED';
    }
    if (type === 'warning') {
      return Colors.DEFAULT_YELLOW;
    }
    if (type === 'failure') {
      return Colors.DEFAULT_RED;
    }
    return '#00D3ED';
  };

  const onHidden = () => {
    clearInterval(intervalId);
    setIntervalId(-1);
    onHiden();
  };

  const onToggleRemember = checked => {
    AsyncStorage.setItem(remember, checked ? 'no' : 'yes');
  };

  return (
    <Modal
      isVisible={visible}
      hasBackdrop={true}
      animationIn="bounceIn"
      animationInTiming={500}
      onBackdropPress={onBackdropPress}
      animationOut="fadeOutDown"
      useNativeDriver={true}
      onModalHide={onHidden}
      deviceHeight={Display.screenHeight}
      deviceWidth={Display.screenWidth}
      style={{alignItems: 'center', zIndex: 100}}
      statusBarTranslucent>
      <View style={styles.container}>
        {isProcessing ? (
          <ActivityIndicator color={'#00D3ED'} size="large" />
        ) : (
          <Ionicons
            name={getIconName()}
            style={[
              styles.messageIcon,
              {
                color: getTypeColor(),
              },
            ]}
          />
        )}
        {message ? <Text style={[styles.messageText, {color: getTypeColor()}]}>{isProcessing ? `${t('pleaseWait')}` : message}</Text> : null}
        {type === 'warning' && !isProcessing && !hasActions && (
          <View style={styles.actions}>
            <TouchableOpacity style={[styles.actionButton, {backgroundColor: getTypeColor()}]} onPress={onClose}>
              <Text style={styles.actionText}>OK</Text>
            </TouchableOpacity>
          </View>
        )}
        {remember.length > 0 && (
          <BouncyCheckbox
            style={styles.box}
            size={20}
            fillColor="transparent"
            unfillColor="transparent"
            text={t('DONT_ASK_AGAIN')}
            iconStyle={{
              borderColor: '#00D3ED',
              borderRadius: 0,
              width: 16,
              height: 16,
            }}
            iconImageStyle={{tintColor: '#00D3ED'}}
            textStyle={styles.boxLabel}
            onPress={onToggleRemember}
          />
        )}
        {hasActions && (
          <View style={styles.actions}>
            <TouchableOpacity style={[styles.actionButton, {backgroundColor: getTypeColor()}]} onPress={onSubmit}>
              <Text style={styles.actionText}>{t('YES')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, {backgroundColor: getTypeColor()}]} onPress={onCancel}>
              <Text style={styles.actionText}>{t('NO')}</Text>
            </TouchableOpacity>
          </View>
        )}
        {counter !== 0 && type === 'failure' && autoClose && (
          <View style={styles.autoClose}>
            <Text style={styles.autoCloseText}>{t('AUTO_CLOSE')}</Text>
            <Text style={[styles.autoCloseText, {color: getTypeColor()}]}> {counter}(s)</Text>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default MessageModal;
