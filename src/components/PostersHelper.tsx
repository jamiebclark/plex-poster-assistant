import { useEffect, useState } from "react";
import { FaPlus, FaX } from "react-icons/fa6";
import { v4 as uuid } from "uuid";
import loadTestData from "../data/testData";
import PlexApi from "../lib/PlexApi";
import loadPostersFromPage, {
  Poster,
  getPoster,
} from "../lib/loadPostersFromPage";
import AppButton from "./AppButton";
import PosterHelper from "./PosterHelper";

const USE_TEST_DATA = false;

type PostersHelperProps = {
  api: PlexApi;
};

export default function PostersHelper({ api }: PostersHelperProps) {
  const [posters, setPosters] = useState<Poster[]>([{}]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleAddPoster(poster?: Poster) {
    setPosters([...posters, getPoster(poster)]);
  }

  function handleRemovePoster(removeKey: number) {
    const reduced = posters.filter((_poster, key) => key !== removeKey);
    setPosters(reduced);
  }

  useEffect(() => {
    let isChanged = false;
    const copy = [...posters].map((poster) => {
      if (!poster.uuid) {
        poster.uuid = uuid();
        isChanged = true;
      }
      return poster;
    });
    if (isChanged) {
      setPosters(copy);
    }
  }, [posters]);

  useEffect(() => {
    setIsLoading(true);
    loadPostersFromPage().then((results) => {
      results?.forEach((poster) => setPosters((p) => [...p, poster]));
      setIsLoading(false);
    });

    if (USE_TEST_DATA) {
      loadTestData("thePosterDb", setPosters);
    }
  }, []);

  return (
    <div className="relative">
      {isLoading ? (
        <div className="absolute flex inset-0 bg-white bg-opacity-50 z-50 items-center justify-center">
          <span className="font-bold animate-pulse">Checking Page</span>
        </div>
      ) : (
        ""
      )}
      <div className="space-y-4 mb-4">
        {posters.map((poster, key) => {
          return (
            <div
              className="flex items-start w-full space-x-1"
              key={poster.uuid ?? key}
            >
              <PosterHelper
                className="flex-grow"
                onPosterChange={(changedPoster) => {
                  const newPosters = posters.map((poster, posterKey) => {
                    return posterKey === key ? changedPoster : poster;
                  });
                  setPosters(newPosters);
                }}
                initialPoster={poster}
                initialQueryText={poster?.title}
                api={api}
              />
              <AppButton
                className="flex-grow-0 w-8 h-8 rounded-full text-center"
                onClick={() => handleRemovePoster(key)}
                title="Remove Poster Row"
              >
                <FaX size={12} className="mx-auto" title="Remove Poster" />
              </AppButton>
            </div>
          );
        })}
      </div>
      <footer className="flex justify-center p-2">
        <AppButton
          className="flex items-center space-x-2"
          onClick={() => handleAddPoster()}
          title="Add a Poster Row"
        >
          <FaPlus />
          <span>Add Entry</span>
        </AppButton>
      </footer>
    </div>
  );
}
