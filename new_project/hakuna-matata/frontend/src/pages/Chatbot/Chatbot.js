import React, { useState, useRef } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Sphere } from '@react-three/drei';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Chatbot.css';

const ChatbotAvatar = () => {
  return (
    <div className="avatar-placeholder" style={{ width: '100%', height: '300px', background: '#e0f2fe', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '10px' }}>🤖</div>
        <p style={{ color: '#0ea5a3', fontWeight: 'bold' }}>AI Assistant</p>
      </div>
    </div>
  );
};

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Local canned responses to common quick actions - Enhanced with more comprehensive wellness guidance
  const getLocalResponse = (text) => {
    const t = String(text || '').toLowerCase();
    if (!t) return null;
    
    // Relaxation and stress
    if (t.includes('how do i relax') || t.includes('relax')) 
      return 'Try a 3-minute breathing exercise — would you like me to start one for you? You can also explore our meditation garden or listen to calming nature sounds.';
    if (t.includes('stress') || t.includes('stressed')) 
      return 'I recommend short breaks, hydration, and 3-minute breathing exercises. Want to try one now? You can also try our stress detection feature to track your levels.';
    
    // Breathing
    if (t.includes('breath') || t.includes('breathe')) 
      return 'I can guide you through a breathing exercise. Click "Start Breathing" to open a guided session. Try the 4-7-8 technique: breathe in for 4, hold for 7, exhale for 8.';
    
    // Sleep
    if (t.includes('sleep') || t.includes('insomnia') || t.includes('can\'t sleep')) 
      return 'For better sleep, try: 1) Dim lights 1 hour before bed, 2) Avoid screens, 3) Try our evening relaxation routine, 4) Practice 4-4-4 breathing cycle. Would you like to start an evening wind-down session?';
    
    // Anxiety
    if (t.includes('anxious') || t.includes('anxiety') || t.includes('worried')) 
      return 'Anxiety is challenging. Try: 1) Grounding technique (5-4-3-2-1 senses), 2) Deep breathing, 3) Gentle movement like yoga. Our Vayu Mudra is specifically for anxiety relief. Want to learn it?';
    
    // Meditation
    if (t.includes('meditat')) 
      return 'Meditation is wonderful for mental clarity! Start with just 5 minutes. Try our Meditation Garden for an immersive 3D experience, or explore our guided body scan meditation.';
    
    // Yoga
    if (t.includes('yoga') || t.includes('mudra')) 
      return 'Yoga combines physical postures with breath control. Try our Morning Flow for energy, or explore 13 healing Mudras (hand gestures) for specific benefits like stress relief and focus.';
    
    // Energy and fatigue
    if (t.includes('tired') || t.includes('energy') || t.includes('fatigue')) 
      return 'Low energy? Try: 1) Prana Mudra (life force gesture), 2) Morning yoga flow, 3) Dance therapy for a mood boost, 4) Stay hydrated. Quick 5-minute dance session can work wonders!';
    
    // Focus and concentration
    if (t.includes('focus') || t.includes('concentrat') || t.includes('distract')) 
      return 'For better focus: 1) Try Gyan Mudra (knowledge gesture), 2) Practice mindful breathing, 3) Take regular breaks, 4) Try our typing challenge game. Would you like to try a focus-enhancing mudra?';
    
    // Mood
    if (t.includes('sad') || t.includes('down') || t.includes('depress')) 
      return 'I hear you. Small steps can help: 1) Try dance therapy to boost endorphins, 2) Practice gratitude with Anjali Mudra, 3) Listen to uplifting music, 4) Connect with nature sounds. Remember, it\'s okay to seek professional help too.';
    if (t.includes('happy') || t.includes('great') || t.includes('good')) 
      return 'That\'s wonderful! Keep the positive energy flowing with activities like yoga, meditation, or our virtual beach experience. Gratitude practice can amplify happiness!';
    
    // General wellness
    if (t.includes('wellness') || t.includes('health') || t.includes('wellbeing')) 
      return 'Holistic wellness includes: 1) Physical activity (yoga, dance), 2) Mental peace (meditation, breathing), 3) Emotional balance (journaling, music), 4) Rest (quality sleep). Explore our activities to find what resonates with you!';
    
    return null;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Check for a local canned response first (faster, offline-friendly)
      const local = getLocalResponse(input);
      if (local) {
        const botMessage = { text: local, sender: 'bot' };
        setMessages(prev => [...prev, botMessage]);
      } else {
        const response = await axios.post('/api/chatbot/message', { message: input });
        const botMessage = { text: response.data.reply, sender: 'bot' };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { text: 'Sorry, I am unable to respond right now.', sender: 'bot' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  };

  // Quick helper to send a prompt immediately
  const sendPrompt = (prompt) => {
    setInput(prompt);
    // small delay so input clears visibly
    setTimeout(() => { sendMessage(); }, 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h1>AI Chatbot</h1>
        <p>Talk to our AI assistant for support and guidance.</p>
      </div>
      <div className="chatbot-content">
        <div className="avatar-section">
          <ChatbotAvatar />
        </div>
        <div className="chat-section">
          <div className="chatbot-sidepanel">
            <div className="sidepanel-block">
              <h4>Quick Prompts</h4>
              <div className="quick-prompts">
                {['How do I relax?', 'I feel stressed', 'Help me sleep', 'Start breathing'].map((p, i) => (
                  <button key={i} onClick={() => {
                    if (p === 'Start breathing') navigate('/breathing', { state: { autoStart: true, initialDuration: 3 } });
                    else sendPrompt(p);
                  }} className="prompt-btn">{p}</button>
                ))}
              </div>
            </div>

            <div className="sidepanel-block">
              <h4>Mood check</h4>
              <div className="mood-buttons">
                {['Happy','Okay','Anxious','Sad'].map((m) => (
                  <button key={m} onClick={() => sendPrompt(`My mood: ${m}`)} className="mood-btn">{m}</button>
                ))}
              </div>
            </div>

            <div className="sidepanel-block">
              <h4>Resources</h4>
              <ul className="resource-list">
                <li><a href="https://www.who.int/health-topics/mental-health" target="_blank" rel="noreferrer">WHO: Mental health</a></li>
                <li><a href="https://www.mentalhealth.org.uk/" target="_blank" rel="noreferrer">MentalHealth.org</a></li>
              </ul>
            </div>
          </div>
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <p>{msg.text}</p>
              </div>
            ))}
            {loading && <div className="message bot loading">Typing...</div>}
            <div ref={messagesEndRef} />
          </div>
          <div className="input-section">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={loading}
            />
            <button onClick={sendMessage} disabled={loading || !input.trim()}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
