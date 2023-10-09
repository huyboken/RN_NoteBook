import {
  View,
  Text,
  TouchableOpacity,
  SectionList,
  TextInput,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {NoteCard, ViewApp} from '../../../components';
import {t} from 'i18next';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './style';
import {Images} from '../../../constant';

const NOTES = [
  {
    category: 'daily routine',
    data: [
      {
        list: [
          {
            title: 'Shopping',
            type: ['image'],
            image: [Images.FOOD1],
            hashtag: '#daily routine',
          },
          {
            title: 'Books',
            type: ['list', 'image'],
            image: [Images.FOOD1],
            hashtag: '#daily routine',
          },
          {
            title: 'Films',
            type: ['location', 'list'],
            lock: true,
            hashtag: '#daily routine',
          },
          {
            title: 'Trip',
            lock: true,
            hashtag: '#daily routine',
          },
        ],
      },
    ],
  },
  {
    category: 'work',
    data: [
      {
        list: [
          {
            title: 'Tutorials',
            type: ['audio'],
            hashtag: '#work',
          },
          {
            title: 'Workshop',
            type: ['audio'],
            hashtag: '#work',
          },
        ],
      },
    ],
  },
];

const NoteScreen = () => {
  const searchRef = useRef(null);
  const [notes, setNotes] = useState(NOTES);
  const [search, setSearch] = useState({show: false, keyword: ''});

  const renderItem = ({item, index}) => <NoteCard item={item} index={index} />;

  function searchByTitle(keyword) {
    const filteredNotes = notes?.flatMap(category => {
      const filteredData = category?.data?.flatMap(item => {
        const filteredList = item?.list?.filter(entry =>
          entry?.title?.toLowerCase().includes(keyword.toLowerCase()),
        );

        if (filteredList?.length > 0) {
          return {
            list: filteredList,
          };
        } else {
          setNotes([]);
        }
      });

      if (filteredData?.length > 0) {
        return {
          category: category?.category,
          data: filteredData,
        };
      } else {
        return setNotes([]);
      }
    });

    return setNotes(filteredNotes);
  }

  useEffect(() => {
    search.keyword.trim().length > 0
      ? searchByTitle(search.keyword)
      : setNotes(NOTES);
  }, [search.keyword]);

  const renderSearch = () => {
    return (
      <View style={{flexDirection: 'row', padding: 10}}>
        <TouchableOpacity
          style={styles.iconSearchBack}
          onPress={() => setSearch({...search, show: false, keyword: ''})}>
          <Ionicons style={styles.arrowIcon} name="arrow-back" />
        </TouchableOpacity>
        <TextInput
          ref={searchRef}
          placeholder={t('search')}
          onChangeText={text => setSearch({...search, keyword: text})}
          autoFocus
          placeholderTextColor={'grey'}
          value={search.keyword}
          style={styles.search}
        />
        {search.keyword.trim().length > 0 && (
          <TouchableOpacity
            style={styles.iconSearchClear}
            onPress={() => setSearch({...search, keyword: ''})}>
            <Ionicons style={styles.closeIcon} name="close-circle" />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <ViewApp.Container>
      {search.show ? (
        renderSearch()
      ) : (
        <ViewApp.Toolbar
          showBackIcon={false}
          title={t('notes')}
          iconRight={() => (
            <TouchableOpacity
              onPress={() => setSearch({...search, show: true})}
              style={styles.toolbarActionRight}>
              <Fontisto style={styles.toolbarActionRightIcon} name="search" />
            </TouchableOpacity>
          )}
        />
      )}
      <SectionList
        sections={notes}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={({section: {category, data}}) => (
          <>
            {data?.[0] && (
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>{category}</Text>
              </View>
            )}
          </>
        )}
      />
      <ViewApp.FABAdd onPress={() => {}} />
    </ViewApp.Container>
  );
};

export default NoteScreen;
