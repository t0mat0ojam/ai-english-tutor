"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [question, setQuestion] = useState("Tell me about your favorite hobby.");
  const [transcript, setTranscript] = useState("");
  const [feedback, setFeedback] = useState("");
  const recognitionRef = useRef<any>(null);
  const [listening, setListening] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        router.push("/login");
      } else {
        setUser(data.user);
      }
    };

    fetchUser();
  }, [router]);

  // Initialize voice recognition
  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = "en-US";

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const spokenText = event.results[0][0].transcript;
        setTranscript(spokenText);
        getFeedback(spokenText);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event);
      };

      recognitionRef.current = recognition;
    } else {
      console.log("Speech Recognition is not supported by this browser.");
    }
  }, []);

  const startListening = () => {
    setTranscript("");
    setFeedback("");
    setListening(true);
    recognitionRef.current?.start();
  };

  const stopListening = () => {
    setListening(false);
    recognitionRef.current?.stop();
  };

  const getFeedback = async (text: string) => {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ transcript: text, question }),
    });

    const data = await res.json();
    setFeedback(data.reply); // Show AI feedback
    setQuestion(data.nextQuestion); // Show next question from AI
  };

  return (
    <div style={{ textAlign: "center", padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>🎙️ Practice English with AI</h1>
      {user && <p>Logged in as: {user.email}</p>}

      <h2 style={{ marginTop: "30px" }}>🗣️ AI Question:</h2>
      <p style={{ fontSize: "1.2rem" }}>{question}</p>

      <button onClick={listening ? stopListening : startListening} style={{ margin: "20px", padding: "10px 20px", fontSize: "1.1rem" }}>
        {listening ? "🛑 Stop Listening" : "🎤 Start Speaking"}
      </button>

      {transcript && (
        <div style={{ marginTop: "20px", background: "#f5f5f5", padding: "15px", borderRadius: "10px" }}>
          <h3>You said:</h3>
          <p>{transcript}</p>
        </div>
      )}

      {feedback && (
        <div style={{ marginTop: "20px", background: "#e3ffe3", padding: "15px", borderRadius: "10px" }}>
          <h3>AI Feedback:</h3>
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
