import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Intro from './Intro';
import ScratchCard from './ScratchCard';
import Timeline from './Timeline';
import CardGallery from './CardGallery';
import Quiz from './Quiz';
import Finale from './Finale';

type Section = 'intro' | 'scratch' | 'timeline' | 'cards' | 'quiz' | 'finale';

export default function App() {
  const [currentSection, setCurrentSection] = useState<Section>('intro');

  const goTo = (section: Section) => setCurrentSection(section);

  return (
    <AnimatePresence mode="wait">
      {currentSection === 'intro' && (
        <Intro key="intro" onComplete={() => goTo('scratch')} />
      )}
      {currentSection === 'scratch' && (
        <ScratchCard key="scratch" onComplete={() => goTo('timeline')} />
      )}
      {currentSection === 'timeline' && (
        <Timeline key="timeline" onComplete={() => goTo('cards')} />
      )}
      {currentSection === 'cards' && (
        <CardGallery key="cards" onComplete={() => goTo('quiz')} />
      )}
      {currentSection === 'quiz' && (
        <Quiz key="quiz" onComplete={() => goTo('finale')} />
      )}
      {currentSection === 'finale' && (
        <Finale key="finale" />
      )}
    </AnimatePresence>
  );
}
