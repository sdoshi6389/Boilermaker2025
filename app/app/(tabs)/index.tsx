import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, Switch, ScrollView, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import MapView, { Marker } from 'react-native-maps';

export default function App() {
  // Camera & scanning state
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [scannerActive, setScannerActive] = useState(false);
  const [scannedResults, setScannedResults] = useState<any[]>([]);
  const cameraRef = useRef<InstanceType<typeof Camera> | null>(null);

  // Natural language query state
  const [query, setQuery] = useState('');

  // Dietary restrictions state
  const [dietaryRestrictions, setDietaryRestrictions] = useState({
    vegan: false,
    vegetarian: false,
    glutenFree: false,
    dairyFree: false,
  });

  // Map region & markers state (dummy markers)
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const markers = [
    { id: 1, title: 'Healthy Bites', coordinate: { latitude: 37.78925, longitude: -122.4314 } },
    { id: 2, title: 'Green Eats', coordinate: { latitude: 37.78725, longitude: -122.4334 } },
  ];

  // Request camera permissions on mount
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  if (hasCameraPermission === null) {
    return (
      <View style={styles.centered}>
        <Text>Requesting camera permission…</Text>
      </View>
    );
  }
  if (hasCameraPermission === false) {
    return (
      <View style={styles.centered}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  // Handler to capture photo and simulate macro logging
  const handleCapture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      // Dummy macro analysis (in a real app, integrate a ML service/API)
      const dummyResult = {
        photoUri: photo.uri,
        calories: 250,
        protein: 10,
        carbs: 30,
        fat: 5,
      };
      setScannedResults([...scannedResults, dummyResult]);
      Alert.alert(
        'Food Scanned',
        `Logged macros:\nCalories: ${dummyResult.calories} cal\nProtein: ${dummyResult.protein}g\nCarbs: ${dummyResult.carbs}g\nFat: ${dummyResult.fat}g`
      );
      setScannerActive(false);
    }
  };

  // Handler for query submission
  const handleQuerySubmit = () => {
    Alert.alert('Query Submitted', `You are looking for: ${query}`);
    // Here you could integrate a natural language processing API
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Healthy Food Minded App</Text>

        {/* Dietary Restrictions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Dietary Restrictions</Text>
          <View style={styles.row}>
            <Text>Vegan</Text>
            <Switch
              value={dietaryRestrictions.vegan}
              onValueChange={(val) =>
                setDietaryRestrictions({ ...dietaryRestrictions, vegan: val })
              }
            />
          </View>
          <View style={styles.row}>
            <Text>Vegetarian</Text>
            <Switch
              value={dietaryRestrictions.vegetarian}
              onValueChange={(val) =>
                setDietaryRestrictions({ ...dietaryRestrictions, vegetarian: val })
              }
            />
          </View>
          <View style={styles.row}>
            <Text>Gluten-Free</Text>
            <Switch
              value={dietaryRestrictions.glutenFree}
              onValueChange={(val) =>
                setDietaryRestrictions({ ...dietaryRestrictions, glutenFree: val })
              }
            />
          </View>
          <View style={styles.row}>
            <Text>Dairy-Free</Text>
            <Switch
              value={dietaryRestrictions.dairyFree}
              onValueChange={(val) =>
                setDietaryRestrictions({ ...dietaryRestrictions, dairyFree: val })
              }
            />
          </View>
        </View>

        {/* Food Scanner Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Food Scanner</Text>
          {scannerActive ? (
            <View style={{ height: 300 }}>
              <Camera style={styles.camera} ref={cameraRef} />
              <Button title="Capture Food" onPress={handleCapture} />
              <Button title="Cancel" onPress={() => setScannerActive(false)} />
            </View>
          ) : (
            <Button title="Open Food Scanner" onPress={() => setScannerActive(true)} />
          )}
        </View>

        {/* Query and Map Section (same page) */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Find Your Next Meal</Text>
          <View style={styles.queryMapContainer}>
            <View style={styles.queryContainer}>
              <TextInput
                style={styles.input}
                placeholder="What do you want to eat?"
                value={query}
                onChangeText={setQuery}
              />
              <Button title="Submit Query" onPress={handleQuerySubmit} />
            </View>
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                region={region}
                onRegionChangeComplete={(reg) => setRegion(reg)}
              >
                {markers.map((marker) => (
                  <Marker key={marker.id} coordinate={marker.coordinate} title={marker.title} />
                ))}
              </MapView>
            </View>
          </View>
        </View>

        {/* Display Scanned Food Logs */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Scanned Food Logs</Text>
          {scannedResults.length === 0 ? (
            <Text>No scans yet.</Text>
          ) : (
            scannedResults.map((item, index) => (
              <View key={index} style={styles.logItem}>
                <Text>
                  Scan {index + 1} - Calories: {item.calories} cal, Protein: {item.protein}g, Carbs:{' '}
                  {item.carbs}g, Fat: {item.fat}g
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContainer: { padding: 16 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
  section: { marginBottom: 24 },
  sectionHeader: { fontSize: 20, marginBottom: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 4 },
  camera: { flex: 1, borderRadius: 8, overflow: 'hidden', marginBottom: 8 },
  queryMapContainer: { flexDirection: 'column' },
  queryContainer: { marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  mapContainer: { height: 200, borderWidth: 1, borderColor: '#ccc' },
  map: { flex: 1 },
  logItem: { padding: 8, borderBottomWidth: 1, borderColor: '#eee' },
});
