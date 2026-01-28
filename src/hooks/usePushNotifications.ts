import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

// VAPID public key - this would normally come from environment variables
// For demo purposes, we'll generate one. In production, use proper VAPID keys.
const VAPID_PUBLIC_KEY = 'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U';

function urlBase64ToUint8Array(base64String: string): ArrayBuffer {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray.buffer as ArrayBuffer;
}

interface PushNotificationState {
  isSupported: boolean;
  isSubscribed: boolean;
  isLoading: boolean;
  permission: NotificationPermission | 'default';
}

export const usePushNotifications = () => {
  const { user } = useAuth();
  const [state, setState] = useState<PushNotificationState>({
    isSupported: false,
    isSubscribed: false,
    isLoading: true,
    permission: 'default',
  });

  // Check if push notifications are supported
  const checkSupport = useCallback(() => {
    const isSupported = 
      'serviceWorker' in navigator && 
      'PushManager' in window && 
      'Notification' in window;
    
    return isSupported;
  }, []);

  // Register service worker
  const registerServiceWorker = useCallback(async (): Promise<ServiceWorkerRegistration | null> => {
    if (!('serviceWorker' in navigator)) {
      console.log('[Push] Service workers not supported');
      return null;
    }

    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });
      console.log('[Push] Service Worker registered:', registration);
      return registration;
    } catch (error) {
      console.error('[Push] Service Worker registration failed:', error);
      return null;
    }
  }, []);

  // Get existing subscription
  const getExistingSubscription = useCallback(async (): Promise<PushSubscription | null> => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      return subscription;
    } catch (error) {
      console.error('[Push] Error getting subscription:', error);
      return null;
    }
  }, []);

  // Save subscription to database
  const saveSubscriptionToDatabase = useCallback(async (subscription: PushSubscription) => {
    if (!user) {
      console.log('[Push] No user logged in, cannot save subscription');
      return false;
    }

    const subscriptionJson = subscription.toJSON();
    
    try {
      const { error } = await supabase
        .from('push_subscriptions')
        .upsert({
          user_id: user.id,
          endpoint: subscription.endpoint,
          p256dh: subscriptionJson.keys?.p256dh || '',
          auth: subscriptionJson.keys?.auth || '',
        }, {
          onConflict: 'endpoint'
        });

      if (error) {
        console.error('[Push] Error saving subscription:', error);
        return false;
      }

      console.log('[Push] Subscription saved to database');
      return true;
    } catch (error) {
      console.error('[Push] Error saving subscription:', error);
      return false;
    }
  }, [user]);

  // Remove subscription from database
  const removeSubscriptionFromDatabase = useCallback(async (endpoint: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('push_subscriptions')
        .delete()
        .eq('user_id', user.id)
        .eq('endpoint', endpoint);

      if (error) {
        console.error('[Push] Error removing subscription:', error);
        return false;
      }

      console.log('[Push] Subscription removed from database');
      return true;
    } catch (error) {
      console.error('[Push] Error removing subscription:', error);
      return false;
    }
  }, [user]);

  // Subscribe to push notifications
  const subscribe = useCallback(async (): Promise<boolean> => {
    if (!checkSupport()) {
      toast.error('Push notifications are not supported in this browser');
      return false;
    }

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      // Request notification permission
      const permission = await Notification.requestPermission();
      setState(prev => ({ ...prev, permission }));

      if (permission !== 'granted') {
        toast.error('Notification permission denied');
        setState(prev => ({ ...prev, isLoading: false }));
        return false;
      }

      // Register service worker
      const registration = await registerServiceWorker();
      if (!registration) {
        toast.error('Failed to register service worker');
        setState(prev => ({ ...prev, isLoading: false }));
        return false;
      }

      // Wait for service worker to be ready
      await navigator.serviceWorker.ready;

      // Subscribe to push manager
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
      });

      console.log('[Push] Push subscription:', subscription);

      // Save to database
      const saved = await saveSubscriptionToDatabase(subscription);
      
      if (saved) {
        setState(prev => ({ ...prev, isSubscribed: true, isLoading: false }));
        toast.success('🔔 Push notifications enabled!');
        return true;
      } else {
        // If we couldn't save, still consider it subscribed locally
        setState(prev => ({ ...prev, isSubscribed: true, isLoading: false }));
        toast.success('🔔 Push notifications enabled locally');
        return true;
      }
    } catch (error) {
      console.error('[Push] Subscription error:', error);
      toast.error('Failed to enable push notifications');
      setState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  }, [checkSupport, registerServiceWorker, saveSubscriptionToDatabase]);

  // Unsubscribe from push notifications
  const unsubscribe = useCallback(async (): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const subscription = await getExistingSubscription();
      
      if (subscription) {
        await removeSubscriptionFromDatabase(subscription.endpoint);
        await subscription.unsubscribe();
      }

      setState(prev => ({ ...prev, isSubscribed: false, isLoading: false }));
      toast.success('Push notifications disabled');
      return true;
    } catch (error) {
      console.error('[Push] Unsubscribe error:', error);
      toast.error('Failed to disable push notifications');
      setState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  }, [getExistingSubscription, removeSubscriptionFromDatabase]);

  // Check current subscription status
  const checkSubscriptionStatus = useCallback(async () => {
    const isSupported = checkSupport();
    
    if (!isSupported) {
      setState({
        isSupported: false,
        isSubscribed: false,
        isLoading: false,
        permission: 'default',
      });
      return;
    }

    try {
      const permission = Notification.permission;
      const subscription = await getExistingSubscription();
      
      setState({
        isSupported: true,
        isSubscribed: !!subscription,
        isLoading: false,
        permission,
      });
    } catch (error) {
      console.error('[Push] Error checking status:', error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [checkSupport, getExistingSubscription]);

  // Initialize on mount
  useEffect(() => {
    checkSubscriptionStatus();
  }, [checkSubscriptionStatus]);

  // Re-check when user changes
  useEffect(() => {
    if (user) {
      registerServiceWorker();
    }
  }, [user, registerServiceWorker]);

  return {
    ...state,
    subscribe,
    unsubscribe,
    checkSubscriptionStatus,
  };
};
