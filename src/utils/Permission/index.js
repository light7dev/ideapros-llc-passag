import { Platform, Alert, Linking } from "react-native"
import { PERMISSIONS } from "react-native-permissions"
import { checkMultiplePermissions } from "./permissions"

// Requesting for the Microphone permission
export const checkForPermissions = async () => {
  const permissions =
    Platform.OS === "ios"
      ? [
          PERMISSIONS.IOS.CAMERA,
          PERMISSIONS.IOS.MICROPHONE,
          PERMISSIONS.IOS.PHOTO_LIBRARY
        ]
      : [
          PERMISSIONS.ANDROID.CAMERA,
          PERMISSIONS.ANDROID.RECORD_AUDIO,
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
        ]

  // Call our permission service and check for permissions
  const isPermissionGranted = await checkMultiplePermissions(permissions)
  if (!isPermissionGranted) {
    // Show an alert in case permission was not granted
    Alert.alert(
      "Permission Request",
      "Please allow permission to access the Microphone.",
      [
        {
          text: "Go to Settings",
          onPress: () => {
            Linking.openSettings()
          }
        },
        {
          text: "Cancel",
          style: "cancel"
        }
      ],
      { cancelable: false }
    )
  }
  return isPermissionGranted
}
