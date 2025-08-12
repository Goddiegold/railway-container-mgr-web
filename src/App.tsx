import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import "@mantine/notifications/styles.css";
import '@mantine/core/styles.css';

export default function App() {

  return (
    <>
      <MantineProvider
        withCssVariables
        withGlobalClasses
        withStaticClasses
      >
        <Notifications position="top-right" zIndex={2077} />
        <RouterProvider router={router} />
      </MantineProvider>
    </>

  )
}
//
