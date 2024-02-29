import { createStackNavigator } from "@react-navigation/stack";
//import component
import TopupHeader from "@components/TopupHeader";
import FiberHeader from "@components/FiberHeader";
//import color
import Colors from "@styles/Colors";

const Stack = createStackNavigator();
//import screen
import HomeScreen from "@screens/home/HomeScreen";
// ----------- Hotspot Module Start ---------------------
//hotspot authentication
import SignIn from "@screens/hotspot/hotspot_auth/SignIn";
//hotspot forget
import Forget from "@screens/hotspot/hotspot_auth/Forget";
//hotspot otp screen
import HotspotOTP from "@screens/hotspot/hotspot_auth/HotspotOTP";
//hotspot register
import SignUp from "@screens/hotspot/hotspot_auth/SignUp";
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
//hotspot setting
import HotspotSetting from "@screens/hotspot/setting/HotspotSetting";
//hotspot profile
import Profile from "@screens/hotspot/setting/Profile";
//hotspot contact
import HotspotContact from "@screens/hotspot/setting/HotspotContact";
//change password
import ChangePassword from "@screens/hotspot/setting/ChangePassword";
// ----------- Hotspot Module End ---------------------

// ----------- Fiber Module Start ---------------------
import Login from "@screens/fiber/auth/Login";
//otp
import OTP from "@screens/fiber/auth/OTP";
//fiber dashboard
import FiberDashboard from "@screens/fiber/FiberDashboard";
//material list
import MaterialList from "@screens/fiber/material/MaterialList";
//plan up down
import PlanUpDown from "@screens/fiber/internetPlan/PlanUpDown";
//online payment
import BankAccountList from "@screens/fiber/bankAccount/BankAccountList";
//noti list
import NotiList from "@screens/fiber/noti/NotiList";
import NotiDetail from "@screens/fiber/noti/NotiDetail";
//live chat
import LiveChat from "@screens/chat/LiveChat";
//aggrement
import AggrementScreen from "@screens/fiber/aggrement/AggrementScreen";
//speed test
import SpeedTestScreen from "@screens/fiber/speedTest/SpeedTestScreen";
//import payment
import PaymentNavigator from "./PaymentNavigator";
//paid detail
import PaidDetail from "@screens/fiber/payment/paid/PaidDetail";
//unpaid detail
import UnPaidDetail from "@screens/fiber/payment/unPaid/UnPaidDetail";
//payslip
import PaySlip from "@screens/fiber/payment/paid/PaySlip";
//ticket navigator
import TicketNavigator from "./TicketNavigator";
//solve list
import SolvedList from "@screens/fiber/ticket/solved/SolvedList";
//unsolve list
import UnSolvedList from "@screens/fiber/ticket/unSolved/UnSolvedList";
//solve detail
import SolvedDetail from "@screens/fiber/ticket/solved/SolvedDetail";
//unsolve detail
import UnSolvedDetail from "@screens/fiber/ticket/unSolved/UnSolvedDetail";
//create ticket
import CreateTicket from "@screens/fiber/ticket/CreateTicket";
//setting
import FiberSetting from "@screens/fiber/setting/FiberSetting";
//fiberprofile
import FiberProfile from "@screens/fiber/setting/Profile";
//fiber contact
import Contact from "@screens/fiber/setting/Contact";
//rating
import Rating from "@screens/fiber/setting/Rating";
//reward list
import RewardList from "@screens/fiber/bonusReward/RewardList";
//reward detail
import RewardDetail from "@screens/fiber/bonusReward/RewardDetail";
//reward history list
import HistoryList from "@screens/fiber/bonusHistory/HistoryList";
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
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Forget"
        component={Forget}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HotspotOTP"
        component={HotspotOTP}
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
      <Stack.Screen
        name="HotspotSetting"
        component={HotspotSetting}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HotspotContact"
        component={HotspotContact}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ headerShown: false }}
      />
      {/* hotspot module end */}
      {/* fiber module start */}
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OTP"
        component={OTP}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FiberDashboard"
        component={FiberDashboard}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MaterialList"
        component={MaterialList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PlanUpDown"
        component={PlanUpDown}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BankAccountList"
        component={BankAccountList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NotiList"
        component={NotiList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NotiDetail"
        component={NotiDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LiveChat"
        component={LiveChat}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AggrementScreen"
        component={AggrementScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SpeedTestScreen"
        component={SpeedTestScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PaymentNavigator"
        component={PaymentNavigator}
        options={{
          header: ({ navigation }) => (
            <FiberHeader
              backgroundColor="#337ab7"
              headerText="Payment History"
              routeName="Dashboard"
              navigation={navigation}
              onPress={() => this.props.navigation.goBack(null)}
            />
          ),
        }}
      />
      <Stack.Screen
        name="PaidDetail"
        component={PaidDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UnPaidDetail"
        component={UnPaidDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PaySlip"
        component={PaySlip}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TicketNavigator"
        component={TicketNavigator}
        options={{
          header: ({ navigation }) => (
            <FiberHeader
              backgroundColor="#337ab7"
              headerText="Ticket"
              routeName="Dashboard"
              navigation={navigation}
              onPress={() => this.props.navigation.goBack(null)}
            />
          ),
        }}
      />
      <Stack.Screen
        name="SolvedList"
        component={SolvedList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UnSolvedList"
        component={UnSolvedList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SolvedDetail"
        component={SolvedDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UnSolvedDetail"
        component={UnSolvedDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateTicket"
        component={CreateTicket}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FiberSetting"
        component={FiberSetting}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FiberProfile"
        component={FiberProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Contact"
        component={Contact}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Rating"
        component={Rating}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RewardList"
        component={RewardList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RewardDetail"
        component={RewardDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HistoryList"
        component={HistoryList}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default RootNavigator;
