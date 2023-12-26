import PersistInput from "../lib/PersistInput";
import AppButton from "./AppButton";
import TextInput from "./TextInput";
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
      <TextInput
        inputClassName="block w-full"
        label="Plex Base URL"
        labelClassName="block"
        onChange={(e) => baseUrl.handleChange(e)}
        placeholder="http://192.168.X.X:32400"
        value={baseUrl.value}
        type="url"
      />
      <TextInput
        inputClassName="block w-full"
        label="Plex Token"
        labelClassName="block"
        onChange={(e) => token.handleChange(e)}
        placeholder="Plex Token"
        value={token.value}
      />

      <footer>
        {hasAllSettings() ? <AppButton onClick={onClose}>Done</AppButton> : ""}
      </footer>
    </div>
  );
}
