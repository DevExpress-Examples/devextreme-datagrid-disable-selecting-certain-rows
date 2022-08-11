<!-- default badges list -->
![](https://img.shields.io/endpoint?url=https://codecentral.devexpress.com/api/v1/VersionRange/246374284/19.2.4%2B)
[![](https://img.shields.io/badge/Open_in_DevExpress_Support_Center-FF7200?style=flat-square&logo=DevExpress&logoColor=white)](https://supportcenter.devexpress.com/ticket/details/T869704)
[![](https://img.shields.io/badge/📖_How_to_use_DevExpress_Examples-e9f6fc?style=flat-square)](https://docs.devexpress.com/GeneralInformation/403183)
<!-- default badges end -->
# DataGrid for DevExtreme - How to disable selecting certain rows

This example demonstrates how to disable selection in certain rows in the [multiple record selection mode](https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/MultipleRecordSelectionModes/jQuery/Light/). In this example, a row is disabled if its **approved** value is `false`. 

Specify the following properties to implement the technique:

1. Implement the [onEditorPreparing](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/#onEditorPreparing) event handler to display disabled selection checkboxes.
2. Implement the [onSelectionChanged](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/#onSelectionChanged) event handler. In this handler, specify the checkboxes that need to stay disabled after a user toggles the **Select All** checkbox.

Note that you need to set the [remoteOperations](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDataGrid/Configuration/remoteOperations/) to `false` for this example to work.

## Files to Look At

- **jQuery**
    - [index.html](jQuery/index.html)
- **Angular**
    - [app.component.html](Angular/src/app/app.component.html)
    - [app.component.ts](Angular/src/app/app.component.ts)
- **Vue**
    - [App.vue](Vue/src/App.vue)
- **React**
    - [App.js](React/src/App.js)
- **ASP.NET Core**    
    - [Index.cshtml](ASPNETCore/ASPNETCore/Views/Home/Index.cshtml)

## Documentation

- [Getting Started with DataGrid](https://js.devexpress.com/Documentation/Guide/UI_Components/DataGrid/Getting_Started_with_DataGrid/)

- [DataGrid - API Reference](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/)

## More Examples

- [DataGrid for DevExtreme - How to show/hide or enable/disable Edit Form items based on another item's value](https://github.com/DevExpress-Examples/DataGrid-How-to-hide-disable-Edit-Form-items-based-on-another-item-s-value)

- [DataGrid for DevExtreme - Multiple cell selection](https://github.com/DevExpress-Examples/DataGrid-Multiple-Cell-Selection)

- [DataGrid for DevExtreme - Update multiple values in a row after selecting an item in a lookup column editor](https://github.com/DevExpress-Examples/DataGrid---Update-multiple-values-in-a-row-after-selecting-an-item-in-a-lookup-column-editor)