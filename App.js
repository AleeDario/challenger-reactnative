import { StatusBar } from 'expo-status-bar';
import Navigation from './src/navigation/Navigation';
import { Provider as PaperProvider } from 'react-native-paper'

export default function App() {
  return (
    <PaperProvider>
      <StatusBar style="light" />
      <Navigation />
    </PaperProvider>
  );
}