import { View, Text, Pressable, StyleSheet, Linking } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function ResultScreen() {
  const router = useRouter();

  const { url } = useLocalSearchParams<{ url: string }>();

  async function openLink() {
    try {
      const parsed = new URL(url);

      if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
        alert('Unsupported URL protocol.');
        return;
      }

      await Linking.openURL(parsed.toString());
    } catch {
      alert('Invalid URL or unable to open link.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        QR Code Detected!
      </Text>

      <Text style={styles.label}>
        Extracted URL:
      </Text>

      <Text style={styles.url}>
        {url}
      </Text>

      <Pressable style={styles.button} onPress={openLink}>
        <Text style={styles.buttonText}>
          Open Link
        </Text>
      </Pressable>

      <Pressable
        style={styles.secondaryButton}
        onPress={() => router.replace('/Scanner')}
      >
        <Text style={styles.buttonText}>
          Scan Another QR
        </Text>
      </Pressable>

      <Pressable onPress={() => router.replace('/')}>
        <Text style={styles.backText}>
          Return Home
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    gap: 20,
    backgroundColor: 'white',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  url: {
    fontSize: 15,
    color: '#555',
  },

  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },

  secondaryButton: {
    backgroundColor: '#444',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  backText: {
    textAlign: 'center',
    color: '#007AFF',
  },
});
