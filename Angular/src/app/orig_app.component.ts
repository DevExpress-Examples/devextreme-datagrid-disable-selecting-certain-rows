import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';

import dxDataGrid, { SelectionChangedEvent } from 'devextreme/ui/data_grid';
import dxCheckBox, {
  InitializedEvent,
  ValueChangedEvent,
} from 'devextreme/ui/check_box';
import { Employee, Service } from './app.service';
import { EditorPreparingEventEx } from './app.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Service],
})
export class AppComponent {
  @ViewChild(DxDataGridComponent, { static: false })
    dataGrid!: DxDataGridComponent;

  dataSource: Employee[];

  selectAllCheckBox!: dxCheckBox;

  checkBoxUpdating = false;

  constructor(service: Service) {
    this.dataSource = service.getEmployees();
    this.onEditorPreparing = this.onEditorPreparing.bind(this);
    this.onSelectionChanged = this.onSelectionChanged.bind(this);
  }

  isSelectable(item: Employee): boolean {
    return item.Approved;
  }

  isSelectAll = (dataGrid: dxDataGrid): boolean | undefined => {
    const selectableItems = this.dataSource.filter(this.isSelectable);
    const selectedRowKeys = dataGrid.option('selectedRowKeys');

    if (!selectedRowKeys?.length) {
      return false;
    }
    return selectedRowKeys.length >= selectableItems.length ? true : undefined;
  };

  onEditorPreparing(e: EditorPreparingEventEx<Employee, number>): void {
    if (e.type !== 'selection') return;

    if (e.parentType === 'dataRow' && e.row && !this.isSelectable(e.row.data)) e.editorOptions.disabled = true;
    if (e.parentType === 'headerRow') {
      const dataGrid = e.component;
      e.editorOptions.value = this.isSelectAll(dataGrid);
      e.editorOptions.onInitialized = (e: InitializedEvent): void => {
        if (e.component) this.selectAllCheckBox = e.component;
      };
      e.editorOptions.onValueChanged = (e: ValueChangedEvent): void => {
        if (!e.event) {
          if (e.previousValue && !this.checkBoxUpdating) {
            e.component.option('value', e.previousValue);
          }
          return;
        }

        if (this.isSelectAll(dataGrid) === e.value) {
          return;
        }
        const result = e.value ? dataGrid.selectAll() : dataGrid.deselectAll();
        // eslint-disable-next-line no-console
        result.catch((error) => { console.error(error); });
        e.event.preventDefault();
      };
    }
  }

  async onSelectionChanged(e: SelectionChangedEvent<Employee, number>): Promise<void> {
    const deselectRowKeys: number[] = [];
    const dataGrid = e.component;
    e.selectedRowsData.forEach((item) => {
      if (!this.isSelectable(item)) deselectRowKeys.push(dataGrid.keyOf(item));
    });
    if (deselectRowKeys.length) {
      await dataGrid.deselectRows(deselectRowKeys);
    }
    this.checkBoxUpdating = true;
    this.selectAllCheckBox.option('value', this.isSelectAll(dataGrid));
    this.checkBoxUpdating = false;
  }
}
