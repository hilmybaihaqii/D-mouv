// File: app/connectDevice.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { TextInput } from 'react-native-paper';
import { COLORS } from '../constants/Colors';

const ConnectDeviceScreen = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [ssid, setSsid] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConnect = () => {
    if (!ipAddress || !ssid || !wifiPassword) {
      setError('All fields are required.');
      return;
    }
    setError('');
    setLoading(true);

    // Simulasi proses koneksi ke perangkat
    setTimeout(() => {
      console.log('Connecting to IP:', ipAddress, 'with SSID:', ssid);
      setLoading(false);
      // Jika berhasil, arahkan ke halaman login
      router.push('/(auth)/login');
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.header}>
              <Image source={require('../assets/images/wifi.png')} style={styles.illustration} resizeMode="contain"/>
              <Text style={styles.title}>Enter your IP Device and SSID</Text>
              <Text style={styles.subtitle}>Please provide your devices IP and WiFi SSID to keep you connected</Text>
            </View>

            <View style={styles.formContainer}>
                {!!error && <Text style={styles.errorText}>{error}</Text>}
                <TextInput label="IP Device" value={ipAddress} onChangeText={setIpAddress} style={styles.input} mode="outlined" keyboardType="decimal-pad" />
                
                <View style={styles.ssidHeader}>
                    <Text style={styles.ssidLabel}>SSID</Text>
                    <Text style={styles.ssidSublabel}>WI-FI ID</Text>
                </View>
                {/* PERBAIKAN DI SINI: Mengganti placeholder menjadi label */}
                <TextInput label="SSID Name" value={ssid} onChangeText={setSsid} style={styles.input} mode="outlined" />

                <TextInput label="Password" value={wifiPassword} onChangeText={setWifiPassword} style={styles.input} mode="outlined" secureTextEntry={!passwordVisible} right={<TextInput.Icon icon={passwordVisible ? "eye-off" : "eye"} onPress={() => setPasswordVisible(!passwordVisible)} />}/>

                <TouchableOpacity style={styles.button} onPress={handleConnect} disabled={loading}>
                  {loading ? <ActivityIndicator color={COLORS.primary} /> : <Text style={styles.buttonText}>Connect</Text>}
                </TouchableOpacity>
            </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.white },
  keyboardView: { flex: 1 },
  scrollContainer: { flexGrow: 1, justifyContent: 'center' },
  header: { alignItems: 'center', padding: 20 },
  illustration: { width: 150, height: 150, marginBottom: 24 },
  title: { fontSize: 22, fontWeight: 'bold', color: COLORS.primary, marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 16, color: COLORS.textSecondary, textAlign: 'center', marginBottom: 20 },
  formContainer: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 16,
    paddingHorizontal: 24,
    paddingVertical: 32,
    borderRadius: 40,
  },
  input: { marginBottom: 18, },
  ssidHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 4, marginBottom: 8 },
  ssidLabel: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
  ssidSublabel: { color: "#ffffff", fontSize: 14 },
  button: { backgroundColor: COLORS.accent, paddingVertical: 16, borderRadius: 12, alignItems: 'center', minHeight: 54, justifyContent: 'center', marginTop: 10 },
  buttonText: { color: COLORS.primary, fontSize: 16, fontWeight: 'bold' },
  errorText: { color: '#FFB8B8', textAlign: 'center', marginBottom: 12 },
});

export default ConnectDeviceScreen;
