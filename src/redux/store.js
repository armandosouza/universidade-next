import {combineReducers, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import {persistStore,
 		persistReducer,
 		FLUSH,
 		REHYDRATE,
 		PAUSE,
 		PERSIST,
 		PURGE,
 		REGISTER
 	} from 'reduxjs-toolkit-persist'
import storage from 'reduxjs-toolkit-persist/lib/storage'
import autoMergeLevel1 from 'reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1'
import userReducer from './features/userSlice'

const reducers = combineReducers({
	user: userReducer
})

const persistConfig = {
	key: 'root',
	storage: storage,
	stateReconciler: autoMergeLevel1
}

const _persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
	reducer: _persistedReducer,
	middleware: getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [
				FLUSH,
				REHYDRATE,
				PAUSE,
				PERSIST,
				PURGE,
				REGISTER
			]
		}
	})
})

export const persistor = persistStore(store)