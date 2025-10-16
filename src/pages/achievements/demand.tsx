import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Iconify } from 'src/components/iconify';
import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

type DemandStatus = 'active' | 'closed' | 'matched';

type Demand = {
  demandId: string;
  title: string;
  company: string;
  description: string;
  requiredTechKeywords: string[];
  budgetRange: string;
  region: string;
  contact: {
    name: string;
    phone: string;
    email: string;
  };
  publishDate: string;
  status: DemandStatus;
  viewCount: number;
  intentCount: number;
};

type Intent = {
  intentId: string;
  demandId: string;
  provider: string;
  org: string;
  achievement: string;
  message: string;
  submitDate: string;
  status: 'pending' | 'accepted' | 'rejected';
};

type Negotiation = {
  negotiationId: string;
  demandId: string;
  partner: string;
  stage: 'initial' | 'technical' | 'commercial' | 'contract';
  lastUpdate: string;
  notes: string;
};

const MOCK_DEMANDS: Demand[] = [
  {
    demandId: 'DEM001',
    title: '寻求医学影像AI诊断技术合作',
    company: '某三甲医院',
    description:
      '我院希望引入先进的医学影像AI诊断系统，提升放射科诊断效率和准确率。要求系统支持CT、MRI等多种影像类型，诊断准确率≥95%。',
    requiredTechKeywords: ['深度学习', '医学影像', 'AI诊断', '高准确率'],
    budgetRange: '200-500万元',
    region: '北京',
    contact: {
      name: '王主任',
      phone: '13900139001',
      email: 'wang@hospital.com',
    },
    publishDate: '2024-10-01',
    status: 'active',
    viewCount: 156,
    intentCount: 8,
  },
  {
    demandId: 'DEM002',
    title: '新能源汽车电池技术需求',
    company: '某新能源汽车公司',
    description:
      '寻求高能量密度、长续航的动力电池技术。要求能量密度≥300Wh/kg，循环寿命≥2000次，安全性能优异。',
    requiredTechKeywords: ['动力电池', '高能量密度', '长续航', '安全性'],
    budgetRange: '1000-3000万元',
    region: '上海',
    contact: {
      name: '李总工',
      phone: '13800138002',
      email: 'li@evcompany.com',
    },
    publishDate: '2024-09-28',
    status: 'active',
    viewCount: 243,
    intentCount: 12,
  },
  {
    demandId: 'DEM003',
    title: '智能制造生产线改造方案',
    company: '某制造企业',
    description:
      '传统生产线需要进行智能化改造，引入工业机器人、视觉检测、数据分析等技术，提升生产效率和产品质量。',
    requiredTechKeywords: ['智能制造', '工业机器人', '视觉检测', '数据分析'],
    budgetRange: '500-1000万元',
    region: '深圳',
    contact: {
      name: '张厂长',
      phone: '13700137003',
      email: 'zhang@manufacture.com',
    },
    publishDate: '2024-09-20',
    status: 'matched',
    viewCount: 189,
    intentCount: 15,
  },
];

const MOCK_INTENTS: Intent[] = [
  {
    intentId: 'INT001',
    demandId: 'DEM001',
    provider: '张教授',
    org: '人工智能学院',
    achievement: '基于深度学习的医学影像智能诊断系统',
    message: '我们的系统完全符合贵院的需求，已在多家三甲医院试点应用，效果显著。',
    submitDate: '2024-10-05',
    status: 'pending',
  },
  {
    intentId: 'INT002',
    demandId: 'DEM001',
    provider: '李研究员',
    org: '医学影像研究所',
    achievement: 'CT影像肺结节智能检测系统',
    message: '我们专注于肺部疾病诊断，系统准确率达到98%以上。',
    submitDate: '2024-10-03',
    status: 'accepted',
  },
  {
    intentId: 'INT003',
    demandId: 'DEM001',
    provider: '王博士',
    org: '某医疗科技公司',
    achievement: '多模态医学影像分析平台',
    message: '我们提供完整的解决方案，包括系统部署、培训和售后服务。',
    submitDate: '2024-10-02',
    status: 'rejected',
  },
];

const MOCK_NEGOTIATIONS: Negotiation[] = [
  {
    negotiationId: 'NEG001',
    demandId: 'DEM001',
    partner: '张教授 - 人工智能学院',
    stage: 'technical',
    lastUpdate: '2024-10-10',
    notes: '已完成技术方案评审，准备进入商务谈判阶段',
  },
  {
    negotiationId: 'NEG002',
    demandId: 'DEM001',
    partner: '李研究员 - 医学影像研究所',
    stage: 'commercial',
    lastUpdate: '2024-10-08',
    notes: '正在商讨合作模式和价格方案',
  },
];

// ----------------------------------------------------------------------

export default function DemandPage() {
  const [tabValue, setTabValue] = useState(0);
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }, []);

  const getStatusLabel = (status: DemandStatus) => {
    switch (status) {
      case 'active':
        return '进行中';
      case 'closed':
        return '已关闭';
      case 'matched':
        return '已匹配';
      default:
        return status;
    }
  };

  const getStatusColor = (status: DemandStatus) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'closed':
        return 'default';
      case 'matched':
        return 'primary';
      default:
        return 'default';
    }
  };

  const getIntentStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return '待处理';
      case 'accepted':
        return '已接受';
      case 'rejected':
        return '已拒绝';
      default:
        return status;
    }
  };

  const getIntentStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'accepted':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStageLabel = (stage: string) => {
    switch (stage) {
      case 'initial':
        return '初步接触';
      case 'technical':
        return '技术评审';
      case 'commercial':
        return '商务谈判';
      case 'contract':
        return '合同签署';
      default:
        return stage;
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'initial':
        return 'default';
      case 'technical':
        return 'info';
      case 'commercial':
        return 'warning';
      case 'contract':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <>
      <Helmet>
        <title>企业需求 - 成果转化管理系统</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            企业需求管理
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={() => setPublishDialogOpen(true)}
          >
            发布需求
          </Button>
        </Box>

        {/* Tabs */}
        <Card sx={{ mb: 3 }}>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
            <Tab label="需求列表" />
            <Tab label="意向管理" />
            <Tab label="谈判记录" />
          </Tabs>
        </Card>

        {/* Tab 0: Demand List */}
        {tabValue === 0 && (
          <>
            {/* Search and Filter */}
            <Card sx={{ p: 3, mb: 3 }}>
              <Stack direction="row" spacing={2}>
                <TextField
                  fullWidth
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="搜索需求标题、公司、关键词..."
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel>状态</InputLabel>
                  <Select
                    value={statusFilter}
                    label="状态"
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <MenuItem value="all">全部状态</MenuItem>
                    <MenuItem value="active">进行中</MenuItem>
                    <MenuItem value="matched">已匹配</MenuItem>
                    <MenuItem value="closed">已关闭</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Card>

            {/* Demand Cards */}
            <Grid container spacing={3}>
              {MOCK_DEMANDS.map((demand) => (
                <Grid size={{ xs: 12 }} key={demand.demandId}>
                  <Card>
                    <Box sx={{ p: 3 }}>
                      <Grid container spacing={3}>
                        {/* Left: Main Info */}
                        <Grid size={{ xs: 12, md: 8 }}>
                          <Stack spacing={2}>
                            {/* Title and Status */}
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                {demand.title}
                              </Typography>
                              <Chip
                                label={getStatusLabel(demand.status)}
                                color={getStatusColor(demand.status)}
                                size="small"
                              />
                            </Stack>

                            {/* Company and Region */}
                            <Stack direction="row" spacing={3}>
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <Iconify icon="mingcute:add-line" width={18} />
                                <Typography variant="body2" color="text.secondary">
                                  {demand.company}
                                </Typography>
                              </Stack>
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <Iconify icon="mingcute:add-line" width={18} />
                                <Typography variant="body2" color="text.secondary">
                                  {demand.region}
                                </Typography>
                              </Stack>
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <Iconify icon="solar:clock-circle-outline" width={18} />
                                <Typography variant="body2" color="text.secondary">
                                  {demand.publishDate}
                                </Typography>
                              </Stack>
                            </Stack>

                            {/* Description */}
                            <Typography variant="body2" color="text.secondary">
                              {demand.description}
                            </Typography>

                            {/* Keywords */}
                            <Stack direction="row" spacing={0.5} flexWrap="wrap">
                              {demand.requiredTechKeywords.map((keyword, index) => (
                                <Chip key={index} label={keyword} size="small" variant="outlined" />
                              ))}
                            </Stack>

                            {/* Budget */}
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <Iconify icon="solar:cart-3-bold" width={18} />
                              <Typography variant="body2" fontWeight="medium">
                                预算范围：{demand.budgetRange}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Grid>

                        {/* Right: Stats and Actions */}
                        <Grid size={{ xs: 12, md: 4 }}>
                          <Stack spacing={2} sx={{ height: '100%' }}>
                            {/* Stats */}
                            <Card variant="outlined" sx={{ p: 2 }}>
                              <Stack spacing={1}>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  justifyContent="space-between"
                                >
                                  <Typography variant="body2" color="text.secondary">
                                    浏览量
                                  </Typography>
                                  <Typography variant="h6">{demand.viewCount}</Typography>
                                </Stack>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  justifyContent="space-between"
                                >
                                  <Typography variant="body2" color="text.secondary">
                                    意向方
                                  </Typography>
                                  <Typography variant="h6" color="primary.main">
                                    {demand.intentCount}
                                  </Typography>
                                </Stack>
                              </Stack>
                            </Card>

                            {/* Actions */}
                            <Stack spacing={1} sx={{ mt: 'auto' }}>
                              <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                startIcon={<Iconify icon="solar:eye-bold" />}
                              >
                                查看详情
                              </Button>
                              <Button
                                fullWidth
                                variant="outlined"
                                color="primary"
                                startIcon={<Iconify icon="solar:pen-bold" />}
                              >
                                编辑需求
                              </Button>
                            </Stack>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {/* Tab 1: Intent Management */}
        {tabValue === 1 && (
          <Card>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>需求标题</TableCell>
                    <TableCell>意向方</TableCell>
                    <TableCell>成果名称</TableCell>
                    <TableCell>提交时间</TableCell>
                    <TableCell>状态</TableCell>
                    <TableCell align="right">操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {MOCK_INTENTS.map((intent) => {
                    const demand = MOCK_DEMANDS.find((d) => d.demandId === intent.demandId);
                    return (
                      <TableRow key={intent.intentId} hover>
                        <TableCell>
                          <Typography variant="body2">{demand?.title}</Typography>
                        </TableCell>
                        <TableCell>
                          <Stack spacing={0.5}>
                            <Typography variant="body2" fontWeight="medium">
                              {intent.provider}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {intent.org}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{intent.achievement}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {intent.submitDate}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={getIntentStatusLabel(intent.status)}
                            color={getIntentStatusColor(intent.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Stack direction="row" spacing={1} justifyContent="flex-end">
                            {intent.status === 'pending' && (
                              <>
                                <Button size="small" variant="contained" color="success">
                                  接受
                                </Button>
                                <Button size="small" variant="outlined" color="error">
                                  拒绝
                                </Button>
                              </>
                            )}
                            <Button size="small" variant="text">
                              查看
                            </Button>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        )}

        {/* Tab 2: Negotiation Records */}
        {tabValue === 2 && (
          <Card>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>需求标题</TableCell>
                    <TableCell>合作方</TableCell>
                    <TableCell>谈判阶段</TableCell>
                    <TableCell>最后更新</TableCell>
                    <TableCell>备注</TableCell>
                    <TableCell align="right">操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {MOCK_NEGOTIATIONS.map((negotiation) => {
                    const demand = MOCK_DEMANDS.find((d) => d.demandId === negotiation.demandId);
                    return (
                      <TableRow key={negotiation.negotiationId} hover>
                        <TableCell>
                          <Typography variant="body2">{demand?.title}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{negotiation.partner}</Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={getStageLabel(negotiation.stage)}
                            color={getStageColor(negotiation.stage)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {negotiation.lastUpdate}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {negotiation.notes}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Stack direction="row" spacing={1} justifyContent="flex-end">
                            <Button size="small" variant="outlined">
                              更新
                            </Button>
                            <Button size="small" variant="text">
                              详情
                            </Button>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        )}

        {/* Publish Demand Dialog */}
        <Dialog open={publishDialogOpen} onClose={() => setPublishDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>发布企业需求</DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 1 }}>
              <TextField fullWidth label="需求标题" placeholder="简要描述您的技术需求" required />
              <TextField fullWidth label="公司名称" required />
              <TextField
                fullWidth
                label="需求描述"
                multiline
                rows={4}
                placeholder="详细描述您的技术需求、应用场景、技术指标等..."
                required
              />
              <TextField
                fullWidth
                label="技术关键词"
                placeholder="用逗号分隔，例如：深度学习,医学影像,AI诊断"
                helperText="请输入3-5个关键词，用逗号分隔"
                required
              />
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="预算范围" placeholder="例如：200-500万元" required />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth required>
                    <InputLabel>所在地区</InputLabel>
                    <Select label="所在地区" defaultValue="">
                      <MenuItem value="北京">北京</MenuItem>
                      <MenuItem value="上海">上海</MenuItem>
                      <MenuItem value="深圳">深圳</MenuItem>
                      <MenuItem value="广州">广州</MenuItem>
                      <MenuItem value="杭州">杭州</MenuItem>
                      <MenuItem value="成都">成都</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Divider />
              <Typography variant="subtitle2">联系方式</Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextField fullWidth label="联系人" required />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextField fullWidth label="联系电话" required />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextField fullWidth label="邮箱" type="email" required />
                </Grid>
              </Grid>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setPublishDialogOpen(false)}>取消</Button>
            <Button variant="contained" onClick={() => setPublishDialogOpen(false)}>
              发布需求
            </Button>
          </DialogActions>
        </Dialog>
      </DashboardContent>
    </>
  );
}

