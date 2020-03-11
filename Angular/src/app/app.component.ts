import { Component, ViewChild } from '@angular/core';
import { Employee, Service } from './app.service';
import {
  DxDataGridComponent
} from "devextreme-angular";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Service]
})

export class AppComponent {
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;

  dataSource: Employee[];
  selectAllCheckBox: any;
  checkBoxUpdating = false;

  constructor(service: Service) {
    this.dataSource = service.getEmployees();
    this.onEditorPreparing = this.onEditorPreparing.bind(this);
    this.onSelectionChanged = this.onSelectionChanged.bind(this);
  }

  isSelectable(item) {
    return item.Approved;
}

isSelectAll(dataGrid) {
    var items = [];

    dataGrid.getDataSource().store().load().done(function (data) {
        items = data;
    });

    var selectableItems = items.filter(this.isSelectable);
    var selectedRowKeys = dataGrid.option("selectedRowKeys");

    if (!selectedRowKeys.length) {
        return false;
    }
    return selectedRowKeys.length >= selectableItems.length ? true : undefined;
}

onEditorPreparing(e) {
    var dataGrid = e.component;
    if (e.command === "select") {
        if (e.parentType === "dataRow" && e.row) {
            if (!this.isSelectable(e.row.data))
                e.editorOptions.disabled = true;
        } else if (e.parentType === "headerRow") {
            e.editorOptions.onInitialized = (e) => {
                this.selectAllCheckBox = e.component;
            }
            e.editorOptions.value = this.isSelectAll(dataGrid);
            e.editorOptions.onValueChanged = (e) => {
                if (!e.event) {
                    if (e.previousValue && !this.checkBoxUpdating) {
                        e.component.option("value", e.previousValue);
                    }
                    return;
                }
                if(this.isSelectAll(dataGrid) === e.value) {
                    return;
                }

                e.value ? dataGrid.selectAll() : dataGrid.deselectAll();

                e.event.preventDefault();
            }
        }
    }
}

onSelectionChanged(e) {
    var deselectRowKeys = [];
    e.selectedRowsData.forEach((item) => {
        if (!this.isSelectable(item))
            deselectRowKeys.push(e.component.keyOf(item));
    });
    if (deselectRowKeys.length) {
        e.component.deselectRows(deselectRowKeys);
    }
    this.checkBoxUpdating = true;
    this.selectAllCheckBox.option("value", this.isSelectAll(e.component));
    this.checkBoxUpdating = false;
}
}
