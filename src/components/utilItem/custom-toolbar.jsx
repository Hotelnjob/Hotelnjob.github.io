import {
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton,
    GridToolbarQuickFilter,
} from '@mui/x-data-grid';

export const CustomToolbar = () => {
    return (
        <GridToolbarContainer style={{ justifyContent: "space-between", borderBottom: "1px solid #eaeaea", padding: " 0 8px" }}>
            <GridToolbarQuickFilter />
            <div>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport csvOptions={{ fileName: "title" }} excelOptions={{ fileName: "title" }} />
            </div>
        </GridToolbarContainer>
    );
};

export const SearchToolbar = () => {
    return (
        <GridToolbarContainer style={{ justifyContent: "space-between", borderBottom: "1px solid #eaeaea", padding: " 0 8px" }}>
            <GridToolbarQuickFilter />
        </GridToolbarContainer>
    );
};
