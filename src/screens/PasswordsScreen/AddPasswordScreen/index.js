import {KeyboardAvoidingView, Platform, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {t} from 'i18next';
import {ViewApp} from '../../../components';
import {useDispatch, useSelector} from 'react-redux';
import {_onReloadSingle, _onUnmount, _onUnshift, actions} from '../../../redux/constants';
import {useNavigation, useRoute} from '@react-navigation/native';

const AddPasswordScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {params} = useRoute();
  const defaultData = {
    name: params?.name,
    login: params?.login,
    pass: params?.password,
    link: params?.link,
  };

  const createPassword = useSelector(state => state.createPassword.data);
  const updatePassword = useSelector(state => state.updatePassword.data);
  const [password, setPassword] = useState({
    name: '',
    login: '',
    pass: '',
    link: '',
  });
  const [modal, setModal] = useState({visible: false, message: '', type: '', isProcessing: false});

  const onClose = () => setModal({...modal, visible: false, isProcessing: false});

  useEffect(() => {
    if (createPassword?.status) {
      setModal({visible: true, message: createPassword.message, type: 'success', isProcessing: false});
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
      setModal({visible: true, message: createPassword.message, type: 'failure', isProcessing: false});
      dispatch({type: _onUnmount(actions.CREATE_PASSWORD)});
    }
  }, [createPassword]);

  useEffect(() => {
    if (updatePassword?.status) {
      setModal({visible: true, message: updatePassword.message, type: 'success', isProcessing: false});
      dispatch({
        type: _onReloadSingle(actions.GET_ALL_PASSWORD),
        idName: 'id',
        parentId: params.id,
        data: {
          name: password.name,
          password: password.pass,
          login: password.login,
          link: password.link,
        },
      });
      dispatch({type: _onUnmount(actions.UPDATE_PASSWORD)});
    }
    if (updatePassword?.status == 0) {
      setModal({visible: true, message: updatePassword.message, type: 'failure', isProcessing: false});
      dispatch({type: _onUnmount(actions.UPDATE_PASSWORD)});
    }
  }, [updatePassword]);

  useEffect(() => {
    if (params) {
      setPassword({...password, name: params.name, login: params.login, pass: params.password, link: params.link});
    }
  }, [params]);

  const onCreatePassword = () => {
    const requiredFields = ['name', 'login', 'pass', 'link'];

    if (requiredFields.some(field => !password[field]?.trim())) {
      return setModal({visible: true, message: 'Hãy điền đầy đủ thông tin', type: 'warning', isProcessing: false});
    }

    dispatch({
      type: params?.update ? actions.UPDATE_PASSWORD : actions.CREATE_PASSWORD,
      body: {
        name: password.name,
        login: password.login,
        password: password.pass,
        link: password.link,
      },
      id: params?.id,
    });

    setModal({
      visible: true,
      message: t('pleaseWait'),
      type: '',
      isProcessing: true,
    });
  };

  const onHiden = () => {
    if (modal.type === 'success') {
      navigation.goBack();
    }
  };

  return (
    <ViewApp.Container style={styles.container}>
      <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ViewApp.Toolbar title={t(params?.update ? 'updatePassword' : 'addPassword')} />
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            marginHorizontal: 20,
          }}>
          <ViewApp.InputField placeholder={t('name')} value={password.name} onChangeText={e => setPassword({...password, name: e})} />
          <ViewApp.InputField placeholder={t('login')} value={password.login} onChangeText={e => setPassword({...password, login: e})} />
          <ViewApp.InputField placeholder={t('password')} value={password.pass} onChangeText={e => setPassword({...password, pass: e})} />
          <ViewApp.InputField
            placeholder={t('link')}
            value={password.link}
            multiline={true}
            onChangeText={e => setPassword({...password, link: e})}
          />
        </ScrollView>
        {(!params?.update || JSON.stringify(defaultData) !== JSON.stringify(password)) && (
          <ViewApp.FABAdd styleTitle={{textTransform: 'uppercase'}} title={t(params?.update ? 'update' : 'save')} onPress={onCreatePassword} />
        )}
      </KeyboardAvoidingView>
      <ViewApp.MessageModal
        visible={modal.visible}
        message={modal.message}
        type={modal.type}
        isProcessing={modal.isProcessing}
        onClose={onClose}
        onHiden={onHiden}
      />
    </ViewApp.Container>
  );
};

export default AddPasswordScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});
