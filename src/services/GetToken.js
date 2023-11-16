import * as Notifications from "expo-notifications";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
export const GetToken = async () => {
  let token;
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  // alert(existingStatus);
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync({
      allowSystemDialog: true,
    });
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    // alert("Failed to get push token for push notification!");
    return;
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;
  // this.setState({ expoPushToken: token });
  return token;
};
