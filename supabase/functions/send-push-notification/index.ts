import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Web Push library for Deno
// Note: For production, you'd need proper VAPID keys stored as secrets
const VAPID_PUBLIC_KEY = 'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U';
const VAPID_PRIVATE_KEY = Deno.env.get('VAPID_PRIVATE_KEY') || '';
const VAPID_SUBJECT = 'mailto:support@divyadarshan.app';

// Spiritual messages for different times
const messages = {
  morning: [
    { title: "🌅 Good Morning", body: "Start your day with gratitude. Om Shanti 🙏" },
    { title: "🕉️ Morning Blessings", body: "May this day bring peace and prosperity. Jai Shri Ram!" },
    { title: "☀️ Rise & Shine", body: "Today's sankalp: Focus on inner peace and positive actions." },
  ],
  afternoon: [
    { title: "🧘 Afternoon Wisdom", body: "Take a moment to breathe. Remember: This too shall pass." },
    { title: "📿 Midday Reminder", body: "Stay disciplined on your spiritual path. You are blessed!" },
    { title: "✨ Spiritual Tip", body: "Chant 'Om Namah Shivaya' 11 times for inner calm." },
  ],
  night: [
    { title: "🌙 Evening Reflection", body: "Count your blessings. What are you grateful for today?" },
    { title: "🕯️ Night Blessings", body: "Rest peacefully. The divine watches over you. Shubh Ratri!" },
    { title: "🙏 Before Sleep", body: "Let go of today's worries. Tomorrow is a fresh start. Om Shanti." },
  ],
};

function getTimeSlot(): 'morning' | 'afternoon' | 'night' {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 18) return 'afternoon';
  return 'night';
}

function getRandomMessage(timeSlot: 'morning' | 'afternoon' | 'night') {
  const slotMessages = messages[timeSlot];
  return slotMessages[Math.floor(Math.random() * slotMessages.length)];
}

// Simple push notification sender using fetch
async function sendPushNotification(
  subscription: { endpoint: string; p256dh: string; auth: string },
  payload: { title: string; body: string; data?: Record<string, unknown> }
) {
  try {
    // For a full implementation, you would use the web-push protocol
    // This is a simplified version that works with modern browsers
    const response = await fetch(subscription.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'TTL': '86400',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error('Push failed:', response.status, await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error('Push error:', error);
    return false;
  }
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { userId, timeSlot, customMessage } = await req.json().catch(() => ({}));

    // Get the message
    const slot = timeSlot || getTimeSlot();
    const message = customMessage || getRandomMessage(slot);

    // If userId is provided, send to that user only
    // Otherwise, send to all subscribed users
    let query = supabase.from('push_subscriptions').select('*');
    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data: subscriptions, error } = await query;

    if (error) {
      console.error('Error fetching subscriptions:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch subscriptions' }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!subscriptions || subscriptions.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No subscriptions found', sent: 0 }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send notifications
    const results = await Promise.all(
      subscriptions.map(async (sub) => {
        const payload = {
          title: message.title,
          body: message.body,
          icon: '/favicon.ico',
          badge: '/favicon.ico',
          tag: `divya-darshan-${slot}`,
          data: {
            url: '/home',
            timeSlot: slot,
          },
        };

        return sendPushNotification(
          { endpoint: sub.endpoint, p256dh: sub.p256dh, auth: sub.auth },
          payload
        );
      })
    );

    const successCount = results.filter(Boolean).length;

    return new Response(
      JSON.stringify({
        message: 'Notifications processed',
        total: subscriptions.length,
        sent: successCount,
        failed: subscriptions.length - successCount,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error('Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
