import { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';

export default function ScannerScreen() {
  const router = useRouter();

  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.text}>
          Camera permission is required to scan QR codes.
        </Text>

        <Pressable
          style={styles.button}
          onPress={requestPermission}
        >
          <Text style={styles.buttonText}>
            Grant Camera Permission
          </Text>
        </Pressable>
      </View>
    );
  }

  function handleBarcodeScanned({ data }: { data: string }) {
    if (scanned) return;

    setScanned(true);

    router.replace({
      pathname: '/Result',
      params: { url: data },
    });
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        barcodeScannerSettings={{
            barcodeTypes: ['qr'],
        }}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        />

      <View style={styles.overlay}>
        <Text style={styles.title}>
          Scan a QR Code
        </Text>

        <View style={styles.scanArea} />

        <Text style={styles.instruction}>
          Position the QR code inside the square
        </Text>

        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>
            Cancel
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 60,
  },

  title: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
  },

  scanArea: {
    width: 260,
    height: 260,
    borderWidth: 3,
    borderColor: '#00FF88',
    borderRadius: 20,
  },

  instruction: {
    color: 'white',
    fontSize: 16,
  },

  backButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 35,
    paddingVertical: 14,
    borderRadius: 10,
  },

  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 20,
  },

  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});
