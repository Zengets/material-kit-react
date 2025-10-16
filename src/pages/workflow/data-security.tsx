import { useState } from 'react';
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
  InputLabel,
  AlertTitle,
  DialogTitle,
  FormControl,
  DialogContent,
  DialogActions,
  TableContainer,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

type SensitiveField = {
  id: string;
  fieldName: string;
  fieldType: string;
  tableName: string;
  sensitivityLevel: 'low' | 'medium' | 'high' | 'critical';
  encryptionMethod: string;
  maskingRule?: string;
  status: 'encrypted' | 'unencrypted';
};

type EncryptionKey = {
  id: string;
  keyName: string;
  algorithm: string;
  keyLength: number;
  createdAt: string;
  expiresAt: string;
  status: 'active' | 'expired' | 'rotated';
  usageCount: number;
};

type AuditLog = {
  id: string;
  action: string;
  operator: string;
  targetField: string;
  timestamp: string;
  ipAddress: string;
  status: 'success' | 'failed';
};

const mockFields: SensitiveField[] = [
  {
    id: '1',
    fieldName: 'idCard',
    fieldType: 'string',
    tableName: 'users',
    sensitivityLevel: 'critical',
    encryptionMethod: 'AES-256',
    maskingRule: '****-****-****-{last4}',
    status: 'encrypted',
  },
  {
    id: '2',
    fieldName: 'phoneNumber',
    fieldType: 'string',
    tableName: 'users',
    sensitivityLevel: 'high',
    encryptionMethod: 'AES-256',
    maskingRule: '{first3}-****-{last4}',
    status: 'encrypted',
  },
  {
    id: '3',
    fieldName: 'bankAccount',
    fieldType: 'string',
    tableName: 'finance',
    sensitivityLevel: 'critical',
    encryptionMethod: 'RSA-2048',
    maskingRule: '****-****-****-{last4}',
    status: 'encrypted',
  },
  {
    id: '4',
    fieldName: 'salary',
    fieldType: 'number',
    tableName: 'employees',
    sensitivityLevel: 'medium',
    encryptionMethod: 'AES-128',
    status: 'encrypted',
  },
];

const mockKeys: EncryptionKey[] = [
  {
    id: '1',
    keyName: 'primary-encryption-key',
    algorithm: 'AES-256-GCM',
    keyLength: 256,
    createdAt: '2024-09-01',
    expiresAt: '2025-09-01',
    status: 'active',
    usageCount: 1245,
  },
  {
    id: '2',
    keyName: 'secondary-encryption-key',
    algorithm: 'RSA-2048',
    keyLength: 2048,
    createdAt: '2024-08-15',
    expiresAt: '2025-08-15',
    status: 'active',
    usageCount: 856,
  },
  {
    id: '3',
    keyName: 'legacy-key-v1',
    algorithm: 'AES-128',
    keyLength: 128,
    createdAt: '2024-01-01',
    expiresAt: '2024-06-01',
    status: 'rotated',
    usageCount: 3421,
  },
];

const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    action: '查看敏感字段',
    operator: '张三',
    targetField: 'users.idCard',
    timestamp: '2024-10-13 14:35:22',
    ipAddress: '192.168.1.100',
    status: 'success',
  },
  {
    id: '2',
    action: '导出数据',
    operator: '李四',
    targetField: 'finance.bankAccount',
    timestamp: '2024-10-13 14:20:15',
    ipAddress: '192.168.1.101',
    status: 'success',
  },
  {
    id: '3',
    action: '解密数据',
    operator: '王五',
    targetField: 'users.phoneNumber',
    timestamp: '2024-10-13 13:45:08',
    ipAddress: '192.168.1.102',
    status: 'failed',
  },
];

// ----------------------------------------------------------------------

export default function DataSecurityPage() {
  const [fields, setFields] = useState<SensitiveField[]>(mockFields);
  const [keys, setKeys] = useState<EncryptionKey[]>(mockKeys);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(mockAuditLogs);
  const [selectedField, setSelectedField] = useState<SensitiveField | null>(null);
  const [selectedKey, setSelectedKey] = useState<EncryptionKey | null>(null);
  const [addFieldDialogOpen, setAddFieldDialogOpen] = useState(false);
  const [addKeyDialogOpen, setAddKeyDialogOpen] = useState(false);
  const [maskingDialogOpen, setMaskingDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, field: SensitiveField) => {
    setAnchorEl(event.currentTarget);
    setSelectedField(field);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getSensitivityColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'error';
      case 'high':
        return 'warning';
      case 'medium':
        return 'info';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getKeyStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'expired':
        return 'error';
      case 'rotated':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <>
      <Helmet>
        <title>数据加密与安全 - 工作流与数据</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        {/* Header */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
          <Typography variant="h4">数据加密与安全</Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<Iconify icon="solar:refresh-bold" />}
            >
              密钥轮换
            </Button>
            <Button
              variant="outlined"
              startIcon={<Iconify icon="solar:download-bold" />}
            >
              导出审计日志
            </Button>
          </Stack>
        </Stack>

        {/* Security Overview */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={1}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="h3">{fields.filter((f) => f.status === 'encrypted').length}</Typography>
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
                    <Iconify icon="solar:shield-check-bold" width={28} />
                  </Box>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  已加密字段
                </Typography>
              </Stack>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={1}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="h3">{keys.filter((k) => k.status === 'active').length}</Typography>
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
                    <Iconify icon="solar:key-bold" width={28} />
                  </Box>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  活跃密钥
                </Typography>
              </Stack>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={1}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="h3">{fields.filter((f) => f.sensitivityLevel === 'critical').length}</Typography>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'error.lighter',
                      color: 'error.main',
                    }}
                  >
                    <Iconify icon="solar:danger-bold" width={28} />
                  </Box>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  高危敏感字段
                </Typography>
              </Stack>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={1}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="h3">{auditLogs.length}</Typography>
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
                    <Iconify icon="solar:document-text-bold" width={28} />
                  </Box>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  今日审计记录
                </Typography>
              </Stack>
            </Card>
          </Grid>
        </Grid>

        {/* Main Content Tabs */}
        <Card>
          <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} sx={{ px: 2, borderBottom: 1, borderColor: 'divider' }}>
            <Tab label="敏感字段" />
            <Tab label="密钥管理" />
            <Tab label="脱敏配置" />
            <Tab label="审计日志" />
          </Tabs>

          {/* Tab 1: Sensitive Fields */}
          {activeTab === 0 && (
            <Box>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
                <TextField
                  size="small"
                  placeholder="搜索字段..."
                  InputProps={{
                    startAdornment: <Iconify icon="solar:magnifer-linear" sx={{ mr: 1 }} />,
                  }}
                  sx={{ width: 300 }}
                />
                <Button
                  variant="contained"
                  startIcon={<Iconify icon="solar:add-circle-bold" />}
                  onClick={() => setAddFieldDialogOpen(true)}
                >
                  标注敏感字段
                </Button>
              </Stack>
              <Scrollbar>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>字段名称</TableCell>
                        <TableCell>数据表</TableCell>
                        <TableCell>字段类型</TableCell>
                        <TableCell>敏感级别</TableCell>
                        <TableCell>加密方式</TableCell>
                        <TableCell>脱敏规则</TableCell>
                        <TableCell>状态</TableCell>
                        <TableCell align="right">操作</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {fields.map((field) => (
                        <TableRow key={field.id} hover>
                          <TableCell>
                            <Typography variant="subtitle2" sx={{ fontFamily: 'monospace' }}>
                              {field.fieldName}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">{field.tableName}</Typography>
                          </TableCell>
                          <TableCell>
                            <Chip label={field.fieldType} size="small" variant="outlined" />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={field.sensitivityLevel === 'critical' ? '极高' : field.sensitivityLevel === 'high' ? '高' : field.sensitivityLevel === 'medium' ? '中' : '低'}
                              size="small"
                              color={getSensitivityColor(field.sensitivityLevel) as any}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="caption">{field.encryptionMethod}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                              {field.maskingRule || '-'}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={field.status === 'encrypted' ? '已加密' : '未加密'}
                              size="small"
                              color={field.status === 'encrypted' ? 'success' : 'error'}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <IconButton size="small" onClick={(e) => handleMenuOpen(e, field)}>
                              <Iconify icon="solar:menu-dots-bold" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Scrollbar>
            </Box>
          )}

          {/* Tab 2: Key Management */}
          {activeTab === 1 && (
            <Box>
              <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ p: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<Iconify icon="solar:add-circle-bold" />}
                  onClick={() => setAddKeyDialogOpen(true)}
                >
                  生成密钥
                </Button>
              </Stack>
              <Scrollbar>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>密钥名称</TableCell>
                        <TableCell>算法</TableCell>
                        <TableCell>密钥长度</TableCell>
                        <TableCell>创建时间</TableCell>
                        <TableCell>过期时间</TableCell>
                        <TableCell>使用次数</TableCell>
                        <TableCell>状态</TableCell>
                        <TableCell align="right">操作</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {keys.map((key) => (
                        <TableRow key={key.id} hover>
                          <TableCell>
                            <Typography variant="subtitle2">{key.keyName}</Typography>
                          </TableCell>
                          <TableCell>
                            <Chip label={key.algorithm} size="small" variant="outlined" />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">{key.keyLength} bits</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="caption">{key.createdAt}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="caption">{key.expiresAt}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">{key.usageCount.toLocaleString()}</Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={key.status === 'active' ? '活跃' : key.status === 'expired' ? '已过期' : '已轮换'}
                              size="small"
                              color={getKeyStatusColor(key.status) as any}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                              {key.status === 'active' && (
                                <Button size="small" variant="outlined">
                                  轮换
                                </Button>
                              )}
                              <IconButton size="small">
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
            </Box>
          )}

          {/* Tab 3: Masking Configuration */}
          {activeTab === 2 && (
            <Box sx={{ p: 3 }}>
              <Alert severity="info" sx={{ mb: 3 }}>
                <AlertTitle>数据脱敏规则说明</AlertTitle>
                配置字段的脱敏显示规则，用于在非授权场景下保护敏感数据
              </Alert>
              <Grid container spacing={3}>
                {fields.filter((f) => f.maskingRule).map((field) => (
                  <Grid size={{ xs: 12, md: 6 }} key={field.id}>
                    <Card variant="outlined">
                      <Stack spacing={2} sx={{ p: 2 }}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                          <Typography variant="subtitle2">{field.fieldName}</Typography>
                          <Chip
                            label={field.sensitivityLevel === 'critical' ? '极高' : field.sensitivityLevel === 'high' ? '高' : '中'}
                            size="small"
                            color={getSensitivityColor(field.sensitivityLevel) as any}
                          />
                        </Stack>
                        <Divider />
                        <Stack spacing={1.5}>
                          <Stack direction="row" justifyContent="space-between">
                            <Typography variant="caption" color="text.secondary">
                              原始数据
                            </Typography>
                            <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                              {field.fieldName === 'idCard' ? '3301**********1234' :
                               field.fieldName === 'phoneNumber' ? '138****5678' :
                               field.fieldName === 'bankAccount' ? '6222************1234' : '-'}
                            </Typography>
                          </Stack>
                          <Stack direction="row" justifyContent="space-between">
                            <Typography variant="caption" color="text.secondary">
                              脱敏规则
                            </Typography>
                            <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'primary.main' }}>
                              {field.maskingRule}
                            </Typography>
                          </Stack>
                          <Stack direction="row" justifyContent="space-between">
                            <Typography variant="caption" color="text.secondary">
                              脱敏后
                            </Typography>
                            <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'success.main' }}>
                              {field.fieldName === 'idCard' ? '****-****-****-1234' :
                               field.fieldName === 'phoneNumber' ? '138-****-5678' :
                               field.fieldName === 'bankAccount' ? '****-****-****-1234' : '-'}
                            </Typography>
                          </Stack>
                        </Stack>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<Iconify icon="solar:pen-bold" />}
                          onClick={() => { setSelectedField(field); setMaskingDialogOpen(true); }}
                        >
                          编辑规则
                        </Button>
                      </Stack>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Tab 4: Audit Logs */}
          {activeTab === 3 && (
            <Box>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
                <TextField
                  size="small"
                  placeholder="搜索审计日志..."
                  InputProps={{
                    startAdornment: <Iconify icon="solar:magnifer-linear" sx={{ mr: 1 }} />,
                  }}
                  sx={{ width: 300 }}
                />
                <Stack direction="row" spacing={1}>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select defaultValue="all">
                      <MenuItem value="all">全部操作</MenuItem>
                      <MenuItem value="view">查看</MenuItem>
                      <MenuItem value="export">导出</MenuItem>
                      <MenuItem value="decrypt">解密</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </Stack>
              <Scrollbar>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>操作</TableCell>
                        <TableCell>操作人</TableCell>
                        <TableCell>目标字段</TableCell>
                        <TableCell>时间</TableCell>
                        <TableCell>IP地址</TableCell>
                        <TableCell>状态</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {auditLogs.map((log) => (
                        <TableRow key={log.id} hover>
                          <TableCell>
                            <Typography variant="body2">{log.action}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">{log.operator}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                              {log.targetField}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="caption">{log.timestamp}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                              {log.ipAddress}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={log.status === 'success' ? '成功' : '失败'}
                              size="small"
                              color={log.status === 'success' ? 'success' : 'error'}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Scrollbar>
            </Box>
          )}
        </Card>

        {/* Field Menu */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleMenuClose}>
            <Iconify icon="solar:pen-bold" sx={{ mr: 1 }} />
            编辑配置
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Iconify icon="solar:shield-bold" sx={{ mr: 1 }} />
            变更加密策略
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Iconify icon="solar:eye-bold" sx={{ mr: 1 }} />
            设置脱敏规则
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" sx={{ mr: 1 }} />
            移除标注
          </MenuItem>
        </Menu>

        {/* Add Field Dialog */}
        <Dialog open={addFieldDialogOpen} onClose={() => setAddFieldDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>标注敏感字段</DialogTitle>
          <DialogContent>
            <Stack spacing={2.5} sx={{ mt: 1 }}>
              <TextField fullWidth label="数据表" size="small" />
              <TextField fullWidth label="字段名称" size="small" />
              <FormControl fullWidth size="small">
                <InputLabel>敏感级别</InputLabel>
                <Select label="敏感级别" defaultValue="medium">
                  <MenuItem value="low">低</MenuItem>
                  <MenuItem value="medium">中</MenuItem>
                  <MenuItem value="high">高</MenuItem>
                  <MenuItem value="critical">极高</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth size="small">
                <InputLabel>加密算法</InputLabel>
                <Select label="加密算法" defaultValue="aes256">
                  <MenuItem value="aes128">AES-128</MenuItem>
                  <MenuItem value="aes256">AES-256</MenuItem>
                  <MenuItem value="rsa2048">RSA-2048</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="脱敏规则（可选）"
                size="small"
                placeholder="例：{first3}-****-{last4}"
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddFieldDialogOpen(false)}>取消</Button>
            <Button variant="contained">保存</Button>
          </DialogActions>
        </Dialog>

        {/* Add Key Dialog */}
        <Dialog open={addKeyDialogOpen} onClose={() => setAddKeyDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>生成新密钥</DialogTitle>
          <DialogContent>
            <Stack spacing={2.5} sx={{ mt: 1 }}>
              <TextField fullWidth label="密钥名称" size="small" />
              <FormControl fullWidth size="small">
                <InputLabel>加密算法</InputLabel>
                <Select label="加密算法" defaultValue="aes256">
                  <MenuItem value="aes128">AES-128</MenuItem>
                  <MenuItem value="aes256">AES-256-GCM</MenuItem>
                  <MenuItem value="rsa2048">RSA-2048</MenuItem>
                  <MenuItem value="rsa4096">RSA-4096</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="有效期（天）"
                type="number"
                size="small"
                defaultValue={365}
              />
              <Alert severity="warning">
                密钥生成后将无法查看明文，请妥善保管
              </Alert>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddKeyDialogOpen(false)}>取消</Button>
            <Button variant="contained">生成密钥</Button>
          </DialogActions>
        </Dialog>

        {/* Masking Rule Dialog */}
        <Dialog open={maskingDialogOpen} onClose={() => setMaskingDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>编辑脱敏规则</DialogTitle>
          <DialogContent>
            <Stack spacing={2.5} sx={{ mt: 1 }}>
              <TextField
                fullWidth
                label="字段名称"
                size="small"
                value={selectedField?.fieldName}
                disabled
              />
              <TextField
                fullWidth
                label="脱敏规则"
                size="small"
                defaultValue={selectedField?.maskingRule}
                placeholder="例：{first3}-****-{last4}"
              />
              <Alert severity="info">
                <AlertTitle>规则说明</AlertTitle>
                <Typography variant="caption">
                  • {'{first3}'} - 保留前3位<br />
                  • {'{last4}'} - 保留后4位<br />
                  • * - 替换为星号<br />
                  • - - 分隔符
                </Typography>
              </Alert>
              <Box sx={{ p: 2, bgcolor: 'background.neutral', borderRadius: 1 }}>
                <Stack spacing={1}>
                  <Typography variant="caption" color="text.secondary">
                    预览效果
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                    原始：13812345678
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'success.main' }}>
                    脱敏：138-****-5678
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setMaskingDialogOpen(false)}>取消</Button>
            <Button variant="contained">保存</Button>
          </DialogActions>
        </Dialog>
      </DashboardContent>
    </>
  );
}

