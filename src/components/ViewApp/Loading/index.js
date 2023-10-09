import {ActivityIndicator, View, Modal} from 'react-native';
import React from 'react';
import styles from './style';

const Loading = ({isLoading}) => {
  return (
    <Modal animationType={'fade'} transparent={true} visible={isLoading}>
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color={'black'} />
        </View>
      </View>
    </Modal>
  );
};

export default Loading;
