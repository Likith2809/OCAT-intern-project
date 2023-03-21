import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SiteWrapper } from './components';
import { DashboardBulletin } from './pages/Dashboard/DashboardBulletin';
import { NewAssessment } from './pages/Assessments/NewAssessment.jsx';
import { AssessmentList } from './pages/Assessments/AssessmentList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserLogin } from './pages/Users/UserLogin';

const router = createBrowserRouter([
  {
    element: <DashboardBulletin />,
    path: `/`,
  },
  {
    element: <NewAssessment />,
    path: `/assessment/new`,
  },
  {
    element: <AssessmentList />,
    path: `/assessment/list`,
  },
  {
    element: <UserLogin />,
    path: `/user/login`,
  },
  {
    element: <AssessmentList />,
    path: `/assessment/delete/:id`,
  },
]);

const App = () => <SiteWrapper>
  <RouterProvider router={router} />
</SiteWrapper>;

export default App;
