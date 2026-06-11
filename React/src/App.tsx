import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import './App.css';

import { useCallback, useRef } from 'react';

import DataGrid, { Column, Paging, Selection } from 'devextreme-react/data-grid';

import dxCheckBox, { type InitializedEvent, type ValueChangedEvent } from 'devextreme/ui/check_box';
import dxDataGrid, { type SelectionChangedEvent, type ContentReadyEvent } from 'devextreme/ui/data_grid';

import { type EditorPreparingEventEx } from './types';
import { type SalesItem, sales } from './data';

function isSelectable(item: SalesItem): boolean {
  return item.approved;
}

function isSelectAll(dataGrid: dxDataGrid<SalesItem, number>): boolean | undefined {
  let items: SalesItem[] = [];
  dataGrid.getDataSource().store().load().then((data) => {
    items = data as SalesItem[];
  })
    .catch((error) => {
      console.error(error);
    });
  let selectableItems = items.filter(isSelectable);
  let selectedRowKeys = dataGrid.option('selectedRowKeys');
  if (!selectedRowKeys?.length) {
    return false;
  }
  return selectedRowKeys.length >= selectableItems.length ? true : undefined;
}

function App(): JSX.Element {
  const selectionRef = useRef<{ checkBoxUpdating: boolean; selectAllCheckBox: dxCheckBox | null }>({ checkBoxUpdating: false, selectAllCheckBox: null });

  const onEditorPreparing = useCallback((e: EditorPreparingEventEx<SalesItem, number>) => {
    let dataGrid = e.component;
    if (e.type !== 'selection') return;
    if (e.parentType === 'dataRow' && e.row && !isSelectable(e.row.data)) {
      e.editorOptions.disabled = true;
    }
    if (e.parentType === 'headerRow') {
      e.editorOptions.onInitialized = (evt: InitializedEvent): void => {
        if (evt.component) {
          selectionRef.current.selectAllCheckBox = evt.component;
        }
      };
      e.editorOptions.value = isSelectAll(dataGrid);
      e.editorOptions.onValueChanged = (evt: ValueChangedEvent): void => {
        if (!evt.event) {
          if (evt.previousValue && selectionRef.current.checkBoxUpdating) {
            evt.component.option('value', evt.previousValue);
          }
          return;
        }
        if (isSelectAll(dataGrid) === evt.value) {
          return;
        }
        const result = evt.value ? dataGrid.selectAll() : dataGrid.deselectAll();
        result.catch((error) => { console.error(error); });
        evt.event.preventDefault();
      };
    }
  }, []);

  const onSelectionChanged = useCallback((e: SelectionChangedEvent): void => {
    const deselectRowKeys: number[] = [];
    e.selectedRowsData.forEach((item) => {
      if (!isSelectable(item)) {
        deselectRowKeys.push(e.component.keyOf(item));
      }
    });
    if (deselectRowKeys.length) {
      e.component.deselectRows(deselectRowKeys).catch((error) => {
        console.error(error);
      });
    }

    selectionRef.current.checkBoxUpdating = true;
    const selectAllCheckBox = selectionRef.current.selectAllCheckBox;
    selectAllCheckBox?.option('value', isSelectAll(e.component));
    selectionRef.current.checkBoxUpdating = false;
  }, []);

  const onContentReady = useCallback((e: ContentReadyEvent): void => {
    const selectAllCheckBox = selectionRef.current.selectAllCheckBox;
    selectAllCheckBox?.option('value', isSelectAll(e.component));
  }, []);

  return (
    <DataGrid
      dataSource={sales}
      showBorders={true}
      keyExpr='orderId'
      onEditorPreparing={onEditorPreparing}
      onSelectionChanged={onSelectionChanged}
      onContentReady={onContentReady}
      remoteOperations={false}
    >
      <Selection
        mode='multiple'
        selectAllMode='allPages'
        showCheckBoxesMode='onClick'
      />
      <Paging defaultPageSize={10} />

      <Column dataField='orderId' caption='Order ID' width={90} />
      <Column dataField='city' />
      <Column dataField='country' width={180} />
      <Column dataField='region' />
      <Column dataField='date' dataType='date' />
      <Column dataField='amount' format='currency' width={90} />
      <Column dataField='approved' visible={false} />
    </DataGrid>
  );
}

export default App;
