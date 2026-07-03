import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/Main/SplashScreen';
import LoginScreen from './src/screens/Auth/LoginScreen';
import CartSummaryScreen from './src/screens/Grading/CartSummaryScreen';
import GradingSummaryScreen from './src/screens/Grading/GradingSummaryScreen';
import StartSessionScreen from './src/screens/Grading/StartSessionScreen';
import CameraScreen from './src/screens/Grading/CameraScreen';
import ResultScreen from './src/screens/Grading/ResultScreen';
import TabNavigator from './src/navigation/TabNavigator';
import ForgotPasswordScreen from './src/screens/Auth/ForgotPasswordScreen';
import OTPScreen from './src/screens/Auth/OTPScreen';
import ResetPasswordScreen from './src/screens/Auth/ResetPasswordScreen';
import { SessionProvider } from './src/store/SessionContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SessionProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="OTP" component={OTPScreen} />
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
          <Stack.Screen name="MainTabs" component={TabNavigator} />
          <Stack.Screen name="StartSession" component={StartSessionScreen} />
          <Stack.Screen name="Scanner" component={CameraScreen} />
          <Stack.Screen name="Result" component={ResultScreen} />
          <Stack.Screen name="CartSummary" component={CartSummaryScreen} />
          <Stack.Screen name="GradingSummary" component={GradingSummaryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SessionProvider>
  );
}
