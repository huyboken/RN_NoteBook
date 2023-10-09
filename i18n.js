import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

const resources = {
  en: {
    translation: {
      subTitleSplash: 'Innote and organize ideas effectively.',
      notes: 'Notes',
      reminders: 'Reminders',
      passwordKeeper: 'Password keeper',
      contentNotesOnBoard:
        'Take notes and store ideas, study notes, to-do lists, and various other content easily. Create, organize, and quickly search your notes conveniently.',
      contentReminderOnBoard:
        'Set reminders to not miss any important events or appointments. Create and manage daily, weekly, or individual reminders. Let the app help you remember all the important things in life.',
      contentPassOnBoard:
        'Safely store and manage your passwords with ease. The NoteBook app provides secure password storage, organization, and convenient automatic filling.',
      skip: 'Skip',
      start: 'Start',
      reminder: 'Reminder',
      todoList: 'To-do-lists',
      home: 'Home',
      calendar: 'Calendar',
      password: 'Password',
      passwords: 'Passwords',
      search: 'Search',
      createYourPass: 'Create your password',
      createYourPassSub:
        'Please create new password to protect you data in future',
      repeatNewPass: 'Repeat new password',
      repeatNewPassSub: 'Please repeat new password',
    },
  },
  vi: {
    translation: {
      subTitleSplash: 'Ghi chú và sắp xếp ý tưởng một cách hiệu quả.',
      notes: 'Ghi chú',
      reminders: 'Lời nhắc',
      passwordKeeper: 'Bảo mật mật khẩu',
      contentNotesOnBoard:
        'Ghi chú và lưu trữ ý tưởng, ghi chú học tập, danh sách công việc và nhiều nội dung khác một cách dễ dàng. Tạo, sắp xếp và tìm kiếm các ghi chú của bạn một cách thuận tiện và nhanh chóng.',
      contentReminderOnBoard:
        'Đặt nhắc nhở để không bỏ lỡ bất kỳ sự kiện, cuộc hẹn quan trọng nào. Tạo và quản lý các nhắc nhở hàng ngày, hàng tuần hoặc nhắc nhở đơn lẻ. Hãy để ứng dụng giúp bạn nhớ tất cả những điều quan trọng trong cuộc sống.',
      contentPassOnBoard:
        '"Lưu trữ và quản lý mật khẩu của bạn một cách an toàn và dễ dàng. Ứng dụng NoteBook cung cấp việc lưu trữ mật khẩu an toàn, tổ chức và điền tự động tiện lợi.',
      skip: 'Bỏ qua',
      start: 'Bắt đầu',
      reminder: 'Lời nhắc',
      todoList: 'Danh sách việc cần làm',
      home: 'Trang chủ',
      calendar: 'Lịch',
      password: 'Mật khẩu',
      passwords: 'Mật khẩu',
      search: 'Tìm kiếm',
      createYourPass: 'Tạo mật khẩu của bạn',
      createYourPassSub:
        'Vui lòng tạo mật khẩu mới để bảo vệ dữ liệu của bạn trong tương lai',
      repeatNewPass: 'Nhập lại mật khẩu mới',
      repeatNewPassSub: 'Vui lòng nhập lại mật khẩu mới',
    },
  },
};

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: callback => {
    const {languageCode} = RNLocalize.getLocales()[0];
    callback(languageCode);
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'vi', // Ngôn ngữ mặc định nếu không tìm thấy ngôn ngữ hệ thống
    interpolation: {
      escapeValue: false,
    },
    compatibilityJSON: 'v3',
  });

export default i18next;
