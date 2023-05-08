<script setup lang="ts">
import "devextreme/dist/css/dx.material.blue.light.compact.css";
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxSelection,
} from "devextreme-vue/data-grid";

import { sales } from "../data";
import type { SalesItem } from "../data";

import type dxDataGrid from "devextreme/ui/data_grid";
import type { SelectionChangedEvent } from "devextreme/ui/data_grid";

import type dxCheckBox from "devextreme/ui/check_box";
import type {
  InitializedEvent,
  ValueChangedEvent,
} from "devextreme/ui/check_box";

import type { EditorPreparingEventEx } from "../types";

let selectAllCheckBox: dxCheckBox;
let checkBoxUpdating = false;

const isSelectable = (item: SalesItem) => {
  return item.approved;
};

const isSelectAll = (dataGrid: dxDataGrid) => {
  const selectableItems = sales.filter(isSelectable);
  const selectedRowKeys = dataGrid.option("selectedRowKeys");

  if (!selectedRowKeys?.length) {
    return false;
  }
  return selectedRowKeys.length >= selectableItems.length ? true : undefined;
};

const onEditorPreparing = (e: EditorPreparingEventEx<SalesItem, number>) => {
  if (e.type !== "selection") return;

  if (e.parentType === "dataRow" && e.row && !isSelectable(e.row.data))
    e.editorOptions.disabled = true;
  if (e.parentType === "headerRow") {
    const dataGrid = e.component;
    e.editorOptions.value = isSelectAll(dataGrid);
    e.editorOptions.onInitialized = (e: InitializedEvent) => {
      if (e.component) selectAllCheckBox = e.component;
    };
    e.editorOptions.onValueChanged = (e: ValueChangedEvent) => {
      if (!e.event) {
        if (e.previousValue && !checkBoxUpdating) {
          e.component.option("value", e.previousValue);
        }
        return;
      }

      if (isSelectAll(dataGrid) === e.value) {
        return;
      }

      e.value ? dataGrid.selectAll() : dataGrid.deselectAll();
      e.event.preventDefault();
    };
  }
};

const onSelectionChanged = (e: SelectionChangedEvent<SalesItem, number>) => {
  const deselectRowKeys: number[] = [];
  const dataGrid = e.component;
  e.selectedRowsData.forEach((item) => {
    if (!isSelectable(item)) deselectRowKeys.push(dataGrid.keyOf(item));
  });
  if (deselectRowKeys.length) {
    dataGrid.deselectRows(deselectRowKeys);
  }
  checkBoxUpdating = true;
  selectAllCheckBox?.option("value", isSelectAll(dataGrid));
  checkBoxUpdating = false;
};
</script>
<template>
  <div>
    <DxDataGrid
      :data-source="sales"
      :show-borders="true"
      key-expr="orderId"
      :remoteOperations="false"
      @editor-preparing="onEditorPreparing"
      @selection-changed="onSelectionChanged"
    >
      <DxColumn :width="90" data-field="orderId" caption="Order ID" />
      <DxColumn data-field="city" />
      <DxColumn :width="180" data-field="country" />
      <DxColumn data-field="region" />
      <DxColumn data-field="date" data-type="date" />
      <DxColumn :width="90" data-field="amount" format="currency" />

      <DxPaging :page-size="10" />
      <DxSelection
        select-all-mode="allPages"
        show-check-boxes-mode="onClick"
        mode="multiple"
      />
    </DxDataGrid>
  </div>
</template>
