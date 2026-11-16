import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index" // name should correspond with the filename
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Scanner"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Result"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
