import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';

import dxDataGrid, { SelectionChangedEvent, ContentReadyEvent } from 'devextreme/ui/data_grid';
import dxCheckBox, {
  InitializedEvent,
  ValueChangedEvent,
} from 'devextreme/ui/check_box';
import { SalesItem, Service } from './app.service';
import { EditorPreparingEventEx } from './app.types';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';

@Component({
  selector: 'app-root',
  imports: [DxButtonModule, DxDataGridModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  providers: [Service],
})
export class AppComponent {
  @ViewChild(DxDataGridComponent, { static: false })
    dataGrid!: DxDataGridComponent;

  dataSource: SalesItem[];

  selectAllCheckBox!: dxCheckBox;

  checkBoxUpdating = false;

  constructor(service: Service) {
    this.dataSource = service.getSales();
    this.onEditorPreparing = this.onEditorPreparing.bind(this);
    this.onSelectionChanged = this.onSelectionChanged.bind(this);
  }

  isSelectable(item: SalesItem): boolean {
    return item.approved;
  }

  isSelectAll = (dataGrid: dxDataGrid): boolean | undefined => {
    const selectableItems = this.dataSource.filter(this.isSelectable);
    const selectedRowKeys = dataGrid.option('selectedRowKeys');

    if (!selectedRowKeys?.length) {
      return false;
    }
    return selectedRowKeys.length >= selectableItems.length ? true : undefined;
  };

  onEditorPreparing(e: EditorPreparingEventEx<SalesItem, number>): void {
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
        result.catch((error) => { console.error(error); });
        e.event.preventDefault();
      };
    }
  }

  async onSelectionChanged(e: SelectionChangedEvent<SalesItem, number>): Promise<void> {
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

  onContentReady(e: ContentReadyEvent): void {
    this.selectAllCheckBox.option('value', this.isSelectAll(e.component));
  }
}
