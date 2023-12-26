import classNames from "classnames";
import { ChangeEvent, useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa6";
import { v4 as uuid } from "uuid";
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
  const inputId = uuid();

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
    <div className={classNames(className)}>
      <label
        htmlFor={inputId}
        className="font-bold text-sm flex items-center space-x-1"
      >
        <FaDownload />
        <span>Poster URL</span>
      </label>
      <div className={classNames("flex items-start space-x-1")}>
        <div className="w-16 flex-shrink-0">
          {poster.thumb ? (
            <img className="w-full border" src={poster.thumb} alt="Thumbnail" />
          ) : (
            ""
          )}
        </div>
        <input
          className="border rounded p-4 w-full font-mono text-sm"
          type="url"
          placeholder="https://..."
          onChange={(e) => handlePosterChange(e)}
          value={poster.url}
          id={inputId}
        />
      </div>
    </div>
  );
}
