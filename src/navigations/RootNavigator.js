import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
//import screen
import HomeScreen from "@screens/home/HomeScreen";
//hotspot
//hotspot authentication
import SignIn from "@screens/hotspot/hotspot_auth/SignIn";

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default RootNavigator;
