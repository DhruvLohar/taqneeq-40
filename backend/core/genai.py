import google.generativeai as genai
from .prompts import *

# Configure Gemini API
genai.configure(api_key='AIzaSyAjU-G6ZALGIx3i5npDVr7PdBX7_Uxdw70')

# Initialize the model
model = genai.GenerativeModel('gemini-pro')

def get_gemini_response(prompt):
    response = model.generate_content(prompt)
    return response.text

def content_assistant(industry, topic, is_reel=False):

    if is_reel:
        full_prompt = getReelPrompt(industry, topic)
    else:
        full_prompt = getPostPrompt(industry, topic)

    response = get_gemini_response(full_prompt)
    
    return response