import { createStackNavigator } from "@react-navigation/stack";
//import component
import TopupHeader from "@components/TopupHeader";
//import color
import Colors from "@styles/Colors";

const Stack = createStackNavigator();
//import screen
import HomeScreen from "@screens/home/HomeScreen";
//hotspot
//hotspot authentication
import SignIn from "@screens/hotspot/hotspot_auth/SignIn";
//hotspot dashboard
import HotspotDashboard from "@screens/hotspot/HotspotDashboard";
//hotspot login to webview
import HotspotLogin from "@screens/hotspot/hotspot_auth/HotspotLogin";
//hotspot logout from webview
import HotspotLogout from "@screens/hotspot/hotspot_auth/HotspotLogout";
//data transfer
import Transfer from "@screens/hotspot/dataTransfer/Transfer";
//point list
import PointList from "@screens/hotspot/point/PointList";
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
//usage history
import Usage from "@screens/hotspot/usageHistory/Usage";
//topup history module
//topup history list
import TopupHistoryList from "@screens/hotspot/topupHistory/TopupHistoryList";
//history detail
import HistoryDetail from "@screens/hotspot/topupHistory/HistoryDetail";
//topup news list
import NewsList from "@screens/hotspot/news/NewsList";
//news detail
import NewsDetail from "@screens/hotspot/news/NewsDetail";
//point transaction module
import PointNavigator from "./PointNavigator";
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
        name="HotspotLogin"
        component={HotspotLogin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HotspotLogout"
        component={HotspotLogout}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Transfer"
        component={Transfer}
        options={{
          header: ({ navigation }) => (
            <TopupHeader
              backgroundColor={Colors.theme_color}
              headerText="Data Transfer"
              onPressBack={() => navigation.navigate("HotspotDashboard")}
              showSetting={false}
            />
          ),
        }}
      />
      <Stack.Screen
        name="PointList"
        component={PointList}
        options={{
          header: ({ navigation }) => (
            <TopupHeader
              backgroundColor={Colors.theme_color}
              headerText="Point"
              onPressBack={() => navigation.navigate("HotspotDashboard")}
              showSetting={false}
            />
          ),
        }}
      />
      <Stack.Screen
        name="PointNavigator"
        component={PointNavigator}
        options={{
          header: ({ navigation }) => (
            <TopupHeader
              backgroundColor={Colors.theme_color}
              headerText="Point Transaction"
              onPressBack={() => navigation.navigate("HotspotDashboard")}
              showSetting={false}
            />
          ),
        }}
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
      <Stack.Screen
        name="Usage"
        component={Usage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TopupHistoryList"
        component={TopupHistoryList}
        options={{
          header: ({ navigation }) => (
            <TopupHeader
              backgroundColor={Colors.theme_color}
              headerText="Topup History"
              onPressBack={() => navigation.navigate("HotspotDashboard")}
              showSetting={false}
            />
          ),
        }}
      />
      <Stack.Screen
        name="HistoryDetail"
        component={HistoryDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewsList"
        component={NewsList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewsDetail"
        component={NewsDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default RootNavigator;
