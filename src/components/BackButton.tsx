import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

interface Props {
  href: string;
  text: string;
}
const BackButton: React.FC<Props> = ({ href, text }) => {
  return (
    <Link
      href={href}
      className="flex h-fit w-fit flex-row items-center space-x-2 rounded-2xl bg-gradient-to-br from-pink/20 to-pink/40 px-4 py-2 text-pink"
    >
      <ArrowLeftIcon className="h-4 w-4 md:h-6 md:w-6" />
      <p className="font-heading text-xs font-medium md:text-base">{text}</p>
    </Link>
  );
};

export default BackButton;
