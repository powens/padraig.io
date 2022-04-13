import React, { useMemo } from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Themed } from 'theme-ui';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import ProjectProgress from '../components/40k-log/ProjectProgress';
import { ProgressStep } from '../components/40k-log/types';

/**
 * jhead -purejpg *.jpeg
 */

const EXPECTED_STEPS = ['start', 'assembled', 'paint', 'done'];

const tauRawSteps = [
  '30/30 Fire Warriors [done] [fwall]',
  '13/22 Drone tops [paint]',
  '13/22 Drone bottoms (special, shield and markerlight bottoms) [paint]',
  '10/10 Pathfinders [done] [pall]',
  '7/7 Crisis suits [done] [c3]',
  '3/3 Broadsides [done]',
  '1/1 Ethereal [done]',
  '1/1 Commander 1 [done]',
  '1/1 Stormsurge [done]',
  '2/2 Devifish [done]',
  '0/1 Cadre Fireblade [assembled]',
  '1/1 Riptide [done]',
  '0/1 Dahyak Grekh [assembled]',
  '4/4 Stealth Suits [done]',
  '0/3 Shadowsun [assembled]',
  '0/1 Commander 2 [start]',
  '20/20 Kroot [done]',
  '0/4 Kroot Hounds [start]',
];

const spaceWolvesRawSteps = [
  '0/1 Indomitus Captain [start]',
  '0/1 Indomitus Lieutenant [assembled]',
  '0/1 Indomitus Chaplain [assembled]',
  '1/1 Chaplain on a Bike [done]',
  '0/1 Judiciar [assembled]',
  '0/1 Terminator Chaplain [start]',
  '1/1 Wolf Lord on a Thunderwolf [done]',
  '0/1 Canis Wolfborn [start]',
  '0/1 Ragnar Blackmane [assembled]',
  '1/1 Phobos Librarian [done]',
  '1/1 Librarian [done]',
  '10/10 Thunderwolf Cavalry [done]',
  '3/3 Bladeguard Veterans [assembled]',
  '0/1 Bladeguard Ancient [assembled]',
  '5/5 Assault Intercessors [done]',
  '1/5 Assault Intercessors [assembled]',
  '0/3 Outriders [assembled]',
  '3/3 Eradicators [done]',
  '1/1 Wulfen Dreadnought [done]',
  '0/1 Invictor Warsuit [assembled]',
  '10/10 Incursors [done]',
  '0/10 Intercessors [start]',
  '0/5 Hounds of Morkai [assembled]',
  '5/5 Fenrisian Wolves [done]',
  '15/15 Wolf Guard with Jump packs [done]',
  '0/5 Wolf Guard Terminators [start]',
  '12/12 Long Fangs [done]',
  '2/2 Cyberwolves [done]',
  '1/1 Redemptor Dreadnought [done]',
  '1/1 Jump Pack Captain [done]',
];

function parseStep(stepStr: string): ProgressStep | null {
  const regexp = /^(\d+)\/([\d?]+) ([\w ,/']+)(\([\w ,+']+\))? \[(\w+)\]/g;
  const match = regexp.exec(stepStr);

  if (!match) {
    console.error('Match is unexpectedly null');
    return null;
  }

  if (match.length < 5) {
    console.error(`Unexpected match length: ${match.length}`);
    return null;
  }

  const numDone = parseInt(match[1]);
  const numTotal = parseInt(match[2]) || -1;
  const name = match[3].trim();
  const notes = match[4] ? match[4].substr(1, match[4].length - 2) : undefined;
  const status = match[5];

  if (!EXPECTED_STEPS.includes(status)) {
    console.error(`Step ${stepStr} unknown status ${status}`);
  }

  return {
    numDone,
    numTotal,
    name,
    notes,
    status,
  };
}

function parseSteps(steps: Array<string>): Array<ProgressStep> {
  return steps.map((d) => parseStep(d)).filter(Boolean) as Array<ProgressStep>;
}

const updates = [
  {
    date: Date.parse('27 Mar 2021 00:00:00 GMT'),
    notes: [
      'Started painting Riptide',
      'Painted 5 Assault Intercessors',
      'Painted 5 Fenrisian Wolves',
    ],
  },
  {
    date: Date.parse('15 Jan 2021 00:00:00 GMT'),
    notes: [
      'Built Invictor',
      'Built Hounds of Morkai',
      'Started painting the Riptide',
      'Half-built Chaplain on a Bike',
    ],
  },
  {
    date: Date.parse('08 Jan 2021 00:00:00 GMT'),
    notes: [
      'Built Stealth Suits',
      'Built Shadowsun',
      'Built Ragnar',
      'Built Fenrisian Wolves',
      'Built 5 Assault Ints',
      'Built 3 Eradicators',
    ],
  },
  {
    date: Date.parse('28 Dec 2020 00:00:00 GMT'),
    notes: [
      'Delays due to Cyberpunk',
      'Started, and finished Coldstar Commander',
      'Built Riptide',
      'Built 3 Thunderwolf Cavalry',
      'Built Cadre Fireblade',
    ],
  },
  {
    date: Date.parse('7 Nov 2020 00:00:00 GMT'),
    notes: [
      'Finished the Broadside (finally)',
      'Started work on the first commander',
    ],
  },
  {
    date: Date.parse('3 Oct 2020 00:00:00 GMT'),
    notes: [
      'Painting progress has been slowed by IRL factors',
      'Work on the Broadside continues',
    ],
  },
  {
    date: Date.parse('26 Sept 2020 00:00:00 GMT'),
    notes: [
      'Finished last 3 Crisis suits, and their 6 weapons',
      'Started work on the Broadside',
    ],
  },
  {
    date: Date.parse('05 Sept 2020 00:00:00 GMT'),
    notes: [
      'Slowed down work due to playing more 40k... Whoops!',
      'Finished Ethereal',
      'Continuing work on 3 remaining Crisis suits',
      'Added some more items to the pile of shame',
    ],
  },
  {
    date: Date.parse('15 Aug 2020 00:00:00 GMT'),
    notes: [
      'Finished 5 drones with bottoms',
      'Started Ethereal, and 3 remaining Crisis suits',
    ],
  },
  {
    date: Date.parse('8 Aug 2020 00:00:00 GMT'),
    notes: [
      'Finished the first 500 points of Marines, and Necrons in the Indomitus box',
      'Started, and finished the MDF terrain I bought from Northern Lights Terrain',
      'Started 5 more drones',
    ],
  },
  {
    date: Date.parse('1 Aug 2020 00:00:00 GMT'),
    notes: [
      'Finished the first 3 Crisis suits with 2 weapons each',
      'Started assembling the Indomtius box x.x',
    ],
  },
  {
    date: Date.parse('18 Jul 2020 00:00:00 GMT'),
    notes: ['Finished the 6 Fire Warriors', 'Started the first Crisis suit'],
  },
  {
    date: Date.parse('11 Jul 2020 00:00:00 GMT'),
    notes: ['Started remaining 6 Fire Warriors'],
  },
  {
    date: Date.parse('4 Jul 2020 00:00:00 GMT'),
    notes: [
      'Finished first 6 Pathfinders',
      'Stripped the 4 Fire Warriors',
      'Finished 3 magnetized Pathfinders with Rail Rifles',
      'Finished remaining Pathfinders',
    ],
  },
  {
    date: Date.parse('27 Jun 2020 00:00:00 GMT'),
    notes: ['Started work on Pathfinders', 'Finished 8 drones'],
  },
  {
    date: Date.parse('21 Jun 2020 00:00:00 UTC'),
    notes: ['Finished 13 Fire warriors'],
  },
];

interface Props {
  data: any;
}

function ProjectLog({ data }: Props): JSX.Element {
  const tauSteps = useMemo(() => parseSteps(tauRawSteps), []);
  const spaceWolvesSteps = useMemo(() => parseSteps(spaceWolvesRawSteps), []);

  return (
    <Layout>
      <SEO
        title="Warhammer 40k project log"
        description="A page tracking my progress through the Warhammer 40k hobby"
        keywords={['warhammer', '40k', 'hobby', 'log', 'Tau']}
      />
      <section style={{ marginBottom: '3rem' }}>
        <Themed.h2>Warhammer 40k Project log</Themed.h2>
        <Themed.p>
          During the lockdown, I dug my Warhammer 40k T&apos;au army out of
          storage. I original started to get into the hobby in 2016, but stopped
          due to burnout. My goal is to finish painting, and assembling this
          army. This page serves both as a log, and as a reminder of all the
          work I&apos;ve put in to the hobby. Eventually it will track all my
          40k endeavours.
        </Themed.p>
        <GatsbyImage
          image={data.file.childImageSharp.gatsbyImageData}
          alt="Unpainted, mostly assembled T'au army"
        />
        <GatsbyImage
          image={data.halfDone.childImageSharp.gatsbyImageData}
          alt="About half of my Tau force painted"
        />
      </section>

      <Themed.h2>T&apos;au army progress</Themed.h2>
      <ProjectProgress steps={tauSteps} />

      <Themed.h2>Space Wolves progress</Themed.h2>
      <ProjectProgress steps={spaceWolvesSteps} />

      <section>
        <Themed.h3>Updates</Themed.h3>
        <section>
          {updates.map((d) => (
            <React.Fragment key={d.date}>
              <Themed.h4>{new Date(d.date).toDateString()}</Themed.h4>
              <Themed.ul>
                {d.notes.map((j) => (
                  <Themed.li key={j}>{j}</Themed.li>
                ))}
              </Themed.ul>
            </React.Fragment>
          ))}
        </section>
      </section>
    </Layout>
  );
}

export default ProjectLog;

export const query = graphql`
  {
    file(relativePath: { eq: "40k/start/start0.jpeg" }) {
      childImageSharp {
        gatsbyImageData(width: 800, placeholder: BLURRED, layout: CONSTRAINED)
      }
    }
    halfDone: file(relativePath: { eq: "40k/half-done.jpeg" }) {
      childImageSharp {
        gatsbyImageData(width: 800, placeholder: BLURRED, layout: CONSTRAINED)
      }
    }
  }
`;
