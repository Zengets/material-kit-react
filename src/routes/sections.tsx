import type { RouteObject } from 'react-router';

import { lazy, Suspense } from 'react';
import { varAlpha } from 'minimal-shared/utils';
import { Outlet, Navigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export const DashboardPage = lazy(() => import('src/pages/dashboard'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const RegisterPage = lazy(() => import('src/pages/auth/register'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// Project Management Pages
export const ProjectDashboardPage = lazy(() => import('src/pages/project-management/dashboard'));
export const ProjectListPage = lazy(() => import('src/pages/project-management/list'));
export const ProjectCollaborationPage = lazy(() => import('src/pages/project-management/collaboration'));
export const ProjectApprovalPage = lazy(() => import('src/pages/project-management/approval'));
export const ProjectAnalyticsPage = lazy(() => import('src/pages/project-management/analytics'));

// Training Center Pages
export const TrainingCoursesPage = lazy(() => import('src/pages/training-courses'));
export const TrainingMyLearningPage = lazy(() => import('src/pages/training-my-learning'));
export const TrainingAssessmentPage = lazy(() => import('src/pages/training-assessment'));
export const TrainingExpertsPage = lazy(() => import('src/pages/training-experts'));

// Equipment Sharing Pages
export const EquipmentListPage = lazy(() => import('src/pages/equipment/list'));
export const EquipmentDetailPage = lazy(() => import('src/pages/equipment/detail'));
export const EquipmentBookingPage = lazy(() => import('src/pages/equipment/booking'));
export const EquipmentUsagePage = lazy(() => import('src/pages/equipment/usage'));
export const EquipmentStatisticsPage = lazy(() => import('src/pages/equipment/statistics'));

// Achievements Pages
export const AchievementsListPage = lazy(() => import('src/pages/achievements/list'));
export const AchievementsDetailPage = lazy(() => import('src/pages/achievements/detail'));
export const AchievementsMatchPage = lazy(() => import('src/pages/achievements/match'));
export const AchievementsDemandPage = lazy(() => import('src/pages/achievements/demand'));
export const AchievementsAnalysisPage = lazy(() => import('src/pages/achievements/analysis'));

// BI Data Analysis Pages
export const BIDashboardPage = lazy(() => import('src/pages/bi/dashboard'));
export const BITrendsPage = lazy(() => import('src/pages/bi/trends'));
export const BIRankingPage = lazy(() => import('src/pages/bi/ranking'));
export const BIReportPage = lazy(() => import('src/pages/bi/report'));

// Service Pages
export const ServiceMessagePage = lazy(() => import('src/pages/service/message'));
export const ServiceMessageDetailPage = lazy(() => import('src/pages/service/message-detail'));
export const ServiceAIAssistantPage = lazy(() => import('src/pages/service/ai-assistant'));
export const ServiceAlertPage = lazy(() => import('src/pages/service/alert'));
export const ServiceLogPage = lazy(() => import('src/pages/service/log'));

// Workflow Pages
export const WorkflowDesignerPage = lazy(() => import('src/pages/workflow/designer'));
export const WorkflowListPage = lazy(() => import('src/pages/workflow/list'));
export const WorkflowApprovalPage = lazy(() => import('src/pages/workflow/approval'));
export const WorkflowAPIManagerPage = lazy(() => import('src/pages/workflow/api-manager'));
export const WorkflowDataSecurityPage = lazy(() => import('src/pages/workflow/data-security'));

// System Pages
export const SystemUsersPage = lazy(() => import('src/pages/system/users'));
export const SystemRolesPage = lazy(() => import('src/pages/system/roles'));
export const SystemOrgPage = lazy(() => import('src/pages/system/org'));
export const SystemAuditPage = lazy(() => import('src/pages/system/audit'));
export const SystemSettingsPage = lazy(() => import('src/pages/system/settings'));

const renderFallback = () => (
  <Box
    sx={{
      display: 'flex',
      flex: '1 1 auto',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export const routesSection: RouteObject[] = [
  {
    index: true,
    element: <Navigate to="/sign-in" replace />,
  },
  {
    path: 'sign-in',
    element: (
      <AuthLayout cssVars={{ '--layout-auth-content-width': '420px' }}>
        <SignInPage />
      </AuthLayout>
    ),
  },
  {
    path: 'auth/register',
    element: (
      <AuthLayout cssVars={{ '--layout-auth-content-width': '800px' }}>
        <RegisterPage />
      </AuthLayout>
    ),
  },
  {
    element: (
      <DashboardLayout>
        <Suspense fallback={renderFallback()}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'user', element: <UserPage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'blog', element: <BlogPage /> },
      // Project Management Routes
      { path: 'project-management/dashboard', element: <ProjectDashboardPage /> },
      { path: 'project-management/list', element: <ProjectListPage /> },
      { path: 'project-management/collaboration', element: <ProjectCollaborationPage /> },
      { path: 'project-management/approval', element: <ProjectApprovalPage /> },
      { path: 'project-management/analytics', element: <ProjectAnalyticsPage /> },
      // Training Center Routes
      { path: 'training/courses', element: <TrainingCoursesPage /> },
      { path: 'training/my-learning', element: <TrainingMyLearningPage /> },
      { path: 'training/assessment', element: <TrainingAssessmentPage /> },
      { path: 'training/experts', element: <TrainingExpertsPage /> },
      // Equipment Sharing Routes
      { path: 'equipment/list', element: <EquipmentListPage /> },
      { path: 'equipment/detail', element: <EquipmentDetailPage /> },
      { path: 'equipment/booking', element: <EquipmentBookingPage /> },
      { path: 'equipment/usage', element: <EquipmentUsagePage /> },
      { path: 'equipment/statistics', element: <EquipmentStatisticsPage /> },
      // Achievements Routes
      { path: 'achievements/list', element: <AchievementsListPage /> },
      { path: 'achievements/detail', element: <AchievementsDetailPage /> },
      { path: 'achievements/match', element: <AchievementsMatchPage /> },
      { path: 'achievements/demand', element: <AchievementsDemandPage /> },
      { path: 'achievements/analysis', element: <AchievementsAnalysisPage /> },
      // BI Data Analysis Routes
      { path: 'bi/dashboard', element: <BIDashboardPage /> },
      { path: 'bi/trends', element: <BITrendsPage /> },
      { path: 'bi/ranking', element: <BIRankingPage /> },
      { path: 'bi/report', element: <BIReportPage /> },
      // Service Routes
      { path: 'service/message', element: <ServiceMessagePage /> },
      { path: 'service/message-detail', element: <ServiceMessageDetailPage /> },
      { path: 'service/ai-assistant', element: <ServiceAIAssistantPage /> },
      { path: 'service/alert', element: <ServiceAlertPage /> },
      { path: 'service/log', element: <ServiceLogPage /> },
      // Workflow Routes
      { path: 'workflow/designer', element: <WorkflowDesignerPage /> },
      { path: 'workflow/list', element: <WorkflowListPage /> },
      { path: 'workflow/approval', element: <WorkflowApprovalPage /> },
      { path: 'workflow/api-manager', element: <WorkflowAPIManagerPage /> },
      { path: 'workflow/data-security', element: <WorkflowDataSecurityPage /> },
      // System Routes
      { path: 'system/users', element: <SystemUsersPage /> },
      { path: 'system/roles', element: <SystemRolesPage /> },
      { path: 'system/org', element: <SystemOrgPage /> },
      { path: 'system/audit', element: <SystemAuditPage /> },
      { path: 'system/settings', element: <SystemSettingsPage /> },
    ],
  },
  {
    path: '404',
    element: <Page404 />,
  },
  { path: '*', element: <Page404 /> },
];
