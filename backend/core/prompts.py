def getReelPrompt(industry, topic):
    REEL_GENERATION = f'''
    "Act as a viral content architect for the {industry} industry. Generate an ultra-detailed TikTok/Instagram Reel script about {topic} using EXCLUSIVELY this JSON structure:
    You have to return me a json that strucutre looks like the one provided below
    and you have to fill the fields with the information that you think is the best for the industry and topic provided
    also provide enough scenes that matches the duration of the video
    
    {{
    "reel_script": {{
        "pre_production": {{
            "duration": "exact mm:ss",
            "location": "specific setting description",
            "props": ["item1", "item2"],
            "outfits": ["style1", "style2"],
            "camera_angles": ["angle1 with lens type", "angle2"]
        }},
        "hook": {{
            "opening_line": "exact spoken text with (tone instructions)",
            "hook_style": "specific type from: question/statistic/challenge/trend",
            "camera_movement": "technique + speed",
            "expressions": "specific facial/body directions",
            "text_overlay": "exact words with color/style notes"
        }},
        "script_breakdown": [
            {{
            "scene_number": 1,
            "dialogue": "word-for-word script",
            "actions": "actor movements/prop usage",
            "camera_movements": "technique + duration",
            "transitions": "effect name + timing",
            "text": "on-screen text details",
            "duration": "mm:ss"
            }}
        ],
        "audio": {{
            "background_music": ["exact song name + artist", "moment to start (mm:ss)"],
            "sound_effects": ["SFX name + timestamp"],
            "voice_modulation": "specific pitch/speed changes",
            "audio_mixing": "layering instructions"
        }},
        "trending_elements": {{
            "transitions": ["named effect + tutorial reference"],
            "audio_trends": ["specific sound name + usage tip"],
            "formats": ["challenge/style name"],
            "hashtags": ["#format1", "#niche-specific"]
        }}
    }}
    }}

    MANDATORY RULES:
    1. Output ONLY valid JSON (NO markdown/text)
    2. Use null for empty fields
    3. Include 3-5 items in arrays
    4. Add technical specs (exact timestamps, trending sounds, camera settings)
    5. Mirror {industry}'s current viral patterns
    6. Use platform-specific terminology (TikTok/Instagram)
    7. Include at least 3 scene breakdowns
    8. Reference 2023-2024 trends only

    Prioritize: Platform algorithm preferences → Engagement triggers → Viral replication potential → Brand alignment"
    '''
    return REEL_GENERATION


def getPostPrompt(industry, topic):
    POST_PROMPT = f"""
            As a social media content expert for the {industry} industry, create a comprehensive social media post about {topic}.

            Please provide detailed specifications for:

            1. Post Copy Structure:
               - Attention-grabbing headline (3 options)
               - Hook sentence
               - Main content with storytelling elements
               - Bullet points or key takeaways
               - Emotional triggers
               - Call to action variations
               - Perfect emoji placement

            2. Visual Content Specifications:
               - Image type recommendations (carousel/single/video)
               - Detailed design elements
               - Color palette (with hex codes)
               - Font combinations
               - Layout suggestions
               - Key visual elements
               - Mood and style guide

            3. Hashtag Strategy:
               - Primary hashtags (high traffic)
               - Secondary hashtags (niche specific)
               - Trending hashtags
               - Brand hashtags
               - Location-based hashtags
               - Engagement hashtags
               - Maximum reach combination

            4. Optimization Guidelines:
               - Platform-specific adaptations
               - Best posting times (with timezone)
               - Engagement trigger phrases
               - Comment response templates
               - Content repurposing tips
               - Algorithm optimization tactics

            5. Analytics Focus Points:
               - Key metrics to track
               - Engagement rate targets
               - A/B testing suggestions
               - Performance indicators

            Make it data-driven, engaging, and perfectly aligned with current social media trends.
            """
            
    return POST_PROMPT