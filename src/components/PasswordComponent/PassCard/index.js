import React from 'react';
import ViewApp from '../../ViewApp';
import {t} from 'i18next';

const PassCard = ({item, index, onDelete = () => {}, onUpdate = () => {}, prevOpenedRowRef}) => {
  return (
    <ViewApp.Swipeable index={index} prevOpenedRowRef={prevOpenedRowRef} onDelete={() => onDelete(item.id)} onUpdate={() => onUpdate(item)}>
      <ViewApp.Panel title={item.name}>
        <ViewApp.InputField styleInput={{backgroundColor: '#E5FBFE'}} value={item.login} placeholder={t('login')} editable={false} />
        <ViewApp.InputField styleInput={{backgroundColor: '#E5FBFE'}} value={item.password} placeholder={t('password')} editable={false} />
        <ViewApp.InputField styleInput={{backgroundColor: '#E5FBFE', color: '#00A1BB'}} value={item?.link} placeholder={t('link')} editable={false} />
      </ViewApp.Panel>
    </ViewApp.Swipeable>
  );
};

export default PassCard;
