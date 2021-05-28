import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { Header } from '../components/Header';
import { MyTasksList } from '../components/MyTasksList';
import { TodoInput } from '../components/TodoInput';
import { dark, light } from '../utils/theme';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [theme, setTheme] = useState(false);
  
  function handleChangeTheme() {
    setTheme(!theme);
  }

  useEffect(() => {}, [theme]);
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //add new task if it's not empty
    setTasks(oldState => [...oldState, {
      id: oldState.length + 1,
      title: newTaskTitle,
      done: false
    }]);
  }

  function handleMarkTaskAsDone(id: number) {
    //mark task as done if exists
    setTasks(oldState => oldState.map(item => {
      if(item.id === id) {
        item.done = !item.done;
      }

      return item;
    }));
  }

  function handleRemoveTask(id: number) {
    //remove task from state
    setTasks(oldState => oldState.filter(item => item.id !== id));
  }

  return (
    <View style={{flex: 1,backgroundColor: theme ? dark.containerBg : light.containerBg}}>
      <Header theme={theme} handleTheme={handleChangeTheme} />

      <TodoInput
        addTask={handleAddTask}
        theme={theme}
      />

      <MyTasksList
        tasks={tasks}
        theme={theme}
        onPress={handleMarkTaskAsDone}
        onLongPress={handleRemoveTask}
      />
    </View>
  )
}