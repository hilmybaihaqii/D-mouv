// File: app/(auth)/login.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { TextInput, Checkbox } from 'react-native-paper';
import { COLORS } from '../../constants/Colors';
import { useAuth } from '../../context/AuthContext';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { login } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!agree) {
      setError('You must agree to the terms and privacy policy.');
      return;
    }
    setError('');
    setLoading(true);

    setTimeout(() => {
      login();
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.header}>
              <Image source={require('../../assets/images/logo.png')} style={styles.logo} resizeMode="contain"/>
              <Text style={styles.title}>Welcome Back!</Text>
              <Text style={styles.subtitle}>Sign in to continue to your account</Text>
            </View>

            <View style={styles.formContainer}>
                {!!error && <Text style={styles.errorText}>{error}</Text>}
                <TextInput label="E-mail" value={email} onChangeText={setEmail} style={styles.input} mode="outlined" keyboardType="email-address" autoCapitalize="none"/>
                <TextInput label="Password" value={password} onChangeText={setPassword} style={styles.input} mode="outlined" secureTextEntry={!passwordVisible} right={<TextInput.Icon icon={passwordVisible ? "eye-off" : "eye"} onPress={() => setPasswordVisible(!passwordVisible)} />}/>

                <TouchableOpacity style={styles.checkboxWrapper} onPress={() => setAgree(!agree)}>
                  <Checkbox.Android status={agree ? 'checked' : 'unchecked'} onPress={() => setAgree(!agree)} color={COLORS.accent}/>
                  <Text style={styles.checkboxLabel}>I agree with <Text style={styles.linkTextBold}>Terms</Text> and <Text style={styles.linkTextBold}>Privacy</Text></Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                  {loading ? <ActivityIndicator color={COLORS.primary} /> : <Text style={styles.buttonText}>Sign In</Text>}
                </TouchableOpacity>

                <TouchableOpacity>
                  <Text style={[styles.linkText, { textAlign: 'center' }]}>Forgot Password?</Text>
                </TouchableOpacity>

              <View style={styles.footer}>
                <Text style={styles.footerText}>Don&apos;t have an account? </Text>
                <Link href={{ pathname: '/(auth)/register' }} asChild>
                  <TouchableOpacity><Text style={styles.linkText}>Sign Up</Text></TouchableOpacity>
                </Link>
              </View>
            </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.white },
  keyboardView: { flex: 1 },
  scrollContainer: { 
      flexGrow: 1, 
      justifyContent: 'center' // Pusatkan konten secara vertikal
    },
  header: { alignItems: 'center', justifyContent: 'center', paddingVertical: 20, paddingHorizontal: 20 },
  logo: { width: 150, height: 50, marginBottom: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: COLORS.primary, marginBottom: 8, },
  subtitle: { fontSize: 16, color: COLORS.textSecondary, textAlign: 'center', marginBottom: 20 },
  formContainer: {
    // flex: 1
    backgroundColor: COLORS.primary,
    marginHorizontal: 16, // Beri sedikit margin horizontal
    paddingHorizontal: 24,
    paddingVertical: 32,
    borderRadius: 40,
  },
  input: { marginBottom: 18, },
  checkboxWrapper: { flexDirection: 'row', alignItems: 'center', marginBottom: 24, marginLeft: -8, },
  checkboxLabel: { color: COLORS.white, flexShrink: 1 },
  button: { backgroundColor: COLORS.accent, paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginBottom: 24, minHeight: 54, justifyContent: 'center' },
  buttonText: { color: COLORS.primary, fontSize: 16, fontWeight: 'bold' },
  errorText: { color: '#FFB8B8', textAlign: 'center', marginBottom: 12 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20, 
  },
  linkText: { color: COLORS.accent },
  linkTextBold: { color: COLORS.accent, fontWeight: 'bold' },
  footerText: { fontSize: 14, color: COLORS.white },
});

export default LoginScreen;