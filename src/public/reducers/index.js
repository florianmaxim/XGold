import {combineReducers}   from 'redux';

import ReducerBlocks from './reducer-blocks';

const reducer = combineReducers({

    blocks: ReducerBlocks

});

export default reducer;