import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView } from 'react-native';

import { RoundedButton } from '../../components/RoundedButton';
import { spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';

export const FocusHistory = ({ focusHistory, onClear }) => {
  const renderItem = ({ item, index }) => (
    <Text style={styles(item.status).historyItem}>{item.subject} </Text>
  );

  return (
    <SafeAreaView style={{ flex: 0.9, alignItems: 'center', paddingBottom: 10 }}>
      <Text style={styles('').title}>Focus History :</Text>
      {focusHistory.length ? (
        <>
          <FlatList
            style={{ flex: 1 }}
            data={focusHistory}
            renderItem={renderItem}
            keyExtractor={(item) => item.key}
          />
          <View style={styles('').clear}>
            <RoundedButton size={50} title="Clear" onPress={() => onClear()} />
          </View>
        </>
      ) : null}
    </SafeAreaView>
  );
};

const styles = (status) =>
  StyleSheet.create({
    historyItem: {
      color: status == 2 ? 'red' : 'green',
      fontSize: spacing.md,
    },
    title: {
      fontWeight: 'bold',
      color: colors.white,
      fontSize: spacing.md,
    },
    clear: { padding: spacing.md, alignItems: 'center' },
  });
