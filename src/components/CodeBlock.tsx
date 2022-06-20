import React from 'react';
import {StyleSheet, Text, ScrollView, View} from 'react-native';

type Props = {
  children: React.ReactChild;
};

const CodeBlock: React.FC<Props> = ({children}) => {
  return (
    <View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        <Text style={styles.codeText}>{children}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EDEDED',
    borderRadius: 5,
  },
  contentContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  codeText: {
    color: 'black',
    fontFamily: 'Menlo',
  },
});

export default CodeBlock;
