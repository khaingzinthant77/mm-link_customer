import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
//import screen
import HomeScreen from "@screens/home/HomeScreen";
//hotspot
//hotspot authentication
import SignIn from "@screens/hotspot/hotspot_auth/SignIn";
//hotspot dashboard
import HotspotDashboard from "@screens/hotspot/HotspotDashboard";
//agent
//agent available township
import AvailableTownship from "@screens/hotspot/agent/AvailableTownship";
//agent list by township
import AgentListByTownship from "@screens/hotspot/agent/AgentListByTownship";
//nearly agent
import NearlyAgent from "@screens/hotspot/agent/NearlyAgent";
//agent map
import AgentMap from "@screens/hotspot/agent/AgentMap";
//agent detail
import AgentDetail from "@screens/hotspot/agent/AgentDetail";
//package module
//buy package
import BuyPackage from "@screens/hotspot/package/BuyPackage";
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
      <Stack.Screen
        name="HotspotDashboard"
        component={HotspotDashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AvailableTownship"
        component={AvailableTownship}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AgentListByTownship"
        component={AgentListByTownship}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NearlyAgent"
        component={NearlyAgent}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AgentMap"
        component={AgentMap}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AgentDetail"
        component={AgentDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BuyPackage"
        component={BuyPackage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default RootNavigator;
