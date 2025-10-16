import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import LinearProgress from '@mui/material/LinearProgress';

import { Iconify } from 'src/components/iconify';
import { DashboardContent } from 'src/layouts/dashboard';
import { getAssetUrl } from 'src/utils/get-asset-url';

// ----------------------------------------------------------------------

type MaintenanceRecord = {
  id: string;
  date: string;
  type: string;
  description: string;
  status: string;
};

type UsageRecord = {
  id: string;
  user: string;
  department: string;
  startTime: string;
  endTime: string;
  purpose: string;
  rating: number;
};

type Review = {
  id: string;
  user: string;
  avatar?: string;
  rating: number;
  comment: string;
  date: string;
};

const MOCK_DEVICE = {
  deviceId: 'DEV001',
  name: '高精度三维扫描仪',
  model: 'Artec Eva',
  specs: {
    精度: '0.1mm',
    扫描速度: '16fps',
    工作距离: '0.4-1.0m',
    扫描区域: '214x148mm',
    重量: '0.9kg',
  },
  location: { campus: '东校区', lab: '工程实验室A301' },
  availabilitySchedule: '周一至周五 9:00-18:00',
  status: 'available',
  ownerOrg: '机械工程学院',
  contact: '张老师 13800138001',
  images: [
    getAssetUrl('assets/images/cover/cover-1.webp'),
    getAssetUrl('assets/images/cover/cover-7.webp'),
    getAssetUrl('assets/images/cover/cover-8.webp'),
  ],
  tags: ['3D扫描', '高精度', '热门'],
  rating: 4.8,
  totalReviews: 156,
  usageRate: 85,
  description: '高精度便携式3D扫描仪，适用于工业设计、逆向工程、质量控制等领域。',
  rules: [
    '使用前需完成设备培训并通过考核',
    '预约时间最长不超过4小时',
    '使用时需佩戴防护手套',
    '扫描完成后需清理设备表面',
    '如遇设备故障请立即停止使用并报告管理员',
  ],
  documents: [
    { name: '操作手册.pdf', size: '2.5MB', url: '#' },
    { name: '安全须知.pdf', size: '1.2MB', url: '#' },
    { name: '培训视频.mp4', size: '125MB', url: '#' },
  ],
};

const MOCK_MAINTENANCE: MaintenanceRecord[] = [
  {
    id: 'M001',
    date: '2024-10-05',
    type: '定期保养',
    description: '清洁镜头，校准传感器',
    status: '已完成',
  },
  {
    id: 'M002',
    date: '2024-09-15',
    type: '故障维修',
    description: '更换电源适配器',
    status: '已完成',
  },
  {
    id: 'M003',
    date: '2024-08-20',
    type: '软件升级',
    description: '升级扫描软件至v3.2',
    status: '已完成',
  },
];

const MOCK_USAGE: UsageRecord[] = [
  {
    id: 'U001',
    user: '李明',
    department: '机械工程学院',
    startTime: '2024-10-10 09:00',
    endTime: '2024-10-10 12:00',
    purpose: '产品逆向工程研究',
    rating: 5,
  },
  {
    id: 'U002',
    user: '王芳',
    department: '工业设计系',
    startTime: '2024-10-08 14:00',
    endTime: '2024-10-08 17:00',
    purpose: '毕业设计模型扫描',
    rating: 4,
  },
  {
    id: 'U003',
    user: '张伟',
    department: '材料科学学院',
    startTime: '2024-10-05 10:00',
    endTime: '2024-10-05 13:00',
    purpose: '材料表面形貌分析',
    rating: 5,
  },
];

const MOCK_REVIEWS: Review[] = [
  {
    id: 'R001',
    user: '李明',
    avatar: getAssetUrl('assets/images/avatars/avatar-1.jpg'),
    rating: 5,
    comment: '设备性能优秀，扫描精度很高，工作人员服务态度也很好！',
    date: '2024-10-10',
  },
  {
    id: 'R002',
    user: '王芳',
    avatar: getAssetUrl('assets/images/avatars/avatar-2.jpg'),
    rating: 4,
    comment: '整体不错，就是预约时间有点紧张，希望能增加开放时间。',
    date: '2024-10-08',
  },
  {
    id: 'R003',
    user: '张伟',
    avatar: getAssetUrl('assets/images/avatars/avatar-3.jpg'),
    rating: 5,
    comment: '非常专业的设备，对我的研究帮助很大，强烈推荐！',
    date: '2024-10-05',
  },
];

// ----------------------------------------------------------------------

export default function EquipmentDetailPage() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('overview');
  const [selectedImage, setSelectedImage] = useState(0);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [reportDescription, setReportDescription] = useState('');

  const handleBooking = () => {
    navigate('/equipment/booking?deviceId=' + MOCK_DEVICE.deviceId);
  };

  const handleReport = () => {
    setReportDialogOpen(true);
  };

  const handleReportSubmit = () => {
    console.log('提交报修:', reportDescription);
    setReportDialogOpen(false);
    setReportDescription('');
    // TODO: 实现报修提交
  };

  const renderImageGallery = (
    <Card>
      <Box sx={{ position: 'relative' }}>
        <Box
          component="img"
          src={MOCK_DEVICE.images[selectedImage]}
          sx={{
            width: '100%',
            height: 400,
            objectFit: 'cover',
          }}
          onError={(e) => {
            e.currentTarget.src = getAssetUrl('assets/placeholder.svg');
          }}
        />
        <Chip
          label={MOCK_DEVICE.status === 'available' ? '可用' : '使用中'}
          color={MOCK_DEVICE.status === 'available' ? 'success' : 'warning'}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
          }}
        />
      </Box>

      <Stack direction="row" spacing={1} sx={{ p: 2 }}>
        {MOCK_DEVICE.images.map((image, index) => (
          <Box
            key={index}
            component="img"
            src={image}
            onClick={() => setSelectedImage(index)}
            sx={{
              width: 80,
              height: 80,
              objectFit: 'cover',
              borderRadius: 1,
              cursor: 'pointer',
              border: (theme) =>
                selectedImage === index
                  ? `2px solid ${theme.palette.primary.main}`
                  : '2px solid transparent',
              '&:hover': {
                opacity: 0.8,
              },
            }}
            onError={(e) => {
              e.currentTarget.src = getAssetUrl('assets/placeholder.svg');
            }}
          />
        ))}
      </Stack>
    </Card>
  );

  const renderBasicInfo = (
    <Card sx={{ p: 3 }}>
      <Stack spacing={3}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4">{MOCK_DEVICE.name}</Typography>
          <Button variant="outlined" startIcon={<Iconify icon={"solar:heart-outline" as any} />}>
            收藏
          </Button>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={2}>
          <Rating value={MOCK_DEVICE.rating} precision={0.1} readOnly />
          <Typography variant="body2" color="text.secondary">
            {MOCK_DEVICE.rating} ({MOCK_DEVICE.totalReviews} 条评价)
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {MOCK_DEVICE.tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" color="primary" variant="outlined" />
          ))}
        </Stack>

        <Divider />

        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Iconify icon={"solar:box-outline" as any} width={24} sx={{ color: 'text.disabled' }} />
            <Box>
              <Typography variant="caption" color="text.secondary">
                型号
              </Typography>
              <Typography variant="body2">{MOCK_DEVICE.model}</Typography>
            </Box>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={2}>
            <Iconify icon={"solar:map-point-bold" as any} width={24} sx={{ color: 'text.disabled' }} />
            <Box>
              <Typography variant="caption" color="text.secondary">
                位置
              </Typography>
              <Typography variant="body2">
                {MOCK_DEVICE.location.campus} - {MOCK_DEVICE.location.lab}
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={2}>
            <Iconify icon={"solar:clock-circle-bold" as any} width={24} sx={{ color: 'text.disabled' }} />
            <Box>
              <Typography variant="caption" color="text.secondary">
                开放时间
              </Typography>
              <Typography variant="body2">{MOCK_DEVICE.availabilitySchedule}</Typography>
            </Box>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={2}>
            <Iconify icon={"solar:users-group-rounded-bold" as any} width={24} sx={{ color: 'text.disabled' }} />
            <Box>
              <Typography variant="caption" color="text.secondary">
                负责单位
              </Typography>
              <Typography variant="body2">{MOCK_DEVICE.ownerOrg}</Typography>
            </Box>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={2}>
            <Iconify icon={"solar:phone-bold" as any} width={24} sx={{ color: 'text.disabled' }} />
            <Box>
              <Typography variant="caption" color="text.secondary">
                联系方式
              </Typography>
              <Typography variant="body2">{MOCK_DEVICE.contact}</Typography>
            </Box>
          </Stack>
        </Stack>

        <Divider />

        <Box>
          <Typography variant="caption" color="text.secondary" gutterBottom>
            设备使用率
          </Typography>
          <Stack direction="row" alignItems="center" spacing={2}>
            <LinearProgress
              variant="determinate"
              value={MOCK_DEVICE.usageRate}
              sx={{ flexGrow: 1, height: 8, borderRadius: 1 }}
            />
            <Typography variant="body2" fontWeight="bold">
              {MOCK_DEVICE.usageRate}%
            </Typography>
          </Stack>
        </Box>

        <Stack direction="row" spacing={2}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            disabled={MOCK_DEVICE.status !== 'available'}
            onClick={handleBooking}
          >
            立即预约
          </Button>
          <Button fullWidth variant="outlined" size="large" onClick={handleReport}>
            报修
          </Button>
        </Stack>
      </Stack>
    </Card>
  );

  const renderOverview = (
    <Stack spacing={3}>
      <Card sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          设备简介
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {MOCK_DEVICE.description}
        </Typography>
      </Card>

      <Card sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          技术参数
        </Typography>
        <Stack spacing={2}>
          {Object.entries(MOCK_DEVICE.specs).map(([key, value]) => (
            <Stack key={key} direction="row" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                {key}
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {value}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Card>

      <Card sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          使用规则
        </Typography>
        <Stack spacing={1.5}>
          {MOCK_DEVICE.rules.map((rule, index) => (
            <Stack key={index} direction="row" spacing={1}>
              <Typography variant="body2" color="primary">
                {index + 1}.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {rule}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Card>

      <Card sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          相关文档
        </Typography>
        <Stack spacing={2}>
          {MOCK_DEVICE.documents.map((doc) => (
            <Stack
              key={doc.name}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                p: 2,
                borderRadius: 1,
                bgcolor: 'background.neutral',
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Iconify icon={"solar:document-text-outline" as any} width={24} />
                <Box>
                  <Typography variant="body2">{doc.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {doc.size}
                  </Typography>
                </Box>
              </Stack>
              <Button size="small" startIcon={<Iconify icon={"solar:download-outline" as any} />}>
                下载
              </Button>
            </Stack>
          ))}
        </Stack>
      </Card>
    </Stack>
  );

  const renderUsageHistory = (
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>使用人</TableCell>
              <TableCell>所属单位</TableCell>
              <TableCell>使用时间</TableCell>
              <TableCell>使用目的</TableCell>
              <TableCell>评分</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {MOCK_USAGE.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.user}</TableCell>
                <TableCell>{record.department}</TableCell>
                <TableCell>
                  {record.startTime} ~ {record.endTime}
                </TableCell>
                <TableCell>{record.purpose}</TableCell>
                <TableCell>
                  <Rating value={record.rating} size="small" readOnly />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );

  const renderMaintenance = (
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>日期</TableCell>
              <TableCell>类型</TableCell>
              <TableCell>描述</TableCell>
              <TableCell>状态</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {MOCK_MAINTENANCE.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.date}</TableCell>
                <TableCell>{record.type}</TableCell>
                <TableCell>{record.description}</TableCell>
                <TableCell>
                  <Chip label={record.status} size="small" color="success" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );

  const renderReviews = (
    <Stack spacing={3}>
      <Card sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" spacing={3}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h2">{MOCK_DEVICE.rating}</Typography>
            <Rating value={MOCK_DEVICE.rating} precision={0.1} readOnly />
            <Typography variant="body2" color="text.secondary">
              {MOCK_DEVICE.totalReviews} 条评价
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Stack spacing={1} flexGrow={1}>
            {[5, 4, 3, 2, 1].map((star) => (
              <Stack key={star} direction="row" alignItems="center" spacing={2}>
                <Typography variant="body2" sx={{ minWidth: 60 }}>
                  {star} 星
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={star === 5 ? 75 : star === 4 ? 20 : 5}
                  sx={{ flexGrow: 1, height: 8, borderRadius: 1 }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ minWidth: 40 }}>
                  {star === 5 ? '75%' : star === 4 ? '20%' : '5%'}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Card>

      {MOCK_REVIEWS.map((review) => (
        <Card key={review.id} sx={{ p: 3 }}>
          <Stack direction="row" spacing={2}>
            <Avatar src={review.avatar} alt={review.user} />
            <Stack spacing={1} flexGrow={1}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle2">{review.user}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {review.date}
                </Typography>
              </Stack>
              <Rating value={review.rating} size="small" readOnly />
              <Typography variant="body2" color="text.secondary">
                {review.comment}
              </Typography>
            </Stack>
          </Stack>
        </Card>
      ))}
    </Stack>
  );

  return (
    <>
      <Helmet>
        <title>{MOCK_DEVICE.name} - 设备详情</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <Button
          startIcon={<Iconify icon={"solar:arrow-left-bold" as any} />}
          onClick={() => navigate(-1)}
          sx={{ mb: 3 }}
        >
          返回列表
        </Button>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Stack spacing={3}>
              {renderImageGallery}
              {renderBasicInfo}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Card>
              <Tabs
                value={currentTab}
                onChange={(e, newValue) => setCurrentTab(newValue)}
                sx={{ px: 3, pt: 2 }}
              >
                <Tab label="设备概览" value="overview" />
                <Tab label="使用记录" value="usage" />
                <Tab label="维修记录" value="maintenance" />
                <Tab label="用户评价" value="reviews" />
              </Tabs>

              <Divider />

              <Box sx={{ p: 3 }}>
                {currentTab === 'overview' && renderOverview}
                {currentTab === 'usage' && renderUsageHistory}
                {currentTab === 'maintenance' && renderMaintenance}
                {currentTab === 'reviews' && renderReviews}
              </Box>
            </Card>
          </Grid>
        </Grid>
      </DashboardContent>

      {/* 报修对话框 */}
      <Dialog open={reportDialogOpen} onClose={() => setReportDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>设备报修</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="设备名称"
              value={MOCK_DEVICE.name}
              disabled
              fullWidth
            />
            <TextField
              label="故障描述"
              multiline
              rows={4}
              value={reportDescription}
              onChange={(e) => setReportDescription(e.target.value)}
              placeholder="请详细描述设备故障情况..."
              fullWidth
            />
            <Button
              variant="outlined"
              startIcon={<Iconify icon={"solar:paperclip-outline" as any} />}
              fullWidth
            >
              上传附件（照片/视频）
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReportDialogOpen(false)}>取消</Button>
          <Button variant="contained" onClick={handleReportSubmit}>
            提交报修
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

