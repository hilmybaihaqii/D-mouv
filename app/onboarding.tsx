// File: app/onboarding.tsx

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../constants/Colors';

const { width, height } = Dimensions.get('window');

// Tipe untuk data setiap slide
type SlideItem = {
  id: string;
  image: any;
  title: string;
  subtitle: string;
};

// Data slide yang disesuaikan dengan ID yang unik
const slides: SlideItem[] = [
    {
        id: '1',
        image: require('../assets/images/welcome.png'),
        title: 'Automatic Control',
        subtitle: 'All devices will turn on when you arrive and switch off when you leave.',
    },
    {
        id: '2',
        image: require('../assets/images/light.png'),
        title: 'Automatic Control',
        subtitle: 'All devices Will turn on when you arrive and switch off when you leave.',
    },
    {
        id: '3',
        image: require('../assets/images/dashboard.png'),
        title: 'Real-time Dashboard',
        subtitle: 'Stay in control with live updates and smart analytics.',
    },
    {
        id: '4',
        image: require('../assets/images/login.png'),
        title: "Let's Get Started",
        subtitle: 'Log in or sign up to connect and take control of your devices.',
    },
];

// Komponen untuk render satu slide
const Slide = ({ item }: { item: SlideItem }) => {
  return (
    <View style={styles.slideContainer}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </View>
  );
};

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef<FlatList<SlideItem>>(null);

  const updateCurrentSlideIndex = (e: any) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / width);
    setCurrentIndex(newIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentIndex + 1;
    if (nextSlideIndex < slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current?.scrollToOffset({ offset });
    } else {
      completeOnboarding();
    }
  };

  // Fungsi ini dijalankan setelah slide terakhir
  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('onboarding_completed', 'true');
      // Mengarahkan ke halaman koneksi perangkat
      router.replace('/connectDevice');
    } catch (e) {
      console.error("Failed to save onboarding status", e);
    }
  };

  const skipOnboarding = () => {
    completeOnboarding();
  };

  const goToPreviousSlide = () => {
    const previousSlideIndex = currentIndex - 1;
    if (previousSlideIndex >= 0) {
      const offset = previousSlideIndex * width;
      ref?.current?.scrollToOffset({ offset });
    }
  };

  // Komponen Footer yang dinamis
  const Footer = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const isFirstSlide = currentIndex === 0;

    if (isLastSlide) {
      return (
        <View style={styles.footerCentered}>
          <TouchableOpacity 
            style={[styles.buttonBase, styles.nextButton, styles.lastSlideButton]} 
            onPress={completeOnboarding}
          >
            <Text style={styles.nextButtonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.footerContainer}>
        {isFirstSlide ? (
          <TouchableOpacity style={[styles.buttonBase, styles.skipButton]} onPress={skipOnboarding}>
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[styles.buttonBase, styles.skipButton]} onPress={goToPreviousSlide}>
            <Text style={styles.skipButtonText}>Back</Text>
          </TouchableOpacity>
        )}
        
        <View style={styles.indicatorContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentIndex === index && { backgroundColor: COLORS.primary },
              ]}
            />
          ))}
        </View>

        <TouchableOpacity style={[styles.buttonBase, styles.nextButton]} onPress={goToNextSlide}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        data={slides}
        contentContainerStyle={{ height: height * 0.75 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        bounces={false}
        renderItem={({ item }) => <Slide item={item} />}
      />
      <Footer />
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  slideContainer: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  image: {
    height: '50%',
    maxWidth: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 15,
    maxWidth: '80%',
    textAlign: 'center',
    lineHeight: 24,
  },
  footerContainer: {
    height: height * 0.25,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerCentered: {
    height: height * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
  },
  indicator: {
    height: 8,
    width: 8,
    backgroundColor: '#D9D9D9',
    marginHorizontal: 4,
    borderRadius: 4,
  },
  buttonBase: {
    paddingVertical: 14,
    borderRadius: 50,
    alignItems: 'center',
  },
  skipButton: {
    backgroundColor: '#E9F1FF',
    minWidth: 120,
    paddingHorizontal: 35,
  },
  skipButtonText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    minWidth: 120,
    paddingHorizontal: 35,
  },
  nextButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  lastSlideButton: {
      width: '100%'
  }
});

export default OnboardingScreen;
