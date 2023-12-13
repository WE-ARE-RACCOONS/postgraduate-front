'use client';
import STapBar from '@/components/Bar/TapBar/SeniorTab/STabBar';
import React, { useState, useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import DimmedModal from '@/components/Modal/DimmedModal';
import { createPortal } from 'react-dom';
import useModal from '@/hooks/useModal';
function SeniorMentoringPage() {
  return (
    <div>
      <STapBar />
    </div>
  );
}

export default SeniorMentoringPage;
