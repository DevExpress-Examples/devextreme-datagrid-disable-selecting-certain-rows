import { useCallback, useRef } from 'react';
import './App.css';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import DataGrid, {
  Column, Paging, Selection
} from 'devextreme-react/data-grid';


import { SalesItem, sales } from './data';
import dxDataGrid, { SelectionChangedEvent } from 'devextreme/ui/data_grid';
import { EditorPreparingEventEx } from './types';
import dxCheckBox, { InitializedEvent, ValueChangedEvent } from 'devextreme/ui/check_box';


function isSelectable(item: SalesItem) {
  return item.approved;
}
const isSelectAll = (dataGrid: dxDataGrid<SalesItem, number>) => {
  let items: SalesItem[] = [];
  dataGrid.getDataSource().store().load().then((data) => {
    items = data as SalesItem[];
  });
  let selectableItems = items.filter(isSelectable);
  let selectedRowKeys = dataGrid.option("selectedRowKeys");
  if (!selectedRowKeys || !selectedRowKeys.length) {
    return false;
  }
  return selectedRowKeys.length >= selectableItems.length ? true : undefined;
}

function App() {


  const selectionRef = useRef<{
    checkBoxUpdating: boolean,
    selectAllCheckBox: dxCheckBox | null
  }>({
    checkBoxUpdating: false,
    selectAllCheckBox: null
  });


  const onEditorPreparing = useCallback((e: EditorPreparingEventEx<SalesItem, number>) => {
    let dataGrid = e.component;
    if (e.type !== 'selection') return;
    if (e.parentType === 'dataRow' && e.row && !isSelectable(e.row.data))
      e.editorOptions.disabled = true;
    if (e.parentType === "headerRow") {
      e.editorOptions.onInitialized = (e: InitializedEvent) => {
        if (e.component)
          selectionRef.current.selectAllCheckBox = e.component;
      };
      e.editorOptions.value = isSelectAll(dataGrid);
      e.editorOptions.onValueChanged = (e: ValueChangedEvent) => {
        if (!e.event) {
          if (e.previousValue && selectionRef.current.checkBoxUpdating)
            e.component.option("value", e.previousValue);
          return;
        }
        if (isSelectAll(dataGrid) === e.value)
          return;
        e.value ? dataGrid.selectAll() : dataGrid.deselectAll();
        e.event.preventDefault();
      }
    }

  }, [])

  const onSelectionChanged = useCallback((e: SelectionChangedEvent) => {
    const deselectRowKeys: number[] = [];
    e.selectedRowsData.forEach((item) => {
      if (!isSelectable(item))
        deselectRowKeys.push(e.component.keyOf(item));
    });
    if (deselectRowKeys.length) {
      e.component.deselectRows(deselectRowKeys);
    }

    selectionRef.current.checkBoxUpdating = true;
    const selectAllCheckBox = selectionRef.current.selectAllCheckBox;
    selectAllCheckBox?.option("value", isSelectAll(e.component));
    selectionRef.current.checkBoxUpdating = false;
  }, [])
  return (
    <DataGrid
      dataSource={sales}
      showBorders={true}
      keyExpr="orderId"
      onEditorPreparing={onEditorPreparing}
      onSelectionChanged={onSelectionChanged}
      remoteOperations={false}
    >
      <Selection
        mode="multiple"
        selectAllMode="allPages"
        showCheckBoxesMode="onClick"
      />
      <Paging defaultPageSize={10} />

      <Column dataField="orderId" caption="Order ID" width={90} />
      <Column dataField="city" />
      <Column dataField="country" width={180} />
      <Column dataField="region" />
      <Column dataField="date" dataType="date" />
      <Column dataField="amount" format="currency" width={90} />
      <Column dataField="approved" visible={false} />
    </DataGrid>
  );
}

export default App;
