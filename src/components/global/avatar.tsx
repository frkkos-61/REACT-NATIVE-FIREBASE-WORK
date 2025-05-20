import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {getInitial} from '../../utils/functions';

interface AvatarProps {
  name?: string;
  surname?: string;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({name, surname, size = 65}) => {
  return (
    <View style={[styles.container, {width: size, height: size}]}>
      <Text style={{fontSize: 25}}>{getInitial(name, surname)}</Text>
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D9E3F0',
    borderRadius: 100,
  },
});