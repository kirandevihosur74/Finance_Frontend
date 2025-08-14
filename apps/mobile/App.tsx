import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import { useColorScheme } from 'react-native';

const Stack = createNativeStackNavigator();

function useMock<T>(getData: () => T) {
  return { data: getData() } as { data: T };
}

function DashboardScreen() {
  const { data: safeToSpend } = useMock(() => ({ amount: 1243.56, currency: 'USD' }));
  const { data: bills } = useMock(() => ([
    { id: '1', name: 'Rent', dueDate: new Date().toISOString(), amount: 1800, currency: 'USD' },
    { id: '2', name: 'Internet', dueDate: new Date(Date.now()+3*864e5).toISOString(), amount: 60, currency: 'USD' },
  ]));
  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: '700', marginBottom: 12 }}>Safe to Spend</Text>
      {safeToSpend ? (
        <Text style={{ fontSize: 20 }}>
          {Intl.NumberFormat(undefined, { style: 'currency', currency: safeToSpend.currency || 'USD' }).format(safeToSpend.amount)}
        </Text>
      ) : (
        <View style={styles.skeleton} />
      )}
      <Text style={{ fontSize: 24, fontWeight: '700', marginVertical: 12 }}>Upcoming Bills</Text>
      {bills ? (
        <FlatList
          data={bills.slice(0, 8)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={{ flex: 1 }}>{item.name}</Text>
              <Text>{new Date(item.dueDate).toLocaleDateString()}</Text>
              <Text>{Intl.NumberFormat(undefined, { style: 'currency', currency: item.currency || 'USD' }).format(item.amount)}</Text>
            </View>
          )}
        />
      ) : (
        <View style={[styles.skeleton, { height: 120 }]} />
      )}
    </SafeAreaView>
  );
}

export default function App() {
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();
  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <Stack.Navigator>
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </QueryClientProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  skeleton: {
    height: 24,
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
  }
});
