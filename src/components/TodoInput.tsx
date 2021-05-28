import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Image, Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { dark, light } from '../utils/theme';

import checkIcon from '../assets/icons/Check.png';

interface TodoInputProps {
  addTask: (task: string) => void;
  theme: boolean;
}

type ColorLib = typeof dark;

export function TodoInput({ addTask, theme }: TodoInputProps) {
  useEffect(() => {}, [theme]);
  const styles = useMemo(() => getStyles(theme ? dark : light), [theme])

  const [task, setTask] = useState('');

  function handleAddNewTask() {
    //TODO - Call addTask and clean input value 
    if(!task) {
      Alert.alert("", "Preencha o campo com um valor válido");
      return;
    }

    addTask(task);
    setTask('');
  }

  return (
    <View style={[styles.inputContainer, Platform.OS === 'ios' ? styles.inputIOSShadow : styles.inputAndroidShadow]}>
      <TextInput 
        style={styles.input} 
        placeholder="Adicionar novo todo..."
        returnKeyType="send"
        value={task}
        onChangeText={text => setTask(text)}
        onSubmitEditing={handleAddNewTask}
      />
      <TouchableOpacity
        testID="add-new-task-button"
        activeOpacity={0.7}
        style={styles.addButton}
        onPress={handleAddNewTask}
      >
        <Image source={checkIcon} />
      </TouchableOpacity>
    </View>
  )
}

const getStyles = (theme: ColorLib) => {
  return StyleSheet.create({
    inputContainer: {
      backgroundColor: theme.inputBackgroundColor,
      borderRadius: 5,
      marginTop: -25,
      marginHorizontal: 40,
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      flex: 1,
      backgroundColor: theme.inputBackgroundColor,
      color: theme.inputTextColor,
      paddingLeft: 12,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
    },
    inputIOSShadow: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84
    },
    inputAndroidShadow: {
      elevation: 5
    },
    addButton: {
      backgroundColor: theme.inputButton,
      height: 50,
      paddingHorizontal: 16,
      justifyContent: 'center',
      alignItems: 'center',
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
    },
  })
};