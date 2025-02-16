import React from 'react';
import { Button } from '@/components/ui/button'; // shadcn Button component
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'; // shadcn Card components

interface ReelScript {
  reel_script: {
    pre_production: {
      duration: string;
      location: string;
      props: string[];
      outfits: string[];
      camera_angles: string[];
    };
    hook: {
      opening_line: string;
      hook_style: string;
      camera_movement: string;
      expressions: string;
      text_overlay: string;
    };
    script_breakdown: {
      scene_number: number;
      dialogue: string;
      actions: string;
      camera_movements: string;
      transitions: string;
      text: string;
      duration: string;
    }[];
    audio: {
      background_music: string[];
      sound_effects: string[];
      voice_modulation: string;
      audio_mixing: string;
    };
    trending_elements: {
      transitions: string[];
      audio_trends: string[];
      formats: string[];
      hashtags: string[];
    };
  };
}

interface ReelScriptDisplayProps {
  data: ReelScript;
}

const ViewScriptDisplay: React.FC<ReelScriptDisplayProps> = ({ data }) => {
  return (
    <Card className="w-full max-w-4xl mx-auto p-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Reel Script Details</CardTitle>
        <CardDescription>Detailed breakdown of the reel script for tournament planning.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Pre-Production */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Pre-Production</h3>
          <p><strong>Duration:</strong> {data.reel_script.pre_production.duration}</p>
          <p><strong>Location:</strong> {data.reel_script.pre_production.location}</p>
          <p><strong>Props:</strong> {data.reel_script.pre_production.props.join(', ')}</p>
          <p><strong>Outfits:</strong> {data.reel_script.pre_production.outfits.join(', ')}</p>
          <p><strong>Camera Angles:</strong> {data.reel_script.pre_production.camera_angles.join(', ')}</p>
        </div>

        {/* Hook */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Hook</h3>
          <p><strong>Opening Line:</strong> {data.reel_script.hook.opening_line}</p>
          <p><strong>Hook Style:</strong> {data.reel_script.hook.hook_style}</p>
          <p><strong>Camera Movement:</strong> {data.reel_script.hook.camera_movement}</p>
          <p><strong>Expressions:</strong> {data.reel_script.hook.expressions}</p>
          <p><strong>Text Overlay:</strong> {data.reel_script.hook.text_overlay}</p>
        </div>

        {/* Script Breakdown */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Script Breakdown</h3>
          {data.reel_script.script_breakdown.map((scene, index) => (
            <div key={index} className="mb-4">
              <h4 className="text-lg font-medium">Scene {scene.scene_number}</h4>
              <p><strong>Dialogue:</strong> {scene.dialogue}</p>
              <p><strong>Actions:</strong> {scene.actions}</p>
              <p><strong>Camera Movements:</strong> {scene.camera_movements}</p>
              <p><strong>Transitions:</strong> {scene.transitions}</p>
              <p><strong>Text:</strong> {scene.text}</p>
              <p><strong>Duration:</strong> {scene.duration}</p>
            </div>
          ))}
        </div>

        {/* Audio */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Audio</h3>
          <p><strong>Background Music:</strong> {data.reel_script.audio.background_music.join(', ')}</p>
          <p><strong>Sound Effects:</strong> {data.reel_script.audio.sound_effects.join(', ')}</p>
          <p><strong>Voice Modulation:</strong> {data.reel_script.audio.voice_modulation}</p>
          <p><strong>Audio Mixing:</strong> {data.reel_script.audio.audio_mixing}</p>
        </div>

        {/* Trending Elements */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Trending Elements</h3>
          <p><strong>Transitions:</strong> {data.reel_script.trending_elements.transitions.join(', ')}</p>
          <p><strong>Audio Trends:</strong> {data.reel_script.trending_elements.audio_trends.join(', ')}</p>
          <p><strong>Formats:</strong> {data.reel_script.trending_elements.formats.join(', ')}</p>
          <p><strong>Hashtags:</strong> {data.reel_script.trending_elements.hashtags.join(', ')}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ViewScriptDisplay;