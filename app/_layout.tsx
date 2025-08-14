// File: app/_layout.tsx

import React, { useState, useEffect } from 'react';
import { SplashScreen, Stack, router, Href } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { COLORS } from '../constants/Colors';

// 1. Impor hook dan font yang dibutuhkan
import { useFonts } from 'expo-font';
import { Poppins_700Bold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { Roboto_400Regular } from '@expo-google-fonts/roboto';

// 2. Konfigurasikan tema dengan font baru
const theme = {
  ...DefaultTheme,
  roundness: 12,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primary,
    background: COLORS.white,
  },
  // Terapkan font ke berbagai jenis teks
  fonts: {
    ...DefaultTheme.fonts,
    // UBAH FONT DEFAULT MENJADI POPPINS
    default: {
      ...DefaultTheme.fonts.default,
      fontFamily: 'Poppins_400Regular', // Font default untuk semua teks
    },
    headlineLarge: {
      ...DefaultTheme.fonts.headlineLarge,
      fontFamily: 'Poppins_700Bold', // Tetap Poppins Bold untuk judul besar
    },
    titleLarge: {
      ...DefaultTheme.fonts.titleLarge,
      fontFamily: 'Poppins_700Bold', // Tetap Poppins Bold untuk judul
    },
    bodyLarge: {
      ...DefaultTheme.fonts.bodyLarge,
      fontFamily: 'Poppins_400Regular', // Teks body juga Poppins
    },
  },
};

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { isLoggedIn } = useAuth();
  const [isReady, setIsReady] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  // 3. Muat font saat aplikasi berjalan
  const [fontsLoaded, fontError] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
    Roboto_400Regular,
  });

  useEffect(() => {
    async function prepareApp() {
      try {
        const completed = await AsyncStorage.getItem('onboarding_completed');
        if (completed) {
          setOnboardingCompleted(true);
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }
    prepareApp();
  }, []);

  useEffect(() => {
    // 4. Pastikan font sudah dimuat sebelum menyembunyikan splash screen
    if (isReady && (fontsLoaded || fontError)) {
      let route: Href;
      if (!onboardingCompleted) {
        route = '/onboarding';
      } else if (isLoggedIn) {
        route = '/(tabs)';
      } else {
        route = '/connectDevice';
      }
      
      router.replace(route);
      SplashScreen.hideAsync();
    }
  }, [isReady, isLoggedIn, onboardingCompleted, fontsLoaded, fontError]);

  // 5. Tampilkan splash screen selama font belum siap
  if (!fontsLoaded && !fontError) {
    return null;
  }

  // Navigator utama HARUS menggunakan <Stack>
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="connectDevice" options={{ headerShown: false }} />
      <Stack.Screen name="notifications" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <RootLayoutNav />
      </PaperProvider>
    </AuthProvider>
  );
}
