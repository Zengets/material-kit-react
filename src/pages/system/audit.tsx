import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type LogLevel = 'info' | 'warning' | 'error' | 'success';
type ActionType = 'create' | 'update' | 'delete' | 'login' | 'logout' | 'export' | 'import';

type AuditLog = {
  logId: string;
  timestamp: string;
  userId: string;
  userName: string;
  module: string;
  action: ActionType;
  level: LogLevel;
  description: string;
  ip: string;
  details?: string;
};

const mockLogs: AuditLog[] = [
  {
    logId: 'LOG001',
    timestamp: '2025-10-13 10:30:25',
    userId: 'U001',
    userName: '系统管理员',
    module: '用户管理',
    action: 'create',
    level: 'success',
    description: '创建新用户：张三',
    ip: '192.168.1.100',
    details: JSON.stringify({ username: 'zhangsan', roles: ['普通用户'] }),
  },
  {
    logId: 'LOG002',
    timestamp: '2025-10-13 10:25:18',
    userId: 'U002',
    userName: '张三',
    module: '项目管理',
    action: 'update',
    level: 'info',
    description: '更新项目：研发项目A',
    ip: '192.168.1.101',
  },
  {
    logId: 'LOG003',
    timestamp: '2025-10-13 10:20:45',
    userId: 'U003',
    userName: '李四',
    module: '系统管理',
    action: 'delete',
    level: 'warning',
    description: '删除角色：测试角色',
    ip: '192.168.1.102',
  },
  {
    logId: 'LOG004',
    timestamp: '2025-10-13 10:15:32',
    userId: 'U001',
    userName: '系统管理员',
    module: '用户管理',
    action: 'export',
    level: 'success',
    description: '导出用户数据',
    ip: '192.168.1.100',
  },
  {
    logId: 'LOG005',
    timestamp: '2025-10-13 09:00:00',
    userId: 'U002',
    userName: '张三',
    module: '认证',
    action: 'login',
    level: 'success',
    description: '用户登录成功',
    ip: '192.168.1.101',
  },
];

const modules = ['全部', '用户管理', '角色管理', '项目管理', '系统管理', '认证'];
const actionTypes = ['全部', 'create', 'update', 'delete', 'login', 'logout', 'export', 'import'];

// ----------------------------------------------------------------------

export default function AuditPage() {
  const [logs, setLogs] = useState<AuditLog[]>(mockLogs);
  const [filterModule, setFilterModule] = useState('全部');
  const [filterAction, setFilterAction] = useState('全部');
  const [filterUser, setFilterUser] = useState('');
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);

  const handleFilter = () => {
    let filtered = mockLogs;

    if (filterModule !== '全部') {
      filtered = filtered.filter((log) => log.module === filterModule);
    }

    if (filterAction !== '全部') {
      filtered = filtered.filter((log) => log.action === filterAction);
    }

    if (filterUser) {
      filtered = filtered.filter((log) => log.userName.includes(filterUser));
    }

    if (startDate) {
      filtered = filtered.filter((log) => dayjs(log.timestamp) >= startDate);
    }

    if (endDate) {
      filtered = filtered.filter((log) => dayjs(log.timestamp) <= endDate);
    }

    setLogs(filtered);
  };

  const handleReset = () => {
    setFilterModule('全部');
    setFilterAction('全部');
    setFilterUser('');
    setStartDate(null);
    setEndDate(null);
    setLogs(mockLogs);
  };

  const handleExport = () => {
    console.log('导出审计日志');
    // 实际项目中这里会导出文件
  };

  const handleViewDetail = (log: AuditLog) => {
    setSelectedLog(log);
    setOpenDetailDialog(true);
  };

  const getLevelColor = (level: LogLevel) => {
    switch (level) {
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'info';
    }
  };

  const getActionLabel = (action: ActionType) => {
    const labels: Record<ActionType, string> = {
      create: '创建',
      update: '更新',
      delete: '删除',
      login: '登录',
      logout: '登出',
      export: '导出',
      import: '导入',
    };
    return labels[action] || action;
  };

  return (
    <>
      <Helmet>
        <title>审计日志 - 系统设置</title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">审计与操作日志</Typography>
          <Button
            variant="outlined"
            startIcon={<Iconify icon="solar:export-bold" />}
            onClick={handleExport}
          >
            导出日志
          </Button>
        </Stack>

        <Card sx={{ p: 3, mb: 3 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
              <Stack direction="row" spacing={2}>
                <FormControl sx={{ minWidth: 150 }}>
                  <InputLabel>模块</InputLabel>
                  <Select
                    value={filterModule}
                    label="模块"
                    onChange={(e) => setFilterModule(e.target.value)}
                  >
                    {modules.map((module) => (
                      <MenuItem key={module} value={module}>
                        {module}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 150 }}>
                  <InputLabel>操作类型</InputLabel>
                  <Select
                    value={filterAction}
                    label="操作类型"
                    onChange={(e) => setFilterAction(e.target.value)}
                  >
                    {actionTypes.map((action) => (
                      <MenuItem key={action} value={action}>
                        {action === '全部' ? '全部' : getActionLabel(action as ActionType)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  label="用户名"
                  value={filterUser}
                  onChange={(e) => setFilterUser(e.target.value)}
                  sx={{ minWidth: 200 }}
                />

                <DatePicker
                  label="开始时间"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue as Dayjs | null)}
                  slotProps={{ textField: { size: 'medium' } }}
                />

                <DatePicker
                  label="结束时间"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue as Dayjs | null)}
                  slotProps={{ textField: { size: 'medium' } }}
                />
              </Stack>

              <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={handleFilter}>
                  查询
                </Button>
                <Button variant="outlined" onClick={handleReset}>
                  重置
                </Button>
              </Stack>
            </Stack>
          </LocalizationProvider>
        </Card>

        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>时间</TableCell>
                  <TableCell>用户</TableCell>
                  <TableCell>模块</TableCell>
                  <TableCell>操作</TableCell>
                  <TableCell>级别</TableCell>
                  <TableCell>描述</TableCell>
                  <TableCell>IP地址</TableCell>
                  <TableCell align="right">操作</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.logId} hover>
                    <TableCell>{log.timestamp}</TableCell>
                    <TableCell>
                      <Stack>
                        <Typography variant="subtitle2">{log.userName}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {log.userId}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{log.module}</TableCell>
                    <TableCell>
                      <Chip label={getActionLabel(log.action)} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={log.level}
                        color={getLevelColor(log.level)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{log.description}</TableCell>
                    <TableCell>{log.ip}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="查看详情">
                        <IconButton size="small" onClick={() => handleViewDetail(log)}>
                          <Iconify icon="solar:eye-bold" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        {/* 日志详情对话框 */}
        <Dialog
          open={openDetailDialog}
          onClose={() => setOpenDetailDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>日志详情</DialogTitle>
          <DialogContent>
            {selectedLog && (
              <Stack spacing={2} sx={{ mt: 1 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    日志ID
                  </Typography>
                  <Typography variant="body2">{selectedLog.logId}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    时间
                  </Typography>
                  <Typography variant="body2">{selectedLog.timestamp}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    用户
                  </Typography>
                  <Typography variant="body2">
                    {selectedLog.userName} ({selectedLog.userId})
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    模块
                  </Typography>
                  <Typography variant="body2">{selectedLog.module}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    操作
                  </Typography>
                  <Typography variant="body2">{getActionLabel(selectedLog.action)}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    描述
                  </Typography>
                  <Typography variant="body2">{selectedLog.description}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    IP地址
                  </Typography>
                  <Typography variant="body2">{selectedLog.ip}</Typography>
                </Box>
                {selectedLog.details && (
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      详细信息
                    </Typography>
                    <Box
                      component="pre"
                      sx={{
                        p: 2,
                        bgcolor: 'grey.100',
                        borderRadius: 1,
                        overflow: 'auto',
                        fontSize: '0.875rem',
                      }}
                    >
                      {JSON.stringify(JSON.parse(selectedLog.details), null, 2)}
                    </Box>
                  </Box>
                )}
              </Stack>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDetailDialog(false)}>关闭</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}

