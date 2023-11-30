'use client';
import ProgressBar from "@/components/Bar/ProgressBar";
import { PROFILE_DIRECTION, PROFILE_SUB_DIRECTION } from "@/constants/form/cProfileForm";

function AddTimePage() {
  return(
    <>
      <ProgressBar activeNum={1} />
      <h3>{PROFILE_DIRECTION.addTime}</h3>
      <div>{PROFILE_SUB_DIRECTION.addTime}</div>
    </>
  )
}

export default AddTimePage;