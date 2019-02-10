import Reactotron, { asyncStorage, trackGlobalErrors }  from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'

// First, set some configuration settings on how to connect to the app
Reactotron.configure({
  name: "Humantiv",
  // host: '10.0.1.1',
   port: 9090
})

// add every built-in react native feature.  you also have the ability to pass
// an object as a parameter to configure each individual react-native plugin
// if you'd like.
Reactotron.useReactNative({
  //asyncStorage: { ignore: ['secret'] }
  asyncStorage: false, // there are more options to the async storage.
    networking: { // optionally, you can turn it off with false.
      ignoreUrls: /symbolicate/
    },
    editor: false, // there are more options to editor
    errors: { veto: (stackFrame) => false }, // or turn it off with false
    overlay: false, // just turning off overlay
})

// add some more plugins for redux & redux-saga
Reactotron.use(reactotronRedux())
Reactotron.use(asyncStorage())
Reactotron.use(trackGlobalErrors())

// if we're running in DEV mode, then let's connect!
if (__DEV__) {
  Reactotron.connect()
  Reactotron.clear()
}

Reactotron.onCustomCommand('test', () => console.tron.log('Reactotron Load!'))

export default Reactotron;