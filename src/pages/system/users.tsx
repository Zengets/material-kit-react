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
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  IconButton,
  Tooltip,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type UserStatus = 'active' | 'inactive';

type User = {
  userId: string;
  username: string;
  name: string;
  mobile: string;
  email: string;
  roles: string[];
  orgId: string;
  orgName: string;
  status: UserStatus;
  lastLogin: string;
};

const mockUsers: User[] = [
  {
    userId: 'U001',
    username: 'admin',
    name: '系统管理员',
    mobile: '13800138000',
    email: 'admin@example.com',
    roles: ['管理员', '审批员'],
    orgId: 'ORG001',
    orgName: '技术部',
    status: 'active',
    lastLogin: '2025-10-13 10:30:00',
  },
  {
    userId: 'U002',
    username: 'zhangsan',
    name: '张三',
    mobile: '13800138001',
    email: 'zhangsan@example.com',
    roles: ['普通用户'],
    orgId: 'ORG002',
    orgName: '市场部',
    status: 'active',
    lastLogin: '2025-10-12 15:20:00',
  },
  {
    userId: 'U003',
    username: 'lisi',
    name: '李四',
    mobile: '13800138002',
    email: 'lisi@example.com',
    roles: ['普通用户', '审批员'],
    orgId: 'ORG001',
    orgName: '技术部',
    status: 'inactive',
    lastLogin: '2025-10-10 09:00:00',
  },
];

const mockRoles = ['管理员', '审批员', '普通用户', '财务', '人事'];
const mockOrgs = [
  { id: 'ORG001', name: '技术部' },
  { id: 'ORG002', name: '市场部' },
  { id: 'ORG003', name: '财务部' },
  { id: 'ORG004', name: '人事部' },
];

// ----------------------------------------------------------------------

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [actionMenuUser, setActionMenuUser] = useState<User | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, user: User) => {
    setAnchorEl(event.currentTarget);
    setActionMenuUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActionMenuUser(null);
  };

  const handleAddUser = () => {
    setDialogMode('add');
    setSelectedUser({
      userId: '',
      username: '',
      name: '',
      mobile: '',
      email: '',
      roles: [],
      orgId: '',
      orgName: '',
      status: 'active',
      lastLogin: '',
    });
    setOpenDialog(true);
  };

  const handleEditUser = (user: User) => {
    setDialogMode('edit');
    setSelectedUser(user);
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleToggleStatus = (user: User) => {
    setUsers(
      users.map((u) =>
        u.userId === user.userId ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u
      )
    );
    handleMenuClose();
  };

  const handleDeleteUser = (user: User) => {
    setUsers(users.filter((u) => u.userId !== user.userId));
    handleMenuClose();
  };

  const handleSaveUser = () => {
    if (dialogMode === 'add' && selectedUser) {
      setUsers([...users, { ...selectedUser, userId: `U${String(users.length + 1).padStart(3, '0')}` }]);
    } else if (dialogMode === 'edit' && selectedUser) {
      setUsers(users.map((u) => (u.userId === selectedUser.userId ? selectedUser : u)));
    }
    setOpenDialog(false);
  };

  const handleExport = () => {
    console.log('导出用户数据');
    // 实际项目中这里会导出 CSV/XLS 文件
  };

  const handleImport = () => {
    console.log('批量导入用户');
    // 实际项目中这里会打开文件选择器
  };

  return (
    <>
      <Helmet>
        <title>用户管理 - 系统设置</title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">用户管理</Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<Iconify icon="solar:import-bold" />}
              onClick={handleImport}
            >
              批量导入
            </Button>
            <Button
              variant="outlined"
              startIcon={<Iconify icon="solar:export-bold" />}
              onClick={handleExport}
            >
              导出数据
            </Button>
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={handleAddUser}
            >
              新增用户
            </Button>
          </Stack>
        </Stack>

        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>用户ID</TableCell>
                  <TableCell>用户名</TableCell>
                  <TableCell>姓名</TableCell>
                  <TableCell>手机号</TableCell>
                  <TableCell>邮箱</TableCell>
                  <TableCell>角色</TableCell>
                  <TableCell>所属机构</TableCell>
                  <TableCell>状态</TableCell>
                  <TableCell>最后登录</TableCell>
                  <TableCell align="right">操作</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.userId} hover>
                    <TableCell>{user.userId}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.mobile}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={0.5} flexWrap="wrap">
                        {user.roles.map((role) => (
                          <Chip key={role} label={role} size="small" variant="outlined" />
                        ))}
                      </Stack>
                    </TableCell>
                    <TableCell>{user.orgName}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.status === 'active' ? '激活' : '禁用'}
                        color={user.status === 'active' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={(e) => handleMenuOpen(e, user)}>
                        <Iconify icon="eva:more-vertical-fill" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        {/* 操作菜单 */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={() => actionMenuUser && handleEditUser(actionMenuUser)}>
            <Iconify icon="solar:pen-bold" sx={{ mr: 1 }} />
            编辑
          </MenuItem>
          <MenuItem onClick={() => actionMenuUser && handleToggleStatus(actionMenuUser)}>
            <Iconify
              icon={actionMenuUser?.status === 'active' ? 'solar:lock-bold' : 'solar:unlock-bold'}
              sx={{ mr: 1 }}
            />
            {actionMenuUser?.status === 'active' ? '禁用' : '激活'}
          </MenuItem>
          <MenuItem>
            <Iconify icon="solar:user-check-bold" sx={{ mr: 1 }} />
            分配角色
          </MenuItem>
          <MenuItem>
            <Iconify icon="solar:buildings-bold" sx={{ mr: 1 }} />
            分配机构
          </MenuItem>
          <MenuItem>
            <Iconify icon="solar:login-3-bold" sx={{ mr: 1 }} />
            模拟登录
          </MenuItem>
          <MenuItem onClick={() => actionMenuUser && handleDeleteUser(actionMenuUser)} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" sx={{ mr: 1 }} />
            删除
          </MenuItem>
        </Menu>

        {/* 新增/编辑用户对话框 */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>{dialogMode === 'add' ? '新增用户' : '编辑用户'}</DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 2 }}>
              <TextField
                label="用户名"
                value={selectedUser?.username || ''}
                onChange={(e) => setSelectedUser({ ...selectedUser!, username: e.target.value })}
                fullWidth
              />
              <TextField
                label="姓名"
                value={selectedUser?.name || ''}
                onChange={(e) => setSelectedUser({ ...selectedUser!, name: e.target.value })}
                fullWidth
              />
              <TextField
                label="手机号"
                value={selectedUser?.mobile || ''}
                onChange={(e) => setSelectedUser({ ...selectedUser!, mobile: e.target.value })}
                fullWidth
              />
              <TextField
                label="邮箱"
                value={selectedUser?.email || ''}
                onChange={(e) => setSelectedUser({ ...selectedUser!, email: e.target.value })}
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel>所属机构</InputLabel>
                <Select
                  value={selectedUser?.orgId || ''}
                  label="所属机构"
                  onChange={(e) => {
                    const org = mockOrgs.find((o) => o.id === e.target.value);
                    setSelectedUser({
                      ...selectedUser!,
                      orgId: e.target.value,
                      orgName: org?.name || '',
                    });
                  }}
                >
                  {mockOrgs.map((org) => (
                    <MenuItem key={org.id} value={org.id}>
                      {org.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>角色</InputLabel>
                <Select
                  multiple
                  value={selectedUser?.roles || []}
                  label="角色"
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser!,
                      roles: typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value,
                    })
                  }
                >
                  {mockRoles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControlLabel
                control={
                  <Switch
                    checked={selectedUser?.status === 'active'}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser!,
                        status: e.target.checked ? 'active' : 'inactive',
                      })
                    }
                  />
                }
                label="账号激活"
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>取消</Button>
            <Button variant="contained" onClick={handleSaveUser}>
              保存
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}

