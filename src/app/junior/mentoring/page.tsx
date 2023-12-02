'use client';
import TapBar from '@/components/Bar/TapBar/TapBar';
import React, {useState, useEffect} from 'react';
import useAuth from '@/hooks/useAuth';
import DimmedModal from '@/components/Modal/DimmedModal';
import { createPortal } from 'react-dom';
import useModal from '@/hooks/useModal';
function JuniorMentoringPage() {

  return (
    <div>

        <TapBar />

    </div>
  );
}

export default JuniorMentoringPage;
