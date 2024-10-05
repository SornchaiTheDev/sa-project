import { Tag } from "../../types/tag";

export class TagModel implements Tag {
  constructor(private _name: Tag["name"]) {}

  public get name(): Tag["name"] {
    return this._name;
  }
}
