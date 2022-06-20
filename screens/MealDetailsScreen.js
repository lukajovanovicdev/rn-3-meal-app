import { useLayoutEffect } from 'react';
import { Image, Text, View, ScrollView, StyleSheet } from 'react-native';
import IconButton from '../components/IconButton';
import List from '../components/MealDetail/List';
import Subtitle from '../components/MealDetail/Subtitle';
import MealDetails from '../components/MealDetails';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../store/redux/favorites';

import { MEALS } from '../data/dummy-data';
// import { FavoritesContext } from '../store/context/favoritesContext';

const MealDetailsScreen = ({ route, navigation }) => {
  // const favoriteMealCtx = useContext(FavoritesContext);
  const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);
  const dispatch = useDispatch();

  const mealId = route.params.mealId;

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  const mealIsFavorite = favoriteMealIds.includes(mealId);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          color="white"
          icon={mealIsFavorite ? 'star' : 'star-outline'}
          onPress={changeFavoriteStatusHandler}
        />
      ),
    });
  }, [navigation, changeFavoriteStatusHandler, mealIsFavorite]);

  const changeFavoriteStatusHandler = () => {
    if (mealIsFavorite) {
      // favoriteMealCtx.removeFavorite(mealId);
      dispatch(removeFavorite({ id: mealId }));
    } else {
      // favoriteMealCtx.addFavorite(mealId);
      dispatch(addFavorite({ id: mealId }));
    }
  };

  return (
    <ScrollView style={styles.rootContainer}>
      {/* Image must have a height in order to be displayed */}
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
};
export default MealDetailsScreen;

const styles = StyleSheet.create({
  rootContainer: { marginBottom: 32 },
  image: { width: '100%', height: 350 },
  title: { fontWeight: 'bold', fontSize: 24, margin: 8, textAlign: 'center', color: 'white' },
  detailText: { color: 'white' },
  listContainer: {
    width: '80%',
  },
  listOuterContainer: {
    alignItems: 'center',
  },
});
