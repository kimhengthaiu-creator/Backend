import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from '@clerk/clerk-react';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { CourseDetail } from './pages/CourseDetail';
import { Lesson } from './pages/Lesson';
import { MyLearning } from './pages/MyLearning';
import { ClerkAuthBridge, FallbackAuthProvider } from './components/auth/AuthProvider';

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const isClerkConfigured =
  Boolean(CLERK_PUBLISHABLE_KEY) &&
  !CLERK_PUBLISHABLE_KEY.includes('placeholder');

function ProtectedMyLearning() {
  if (!isClerkConfigured) {
    // In local development / mock mode, allow viewing dashboard directly
    return <MyLearning />;
  }

  return (
    <>
      <SignedIn>
        <MyLearning />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<Catalog />} />
      <Route path="/courses/:slug" element={<CourseDetail />} />
      <Route
        path="/courses/:slug/lessons/:lessonSlug"
        element={<Lesson />}
      />
      <Route path="/my-learning" element={<ProtectedMyLearning />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  if (isClerkConfigured) {
    return (
      <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
        <ClerkAuthBridge>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ClerkAuthBridge>
      </ClerkProvider>
    );
  }

  return (
    <FallbackAuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </FallbackAuthProvider>
  );
}
