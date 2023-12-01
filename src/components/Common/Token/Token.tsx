'use client';
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";

function Token() {
  const { getAccessToken } = useAuth();

  useEffect(() => {
    getAccessToken();
  }, []);

  return (
    <></>
  )
}

export default Token;