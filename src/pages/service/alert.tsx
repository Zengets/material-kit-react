import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
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
  Dialog,
  Switch,
  Select,
  MenuItem,
  InputLabel,
  DialogTitle,
  FormControl,
  DialogContent,
  DialogActions,
  FormControlLabel,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

type AlertLevel = 'critical' | 'high' | 'medium' | 'low';
type AlertStatus = 'active' | 'acknowledged' | 'resolved';

type Alert = {
  alertId: string;
  title: string;
  description: string;
  level: AlertLevel;
  status: AlertStatus;
  source: string;
  triggeredAt: string;
  acknowledgedAt?: string;
  resolvedAt?: string;
  acknowledgedBy?: string;
};

type AlertRule = {
  ruleId: string;
  name: string;
  description: string;
  enabled: boolean;
  level: AlertLevel;
  conditions: string;
};

// Mock data
const mockAlerts: Alert[] = [
  {
    alertId: '1',
    title: '系统CPU使用率过高',
    description: 'CPU使用率达到95%，持续超过5分钟',
    level: 'critical',
    status: 'active',
    source: '系统监控',
    triggeredAt: '2025-10-12 10:30',
  },
  {
    alertId: '2',
    title: '设备预约冲突',
    description: '3D打印机在同一时段有多个预约',
    level: 'high',
    status: 'acknowledged',
    source: '设备共享',
    triggeredAt: '2025-10-12 09:15',
    acknowledgedAt: '2025-10-12 09:20',
    acknowledgedBy: '张三',
  },
  {
    alertId: '3',
    title: '项目审批超时',
    description: '项目"智能制造平台"审批已超过7天',
    level: 'medium',
    status: 'active',
    source: '项目管理',
    triggeredAt: '2025-10-12 08:00',
  },
  {
    alertId: '4',
    title: '数据库连接异常',
    description: '数据库连接池使用率达到90%',
    level: 'high',
    status: 'resolved',
    source: '系统监控',
    triggeredAt: '2025-10-11 18:00',
    acknowledgedAt: '2025-10-11 18:05',
    resolvedAt: '2025-10-11 18:30',
    acknowledgedBy: '李四',
  },
  {
    alertId: '5',
    title: '培训课程即将过期',
    description: '5门课程将在本月底到期',
    level: 'low',
    status: 'active',
    source: '能力培养',
    triggeredAt: '2025-10-11 10:00',
  },
  {
    alertId: '6',
    title: '存储空间不足',
    description: '文件存储空间使用率达到85%',
    level: 'medium',
    status: 'acknowledged',
    source: '系统监控',
    triggeredAt: '2025-10-10 16:30',
    acknowledgedAt: '2025-10-10 16:35',
    acknowledgedBy: '王五',
  },
];

const mockAlertRules: AlertRule[] = [
  {
    ruleId: '1',
    name: 'CPU使用率告警',
    description: 'CPU使用率超过90%时触发',
    enabled: true,
    level: 'critical',
    conditions: 'cpu_usage > 90% for 5 minutes',
  },
  {
    ruleId: '2',
    name: '设备预约冲突',
    description: '同一设备同一时段有多个预约',
    enabled: true,
    level: 'high',
    conditions: 'booking_conflict = true',
  },
  {
    ruleId: '3',
    name: '审批超时提醒',
    description: '审批超过7天未处理',
    enabled: true,
    level: 'medium',
    conditions: 'approval_pending_days > 7',
  },
  {
    ruleId: '4',
    name: '存储空间告警',
    description: '存储空间使用率超过80%',
    enabled: true,
    level: 'medium',
    conditions: 'storage_usage > 80%',
  },
];

const alertLevelConfig = {
  critical: { label: '严重', color: 'error' as const, icon: 'solar:shield-keyhole-bold-duotone' },
  high: { label: '高', color: 'warning' as const, icon: 'solar:info-circle-bold' },
  medium: { label: '中', color: 'info' as const, icon: 'solar:info-circle-bold' },
  low: { label: '低', color: 'success' as const, icon: 'solar:info-circle-bold' },
};

const alertStatusConfig = {
  active: { label: '活跃', color: 'error' as const },
  acknowledged: { label: '已确认', color: 'warning' as const },
  resolved: { label: '已解决', color: 'success' as const },
};

// ----------------------------------------------------------------------

export default function ServiceAlertPage() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [rules, setRules] = useState<AlertRule[]>(mockAlertRules);
  const [filterLevel, setFilterLevel] = useState<AlertLevel | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<AlertStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rulesDialogOpen, setRulesDialogOpen] = useState(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  // Filter alerts
  const filteredAlerts = alerts.filter((alert) => {
    const levelMatch = filterLevel === 'all' || alert.level === filterLevel;
    const statusMatch = filterStatus === 'all' || alert.status === filterStatus;
    const searchMatch =
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchQuery.toLowerCase());
    return levelMatch && statusMatch && searchMatch;
  });

  const activeCount = alerts.filter((a) => a.status === 'active').length;
  const criticalCount = alerts.filter((a) => a.level === 'critical' && a.status === 'active').length;

  const handleAcknowledge = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.alertId === alertId
          ? {
              ...alert,
              status: 'acknowledged' as AlertStatus,
              acknowledgedAt: new Date().toLocaleString('zh-CN'),
              acknowledgedBy: '当前用户',
            }
          : alert
      )
    );
  };

  const handleResolve = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.alertId === alertId
          ? {
              ...alert,
              status: 'resolved' as AlertStatus,
              resolvedAt: new Date().toLocaleString('zh-CN'),
            }
          : alert
      )
    );
    setDetailDialogOpen(false);
  };

  const handleViewDetail = (alert: Alert) => {
    setSelectedAlert(alert);
    setDetailDialogOpen(true);
  };

  const handleToggleRule = (ruleId: string) => {
    setRules((prev) =>
      prev.map((rule) => (rule.ruleId === ruleId ? { ...rule, enabled: !rule.enabled } : rule))
    );
  };

  return (
    <>
      <Helmet>
        <title>系统告警 - 智能服务</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Box>
            <Typography variant="h4">系统告警与审批提醒</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              共 {alerts.length} 条告警，{activeCount} 条活跃，{criticalCount} 条严重
            </Typography>
          </Box>

          <Button
            variant="outlined"
            startIcon={<Iconify icon="solar:settings-bold-duotone" />}
            onClick={() => setRulesDialogOpen(true)}
          >
            告警规则
          </Button>
        </Stack>

        {/* Statistics Cards */}
        <Grid container spacing={3} mb={3}>
          {Object.entries(alertLevelConfig).map(([level, config]) => {
            const count = alerts.filter((a) => a.level === level && a.status === 'active').length;
            return (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={level}>
                <Card sx={{ p: 3 }}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography variant="h3">{count}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {config.label}级告警
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        bgcolor: `${config.color}.lighter`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Iconify icon={config.icon as any} width={32} color={`${config.color}.main`} />
                    </Box>
                  </Stack>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <Card>
          {/* Filters */}
          <Box sx={{ p: 2 }}>
            <Stack spacing={2}>
              {/* Search */}
              <TextField
                fullWidth
                placeholder="搜索告警标题或描述..."
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

              {/* Level and Status Filters */}
              <Stack direction="row" spacing={2}>
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel>告警级别</InputLabel>
                  <Select
                    value={filterLevel}
                    label="告警级别"
                    onChange={(e) => setFilterLevel(e.target.value as AlertLevel | 'all')}
                  >
                    <MenuItem value="all">全部</MenuItem>
                    {Object.entries(alertLevelConfig).map(([level, config]) => (
                      <MenuItem key={level} value={level}>
                        {config.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel>状态</InputLabel>
                  <Select
                    value={filterStatus}
                    label="状态"
                    onChange={(e) => setFilterStatus(e.target.value as AlertStatus | 'all')}
                  >
                    <MenuItem value="all">全部</MenuItem>
                    {Object.entries(alertStatusConfig).map(([status, config]) => (
                      <MenuItem key={status} value={status}>
                        {config.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Stack>
          </Box>

          <Divider />

          {/* Alerts Table */}
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>级别</TableCell>
                    <TableCell>标题</TableCell>
                    <TableCell>来源</TableCell>
                    <TableCell>状态</TableCell>
                    <TableCell>触发时间</TableCell>
                    <TableCell align="right">操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredAlerts
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((alert) => (
                      <TableRow
                        key={alert.alertId}
                        hover
                        sx={{ cursor: 'pointer' }}
                        onClick={() => handleViewDetail(alert)}
                      >
                        <TableCell>
                          <Badge
                            color={alertLevelConfig[alert.level].color}
                            variant="dot"
                            invisible={alert.status !== 'active'}
                          >
                            <Chip
                              size="small"
                              label={alertLevelConfig[alert.level].label}
                              color={alertLevelConfig[alert.level].color}
                            />
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="subtitle2">{alert.title}</Typography>
                            <Typography variant="caption" color="text.secondary" noWrap>
                              {alert.description}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{alert.source}</Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            size="small"
                            label={alertStatusConfig[alert.status].label}
                            color={alertStatusConfig[alert.status].color}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {alert.triggeredAt}
                          </Typography>
                        </TableCell>
                        <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                          <Stack direction="row" spacing={1} justifyContent="flex-end">
                            {alert.status === 'active' && (
                              <Button
                                size="small"
                                variant="outlined"
                                onClick={() => handleAcknowledge(alert.alertId)}
                              >
                                确认
                              </Button>
                            )}
                            {alert.status !== 'resolved' && (
                              <Button
                                size="small"
                                variant="contained"
                                color="success"
                                onClick={() => handleResolve(alert.alertId)}
                              >
                                解决
                              </Button>
                            )}
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            component="div"
            count={filteredAlerts.length}
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

      {/* Alert Rules Dialog */}
      <Dialog open={rulesDialogOpen} onClose={() => setRulesDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>告警规则管理</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Button variant="outlined" startIcon={<Iconify icon="mingcute:add-line" />}>
              添加规则
            </Button>
            <Divider />
            {rules.map((rule) => (
              <Card key={rule.ruleId} variant="outlined" sx={{ p: 2 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Box sx={{ flex: 1 }}>
                    <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                      <Typography variant="subtitle2">{rule.name}</Typography>
                      <Chip
                        size="small"
                        label={alertLevelConfig[rule.level].label}
                        color={alertLevelConfig[rule.level].color}
                      />
                    </Stack>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {rule.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      条件: {rule.conditions}
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <FormControlLabel
                      control={
                        <Switch
                          checked={rule.enabled}
                          onChange={() => handleToggleRule(rule.ruleId)}
                        />
                      }
                      label={rule.enabled ? '启用' : '禁用'}
                    />
                    <IconButton size="small">
                      <Iconify icon="solar:pen-bold" />
                    </IconButton>
                  </Stack>
                </Stack>
              </Card>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRulesDialogOpen(false)}>关闭</Button>
        </DialogActions>
      </Dialog>

      {/* Alert Detail Dialog */}
      <Dialog
        open={detailDialogOpen}
        onClose={() => setDetailDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        {selectedAlert && (
          <>
            <DialogTitle>
              <Stack direction="row" spacing={1} alignItems="center">
                <Iconify
                  icon={alertLevelConfig[selectedAlert.level].icon as any}
                  color={`${alertLevelConfig[selectedAlert.level].color}.main`}
                />
                <Typography variant="h6">{selectedAlert.title}</Typography>
              </Stack>
            </DialogTitle>
            <DialogContent>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    级别
                  </Typography>
                  <Box sx={{ mt: 0.5 }}>
                    <Chip
                      label={alertLevelConfig[selectedAlert.level].label}
                      color={alertLevelConfig[selectedAlert.level].color}
                    />
                  </Box>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    状态
                  </Typography>
                  <Box sx={{ mt: 0.5 }}>
                    <Chip
                      label={alertStatusConfig[selectedAlert.status].label}
                      color={alertStatusConfig[selectedAlert.status].color}
                    />
                  </Box>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    描述
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    {selectedAlert.description}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    来源
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    {selectedAlert.source}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    触发时间
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    {selectedAlert.triggeredAt}
                  </Typography>
                </Box>

                {selectedAlert.acknowledgedAt && (
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      确认时间
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      {selectedAlert.acknowledgedAt} by {selectedAlert.acknowledgedBy}
                    </Typography>
                  </Box>
                )}

                {selectedAlert.resolvedAt && (
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      解决时间
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      {selectedAlert.resolvedAt}
                    </Typography>
                  </Box>
                )}
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDetailDialogOpen(false)}>关闭</Button>
              {selectedAlert.status === 'active' && (
                <Button
                  variant="outlined"
                  onClick={() => handleAcknowledge(selectedAlert.alertId)}
                >
                  确认
                </Button>
              )}
              {selectedAlert.status !== 'resolved' && (
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleResolve(selectedAlert.alertId)}
                >
                  标记为已解决
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
}

