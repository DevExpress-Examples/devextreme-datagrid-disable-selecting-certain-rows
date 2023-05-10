$(function () {
    $("#gridContainer").dxDataGrid({
        dataSource: sales,
        keyExpr: "orderId",
        showBorders: true,
        remoteOperations: false,
        columnWidth: 100,
        selection: {
            mode: "multiple",
            selectAllMode: "allPages",
            showCheckBoxesMode: "onClick"
        },
        paging: {
            pageSize: 10
        },
        columns: [{
            dataField: "orderId",
            caption: "Order ID",
            width: 90
        },
            "city", {
            dataField: "country",
            width: 180
        },
            "region", {
            dataField: "date",
            dataType: "date"
        }, {
            dataField: "amount",
            format: "currency",
            width: 90
        }, {
            dataField: "approved",
            visible: false
        }],
        onEditorPreparing: onEditorPreparing,
        onSelectionChanged: onSelectionChanged
    }).dxDataGrid("instance");
});

let selectAllCheckBox;
let checkBoxUpdating = false;

function isSelectable(item) {
    return item.approved;
}

function isSelectAll(dataGrid) {
    var items = [];

    dataGrid.getDataSource().store().load().done(function (data) {
        items = data;
    });

    var selectableItems = items.filter(isSelectable);
    var selectedRowKeys = dataGrid.option("selectedRowKeys");

    if (!selectedRowKeys.length) {
        return false;
    }
    return selectedRowKeys.length >= selectableItems.length ? true : undefined;
}

function onEditorPreparing(e) {
    let dataGrid = e.component;
    if (e.type !== 'selection') return;
    if (e.parentType === 'dataRow' && e.row && !isSelectable(e.row.data))
        e.editorOptions.disabled = true;
    if (e.parentType === "headerRow") {
        e.editorOptions.onInitialized = (e) => {
            if (e.component)
                selectAllCheckBox = e.component;
        };
        e.editorOptions.value = isSelectAll(dataGrid);
        e.editorOptions.onValueChanged = (e) => {
            if (!e.event) {
                if (e.previousValue && checkBoxUpdating)
                    e.component.option("value", e.previousValue);
                return;
            }
            if (isSelectAll(dataGrid) === e.value)
                return;
            e.value ? dataGrid.selectAll() : dataGrid.deselectAll();
            e.event.preventDefault();
        }
    }
}

function onSelectionChanged(e) {
    var deselectRowKeys = [];
    e.selectedRowsData.forEach((item) => {
        if (!isSelectable(item))
            deselectRowKeys.push(e.component.keyOf(item));
    });
    if (deselectRowKeys.length) {
        e.component.deselectRows(deselectRowKeys);
    }
    checkBoxUpdating = true;
    selectAllCheckBox.option("value", isSelectAll(e.component));
    checkBoxUpdating = false;
}

const sales = [{
    "orderId": 10248,
    "region": "North America",
    "country": "United States",
    "city": "New York",
    "amount": 1740,
    "date": "2013/01/06",
    "approved": false
}, {
    "orderId": 10249,
    "region": "North America",
    "country": "United States",
    "city": "Los Angeles",
    "amount": 850,
    "date": "2013/01/13",
    "approved": true
}, {
    "orderId": 10250,
    "region": "North America",
    "country": "United States",
    "city": "Denver",
    "amount": 2235,
    "date": "2013/01/07",
    "approved": true
}, {
    "orderId": 10251,
    "region": "North America",
    "country": "Canada",
    "city": "Vancouver",
    "amount": 1965,
    "date": "2013/01/03",
    "approved": true
}, {
    "orderId": 10252,
    "region": "North America",
    "country": "Canada",
    "city": "Edmonton",
    "amount": 880,
    "date": "2013/01/10",
    "approved": true
}, {
    "orderId": 10253,
    "region": "South America",
    "country": "Brazil",
    "city": "Rio de Janeiro",
    "amount": 5260,
    "date": "2013/01/17",
    "approved": true
}, {
    "orderId": 10254,
    "region": "South America",
    "country": "Argentina",
    "city": "Buenos Aires",
    "amount": 2790,
    "date": "2013/01/21",
    "approved": true
}, {
    "orderId": 10255,
    "region": "South America",
    "country": "Paraguay",
    "city": "Asuncion",
    "amount": 3140,
    "date": "2013/01/01",
    "approved": true
}, {
    "orderId": 10256,
    "region": "Europe",
    "country": "United Kingdom",
    "city": "London",
    "amount": 6175,
    "date": "2013/01/24",
    "approved": true
}, {
    "orderId": 10257,
    "region": "Europe",
    "country": "Germany",
    "city": "Berlin",
    "amount": 4575,
    "date": "2013/01/11",
    "approved": true
}];