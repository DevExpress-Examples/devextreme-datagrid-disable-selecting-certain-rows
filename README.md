# DataGrid - How to conditionally disable selection checkboxes

This example describes how to conditinally disable row selection and selection checkboxes.

We recommend handling the [selectionChanged](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDataGrid/Events/#selectionChanged) event to prevent selecting disabled checkboxes. However, the Select All checkbox will work incorrectly after that. The cause of that issue is that dxDataGrid doesn't support this scenario out-of-the-box. A workaround for this scenario is shown in this GitHub repository. In this example, a row is disabled if its Approved value is false. The limitation of this workaround is that the [remoteOperations](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDataGrid/Configuration/remoteOperations/) option should be false.

<!-- default file list -->

<!-- default file list end -->
