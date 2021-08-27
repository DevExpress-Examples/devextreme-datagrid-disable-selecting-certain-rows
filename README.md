<!-- default badges list -->
![](https://img.shields.io/endpoint?url=https://codecentral.devexpress.com/api/v1/VersionRange/246374284/19.2.4%2B)
[![](https://img.shields.io/badge/Open_in_DevExpress_Support_Center-FF7200?style=flat-square&logo=DevExpress&logoColor=white)](https://supportcenter.devexpress.com/ticket/details/T869704)
[![](https://img.shields.io/badge/📖_How_to_use_DevExpress_Examples-e9f6fc?style=flat-square)](https://docs.devexpress.com/GeneralInformation/403183)
<!-- default badges end -->
# DataGrid - How to conditionally disable selection checkboxes

This example describes how to conditinally disable row selection and selection checkboxes.

We recommend handling the [selectionChanged](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDataGrid/Events/#selectionChanged) event to prevent selecting disabled checkboxes. However, the Select All checkbox will work incorrectly after that. The cause of that issue is that dxDataGrid doesn't support this scenario out-of-the-box. A workaround for this scenario is shown in this GitHub repository. In this example, a row is disabled if its Approved value is false. The limitation of this workaround is that the [remoteOperations](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDataGrid/Configuration/remoteOperations/) option should be false.

<!-- default file list -->

<!-- default file list end -->
