import classNames from "classnames";
import { PlexPayload } from "../../@types/plex-payload";
import PlexApi from "../lib/PlexApi";

type LibraryItemViewProps = {
  metadata: PlexPayload.Metadata;
  api: PlexApi;
  className?: string;
  imgSize?: keyof typeof sizeClasses;
};

const sizeClasses = {
  default: "w-16",
  small: "w-8",
  large: "w-32",
};

export default function LibraryItemView({
  metadata,
  api,
  className,
  imgSize: customImgSize,
}: LibraryItemViewProps) {
  const imgSize = customImgSize ?? "default";
  const imgClass = () => (imgSize ? sizeClasses[imgSize] : null);

  const subtitle = [
    metadata.grandparentTitle,
    metadata.parentTitle,
    metadata?.type,
  ]
    .filter((t) => t)
    .join(" : ");
  return (
    <div
      className={classNames(
        className,
        "border flex items-center space-x-2 text-left"
      )}
    >
      <img
        className={classNames(imgClass(), "flex-shrink-0")}
        alt={metadata?.title ?? "Preview image"}
        src={api.getThumbSrc(metadata)}
      />
      <div>
        <span className="block font-semibold text-sm">{metadata.title}</span>
        <span className="block font-semibold text-xs opacity-50">
          {subtitle}
        </span>
      </div>
    </div>
  );
}
