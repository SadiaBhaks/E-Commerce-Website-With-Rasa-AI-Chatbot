import { useEffect, useState, useRef } from "react";
import "../Chatbot.css";

export default function Chatbot() {
  const [chatOpen, setChatOpen] = useState(false);
  const [resetCount, setResetCount] = useState(0);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatOpen && window.WebChat && chatContainerRef.current) {
      console.log("Initializing chat...");
      
      // Completely clear the container
      chatContainerRef.current.innerHTML = '';
      
      // Create a wrapper div that we control
      const wrapper = document.createElement('div');
      wrapper.className = 'rasa-wrapper';
      chatContainerRef.current.appendChild(wrapper);
      
      // Initialize WebChat inside our wrapper
      window.WebChat.default(
        {
          initPayload: "/greet",
          customData: { language: "en" },
          socketUrl: "http://localhost:5005",
          socketPath: "/socket.io/",
          hideWidgetHeader: true,
          showMessageIcon: false,
          params: { 
            storage: "session",
          },
          embedded: true,
        },
        wrapper
      );

      // Apply white theme styles
      setTimeout(applyWhiteThemeStyles, 1000);
    }
  }, [chatOpen, resetCount]);

  const applyWhiteThemeStyles = () => {
    console.log("Applying white theme styles...");
    
    const styleId = 'white-theme-styles';
    let style = document.getElementById(styleId);
    
    if (!style) {
      style = document.createElement('style');
      style.id = styleId;
      document.head.appendChild(style);
    }

    style.textContent = `
      /* Force white background on all containers */
      .white-theme-container .rcw-messages-container {
        background: white !important;
        border: 2px solid white !important;
      }
      
      .white-theme-container .rcw-sender {
        background: white !important;
        border: 2px solid white !important;
      }
      
      .white-theme-container .rcw-new-message {
        background: white !important;
        border: 1px solid #e5e7eb !important;
        color: #374151 !important;
      }
      
      /* Send button - white with blue icon */
      .white-theme-container .rcw-send {
        background: white !important;
        border: 1px solid #3b82f6 !important;
      }
      
      .white-theme-container .rcw-send-icon {
        fill: #3b82f6 !important;
        color: #3b82f6 !important;
      }
      
      /* Message bubbles - white */
      .white-theme-container .rcw-bubble {
        background: white !important;
        border: 1px solid #e5e7eb !important;
        color: #374151 !important;
      }
      
      /* User message bubbles - blue */
      .white-theme-container .rcw-client .rcw-bubble {
        background: #3b82f6 !important;
        color: white !important;
        border: none !important;
      }
      
      /* Quick replies */
      .white-theme-container .rcw-reply {
        background: white !important;
        border: 1px solid #3b82f6 !important;
        color: #3b82f6 !important;
      }
    `;
  };

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  const resetChat = () => {
    console.log("Nuclear reset...");
    
    // Clear ALL storage
    sessionStorage.clear();
    localStorage.clear();
    
    // Force component remount by changing key
    setResetCount(prev => prev + 1);
    
    // Close chat
    setChatOpen(false);
    
    // Remove any Rasa styles
    const rasaStyles = document.querySelectorAll('style[id*="rasa"], style[id*="theme"], style[id*="nuclear"]');
    rasaStyles.forEach(style => style.remove());
    
    // Reopen after delay
    setTimeout(() => {
      setChatOpen(true);
    }, 500);
  };

  return (
    <div className="chatbot-wrapper">
     
      <div className={`white-theme-container ${chatOpen ? 'visible' : 'hidden'}`}>
        <div 
          key={`chat-${resetCount}`}
          ref={chatContainerRef}
          className="rasa-holder"
        />
      </div>

     
      <div className="chatbot-controls">
        {chatOpen && (
          <button 
            className="reset-chat-button" 
            onClick={resetChat}
            title="Reset conversation"
          >
            🔄 Reset Chat
          </button>
        )}

        <button 
          className={`text-launcher ${chatOpen ? 'active' : ''}`}
          onClick={toggleChat}
          aria-label="Toggle chatbot"
        >
          <span className="launcher-text">Taste_Trove AI Assistant</span>
          <div className={`chat-indicator ${chatOpen ? 'open' : 'closed'}`}>
            {chatOpen ? '▲' : '▼'}
          </div>
        </button>
      </div>
    </div>
  );
}