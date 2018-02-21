import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';

const ImageButton = ({source, style, onPress}) => {
  return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={onPress} 
        >
          <Image 
            source={source} 
            style={[style, style]}
            />
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {ImageButton};