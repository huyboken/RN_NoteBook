import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ViewApp} from '../../../components';
import {useDispatch, useSelector} from 'react-redux';
import {_onUnmount, _onUnshift, actions} from '../../../redux/constants';

const AddPasswordScreen = () => {
  const dispatch = useDispatch();
  const createPassword = useSelector(state => state.createPassword.data);
  const statusCreatePassword = useSelector(
    state => state.createPassword.isProcessing,
  );
  const [password, setPassword] = useState({
    name: '',
    login: '',
    pass: '',
    link: '',
  });

  useEffect(() => {
    if (createPassword?.status) {
      Alert.alert('succes', createPassword.message);
      dispatch({
        type: _onUnshift(actions.GET_ALL_PASSWORD),
        data: {
          id: createPassword.id,
          name: password.name,
          password: password.pass,
          login: password.login,
          link: password.link,
        },
      });
      dispatch({type: _onUnmount(actions.CREATE_PASSWORD)});
    }
    if (createPassword?.status == 0) {
      Alert.alert('fail', createPassword.message);
      dispatch({type: _onUnmount(actions.CREATE_PASSWORD)});
    }
  }, [createPassword]);

  const onCreatePassword = () => {
    const requiredFields = ['name', 'login', 'pass', 'link'];

    if (requiredFields.some(field => !password[field]?.trim())) {
      return Alert.alert('Lỗi', 'Hãy điền đầy đủ thông tin');
    }

    dispatch({
      type: actions.CREATE_PASSWORD,
      body: {
        name: password.name,
        login: password.login,
        password: password.pass,
        link: password.link,
      },
    });
  };

  return (
    <ViewApp.Container style={styles.container}>
      <ViewApp.Loading isLoading={statusCreatePassword} />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ViewApp.Toolbar title={'Add password'} />
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            marginHorizontal: 20,
          }}>
          <ViewApp.InputField
            placeholder={'Name'}
            onChangeText={e => setPassword({...password, name: e})}
          />
          <ViewApp.InputField
            placeholder={'Login'}
            onChangeText={e => setPassword({...password, login: e})}
          />
          <ViewApp.InputField
            placeholder={'Password'}
            onChangeText={e => setPassword({...password, pass: e})}
          />
          <ViewApp.InputField
            placeholder={'Link'}
            multiline={true}
            onChangeText={e => setPassword({...password, link: e})}
          />
        </ScrollView>
        <ViewApp.FABAdd title={'SAVE'} onPress={onCreatePassword} />
      </KeyboardAvoidingView>
    </ViewApp.Container>
  );
};

export default AddPasswordScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});
