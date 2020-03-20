<template>
    <DxDataGrid
            :data-source="sales"
            :show-borders="true"
            key-expr="orderId"
            :remoteOperations="false"
            @editor-preparing="onEditorPreparing"
            @selection-changed="onSelectionChanged"
    >

        <DxColumn
                :width="90"
                data-field="orderId"
                caption="Order ID"
        />
        <DxColumn data-field="city"/>
        <DxColumn
                :width="180"
                data-field="country"
        />
        <DxColumn data-field="region"/>
        <DxColumn
                data-field="date"
                data-type="date"
        />
        <DxColumn
                :width="90"
                data-field="amount"
                format="currency"
        />

        <DxPaging :page-size="10"/>
        <DxSelection
                select-all-mode="allPages"
                show-check-boxes-mode="onClick"
                mode="multiple"
        />
    </DxDataGrid>
</template>
<script>
    import {sales} from './data.js';
    import {
        DxDataGrid,
        DxColumn,
        DxPaging,
        DxSelection
    } from 'devextreme-vue/data-grid';

    let selectAllCheckBox;
    let checkBoxUpdating = false;

    export default {
        components: {
            DxDataGrid,
            DxColumn,
            DxPaging,
            DxSelection,
        },
        data() {
            return {
                sales
            };
        },
        methods: {
            isSelectable(item) {
                return item.approved;
            },

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
            },

            onEditorPreparing(e) {
                let dataGrid = e.component;
                if (e.command === "select") {
                    if (e.parentType === "dataRow" && e.row) {
                        if (!this.isSelectable(e.row.data))
                            e.editorOptions.disabled = true;
                    } else if (e.parentType === "headerRow") {
                        e.editorOptions.onInitialized = (e) => {
                            selectAllCheckBox = e.component;
                        };
                        e.editorOptions.value = this.isSelectAll(dataGrid);
                        e.editorOptions.onValueChanged = (e) => {
                            if (!e.event) {
                                if (e.previousValue && !checkBoxUpdating) {
                                    e.component.option("value", e.previousValue);
                                }
                                return;
                            }
                            if (this.isSelectAll(dataGrid) === e.value) {
                                return;
                            }
                            e.value ? dataGrid.selectAll() : dataGrid.deselectAll();
                            e.event.preventDefault();
                        }
                    }
                }
            },

            onSelectionChanged(e) {
                let deselectRowKeys = [];
                e.selectedRowsData.forEach((item) => {
                    if (!this.isSelectable(item))
                        deselectRowKeys.push(e.component.keyOf(item));
                });
                if (deselectRowKeys.length) {
                    e.component.deselectRows(deselectRowKeys);
                }
                checkBoxUpdating = true;
                selectAllCheckBox.option("value", this.isSelectAll(e.component));
                checkBoxUpdating = false;
            }
        }
    };
</script>
