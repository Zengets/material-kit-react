import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';

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
  description?: string;
  image?: string;
  publishDate?: string;
  licensable?: boolean;
  region?: string;
};

const MOCK_ACHIEVEMENTS: Achievement[] = [
  {
    achievementId: 'ACH001',
    title: '基于深度学习的医学影像智能诊断系统',
    type: 'product',
    authors: ['张教授', '李研究员', '王博士'],
    org: '人工智能学院',
    stage: 'pilot',
    techKeywords: ['深度学习', '医学影像', 'AI诊断', '卷积神经网络'],
    supportingDocs: ['技术报告.pdf', '测试数据.xlsx'],
    description: '采用先进的深度学习算法，实现对CT、MRI等医学影像的智能分析和辅助诊断',
    image: getAssetUrl('assets/images/cover/cover-1.webp'),
    publishDate: '2024-09-15',
    licensable: true,
    region: '北京',
  },
  {
    achievementId: 'ACH002',
    title: '高效太阳能电池材料制备方法',
    type: 'patent',
    authors: ['陈教授', '刘工程师'],
    org: '材料科学学院',
    patentNo: 'CN202410123456.7',
    stage: 'commercial',
    techKeywords: ['太阳能', '钙钛矿', '光伏材料', '能源转换'],
    supportingDocs: ['专利说明书.pdf', '实验数据.pdf'],
    description: '一种新型钙钛矿太阳能电池材料的制备方法，转换效率提升至25%以上',
    image: getAssetUrl('assets/images/cover/cover-2.webp'),
    publishDate: '2024-08-20',
    licensable: true,
    region: '上海',
  },
  {
    achievementId: 'ACH003',
    title: '量子计算在密码学中的应用研究',
    type: 'paper',
    authors: ['赵教授', '孙博士', '周研究员'],
    org: '计算机科学学院',
    stage: 'research',
    techKeywords: ['量子计算', '密码学', '量子算法', '信息安全'],
    supportingDocs: ['论文全文.pdf', '算法代码.zip'],
    description: '探索量子计算在现代密码学中的应用，提出新型量子抗性加密算法',
    image: getAssetUrl('assets/images/cover/cover-3.webp'),
    publishDate: '2024-10-01',
    licensable: false,
    region: '深圳',
  },
  {
    achievementId: 'ACH004',
    title: '智能机器人自主导航系统',
    type: 'product',
    authors: ['吴教授', '郑工程师'],
    org: '机器人研究所',
    stage: 'prototype',
    techKeywords: ['机器人', '自主导航', 'SLAM', '路径规划'],
    supportingDocs: ['系统架构.pdf', '演示视频.mp4'],
    description: '基于视觉SLAM的机器人自主导航系统，适用于复杂室内外环境',
    image: getAssetUrl('assets/images/cover/cover-4.webp'),
    publishDate: '2024-07-10',
    licensable: true,
    region: '广州',
  },
  {
    achievementId: 'ACH005',
    title: '新型生物降解塑料材料',
    type: 'patent',
    authors: ['冯教授', '何研究员'],
    org: '环境工程学院',
    patentNo: 'CN202410234567.8',
    stage: 'pilot',
    techKeywords: ['生物降解', '环保材料', '聚乳酸', '可持续发展'],
    supportingDocs: ['专利文件.pdf', '降解测试报告.pdf'],
    description: '一种可在自然环境中快速降解的新型塑料材料，降解周期缩短至3个月',
    image: getAssetUrl('assets/images/cover/cover-5.webp'),
    publishDate: '2024-06-25',
    licensable: true,
    region: '杭州',
  },
  {
    achievementId: 'ACH006',
    title: '5G通信网络优化算法',
    type: 'paper',
    authors: ['韩教授', '曹博士'],
    org: '通信工程学院',
    stage: 'commercial',
    techKeywords: ['5G', '网络优化', '资源分配', '通信算法'],
    supportingDocs: ['论文PDF.pdf', '仿真结果.xlsx'],
    description: '针对5G网络的资源分配优化算法，显著提升网络吞吐量和用户体验',
    image: getAssetUrl('assets/images/cover/cover-6.webp'),
    publishDate: '2024-09-05',
    licensable: true,
    region: '成都',
  },
];

const TYPE_OPTIONS = [
  { value: 'all', label: '全部类型' },
  { value: 'patent', label: '专利' },
  { value: 'paper', label: '论文' },
  { value: 'product', label: '产品' },
];

const STAGE_OPTIONS = [
  { value: 'all', label: '全部阶段' },
  { value: 'research', label: '研究阶段' },
  { value: 'prototype', label: '原型阶段' },
  { value: 'pilot', label: '试点阶段' },
  { value: 'commercial', label: '商业化' },
];

const FIELD_OPTIONS = [
  { value: 'all', label: '全部领域' },
  { value: 'ai', label: '人工智能' },
  { value: 'materials', label: '新材料' },
  { value: 'energy', label: '新能源' },
  { value: 'biotech', label: '生物技术' },
  { value: 'electronics', label: '电子信息' },
];

const REGION_OPTIONS = [
  { value: 'all', label: '全部地区' },
  { value: '北京', label: '北京' },
  { value: '上海', label: '上海' },
  { value: '深圳', label: '深圳' },
  { value: '广州', label: '广州' },
  { value: '杭州', label: '杭州' },
];

// ----------------------------------------------------------------------

export default function AchievementsListPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [stageFilter, setStageFilter] = useState('all');
  const [fieldFilter, setFieldFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [licensableOnly, setLicensableOnly] = useState(false);

  const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }, []);

  const handleViewDetail = useCallback(
    (achievementId: string) => {
      navigate(`/achievements/detail?id=${achievementId}`);
    },
    [navigate]
  );

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
        <title>成果库 - 成果转化管理系统</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            成果库
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            发布成果
          </Button>
        </Box>

        {/* Search and Filters */}
        <Card sx={{ p: 3, mb: 3 }}>
          <Stack spacing={3}>
            {/* Search Bar */}
            <TextField
              fullWidth
              value={searchQuery}
              onChange={handleSearch}
              placeholder="搜索成果标题、关键词、作者..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
            />

            {/* Filters */}
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>类型</InputLabel>
                  <Select
                    value={typeFilter}
                    label="类型"
                    onChange={(e) => setTypeFilter(e.target.value)}
                  >
                    {TYPE_OPTIONS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>阶段</InputLabel>
                  <Select
                    value={stageFilter}
                    label="阶段"
                    onChange={(e) => setStageFilter(e.target.value)}
                  >
                    {STAGE_OPTIONS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>领域</InputLabel>
                  <Select
                    value={fieldFilter}
                    label="领域"
                    onChange={(e) => setFieldFilter(e.target.value)}
                  >
                    {FIELD_OPTIONS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>地区</InputLabel>
                  <Select
                    value={regionFilter}
                    label="地区"
                    onChange={(e) => setRegionFilter(e.target.value)}
                  >
                    {REGION_OPTIONS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
                <Button
                  fullWidth
                  variant={licensableOnly ? 'contained' : 'outlined'}
                  color="primary"
                  onClick={() => setLicensableOnly(!licensableOnly)}
                  sx={{ height: '40px' }}
                >
                  可授权
                </Button>
              </Grid>
            </Grid>

            {/* Active Filters */}
            {(typeFilter !== 'all' ||
              stageFilter !== 'all' ||
              fieldFilter !== 'all' ||
              regionFilter !== 'all' ||
              licensableOnly) && (
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {typeFilter !== 'all' && (
                  <Chip
                    label={`类型: ${TYPE_OPTIONS.find((o) => o.value === typeFilter)?.label}`}
                    onDelete={() => setTypeFilter('all')}
                    size="small"
                  />
                )}
                {stageFilter !== 'all' && (
                  <Chip
                    label={`阶段: ${STAGE_OPTIONS.find((o) => o.value === stageFilter)?.label}`}
                    onDelete={() => setStageFilter('all')}
                    size="small"
                  />
                )}
                {fieldFilter !== 'all' && (
                  <Chip
                    label={`领域: ${FIELD_OPTIONS.find((o) => o.value === fieldFilter)?.label}`}
                    onDelete={() => setFieldFilter('all')}
                    size="small"
                  />
                )}
                {regionFilter !== 'all' && (
                  <Chip
                    label={`地区: ${regionFilter}`}
                    onDelete={() => setRegionFilter('all')}
                    size="small"
                  />
                )}
                {licensableOnly && (
                  <Chip
                    label="可授权"
                    onDelete={() => setLicensableOnly(false)}
                    size="small"
                  />
                )}
              </Stack>
            )}
          </Stack>
        </Card>

        {/* Results Summary */}
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            共找到 {MOCK_ACHIEVEMENTS.length} 个成果
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              variant="outlined"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              导出清单
            </Button>
          </Stack>
        </Box>

        {/* Achievement Cards */}
        <Grid container spacing={3}>
          {MOCK_ACHIEVEMENTS.map((achievement) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={achievement.achievementId}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    boxShadow: (theme) => theme.shadows[20],
                    cursor: 'pointer',
                  },
                }}
                onClick={() => handleViewDetail(achievement.achievementId)}
              >
                {/* Image */}
                {achievement.image && (
                  <Box
                    component="img"
                    src={achievement.image}
                    alt={achievement.title}
                    sx={{
                      width: '100%',
                      height: 200,
                      objectFit: 'cover',
                    }}
                  />
                )}

                {/* Content */}
                <Stack spacing={2} sx={{ p: 3, flexGrow: 1 }}>
                  {/* Type and Stage */}
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

                  {/* Title */}
                  <Typography variant="h6" sx={{ minHeight: 64 }}>
                    {achievement.title}
                  </Typography>

                  {/* Organization */}
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Iconify icon="mingcute:add-line" width={16} />
                    <Typography variant="body2" color="text.secondary">
                      {achievement.org}
                    </Typography>
                  </Stack>

                  {/* Authors */}
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Iconify icon="mingcute:add-line" width={16} />
                    <Typography variant="body2" color="text.secondary">
                      {achievement.authors.join('、')}
                    </Typography>
                  </Stack>

                  {/* Keywords */}
                  <Stack direction="row" spacing={0.5} flexWrap="wrap">
                    {achievement.techKeywords.slice(0, 3).map((keyword, index) => (
                      <Chip key={index} label={keyword} size="small" variant="outlined" />
                    ))}
                    {achievement.techKeywords.length > 3 && (
                      <Chip
                        label={`+${achievement.techKeywords.length - 3}`}
                        size="small"
                        variant="outlined"
                      />
                    )}
                  </Stack>

                  <Divider />

                  {/* Actions */}
                  <Stack direction="row" spacing={1}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="small"
                      startIcon={<Iconify icon="mingcute:add-line" />}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle apply for connection
                      }}
                    >
                      申请对接
                    </Button>
                    <IconButton
                      size="small"
                      color="default"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle favorite
                      }}
                    >
                      <Iconify icon="mingcute:add-line" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="default"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle share
                      }}
                    >
                      <Iconify icon="solar:share-bold" />
                    </IconButton>
                  </Stack>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </DashboardContent>
    </>
  );
}

