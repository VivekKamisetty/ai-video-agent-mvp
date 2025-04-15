import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI

# Load environment variables (OPENAI_API_KEY) from .env
load_dotenv()
API_KEY = os.getenv("OPENAI_API_KEY")
if not API_KEY:
    raise RuntimeError("OPENAI_API_KEY not found in environment. Make sure you have a .env file.")

# Initialize OpenAI client
client = OpenAI(
    api_key=API_KEY
)

# Create FastAPI instance
app = FastAPI()

# Configure CORS (allow requests from your frontend)
origins = [
    "http://localhost:3000",   # If using Create React App
    "http://127.0.0.1:5173",   # If using Vite
    "http://localhost:5173"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model for POST request
class RequestBody(BaseModel):
    query: str  # The user’s question or request

@app.get("/")
def root():
    return {"message": "Hello from FastAPI + new openai library (responses API)"}

@app.post("/generate-text")
def generate_text(body: RequestBody):
    """
    Calls client.responses.create(...) to generate text.
    We'll use 'instructions' to shape the assistant's style,
    and 'input' to pass the user's query.
    """
    try:
        # For demonstration, let's use 'gpt-3.5-turbo' or 'gpt-4o' if you have that model.
        response = client.responses.create(
            model="gpt-3.5-turbo",  # or "gpt-4", "gpt-4o", etc., depending on your environment
            #instructions="You are a helpful coding assistant that talks like a pirate.",
            input=body.query
        )
        # The .output_text contains the generated result
        return {"text": response.output_text}
    except Exception as e:
        print("OpenAI Error:", e)
        raise HTTPException(status_code=500, detail=f"OpenAI Error: {str(e)}")
