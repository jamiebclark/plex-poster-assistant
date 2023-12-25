import { ChangeEvent } from "react";


type State<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export default class PersistInput {
  public key: string;
  public state: State<string>;

  constructor(key: string, state: State<string>) {
    this.key = key;
    this.state = state;
    const sessionValue = localStorage.getItem(this.key);
    if (sessionValue) {
      this.set(sessionValue);
    }
  }

  public async load() {
    const result = await window.chrome?.storage?.sync?.get([this.key]);
    if (!result?.[this.key]) {
      return;
    }
    this.set(result[this.key]);
  }

  public handleChange(e: ChangeEvent<HTMLInputElement>) {
    this.set(e.target.value);
  }

  public set(value: string) {
    if (value === this.value) {
      return;
    }
    this.state[1](value);
    localStorage.setItem(this.key, value as string);

    window.chrome?.storage?.sync?.set({ [this.key]: value });
  }

  public get value(): string {
    return this.state[0];
  }
}
