import React from 'react';
import useAuth from '@/hooks/useAuth';

function NaverPoint() {
  const { getUserType } = useAuth();
  const userType = getUserType();

  return (
    <div>
      {userType === 'junior' && (
        <div>리뷰쓰고, 1000네이버 포인트 받기</div>
      )}
    </div>
  );
}


export default NaverPoint;
