import PersistInput from "../lib/PersistInput";
import AppButton from "./AppButton";

type SettingsProps = {
  baseUrl: PersistInput;
  token: PersistInput;
  onClose: () => void;
};
export default function Settings({ baseUrl, token, onClose }: SettingsProps) {
  function hasAllSettings() {
    return !!(baseUrl.value && token.value);
  }
  return (
    <div className="flex flex-col space-y-4">
      <div>
        <label className="block font-bold text-sm">Plex Base URL</label>

        <input
          className="border rounded p-2 font-mono text-lg block w-full"
          onChange={(e) => baseUrl.handleChange(e)}
          value={baseUrl.value}
          type="text"
          placeholder="Plex Base URL"
        />
      </div>
      <div>
        <label className="block font-bold text-sm">Plex Token</label>
        <input
          className="border rounded p-2 font-mono text-lg block w-full"
          onChange={(e) => token.handleChange(e)}
          value={token.value}
          type="text"
          placeholder="Plex Token"
        />
      </div>

      <footer>
        {hasAllSettings() ? <AppButton onClick={onClose}>Done</AppButton> : ""}
      </footer>
    </div>
  );
}
