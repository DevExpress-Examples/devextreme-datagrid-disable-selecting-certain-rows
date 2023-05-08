import { EditorPreparingEvent } from "devextreme/ui/data_grid";

export type EditorPreparingEventEx<
  TRowData = any,
  TKey = any
> = EditorPreparingEvent<TRowData, TKey> & {
  type?: string;
};
