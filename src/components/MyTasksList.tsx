import React, { useEffect, useMemo } from 'react';
import { FlatList, TouchableOpacity, View, Text, StyleSheet, FlatListProps } from 'react-native';
import { dark, light } from '../utils/theme';
interface MyTasksListProps {
  tasks: {
    id: number;
    title: string;
    done: boolean;
  }[];
  onPress: (id: number) => void;
  onLongPress: (id: number) => void;
  theme: boolean;
}

type ColorLib = typeof dark;

export function MyTasksList({ tasks, onLongPress, onPress, theme }: MyTasksListProps) {
  useEffect(() => {}, [theme]);
  const styles = useMemo(() => getStyles(theme ? dark : light), [theme])

  function FlatListHeaderComponent() {
    return (
      <View>
        <Text style={styles.header}>Minhas tasks</Text>
      </View>
    )
  }

  
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      renderItem={({ item, index }) => {
        return (
          <TouchableOpacity
            style={item.done ? styles.taskButtonDone : styles.taskButton}
            testID={`button-${index}`}
            activeOpacity={0.7}
            onPress={() => onPress(item.id)}
            onLongPress={() => onLongPress(item.id)}
          >
            <View 
              style={item.done ? styles.taskMarkerDone : styles.taskMarker}
              testID={`marker-${index}`}
            />
            <Text 
              style={item.done ? styles.taskTextDone : styles.taskText}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        )
      }}
      ListHeaderComponent={<FlatListHeaderComponent />}
      ListHeaderComponentStyle={{
        marginBottom: 20
      }}
      style={{
        marginHorizontal: 24,
        marginTop: 32
      }}
    />
  )
}

const getStyles = (theme: ColorLib) => {
  return StyleSheet.create({
    header: {
      color: theme.flatListHeaderColor,
      fontSize: 24,
      fontFamily: 'Poppins-SemiBold'
    },
    taskButton: {
      flex: 1,
      paddingHorizontal: 10,
      paddingVertical: 12,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.taskMarker,
      marginRight: 10
    },
    taskText: {
      color: theme.taskText,
    },
    taskButtonDone: {
      flex: 1,
      paddingHorizontal: 10,
      paddingVertical: 12,
      marginBottom: 4,
      borderRadius: 4,
      backgroundColor: theme.taskButtonDone,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 8,
      backgroundColor: theme.taskMarkerDone,
      marginRight: 10
    },
    taskTextDone: {
      color: theme.taskTextDone,
      textDecorationLine: 'line-through'
    }
  })
};