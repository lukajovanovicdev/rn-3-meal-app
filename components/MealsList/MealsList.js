import { View, FlatList, StyleSheet } from 'react-native';

import MealItem from './MealItem';

const MealsList = ({ items }) => {
  const renderMealItem = ({ item }) => {
    const mealItemProps = {
      id: item.id,
      title: item.title,
      imageUrl: item.imageUrl,
      affordability: item.affordability,
      complexity: item.complexity,
      duration: item.duration,
    };
    return <MealItem {...mealItemProps} />;
  };

  return (
    <View style={styles.container}>
      <FlatList data={items} keyExtractor={({ id }) => id} renderItem={renderMealItem} />
    </View>
  );
};

export default MealsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
