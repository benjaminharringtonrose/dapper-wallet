import "./shim";
import "react-native-gesture-handler";
/* dapp-begin */
const { Platform, LogBox } = require("react-native");

if (Platform.OS !== "web") {
  require("react-native-get-random-values");
  LogBox.ignoreLogs([
    "Warning: The provided value 'ms-stream' is not a valid 'responseType'.",
    "Warning: The provided value 'moz-chunked-arraybuffer' is not a valid 'responseType'.",
  ]);
}

if (typeof Buffer === "undefined") {
  global.Buffer = require("buffer").Buffer;
}

global.btoa = global.btoa || require("base-64").encode;
global.atob = global.atob || require("base-64").decode;

process.version = "v9.40";

const { registerRootComponent, scheme } = require("expo");
const { default: App } = require("./App");

const { default: AsyncStorage } = require("@react-native-async-storage/async-storage");
const { withWalletConnect } = require("@walletconnect/react-native-dapp");

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately

console.log(scheme);

registerRootComponent(
  withWalletConnect(App, {
    redirectUrl: `dapper://`,
    storageOptions: { asyncStorage: AsyncStorage },
    bridge: "https://bridge.walletconnect.org",
  })
);
/* dapp-end */
