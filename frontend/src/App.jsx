import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Register';
import Login from './components/Login';
import Error from './components/Error';
import NatureOfCompliance from './Pages/NatureOfCompliance/Form/NatureOfCompliance';
import NatureOfComplianceList from './Pages/NatureOfCompliance/List/NatureOfComplianceList';
import Dashboard from './components/Dashboard';
import Category from './Pages/Category/Form/Category';
import CategoryList from './Pages/Category/List/CategoryList';
import SubCategory from './Pages/SubCategory/Form/SubCategory';
import UpdateCategory from './Pages/Category/Form/UpdateCategory';
import UpdateNatureOfCompliance from './Pages/NatureOfCompliance/Form/UpdateNatureOfCompliance';
import SubCategoryList from './Pages/SubCategory/List/SubCategoryList';
import UpdateSubCategory from './Pages/SubCategory/Form/UpdateSubCategory';
import ProtectedLayout from './components/ProtectedLayout';
import UserManagement from './Pages/UserManagement/Form/UserManagement';
import Layout from './Pages/UserManagement/List/Layout';
import UpdateUserManagement from './Pages/UserManagement/Form/UpdateUserManagement';
import Compliance from './Pages/Compliance/Form/Compliance';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<ProtectedLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/natureOfCompliance' element={<NatureOfCompliance />} />
              <Route path='/natureOfComplianceList' element={<NatureOfComplianceList />} />
              <Route path='/updateNatureOfCompliance/:id' element={<UpdateNatureOfCompliance />} />
              <Route path='/category' element={<Category />} />
              <Route path='/categoryList' element={<CategoryList />} />
              <Route path='/updateCategory/:id' element={<UpdateCategory />} />
              <Route path='/subCategory' element={<SubCategory />} />
              <Route path='/subCategoryList' element={<SubCategoryList />} />
              <Route path='/updateSubCategory/:id' element={<UpdateSubCategory />} />
              <Route path='/userManagement' element={<UserManagement />} />
              <Route path='/userManagementList' element={<Layout />} />
              <Route path='/updateUserManagement/:id' element={<UpdateUserManagement />} />
              <Route path='/compliance' element={<Compliance />} />
            </Route>
          </Route>
          <Route path='*' element={<Error />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
