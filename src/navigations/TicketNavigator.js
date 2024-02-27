import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();
import UnSolvedList from "@screens/fiber/ticket/unSolved/UnSolvedList";
import SolvedList from "@screens/fiber/ticket/solved/SolvedList";
function TicketNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { textTransform: "none" },
      }}
    >
      <Tab.Screen name="UnSolvedList" component={UnSolvedList} />
      <Tab.Screen name="SolvedList" component={SolvedList} />
    </Tab.Navigator>
  );
}

export default TicketNavigator;
