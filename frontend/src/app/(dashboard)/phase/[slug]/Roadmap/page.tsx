import React from 'react';
import { Timeline } from '@/components/ui/timeline';
import PageContainer from '@/components/layout/page-container';

export default function LaunchExecutionRoadmap() {
  const roadmapData = [
    {
      title: 'Understanding the Problem',
      duration: '1-2 weeks',
      content: (
        <div>
          <h3 className='mb-2 text-lg font-semibold'>
            Identifying Pain Points & Market Needs
          </h3>
          <p className='mb-4 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm'>
            Conduct research to understand the challenges faced by tournament organizers, players, and audiences. Identify gaps in existing solutions and define how your app will solve these problems effectively.
          </p>

          <h4 className='mb-2 text-sm font-medium'>Things to Do:</h4>
          <ul className='mb-6 space-y-2'>
            <li className='flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm'>
              ✅ Interview event organizers, gamers, and referees
            </li>
            <li className='flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm'>
              ✅ Research competitors (e.g., Challonge, Toornament)
            </li>
            <li className='flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm'>
              ✅ Study tournament workflows and common pain points
            </li>
          </ul>
        </div>
      )
    },
    {
      title: 'Validating Your Idea',
      duration: '2-3 weeks',
      content: (
        <div>
          <h3 className='mb-2 text-lg font-semibold'>
            Testing Market Demand
          </h3>
          <p className='mb-4 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm'>
            Before investing time in development, ensure there’s demand for your app. Validate your idea by collecting real-world feedback.
          </p>

          <h4 className='mb-2 text-sm font-medium'>Things to Do:</h4>
          <ul className='mb-6 space-y-2'>
            <li className='flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm'>
              ✅ Create a simple survey and share it with tournament organizers
            </li>
            <li className='flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm'>
              ✅ Pitch your idea in online gaming communities and forums
            </li>
            <li className='flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm'>
              ✅ Join esports or sports management groups and seek feedback
            </li>
          </ul>
        </div>
      )
    },
    {
      title: 'Building a Proof of Concept',
      duration: '2-4 weeks',
      content: (
        <div>
          <h3 className='mb-2 text-lg font-semibold'>
            Creating a Prototype or Landing Page
          </h3>
          <p className='mb-4 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm'>
            Build a no-code prototype, wireframe, or landing page explaining your app concept. Drive potential users to sign up for updates.
          </p>

          <h4 className='mb-2 text-sm font-medium'>Things to Do:</h4>
          <ul className='mb-6 space-y-2'>
            <li className='flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm'>
              ✅ Use Figma or Balsamiq to create UI wireframes
            </li>
            <li className='flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm'>
              ✅ Launch a basic landing page using Carrd or Webflow
            </li>
            <li className='flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm'>
              ✅ Collect early sign-ups to gauge interest
            </li>
          </ul>
        </div>
      )
    },
    {
      title: 'Refining the Idea',
      duration: '2 weeks',
      content: (
        <div>
          <h3 className='mb-2 text-lg font-semibold'>
            Iterating Based on Feedback
          </h3>
          <p className='mb-4 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm'>
            Analyze feedback from potential users and mentors to refine your app’s core features, user experience, and unique selling points.
          </p>

          <h4 className='mb-2 text-sm font-medium'>Things to Do:</h4>
          <ul className='mb-6 space-y-2'>
            <li className='flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm'>
              ✅ Join startup accelerator programs or mentorship networks
            </li>
            <li className='flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm'>
              ✅ Validate pricing models with potential customers
            </li>
            <li className='flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm'>
              ✅ Prioritize features based on actual user needs
            </li>
          </ul>
        </div>
      )
    },
    {
      title: 'Defining MVP',
      duration: '2-3 weeks',
      content: (
        <div>
          <h3 className='mb-2 text-lg font-semibold'>
            Outlining the First Version of Your App
          </h3>
          <p className='mb-4 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm'>
            Now that your idea is validated, decide which features will be part of your MVP. Focus on solving one core problem effectively.
          </p>

          <h4 className='mb-2 text-sm font-medium'>Things to Do:</h4>
          <ul className='mb-6 space-y-2'>
            <li className='flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm'>
              ✅ List must-have vs. nice-to-have features
            </li>
            <li className='flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm'>
              ✅ Sketch the user journey from sign-up to tournament creation
            </li>
            <li className='flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm'>
              ✅ Decide on a technology stack (React Native, Firebase, etc.)
            </li>
          </ul>
        </div>
      )
    }
  ];


  return (
    <PageContainer>
      <section className='flex flex-col justify-start space-y-3 p-4'>
        <h1 className='mb-2 text-5xl font-bold'>Personalised Roadmap</h1>
        <p className='text-neutral-700 dark:text-neutral-300'>
          A comprehensive guide to successfully planning, developing, launching,
          and optimizing your product
        </p>
        <Timeline data={roadmapData} />
      </section>
    </PageContainer>
  );
}
