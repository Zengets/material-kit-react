import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Box,
  Paper,
  Collapse,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type OrgType = 'company' | 'department' | 'team';

type Organization = {
  orgId: string;
  orgName: string;
  parentId: string | null;
  type: OrgType;
  region?: string;
  manager?: string;
  contact?: string;
  phone?: string;
  children?: Organization[];
};

const mockOrganizations: Organization[] = [
  {
    orgId: 'ORG001',
    orgName: '总公司',
    parentId: null,
    type: 'company',
    region: '北京',
    manager: '张三',
    contact: '张三',
    phone: '010-12345678',
    children: [
      {
        orgId: 'ORG002',
        orgName: '技术部',
        parentId: 'ORG001',
        type: 'department',
        region: '北京',
        manager: '李四',
        contact: '李四',
        phone: '010-12345679',
        children: [
          {
            orgId: 'ORG005',
            orgName: '前端组',
            parentId: 'ORG002',
            type: 'team',
            manager: '王五',
            contact: '王五',
            phone: '010-12345681',
          },
          {
            orgId: 'ORG006',
            orgName: '后端组',
            parentId: 'ORG002',
            type: 'team',
            manager: '赵六',
            contact: '赵六',
            phone: '010-12345682',
          },
        ],
      },
      {
        orgId: 'ORG003',
        orgName: '市场部',
        parentId: 'ORG001',
        type: 'department',
        region: '上海',
        manager: '孙七',
        contact: '孙七',
        phone: '021-12345678',
      },
      {
        orgId: 'ORG004',
        orgName: '财务部',
        parentId: 'ORG001',
        type: 'department',
        region: '北京',
        manager: '周八',
        contact: '周八',
        phone: '010-12345680',
      },
    ],
  },
];

// ----------------------------------------------------------------------

export default function OrgPage() {
  const [organizations, setOrganizations] = useState<Organization[]>(mockOrganizations);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [expandedNodes, setExpandedNodes] = useState<string[]>(['ORG001', 'ORG002']);

  const handleAddOrg = (parentOrg?: Organization) => {
    setDialogMode('add');
    setSelectedOrg({
      orgId: '',
      orgName: '',
      parentId: parentOrg?.orgId || null,
      type: 'department',
      region: '',
      manager: '',
      contact: '',
      phone: '',
    });
    setOpenDialog(true);
  };

  const handleEditOrg = (org: Organization) => {
    setDialogMode('edit');
    setSelectedOrg(org);
    setOpenDialog(true);
  };

  const handleDeleteOrg = (orgId: string) => {
    const deleteFromTree = (orgs: Organization[]): Organization[] =>
      orgs
        .filter((org) => org.orgId !== orgId)
        .map((org) => ({
          ...org,
          children: org.children ? deleteFromTree(org.children) : undefined,
        }));

    setOrganizations(deleteFromTree(organizations));
  };

  const handleSaveOrg = () => {
    if (dialogMode === 'add' && selectedOrg) {
      const newOrg = { ...selectedOrg, orgId: `ORG${String(Date.now()).slice(-3)}` };
      // 简化版：直接添加到根节点
      setOrganizations([...organizations, newOrg]);
    } else if (dialogMode === 'edit' && selectedOrg) {
      const updateTree = (orgs: Organization[]): Organization[] =>
        orgs.map((org) =>
          org.orgId === selectedOrg.orgId
            ? selectedOrg
            : {
                ...org,
                children: org.children ? updateTree(org.children) : undefined,
              }
        );
      setOrganizations(updateTree(organizations));
    }
    setOpenDialog(false);
  };

  const toggleNode = (nodeId: string) => {
    setExpandedNodes((prev) =>
      prev.includes(nodeId) ? prev.filter((id) => id !== nodeId) : [...prev, nodeId]
    );
  };

  const getOrgTypeLabel = (type: OrgType) => {
    const typeMap = {
      company: { label: '公司', color: 'primary' as const },
      department: { label: '部门', color: 'info' as const },
      team: { label: '团队', color: 'success' as const },
    };
    return typeMap[type];
  };

  const renderOrgNode = (org: Organization, level: number = 0): React.ReactNode => {
    const isExpanded = expandedNodes.includes(org.orgId);
    const hasChildren = org.children && org.children.length > 0;
    const typeInfo = getOrgTypeLabel(org.type);

    return (
      <Box key={org.orgId} sx={{ ml: level * 4 }}>
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            mb: 1,
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" spacing={2} alignItems="center" flex={1}>
              {/* 展开/收起按钮 */}
              {hasChildren ? (
                <IconButton size="small" onClick={() => toggleNode(org.orgId)}>
                  <Iconify
                    icon={
                      isExpanded ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'
                    }
                    width={20}
                  />
                </IconButton>
              ) : (
                <Box sx={{ width: 32 }} />
              )}

              {/* 机构图标 */}
              <Iconify
                icon={
                  org.type === 'company'
                    ? 'solar:buildings-2-bold'
                    : org.type === 'department'
                      ? 'solar:buildings-bold'
                      : 'solar:users-group-rounded-bold'
                }
                width={24}
                sx={{ color: 'primary.main' }}
              />

              {/* 机构信息 */}
              <Stack spacing={0.5} flex={1}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="subtitle1" fontWeight={600}>
                    {org.orgName}
                  </Typography>
                  <Chip label={typeInfo.label} size="small" color={typeInfo.color} />
                </Stack>
                <Stack direction="row" spacing={2} flexWrap="wrap">
                  {org.region && (
                    <Typography variant="caption" color="text.secondary">
                      <Iconify
                        icon="solar:map-point-bold"
                        width={14}
                        sx={{ mr: 0.5, verticalAlign: 'text-bottom' }}
                      />
                      {org.region}
                    </Typography>
                  )}
                  {org.manager && (
                    <Typography variant="caption" color="text.secondary">
                      <Iconify
                        icon="solar:user-bold"
                        width={14}
                        sx={{ mr: 0.5, verticalAlign: 'text-bottom' }}
                      />
                      负责人: {org.manager}
                    </Typography>
                  )}
                  {org.phone && (
                    <Typography variant="caption" color="text.secondary">
                      <Iconify
                        icon="solar:phone-bold"
                        width={14}
                        sx={{ mr: 0.5, verticalAlign: 'text-bottom' }}
                      />
                      {org.phone}
                    </Typography>
                  )}
                </Stack>
              </Stack>
            </Stack>

            {/* 操作按钮 */}
            <Stack direction="row" spacing={1}>
              <Button
                size="small"
                startIcon={<Iconify icon="mingcute:add-line" width={16} />}
                onClick={() => handleAddOrg(org)}
              >
                添加子机构
              </Button>
              <IconButton size="small" onClick={() => handleEditOrg(org)} color="primary">
                <Iconify icon="solar:pen-bold" width={18} />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => handleDeleteOrg(org.orgId)}
                color="error"
                disabled={hasChildren}
              >
                <Iconify icon="solar:trash-bin-trash-bold" width={18} />
              </IconButton>
            </Stack>
          </Stack>
        </Paper>

        {/* 子机构 */}
        {hasChildren && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <Box sx={{ mt: 1 }}>
              {org.children!.map((child) => renderOrgNode(child, level + 1))}
            </Box>
          </Collapse>
        )}
      </Box>
    );
  };

  return (
    <>
      <Helmet>
        <title>机构管理 - 系统设置</title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">机构/部门管理</Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={() => handleAddOrg()}
          >
            新增机构
          </Button>
        </Stack>

        <Card sx={{ p: 3 }}>
          <Stack spacing={2}>
            {organizations.length > 0 ? (
              organizations.map((org) => renderOrgNode(org))
            ) : (
              <Box sx={{ py: 8, textAlign: 'center' }}>
                <Iconify
                  icon="solar:buildings-2-bold-duotone"
                  width={80}
                  sx={{ color: 'text.disabled', mb: 2 }}
                />
                <Typography variant="body1" color="text.secondary">
                  暂无机构数据，点击右上角&ldquo;新增机构&rdquo;按钮添加
                </Typography>
              </Box>
            )}
          </Stack>
        </Card>

        {/* 新增/编辑机构对话框 */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>{dialogMode === 'add' ? '新增机构' : '编辑机构'}</DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 2 }}>
              <TextField
                label="机构名称"
                value={selectedOrg?.orgName || ''}
                onChange={(e) => setSelectedOrg({ ...selectedOrg!, orgName: e.target.value })}
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel>机构类型</InputLabel>
                <Select
                  value={selectedOrg?.type || 'department'}
                  label="机构类型"
                  onChange={(e) =>
                    setSelectedOrg({ ...selectedOrg!, type: e.target.value as OrgType })
                  }
                >
                  <MenuItem value="company">公司</MenuItem>
                  <MenuItem value="department">部门</MenuItem>
                  <MenuItem value="team">团队</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="地区"
                value={selectedOrg?.region || ''}
                onChange={(e) => setSelectedOrg({ ...selectedOrg!, region: e.target.value })}
                fullWidth
              />
              <TextField
                label="负责人"
                value={selectedOrg?.manager || ''}
                onChange={(e) => setSelectedOrg({ ...selectedOrg!, manager: e.target.value })}
                fullWidth
              />
              <TextField
                label="联系人"
                value={selectedOrg?.contact || ''}
                onChange={(e) => setSelectedOrg({ ...selectedOrg!, contact: e.target.value })}
                fullWidth
              />
              <TextField
                label="联系电话"
                value={selectedOrg?.phone || ''}
                onChange={(e) => setSelectedOrg({ ...selectedOrg!, phone: e.target.value })}
                fullWidth
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>取消</Button>
            <Button variant="contained" onClick={handleSaveOrg}>
              保存
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}

