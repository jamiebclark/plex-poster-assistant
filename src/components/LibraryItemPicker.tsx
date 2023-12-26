import classNames from "classnames";
import { ChangeEvent, useEffect, useState } from "react";
import { FaBook, FaMagnifyingGlass } from "react-icons/fa6";
import { v4 as uuid } from "uuid";
import { PlexPayload } from "../../@types/plex-payload";
import PlexApi from "../lib/PlexApi";
import usePrevious from "../utils/usePrevious";
import LibraryItemView from "./LibraryItemView";

type LibraryItemPickerProps = {
  initialQueryText?: string;
  onSelect?: (result: PlexPayload.Metadata) => void;
  api: PlexApi;
  className?: string;
  onError?: (error: unknown) => void;
};

export default function LibraryItemPicker({
  initialQueryText,
  onSelect,
  onError,
  api,
  className,
}: LibraryItemPickerProps) {
  const [queryText, setQueryText] = useState<string>(initialQueryText ?? "");
  const [selected, setSelected] = useState<PlexPayload.Metadata>();
  const [searchResults, setSearchResults] = useState<PlexPayload.Metadata[]>();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputId] = useState<string>(uuid());
  const [hasTyped, setHasTyped] = useState<boolean>(false);

  const prevQueryText = usePrevious(queryText);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (!queryText || (queryText === prevQueryText && hasTyped)) {
        return;
      }
      setLoading(true);
      try {
        const result = await api.getQuery(queryText);
        setLoading(false);
        if (!hasTyped && result?.length > 0) {
          setSelected(result[0]);
        }
        setSearchResults(result ?? []);
      } catch (error) {
        console.error(error);
        if (onError) {
          onError(error);
        }
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [queryText, hasTyped, prevQueryText, api, onError]);

  useEffect(() => {
    if (isFocused) {
      setShowDropdown(isFocused);
      return;
    }
    const timeoutId = setTimeout(() => {
      setShowDropdown(isFocused);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [isFocused]);

  useEffect(() => {
    if (onSelect && selected) {
      onSelect(selected);
    }
  }, [selected, onSelect]);

  useEffect(() => {}, []);

  async function handleQueryChange(e: ChangeEvent<HTMLInputElement>) {
    setQueryText(e.target.value);
  }

  function handleSetSelected(result: PlexPayload.Metadata) {
    setSelected(result);
  }

  return (
    <div className={className}>
      {selected ? (
        <div className="">
          <button
            className="w-full text-left"
            onClick={() => setSelected(undefined)}
          >
            <span className="flex items-center space-x-1 font-bold text-sm">
              <FaBook />
              <span>Plex Library Item</span>
            </span>
            <LibraryItemView api={api} metadata={selected} />
          </button>
        </div>
      ) : (
        <div className="relative">
          <label
            htmlFor={inputId}
            className="flex items-center space-x-1 font-bold text-sm"
          >
            <FaMagnifyingGlass />
            <span>Find in Plex</span>
          </label>
          <input
            id={inputId}
            className="border rounded p-4 w-full text-sm"
            type="text"
            onChange={(e) => handleQueryChange(e)}
            value={queryText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={() => setHasTyped(true)}
          />
          <div
            className={classNames(
              showDropdown ? "" : "opacity-0 pointer-events-none",
              "absolute z-10 bg-white shadow-lg inset-x-0"
            )}
          >
            {searchResults?.length ? (
              searchResults?.map((result, key) => {
                return (
                  <button
                    className="block w-full hover:bg-slate-400 transition-all"
                    key={key}
                    onClick={() => handleSetSelected(result)}
                  >
                    <LibraryItemView
                      imgSize="small"
                      api={api}
                      metadata={result}
                    />
                  </button>
                );
              })
            ) : (
              <div className="p-4 text-center">
                {loading ? "Loading" : "No results found"}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
