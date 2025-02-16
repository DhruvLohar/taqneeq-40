import React from 'react';
import { Timeline } from '@/components/ui/timeline';
import PageContainer from '@/components/layout/page-container';

export default function LaunchExecutionRoadmap() {
  const roadmapData = [
    {
      title: 'Planning Phase',
      duration: '8-12 weeks',
      content: (
        <div>
          <h3 className='mb-2 text-lg font-semibold'>
            Initial Product Strategy
          </h3>
          <p className='mb-4 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm'>
            Define target audience, unique value proposition, and market
            positioning. Conduct competitor analysis and establish key
            performance indicators (KPIs) to measure success.
          </p>

          <h4 className='mb-2 text-sm font-medium'>Things to Avoid:</h4>
          <ul className='mb-6 space-y-2'>
            <li className='flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm'>
              <span className='text-red-500'>⚠️</span> Skipping market research
              or competitor analysis
            </li>
            <li className='flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm'>
              <span className='text-red-500'>⚠️</span> Setting vague or
              unmeasurable goals
            </li>
            <li className='flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm'>
              <span className='text-red-500'>⚠️</span> Attempting to target too
              broad an audience
            </li>
          </ul>
        </div>
      )
    },
    {
      title: 'Development Stage',
      duration: '12-16 weeks',
      content: (
        <div>
          <h3 className='mb-2 text-lg font-semibold'>Building the MVP</h3>
          <p className='mb-4 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm'>
            Develop a minimum viable product that addresses core user needs.
            Focus on essential features that deliver the primary value
            proposition while maintaining quality standards.
          </p>

          <h4 className='mb-2 text-sm font-medium'>Things to Avoid:</h4>
          <ul className='mb-6 space-y-2'>
            <li className='flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm'>
              <span className='text-red-500'>⚠️</span> Feature creep or scope
              expansion
            </li>
            <li className='flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm'>
              <span className='text-red-500'>⚠️</span> Postponing testing until
              the end of development
            </li>
            <li className='flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm'>
              <span className='text-red-500'>⚠️</span> Ignoring technical debt
              that could slow future iterations
            </li>
          </ul>
        </div>
      )
    },
    {
      title: 'Pre-Launch Preparation',
      duration: '4-6 weeks',
      content: (
        <div>
          <h3 className='mb-2 text-lg font-semibold'>
            Final Testing and Marketing Setup
          </h3>
          <p className='mb-4 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm'>
            Conduct thorough QA testing across different platforms. Prepare
            marketing materials, launch communications, and set up analytics
            tracking to monitor post-launch performance.
          </p>

          <h4 className='mb-2 text-sm font-medium'>Things to Avoid:</h4>
          <ul className='mb-6 space-y-2'>
            <li className='flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm'>
              <span className='text-red-500'>⚠️</span> Rushing final testing
              phases to meet deadlines
            </li>
            <li className='flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm'>
              <span className='text-red-500'>⚠️</span> Launching without proper
              monitoring tools in place
            </li>
            <li className='flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm'>
              <span className='text-red-500'>⚠️</span> Neglecting to prepare for
              potential server load issues
            </li>
          </ul>
        </div>
      )
    },
    {
      title: 'Launch Phase',
      duration: '2-4 weeks',
      content: (
        <div>
          <h3 className='mb-2 text-lg font-semibold'>
            Product Release and Initial Monitoring
          </h3>
          <p className='mb-4 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm'>
            Execute the launch plan with coordinated marketing efforts. Monitor
            system performance, user engagement, and respond quickly to critical
            issues or feedback.
          </p>

          <h4 className='mb-2 text-sm font-medium'>Things to Avoid:</h4>
          <ul className='mb-6 space-y-2'>
            <li className='flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm'>
              <span className='text-red-500'>⚠️</span> Disappearing after launch
              - stay engaged with users
            </li>
            <li className='flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm'>
              <span className='text-red-500'>⚠️</span> Ignoring negative
              feedback or user complaints
            </li>
            <li className='flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm'>
              <span className='text-red-500'>⚠️</span> Failing to have emergency
              response plans for critical issues
            </li>
          </ul>
        </div>
      )
    },
    {
      title: 'Post-Launch Optimization',
      duration: 'Ongoing (first 12 weeks critical)',
      content: (
        <div>
          <h3 className='mb-2 text-lg font-semibold'>
            Data-Driven Improvements
          </h3>
          <p className='mb-4 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm'>
            Analyze user behavior and feedback to make informed improvements.
            Prioritize fixes and enhancements based on impact and alignment with
            strategic goals.
          </p>

          <h4 className='mb-2 text-sm font-medium'>Things to Avoid:</h4>
          <ul className='mb-6 space-y-2'>
            <li className='flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm'>
              <span className='text-red-500'>⚠️</span> Making changes without
              data to support decisions
            </li>
            <li className='flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm'>
              <span className='text-red-500'>⚠️</span> Prioritizing minor
              cosmetic changes over critical functionality
            </li>
            <li className='flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm'>
              <span className='text-red-500'>⚠️</span> Overreacting to outlier
              feedback that doesn't represent your core users
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
