import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import {
  Tab,
  Chip,
  Tabs,
  Menu,
  Table,
  Alert,
  Dialog,
  Select,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  TableHead,
  Accordion,
  InputLabel,
  DialogTitle,
  FormControl,
  DialogContent,
  DialogActions,
  TableContainer,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

type APIEndpoint = {
  id: string;
  name: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  authType: 'none' | 'apikey' | 'oauth' | 'basic';
  status: 'active' | 'inactive' | 'testing';
  category: string;
  description: string;
  lastTest?: string;
  responseTime?: number;
  successRate?: number;
};

type FieldMapping = {
  sourceField: string;
  targetField: string;
  transform?: string;
};

const mockAPIs: APIEndpoint[] = [
  {
    id: '1',
    name: '项目数据同步API',
    url: 'https://api.example.com/v1/projects/sync',
    method: 'POST',
    authType: 'apikey',
    status: 'active',
    category: '项目管理',
    description: '同步项目数据到第三方系统',
    lastTest: '2024-10-13 14:30',
    responseTime: 235,
    successRate: 99.5,
  },
  {
    id: '2',
    name: '用户信息查询',
    url: 'https://api.example.com/v1/users/{id}',
    method: 'GET',
    authType: 'oauth',
    status: 'active',
    category: '用户管理',
    description: '获取第三方用户详细信息',
    lastTest: '2024-10-13 10:15',
    responseTime: 156,
    successRate: 98.2,
  },
  {
    id: '3',
    name: '成果数据推送',
    url: 'https://api.partner.com/achievements',
    method: 'POST',
    authType: 'basic',
    status: 'testing',
    category: '成果转化',
    description: '推送成果数据到合作方平台',
    lastTest: '2024-10-12 16:45',
    responseTime: 421,
    successRate: 95.0,
  },
];

const mockFieldMappings: FieldMapping[] = [
  { sourceField: 'projectName', targetField: 'project_title', transform: 'uppercase' },
  { sourceField: 'amount', targetField: 'budget', transform: 'multiply:100' },
  { sourceField: 'startDate', targetField: 'start_time', transform: 'timestamp' },
];

// ----------------------------------------------------------------------

export default function APIManagerPage() {
  const [apis, setAPIs] = useState<APIEndpoint[]>(mockAPIs);
  const [selectedAPI, setSelectedAPI] = useState<APIEndpoint | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [testDialogOpen, setTestDialogOpen] = useState(false);
  const [mappingDialogOpen, setMappingDialogOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [testResult, setTestResult] = useState<any>(null);

  const handleTest = useCallback((api: APIEndpoint) => {
    setSelectedAPI(api);
    setTestDialogOpen(true);
    // 模拟测试
    setTimeout(() => {
      setTestResult({
        success: true,
        statusCode: 200,
        responseTime: Math.floor(Math.random() * 500),
        data: { message: 'API测试成功', timestamp: new Date().toISOString() },
      });
    }, 1000);
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, api: APIEndpoint) => {
    setAnchorEl(event.currentTarget);
    setSelectedAPI(api);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'testing':
        return 'warning';
      case 'inactive':
        return 'default';
      default:
        return 'default';
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'info';
      case 'POST':
        return 'success';
      case 'PUT':
        return 'warning';
      case 'DELETE':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <>
      <Helmet>
        <title>数据接口管理 - 工作流与数据</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        {/* Header */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
          <Typography variant="h4">数据接口管理</Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<Iconify icon="solar:import-bold" />}
            >
              导入配置
            </Button>
            <Button
              variant="contained"
              startIcon={<Iconify icon="solar:add-circle-bold" />}
              onClick={() => setAddDialogOpen(true)}
            >
              注册接口
            </Button>
          </Stack>
        </Stack>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={1}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="h3">{apis.length}</Typography>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'primary.lighter',
                      color: 'primary.main',
                    }}
                  >
                    <Iconify icon="solar:link-bold" width={28} />
                  </Box>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  接口总数
                </Typography>
              </Stack>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={1}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="h3">{apis.filter((a) => a.status === 'active').length}</Typography>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'success.lighter',
                      color: 'success.main',
                    }}
                  >
                    <Iconify icon="solar:check-circle-bold" width={28} />
                  </Box>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  运行中
                </Typography>
              </Stack>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={1}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="h3">
                    {Math.round(apis.reduce((acc, api) => acc + (api.successRate || 0), 0) / apis.length)}%
                  </Typography>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'warning.lighter',
                      color: 'warning.main',
                    }}
                  >
                    <Iconify icon="solar:graph-bold" width={28} />
                  </Box>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  平均成功率
                </Typography>
              </Stack>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={1}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="h3">
                    {Math.round(apis.reduce((acc, api) => acc + (api.responseTime || 0), 0) / apis.length)}ms
                  </Typography>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'info.lighter',
                      color: 'info.main',
                    }}
                  >
                    <Iconify icon="solar:clock-circle-bold" width={28} />
                  </Box>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  平均响应时间
                </Typography>
              </Stack>
            </Card>
          </Grid>
        </Grid>

        {/* Tabs */}
        <Card sx={{ mb: 3 }}>
          <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} sx={{ px: 2 }}>
            <Tab label="全部接口" />
            <Tab label="运行中" />
            <Tab label="测试中" />
            <Tab label="已停用" />
          </Tabs>
        </Card>

        {/* API List */}
        <Card>
          <Scrollbar>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>接口名称</TableCell>
                    <TableCell>请求方法</TableCell>
                    <TableCell>接口地址</TableCell>
                    <TableCell>认证方式</TableCell>
                    <TableCell>状态</TableCell>
                    <TableCell>成功率</TableCell>
                    <TableCell>响应时间</TableCell>
                    <TableCell align="right">操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {apis
                    .filter((api) => {
                      if (activeTab === 0) return true;
                      if (activeTab === 1) return api.status === 'active';
                      if (activeTab === 2) return api.status === 'testing';
                      return api.status === 'inactive';
                    })
                    .map((api) => (
                      <TableRow key={api.id} hover>
                        <TableCell>
                          <Stack spacing={0.5}>
                            <Typography variant="subtitle2">{api.name}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {api.description}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={api.method}
                            size="small"
                            color={getMethodColor(api.method) as any}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                            {api.url}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={api.authType.toUpperCase()}
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={api.status === 'active' ? '运行中' : api.status === 'testing' ? '测试中' : '已停用'}
                            size="small"
                            color={getStatusColor(api.status) as any}
                          />
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography variant="body2">{api.successRate?.toFixed(1)}%</Typography>
                            {api.successRate && api.successRate > 95 && (
                              <Iconify icon="solar:check-circle-bold" width={16} sx={{ color: 'success.main' }} />
                            )}
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="body2"
                            color={api.responseTime && api.responseTime < 300 ? 'success.main' : 'warning.main'}
                          >
                            {api.responseTime}ms
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                            <IconButton size="small" onClick={() => handleTest(api)}>
                              <Iconify icon="solar:play-circle-bold" />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={(e) => handleMenuOpen(e, api)}
                            >
                              <Iconify icon="solar:menu-dots-bold" />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>

        {/* Action Menu */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={() => { setMappingDialogOpen(true); handleMenuClose(); }}>
            <Iconify icon="solar:widget-4-bold" sx={{ mr: 1 }} />
            字段映射
          </MenuItem>
          <MenuItem onClick={() => { setAuthDialogOpen(true); handleMenuClose(); }}>
            <Iconify icon="solar:lock-password-bold" sx={{ mr: 1 }} />
            鉴权配置
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Iconify icon="solar:pen-bold" sx={{ mr: 1 }} />
            编辑
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" sx={{ mr: 1 }} />
            删除
          </MenuItem>
        </Menu>

        {/* Add API Dialog */}
        <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>注册新接口</DialogTitle>
          <DialogContent>
            <Stack spacing={2.5} sx={{ mt: 1 }}>
              <TextField fullWidth label="接口名称" size="small" />
              <TextField fullWidth label="接口地址" size="small" placeholder="https://api.example.com/v1/..." />
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>请求方法</InputLabel>
                    <Select label="请求方法" defaultValue="GET">
                      <MenuItem value="GET">GET</MenuItem>
                      <MenuItem value="POST">POST</MenuItem>
                      <MenuItem value="PUT">PUT</MenuItem>
                      <MenuItem value="DELETE">DELETE</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>认证方式</InputLabel>
                    <Select label="认证方式" defaultValue="none">
                      <MenuItem value="none">无需认证</MenuItem>
                      <MenuItem value="apikey">API Key</MenuItem>
                      <MenuItem value="oauth">OAuth 2.0</MenuItem>
                      <MenuItem value="basic">Basic Auth</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <TextField fullWidth label="分类" size="small" />
              <TextField fullWidth label="描述" multiline rows={2} size="small" />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddDialogOpen(false)}>取消</Button>
            <Button variant="contained">保存</Button>
          </DialogActions>
        </Dialog>

        {/* Test Dialog */}
        <Dialog open={testDialogOpen} onClose={() => setTestDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>Mock测试 - {selectedAPI?.name}</DialogTitle>
          <DialogContent>
            <Stack spacing={2.5} sx={{ mt: 1 }}>
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<Iconify icon="solar:alt-arrow-down-bold" />}>
                  <Typography variant="subtitle2">请求参数</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    fullWidth
                    multiline
                    rows={6}
                    defaultValue={JSON.stringify({ projectId: '123', userId: '456' }, null, 2)}
                    sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}
                  />
                </AccordionDetails>
              </Accordion>

              {testResult && (
                <Accordion defaultExpanded>
                  <AccordionSummary expandIcon={<Iconify icon="solar:alt-arrow-down-bold" />}>
                    <Typography variant="subtitle2">响应结果</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack spacing={2}>
                      <Alert severity={testResult.success ? 'success' : 'error'}>
                        状态码: {testResult.statusCode} | 响应时间: {testResult.responseTime}ms
                      </Alert>
                      <TextField
                        fullWidth
                        multiline
                        rows={6}
                        value={JSON.stringify(testResult.data, null, 2)}
                        sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}
                        InputProps={{ readOnly: true }}
                      />
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              )}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setTestDialogOpen(false)}>关闭</Button>
            <Button variant="contained" startIcon={<Iconify icon="solar:play-bold" />}>
              重新测试
            </Button>
          </DialogActions>
        </Dialog>

        {/* Field Mapping Dialog */}
        <Dialog open={mappingDialogOpen} onClose={() => setMappingDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>字段映射配置</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <Alert severity="info">
                配置源字段到目标字段的映射关系及数据转换规则
              </Alert>
              {mockFieldMappings.map((mapping, index) => (
                <Card key={index} variant="outlined">
                  <Stack direction="row" alignItems="center" spacing={2} sx={{ p: 2 }}>
                    <TextField
                      label="源字段"
                      size="small"
                      defaultValue={mapping.sourceField}
                      sx={{ flex: 1 }}
                    />
                    <Iconify icon="solar:arrow-right-bold" />
                    <TextField
                      label="目标字段"
                      size="small"
                      defaultValue={mapping.targetField}
                      sx={{ flex: 1 }}
                    />
                    <TextField
                      label="转换规则"
                      size="small"
                      defaultValue={mapping.transform}
                      sx={{ flex: 1 }}
                    />
                    <IconButton size="small" color="error">
                      <Iconify icon="solar:trash-bin-trash-bold" />
                    </IconButton>
                  </Stack>
                </Card>
              ))}
              <Button
                variant="outlined"
                startIcon={<Iconify icon="solar:add-circle-bold" />}
              >
                添加映射
              </Button>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setMappingDialogOpen(false)}>取消</Button>
            <Button variant="contained">保存</Button>
          </DialogActions>
        </Dialog>

        {/* Auth Config Dialog */}
        <Dialog open={authDialogOpen} onClose={() => setAuthDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>鉴权配置</DialogTitle>
          <DialogContent>
            <Stack spacing={2.5} sx={{ mt: 1 }}>
              <FormControl fullWidth size="small">
                <InputLabel>认证方式</InputLabel>
                <Select label="认证方式" defaultValue={selectedAPI?.authType}>
                  <MenuItem value="none">无需认证</MenuItem>
                  <MenuItem value="apikey">API Key</MenuItem>
                  <MenuItem value="oauth">OAuth 2.0</MenuItem>
                  <MenuItem value="basic">Basic Auth</MenuItem>
                </Select>
              </FormControl>

              {selectedAPI?.authType === 'apikey' && (
                <>
                  <TextField fullWidth label="API Key" size="small" type="password" />
                  <TextField fullWidth label="Header名称" size="small" defaultValue="X-API-Key" />
                </>
              )}

              {selectedAPI?.authType === 'oauth' && (
                <>
                  <TextField fullWidth label="Client ID" size="small" />
                  <TextField fullWidth label="Client Secret" size="small" type="password" />
                  <TextField fullWidth label="Token URL" size="small" />
                  <TextField fullWidth label="Scope" size="small" />
                </>
              )}

              {selectedAPI?.authType === 'basic' && (
                <>
                  <TextField fullWidth label="用户名" size="small" />
                  <TextField fullWidth label="密码" size="small" type="password" />
                </>
              )}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAuthDialogOpen(false)}>取消</Button>
            <Button variant="contained">保存</Button>
          </DialogActions>
        </Dialog>
      </DashboardContent>
    </>
  );
}

