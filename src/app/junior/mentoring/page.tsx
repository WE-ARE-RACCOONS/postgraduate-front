import TapBar from '@/components/Bar/TapBar/TapBar';
import MentoringSpec from '@/components/MentoringSpec/MentoringSpec';
import React from 'react';

function JuniorMentoringPage() {
  const mentoId = 5;
  return (
    <div>
      <TapBar />
      <MentoringSpec  mentoringId  = {mentoId}/>
    </div>
  );
}

export default JuniorMentoringPage;
