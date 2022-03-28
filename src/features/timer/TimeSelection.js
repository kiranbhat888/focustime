import React, { useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { ProgressBar, Colors } from 'react-native-paper';

import { RoundedButton } from '../../components/RoundedButton';
import { spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';
import { CountDown } from '../../components/CountDown';

export const TimeSelection = ({ changeTime }) => {
  return (
    <View style={styles.timieButtons}>
      <RoundedButton
        style={{ margin: spacing.md }}
        title="10"
        size={70}
        onPress={() => {changeTime(10)}}
      />
      <RoundedButton
        style={{ margin: spacing.md }}
        title="15"
        size={70}
        onPress={() => {changeTime(15)}}
      />
      <RoundedButton
        style={{ margin: spacing.md }}
        title="20"
        size={70}
        onPress={() => {changeTime(20)}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  timieButtons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
