import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Platform,
  Vibration,
} from 'react-native';
import { ProgressBar, Colors } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import { RoundedButton } from '../../components/RoundedButton';
import { spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';
import { CountDown } from '../../components/CountDown';
import { TimeSelection } from './TimeSelection';

const DEFAULT_TIME = 0.1;

export const Timer = ({ focusSubject, onTimerEnd , cancelTimer}) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(DEFAULT_TIME);

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };

  const onEnd = () => {
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    if (Platform.OS == 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else Vibration.vibrate([1000, 1000, 1000, 1000]);
    onTimerEnd();
  };

  return (
    <View style={styles.container}>
      <View style={styles.countDown}>
        <CountDown
          minutes={minutes}
          isPaused={!isStarted}
          updateProgress={setProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={{ paddingTop: spacing.lg }}>
        <Text style={styles.title}>Focus on : </Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <ProgressBar
        style={{ height: 10, marginTop: spacing.lg, margin: spacing.sm }}
        progress={progress}
        color="#5e84e2"
      />
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TimeSelection changeTime={changeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton
            title="Pause"
            size={100}
            onPress={() => setIsStarted(false)}
          />
        ) : (
          <RoundedButton
            title="Start"
            size={100}
            onPress={() => setIsStarted(true)}
          />
        )}
      </View>
      <View style={styles.clearTimer}>
        <RoundedButton title="---" size={50} onPress={() => cancelTimer()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  countDown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.2,
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearTimer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
  },
});
