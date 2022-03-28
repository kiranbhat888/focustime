import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';
import { spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';

export const Focus = ({ setFocusSubject }) => {
  const [subject, setSubject] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>What would you like to focus on .. ? </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ flex: 1, marginRight: spacing.md }}
            onChangeText={(text) => {
              setSubject(text);
            }}></TextInput>
          <RoundedButton
            title="+"
            size={75}
            onPress={() => setFocusSubject(subject)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5
  },
  innerContainer: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'center',
    // textAlign:"center"
  },
  title: {
    paddingTop:spacing.lg,
    color: colors.white,
    fontWeight: 'bold',
    fontSize: spacing.lg,
  },
  inputContainer: {
    paddingTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
