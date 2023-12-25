import classNames from "classnames";
import { useEffect, useState } from "react";
import { FaGear } from "react-icons/fa6";
import AppButton from "./components/AppButton";
import PostersHelper from "./components/PostersHelper";
import Settings from "./components/Settings";
import PersistInput from "./lib/PersistInput";
import PlexApi from "./lib/PlexApi";

function App() {
  const [showSettings, setShowSettings] = useState<boolean>(false);

  const baseUrl = new PersistInput("basePlexUrl", useState<string>(""));
  const token = new PersistInput("plexToken", useState<string>(""));
  const plexApi = new PlexApi(baseUrl.value, token.value);

  function hasAllSettings() {
    return !!(baseUrl.value && token.value);
  }

  baseUrl.load();
  token.load();

  useEffect(() => {
    if (!baseUrl.state[0] || !token.state[0]) {
      setShowSettings((p) => true);
    }
  }, [baseUrl.state, token.state]);

  return (
    <div className="container mx-auto bg-slate-100">
      <header className="flex justify-between items-center mb-2 bg-slate-500 p-2">
        <div className="text-lg font-bold">Plex Poster Helper</div>
        <div>
          <AppButton
            onClick={() => setShowSettings(!showSettings)}
            title="Settings"
            className="rounded-full"
          >
            <FaGear title="Settings Icon" />
          </AppButton>
        </div>
      </header>

      <div className="px-1">
        {hasAllSettings() ? <PostersHelper api={plexApi} /> : ""}
      </div>

      <div
        className={classNames(
          showSettings ? "" : "opacity-0 pointer-events-none",
          "absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 z-50"
        )}
      >
        <div className="border rounded p-4 bg-white min-w-[300px]">
          <Settings
            baseUrl={baseUrl}
            token={token}
            onClose={() => setShowSettings(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
