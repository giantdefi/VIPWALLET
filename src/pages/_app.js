import '../../styles/globals.css'
import '../../styles/input-button.css'
import '../../styles/icofont/icofont.min.css'
import '../../styles/animate.min.css'
import '../../styles/modal.css'
import '../../styles/captcha.css'

import MainLayout from 'layout/main'

import { Provider } from 'react-redux';
import { store, persistor } from 'redux/store';
import { PersistGate } from 'redux-persist/integration/react'

function MyApp({ Component, pageProps, router }) {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </PersistGate>
    </Provider>
  )


}

export default MyApp