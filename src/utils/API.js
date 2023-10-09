import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
// import store from '../redux/store';

const getAll = async (collection, collection2) => {
  const userId = await AsyncStorage.getItem('UserId');
  return firestore()
    .collection(collection)
    .doc(userId)
    .collection(collection2)
    .orderBy('timestamp', 'desc')
    .get()
    .then(res => {
      const passwordArray = [];
      res.forEach(doc => {
        passwordArray.push({id: doc.id, ...doc.data()});
      });
      return passwordArray;
    });
};

const create = async (collection, collection2, bodyData) => {
  const userId = await AsyncStorage.getItem('UserId');
  return firestore()
    .collection(collection)
    .doc(userId)
    .collection(collection2)
    .add({...bodyData, timestamp: firestore.FieldValue.serverTimestamp()})
    .then(res => {
      return {status: 1, message: 'create success', id: res.id};
    })
    .catch(error => ({status: 0, message: error || 'create fail'}));
};

const remove = async (collection, collection2, bodyData) => {
  const userId = await AsyncStorage.getItem('UserId');
  return firestore()
    .collection(collection)
    .doc(userId)
    .collection(collection2)
    .doc(bodyData)
    .delete()
    .then(res => {
      return {status: 1, message: 'delete success'};
    })
    .catch(error => ({status: 0, message: error || 'remove fail'}));
};

export default {getAll, create, remove};
