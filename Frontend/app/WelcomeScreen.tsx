import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {

    const router = useRouter();

    function handlePress() {
        alert('Button pressed');
        router.push('/');
    }

  return (
    <SafeAreaView style={styles.container}>
      <Pressable 
        style={styles.button}
        onPress={handlePress}
      >
        <Text style={styles.buttonText}>Go to Home Screen</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
});