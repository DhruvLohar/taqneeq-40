def getReelPrompt(industry, topic):
    REEL_GENERATION = f"""
                As an expert social media content creator for the {industry} industry, create a detailed and engaging reel script about {topic}.
                Consider current trends, viral formats, and audience engagement patterns.

                Please provide an extremely detailed script with:

                1. Pre-Production Details:
                - Recommended video duration
                - Ideal filming location/background
                - Required props or materials
                - Outfit suggestions
                - Camera angles and shot types

                2. Hook (First 3 seconds):
                - Exact opening line with tone suggestions
                - Hook style (question/statistic/challenge/trend)
                - Camera movement description
                - Expression and gesture guidance
                - Text overlay suggestions

                3. Detailed Script Breakdown (Scene by Scene):
                Scene 1:
                - Exact dialogue/script
                - Action descriptions
                - Camera movements
                - Transition effects
                - On-screen text suggestions
                - Duration of scene

                Scene 2:
                [Continue for each scene with same detail level]

                4. Audio Guidelines:
                - Background music suggestions (specific trending songs)
                - Sound effects timing
                - Voice modulation tips
                - Audio mixing suggestions

                5. Visual Effects and Text:
                - Text overlay timings
                - Recommended fonts
                - Animation suggestions
                - Filter recommendations
                - Graphic element placements

                6. Call to Action:
                - Specific ending dialogue
                - Engagement prompt examples
                - Comment trigger questions
                - Follow-up content suggestions

                7. Technical Specifications:
                - Aspect ratio
                - Recommended editing apps
                - Export settings
                - Quality optimization tips

                8. Trending Elements to Include:
                - Current viral transitions
                - Popular audio trends
                - Trending formats in your niche
                - Viral hashtags

                9. Posting Strategy:
                - Best posting time
                - Caption template
                - Hashtag strategy
                - Engagement tactics
                - Cross-platform sharing tips

                10. Performance Optimization:
                    - Tips for authentic delivery
                    - Common mistakes to avoid
                    - Engagement boosting techniques
                    - Viral potential optimization

                Make the script extremely detailed, modern, and aligned with current {industry} trends. Include specific instructions for timing, transitions, and delivery.
    """
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