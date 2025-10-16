import {
  _id,
  _price,
  _times,
  _boolean,
  _company,
  _fullName,
  _orgNames,
  _taskNames,
  _postTitles,
  _courseNames,
  _description,
  _industryTags,
  _productNames,
  _instructorNames,
} from './_mock';
import { getAssetUrl } from 'src/utils/get-asset-url';

// ----------------------------------------------------------------------

export const _myAccount = {
  displayName: '张明',
  email: 'demo@minimals.cc',
  photoURL: getAssetUrl('assets/images/avatar/avatar-25.webp'),
};

// ----------------------------------------------------------------------

export const _users = [...Array(24)].map((_, index) => ({
  id: _id(index),
  name: _fullName(index),
  company: _company(index),
  isVerified: _boolean(index),
  avatarUrl: getAssetUrl(`assets/images/avatar/avatar-${index + 1}.webp`),
  status: index % 4 ? 'active' : 'banned',
  role:
    [
      '团队领导',
      '人事经理',
      'UI设计师',
      'UX设计师',
      'UI/UX设计师',
      '项目经理',
      '后端开发',
      '全栈设计师',
      '前端开发',
      '全栈开发',
    ][index] || 'UI设计师',
}));

// ----------------------------------------------------------------------

export const _posts = [...Array(23)].map((_, index) => ({
  id: _id(index),
  title: _postTitles(index),
  description: _description(index),
  coverUrl: getAssetUrl(`assets/images/cover/cover-${index + 1}.webp`),
  totalViews: 8829,
  totalComments: 7977,
  totalShares: 8556,
  totalFavorites: 8870,
  postedAt: _times(index),
  author: {
    name: _fullName(index),
    avatarUrl: getAssetUrl(`assets/images/avatar/avatar-${index + 1}.webp`),
  },
}));

// ----------------------------------------------------------------------

const COLORS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

export const _products = [...Array(24)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: _id(index),
    price: _price(index),
    name: _productNames(index),
    priceSale: setIndex % 3 ? null : _price(index),
    coverUrl: getAssetUrl(`assets/images/product/product-${setIndex}.webp`),
    colors:
      (setIndex === 1 && COLORS.slice(0, 2)) ||
      (setIndex === 2 && COLORS.slice(1, 3)) ||
      (setIndex === 3 && COLORS.slice(2, 4)) ||
      (setIndex === 4 && COLORS.slice(3, 6)) ||
      (setIndex === 23 && COLORS.slice(4, 6)) ||
      (setIndex === 24 && COLORS.slice(5, 6)) ||
      COLORS,
    status:
      ([1, 3, 5].includes(setIndex) && 'sale') || ([4, 8, 12].includes(setIndex) && 'new') || '',
  };
});

// ----------------------------------------------------------------------

export const _langs = [
  {
    value: 'zh',
    label: '中文',
    icon: getAssetUrl('assets/icons/flags/ic-flag-cn.svg'),
  },
  {
    value: 'en',
    label: 'English',
    icon: getAssetUrl('assets/icons/flags/ic-flag-en.svg'),
  },
  {
    value: 'ja',
    label: '日本語',
    icon: getAssetUrl('assets/icons/flags/ic-flag-jp.svg'),
  },
];

// ----------------------------------------------------------------------

export const _timeline = [...Array(5)].map((_, index) => ({
  id: _id(index),
  title: [
    '1983笔订单，¥4220',
    '12张发票已支付',
    '9月订单 #37745',
    '新订单 #XF-2356',
    '新订单 #XF-2346',
  ][index],
  type: `order${index + 1}`,
  time: _times(index),
}));

export const _traffic = [
  {
    value: 'wechat',
    label: '微信',
    total: 195000,
  },
  {
    value: 'baidu',
    label: '百度',
    total: 91200,
  },
  {
    value: 'douyin',
    label: '抖音',
    total: 169800,
  },
  {
    value: 'weibo',
    label: '微博',
    total: 84900,
  },
];

export const _tasks = Array.from({ length: 5 }, (_, index) => ({
  id: _id(index),
  name: _taskNames(index),
}));

// ----------------------------------------------------------------------

export const _notifications = [
  {
    id: _id(1),
    title: '您的订单已下单',
    description: '等待发货',
    avatarUrl: null,
    type: 'order-placed',
    postedAt: _times(1),
    isUnRead: true,
  },
  {
    id: _id(2),
    title: _fullName(2),
    description: '回复了您在 Minimal 上的评论',
    avatarUrl: getAssetUrl('assets/images/avatar/avatar-2.webp'),
    type: 'friend-interactive',
    postedAt: _times(2),
    isUnRead: true,
  },
  {
    id: _id(3),
    title: '您有新消息',
    description: '有5条未读消息',
    avatarUrl: null,
    type: 'chat-message',
    postedAt: _times(3),
    isUnRead: false,
  },
  {
    id: _id(4),
    title: '您有新邮件',
    description: '来自 Guido Padberg 的邮件',
    avatarUrl: null,
    type: 'mail',
    postedAt: _times(4),
    isUnRead: false,
  },
  {
    id: _id(5),
    title: '正在配送',
    description: '您的订单正在发货中',
    avatarUrl: null,
    type: 'order-shipped',
    postedAt: _times(5),
    isUnRead: false,
  },
];

// ----------------------------------------------------------------------

export const _courses = [...Array(24)].map((_, index) => {
  const setIndex = index + 1;
  const duration = [20, 30, 40, 50, 60, 80, 100][index % 7];
  const capacity = [30, 50, 80, 100, 150][index % 5];
  const enrolledCount = Math.floor(capacity * (0.3 + Math.random() * 0.6));
  
  return {
    id: _id(index),
    courseId: _id(index),
    title: _courseNames(index),
    coverUrl: getAssetUrl(`assets/images/cover/cover-${setIndex}.webp`),
    instructorId: _id(index),
    instructorName: _instructorNames(index),
    instructorAvatar: getAssetUrl(`assets/images/avatar/avatar-${setIndex}.webp`),
    orgName: _orgNames(index),
    duration,
    format: (index % 3 === 0 ? 'offline' : 'online') as 'online' | 'offline',
    startDate: _times(index),
    capacity,
    enrolledCount,
    tags: _industryTags(index),
    price: setIndex % 4 === 0 ? null : _price(index) * 100,
    rating: 4 + Math.random(),
    description: _description(index),
    totalViews: 8000 + Math.floor(Math.random() * 5000),
    totalStudents: enrolledCount,
  };
});

// ----------------------------------------------------------------------

export const _experts = [...Array(24)].map((_, index) => ({
  id: _id(index),
  expertId: _id(index),
  name: _instructorNames(index),
  avatarUrl: getAssetUrl(`assets/images/avatar/avatar-${index + 1}.webp`),
  org: _orgNames(index),
  title: ['教授', '副教授', '高级工程师', '博士', '讲师', '专家'][index % 6],
  domain: _industryTags(index)[0],
  experience: `${5 + (index % 15)}年`,
  courses: _courses.slice(index, index + 3).map((c) => c.title),
  rating: 4 + Math.random(),
  status: (index % 8 === 0 ? '待认证' : index % 8 === 1 ? '审核拒绝' : '已认证') as '待认证' | '已认证' | '审核拒绝',
  totalCourses: 3 + (index % 10),
  totalStudents: 500 + Math.floor(Math.random() * 2000),
  bio: _description(index),
}));

// ----------------------------------------------------------------------

export const _myCourses = _courses.slice(0, 6).map((course, index) => ({
  ...course,
  progress: 20 + Math.floor(Math.random() * 70),
  lastStudyDate: _times(index),
  remainingTasks: Math.floor(Math.random() * 10),
  isCompleted: index < 2,
}));

// ----------------------------------------------------------------------

export const _certificates = [...Array(5)].map((_, index) => ({
  id: _id(index),
  certificateId: `CERT-2024-${1000 + index}`,
  courseId: _courses[index].id,
  courseName: _courses[index].title,
  instructorName: _courses[index].instructorName,
  issuedDate: _times(index),
  score: 85 + Math.floor(Math.random() * 15),
  certificateUrl: getAssetUrl(`assets/certificates/cert-${index + 1}.pdf`),
}));

// ----------------------------------------------------------------------

export const _exams = [...Array(8)].map((_, index) => ({
  id: _id(index),
  examId: _id(index),
  courseId: _courses[index].id,
  courseName: _courses[index].title,
  title: `${_courses[index].title} - 结业考试`,
  status: (['未开始', '进行中', '已完成'][index % 3]) as '未开始' | '进行中' | '已完成',
  startTime: _times(index),
  duration: 90 + (index % 3) * 30,
  totalQuestions: 50 + (index % 5) * 10,
  score: index % 3 === 2 ? 85 + Math.floor(Math.random() * 15) : null,
  passLine: 60,
  result: index % 3 === 2 ? (index % 2 === 0 ? '合格' : '不合格') as '合格' | '不合格' | null : null,
}));
