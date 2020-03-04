import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  ScrollView,
  ImageBackground,
  TouchableHighlight,
  Alert,
} from 'react-native';

import Sound from 'react-native-sound';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import * as RNFS from 'react-native-fs';
import AudioControls from '../library/audiocontrols';
import PageControls from '../library/pagecontrols';
import ProgressLabel from '../library/progresslabel';
import Footer from '../library/footer';

class HomeScreen extends React.Component {
  //TODO: Move all of this initialization into constructor
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0.0,
      recording: false,
      stoppedRecording: false,
      finished: false,
      audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac',
      hasPermission: undefined,
    };
  }

  prepareRecordingPath = audioPath => {
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'Low',
      AudioEncoding: 'aac',
      AudioEncodingBitRate: 32000,
    });
  };

  checkPermission = () => {
    if (Platform.OS !== 'android') {
      return Promise.resolve(true);
    }

    const rationale = {
      title: 'Microphone Permission',
      message:
        'AudioExample needs access to your microphone so you can record audio.',
    };

    return PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      rationale,
    ).then(result => {
      console.log('Permission result:', result);
      return result === true || result === PermissionsAndroid.RESULTS.GRANTED;
    });
  };

  _pause = async () => {
    if (!this.state.recording) {
      Alert.alert('AudioRecorder', "Can't pause, not recording!");
      console.warn("Can't PAUSE, not recording!");
      return;
    }

    this.setState({stoppedRecording: true, recording: false});

    try {
      const filePath = await AudioRecorder.pauseRecording();

      // Pause is currently equivalent to stop on Android.
      if (Platform.OS === 'android') {
        this._finishRecording(true, filePath);
      }
    } catch (error) {
      console.error(error);
    }
  };

  _stop = async () => {
    if (!this.state.recording) {
      Alert.alert('AudioRecorder', "Can't STOP, not recording!");
      console.warn("Can't stop, not recording!");
      return;
    }

    this.setState({stoppedRecording: true, recording: false});

    try {
      const filePath = await AudioRecorder.stopRecording();

      if (Platform.OS === 'android') {
        this._finishRecording(true, filePath);
      }
      return filePath;
    } catch (error) {
      console.error(error);
    }
  };

  _play = async () => {
    if (this.state.recording) {
      await this._stop();
    }

    // These timeouts are a hacky workaround for some issues with react-native-sound.
    // See https://github.com/zmxv/react-native-sound/issues/89.
    setTimeout(() => {
      var sound = new Sound(this.state.audioPath, '', error => {
        if (error) {
          console.log('failed to load the sound', error);
        }
      });
      if (sound == null) {
        Alert.alert(
          'AudioRecorder',
          'Failed to LOAD/PLAY sound. Please RECORD and try again!',
        );
        return;
      }
      console.log('Sound object is');
      console.log(sound);

      setTimeout(() => {
        sound.play(success => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            Alert.alert(
              'AudioRecorder',
              'Playback failed due to audio decoding errors!',
            );
            console.log('playback failed due to audio decoding errors');
          }
        });
      }, 100);
    }, 100);
  };

  _record = async () => {
    if (this.state.recording) {
      Alert.alert('AudioRecorder', 'Already recording!');
      console.warn('Already recording!');
      return;
    }

    if (!this.state.hasPermission) {
      Alert.alert('AudioRecorder', "Can't RECORD, no permissions granted!");
      console.warn("Can't record, no permission granted!");
      return;
    }

    if (this.state.stoppedRecording) {
      this.prepareRecordingPath(this.state.audioPath);
    }

    this.setState({recording: true});

    try {
      const filePath = await AudioRecorder.startRecording();
    } catch (error) {
      console.error(error);
    }
  };

  _finishRecording = (didSucceed, filePath) => {
    this.setState({finished: didSucceed});
    console.log(
      `Finished recording of duration ${
        this.state.currentTime
      } seconds at path: ${filePath}`,
    );
  };

  componentDidMount() {
    this.checkPermission().then(hasPermission => {
      this.setState({hasPermission});

      if (!hasPermission) {
        return;
      }

      this.prepareRecordingPath(this.state.audioPath);

      AudioRecorder.onProgress = data => {
        this.setState({currentTime: Math.floor(data.currentTime)});
      };

      AudioRecorder.onFinished = data => {
        // Android callback comes in the form of a promise instead.
        if (Platform.OS === 'ios') {
          this._finishRecording(data.status === 'OK', data.audioFileURL);
        }
      };
    });
  }

  checkAndDeleteRecorderFile = async () => {
    await RNFS.exists(this.state.audioPath)
      .then(result => {
        this.removeRecordedFile();
      })
      .catch(err => {
        console.log('ERROR: Failed to check on file');
      });
  };

  removeRecordedFile = async () => {
    await RNFS.unlink(this.state.audioPath)
      .then(res => {
        return true;
      })
      .catch(err => {
        console.log(err.message, err.code);
        return false;
      });
    return false;
  };
  onTapCancelButton = () => {
    this.setState({currentTime: 0});
    this.checkAndDeleteRecorderFile();
    this.props.navigation.goBack();
  };

  onTapSaveButton = () => {
    let new_file_path = this.state.audioPath.replace(
      'test.aac',
      new Date().getTime() + '.aac',
    );
    RNFS.moveFile(this.state.audioPath, new_file_path)
      .then(success => {
        console.log('file moved!');
        Alert.alert('AudioRecorder', 'File Saved');
        this.setState({currentTime: 0});
        this.removeRecordedFile();
      })
      .catch(err => {
        console.log('Error: ' + err.message);
        Alert.alert('AudioRecorder', 'Failed to save recorded passage. Please try again!');
      });

  };

  render() {
    return (
      <ScrollView>
        <ImageBackground
          source={require('./../../assets/grange_office.jpg')}
          style={styles.backgroundImage}>
          <View style={styles.container}>
            <Text style={styles.headline}>Audio Recorder</Text>
            <AudioControls
              onRecord={this._record}
              onStop={this._stop}
              onPlay={this._play}
              recordActive={this.state.recording}
            />
            <ProgressLabel currentTime={this.state.currentTime} />
            <PageControls
              onCancelButton={this.onTapCancelButton}
              onSaveButton={this.onTapSaveButton}
            />
            <Footer />
          </View>
        </ImageBackground>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    margin: 0,
    backgroundColor: 'rgba( 0, 0, 0, 0.5 )',
  },
  controls: {
    justifyContent: 'center',
    alignItems: 'stretch',
    flex: 1,
  },
  headline: {
    marginTop: 20,
    fontSize: 44,
    fontWeight: '200',
    textAlign: 'center',
    color: 'white',
  },
  navigationButton: {
    marginTop: 20,
  },
  backgroundImage: {
    flex: 1,
    height: null,
    width: null,
  },
});

export default HomeScreen;
