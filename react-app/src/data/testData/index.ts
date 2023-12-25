import { Poster } from '../../lib/loadPostersFromPage';
import thePosterDb from './thePosterDb';

const config = { thePosterDb }

export default function loadTestData(key: keyof typeof config, setter: React.Dispatch<React.SetStateAction<Poster[]>>) {
  const posters = config[key] as Poster[]
  posters.forEach((poster) => setter((p) => [...p, poster]));
}