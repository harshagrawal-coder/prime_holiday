import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AdminAuthProvider } from './admin/context/AdminAuthContext';
import { UserAuthProvider } from './context/UserAuthContext';
import { TourProvider } from './context/TourContext';
import { GalleryProvider } from './context/GalleryContext';
import { BlogProvider } from './context/BlogContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserAuthProvider>
      <AdminAuthProvider>
        <TourProvider>
          <GalleryProvider>
            <BlogProvider>
              <App />
            </BlogProvider>
          </GalleryProvider>
        </TourProvider>
      </AdminAuthProvider>
    </UserAuthProvider>
  </BrowserRouter>
);
