import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput, ProgressBar, Colors } from 'react-native-paper';

import { spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

const minTomills = (mins) => mins * 1000 * 60;

const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const CountDown = ({ minutes, isPaused, updateProgress, onEnd }) => {
  const [mills, setMills] = useState(minTomills(minutes));
  const interval = useRef(null);

  const mins = Math.floor(mills / 1000 / 60) % 60;
  const secs = Math.floor(mills / 1000) % 60;

  const countDown = () => {
    setMills((time) => {
      if (time == 0) {
        clearInterval(interval.current);
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  useEffect(() => {
    setMills(minTomills(minutes));
  }, [minutes]);

  useEffect(() => {
    updateProgress(mills / minTomills(minutes));
    if (mills == 0) onEnd();    
  }, [mills]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);

  return (
    <View>
      <Text style={styles.text}>
        {' '}
        {formatTime(mins)}:{formatTime(secs)}{' '}
      </Text>
      <ProgressBar
        progress={mills / minTomills(minutes)}
        color={Colors.red800}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: spacing.xxxxl,
    color: colors.white,
    backgroundColor: 'rgba(94,132,226,0.5)',
    fontWeight: 'bold',
  },
});
