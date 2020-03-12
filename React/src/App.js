import React from 'react';

import DataGrid, {
  Column,
  Selection,
  Paging
} from 'devextreme-react/data-grid';
import { sales } from './data.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.onEditorPreparing = this.onEditorPreparing.bind(this);
    this.onSelectionChanged = this.onSelectionChanged.bind(this);

    this.state = {
      selectAllCheckBox: null,
      checkBoxUpdating : false
    };
  }

  render() {
    return (
        <DataGrid
          dataSource={sales}
          showBorders={true}
          keyExpr="orderId"
          onEditorPreparing={this.onEditorPreparing}
          onSelectionChanged={this.onSelectionChanged}
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

  isSelectable(item) {
    return item.approved;
  }

  isSelectAll(dataGrid) {
    let items = [];
    dataGrid.getDataSource().store().load().done(function (data) {
      items = data;
    });
    let selectableItems = items.filter(this.isSelectable);
    let selectedRowKeys = dataGrid.option("selectedRowKeys");
    if (!selectedRowKeys.length) {
      return false;
    }
    return selectedRowKeys.length >= selectableItems.length ? true : undefined;
  }

  onEditorPreparing(e) {
    let dataGrid = e.component;
    if (e.command === "select") {
      if (e.parentType === "dataRow" && e.row) {
        if (!this.isSelectable(e.row.data))
          e.editorOptions.disabled = true;
      } else if (e.parentType === "headerRow") {
        e.editorOptions.onInitialized = (e) => {
          this.setState({
            'selectAllCheckBox': e.component
          })
        };
        e.editorOptions.value = this.isSelectAll(dataGrid);
        e.editorOptions.onValueChanged = (e) => {
          if (!e.event) {
            if (e.previousValue && !this.state.checkBoxUpdating) {
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
    let deselectRowKeys = [];
    e.selectedRowsData.forEach((item) => {
      if (!this.isSelectable(item))
        deselectRowKeys.push(e.component.keyOf(item));
    });
    if (deselectRowKeys.length) {
      e.component.deselectRows(deselectRowKeys);
    }
    this.setState({
      'checkBoxUpdating': true
    });
    this.state.selectAllCheckBox.option("value", this.isSelectAll(e.component));
    this.setState({
      'checkBoxUpdating': false
    });
  }

}

export default App;
