'use client';
import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import PageContainer from '@/components/layout/page-container';
import { AccordionContent } from '@radix-ui/react-accordion';
import { fetchFromAPI, postDataToAPI } from '@/lib/api';
import { Button } from '@/components/ui/button';

export default function FAQAccordion() {

  const [content, setContent] = useState<any>(null);

  async function getResponse() {
    const res: any = await postDataToAPI("users/generateContent/", {
      industry: "tournament planning and organizing app",
      topic: "How we effectively manage a tournament from start to finish?",
      is_reel: true,
    }, false);

    if (res.success) {
      setContent(res.data);
    }

  }

  return (
    <PageContainer>
      <div className='relative w-full px-6 pt-4 antialiased'>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </div>
    </PageContainer>
  );
}

const faqContent = [
  {
    question:
      'What are the key objectives during the Launch & Execution phase?',
    answer: (
      <>
        <p>
          The main goals include ensuring a smooth deployment, closely
          monitoring system performance, and collecting real-time user feedback.
          Teams should also focus on addressing any early-stage issues and
          optimizing the product for scalability.
        </p>
        <p>
          Additionally, marketing efforts should align with launch timelines to
          maximize user engagement and adoption. Clear communication with
          stakeholders and end-users is crucial during this phase.
        </p>
      </>
    )
  },
  {
    question: 'How do we handle unexpected challenges during execution?',
    answer: (
      <>
        <p>
          Challenges should be managed through agile workflows, regular team
          check-ins, and a strong feedback loop. It's essential to document
          potential risks beforehand and have contingency plans in place.
        </p>
        <p>
          Encourage cross-functional collaboration to address bottlenecks
          quickly. Utilizing analytics and user insights helps make informed,
          data-driven decisions.
        </p>
      </>
    )
  },
  {
    question: 'What metrics should we track post-launch?',
    answer: (
      <>
        <p>Key performance indicators (KPIs) to track include:</p>
        <ul className='list-disc pl-5'>
          <li>
            User engagement metrics (active users, session duration, retention
            rate)
          </li>
          <li>System stability (uptime, error rates, response time)</li>
          <li>Customer support trends (common issues, resolution time)</li>
          <li>Revenue impact (conversion rates, subscription growth, ROI)</li>
        </ul>
        <p>
          Consistently analyzing these metrics ensures continuous improvement
          and helps in making strategic adjustments.
        </p>
      </>
    )
  },
  {
    question: 'How do we incorporate user feedback effectively?',
    answer: (
      <>
        <p>
          Collecting feedback through multiple channels such as surveys, direct
          user interviews, and usage analytics is critical. Prioritizing
          feedback based on impact and feasibility helps in making meaningful
          updates.
        </p>
        <p>
          Consider implementing A/B testing for new features to validate changes
          before a full rollout. Maintain transparency with users by sharing
          updates and responding to their concerns.
        </p>
      </>
    )
  },
  {
    question: 'What are the next steps after the execution phase?',
    answer: (
      <>
        <p>
          Once the execution phase is complete, the focus shifts to refining
          features based on insights, scaling operations, and ensuring long-term
          maintenance. Regularly updating documentation and improving onboarding
          processes will enhance user experience.
        </p>
        <p>
          Additionally, plan for version updates, explore automation for
          efficiency, and assess the feasibility of expanding to new markets or
          platforms.
        </p>
      </>
    )
  },
  {
    question: 'How do we ensure long-term sustainability post-launch?',
    answer: (
      <>
        <p>
          Sustainable growth requires continuous performance monitoring, a solid
          customer support system, and adapting to market trends. Establishing a
          feedback-driven development cycle ensures the product stays relevant.
        </p>
        <p>
          Investing in automation, optimizing infrastructure costs, and
          diversifying revenue streams help maintain financial stability.
          Encourage innovation while keeping a user-centric approach to maintain
          long-term engagement.
        </p>
      </>
    )
  }
];
