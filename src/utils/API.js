import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const getAll = async (collection, currentPage = 10, lastVisible = '') => {
  const userId = await AsyncStorage.getItem('UserId');
  return firestore()
    .collection(collection)
    .where('userId', '==', userId)
    .orderBy('timestamp', 'desc')
    .startAfter(lastVisible)
    .limit(currentPage)
    .get()
    .then(res => {
      const newData = [];
      const newLastVisible = res.docs[res.docs.length - 1];
      res.forEach(doc => {
        newData.push({id: doc.id, ...doc.data()});
      });

      return {data: newData, lastVisible: newLastVisible};
    })
    .catch(error => ({status: 0, message: error || `get ${collection} fail`}));
};

const create = async (collection, bodyData) => {
  const userId = await AsyncStorage.getItem('UserId');
  return firestore()
    .collection(collection)
    .add({
      ...bodyData,
      createAt: firestore.FieldValue.serverTimestamp(),
      timestamp: firestore.FieldValue.serverTimestamp(),
      userId: userId,
    })
    .then(res => {
      return {status: 1, message: 'create success', id: res.id};
    })
    .catch(error => ({status: 0, message: error || `create ${collection} fail`}));
};

const remove = async (collection, bodyData) => {
  // const userId = await AsyncStorage.getItem('UserId');
  return firestore()
    .collection(collection)
    .doc(bodyData)
    .delete()
    .then(res => {
      return {status: 1, message: 'delete success'};
    })
    .catch(error => ({status: 0, message: error || `remove ${collection} fail`}));
};

export default {getAll, create, remove};
