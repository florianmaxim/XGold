import {combineReducers}    from 'redux';

import ReducerBlocks        from './reducer-blocks';

import ReducerBlock         from './reducer-block';


const reducer = combineReducers({

    blocks: ReducerBlocks,
    block: ReducerBlock

});

export default reducer;