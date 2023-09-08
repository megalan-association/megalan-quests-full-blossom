import { useState } from "react";

interface Props {
  text: string;
}

const SeeMore: React.FC<Props> = ({ text }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {text.length > 100 && (
        <>
          {text.substring(0, 100)}
          {open && text.substring(100)}
          <button
            onClick={() => setOpen(!open)}
            className="inline-block pl-1 font-body text-pink underline decoration-pink"
          >
            {!open ? "see more" : "see less"}
          </button>
        </>
      )}
    </>
  );
};
export default SeeMore;
