import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';

import { Iconify } from 'src/components/iconify';
import { DashboardContent } from 'src/layouts/dashboard';
import { getAssetUrl } from 'src/utils/get-asset-url';

// ----------------------------------------------------------------------

type MatchCandidate = {
  id: string;
  type: 'company' | 'achievement';
  name: string;
  description: string;
  matchScore: number;
  matchReasons: {
    category: string;
    reason: string;
    score: number;
  }[];
  keywords: string[];
  region: string;
  industry?: string;
  contact: {
    name: string;
    phone: string;
    email: string;
  };
  image?: string;
  cooperationHistory?: number;
};

const MOCK_MATCHES: MatchCandidate[] = [
  {
    id: 'M001',
    type: 'company',
    name: '智慧医疗科技有限公司',
    description: '专注于医疗AI产品研发和推广，拥有多家三甲医院合作资源',
    matchScore: 95,
    matchReasons: [
      { category: '关键词匹配', reason: '深度学习、医学影像、AI诊断', score: 98 },
      { category: '行业领域', reason: '医疗健康行业', score: 95 },
      { category: '地域优势', reason: '同在北京地区', score: 90 },
      { category: '合作历史', reason: '曾合作过2个项目', score: 92 },
    ],
    keywords: ['医疗AI', '影像诊断', '深度学习', '医院资源'],
    region: '北京',
    industry: '医疗健康',
    contact: {
      name: '李总',
      phone: '13900139001',
      email: 'li@smartmedical.com',
    },
    image: getAssetUrl('assets/images/cover/cover-1.webp'),
    cooperationHistory: 2,
  },
  {
    id: 'M002',
    type: 'company',
    name: '华康医疗设备集团',
    description: '国内领先的医疗设备制造商，寻求AI技术升级传统医疗设备',
    matchScore: 88,
    matchReasons: [
      { category: '关键词匹配', reason: '医学影像、智能诊断', score: 85 },
      { category: '行业领域', reason: '医疗设备制造', score: 90 },
      { category: '技术需求', reason: '急需AI技术升级产品线', score: 92 },
      { category: '资金实力', reason: '年营收超10亿，资金充足', score: 88 },
    ],
    keywords: ['医疗设备', 'AI升级', '产品创新', '资金充足'],
    region: '上海',
    industry: '医疗设备',
    contact: {
      name: '王经理',
      phone: '13800138002',
      email: 'wang@huakang.com',
    },
    image: getAssetUrl('assets/images/cover/cover-2.webp'),
    cooperationHistory: 0,
  },
  {
    id: 'M003',
    type: 'company',
    name: '远程医疗服务平台',
    description: '提供远程医疗咨询服务，需要AI诊断系统提升服务能力',
    matchScore: 82,
    matchReasons: [
      { category: '关键词匹配', reason: '医学影像、远程诊断', score: 80 },
      { category: '应用场景', reason: '远程医疗场景完美契合', score: 88 },
      { category: '市场潜力', reason: '覆盖全国200+城市', score: 85 },
      { category: '合作意愿', reason: '已主动咨询过类似项目', score: 78 },
    ],
    keywords: ['远程医疗', '在线诊断', '基层医疗', '平台服务'],
    region: '深圳',
    industry: '互联网医疗',
    contact: {
      name: '张总监',
      phone: '13700137003',
      email: 'zhang@telehealth.com',
    },
    image: getAssetUrl('assets/images/cover/cover-3.webp'),
    cooperationHistory: 0,
  },
  {
    id: 'M004',
    type: 'achievement',
    name: '医疗大数据分析平台',
    description: '可与影像诊断系统形成互补，共同打造医疗AI生态',
    matchScore: 75,
    matchReasons: [
      { category: '技术互补', reason: '数据分析与影像诊断互补', score: 78 },
      { category: '协同效应', reason: '可形成完整解决方案', score: 80 },
      { category: '市场协同', reason: '目标客户群体重叠', score: 72 },
      { category: '联合推广', reason: '可联合推广降低成本', score: 70 },
    ],
    keywords: ['医疗大数据', '数据分析', '协同创新'],
    region: '北京',
    industry: '医疗健康',
    contact: {
      name: '陈教授',
      phone: '13600136004',
      email: 'chen@university.edu.cn',
    },
    image: getAssetUrl('assets/images/cover/cover-4.webp'),
  },
];

// ----------------------------------------------------------------------

export default function AchievementMatchPage() {
  const [sortBy, setSortBy] = useState('score');
  const [filterType, setFilterType] = useState('all');
  const [filterRegion, setFilterRegion] = useState('all');
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<MatchCandidate | null>(null);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

  const handleContact = (match: MatchCandidate) => {
    setSelectedMatch(match);
    setContactDialogOpen(true);
  };

  const getScoreColor = (score: number): 'success' | 'info' | 'warning' | 'error' => {
    if (score >= 90) return 'success';
    if (score >= 80) return 'info';
    if (score >= 70) return 'warning';
    return 'error';
  };

  return (
    <>
      <Helmet>
        <title>智能匹配 - 成果转化管理系统</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            企业需求智能匹配
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={() => setSaveDialogOpen(true)}
          >
            保存匹配方案
          </Button>
        </Box>

        {/* Source Achievement Info */}
        <Card sx={{ p: 3, mb: 3, bgcolor: 'primary.lighter' }}>
          <Stack direction="row" alignItems="center" spacing={3}>
            <Box
              component="img"
              src={getAssetUrl('assets/images/cover/cover-1.webp')}
              alt="成果"
              sx={{
                width: 120,
                height: 120,
                objectFit: 'cover',
                borderRadius: 2,
              }}
            />
            <Stack spacing={1} sx={{ flexGrow: 1 }}>
              <Typography variant="h6">基于深度学习的医学影像智能诊断系统</Typography>
              <Stack direction="row" spacing={1}>
                <Chip label="产品" color="success" size="small" />
                <Chip label="试点阶段" color="warning" size="small" variant="outlined" />
              </Stack>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {['深度学习', '医学影像', 'AI诊断', '卷积神经网络'].map((keyword, index) => (
                  <Chip key={index} label={keyword} size="small" variant="outlined" />
                ))}
              </Stack>
            </Stack>
            <Button variant="contained" color="primary" startIcon={<Iconify icon="solar:restart-bold" />}>
              重新匹配
            </Button>
          </Stack>
        </Card>

        {/* Filters */}
        <Card sx={{ p: 3, mb: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="subtitle2" sx={{ minWidth: 80 }}>
              筛选条件：
            </Typography>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>排序方式</InputLabel>
              <Select value={sortBy} label="排序方式" onChange={(e) => setSortBy(e.target.value)}>
                <MenuItem value="score">匹配度从高到低</MenuItem>
                <MenuItem value="history">合作历史优先</MenuItem>
                <MenuItem value="region">同地区优先</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>类型</InputLabel>
              <Select
                value={filterType}
                label="类型"
                onChange={(e) => setFilterType(e.target.value)}
              >
                <MenuItem value="all">全部</MenuItem>
                <MenuItem value="company">企业</MenuItem>
                <MenuItem value="achievement">成果</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>地区</InputLabel>
              <Select
                value={filterRegion}
                label="地区"
                onChange={(e) => setFilterRegion(e.target.value)}
              >
                <MenuItem value="all">全部地区</MenuItem>
                <MenuItem value="北京">北京</MenuItem>
                <MenuItem value="上海">上海</MenuItem>
                <MenuItem value="深圳">深圳</MenuItem>
                <MenuItem value="广州">广州</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Card>

        {/* Match Results Summary */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary">
            为您找到 <strong>{MOCK_MATCHES.length}</strong> 个匹配候选，其中高度匹配{' '}
            <strong>{MOCK_MATCHES.filter((m) => m.matchScore >= 90).length}</strong> 个
          </Typography>
        </Box>

        {/* Match Cards */}
        <Stack spacing={3}>
          {MOCK_MATCHES.map((match) => (
            <Card key={match.id} sx={{ overflow: 'visible' }}>
              <Grid container>
                {/* Left: Image and Basic Info */}
                <Grid size={{ xs: 12, md: 3 }}>
                  <Box sx={{ p: 3, height: '100%' }}>
                    <Stack spacing={2} alignItems="center">
                      {match.image && (
                        <Box
                          component="img"
                          src={match.image}
                          alt={match.name}
                          sx={{
                            width: '100%',
                            height: 150,
                            objectFit: 'cover',
                            borderRadius: 2,
                          }}
                        />
                      )}
                      <Box sx={{ textAlign: 'center', width: '100%' }}>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                          {match.name}
                        </Typography>
                        <Chip
                          label={match.type === 'company' ? '企业' : '成果'}
                          color={match.type === 'company' ? 'primary' : 'info'}
                          size="small"
                        />
                      </Box>
                    </Stack>
                  </Box>
                </Grid>

                {/* Middle: Match Details */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{ p: 3 }}>
                    <Stack spacing={2}>
                      {/* Match Score */}
                      <Box>
                        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                          <Typography variant="subtitle2">匹配度</Typography>
                          <Chip
                            label={`${match.matchScore}%`}
                            color={getScoreColor(match.matchScore)}
                            size="small"
                          />
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={match.matchScore}
                          color={getScoreColor(match.matchScore)}
                          sx={{ height: 8, borderRadius: 1 }}
                        />
                      </Box>

                      {/* Description */}
                      <Typography variant="body2" color="text.secondary">
                        {match.description}
                      </Typography>

                      {/* Match Reasons */}
                      <Box>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          匹配理由：
                        </Typography>
                        <Grid container spacing={1}>
                          {match.matchReasons.map((reason, index) => (
                            <Grid size={{ xs: 12, sm: 6 }} key={index}>
                              <Card variant="outlined" sx={{ p: 1.5 }}>
                                <Stack spacing={0.5}>
                                  <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                  >
                                    <Typography variant="caption" fontWeight="medium">
                                      {reason.category}
                                    </Typography>
                                    <Typography variant="caption" color="primary">
                                      {reason.score}分
                                    </Typography>
                                  </Stack>
                                  <Typography variant="caption" color="text.secondary">
                                    {reason.reason}
                                  </Typography>
                                </Stack>
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>

                      {/* Keywords and Region */}
                      <Stack direction="row" spacing={2} flexWrap="wrap">
                        <Stack direction="row" spacing={0.5} flexWrap="wrap">
                          {match.keywords.map((keyword, index) => (
                            <Chip key={index} label={keyword} size="small" variant="outlined" />
                          ))}
                        </Stack>
                      </Stack>

                      <Stack direction="row" spacing={2}>
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                          <Iconify icon="mingcute:add-line" width={16} />
                          <Typography variant="caption">{match.region}</Typography>
                        </Stack>
                        {match.industry && (
                          <Stack direction="row" alignItems="center" spacing={0.5}>
                            <Iconify icon="mingcute:add-line" width={16} />
                            <Typography variant="caption">{match.industry}</Typography>
                          </Stack>
                        )}
                        {match.cooperationHistory !== undefined && match.cooperationHistory > 0 && (
                          <Stack direction="row" alignItems="center" spacing={0.5}>
                            <Iconify icon="solar:check-circle-bold" width={16} />
                            <Typography variant="caption">
                              已合作{match.cooperationHistory}次
                            </Typography>
                          </Stack>
                        )}
                      </Stack>
                    </Stack>
                  </Box>
                </Grid>

                {/* Right: Actions */}
                <Grid size={{ xs: 12, md: 3 }}>
                  <Box
                    sx={{
                      p: 3,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <Stack spacing={2}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        startIcon={<Iconify icon="mingcute:add-line" />}
                        onClick={() => handleContact(match)}
                      >
                        一键对接
                      </Button>
                      <Button
                        fullWidth
                        variant="outlined"
                        color="primary"
                        startIcon={<Iconify icon="solar:eye-bold" />}
                      >
                        查看详情
                      </Button>
                      <Divider />
                      <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
                        联系人：{match.contact.name}
                      </Typography>
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          ))}
        </Stack>

        {/* Contact Dialog */}
        <Dialog
          open={contactDialogOpen}
          onClose={() => setContactDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>发起对接 - {selectedMatch?.name}</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                系统将自动发送对接邀请给对方，并抄送给您。
              </Typography>
              <TextField fullWidth label="您的姓名" required />
              <TextField fullWidth label="您的职位" required />
              <TextField fullWidth label="联系电话" required />
              <TextField fullWidth label="邮箱" type="email" required />
              <TextField
                fullWidth
                label="对接说明"
                multiline
                rows={4}
                placeholder="请简要说明对接目的和期望..."
                required
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setContactDialogOpen(false)}>取消</Button>
            <Button
              variant="contained"
              onClick={() => {
                setContactDialogOpen(false);
                // Handle submit
              }}
            >
              发送对接邀请
            </Button>
          </DialogActions>
        </Dialog>

        {/* Save Dialog */}
        <Dialog open={saveDialogOpen} onClose={() => setSaveDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>保存匹配方案</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField fullWidth label="方案名称" placeholder="例如：医学影像AI匹配方案" required />
              <TextField
                fullWidth
                label="方案说明"
                multiline
                rows={3}
                placeholder="请简要说明本次匹配的目的和预期..."
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSaveDialogOpen(false)}>取消</Button>
            <Button variant="contained" onClick={() => setSaveDialogOpen(false)}>
              保存
            </Button>
          </DialogActions>
        </Dialog>
      </DashboardContent>
    </>
  );
}

