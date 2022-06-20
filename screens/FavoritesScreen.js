import { View, Text, StyleSheet } from 'react-native';
// import { useContext } from 'react';
import MealsList from '../components/MealsList/MealsList';
import { MEALS } from '../data/dummy-data';
import { useSelector } from 'react-redux';
// import { FavoritesContext } from '../store/context/favoritesContext';

const FavoritesScreen = () => {
  // const favoriteMealsCtx = useContext(FavoritesContext);
  const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);
  const favoriteMeals = MEALS.filter((meal) => favoriteMealIds.includes(meal.id));

  if (favoriteMeals.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>You have no favorite meals.</Text>
      </View>
    );
  }

  return <MealsList items={favoriteMeals} />;
};
export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
