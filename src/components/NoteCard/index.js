import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Fonts, XML} from '../../constant';
import {SvgXml} from 'react-native-svg';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Display} from '../../utils';

const NoteCard = ({item, index}) => {
  const numColumns = Math.floor(Display.setWidth(100) / 155);

  const renderItem = ({item}) => {
    const renderType = () => {
      return (
        <View style={{flexDirection: 'row'}}>
          {item?.type?.map((item, index) => {
            const checkType = () => {
              if (item === 'location') return XML.locationPrev;
              if (item === 'audio') return XML.audioPrev;
              if (item === 'list') return XML.listPrev;
              return null;
            };
            return (
              <SvgXml
                key={index}
                xml={checkType()}
                width={40}
                height={40}
                style={{marginRight: 5}}
              />
            );
          })}
        </View>
      );
    };
    const renderImage = () => {
      return (
        <>
          {item.image &&
            item.image.map((url, index) => (
              <Image
                key={index}
                style={{width: 40, height: 40, marginRight: 5}}
                source={url}
                resizeMode="cover"
              />
            ))}
        </>
      );
    };
    return (
      <View style={styles.cotainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {item?.title}
          </Text>
          {item?.lock && (
            <FontAwesome name="lock" fontSize="10" color={'grey'} />
          )}
        </View>
        <View style={{flexDirection: 'row'}}>
          {renderType()}
          {renderImage()}
        </View>
        <View style={{flex: 1}} />
        <Text style={styles.hashtag} numberOfLines={1}>
          {item?.hashtag}
        </Text>
      </View>
    );
  };

  return (
    <FlatList
      keyExtractor={(item, index) => item.id || index}
      data={item?.list}
      numColumns={numColumns}
      renderItem={renderItem}
      style={{marginBottom: 20}}
    />
  );
};

export default NoteCard;

const styles = StyleSheet.create({
  cotainer: {
    // flex: 1,
    width: 155,
    height: 180,
    marginVertical: 10,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 16,
    borderRadius: 20,
    backgroundColor: 'white',
    shadowColor: 'lightgrey',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 2,
    shadowRadius: 4,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.POPPINS_MEDIUM,
    color: 'black',
  },
  hashtag: {
    fontSize: 10,
    fontFamily: Fonts.POPPINS_MEDIUM,
    color: '#00D3ED',
    textAlign: 'right',
  },
});
