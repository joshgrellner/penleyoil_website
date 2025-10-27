# AI Chatbot Setup Guide for Penley Oil Website

## Overview

The website includes a flexible chatbot component that supports multiple providers. Choose the one that best fits your needs.

## Recommended Options

### 1. Voiceflow (Recommended for Penley Oil) ⭐

**Best for:** Custom AI conversations with natural language understanding

**Pros:**
- Design custom conversation flows
- Train on your specific services (fuel delivery, DEF, pricing, service areas)
- Professional appearance
- Can integrate with your backend systems
- Visual flow builder

**Pricing:** $50-$200/month depending on usage

**Setup Steps:**

1. **Sign up at [voiceflow.com](https://www.voiceflow.com/)**

2. **Create a new Agent:**
   - Choose "Web Chat" template
   - Name it "Penley Oil Assistant"

3. **Train your agent with these intents:**
   ```
   - "What are your service areas?"
     Response: "We serve Oklahoma City metro and surrounding areas..."

   - "How much does fuel delivery cost?"
     Response: "Pricing depends on volume and location. Let me help you get a quote..."

   - "Do you deliver DEF?"
     Response: "Yes! We have 20,000+ gallons of ISO 22241 certified DEF in stock..."

   - "Emergency fuel needed"
     Response: "We offer 24/7 emergency fueling! Call (405) 235-7553 immediately..."

   - "Request a quote"
     Action: Direct to /contact?quote=true
   ```

4. **Get your Project ID:**
   - Go to Settings → Project ID
   - Copy the project ID

5. **Add to your .env.local:**
   ```bash
   NEXT_PUBLIC_CHATBOT_PROVIDER=voiceflow
   NEXT_PUBLIC_CHATBOT_KEY=your-project-id-here
   ```

6. **Customize appearance:**
   - The chatbot is already styled with Penley green (#1a5232)
   - Logo will use your /logo.png

---

### 2. Crisp Chat

**Best for:** Live chat with AI backup

**Pros:**
- Free tier available
- Real team chat with AI fallback
- Mobile app for your team
- Email integration
- Shared inbox

**Pricing:** Free for basic, $25/month for Pro

**Setup Steps:**

1. **Sign up at [crisp.chat](https://crisp.chat/)**

2. **Get your Website ID:**
   - Go to Settings → Setup instructions
   - Find your website ID (looks like: `a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6`)

3. **Add to .env.local:**
   ```bash
   NEXT_PUBLIC_CHATBOT_PROVIDER=crisp
   NEXT_PUBLIC_CHATBOT_KEY=your-website-id-here
   ```

4. **Set up AI responses:**
   - Go to Plugins → Magic Reply
   - Add common questions about fuel delivery, pricing, services
   - Set business hours (Mon-Thu 7AM-4:30PM, Fri 7AM-4PM)

---

### 3. Tawk.to

**Best for:** Budget-friendly live chat

**Pros:**
- 100% free forever
- Live chat with agents
- Mobile apps
- Basic visitor monitoring

**Pricing:** Free

**Setup Steps:**

1. **Sign up at [tawk.to](https://www.tawk.to/)**

2. **Create a property** for penleyoil.com

3. **Get your Property ID:**
   - Go to Administration → Channels
   - Find your property ID in the embed code

4. **Add to .env.local:**
   ```bash
   NEXT_PUBLIC_CHATBOT_PROVIDER=tawk
   NEXT_PUBLIC_CHATBOT_KEY=your-property-id-here
   ```

---

## Implementation

The chatbot is already integrated into your website layout. Once you add the environment variables:

1. **Add to `.env.local`:**
   ```bash
   NEXT_PUBLIC_CHATBOT_PROVIDER=voiceflow  # or crisp, or tawk
   NEXT_PUBLIC_CHATBOT_KEY=your-api-key-here
   ```

2. **Restart your dev server:**
   ```bash
   npm run dev
   ```

3. **Test it out:**
   - Visit http://localhost:3001
   - You should see the chat widget in the bottom right corner
   - Try asking common questions

## Suggested Conversation Flows

### For Voiceflow Agent:

**Emergency Scenario:**
```
User: "I need fuel right now"
Bot: "We offer 24/7 emergency fueling! For immediate assistance,
      call (405) 235-7553.

      Or I can help you schedule a delivery. What do you need?"
```

**Quote Request:**
```
User: "How much for diesel delivery?"
Bot: "I'd be happy to help! Pricing depends on:
     • Volume (how many gallons?)
     • Delivery location
     • Frequency of deliveries

     Click here to request a custom quote: [Link to /contact?quote=true]"
```

**Service Area Check:**
```
User: "Do you deliver to Norman?"
Bot: "Yes! We serve Norman and the entire Oklahoma City metro area
     with next-day standard delivery. Same-day expedited service
     is also available.

     Would you like to schedule a delivery?"
```

**DEF Information:**
```
User: "Tell me about your DEF"
Bot: "We're your DEF experts!
     ✓ 20,000+ gallons always in stock
     ✓ ISO 22241 certified
     ✓ Bulk delivery or 2.5-gal jugs (packaged on-site)
     ✓ Next-day delivery

     What size do you need?"
```

## Pro Tips

1. **Train on FAQs:** Use data from your actual customer inquiries
2. **Include pricing guidelines:** Even if approximate, helps filter serious leads
3. **Always offer phone option:** Some customers prefer calling
4. **Collect leads:** If the chatbot can't answer, capture email/phone for follow-up
5. **Monitor conversations:** Review weekly to improve responses

## Testing Checklist

- [ ] Chatbot appears on desktop
- [ ] Chatbot appears on mobile
- [ ] Can answer basic service questions
- [ ] Links to quote form work
- [ ] Phone number is clickable
- [ ] Matches brand colors (Penley green)
- [ ] Doesn't block important content

## Support

If you need help with chatbot setup:
- Voiceflow: [docs.voiceflow.com](https://docs.voiceflow.com)
- Crisp: [help.crisp.chat](https://help.crisp.chat)
- Tawk: [help.tawk.to](https://help.tawk.to)

---

**Need a custom implementation?** The chatbot component in `/components/Chatbot.tsx` can be extended to support other providers or custom chat interfaces.
