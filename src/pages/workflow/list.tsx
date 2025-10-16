import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import {
  Tab,
  Chip,
  Menu,
  Tabs,
  Table,
  Dialog,
  Switch,
  Tooltip,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  TableHead,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableContainer,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

type WorkflowTemplate = {
  id: string;
  name: string;
  category: string;
  status: 'active' | 'inactive' | 'draft';
  version: string;
  createdAt: string;
  updatedAt: string;
  author: string;
  usageCount: number;
  permissions: string[];
  description: string;
};

const mockTemplates: WorkflowTemplate[] = [
  {
    id: '1',
    name: '项目申报审批流程',
    category: '项目管理',
    status: 'active',
    version: 'v2.1.0',
    createdAt: '2024-09-15',
    updatedAt: '2024-10-10',
    author: '张三',
    usageCount: 128,
    permissions: ['研发部', '产品部'],
    description: '用于科研项目申报的标准审批流程',
  },
  {
    id: '2',
    name: '费用报销流程',
    category: '财务管理',
    status: 'active',
    version: 'v1.5.0',
    createdAt: '2024-08-20',
    updatedAt: '2024-09-28',
    author: '李四',
    usageCount: 342,
    permissions: ['全员'],
    description: '日常费用报销审批流程',
  },
  {
    id: '3',
    name: '设备采购审批',
    category: '采购管理',
    status: 'active',
    version: 'v1.0.0',
    createdAt: '2024-10-01',
    updatedAt: '2024-10-05',
    author: '王五',
    usageCount: 45,
    permissions: ['管理员', '采购部'],
    description: '设备采购申请审批流程',
  },
  {
    id: '4',
    name: '成果转化流程（草稿）',
    category: '成果管理',
    status: 'draft',
    version: 'v0.1.0',
    createdAt: '2024-10-12',
    updatedAt: '2024-10-12',
    author: '赵六',
    usageCount: 0,
    permissions: ['研发部'],
    description: '科研成果转化审批流程（未发布）',
  },
  {
    id: '5',
    name: '请假申请流程（已停用）',
    category: '人事管理',
    status: 'inactive',
    version: 'v1.2.0',
    createdAt: '2024-07-10',
    updatedAt: '2024-09-01',
    author: '孙七',
    usageCount: 256,
    permissions: ['全员'],
    description: '员工请假申请流程（已被新版本替代）',
  },
];

// ----------------------------------------------------------------------

export default function WorkflowListPage() {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<WorkflowTemplate[]>(mockTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<WorkflowTemplate | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [permissionDialogOpen, setPermissionDialogOpen] = useState(false);
  const [versionDialogOpen, setVersionDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, template: WorkflowTemplate) => {
    setAnchorEl(event.currentTarget);
    setSelectedTemplate(template);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleClone = () => {
    console.log('克隆模板', selectedTemplate);
    handleMenuClose();
  };

  const handleToggleStatus = (id: string) => {
    setTemplates(
      templates.map((t) =>
        t.id === id
          ? { ...t, status: t.status === 'active' ? 'inactive' : 'active' as any }
          : t
      )
    );
  };

  const handleEdit = () => {
    navigate('/workflow/designer');
    handleMenuClose();
  };

  const filteredTemplates = templates.filter((template) => {
    const matchSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchTab =
      activeTab === 0 ? true :
      activeTab === 1 ? template.status === 'active' :
      activeTab === 2 ? template.status === 'draft' :
      template.status === 'inactive';
    return matchSearch && matchTab;
  });

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return { label: '已启用', color: 'success' as const };
      case 'inactive':
        return { label: '已停用', color: 'default' as const };
      case 'draft':
        return { label: '草稿', color: 'warning' as const };
      default:
        return { label: '未知', color: 'default' as const };
    }
  };

  return (
    <>
      <Helmet>
        <title>流程模板列表 - 工作流与数据</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        {/* Header */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
          <Typography variant="h4">流程模板列表</Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<Iconify icon="solar:import-bold" />}
            >
              导入模板
            </Button>
            <Button
              variant="contained"
              startIcon={<Iconify icon="solar:add-circle-bold" />}
              onClick={() => navigate('/workflow/designer')}
            >
              创建流程
            </Button>
          </Stack>
        </Stack>

        {/* Tabs and Search */}
        <Card sx={{ mb: 3 }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'stretch', sm: 'center' }}
            justifyContent="space-between"
            sx={{ p: 2 }}
            spacing={2}
          >
            <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)}>
              <Tab label={`全部 (${templates.length})`} />
              <Tab label={`已启用 (${templates.filter(t => t.status === 'active').length})`} />
              <Tab label={`草稿 (${templates.filter(t => t.status === 'draft').length})`} />
              <Tab label={`已停用 (${templates.filter(t => t.status === 'inactive').length})`} />
            </Tabs>

            <TextField
              size="small"
              placeholder="搜索流程模板..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <Iconify icon="solar:magnifer-linear" sx={{ mr: 1 }} />,
              }}
              sx={{ width: { xs: '100%', sm: 300 } }}
            />
          </Stack>
        </Card>

        {/* Templates Table */}
        <Card>
          <Scrollbar>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>流程名称</TableCell>
                    <TableCell>分类</TableCell>
                    <TableCell>状态</TableCell>
                    <TableCell>版本</TableCell>
                    <TableCell>使用次数</TableCell>
                    <TableCell>权限范围</TableCell>
                    <TableCell>更新时间</TableCell>
                    <TableCell align="right">操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTemplates.map((template) => {
                    const statusConfig = getStatusConfig(template.status);
                    return (
                      <TableRow key={template.id} hover>
                        <TableCell>
                          <Stack spacing={0.5}>
                            <Typography variant="subtitle2">{template.name}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {template.description}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Chip label={template.category} size="small" variant="outlined" />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={statusConfig.label}
                            size="small"
                            color={statusConfig.color}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{template.version}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{template.usageCount}</Typography>
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={0.5}>
                            {template.permissions.slice(0, 2).map((perm) => (
                              <Chip key={perm} label={perm} size="small" variant="outlined" />
                            ))}
                            {template.permissions.length > 2 && (
                              <Chip
                                label={`+${template.permissions.length - 2}`}
                                size="small"
                                variant="outlined"
                              />
                            )}
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Stack spacing={0.5}>
                            <Typography variant="caption">{template.updatedAt}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              by {template.author}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="right">
                          <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                            <Tooltip title={template.status === 'active' ? '停用' : '启用'}>
                              <Switch
                                checked={template.status === 'active'}
                                onChange={() => handleToggleStatus(template.id)}
                                size="small"
                              />
                            </Tooltip>
                            <IconButton
                              size="small"
                              onClick={(e) => handleMenuOpen(e, template)}
                            >
                              <Iconify icon="solar:menu-dots-bold" />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>

        {/* Action Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEdit}>
            <Iconify icon="solar:pen-bold" sx={{ mr: 1 }} />
            编辑
          </MenuItem>
          <MenuItem onClick={handleClone}>
            <Iconify icon="solar:copy-bold" sx={{ mr: 1 }} />
            克隆
          </MenuItem>
          <MenuItem onClick={() => { setVersionDialogOpen(true); handleMenuClose(); }}>
            <Iconify icon="solar:history-bold" sx={{ mr: 1 }} />
            版本管理
          </MenuItem>
          <MenuItem onClick={() => { setPermissionDialogOpen(true); handleMenuClose(); }}>
            <Iconify icon="solar:shield-user-bold" sx={{ mr: 1 }} />
            权限设置
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" sx={{ mr: 1 }} />
            删除
          </MenuItem>
        </Menu>

        {/* Permission Dialog */}
        <Dialog
          open={permissionDialogOpen}
          onClose={() => setPermissionDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>流程权限设置</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {selectedTemplate?.name}
              </Typography>
              <Divider />
              <Stack spacing={1.5}>
                {['全员', '研发部', '产品部', '管理员', '财务部'].map((role) => (
                  <Stack
                    key={role}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="body2">{role}</Typography>
                    <Switch
                      defaultChecked={selectedTemplate?.permissions.includes(role)}
                      size="small"
                    />
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setPermissionDialogOpen(false)}>取消</Button>
            <Button variant="contained">保存</Button>
          </DialogActions>
        </Dialog>

        {/* Version Dialog */}
        <Dialog
          open={versionDialogOpen}
          onClose={() => setVersionDialogOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>版本管理</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              {[
                { version: 'v2.1.0', status: 'current', date: '2024-10-10', author: '张三' },
                { version: 'v2.0.0', status: 'history', date: '2024-09-20', author: '张三' },
                { version: 'v1.5.0', status: 'history', date: '2024-08-15', author: '李四' },
              ].map((v) => (
                <Card key={v.version} variant="outlined">
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ p: 2 }}
                  >
                    <Stack spacing={0.5}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="subtitle2">{v.version}</Typography>
                        {v.status === 'current' && (
                          <Chip label="当前版本" size="small" color="primary" />
                        )}
                      </Stack>
                      <Typography variant="caption" color="text.secondary">
                        {v.date} · {v.author}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <Button size="small" variant="outlined">
                        查看
                      </Button>
                      {v.status !== 'current' && (
                        <Button size="small" variant="outlined" color="warning">
                          回退
                        </Button>
                      )}
                    </Stack>
                  </Stack>
                </Card>
              ))}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setVersionDialogOpen(false)}>关闭</Button>
          </DialogActions>
        </Dialog>
      </DashboardContent>
    </>
  );
}

