import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { Iconify } from 'src/components/iconify';
import { DashboardContent } from 'src/layouts/dashboard';
import { getAssetUrl } from 'src/utils/get-asset-url';

// ----------------------------------------------------------------------

type AchievementType = 'patent' | 'paper' | 'product';
type AchievementStage = 'research' | 'prototype' | 'pilot' | 'commercial';

type Achievement = {
  achievementId: string;
  title: string;
  type: AchievementType;
  authors: string[];
  org: string;
  patentNo?: string;
  stage: AchievementStage;
  techKeywords: string[];
  supportingDocs: string[];
  description: string;
  images: string[];
  videos?: string[];
  publishDate: string;
  licensable: boolean;
  region: string;
  technicalSpecs: {
    label: string;
    value: string;
  }[];
  ipInfo?: {
    patentType?: string;
    applicationDate?: string;
    authorizationDate?: string;
    patentStatus?: string;
    claims?: string[];
  };
  applications: {
    industry: string;
    scenario: string;
    benefits: string;
  }[];
  contact: {
    name: string;
    phone: string;
    email: string;
    wechat?: string;
  };
};

const MOCK_ACHIEVEMENT: Achievement = {
  achievementId: 'ACH001',
  title: '基于深度学习的医学影像智能诊断系统',
  type: 'product',
  authors: ['张教授', '李研究员', '王博士'],
  org: '人工智能学院',
  stage: 'pilot',
  techKeywords: ['深度学习', '医学影像', 'AI诊断', '卷积神经网络', '计算机视觉'],
  supportingDocs: ['技术报告.pdf', '测试数据.xlsx', '用户手册.pdf'],
  description:
    '本系统采用先进的深度学习算法，实现对CT、MRI、X光等多种医学影像的智能分析和辅助诊断。系统通过大规模医学影像数据训练，能够准确识别多种疾病特征，辅助医生进行快速、准确的诊断。系统已在多家三甲医院进行试点应用，获得了医生和患者的广泛好评。',
  images: [
    getAssetUrl('assets/images/cover/cover-1.webp'),
    getAssetUrl('assets/images/cover/cover-7.webp'),
    getAssetUrl('assets/images/cover/cover-8.webp'),
  ],
  videos: ['系统演示视频.mp4'],
  publishDate: '2024-09-15',
  licensable: true,
  region: '北京',
  technicalSpecs: [
    { label: '诊断准确率', value: '≥95%' },
    { label: '处理速度', value: '< 3秒/张' },
    { label: '支持影像类型', value: 'CT、MRI、X光、超声' },
    { label: '疾病覆盖', value: '肺癌、乳腺癌、脑肿瘤等20+种' },
    { label: '系统架构', value: '云端+本地部署' },
    { label: '接口标准', value: 'DICOM 3.0' },
  ],
  ipInfo: {
    patentType: '发明专利',
    applicationDate: '2023-03-15',
    authorizationDate: '2024-06-20',
    patentStatus: '已授权',
    claims: [
      '一种基于深度学习的医学影像分析方法',
      '多模态医学影像融合诊断系统',
      '实时影像处理与特征提取算法',
    ],
  },
  applications: [
    {
      industry: '医疗健康',
      scenario: '三甲医院放射科',
      benefits: '提升诊断效率50%，减少误诊率30%，缓解医生工作压力',
    },
    {
      industry: '体检中心',
      scenario: '大规模健康筛查',
      benefits: '快速处理大量影像，提供初步筛查报告，提高体检效率',
    },
    {
      industry: '远程医疗',
      scenario: '基层医疗机构',
      benefits: '弥补基层医疗影像诊断能力不足，实现优质医疗资源下沉',
    },
  ],
  contact: {
    name: '张教授',
    phone: '13800138001',
    email: 'zhang.prof@university.edu.cn',
    wechat: 'zhangprof2024',
  },
};

type Comment = {
  id: string;
  author: string;
  company: string;
  content: string;
  date: string;
  avatar?: string;
};

const MOCK_COMMENTS: Comment[] = [
  {
    id: 'C001',
    author: '李总',
    company: '某医疗科技公司',
    content: '我们公司对这个系统非常感兴趣，希望能够进一步了解技术细节和合作方式。',
    date: '2024-10-10',
    avatar: getAssetUrl('assets/images/avatar/avatar-1.webp'),
  },
  {
    id: 'C002',
    author: '王经理',
    company: '某三甲医院',
    content: '系统的诊断准确率很高，我们医院希望参与试点应用，请联系我们。',
    date: '2024-10-08',
    avatar: getAssetUrl('assets/images/avatar/avatar-2.webp'),
  },
];

// ----------------------------------------------------------------------

export default function AchievementDetailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const achievementId = searchParams.get('id');

  const [tabValue, setTabValue] = useState(0);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [ndaDialogOpen, setNdaDialogOpen] = useState(false);
  const [intentDialogOpen, setIntentDialogOpen] = useState(false);
  const [comment, setComment] = useState('');

  // In a real app, fetch achievement data based on achievementId
  useEffect(() => {
    if (!achievementId) {
      // If no ID provided, redirect to list
      navigate('/achievements/list');
    }
    // Here you would fetch the achievement data
    // fetchAchievementData(achievementId);
  }, [achievementId, navigate]);

  const achievement = MOCK_ACHIEVEMENT;

  const getTypeLabel = (type: AchievementType) => {
    switch (type) {
      case 'patent':
        return '专利';
      case 'paper':
        return '论文';
      case 'product':
        return '产品';
      default:
        return type;
    }
  };

  const getStageLabel = (stage: AchievementStage) => {
    switch (stage) {
      case 'research':
        return '研究阶段';
      case 'prototype':
        return '原型阶段';
      case 'pilot':
        return '试点阶段';
      case 'commercial':
        return '商业化';
      default:
        return stage;
    }
  };

  const getTypeColor = (type: AchievementType) => {
    switch (type) {
      case 'patent':
        return 'primary';
      case 'paper':
        return 'info';
      case 'product':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStageColor = (stage: AchievementStage) => {
    switch (stage) {
      case 'research':
        return 'default';
      case 'prototype':
        return 'info';
      case 'pilot':
        return 'warning';
      case 'commercial':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <>
      <Helmet>
        <title>{achievement.title} - 成果详情</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        {/* Header */}
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
          <Button
            variant="text"
            color="inherit"
            startIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
          >
            返回列表
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {/* Left Column - Main Content */}
          <Grid size={{ xs: 12, md: 8 }}>
            {/* Title and Basic Info */}
            <Card sx={{ p: 3, mb: 3 }}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={1}>
                  <Chip
                    label={getTypeLabel(achievement.type)}
                    color={getTypeColor(achievement.type)}
                    size="small"
                  />
                  <Chip
                    label={getStageLabel(achievement.stage)}
                    color={getStageColor(achievement.stage)}
                    size="small"
                    variant="outlined"
                  />
                  {achievement.licensable && (
                    <Chip label="可授权" color="success" size="small" variant="outlined" />
                  )}
                </Stack>

                <Typography variant="h4">{achievement.title}</Typography>

                <Stack direction="row" spacing={3} flexWrap="wrap">
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Iconify icon="mingcute:add-line" width={20} />
                    <Typography variant="body2" color="text.secondary">
                      {achievement.org}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Iconify icon="mingcute:add-line" width={20} />
                    <Typography variant="body2" color="text.secondary">
                      {achievement.authors.join('、')}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Iconify icon="mingcute:add-line" width={20} />
                    <Typography variant="body2" color="text.secondary">
                      {achievement.region}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Iconify icon="solar:clock-circle-outline" width={20} />
                    <Typography variant="body2" color="text.secondary">
                      {achievement.publishDate}
                    </Typography>
                  </Stack>
                </Stack>

                <Stack direction="row" spacing={0.5} flexWrap="wrap">
                  {achievement.techKeywords.map((keyword, index) => (
                    <Chip key={index} label={keyword} size="small" variant="outlined" />
                  ))}
                </Stack>
              </Stack>
            </Card>

            {/* Images */}
            <Card sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                成果展示
              </Typography>
              <Grid container spacing={2}>
                {achievement.images.map((image, index) => (
                  <Grid size={{ xs: 12, sm: 4 }} key={index}>
                    <Box
                      component="img"
                      src={image}
                      alt={`${achievement.title} - ${index + 1}`}
                      sx={{
                        width: '100%',
                        height: 200,
                        objectFit: 'cover',
                        borderRadius: 1,
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Card>

            {/* Tabs Content */}
            <Card sx={{ mb: 3 }}>
              <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
                <Tab label="成果介绍" />
                <Tab label="技术指标" />
                <Tab label="知识产权" />
                <Tab label="应用案例" />
              </Tabs>

              <Box sx={{ p: 3 }}>
                {/* Tab 0: Description */}
                {tabValue === 0 && (
                  <Stack spacing={2}>
                    <Typography variant="body1">{achievement.description}</Typography>
                    <Divider />
                    <Typography variant="subtitle2">支持文档</Typography>
                    <Stack spacing={1}>
                      {achievement.supportingDocs.map((doc, index) => (
                        <Stack key={index} direction="row" alignItems="center" spacing={1}>
                          <Iconify icon="mingcute:add-line" width={20} />
                          <Typography variant="body2">{doc}</Typography>
                          <Button size="small" variant="text">
                            下载
                          </Button>
                        </Stack>
                      ))}
                    </Stack>
                  </Stack>
                )}

                {/* Tab 1: Technical Specs */}
                {tabValue === 1 && (
                  <Stack spacing={2}>
                    {achievement.technicalSpecs.map((spec, index) => (
                      <Stack
                        key={index}
                        direction="row"
                        justifyContent="space-between"
                        sx={{ py: 1 }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          {spec.label}
                        </Typography>
                        <Typography variant="body2" fontWeight="medium">
                          {spec.value}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                )}

                {/* Tab 2: IP Info */}
                {tabValue === 2 && achievement.ipInfo && (
                  <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">
                        专利类型
                      </Typography>
                      <Typography variant="body2" fontWeight="medium">
                        {achievement.ipInfo.patentType}
                      </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">
                        申请日期
                      </Typography>
                      <Typography variant="body2" fontWeight="medium">
                        {achievement.ipInfo.applicationDate}
                      </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">
                        授权日期
                      </Typography>
                      <Typography variant="body2" fontWeight="medium">
                        {achievement.ipInfo.authorizationDate}
                      </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">
                        专利状态
                      </Typography>
                      <Chip
                        label={achievement.ipInfo.patentStatus}
                        color="success"
                        size="small"
                      />
                    </Stack>
                    <Divider />
                    <Typography variant="subtitle2">权利要求</Typography>
                    <Stack spacing={1}>
                      {achievement.ipInfo.claims?.map((claim, index) => (
                        <Typography key={index} variant="body2">
                          {index + 1}. {claim}
                        </Typography>
                      ))}
                    </Stack>
                  </Stack>
                )}

                {/* Tab 3: Applications */}
                {tabValue === 3 && (
                  <Stack spacing={3}>
                    {achievement.applications.map((app, index) => (
                      <Card key={index} variant="outlined" sx={{ p: 2 }}>
                        <Stack spacing={1}>
                          <Typography variant="subtitle2">{app.industry}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            <strong>应用场景：</strong>
                            {app.scenario}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            <strong>应用效益：</strong>
                            {app.benefits}
                          </Typography>
                        </Stack>
                      </Card>
                    ))}
                  </Stack>
                )}
              </Box>
            </Card>

            {/* Comments Section */}
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                需求方留言
              </Typography>

              <Stack spacing={3}>
                {MOCK_COMMENTS.map((commentItem) => (
                  <Stack key={commentItem.id} direction="row" spacing={2}>
                    <Avatar src={commentItem.avatar} alt={commentItem.author} />
                    <Stack spacing={1} sx={{ flexGrow: 1 }}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="subtitle2">{commentItem.author}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {commentItem.company}
                        </Typography>
                        <Typography variant="caption" color="text.disabled">
                          {commentItem.date}
                        </Typography>
                      </Stack>
                      <Typography variant="body2">{commentItem.content}</Typography>
                    </Stack>
                  </Stack>
                ))}

                <Divider />

                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="留下您的需求或问题..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button variant="contained" color="primary" sx={{ alignSelf: 'flex-end' }}>
                  发布留言
                </Button>
              </Stack>
            </Card>
          </Grid>

          {/* Right Column - Actions and Contact */}
          <Grid size={{ xs: 12, md: 4 }}>
            {/* Action Buttons */}
            <Card sx={{ p: 3, mb: 3 }}>
              <Stack spacing={2}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<Iconify icon="mingcute:add-line" />}
                  onClick={() => setContactDialogOpen(true)}
                >
                  发起对接
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  startIcon={<Iconify icon="solar:chat-round-dots-bold" />}
                >
                  申请技术咨询
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  startIcon={<Iconify icon="mingcute:add-line" />}
                  onClick={() => setNdaDialogOpen(true)}
                >
                  签署保密协议
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  startIcon={<Iconify icon="eva:trending-up-fill" />}
                  onClick={() => setIntentDialogOpen(true)}
                >
                  发布转让意向
                </Button>

                <Divider />

                <Stack direction="row" spacing={1}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="inherit"
                    startIcon={<Iconify icon="mingcute:add-line" />}
                  >
                    收藏
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="inherit"
                    startIcon={<Iconify icon="solar:share-bold" />}
                  >
                    分享
                  </Button>
                </Stack>
              </Stack>
            </Card>

            {/* Contact Info */}
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                联系方式
              </Typography>
              <Stack spacing={2}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Iconify icon="mingcute:add-line" width={20} />
                  <Typography variant="body2">{achievement.contact.name}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Iconify icon="mingcute:add-line" width={20} />
                  <Typography variant="body2">{achievement.contact.phone}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Iconify icon="mingcute:add-line" width={20} />
                  <Typography variant="body2">{achievement.contact.email}</Typography>
                </Stack>
                {achievement.contact.wechat && (
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Iconify icon="mingcute:add-line" width={20} />
                    <Typography variant="body2">{achievement.contact.wechat}</Typography>
                  </Stack>
                )}
              </Stack>
            </Card>
          </Grid>
        </Grid>

        {/* Contact Dialog */}
        <Dialog open={contactDialogOpen} onClose={() => setContactDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>发起对接</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField fullWidth label="您的姓名" required />
              <TextField fullWidth label="公司/机构" required />
              <TextField fullWidth label="联系电话" required />
              <TextField fullWidth label="邮箱" type="email" required />
              <TextField
                fullWidth
                label="对接需求"
                multiline
                rows={4}
                placeholder="请描述您的对接需求和合作意向..."
                required
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setContactDialogOpen(false)}>取消</Button>
            <Button variant="contained" onClick={() => setContactDialogOpen(false)}>
              提交
            </Button>
          </DialogActions>
        </Dialog>

        {/* NDA Dialog */}
        <Dialog open={ndaDialogOpen} onClose={() => setNdaDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>签署保密协议</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                在进行深入技术交流前，需要签署保密协议以保护双方权益。
              </Typography>
              <TextField fullWidth label="公司名称" required />
              <TextField fullWidth label="法人代表" required />
              <TextField fullWidth label="联系人" required />
              <TextField fullWidth label="联系电话" required />
              <TextField fullWidth label="电子邮箱" type="email" required />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setNdaDialogOpen(false)}>取消</Button>
            <Button variant="contained" onClick={() => setNdaDialogOpen(false)}>
              提交申请
            </Button>
          </DialogActions>
        </Dialog>

        {/* Intent Dialog */}
        <Dialog open={intentDialogOpen} onClose={() => setIntentDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>发布转让/许可意向</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <FormControl fullWidth>
                <InputLabel>意向类型</InputLabel>
                <Select label="意向类型" defaultValue="">
                  <MenuItem value="transfer">技术转让</MenuItem>
                  <MenuItem value="license">技术许可</MenuItem>
                  <MenuItem value="cooperation">合作开发</MenuItem>
                </Select>
              </FormControl>
              <TextField fullWidth label="预期价格范围" placeholder="例如：100-500万元" />
              <TextField
                fullWidth
                label="合作要求"
                multiline
                rows={4}
                placeholder="请描述您的合作要求和期望..."
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIntentDialogOpen(false)}>取消</Button>
            <Button variant="contained" onClick={() => setIntentDialogOpen(false)}>
              发布
            </Button>
          </DialogActions>
        </Dialog>
      </DashboardContent>
    </>
  );
}

