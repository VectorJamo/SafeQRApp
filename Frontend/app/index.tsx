import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();

  function handlePress() {
    alert('Button pressed');
    router.push('/Scanner');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>
        Safe QR Scanner
      </Text>
      <Pressable
        style={styles.button}
        onPress={handlePress}
      >
        <Text style={styles.buttonText}>Scan QR!</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 32,
  }
});