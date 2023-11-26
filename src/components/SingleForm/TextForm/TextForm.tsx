import { TextFormProps } from "@/types/form/textForm";
import { TextFormEl } from "./TextForm.styled";
import { useAtom } from "jotai";
import { sLabAtom, sProfessorAtom } from "@/stores/senior";

function TextForm(props: TextFormProps) {
  const [targetAtom, setTargetAtom] = useAtom(props.targetAtom == 'lab' ? sLabAtom : sProfessorAtom);

  return(
    <TextFormEl type="text" placeholder={props.placeholder} onChange={(e) => setTargetAtom(e.currentTarget.value)} />
  )
}

export default TextForm;