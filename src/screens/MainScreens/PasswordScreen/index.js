import {View, Text, FlatList, Alert, RefreshControl} from 'react-native';
import React, {useEffect, useRef} from 'react';
import CreatePin from './CreatePin';
import styles from './style';
import {ViewApp} from '../../../components';
import {t} from 'i18next';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {_onRemoveOne, _onUnmount, actions} from '../../../redux/constants';

const PasswordScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const prevOpenedRowRef = useRef();

  const getAllPassword = useSelector(state => state.getAllPassword.data);
  const deleteStatus = useSelector(state => state.deletePassword.data);
  const getAllPasswordLoading = useSelector(
    state => state.getAllPassword.isProcessing,
  );

  useEffect(() => {
    if (deleteStatus?.status) {
      dispatch({
        type: _onRemoveOne(actions.GET_ALL_PASSWORD),
        parentId: deleteStatus?.id,
        idName: 'id',
      });
    }
    if (deleteStatus?.status == 0) {
      dispatch({type: _onUnmount(actions.GET_ALL_PASSWORD)});
    }
  }, [deleteStatus]);

  const Item = ({item, index, onDelete = () => {}}) => {
    return (
      <ViewApp.Swipeable
        index={index}
        prevOpenedRowRef={prevOpenedRowRef}
        onDelete={() => onDelete(item.id)}>
        <ViewApp.Panel title={item.name} type="transparent">
          <ViewApp.InputField
            styleInput={{backgroundColor: '#E5FBFE'}}
            value={item.login}
            placeholder={'Login'}
          />
          <ViewApp.InputField
            styleInput={{backgroundColor: '#E5FBFE'}}
            value={item.password}
            placeholder={'Password'}
          />
          <ViewApp.InputField
            styleInput={{backgroundColor: '#E5FBFE', color: '#00A1BB'}}
            value={item?.link}
            placeholder={'Link'}
          />
        </ViewApp.Panel>
      </ViewApp.Swipeable>
    );
  };
  const renderItem = ({item}) => (
    <Item item={item} index={item} onDelete={onDelete} />
  );

  const onDelete = id => {
    dispatch({type: actions.DELETE_PASSWORD, body: id});
  };

  const refreshControl = (
    <RefreshControl
      refreshing={getAllPasswordLoading}
      onRefresh={() => dispatch({type: actions.GET_ALL_PASSWORD})}
    />
  );

  return (
    <ViewApp.Container style={styles.container}>
      <ViewApp.Toolbar showBackIcon={false} title={t('passwords')} />
      {/* <CreatePin /> */}
      <FlatList
        data={getAllPassword}
        keyExtractor={(item, index) => item.id || index}
        renderItem={renderItem}
        refreshControl={refreshControl}
      />
      <ViewApp.FABAdd
        onPress={() => (
          navigation.removeListener,
          navigation.navigate('PasswordStack', {screen: 'AddPasswordScreen'})
        )}
      />
    </ViewApp.Container>
  );
};

export default PasswordScreen;
