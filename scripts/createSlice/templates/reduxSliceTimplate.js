const firstCharUpperCase = require('../firstCharUpperCase');

module.exports = (sliceName) => {
    const typeName = `${firstCharUpperCase(sliceName)}Schema`;

    return `import { createSlice, PayloadAction } from '@reduxjs/toolkit';
    import { ${typeName} } from '../types/${typeName}';
    
    const initialState: ${typeName} = {
        
    };
    
    export const ${sliceName}Slice = createSlice({
        name: '${sliceName}',
        initialState,
        reducers: {
            template:(state, action:PayloadAction<>){

            }
        },
        // extraReducers: (builder) => {
        //     builder
        //         .addCase(fetchArticleById.pending, (state) => {
        //             state.error = undefined;
        //             state.isLoading = true;
        //         })
        //         .addCase(
        //             fetchArticleById.fulfilled,
        //             (state, action: PayloadAction<Article>) => {
        //                 state.isLoading = false;
        //                 state.data = action.payload;
        //             },
        //         )
        //         .addCase(fetchArticleById.rejected, (state, action) => {
        //             state.isLoading = false;
        //             state.error = action.payload;
        //         });
        // },
    });
    
    export const { actions: ${sliceName}Actions } = ${sliceName}Slice;
    export const { reducer: ${sliceName}Reducer } = ${sliceName}Slice;
    `;
};
