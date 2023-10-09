import XML from './XML';
import {t} from 'i18next';
const WELCOME_CONTENTS = [
  {
    image: XML.notesImg,
    title: t('notes'),
    content: t('contentNotesOnBoard'),
  },
  {
    image: XML.remindersImg,
    title: t('reminders'),
    content: t('contentReminderOnBoard'),
  },
  {
    image: XML.passwordImg,
    title: t('passwordKeeper'),
    content: t('contentPassOnBoard'),
  },
];

export default {WELCOME_CONTENTS};
