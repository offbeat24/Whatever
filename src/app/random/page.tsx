'use client'

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import FoodMap from './components/map';
import Navigation from './components/gnb';
import { store, persistor } from '../../redux/store';

export default function RandomPage () {
  return(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <section className='fixed inset-0 flex flex-col laptop:flex-row'>
          <Navigation />
          <div className='flex-grow laptop:ml-[4.6875rem]' >
            <FoodMap />
          </div>
        </section>
      </PersistGate>
    </Provider>
  )
}