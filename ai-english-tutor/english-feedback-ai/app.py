import gradio as gr
from transformers import pipeline

generator = pipeline("text-generation", model="mistralai/Mistral-7B-Instruct-v0.1")

def get_feedback(user_input, history=""):
    prompt = f"""
You are an English conversation coach for Japanese learners. Correct grammar, give pronunciation advice, and ask a natural follow-up question. Be short and friendly.

Conversation so far:
{history}
Student: {user_input}
AI:"""

    output = generator(prompt, max_new_tokens=200, do_sample=True, temperature=0.7)[0]['generated_text']
    reply = output.split("AI:")[-1].strip()
    return reply

demo = gr.Interface(
    fn=get_feedback,
    inputs=[
        gr.Textbox(lines=2, placeholder="Student's response", label="Student"),
        gr.Textbox(lines=4, placeholder="Optional conversation history", label="Conversation History")
    ],
    outputs="text",
    title="🎙️ English Feedback AI",
    description="Practice English, get grammar corrections and follow-up questions!"
)

demo.launch()

