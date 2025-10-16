import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Checkbox,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Permission = {
  id: string;
  name: string;
  type: 'route' | 'api' | 'field';
  children?: Permission[];
};

type Role = {
  roleId: string;
  roleName: string;
  description: string;
  permissions: string[];
  userCount: number;
  createdAt: string;
};

const mockPermissions: Permission[] = [
  {
    id: 'dashboard',
    name: '首页',
    type: 'route',
  },
  {
    id: 'project',
    name: '项目管理',
    type: 'route',
    children: [
      { id: 'project.list', name: '项目列表', type: 'route' },
      { id: 'project.create', name: '创建项目', type: 'api' },
      { id: 'project.edit', name: '编辑项目', type: 'api' },
      { id: 'project.delete', name: '删除项目', type: 'api' },
    ],
  },
  {
    id: 'system',
    name: '系统管理',
    type: 'route',
    children: [
      { id: 'system.users', name: '用户管理', type: 'route' },
      { id: 'system.roles', name: '角色管理', type: 'route' },
      { id: 'system.org', name: '机构管理', type: 'route' },
    ],
  },
];

const mockRoles: Role[] = [
  {
    roleId: 'R001',
    roleName: '超级管理员',
    description: '拥有系统所有权限',
    permissions: ['dashboard', 'project', 'project.list', 'project.create', 'system', 'system.users'],
    userCount: 2,
    createdAt: '2025-01-01',
  },
  {
    roleId: 'R002',
    roleName: '项目经理',
    description: '管理项目相关功能',
    permissions: ['dashboard', 'project', 'project.list'],
    userCount: 15,
    createdAt: '2025-01-15',
  },
  {
    roleId: 'R003',
    roleName: '普通用户',
    description: '基础查看权限',
    permissions: ['dashboard', 'project.list'],
    userCount: 100,
    createdAt: '2025-02-01',
  },
];

// ----------------------------------------------------------------------

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [openPermissionDialog, setOpenPermissionDialog] = useState(false);

  const handleAddRole = () => {
    setDialogMode('add');
    setSelectedRole({
      roleId: '',
      roleName: '',
      description: '',
      permissions: [],
      userCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
    });
    setOpenDialog(true);
  };

  const handleEditRole = (role: Role) => {
    setDialogMode('edit');
    setSelectedRole(role);
    setOpenDialog(true);
  };

  const handleDeleteRole = (roleId: string) => {
    setRoles(roles.filter((r) => r.roleId !== roleId));
  };

  const handleSaveRole = () => {
    if (dialogMode === 'add' && selectedRole) {
      setRoles([...roles, { ...selectedRole, roleId: `R${String(roles.length + 1).padStart(3, '0')}` }]);
    } else if (dialogMode === 'edit' && selectedRole) {
      setRoles(roles.map((r) => (r.roleId === selectedRole.roleId ? selectedRole : r)));
    }
    setOpenDialog(false);
  };

  const handleConfigurePermissions = (role: Role) => {
    setSelectedRole(role);
    setSelectedPermissions(role.permissions);
    setOpenPermissionDialog(true);
  };

  const handleSavePermissions = () => {
    if (selectedRole) {
      setRoles(
        roles.map((r) =>
          r.roleId === selectedRole.roleId ? { ...r, permissions: selectedPermissions } : r
        )
      );
    }
    setOpenPermissionDialog(false);
  };

  const renderPermissionTree = (permissions: Permission[]) =>
    permissions.map((permission) => (
      <TreeItem
        key={permission.id}
        nodeId={permission.id}
        label={
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedPermissions.includes(permission.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedPermissions([...selectedPermissions, permission.id]);
                  } else {
                    setSelectedPermissions(selectedPermissions.filter((p) => p !== permission.id));
                  }
                }}
                onClick={(e) => e.stopPropagation()}
              />
            }
            label={
              <Stack direction="row" spacing={1} alignItems="center">
                <span>{permission.name}</span>
                <Chip
                  label={permission.type === 'route' ? '路由' : permission.type === 'api' ? '接口' : '字段'}
                  size="small"
                  variant="outlined"
                />
              </Stack>
            }
          />
        }
      >
        {permission.children && renderPermissionTree(permission.children)}
      </TreeItem>
    ));

  return (
    <>
      <Helmet>
        <title>角色与权限 - 系统设置</title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">角色与权限管理</Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={handleAddRole}
          >
            新增角色
          </Button>
        </Stack>

        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>角色ID</TableCell>
                  <TableCell>角色名称</TableCell>
                  <TableCell>描述</TableCell>
                  <TableCell>权限数量</TableCell>
                  <TableCell>用户数量</TableCell>
                  <TableCell>创建时间</TableCell>
                  <TableCell align="right">操作</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.roleId} hover>
                    <TableCell>{role.roleId}</TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{role.roleName}</Typography>
                    </TableCell>
                    <TableCell>{role.description}</TableCell>
                    <TableCell>
                      <Chip label={role.permissions.length} color="primary" size="small" />
                    </TableCell>
                    <TableCell>{role.userCount}</TableCell>
                    <TableCell>{role.createdAt}</TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <IconButton size="small" onClick={() => handleEditRole(role)}>
                          <Iconify icon="solar:pen-bold" />
                        </IconButton>
                        <IconButton size="small" onClick={() => handleConfigurePermissions(role)}>
                          <Iconify icon="solar:shield-check-bold" />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteRole(role.roleId)}
                        >
                          <Iconify icon="solar:trash-bin-trash-bold" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        {/* 新增/编辑角色对话框 */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>{dialogMode === 'add' ? '新增角色' : '编辑角色'}</DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 2 }}>
              <TextField
                label="角色名称"
                value={selectedRole?.roleName || ''}
                onChange={(e) => setSelectedRole({ ...selectedRole!, roleName: e.target.value })}
                fullWidth
              />
              <TextField
                label="角色描述"
                value={selectedRole?.description || ''}
                onChange={(e) => setSelectedRole({ ...selectedRole!, description: e.target.value })}
                multiline
                rows={3}
                fullWidth
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>取消</Button>
            <Button variant="contained" onClick={handleSaveRole}>
              保存
            </Button>
          </DialogActions>
        </Dialog>

        {/* 配置权限对话框 */}
        <Dialog
          open={openPermissionDialog}
          onClose={() => setOpenPermissionDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            配置权限 - {selectedRole?.roleName}
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              选择该角色可以访问的功能权限
            </Typography>
            <TreeView
              defaultCollapseIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
              defaultExpandIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
              defaultExpanded={['project', 'system']}
            >
              {renderPermissionTree(mockPermissions)}
            </TreeView>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenPermissionDialog(false)}>取消</Button>
            <Button variant="contained" onClick={handleSavePermissions}>
              保存
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}

