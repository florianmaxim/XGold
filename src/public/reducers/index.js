import {combineReducers}    from 'redux';

import ReducerAccount       from './reducer-account';

import ReducerContract       from './reducer-contract';

import ReducerSelectedBlock       from './reducer-selected-block';

import ReducerBlocks        from './reducer-blocks';

import ReducerOverlay       from './reducer-overlay';

import ReducerMode          from './reducer-mode';

const reducer = combineReducers({

    account: ReducerAccount,

    contract: ReducerContract,

    selectedBlock: ReducerSelectedBlock,

    blocks: ReducerBlocks,

    overlay: ReducerOverlay,

    mode: ReducerMode

});

export default reducer;