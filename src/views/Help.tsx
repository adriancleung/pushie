import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {CodeBlock, Menlo} from '../components';

type Props = {
  navigation: any;
};

const Help: React.FC<Props> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerThirds}>
          <Icon
            name={'chevron-left'}
            size={30}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.headerThirds}>
          <Text style={styles.headerTitle}>How to Use</Text>
        </View>
        <View style={styles.headerThirds} />
      </View>
      <Text style={styles.howToText}>
        1. Create a <Menlo style={styles.menloText}>POST</Menlo> request to{' '}
        <Menlo style={styles.menloText}>
          https://api.adrianleung.dev/notify
        </Menlo>{' '}
        and set the header <Menlo style={styles.menloText}>x-api-key</Menlo> to
        you API key.
        {'\n\n'}2. In the JSON body, include a{' '}
        <Menlo style={styles.menloText}>title</Menlo> and a{' '}
        <Menlo style={styles.menloText}>shortDescription</Menlo>. A{' '}
        <Menlo style={styles.menloText}>description</Menlo> and a{' '}
        <Menlo style={styles.menloText}>label</Menlo> are both optional.
      </Text>
      <Text>Example CURL request:</Text>
      <CodeBlock>
        {`curl -X POST https://api.adrianleung.dev/notify \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: INSERT_API_KEY" \\
  -d @- <<'EOF'
  {
    "title":"Hello World!",
    "shortDescription":"Short and sweet",
    "description":"Something more descriptive",
    "label":"test"
  }
  EOF`}
      </CodeBlock>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerThirds: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  howToText: {
    paddingVertical: 25,
    fontSize: 16,
    padding: 10,
    textAlign: 'justify',
  },
  menloText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Help;
