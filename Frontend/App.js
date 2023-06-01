import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { Video, ResizeMode } from 'expo-av';

export default function App() {

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);

  const [xCounter, setXCounter] = useState(0);
  const [xMove, setXMove] = useState(false);

  const _slow = () => Accelerometer.setUpdateInterval(500);
  const _fast = () => Accelerometer.setUpdateInterval(16);

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener(setData)
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    updateMovement();
    return () => _unsubscribe();
  }, [x]);

  const updateMovement = () => {
    if (x >= 1) {
      setXMove(true);
    }
    if (xMove === true && (x <= -1)) {
      setXCounter(xCounter + 1);
      setXMove(false);
      console.log("X count - ", xCounter);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Accelerometer: (in gs where 1g = 9.81 m/s^2)</Text>
      <Text style={styles.text}>X movement : {xCounter}</Text>
      {/* <Text style={styles.text}>x: {x}</Text>{console.log("x - ",x)} */}
      {/* <Text style={styles.text}>y: {y}</Text>{console.log("y - ",y)} */}
      {/* <Text style={styles.text}>z: {z}</Text>{console.log("z - ",z)} */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
          <Text>{subscription ? 'On' : 'Off'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_slow} style={[styles.button, styles.middleButton]}>
          <Text>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast} style={styles.button}>
          <Text>Fast</Text>
        </TouchableOpacity>
      </View>
      <Video
        ref={video}
        style={styles.video}
        source={
          //uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          //require("../AnimTest/assets/sampleVideos/cheer.mp4")
          require("./assets/sampleVideos/cheer.mp4")
        }
        useNativeControls={false}
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  text: {
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
});

//Accelerometer code used from - https://docs.expo.dev/versions/latest/sdk/accelerometer/
//VideoPlayback code used from - https://docs.expo.dev/versions/latest/sdk/video/