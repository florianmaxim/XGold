import {combineReducers}    from 'redux';

import ReducerAccount       from './reducer-account';

import ReducerSelectedBlock       from './reducer-selected-block';

import ReducerBlocks        from './reducer-blocks';

import ReducerOverlay       from './reducer-overlay';

import ReducerMode          from './reducer-mode';

const reducer = combineReducers({

    account: ReducerAccount,

    selectedBlock: ReducerSelectedBlock,

    blocks: ReducerBlocks,

    overlay: ReducerOverlay,

    mode: ReducerMode

});

export default reducer;