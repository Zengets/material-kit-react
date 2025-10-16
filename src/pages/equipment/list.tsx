import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';

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
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';
import { DashboardContent } from 'src/layouts/dashboard';
import { getAssetUrl } from 'src/utils/get-asset-url';

// ----------------------------------------------------------------------

type DeviceStatus = 'available' | 'inUse' | 'maintenance';

type Device = {
  deviceId: string;
  name: string;
  model: string;
  specs: string;
  location: {
    campus: string;
    lab: string;
  };
  availabilitySchedule: string;
  status: DeviceStatus;
  ownerOrg: string;
  contact: string;
  image?: string;
  tags?: string[];
  rating?: number;
};

const MOCK_DEVICES: Device[] = [
  {
    deviceId: 'DEV001',
    name: '高精度三维扫描仪',
    model: 'Artec Eva',
    specs: '精度0.1mm, 扫描速度16fps',
    location: { campus: '东校区', lab: '工程实验室A301' },
    availabilitySchedule: '周一至周五 9:00-18:00',
    status: 'available',
    ownerOrg: '机械工程学院',
    contact: '张老师 13800138001',
    image: getAssetUrl('assets/images/cover/cover-1.webp'),
    tags: ['3D扫描', '高精度', '热门'],
    rating: 4.8,
  },
  {
    deviceId: 'DEV002',
    name: '电子显微镜',
    model: 'ZEISS Sigma 300',
    specs: '分辨率1.0nm, 放大倍数20-1000000x',
    location: { campus: '西校区', lab: '材料分析中心B205' },
    availabilitySchedule: '周一至周日 8:00-22:00',
    status: 'inUse',
    ownerOrg: '材料科学学院',
    contact: '李老师 13900139002',
    image: getAssetUrl('assets/images/cover/cover-2.webp'),
    tags: ['显微镜', '纳米级'],
    rating: 4.9,
  },
  {
    deviceId: 'DEV003',
    name: '激光切割机',
    model: 'Trotec Speedy 400',
    specs: '工作区域1000x600mm, 功率120W',
    location: { campus: '东校区', lab: '创客空间C101' },
    availabilitySchedule: '周一至周五 10:00-20:00',
    status: 'available',
    ownerOrg: '创新创业中心',
    contact: '王老师 13700137003',
    image: getAssetUrl('assets/images/cover/cover-3.webp'),
    tags: ['激光加工', '创客'],
    rating: 4.6,
  },
  {
    deviceId: 'DEV004',
    name: '高性能计算集群',
    model: 'Dell PowerEdge C6420',
    specs: '256核心, 1TB内存, 100TB存储',
    location: { campus: '西校区', lab: '数据中心D401' },
    availabilitySchedule: '7x24小时',
    status: 'available',
    ownerOrg: '计算机学院',
    contact: '赵老师 13600136004',
    image: getAssetUrl('assets/images/cover/cover-4.webp'),
    tags: ['计算', 'AI训练'],
    rating: 4.7,
  },
  {
    deviceId: 'DEV005',
    name: '光谱分析仪',
    model: 'Thermo iCAP 7400',
    specs: '波长范围165-900nm',
    location: { campus: '东校区', lab: '化学分析室E302' },
    availabilitySchedule: '周一至周五 9:00-17:00',
    status: 'maintenance',
    ownerOrg: '化学学院',
    contact: '刘老师 13500135005',
    image: getAssetUrl('assets/images/cover/cover-5.webp'),
    tags: ['光谱', '化学分析'],
    rating: 4.5,
  },
  {
    deviceId: 'DEV006',
    name: '3D打印机',
    model: 'Stratasys F370',
    specs: '成型尺寸355x305x305mm',
    location: { campus: '东校区', lab: '创客空间C102' },
    availabilitySchedule: '周一至周日 9:00-21:00',
    status: 'available',
    ownerOrg: '创新创业中心',
    contact: '王老师 13700137003',
    image: getAssetUrl('assets/images/cover/cover-6.webp'),
    tags: ['3D打印', '快速成型', '热门'],
    rating: 4.7,
  },
];

const STATUS_OPTIONS = [
  { value: 'all', label: '全部状态' },
  { value: 'available', label: '可用' },
  { value: 'inUse', label: '使用中' },
  { value: 'maintenance', label: '维护中' },
];

const CAMPUS_OPTIONS = [
  { value: 'all', label: '全部校区' },
  { value: '东校区', label: '东校区' },
  { value: '西校区', label: '西校区' },
];

// ----------------------------------------------------------------------

export default function EquipmentListPage() {
  const [viewMode, setViewMode] = useState<'list' | 'card' | 'map'>('card');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [campusFilter, setCampusFilter] = useState('all');
  const [devices] = useState<Device[]>(MOCK_DEVICES);

  const handleViewModeChange = useCallback(
    (_event: React.MouseEvent<HTMLElement>, newMode: 'list' | 'card' | 'map' | null) => {
      if (newMode !== null) {
        setViewMode(newMode);
      }
    },
    []
  );

  const handleExport = useCallback(() => {
    console.log('导出设备清单');
    // TODO: 实现导出功能
  }, []);

  const handleBooking = useCallback((deviceId: string) => {
    console.log('快速预约设备:', deviceId);
    // TODO: 跳转到预约页面
  }, []);

  const handleFavorite = useCallback((deviceId: string) => {
    console.log('收藏设备:', deviceId);
    // TODO: 实现收藏功能
  }, []);

  const filteredDevices = devices.filter((device) => {
    const matchSearch =
      searchQuery === '' ||
      device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.model.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'all' || device.status === statusFilter;
    const matchCampus = campusFilter === 'all' || device.location.campus === campusFilter;
    return matchSearch && matchStatus && matchCampus;
  });

  const getStatusColor = (status: DeviceStatus) => {
    switch (status) {
      case 'available':
        return 'success';
      case 'inUse':
        return 'warning';
      case 'maintenance':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: DeviceStatus) => {
    switch (status) {
      case 'available':
        return '可用';
      case 'inUse':
        return '使用中';
      case 'maintenance':
        return '维护中';
      default:
        return status;
    }
  };

  const renderFilters = (
    <Card sx={{ p: 3, mb: 3 }}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TextField
            fullWidth
            placeholder="搜索设备名称、型号..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>状态</InputLabel>
            <Select
              value={statusFilter}
              label="状态"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {STATUS_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>校区</InputLabel>
            <Select
              value={campusFilter}
              label="校区"
              onChange={(e) => setCampusFilter(e.target.value)}
            >
              {CAMPUS_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Stack>
    </Card>
  );

  const renderCardView = (
    <Grid container spacing={3}>
      {filteredDevices.map((device) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={device.deviceId}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              '&:hover': {
                boxShadow: (theme) => theme.customShadows.z24,
                cursor: 'pointer',
              },
            }}
          >
            <Box
              sx={{
                pt: '100%',
                position: 'relative',
                bgcolor: 'background.neutral',
              }}
            >
              <Box
                component="img"
                src={device.image || getAssetUrl('assets/images/equipment/default.jpg')}
                sx={{
                  top: 0,
                  width: 1,
                  height: 1,
                  objectFit: 'cover',
                  position: 'absolute',
                }}
                onError={(e) => {
                  e.currentTarget.src = getAssetUrl('assets/placeholder.svg');
                }}
              />
              <Chip
                label={getStatusLabel(device.status)}
                color={getStatusColor(device.status)}
                size="small"
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                }}
              />
            </Box>

            <Stack spacing={2} sx={{ p: 3, flexGrow: 1 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" noWrap>
                  {device.name}
                </Typography>
                <IconButton size="small" onClick={() => handleFavorite(device.deviceId)}>
                  <Iconify icon={"solar:heart-outline" as any} />
                </IconButton>
              </Stack>

              <Typography variant="body2" color="text.secondary" noWrap>
                {device.model}
              </Typography>

              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {device.tags?.map((tag) => (
                  <Chip key={tag} label={tag} size="small" variant="outlined" />
                ))}
              </Stack>

              <Stack spacing={1}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Iconify icon={"solar:map-point-bold" as any} width={16} sx={{ color: 'text.disabled' }} />
                  <Typography variant="caption" color="text.secondary">
                    {device.location.campus} - {device.location.lab}
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <Iconify icon={"solar:clock-circle-bold" as any} width={16} sx={{ color: 'text.disabled' }} />
                  <Typography variant="caption" color="text.secondary">
                    {device.availabilitySchedule}
                  </Typography>
                </Stack>

                {device.rating && (
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Iconify icon={"solar:star-bold" as any} width={16} sx={{ color: 'warning.main' }} />
                    <Typography variant="caption" color="text.secondary">
                      {device.rating.toFixed(1)} 分
                    </Typography>
                  </Stack>
                )}
              </Stack>

              <Stack direction="row" spacing={1} sx={{ mt: 'auto' }}>
                <Button
                  fullWidth
                  variant="contained"
                  disabled={device.status !== 'available'}
                  onClick={() => handleBooking(device.deviceId)}
                >
                  立即预约
                </Button>
                <Button fullWidth variant="outlined">
                  查看详情
                </Button>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const renderListView = (
    <Card>
      <Stack spacing={2} sx={{ p: 2 }}>
        {filteredDevices.map((device) => (
          <Card
            key={device.deviceId}
            sx={{
              p: 2,
              '&:hover': {
                bgcolor: 'background.neutral',
              },
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                component="img"
                src={device.image || getAssetUrl('assets/images/equipment/default.jpg')}
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 1,
                  objectFit: 'cover',
                }}
                onError={(e) => {
                  e.currentTarget.src = getAssetUrl('assets/placeholder.svg');
                }}
              />

              <Stack spacing={1} flexGrow={1}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography variant="h6">{device.name}</Typography>
                  <Chip
                    label={getStatusLabel(device.status)}
                    color={getStatusColor(device.status)}
                    size="small"
                  />
                  {device.tags?.map((tag) => (
                    <Chip key={tag} label={tag} size="small" variant="outlined" />
                  ))}
                </Stack>

                <Typography variant="body2" color="text.secondary">
                  {device.model} | {device.specs}
                </Typography>

                <Stack direction="row" spacing={3}>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Iconify icon={"solar:map-point-bold" as any} width={16} sx={{ color: 'text.disabled' }} />
                    <Typography variant="caption" color="text.secondary">
                      {device.location.campus} - {device.location.lab}
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Iconify icon={"solar:clock-circle-bold" as any} width={16} sx={{ color: 'text.disabled' }} />
                    <Typography variant="caption" color="text.secondary">
                      {device.availabilitySchedule}
                    </Typography>
                  </Stack>

                  {device.rating && (
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <Iconify icon={"solar:star-bold" as any} width={16} sx={{ color: 'warning.main' }} />
                      <Typography variant="caption" color="text.secondary">
                        {device.rating.toFixed(1)}
                      </Typography>
                    </Stack>
                  )}
                </Stack>
              </Stack>

              <Stack direction="row" spacing={1}>
                <IconButton size="small" onClick={() => handleFavorite(device.deviceId)}>
                  <Iconify icon={"solar:heart-outline" as any} />
                </IconButton>
                <Button
                  variant="contained"
                  disabled={device.status !== 'available'}
                  onClick={() => handleBooking(device.deviceId)}
                >
                  立即预约
                </Button>
                <Button variant="outlined">查看详情</Button>
              </Stack>
            </Stack>
          </Card>
        ))}
      </Stack>
    </Card>
  );

  const renderMapView = (
    <Card sx={{ p: 3, minHeight: 600 }}>
      <Stack alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
        <Iconify icon={"solar:map-outline" as any} width={64} sx={{ color: 'text.disabled', mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          地图视图开发中...
        </Typography>
        <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
          将展示设备的地理分布与聚合信息
        </Typography>
      </Stack>
    </Card>
  );

  return (
    <>
      <Helmet>
        <title>设备资源库 - 设备共享平台</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">设备资源库</Typography>

          <Stack direction="row" spacing={2}>
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={handleViewModeChange}
              size="small"
            >
              <ToggleButton value="card">
                <Iconify icon={"solar:widget-outline" as any} />
              </ToggleButton>
              <ToggleButton value="list">
                <Iconify icon={"solar:list-bold" as any} />
              </ToggleButton>
              <ToggleButton value="map">
                <Iconify icon={"solar:map-outline" as any} />
              </ToggleButton>
            </ToggleButtonGroup>

            <Button
              variant="outlined"
              startIcon={<Iconify icon={"solar:download-outline" as any} />}
              onClick={handleExport}
            >
              导出清单
            </Button>
          </Stack>
        </Stack>

        {renderFilters}

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          共找到 {filteredDevices.length} 台设备
        </Typography>

        {viewMode === 'card' && renderCardView}
        {viewMode === 'list' && renderListView}
        {viewMode === 'map' && renderMapView}
      </DashboardContent>
    </>
  );
}

