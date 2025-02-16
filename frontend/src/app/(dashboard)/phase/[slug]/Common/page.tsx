'use client';
import React, { useEffect, useState } from 'react';
import PageContainer from '@/components/layout/page-container';
import { postDataToAPI } from '@/lib/api';
import ViewScriptDisplay from '@/components/personal/features/marketing/GenerateReelScript';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function FAQAccordion() {
  const [industry, setIndustry] = useState('');
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<any>(null);

  async function getResponse() {
    setLoading(true);
    const res: any = await postDataToAPI("users/generateContent/", {
      industry,
      topic,
      is_reel: true,
    }, false);

    if (res.success) {
      console.log(res.data);
      setContent(res.data);
    }
    setLoading(false);
  }

  const data = {
    reel_script: {
      pre_production: {
        duration: "00:30",
        location: "Football field with vibrant graphics and energetic crowd",
        props: ["Football", "Tournament flyer"],
        outfits: ["Athletic wear", "Casual and stylish attire"],
        camera_angles: ["Dynamic drone shots", "POV angles capturing player action"]
      },
      hook: {
        opening_line: "Get ready for the kick-off of a lifetime! (Enthusiastic tone)",
        hook_style: "Challenge",
        camera_movement: "Quick pans and close-ups",
        expressions: "Excitement and anticipation",
        text_overlay: "Introducing Pitstop: Your Ultimate Football Tournament App #GameOn #TournamentFever"
      },
      script_breakdown: [
        {
          scene_number: 1,
          dialogue: "Tired of missing out on epic football tournaments? (Questioning tone)",
          actions: "Person scrolling through phone, frustrated",
          camera_movements: "Shaky handheld shots",
          transitions: "Wipe transition",
          text: null,
          duration: "00:05"
        },
        {
          scene_number: 2,
          dialogue: "Introducing Pitstop, the game-changer! (Enthusiastic tone)",
          actions: "Pitstop app logo and interface showcased",
          camera_movements: "Slow zoom and pan",
          transitions: "Dissolve transition",
          text: "Seamless tournament management at your fingertips!",
          duration: "00:07"
        },
        {
          scene_number: 3,
          dialogue: "Create, join, and manage tournaments with ease. (Informative tone)",
          actions: "Person using Pitstop app to create a tournament",
          camera_movements: "Over-the-shoulder shot",
          transitions: "Jump cut",
          text: "Customize brackets, schedules, and rules like a pro.",
          duration: "00:10"
        },
        {
          scene_number: 4,
          dialogue: "Our exclusive tournament is coming soon! (Hype-inducing tone)",
          actions: "Tournament flyer displayed with registration details",
          camera_movements: "Quick zoom and bounce",
          transitions: "Split-screen transition",
          text: "Prepare for an unforgettable experience with Pitstop.",
          duration: "00:08"
        }
      ],
      audio: {
        background_music: [
          "Stadium Chant by TeamSport (start at 00:05)",
          "Epic Orchestral Sport by AudioJungle (start at 00:15)"
        ],
        sound_effects: ["Crowd cheer (at 00:00)", "Whistle blow (at 00:10)"],
        voice_modulation: "Energetic and engaging",
        audio_mixing: "Balance background music, sound effects, and voiceover for optimal engagement"
      },
      trending_elements: {
        transitions: ["Split-screen for dynamic effect", "Jump cuts to create a fast-paced rhythm"],
        audio_trends: ["Epic orchestral music to evoke excitement", "Stadium crowd sounds for immersion"],
        formats: ["Challenge to engage viewers", "Educational content to showcase app features"],
        hashtags: ["#TournamentFever", "#FootballNation", "#SoccerGoals"]
      }
    }
  };

  return (
    <PageContainer>
      <div className='relative w-full px-6 pt-4 antialiased'>
        <form className='space-y-4' onSubmit={(e) => { e.preventDefault(); getResponse(); }}>
          <div>
            <label htmlFor="industry">Industry:</label>
            <Input
              type="text"
              id="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="topic">Topic:</label>
            <Input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className='mt-4'>Generate Content</Button>
        </form>
        {loading && <p>Loading...</p>}
        {content && <ViewScriptDisplay data={data} />}
      </div>
    </PageContainer>
  );
}
