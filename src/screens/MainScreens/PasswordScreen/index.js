import {Animated, RefreshControl} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import CreatePin from './CreatePin';
import styles from './style';
import {ViewApp} from '../../../components';
import {t} from 'i18next';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {_onRemoveOne, _onUnmount, actions} from '../../../redux/constants';
import {FlashList} from '@shopify/flash-list';

const PasswordScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const prevOpenedRowRef = useRef();

  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 50);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -50],
  });

  const getAllPassword = useSelector(state => state.getAllPassword.data);
  const passwordVisible = useSelector(state => state.getAllPassword.lastVisible);
  const deleteStatus = useSelector(state => state.deletePassword.data);
  const getAllPasswordLoading = useSelector(state => state.getAllPassword.isProcessing);

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
      <ViewApp.Swipeable index={index} prevOpenedRowRef={prevOpenedRowRef} onDelete={() => onDelete(item.id)}>
        <ViewApp.Panel title={item.name} type="transparent">
          <ViewApp.InputField styleInput={{backgroundColor: '#E5FBFE'}} value={item.login} placeholder={'Login'} />
          <ViewApp.InputField styleInput={{backgroundColor: '#E5FBFE'}} value={item.password} placeholder={'Password'} />
          <ViewApp.InputField styleInput={{backgroundColor: '#E5FBFE', color: '#00A1BB'}} value={item?.link} placeholder={'Link'} />
        </ViewApp.Panel>
      </ViewApp.Swipeable>
    );
  };
  const renderItem = ({item}) => <Item item={item} index={item} onDelete={onDelete} />;

  const onDelete = id => {
    dispatch({type: actions.DELETE_PASSWORD, body: id});
  };

  const refreshControl = (
    <RefreshControl refreshing={getAllPasswordLoading} onRefresh={() => dispatch({type: actions.GET_ALL_PASSWORD, shouldOverwriteExist: true})} />
  );

  const loadMorePasswords = () => {
    passwordVisible &&
      dispatch({
        type: actions.GET_ALL_PASSWORD,
        lastVisible: passwordVisible,
      });
  };

  return (
    <ViewApp.Container style={styles.container} backgroundStatusBar={'white'}>
      <Animated.View
        style={{
          transform: [{translateY: translateY}],
          zIndex: 10,
        }}>
        <ViewApp.Toolbar style={styles.toolbar} showBackIcon={false} title={t('passwords')} />
      </Animated.View>
      {/* <CreatePin /> */}
      <FlashList
        // bounces={false}
        estimatedItemSize={50}
        contentContainerStyle={{paddingTop: 50}}
        data={getAllPassword}
        keyExtractor={(item, index) => item.id || index}
        renderItem={renderItem}
        refreshControl={refreshControl}
        onEndReached={loadMorePasswords}
        scrollEventThrottle={24}
        onEndReachedThreshold={0.6}
        nestedScrollEnabled={true}
        ListFooterComponent={<ViewApp.FooterFlatlist passwordVisible={passwordVisible} data={getAllPassword} />}
        ListEmptyComponent={<ViewApp.EmptyFlatlist />}
        onScroll={e => scrollY.setValue(e.nativeEvent.contentOffset.y)}
      />
      <ViewApp.FABAdd onPress={() => (navigation.removeListener, navigation.navigate('PasswordStack', {screen: 'AddPasswordScreen'}))} />
    </ViewApp.Container>
  );
};

export default PasswordScreen;
