import { ChevronLeftIcon } from "@heroicons/react/24/solid";

interface BreadcrumbProp {
  handleBackAction: () => void;
  backText: string;
  currentPath: string;
}
export const BreadCrumb = ({
  handleBackAction,
  backText,
  currentPath,
}: BreadcrumbProp) => (
  <div className="flex mb-6">
    <div className="flex cursor-pointer" onClick={handleBackAction}>
      <ChevronLeftIcon className="w-[16px] font-bold mr-2" />
      <p className="pc-text-gray font-normal">
        {backText} <span className="mx-3 text-gray-300">{" / "}</span>{" "}
      </p>
    </div>

    <h6>{currentPath}</h6>
  </div>
);
