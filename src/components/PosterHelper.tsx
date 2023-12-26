import classNames from "classnames";
import { useEffect, useState } from "react";
import { FaChevronRight, FaUpload } from "react-icons/fa6";
import { PlexPayload } from "../../@types/plex-payload";
import PlexApi from "../lib/PlexApi";
import { Poster, getPoster } from "../lib/loadPostersFromPage";
import usePrevious from "../utils/usePrevious";
import AppButton from "./AppButton";
import LibraryItemPicker from "./LibraryItemPicker";
import LibraryItemView from "./LibraryItemView";
import PosterPicker from "./PosterPicker";
type PosterHelperProps = {
  api: PlexApi;
  initialPoster?: Poster;
  initialQueryText?: string;
  className?: string;
  onPosterChange?: (v: Poster) => void;
  onQueryTextChange?: (v: string) => void;
};

function compareObjects(obj1: object, obj2: object) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export default function PosterHelper({
  api,
  initialPoster,
  initialQueryText,
  className,
  onPosterChange,
  onQueryTextChange,
}: PosterHelperProps) {
  const [poster, setPoster] = useState<Poster>(getPoster(initialPoster));
  const [libraryItem, setLibraryItem] = useState<PlexPayload.Metadata>();
  const [updated, setUpdated] = useState<PlexPayload.Metadata>();
  const [loading, setLoading] = useState<boolean>(false);
  const [enabled, setEnabled] = useState<boolean>(false);
  const [status, setStatus] = useState<
    "not-ready" | "ready" | "success" | "error"
  >("not-ready");

  const previousPoster = usePrevious<Poster>(poster);

  async function handleSubmit() {
    if (!libraryItem?.ratingKey) {
      throw new Error("No Library item selected");
    }
    if (!poster.url) {
      throw new Error("No poster selected");
    }
    setLoading(true);
    await api.setPoster(libraryItem.ratingKey, poster.url);
    const updatedMetadata = await api.getMetadata(libraryItem.ratingKey);
    setUpdated(updatedMetadata);
    setLoading(false);
  }

  useEffect(() => {
    setEnabled(!!(libraryItem?.ratingKey && poster.url));
  }, [libraryItem, poster.url]);

  useEffect(() => {
    if (
      onPosterChange &&
      (!previousPoster || !compareObjects(poster, previousPoster)) &&
      Object.keys(poster).length
    ) {
      onPosterChange(poster);
    }
  }, [poster, onPosterChange, previousPoster]);

  useEffect(() => {
    if (updated) {
      return setStatus("success");
    }
    setStatus(enabled ? "ready" : "not-ready");
  }, [enabled, updated]);

  function getStatusClass() {
    switch (status) {
      case "ready":
        return "border-sky-400";
      case "success":
        return "border-green-500";
      case "error":
        return "border-red-500";
    }
  }

  return (
    <div
      className={classNames(
        className,
        getStatusClass(),
        "border rounded relative"
      )}
    >
      {loading ? (
        <div className="inset-0 absolute bg-opacity-75 bg-white z-50 flex justify-center items-center ">
          <span className="text-lg font-bold animate-pulse">Loading</span>
        </div>
      ) : (
        ""
      )}
      {updated ? (
        <div className={classNames("w-full p-4")}>
          <h3 className="font-bold text-sm">Updated Plex Library Item</h3>
          <div className="flex-grow-0">
            <LibraryItemView api={api} metadata={updated} />
          </div>
        </div>
      ) : (
        <div className={classNames("flex  space-x-1")}>
          <div className="p-4 flex-grow">
            {initialQueryText ? (
              <h3 className="font-semibold text-sm opacity-50">
                {initialQueryText}
              </h3>
            ) : (
              ""
            )}
            <div className="flex items-center space-x-1">
              <div className="flex-grow">
                <PosterPicker
                  onChange={(p) => setPoster(p)}
                  initialPoster={poster}
                />
              </div>
              <FaChevronRight className="scale-x-75 opacity-25" size={45} />
              <div className="w-[40%]">
                <LibraryItemPicker
                  onSelect={(result) => setLibraryItem(result)}
                  api={api}
                  initialQueryText={initialQueryText}
                />
              </div>
            </div>
          </div>

          <div className="flex-col flex justify-center ">
            <AppButton
              className="text-center h-full px-4"
              onClick={() => handleSubmit()}
              disabled={!enabled}
              title="Update Poster"
              type={enabled ? "primary" : "default"}
            >
              <FaUpload className="mx-auto" title="Update Poster" />
            </AppButton>
          </div>
        </div>
      )}
    </div>
  );
}
