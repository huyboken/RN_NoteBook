import {Reasons} from '../constant';
import {
  _onSuccess,
  _onFail,
  _onUnmount,
  _onProcessing,
  _onBindChildren,
  _onReloadSingle,
  _onRemoveOne,
  _onUnshift,
  _onAddProperty,
  _updateItem,
  _updateRooms,
  _deleteRoom,
  _onUpdateStatusMess,
  _updateARoom,
} from './constants';

const stateDefault = {
  data: null,
  isProcessing: false,
};

const statePagination = {
  data: [],
  totalPage: 1,
  currentPage: 1,
  isProcessing: false,
  total: 0,
  config: null,
};

export const reducerDefault = (state = stateDefault, action, Action) => {
  switch (action.type) {
    case Action:
      return {...state, isProcessing: true};
    case _onProcessing(Action):
      return {...state, isProcessing: true};
    case _onSuccess(Action):
      return {
        data: action.data,
        isProcessing: false,
      };
    case _onFail(Action):
      return {
        data: {
          status: false,
          message: action.message,
        },
        isProcessing: false,
      };
    case _onUnmount(Action):
      return {...stateDefault};
    default:
      return state;
  }
};

export const reducerPaginationSimple = (
  state = statePagination,
  action,
  Action,
) => {
  switch (action.type) {
    case Action: {
      return {...state, isProcessing: true};
    }
    case _onSuccess(Action): {
      return {
        data: action.shouldOverwriteExist
          ? action.data
          : [...state.data, ...action.data],
        totalPage: action.totalPage || 1,
        currentPage: action.currentPage,
        isProcessing: false,
        total: action.total,
        config: action.config,
      };
    }
    case _onFail(Action): {
      return {status: false, isProcessing: false};
    }
    case _onUnmount(Action): {
      return {...statePagination};
    }
    default: {
      return state;
    }
  }
};

export const reducerPagination = (state = statePagination, action, Action) => {
  switch (action.type) {
    case Action:
      return {...state, isProcessing: true};
    case _onProcessing(Action): {
      return {...state, isProcessing: true};
    }
    case _onSuccess(Action): {
      //Check nếu muốn overwrite data đã tồn tại
      const data = action.shouldOverwriteExist
        ? action.data
        : [...state.data, ...action.data];
      return {
        data: data,
        totalPage: action.totalPage || 1,
        currentPage: action.currentPage,
        isProcessing: false,
        total: action.total,
        loaded: true,
        lastVisible: action.lastVisible,
      };
    }
    //Case thêm item lên vị trí đầu tiên của mảng
    case _onUnshift(Action): {
      const newData = [action.data, ...state.data];
      return {
        data: newData,
        totalPage: action.totalPage || 1,
        currentPage: action.currentPage,
        isProcessing: false,
        total: state.total + 1,
      };
    }
    //Case thêm array con vào 1 item
    case _onBindChildren(Action): {
      const children = action.data;
      return {
        ...state,
        data: state.data.map(item => {
          //Tìm item cha
          if (item[action.idName] === action.parentId) {
            //Check nếu muốn overwrite data đã tồn tại
            const newData = action.shouldOverwriteExist
              ? children
              : //Check nếu muốn thêm data lên đầu mảng con
              action.shouldUnshift
              ? [...children, ...(item[action.childrenArrayName] || [])]
              : [...(item[action.childrenArrayName] || []), ...children];
            return {
              ...item,
              [action.childrenArrayName]: newData,
              totalChildrenPage: action.totalPage,
              currentChildrenPage: action.currentPage,
              [action.childCounterName]: action.total,
            };
          }
          return item;
        }),
        isProcessing: false,
      };
    }
    //Case cập nhật 1 item trong mảng
    case _onReloadSingle(Action): {
      return {
        ...state,
        data: state.data.map(item => {
          //Tìm và cập nhật item con
          if (action.isChild && item[action.idName] === action.parentId) {
            return {
              ...item,
              [action.childrenArrayName]: item[action.childrenArrayName].map(
                child => {
                  if (child[action.idName] === action.childId) {
                    return {...child, ...action.data};
                  }
                  return child;
                },
              ),
            };
          }
          //Tìm và cập nhật item cha
          if (action.parentId && item[action.idName] === action.parentId) {
            return {...item, ...action.data};
          }
          return item;
        }),
        isProcessing: false,
      };
    }
    //Case xoá 1 item trong mảng
    case _onRemoveOne(Action): {
      //Check nếu là id của item con thì xoá item con, nếu không phải thì xoá item cha
      const newData = action.childId
        ? state.data.map(item => {
            if (item[action.idName] === action.parentId) {
              return {
                ...item,
                [action.childrenArrayName]: item[
                  action.childrenArrayName
                ].filter(item2 => item2[action.idName] !== action.childId),
                ...(action.childCounterName
                  ? {
                      [action.childCounterName]:
                        item[action.childCounterName] - 1,
                    }
                  : {}),
              };
            }
            return item;
          })
        : state.data.filter(item => item[action.idName] !== action.parentId);
      return {
        ...state,
        data: newData,
        total: action.childId ? state.total : state.total - 1,
        isProcessing: false,
      };
    }
    case _onFail(Action):
      return {
        //Check nếu muốn reset data về mặc định hoặc giữ nguyên
        ...(action.shouldReset ? statePagination : state),
        isProcessing: false,
        loaded: true,
      };
    case _onUnmount(Action):
      return statePagination;
    default:
      return state;
  }
};
export const reducerPaginationRoom = (
  state = statePagination,
  action,
  Action,
) => {
  switch (action.type) {
    case Action:
      return {...state, isProcessing: true};
    case _onProcessing(Action): {
      return {...state, isProcessing: true};
    }
    case _onSuccess(Action): {
      //Check nếu muốn overwrite data đã tồn tại
      const data = action.shouldOverwriteExist
        ? action.data
        : [...state.data, ...action.data];
      return {
        data: data,
        totalPage: action.totalPage || 1,
        currentPage: action.currentPage,
        isProcessing: false,
        total: action.total,
        loaded: true,
      };
    }
    case _onFail(Action):
      return {
        //Check nếu muốn reset data về mặc định hoặc giữ nguyên
        ...(action.shouldReset ? statePagination : state),
        isProcessing: false,
        loaded: true,
      };
    case _onUnmount(Action):
      return statePagination;
    //ACCTION DANH CHO CHAT ROOM
    // update unreadrooms riêng cho room chat
    case _updateItem(Action): {
      const newData = state?.data?.map(item => {
        if (action.unreadRoomsList[item._id]) {
          return {
            ...item,
            _unread: action.unreadRoomsList[item._id],
          };
        }
        return item;
      });
      return {
        ...state,
        data: newData,
        total: action.childId ? state.total : state.total - 1,
        isProcessing: false,
      };
    }
    // update a room
    case _updateARoom(Action): {
      const newData = state?.data?.map(item => {
        if (item._id === action.id) {
          return action.newItem;
        }
        return item;
      });
      return {
        ...state,
        data: newData,
        total: action.childId ? state.total : state.total - 1,
        isProcessing: false,
      };
    }
    case _updateRooms(Action): {
      const newDataRoom = action?.newMessage?.dataRoom;
      if (!newDataRoom) {
        return state;
      }

      const stateData = state?.data || [];
      const {
        state: newDataRoomState,
        currentsession,
        _id: newDataRoomId,
      } = newDataRoom;
      const isCurrentUserInSession = currentsession?.userid === action.user_Id;
      const roomIndex = stateData.findIndex(room => room._id === newDataRoomId);
      const receivedState =
        stateData[0].currentsession?.userid !== action.user_Id &&
        stateData[0].state === 'assigned';

      // Kiểm tra trạng thái của phòng chat mới có giống với phòng chat hiện tại không
      if (newDataRoomState === stateData[0].state) {
        // Kiểm tra nếu phòng chat hiện tại đang ở trạng thái "assigned" và người dùng hiện tại không ở trong phiên và không nhận được trạng thái thì không làm gì cả
        if (
          stateData[0].state === 'assigned' &&
          !isCurrentUserInSession &&
          !receivedState
        ) {
        }
        // Kiểm tra nếu nhận được trạng thái mới và người dùng hiện tại đang trong phiên và phòng chat hiện tại đang ở trạng thái "assigned" thì không làm gì cả
        else if (
          receivedState &&
          isCurrentUserInSession &&
          stateData[0].state === 'assigned'
        ) {
        }
        // Nếu phòng chat đã tồn tại trong mảng stateData thì cập nhật phòng chat đó
        else {
          if (roomIndex !== -1) {
            let updatedRoom;
            // Nếu số tin nhắn chưa đọc của phòng chat đó đã có giá trị thì tăng giá trị đó lên 1, nếu chưa có thì đặt giá trị đó là 1
            if (stateData[roomIndex]._unread) {
              updatedRoom = {
                ...stateData[roomIndex],
                ...newDataRoom,
                _unread: stateData[roomIndex]._unread + 1,
                lastmessage: {
                  ...stateData[roomIndex].lastmessage,
                  text: action?.newMessage?.text,
                },
              };
            } else {
              updatedRoom = {
                ...stateData[roomIndex],
                ...newDataRoom,
                _unread: 1,
                lastmessage: {
                  ...stateData[roomIndex].lastmessage,
                  text: action?.newMessage?.text,
                },
              };
            }
            // Xóa phòng chat cũ trong mảng stateData và thêm phòng chat mới vào đầu mảng
            stateData.splice(roomIndex, 1);
            stateData.unshift(updatedRoom);
          }
          // Nếu phòng chat chưa tồn tại trong mảng stateData thì thêm phòng chat vào đầu mảng
          else {
            let updatedRoom;
            updatedRoom = {
              ...stateData[roomIndex],
              ...newDataRoom,
              _unread: 1,
              lastmessage: {
                ...newDataRoom.lastmessage,
                text: action?.newMessage?.text,
              },
            };
            stateData.unshift(updatedRoom);
            // Nếu mảng stateData có độ dài lớn hơn 25, xóa phần tử cuối cùng của mảng
            if (stateData.length > 25) {
              stateData.pop();
            }
          }
        }
      }

      return {
        ...state,
        data: stateData,
        isProcessing: false,
      };
    }
    case _deleteRoom(Action): {
      const stateData = state?.data || [];
      const checkIsReceived = stateData[0].state === 'received';

      const idToDelete = action.id;
      // console.log(state?.data);
      const newData = state?.data?.filter(item => item._id !== idToDelete);

      return {
        ...state,
        data: checkIsReceived ? stateData : newData,
        total: action.childId ? state.total : state.total - 1,
        isProcessing: false,
      };
    }
    default:
      return state;
  }
};

export const reducerPaginationMessage = (
  state = statePagination,
  action,
  Action,
) => {
  switch (action.type) {
    case Action:
      return {...state, isProcessing: true};
    case _onProcessing(Action): {
      return {...state, isProcessing: true};
    }
    case _onSuccess(Action): {
      //Check nếu muốn overwrite data đã tồn tại
      const data = action.shouldOverwriteExist
        ? action.data
        : [...state.data, ...action.data];
      return {
        data: data,
        totalPage: action.totalPage || 1,
        currentPage: action.currentPage,
        isProcessing: false,
        total: action.total,
        loaded: true,
      };
    }
    //Case thêm item lên vị trí đầu tiên của mảng
    case _onUnshift(Action): {
      const newData = [...action.data, ...state.data];
      return {
        data: newData,
        totalPage: action.totalPage || 1,
        currentPage: action.currentPage,
        isProcessing: false,
        total: state.total + 1,
      };
    }

    //Case update trạng thái của message
    case _onUpdateStatusMess(Action): {
      const {data} = action;
      const {type, error_text: error, class_forstatemessage} = data?.[0] ?? {};

      return {
        data: error
          ? [
              {
                ...state.data[0],
                ...action.data[0],
              },
              ...state.data.slice(1),
            ]
          : state.data.map(obj => {
              // if (error && obj._me === true && !obj.class_forstatemessage) {
              //   // Cập nhật mess lỗi
              //   return {...obj, class_forstatemessage, error_text: error};
              // } else
              if (
                !error &&
                obj._me !== false &&
                ((obj.class_forstatemessage !== 'omnichat-msg_error' &&
                  obj._me === true) ||
                  (obj.class_forstatemessage === 'omnichat-msg_error' &&
                    obj._me === false)) &&
                (type === 'seen' ||
                  (type === 'delivered' &&
                    (!obj.class_forstatemessage ||
                      obj.class_forstatemessage === 'omnichat-msg_delivered')))
              ) {
                // Cập nhật tất cả theo trạng thái đã truyền
                return {...obj, class_forstatemessage};
              } else {
                return obj;
              }
            }),
      };
    }

    //Case thêm array con vào 1 item
    case _onBindChildren(Action): {
      const children = action.data;
      return {
        ...state,
        data: state.data.map(item => {
          //Tìm item cha
          if (item[action.idName] === action.parentId) {
            //Check nếu muốn overwrite data đã tồn tại
            const newData = action.shouldOverwriteExist
              ? children
              : //Check nếu muốn thêm data lên đầu mảng con
              action.shouldUnshift
              ? [...children, ...(item[action.childrenArrayName] || [])]
              : [...(item[action.childrenArrayName] || []), ...children];
            return {
              ...item,
              [action.childrenArrayName]: newData,
              totalChildrenPage: action.totalPage,
              currentChildrenPage: action.currentPage,
              [action.childCounterName]: action.total,
            };
          }
          return item;
        }),
        isProcessing: false,
      };
    }
    //Case cập nhật 1 item trong mảng
    case _onReloadSingle(Action): {
      return {
        ...state,
        data: state.data.map(item => {
          //Tìm và cập nhật item con
          if (action.isChild && item[action.idName] === action.parentId) {
            return {
              ...item,
              [action.childrenArrayName]: item[action.childrenArrayName].map(
                child => {
                  if (child[action.idName] === action.childId) {
                    return {...child, ...action.data};
                  }
                  return child;
                },
              ),
            };
          }
          //Tìm và cập nhật item cha
          if (action.parentId && item[action.idName] === action.parentId) {
            return {...item, ...action.data};
          }
          return item;
        }),
        isProcessing: false,
      };
    }
    //Case xoá 1 item trong mảng
    case _onRemoveOne(Action): {
      //Check nếu là id của item con thì xoá item con, nếu không phải thì xoá item cha
      const newData = action.childId
        ? state.data.map(item => {
            if (item[action.idName] === action.parentId) {
              return {
                ...item,
                [action.childrenArrayName]: item[
                  action.childrenArrayName
                ].filter(item2 => item2[action.idName] !== action.childId),
                ...(action.childCounterName
                  ? {
                      [action.childCounterName]:
                        item[action.childCounterName] - 1,
                    }
                  : {}),
              };
            }
            return item;
          })
        : state.data.filter(item => item[action.idName] !== action.parentId);
      return {
        ...state,
        data: newData,
        total: action.childId ? state.total : state.total - 1,
        isProcessing: false,
      };
    }
    case _onFail(Action):
      return {
        //Check nếu muốn reset data về mặc định hoặc giữ nguyên
        ...(action.shouldReset ? statePagination : state),
        isProcessing: false,
        loaded: true,
      };
    case _onUnmount(Action):
      return statePagination;
    default:
      return state;
  }
};

export const reducerCounter = (state = stateDefault, action, Action) => {
  switch (action.type) {
    case Action: {
      return {
        data: 0,
      };
    }
    case _onSuccess(Action): {
      //Mỗi khi gọi action success, counter sẽ + 1
      return {
        data: state.data + 1,
      };
    }
    case _onUnmount(Action): {
      return {
        data: 0,
      };
    }
    default: {
      return state;
    }
  }
};

//Xử lí data linh hoạt
export const reducerDynamic = (state = stateDefault, action, Action) => {
  switch (action.type) {
    case Action: {
      return {...state, isProcessing: true};
    }
    case _onSuccess(Action): {
      //Trả về data cũ và ghi property mới với tên truyền từ action
      return {
        data: {...state.data, [action.alias]: action.data},
        isProcessing: false,
      };
    }
    case _onFail(Action): {
      return state;
    }
    case _onUnmount(Action): {
      return stateDefault;
    }
    default: {
      return state;
    }
  }
};
