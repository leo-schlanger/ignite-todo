import React, { useEffect, useMemo } from 'react';
import { View, Text, StatusBar, StyleSheet, Switch } from 'react-native';
import { dark, light } from '../utils/theme';
interface HeaderProps {
  handleTheme: () => void;
  theme: boolean;
}

type ColorLib = typeof dark;

export function Header({ handleTheme, theme }: HeaderProps) {
  useEffect(() => {}, [theme]);
  const styles = useMemo(() => getStyles(theme ? dark : light), [theme])

  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>to.</Text>
      <Text style={[styles.headerText, { fontFamily: 'Poppins-SemiBold' }]}>do</Text>
      <Switch
        style={{marginLeft: 32}}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={theme ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={handleTheme}
        value={theme}
      />
    </View>
  )
}

const getStyles = (theme: ColorLib) => {
  return StyleSheet.create({
    header: {
      paddingTop: StatusBar.currentHeight,
      paddingBottom: 44,
      backgroundColor: theme.headerBg,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row'
    },
    headerText: {
      fontSize: 24,
      color: theme.headerColor,
      fontFamily: 'Poppins-Regular',
    }
  })
};