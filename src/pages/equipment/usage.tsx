import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import { Iconify } from 'src/components/iconify';
import { DashboardContent } from 'src/layouts/dashboard';
import { getAssetUrl } from 'src/utils/get-asset-url';

// ----------------------------------------------------------------------

type BookingStatus =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'inProgress'
  | 'completed'
  | 'cancelled';

type Booking = {
  bookingId: string;
  deviceName: string;
  deviceImage?: string;
  startTime: string;
  endTime: string;
  actualStart?: string;
  actualEnd?: string;
  purpose: string;
  status: BookingStatus;
  approvalProgress: {
    step: string;
    approver: string;
    status: 'pending' | 'approved' | 'rejected';
    time?: string;
    comment?: string;
  }[];
  rating?: number;
  comment?: string;
};

const MOCK_BOOKINGS: Booking[] = [
  {
    bookingId: 'BK20241012001',
    deviceName: '高精度三维扫描仪',
    deviceImage: getAssetUrl('assets/images/equipment/scanner.jpg'),
    startTime: '2024-10-15 09:00',
    endTime: '2024-10-15 12:00',
    purpose: '产品逆向工程研究',
    status: 'pending',
    approvalProgress: [
      {
        step: '设备管理员审批',
        approver: '张老师',
        status: 'pending',
      },
      {
        step: '实验室主任审批',
        approver: '李主任',
        status: 'pending',
      },
    ],
  },
  {
    bookingId: 'BK20241010002',
    deviceName: '激光切割机',
    deviceImage: getAssetUrl('assets/images/equipment/laser.jpg'),
    startTime: '2024-10-12 14:00',
    endTime: '2024-10-12 16:00',
    purpose: '创客项目制作',
    status: 'approved',
    approvalProgress: [
      {
        step: '设备管理员审批',
        approver: '王老师',
        status: 'approved',
        time: '2024-10-11 10:30',
        comment: '同意预约',
      },
    ],
  },
  {
    bookingId: 'BK20241008003',
    deviceName: '电子显微镜',
    deviceImage: getAssetUrl('assets/images/equipment/microscope.jpg'),
    startTime: '2024-10-09 10:00',
    endTime: '2024-10-09 13:00',
    actualStart: '2024-10-09 10:15',
    actualEnd: '2024-10-09 13:00',
    purpose: '材料微观结构分析',
    status: 'completed',
    approvalProgress: [
      {
        step: '设备管理员审批',
        approver: '李老师',
        status: 'approved',
        time: '2024-10-08 15:20',
      },
      {
        step: '实验室主任审批',
        approver: '赵主任',
        status: 'approved',
        time: '2024-10-08 16:45',
      },
    ],
    rating: 5,
    comment: '设备性能优秀，服务态度很好！',
  },
  {
    bookingId: 'BK20241005004',
    deviceName: '3D打印机',
    deviceImage: getAssetUrl('assets/images/equipment/3dprinter.jpg'),
    startTime: '2024-10-06 09:00',
    endTime: '2024-10-06 12:00',
    purpose: '毕业设计模型制作',
    status: 'rejected',
    approvalProgress: [
      {
        step: '设备管理员审批',
        approver: '王老师',
        status: 'rejected',
        time: '2024-10-05 14:30',
        comment: '该时间段已被预约，请选择其他时间',
      },
    ],
  },
  {
    bookingId: 'BK20241001005',
    deviceName: '高性能计算集群',
    deviceImage: getAssetUrl('assets/images/equipment/hpc.jpg'),
    startTime: '2024-10-03 00:00',
    endTime: '2024-10-05 23:59',
    actualStart: '2024-10-03 00:00',
    actualEnd: '2024-10-05 23:59',
    purpose: 'AI模型训练',
    status: 'completed',
    approvalProgress: [
      {
        step: '设备管理员审批',
        approver: '赵老师',
        status: 'approved',
        time: '2024-10-02 10:00',
      },
    ],
    rating: 4,
    comment: '计算性能强大，但排队时间较长',
  },
];

const STATUS_CONFIG = {
  pending: { label: '待审批', color: 'warning' as const },
  approved: { label: '已通过', color: 'success' as const },
  rejected: { label: '已拒绝', color: 'error' as const },
  inProgress: { label: '使用中', color: 'info' as const },
  completed: { label: '已完成', color: 'default' as const },
  cancelled: { label: '已取消', color: 'default' as const },
};

// ----------------------------------------------------------------------

export default function EquipmentUsagePage() {
  const [currentTab, setCurrentTab] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, booking: Booking) => {
    setMenuAnchor(event.currentTarget);
    setSelectedBooking(booking);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleRatingOpen = () => {
    setRatingDialogOpen(true);
    handleMenuClose();
  };

  const handleRatingSubmit = () => {
    console.log('提交评价:', { bookingId: selectedBooking?.bookingId, rating, comment });
    setRatingDialogOpen(false);
    setRating(5);
    setComment('');
    // TODO: 实现评价提交
  };

  const handleApprovalOpen = () => {
    setApprovalDialogOpen(true);
    handleMenuClose();
  };

  const handleCancel = () => {
    console.log('取消预约:', selectedBooking?.bookingId);
    handleMenuClose();
    // TODO: 实现取消预约
  };

  const filteredBookings = MOCK_BOOKINGS.filter((booking) => {
    if (currentTab === 'all') return true;
    if (currentTab === 'pending') return booking.status === 'pending';
    if (currentTab === 'approved') return booking.status === 'approved';
    if (currentTab === 'completed') return booking.status === 'completed';
    return true;
  });

  const renderSummaryCards = (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mb: 3 }}>
      <Card sx={{ p: 3, flexGrow: 1 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 2,
              bgcolor: 'warning.lighter',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Iconify icon={"solar:clock-circle-outline" as any} width={32} sx={{ color: 'warning.main' }} />
          </Box>
          <Box>
            <Typography variant="h4">
              {MOCK_BOOKINGS.filter((b) => b.status === 'pending').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              待审批
            </Typography>
          </Box>
        </Stack>
      </Card>

      <Card sx={{ p: 3, flexGrow: 1 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 2,
              bgcolor: 'success.lighter',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Iconify icon={"solar:check-circle-outline" as any} width={32} sx={{ color: 'success.main' }} />
          </Box>
          <Box>
            <Typography variant="h4">
              {MOCK_BOOKINGS.filter((b) => b.status === 'approved').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              已通过
            </Typography>
          </Box>
        </Stack>
      </Card>

      <Card sx={{ p: 3, flexGrow: 1 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 2,
              bgcolor: 'info.lighter',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Iconify icon={"solar:chart-square-outline" as any} width={32} sx={{ color: 'info.main' }} />
          </Box>
          <Box>
            <Typography variant="h4">
              {MOCK_BOOKINGS.filter((b) => b.status === 'completed').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              已完成
            </Typography>
          </Box>
        </Stack>
      </Card>

      <Card sx={{ p: 3, flexGrow: 1 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 2,
              bgcolor: 'primary.lighter',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Iconify icon={"solar:chart-outline" as any} width={32} sx={{ color: 'primary.main' }} />
          </Box>
          <Box>
            <Typography variant="h4">
              {MOCK_BOOKINGS.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              总预约次数
            </Typography>
          </Box>
        </Stack>
      </Card>
    </Stack>
  );

  const renderTable = (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>预约编号</TableCell>
            <TableCell>设备信息</TableCell>
            <TableCell>预约时间</TableCell>
            <TableCell>使用目的</TableCell>
            <TableCell>状态</TableCell>
            <TableCell align="right">操作</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredBookings.map((booking) => (
            <TableRow key={booking.bookingId} hover>
              <TableCell>
                <Typography variant="body2" fontWeight="medium">
                  {booking.bookingId}
                </Typography>
              </TableCell>

              <TableCell>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography variant="body2">{booking.deviceName}</Typography>
                </Stack>
              </TableCell>

              <TableCell>
                <Typography variant="body2">{booking.startTime}</Typography>
                <Typography variant="caption" color="text.secondary">
                  至 {booking.endTime}
                </Typography>
              </TableCell>

              <TableCell>
                <Typography variant="body2" sx={{ maxWidth: 200 }} noWrap>
                  {booking.purpose}
                </Typography>
              </TableCell>

              <TableCell>
                <Chip
                  label={STATUS_CONFIG[booking.status].label}
                  color={STATUS_CONFIG[booking.status].color}
                  size="small"
                />
              </TableCell>

              <TableCell align="right">
                <IconButton onClick={(e) => handleMenuOpen(e, booking)}>
                  <Iconify icon="eva:more-vertical-fill" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <>
      <Helmet>
        <title>使用记录 - 设备共享平台</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 3 }}>
          我的预约与使用记录
        </Typography>

        {renderSummaryCards}

        <Card>
          <Tabs
            value={currentTab}
            onChange={(e, newValue) => setCurrentTab(newValue)}
            sx={{ px: 3, pt: 2 }}
          >
            <Tab label="全部" value="all" />
            <Tab label="待审批" value="pending" />
            <Tab label="已通过" value="approved" />
            <Tab label="已完成" value="completed" />
          </Tabs>

          {renderTable}
        </Card>
      </DashboardContent>

      {/* 操作菜单 */}
      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
        <MenuItem onClick={handleApprovalOpen}>
          <Iconify icon={"solar:eye-outline" as any} sx={{ mr: 1 }} />
          查看审批进度
        </MenuItem>
        {selectedBooking?.status === 'completed' && !selectedBooking.rating && (
          <MenuItem onClick={handleRatingOpen}>
            <Iconify icon={"solar:star-outline" as any} sx={{ mr: 1 }} />
            评价
          </MenuItem>
        )}
        {selectedBooking?.status === 'pending' && (
          <MenuItem onClick={handleCancel} sx={{ color: 'error.main' }}>
            <Iconify icon={"solar:close-circle-outline" as any} sx={{ mr: 1 }} />
            取消预约
          </MenuItem>
        )}
      </Menu>

      {/* 审批进度对话框 */}
      <Dialog
        open={approvalDialogOpen}
        onClose={() => setApprovalDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>审批进度</DialogTitle>
        <DialogContent>
          {selectedBooking && (
            <Stack spacing={3} sx={{ mt: 2 }}>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  预约信息
                </Typography>
                <Stack spacing={1}>
                  <Typography variant="body2" color="text.secondary">
                    预约编号：{selectedBooking.bookingId}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    设备名称：{selectedBooking.deviceName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    预约时间：{selectedBooking.startTime} - {selectedBooking.endTime}
                  </Typography>
                </Stack>
              </Box>

              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  审批流程
                </Typography>
                <Stepper orientation="vertical" sx={{ mt: 2 }}>
                  {selectedBooking.approvalProgress.map((step, index) => (
                    <Step key={index} active completed={step.status === 'approved'}>
                      <StepLabel
                        error={step.status === 'rejected'}
                        StepIconProps={{
                          icon:
                            step.status === 'approved' ? (
                              <Iconify icon={"solar:check-circle-bold" as any} color="success.main" />
                            ) : step.status === 'rejected' ? (
                              <Iconify icon={"solar:close-circle-bold" as any} color="error.main" />
                            ) : (
                              index + 1
                            ),
                        }}
                      >
                        <Typography variant="body2" fontWeight="medium">
                          {step.step}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          审批人：{step.approver}
                        </Typography>
                        {step.time && (
                          <Typography variant="caption" color="text.secondary" display="block">
                            时间：{step.time}
                          </Typography>
                        )}
                        {step.comment && (
                          <Typography variant="caption" color="text.secondary" display="block">
                            意见：{step.comment}
                          </Typography>
                        )}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setApprovalDialogOpen(false)}>关闭</Button>
        </DialogActions>
      </Dialog>

      {/* 评价对话框 */}
      <Dialog open={ratingDialogOpen} onClose={() => setRatingDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>评价设备使用体验</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <Box>
              <Typography variant="body2" gutterBottom>
                设备名称
              </Typography>
              <Typography variant="subtitle1">{selectedBooking?.deviceName}</Typography>
            </Box>

            <Box>
              <Typography variant="body2" gutterBottom>
                满意度评分
              </Typography>
              <Rating
                value={rating}
                onChange={(e, newValue) => setRating(newValue || 5)}
                size="large"
              />
            </Box>

            <TextField
              label="评价内容"
              multiline
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="请分享您的使用体验..."
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRatingDialogOpen(false)}>取消</Button>
          <Button variant="contained" onClick={handleRatingSubmit}>
            提交评价
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

