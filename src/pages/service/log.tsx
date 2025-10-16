import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import {
  Chip,
  Select,
  Dialog,
  MenuItem,
  InputLabel,
  FormControl,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

type MessageType = 'system' | 'approval' | 'booking' | 'ticket' | 'email' | 'sms';
type DeliveryStatus = 'success' | 'failed' | 'pending' | 'retry';

type MessageLog = {
  logId: string;
  messageId: string;
  type: MessageType;
  recipient: string;
  recipientId: string;
  title: string;
  status: DeliveryStatus;
  sentAt: string;
  deliveredAt?: string;
  failureReason?: string;
  retryCount: number;
  channel: string;
};

// Mock data
const mockLogs: MessageLog[] = [
  {
    logId: '1',
    messageId: 'msg-001',
    type: 'approval',
    recipient: '张三',
    recipientId: 'user-001',
    title: '项目审批通知',
    status: 'success',
    sentAt: '2025-10-12 10:30:00',
    deliveredAt: '2025-10-12 10:30:05',
    retryCount: 0,
    channel: '站内信',
  },
  {
    logId: '2',
    messageId: 'msg-002',
    type: 'booking',
    recipient: '李四',
    recipientId: 'user-002',
    title: '设备预约提醒',
    status: 'success',
    sentAt: '2025-10-12 09:15:00',
    deliveredAt: '2025-10-12 09:15:03',
    retryCount: 0,
    channel: '站内信+邮件',
  },
  {
    logId: '3',
    messageId: 'msg-003',
    type: 'email',
    recipient: 'wang@example.com',
    recipientId: 'user-003',
    title: '系统维护通知',
    status: 'failed',
    sentAt: '2025-10-12 08:00:00',
    failureReason: 'SMTP服务器连接超时',
    retryCount: 3,
    channel: '邮件',
  },
  {
    logId: '4',
    messageId: 'msg-004',
    type: 'ticket',
    recipient: '王五',
    recipientId: 'user-004',
    title: '工单处理完成',
    status: 'success',
    sentAt: '2025-10-11 15:45:00',
    deliveredAt: '2025-10-11 15:45:02',
    retryCount: 0,
    channel: '站内信',
  },
  {
    logId: '5',
    messageId: 'msg-005',
    type: 'sms',
    recipient: '138****5678',
    recipientId: 'user-005',
    title: '验证码',
    status: 'success',
    sentAt: '2025-10-11 14:20:00',
    deliveredAt: '2025-10-11 14:20:01',
    retryCount: 0,
    channel: '短信',
  },
  {
    logId: '6',
    messageId: 'msg-006',
    type: 'system',
    recipient: '赵六',
    recipientId: 'user-006',
    title: '新功能上线通知',
    status: 'pending',
    sentAt: '2025-10-11 10:00:00',
    retryCount: 1,
    channel: '站内信',
  },
  {
    logId: '7',
    messageId: 'msg-007',
    type: 'approval',
    recipient: '孙七',
    recipientId: 'user-007',
    title: '培训申请待审批',
    status: 'retry',
    sentAt: '2025-10-10 16:30:00',
    failureReason: '接收方暂时不可达',
    retryCount: 2,
    channel: '站内信',
  },
  {
    logId: '8',
    messageId: 'msg-008',
    type: 'booking',
    recipient: '周八',
    recipientId: 'user-008',
    title: '预约取消通知',
    status: 'success',
    sentAt: '2025-10-10 11:20:00',
    deliveredAt: '2025-10-10 11:20:04',
    retryCount: 0,
    channel: '站内信+短信',
  },
];

const messageTypeConfig = {
  system: { label: '系统', color: 'info' as const },
  approval: { label: '审批', color: 'warning' as const },
  booking: { label: '预约', color: 'success' as const },
  ticket: { label: '工单', color: 'error' as const },
  email: { label: '邮件', color: 'primary' as const },
  sms: { label: '短信', color: 'secondary' as const },
};

const statusConfig = {
  success: { label: '成功', color: 'success' as const },
  failed: { label: '失败', color: 'error' as const },
  pending: { label: '待发送', color: 'warning' as const },
  retry: { label: '重试中', color: 'info' as const },
};

// ----------------------------------------------------------------------

export default function ServiceLogPage() {
  const [logs, setLogs] = useState<MessageLog[]>(mockLogs);
  const [filterType, setFilterType] = useState<MessageType | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<DeliveryStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs().subtract(7, 'day'));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<MessageLog | null>(null);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);

  // Filter logs
  const filteredLogs = logs.filter((log) => {
    const typeMatch = filterType === 'all' || log.type === filterType;
    const statusMatch = filterStatus === 'all' || log.status === filterStatus;
    const searchMatch =
      log.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.recipient.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Date filter
    const logDate = dayjs(log.sentAt);
    const dateMatch =
      (!startDate || logDate.isAfter(startDate.startOf('day'))) &&
      (!endDate || logDate.isBefore(endDate.endOf('day')));

    return typeMatch && statusMatch && searchMatch && dateMatch;
  });

  const successCount = logs.filter((l) => l.status === 'success').length;
  const failedCount = logs.filter((l) => l.status === 'failed').length;
  const successRate = logs.length > 0 ? ((successCount / logs.length) * 100).toFixed(1) : '0';

  const handleViewDetail = (log: MessageLog) => {
    setSelectedLog(log);
    setDetailDialogOpen(true);
  };

  const handleRetry = (logId: string) => {
    setLogs((prev) =>
      prev.map((log) =>
        log.logId === logId
          ? {
              ...log,
              status: 'retry' as DeliveryStatus,
              retryCount: log.retryCount + 1,
            }
          : log
      )
    );
  };

  const handleExport = () => {
    console.log('Exporting logs...', {
      startDate: startDate?.format('YYYY-MM-DD'),
      endDate: endDate?.format('YYYY-MM-DD'),
      type: filterType,
      status: filterStatus,
    });
    setExportDialogOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>消息日志审计 - 智能服务</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Box>
            <Typography variant="h4">消息日志审计</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              共 {logs.length} 条记录，成功率 {successRate}%
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:download-fill" />}
            onClick={() => setExportDialogOpen(true)}
          >
            导出日志
          </Button>
        </Stack>

        {/* Statistics */}
        <Card sx={{ p: 3, mb: 3 }}>
          <Stack direction="row" spacing={4}>
            <Box>
              <Typography variant="h3" color="success.main">
                {successCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                发送成功
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box>
              <Typography variant="h3" color="error.main">
                {failedCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                发送失败
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box>
              <Typography variant="h3" color="primary.main">
                {successRate}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                成功率
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box>
              <Typography variant="h3">
                {logs.reduce((sum, log) => sum + log.retryCount, 0)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                总重试次数
              </Typography>
            </Box>
          </Stack>
        </Card>

        <Card>
          {/* Filters */}
          <Box sx={{ p: 2 }}>
            <Stack spacing={2}>
              {/* Search */}
              <TextField
                fullWidth
                placeholder="搜索标题或接收人..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon="eva:search-fill" />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Type, Status and Date Filters */}
              <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                <FormControl sx={{ minWidth: 150 }}>
                  <InputLabel>消息类型</InputLabel>
                  <Select
                    value={filterType}
                    label="消息类型"
                    onChange={(e) => setFilterType(e.target.value as MessageType | 'all')}
                  >
                    <MenuItem value="all">全部</MenuItem>
                    {Object.entries(messageTypeConfig).map(([type, config]) => (
                      <MenuItem key={type} value={type}>
                        {config.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 150 }}>
                  <InputLabel>发送状态</InputLabel>
                  <Select
                    value={filterStatus}
                    label="发送状态"
                    onChange={(e) => setFilterStatus(e.target.value as DeliveryStatus | 'all')}
                  >
                    <MenuItem value="all">全部</MenuItem>
                    {Object.entries(statusConfig).map(([status, config]) => (
                      <MenuItem key={status} value={status}>
                        {config.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="开始日期"
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue as Dayjs | null)}
                    slotProps={{ textField: { size: 'medium' } }}
                  />
                  <DatePicker
                    label="结束日期"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue as Dayjs | null)}
                    slotProps={{ textField: { size: 'medium' } }}
                  />
                </LocalizationProvider>
              </Stack>
            </Stack>
          </Box>

          <Divider />

          {/* Logs Table */}
          <Scrollbar>
            <TableContainer sx={{ minWidth: 1000 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>消息ID</TableCell>
                    <TableCell>类型</TableCell>
                    <TableCell>标题</TableCell>
                    <TableCell>接收人</TableCell>
                    <TableCell>渠道</TableCell>
                    <TableCell>状态</TableCell>
                    <TableCell>发送时间</TableCell>
                    <TableCell>重试次数</TableCell>
                    <TableCell align="right">操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredLogs
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((log) => (
                      <TableRow
                        key={log.logId}
                        hover
                        sx={{ cursor: 'pointer' }}
                        onClick={() => handleViewDetail(log)}
                      >
                        <TableCell>
                          <Typography variant="body2" fontFamily="monospace">
                            {log.messageId}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            size="small"
                            label={messageTypeConfig[log.type].label}
                            color={messageTypeConfig[log.type].color}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{log.title}</Typography>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="body2">{log.recipient}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {log.recipientId}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{log.channel}</Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            size="small"
                            label={statusConfig[log.status].label}
                            color={statusConfig[log.status].color}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {log.sentAt}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            size="small"
                            label={log.retryCount}
                            color={log.retryCount > 0 ? 'warning' : 'default'}
                          />
                        </TableCell>
                        <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                          {log.status === 'failed' && (
                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={<Iconify icon="solar:restart-bold" />}
                              onClick={() => handleRetry(log.logId)}
                            >
                              重试
                            </Button>
                          )}
                          <IconButton size="small" onClick={() => handleViewDetail(log)}>
                            <Iconify icon="solar:eye-bold" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            component="div"
            count={filteredLogs.length}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            labelRowsPerPage="每页显示："
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} 共 ${count} 条`}
          />
        </Card>
      </DashboardContent>

      {/* Log Detail Dialog */}
      <Dialog
        open={detailDialogOpen}
        onClose={() => setDetailDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        {selectedLog && (
          <>
            <DialogTitle>消息日志详情</DialogTitle>
            <DialogContent>
              <Stack spacing={2} sx={{ mt: 1 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    消息ID
                  </Typography>
                  <Typography variant="body2" fontFamily="monospace" sx={{ mt: 0.5 }}>
                    {selectedLog.messageId}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    类型
                  </Typography>
                  <Box sx={{ mt: 0.5 }}>
                    <Chip
                      label={messageTypeConfig[selectedLog.type].label}
                      color={messageTypeConfig[selectedLog.type].color}
                    />
                  </Box>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    标题
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    {selectedLog.title}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    接收人
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    {selectedLog.recipient} ({selectedLog.recipientId})
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    发送渠道
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    {selectedLog.channel}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    状态
                  </Typography>
                  <Box sx={{ mt: 0.5 }}>
                    <Chip
                      label={statusConfig[selectedLog.status].label}
                      color={statusConfig[selectedLog.status].color}
                    />
                  </Box>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    发送时间
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    {selectedLog.sentAt}
                  </Typography>
                </Box>

                {selectedLog.deliveredAt && (
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      送达时间
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      {selectedLog.deliveredAt}
                    </Typography>
                  </Box>
                )}

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    重试次数
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    {selectedLog.retryCount}
                  </Typography>
                </Box>

                {selectedLog.failureReason && (
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      失败原因
                    </Typography>
                    <Typography variant="body2" color="error" sx={{ mt: 0.5 }}>
                      {selectedLog.failureReason}
                    </Typography>
                  </Box>
                )}
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDetailDialogOpen(false)}>关闭</Button>
              {selectedLog.status === 'failed' && (
                <Button
                  variant="contained"
                  startIcon={<Iconify icon="solar:restart-bold" />}
                  onClick={() => {
                    handleRetry(selectedLog.logId);
                    setDetailDialogOpen(false);
                  }}
                >
                  重新发送
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={exportDialogOpen} onClose={() => setExportDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>导出日志</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              将根据当前筛选条件导出日志数据
            </Typography>
            <Box>
              <Typography variant="caption" color="text.secondary">
                时间范围
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                {startDate?.format('YYYY-MM-DD')} 至 {endDate?.format('YYYY-MM-DD')}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                筛选条件
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                类型: {filterType === 'all' ? '全部' : messageTypeConfig[filterType].label}
                <br />
                状态: {filterStatus === 'all' ? '全部' : statusConfig[filterStatus].label}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                记录数量
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                {filteredLogs.length} 条
              </Typography>
            </Box>
            <FormControl fullWidth>
              <InputLabel>导出格式</InputLabel>
              <Select defaultValue="excel" label="导出格式">
                <MenuItem value="excel">Excel (.xlsx)</MenuItem>
                <MenuItem value="csv">CSV (.csv)</MenuItem>
                <MenuItem value="json">JSON (.json)</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setExportDialogOpen(false)}>取消</Button>
          <Button variant="contained" startIcon={<Iconify icon="eva:download-fill" />} onClick={handleExport}>
            导出
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

