import PersistInput from "../lib/PersistInput";
import AppButton from "./AppButton";
import Link from "./Link";
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
      <header>
        <h2 className="text-lg font-bold">Settings</h2>
        <p className="italic">
          In order to connect with Plex, you'll need to establish a connection
          to your local Plex server. This is done with a URL and a Plex Token.
        </p>
      </header>
      <div>
        <TextInput
          inputClassName="block w-full"
          label="Plex Base URL"
          labelClassName="block"
          onChange={(e) => baseUrl.handleChange(e)}
          placeholder="http://192.168.X.X:32400"
          value={baseUrl.value}
          type="url"
        />
        <p className="text-sm italic">
          This URL can be found in the{" "}
          <Link
            href="https://support.plex.tv/articles/200289506-remote-access/"
            target="_blank"
            rel="noreferrer"
          >
            Remote Access
          </Link>{" "}
          page of your Plex settings.
        </p>
      </div>
      <div>
        <TextInput
          inputClassName="block w-full"
          label="Plex Token"
          labelClassName="block"
          onChange={(e) => token.handleChange(e)}
          placeholder="XXXXXXXXXXXXXXXXXXXX"
          value={token.value}
        />
        <p className="text-sm italic">
          Plex provides instructions on{" "}
          <Link
            href="https://support.plex.tv/articles/200289506-remote-access/"
            target="_blank"
            rel="noreferrer"
          >
            how to locate your Plex Token
          </Link>
          .
        </p>
      </div>

      <footer>
        {hasAllSettings() ? <AppButton onClick={onClose}>Done</AppButton> : ""}
      </footer>
    </div>
  );
}
