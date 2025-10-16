import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/teach/assets/icons/navbar/${name}.svg`} />;

export type NavChildItem = {
  title: string;
  path: string;
  icon?: React.ReactNode;
  info?: React.ReactNode;
  hidden?: boolean;
};

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
  hidden?: boolean;
  children?: NavChildItem[];
};

export const navData = [
  {
    title: '首页',
    path: '/dashboard',
    icon: icon('ic-home'),
  },
  {
    title: '项目管理',
    path: '/project-management',
    icon: icon('ic-pro'),
    children: [
      {
        title: '项目总览',
        path: '/project-management/dashboard',
      },
      {
        title: '项目列表',
        path: '/project-management/list',
      },
      {
        title: '项目协作',
        path: '/project-management/collaboration',
      },
      {
        title: '审核中心',
        path: '/project-management/approval',
      },
      {
        title: '数据分析',
        path: '/project-management/analytics',
      },
    ],
  },
  {
    title: '能力培养',
    path: '/training',
    icon: icon('ic-alicon'),
    info: (
      <Label color="error" variant="inverted">
        +3
      </Label>
    ),
    children: [
      {
        title: '课程库',
        path: '/training/courses',
      },
      {
        title: '我的学习',
        path: '/training/my-learning',
      },
      {
        title: '考核与证书',
        path: '/training/assessment',
      },
      {
        title: '讲师管理',
        path: '/training/experts',
      },
    ],
  },
  {
    title: '设备共享',
    path: '/equipment',
    icon: icon('ic-device'),
    children: [
      {
        title: '设备资源库',
        path: '/equipment/list',
      },
      {
        title: '我的预约',
        path: '/equipment/usage',
      },
      {
        title: '使用统计',
        path: '/equipment/statistics',
      },
    ],
  },
  {
    title: '成果转化',
    path: '/achievements',
    icon: icon('ic-res'),
    children: [
      {
        title: '成果列表',
        path: '/achievements/list',
      },
      // {
      //   title: '成果详情',
      //   path: '/achievements/detail',
      //   hidden: true,
      // },
      {
        title: '智能匹配',
        path: '/achievements/match',
      },
      {
        title: '需求发布',
        path: '/achievements/demand',
      },
      {
        title: '数据分析',
        path: '/achievements/analysis',
      },
    ],
  },
  {
    title: 'BI数据分析',
    path: '/bi',
    icon: icon('ic-analytics'),
    children: [
      {
        title: 'BI总览',
        path: '/bi/dashboard',
      },
      {
        title: '趋势分析',
        path: '/bi/trends',
      },
      {
        title: '绩效排名',
        path: '/bi/ranking',
      },
      {
        title: '数据报告',
        path: '/bi/report',
      },
    ],
  },
  {
    title: '智能服务',
    path: '/service',
    icon: icon('ic-ai'),
    children: [
      {
        title: '消息通知',
        path: '/service/message',
      },
      {
        title: 'AI智能客服',
        path: '/service/ai-assistant',
      },
      {
        title: '系统告警',
        path: '/service/alert',
      },
      {
        title: '消息日志',
        path: '/service/log',
      },
    ],
  },
  {
    title: '工作流与数据',
    path: '/workflow',
    icon: icon('ic-ait'),
    children: [
      {
        title: '流程设计器',
        path: '/workflow/designer',
      },
      {
        title: '流程模板',
        path: '/workflow/list',
      },
      {
        title: '审批流程',
        path: '/workflow/approval',
      },
      {
        title: '接口管理',
        path: '/workflow/api-manager',
      },
      {
        title: '数据安全',
        path: '/workflow/data-security',
      },
    ],
  },
  // 系统设置与权限管理
  {
    title: '系统设置',
    path: '/system',
    icon: icon('ic-system'),
    children: [
      {
        title: '用户管理',
        path: '/system/users',
      },
      {
        title: '角色与权限',
        path: '/system/roles',
      },
      {
        title: '机构管理',
        path: '/system/org',
      },
      {
        title: '审计日志',
        path: '/system/audit',
      },
      {
        title: '系统设置',
        path: '/system/settings',
      },
    ],
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic-disabled'),
    hidden: true,
  },
];
