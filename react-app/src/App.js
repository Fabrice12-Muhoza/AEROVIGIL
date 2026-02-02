// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import { Toaster } from 'react-hot-toast';
// import PrivateRoute from './components/PrivateRoute';
// import Login from './pages/Login';
// import Dashboard from './pages/Dashboard';
// import EvidenceLibrary from './pages/EvidenceLibrary';
// import Reports from './pages/Reports';
// import Settings from './pages/Settings';
// import './App.css';

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//           <Toaster position="top-right" />
//           <Routes>
//             <Route path="/login" element={<Login />} />
//             <Route element={<PrivateRoute />}>
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="/evidence" element={<EvidenceLibrary />} />
//               <Route path="/reports" element={<Reports />} />
//               <Route path="/settings" element={<Settings />} />
//               <Route path="/" element={<Navigate to="/dashboard" replace />} />
//             </Route>
//           </Routes>
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;







// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import { Toaster } from 'react-hot-toast';
// import ErrorBoundary from './components/ErrorBoundary';
// import PrivateRoute from './components/PrivateRoute';
// import Login from './pages/Login';
// import Dashboard from './pages/Dashboard';
// import EvidenceLibrary from './pages/EvidenceLibrary';
// import Reports from './pages/Reports';
// import Settings from './pages/Settings';
// // import CameraManagement from './pages/CameraManagement';
// // import UserManagement from './pages/UserManagement';
// import './App.css';

// function App() {
//   return (
//     <ErrorBoundary>
//       <AuthProvider>
//         <Router>
//           <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//             <Toaster 
//               position="top-right"
//               toastOptions={{
//                 duration: 4000,
//                 style: {
//                   background: '#363636',
//                   color: '#fff',
//                 },
//                 success: {
//                   duration: 3000,
//                   theme: {
//                     primary: 'green',
//                     secondary: 'black',
//                   },
//                 },
//               }}
//             />
//             <Routes>
//               <Route path="/login" element={<Login />} />
//               <Route element={<PrivateRoute />}>
//                 <Route path="/dashboard" element={<Dashboard />} />
//                 <Route path="/evidence" element={<EvidenceLibrary />} />
//                 <Route path="/reports" element={<Reports />} />
//                 <Route path="/settings" element={<Settings />} />
//                 {/* <Route path="/cameras" element={<CameraManagement />} /> */}
//                 {/* <Route path="/users" element={<UserManagement />} /> */}
//                 <Route path="/" element={<Navigate to="/dashboard" replace />} />
//               </Route>
//               <Route path="*" element={<Navigate to="/dashboard" replace />} />
//             </Routes>
//           </div>
//         </Router>
//       </AuthProvider>
//     </ErrorBoundary>
//   );
// }

// export default App;





import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './components/ErrorBoundary';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EvidenceLibrary from './pages/EvidenceLibrary';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import CameraManagement from './pages/CameraManagement';
import UserManagement from './pages/UserManagement';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  theme: {
                    primary: 'green',
                    secondary: 'black',
                  },
                },
              }}
            />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/evidence" element={<EvidenceLibrary />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/cameras" element={<CameraManagement />} />
                <Route path="/users" element={<UserManagement />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
              </Route>
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;