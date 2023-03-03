import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react'
import App from './App';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { ProSidebarProvider } from 'react-pro-sidebar';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProSidebarProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </ProSidebarProvider>
  </React.StrictMode>
);



