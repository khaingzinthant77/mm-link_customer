import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();
import UnSolvedList from "@screens/fiber/ticket/unSolved/UnSolvedList";
import SolvedList from "@screens/fiber/ticket/solved/SolvedList";
import { useRoute } from "@react-navigation/native";
function TicketNavigator() {
  const route = useRoute();
  const { solvedTickets, unSolveTickets } = route.params;
  // console.log("unsolve", unSolveTickets);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { textTransform: "none" },
      }}
    >
      <Tab.Screen
        name="UnSolvedList"
        component={UnSolvedList}
        initialParams={{ initialParam: unSolveTickets }}
      />
      <Tab.Screen
        name="SolvedList"
        component={SolvedList}
        initialParams={{ initialParam: solvedTickets }}
      />
    </Tab.Navigator>
  );
}

export default TicketNavigator;
