import {Animated, RefreshControl, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import styles from './style';
import {PinView, ViewApp, CreatePin, PassCard} from '../../../components';
import {t} from 'i18next';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {_onReloadSingle, _onRemoveOne, _onUnmount, actions} from '../../../redux/constants';
import {FlashList} from '@shopify/flash-list';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const PasswordScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const prevOpenedRowRef = useRef();
  const pinRef = useRef();

  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 50);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -50],
  });

  const userinfo = useSelector(state => state.getUserInfo.data);
  const updateUserinfo = useSelector(state => state.updateUserInfo.data);
  const getAllPassword = useSelector(state => state.getAllPassword.data);
  const passwordVisible = useSelector(state => state.getAllPassword.lastVisible);
  const deleteStatus = useSelector(state => state.deletePassword.data);
  const getAllPasswordLoading = useSelector(state => state.getAllPassword.isProcessing);

  const [modal, setModal] = useState({visible: false, message: '', type: '', isProcessing: false});
  const [pin, setPin] = useState({data: '', status: true});
  const [search, setSearch] = useState({value: '', status: false});

  const renderPass = ({item}) => <PassCard item={item} index={item} onDelete={onDelete} onUpdate={onUpdate} prevOpenedRowRef={prevOpenedRowRef} />;

  const onDelete = id => {
    dispatch({type: actions.DELETE_PASSWORD, body: id});
    setModal({
      visible: true,
      message: t('pleaseWait'),
      type: '',
      isProcessing: true,
    });
  };

  const onCloseModal = () => setModal({...modal, visible: false, isProcessing: false});

  const onUpdate = item => {
    navigation.navigate('PasswordStack', {screen: 'AddPasswordScreen', params: {...item, update: true}});
  };

  const onAdd = () => {
    navigation.removeListener;
    navigation.navigate('PasswordStack', {screen: 'AddPasswordScreen'});
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

  const onSubmitPin = pin => {
    dispatch({type: actions.UPDATE_USER_INFO, body: {passwordPin: pin}});
    setModal({
      visible: true,
      message: t('pleaseWait'),
      type: '',
      isProcessing: true,
    });
  };

  const onClosePin = () => {
    setModal({
      visible: true,
      message: 'Mã pin phải giống nhau',
      type: 'warning',
      isProcessing: false,
    });
  };

  const openSearch = () => {
    setSearch({...search, status: true});
  };

  const closeSearch = () => {
    setSearch({...search, status: false});
  };

  useEffect(() => {
    if (deleteStatus?.status) {
      setModal({visible: true, message: deleteStatus.message, type: 'success', isProcessing: false});
      dispatch({
        type: _onRemoveOne(actions.GET_ALL_PASSWORD),
        parentId: deleteStatus?.id,
        idName: 'id',
      });
      dispatch({type: _onUnmount(actions.DELETE_PASSWORD)});
    }
    if (deleteStatus?.status == 0) {
      setModal({visible: true, message: deleteStatus.message, type: 'failure', isProcessing: false});
      dispatch({type: _onUnmount(actions.DELETE_PASSWORD)});
    }
  }, [deleteStatus]);

  useEffect(() => {
    if (updateUserinfo?.status) {
      setModal({visible: true, message: updateUserinfo.message, type: 'success', isProcessing: false});
      dispatch({type: _onUnmount(actions.UPDATE_USER_INFO)});
      dispatch({type: actions.GET_USER_INFO});
    }
    if (updateUserinfo?.status == 0) {
      setModal({visible: true, message: updateUserinfo.message, type: 'failure', isProcessing: false});
      dispatch({type: _onUnmount(actions.UPDATE_USER_INFO)});
    }
  }, [updateUserinfo]);

  useEffect(() => {
    if (pin.data.length === 4) {
      if (+pin.data === userinfo?.passwordPin) {
        setPin({...pin, data: '', status: false});
      } else {
        setPin({...pin, data: ''});
        pinRef.current?.clearAll();
        setModal({visible: true, message: 'Sai mã pin', type: 'warning', isProcessing: false});
      }
    }
  }, [pin.data]);

  return (
    <ViewApp.Container style={styles.container} backgroundStatusBar={'white'}>
      {userinfo?.passwordPin && !pin.status && (
        <Animated.View
          style={{
            transform: [{translateY: translateY}],
            zIndex: 10,
          }}>
          <ViewApp.Toolbar
            style={styles.toolbar}
            showBackIcon={false}
            title={t('passwords')}
            iconRight={() => (
              <View style={styles.toolbarActionRight}>
                <MaterialCommunityIcons onPress={openSearch} style={[styles.toolbarActionRightIcon, {marginLeft: 10}]} name="update" />
                <Ionicon onPress={openSearch} style={[styles.toolbarActionRightIcon, {marginLeft: 15}]} name="search" />
              </View>
            )}
          />
        </Animated.View>
      )}
      {userinfo?.passwordPin ? (
        pin.status ? (
          <View style={styles.rootView}>
            <PinView
              ref={pinRef}
              onPinEntered={e => setPin({...pin, data: e})}
              onBiometrics={() => console.log('onBiometrics')}
              title={t('enterYourPass')}
            />
          </View>
        ) : (
          <FlashList
            bounces={false}
            estimatedItemSize={50}
            contentContainerStyle={{paddingTop: 50}}
            data={getAllPassword}
            keyExtractor={(item, index) => item.id || index}
            renderItem={renderPass}
            refreshControl={refreshControl}
            onEndReached={loadMorePasswords}
            scrollEventThrottle={24}
            onEndReachedThreshold={0.6}
            nestedScrollEnabled={true}
            ListFooterComponent={<ViewApp.FooterFlatlist passwordVisible={passwordVisible} data={getAllPassword} />}
            ListEmptyComponent={<ViewApp.EmptyFlatlist />}
            onScroll={e => scrollY.setValue(e.nativeEvent.contentOffset.y)}
          />
        )
      ) : (
        <View style={styles.rootView}>
          <CreatePin onSubmit={onSubmitPin} onClose={onClosePin} />
        </View>
      )}

      {userinfo?.passwordPin && !pin.status && <ViewApp.FABAdd onPress={onAdd} />}
      <ViewApp.MessageModal
        visible={modal.visible}
        message={modal.message}
        type={modal.type}
        isProcessing={modal.isProcessing}
        onClose={onCloseModal}
        // onHiden={onHiden}
      />
    </ViewApp.Container>
  );
};

export default PasswordScreen;
