import classNames from "classnames";
import { PlexPayload } from "../../@types/plex-payload";
import PlexApi from "../lib/PlexApi";

type LibraryItemViewProps = {
  metadata: PlexPayload.Metadata;
  api: PlexApi;
  className?: string;
};
export default function LibraryItemView({
  metadata,
  api,
  className,
}: LibraryItemViewProps) {
  return (
    <div
      className={classNames(
        className,
        "border flex items-center space-x-2 text-left"
      )}
    >
      <img
        className="w-16 flex-shrink-0"
        alt={metadata?.title ?? "Preview image"}
        src={api.getThumbSrc(metadata)}
      />
      <div>
        <span className="block font-semibold text-sm">{metadata?.title}</span>
        <span className="block font-semibold text-xs opacity-50">
          {metadata?.type}
        </span>
      </div>
    </div>
  );
}
