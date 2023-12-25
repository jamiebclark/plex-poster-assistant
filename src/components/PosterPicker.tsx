import classNames from "classnames";
import { ChangeEvent, useEffect, useState } from "react";
import { Poster, getPoster } from "../lib/loadPostersFromPage";

type PosterPickerProps = {
  initialPoster: Poster;
  className?: string;
  onChange?: (poster: Poster) => void;
};
export default function PosterPicker({
  initialPoster,
  onChange,
  className,
}: PosterPickerProps) {
  const [poster, setPoster] = useState<Poster>(getPoster(initialPoster));

  function handlePosterChange(e: ChangeEvent<HTMLInputElement>) {
    setPoster(
      getPoster({
        ...poster,
        url: e.target.value,
      })
    );
  }

  useEffect(() => {
    if (onChange) {
      onChange(poster);
    }
  }, [poster, onChange]);

  return (
    <div className={classNames(className, "flex items-start space-x-1")}>
      <div className="w-16 flex-shrink-0">
        {poster.thumb ? (
          <img className="w-full border" src={poster.thumb} alt="Thumbnail" />
        ) : (
          ""
        )}
      </div>
      <input
        className="border rounded p-4 w-full font-mono text-sm"
        type="text"
        placeholder="https://..."
        onChange={(e) => handlePosterChange(e)}
        value={poster.url}
      />
    </div>
  );
}
