'use client';

import { useEffect } from 'react';

interface ChatbotProps {
  provider?: 'voiceflow' | 'crisp' | 'tawk' | 'custom';
  apiKey?: string;
}

export default function Chatbot({ provider = 'voiceflow', apiKey }: ChatbotProps) {
  useEffect(() => {
    // Only load chatbot in browser
    if (typeof window === 'undefined') return;

    // Check if API key is provided
    if (!apiKey && provider !== 'custom') {
      console.warn('Chatbot API key not provided. Chatbot will not be loaded.');
      return;
    }

    // Load the appropriate chatbot script based on provider
    switch (provider) {
      case 'voiceflow':
        loadVoiceflow(apiKey!);
        break;
      case 'crisp':
        loadCrisp(apiKey!);
        break;
      case 'tawk':
        loadTawk(apiKey!);
        break;
      default:
        console.log('Custom chatbot provider - implement your own logic');
    }
  }, [provider, apiKey]);

  return null; // Chatbot widgets are loaded via scripts
}

function loadVoiceflow(apiKey: string) {
  // Voiceflow Web Chat Widget
  // Get your API key from: https://www.voiceflow.com/
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.onload = () => {
    (window as any).voiceflow.chat.load({
      verify: { projectID: apiKey },
      url: 'https://general-runtime.voiceflow.com',
      versionID: 'production',
      // Customize the widget appearance
      assistant: {
        title: 'Penley Oil Assistant',
        description: 'How can we help you today?',
        image: '/logo.png',
        color: '#1a5232', // Penley green
        launcher: {
          text: 'Chat with us',
        },
      },
    });
  };
  script.src = 'https://cdn.voiceflow.com/widget/bundle.mjs';
  document.getElementsByTagName('head')[0].appendChild(script);
}

function loadCrisp(websiteId: string) {
  // Crisp Chat
  // Get your website ID from: https://crisp.chat/
  (window as any).$crisp = [];
  (window as any).CRISP_WEBSITE_ID = websiteId;

  const script = document.createElement('script');
  script.src = 'https://client.crisp.chat/l.js';
  script.async = true;
  document.getElementsByTagName('head')[0].appendChild(script);

  // Customize Crisp colors to match Penley branding
  (window as any).$crisp.push(['set', 'theme', 'color', '#1a5232']);
}

function loadTawk(propertyId: string) {
  // Tawk.to Chat
  // Get your property ID from: https://www.tawk.to/
  (window as any).Tawk_API = (window as any).Tawk_API || {};
  (window as any).Tawk_LoadStart = new Date();

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://embed.tawk.to/${propertyId}/default`;
  script.charset = 'UTF-8';
  script.setAttribute('crossorigin', '*');
  document.getElementsByTagName('head')[0].appendChild(script);

  // Customize appearance
  (window as any).Tawk_API.customStyle = {
    visibility: {
      desktop: {
        position: 'br', // bottom right
        xOffset: 20,
        yOffset: 20,
      },
      mobile: {
        position: 'br',
        xOffset: 10,
        yOffset: 10,
      },
    },
  };
}
