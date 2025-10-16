import { useRef, useState, useCallback } from 'react';
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
  Chip,
  List,
  Paper,
  Dialog,
  Select,
  Switch,
  ListItem,
  MenuItem,
  InputLabel,
  DialogTitle,
  FormControl,
  ListItemText,
  DialogContent,
  DialogActions,
  FormControlLabel,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

type WorkflowNode = {
  id: string;
  type: 'start' | 'approval' | 'notify' | 'condition' | 'subprocess' | 'end';
  label: string;
  config?: any;
  position: { x: number; y: number };
};

type WorkflowConnection = {
  from: string;
  to: string;
  condition?: string;
};

type WorkflowTemplate = {
  id: string;
  name: string;
  version: string;
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
};

// ----------------------------------------------------------------------

const nodeTypes = [
  { type: 'start', label: '开始', icon: 'solar:play-circle-bold', color: 'success' },
  { type: 'approval', label: '审批节点', icon: 'solar:user-check-bold', color: 'primary' },
  { type: 'notify', label: '通知节点', icon: 'solar:bell-bold', color: 'warning' },
  { type: 'condition', label: '条件分支', icon: 'solar:route-bold', color: 'info' },
  { type: 'subprocess', label: '子流程', icon: 'solar:widget-3-bold', color: 'secondary' },
  { type: 'end', label: '结束', icon: 'solar:check-circle-bold', color: 'error' },
];

const mockVersions = [
  { version: 'v1.2.0', status: 'published', date: '2024-10-10', author: '张三' },
  { version: 'v1.1.0', status: 'draft', date: '2024-10-08', author: '李四' },
  { version: 'v1.0.0', status: 'archived', date: '2024-09-20', author: '王五' },
];

// ----------------------------------------------------------------------

export default function WorkflowDesignerPage() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [workflowName, setWorkflowName] = useState('项目审批流程');
  const [nodes, setNodes] = useState<WorkflowNode[]>([
    { id: 'start-1', type: 'start', label: '流程开始', position: { x: 100, y: 100 } },
    { id: 'approval-1', type: 'approval', label: '部门经理审批', position: { x: 100, y: 250 } },
    { id: 'end-1', type: 'end', label: '流程结束', position: { x: 100, y: 400 } },
  ]);
  const [connections, setConnections] = useState<WorkflowConnection[]>([
    { from: 'start-1', to: 'approval-1' },
    { from: 'approval-1', to: 'end-1' },
  ]);
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);
  const [propertyDrawerOpen, setPropertyDrawerOpen] = useState(false);
  const [versionDialogOpen, setVersionDialogOpen] = useState(false);
  const [testDialogOpen, setTestDialogOpen] = useState(false);
  const [formBindingDialogOpen, setFormBindingDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleAddNode = useCallback((type: string) => {
    const newNode: WorkflowNode = {
      id: `${type}-${Date.now()}`,
      type: type as any,
      label: nodeTypes.find((n) => n.type === type)?.label || '新节点',
      position: { x: 300, y: 200 + nodes.length * 50 },
    };
    setNodes([...nodes, newNode]);
  }, [nodes]);

  const handleNodeClick = useCallback((node: WorkflowNode) => {
    setSelectedNode(node);
    setPropertyDrawerOpen(true);
  }, []);

  const handleSaveWorkflow = () => {
    console.log('保存流程', { name: workflowName, nodes, connections });
    // 实际保存逻辑
  };

  const handlePublishWorkflow = () => {
    console.log('发布流程');
    // 发布逻辑
  };

  const handleTestWorkflow = () => {
    setTestDialogOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>流程设计器 - 工作流与数据</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        {/* Header */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
          <Stack spacing={1}>
            <Typography variant="h4">流程设计器</Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <TextField
                value={workflowName}
                onChange={(e) => setWorkflowName(e.target.value)}
                size="small"
                sx={{ width: 300 }}
              />
              <Chip label="草稿" color="warning" size="small" />
            </Stack>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<Iconify icon="solar:history-bold" />}
              onClick={() => setVersionDialogOpen(true)}
            >
              版本管理
            </Button>
            <Button
              variant="outlined"
              startIcon={<Iconify icon="solar:link-bold" />}
              onClick={() => setFormBindingDialogOpen(true)}
            >
              表单绑定
            </Button>
            <Button
              variant="outlined"
              startIcon={<Iconify icon="solar:play-bold" />}
              onClick={handleTestWorkflow}
            >
              测试流程
            </Button>
            <Button variant="outlined" onClick={handleSaveWorkflow}>
              保存
            </Button>
            <Button
              variant="contained"
              startIcon={<Iconify icon="solar:upload-bold" />}
              onClick={handlePublishWorkflow}
            >
              发布
            </Button>
          </Stack>
        </Stack>

        <Grid container spacing={3}>
          {/* Node Library */}
          <Grid size={{ xs: 12, md: 2.5 }}>
            <Card sx={{ height: 'calc(100vh - 250px)' }}>
              <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  节点库
                </Typography>
              </Box>
              <Scrollbar>
                <List sx={{ p: 2 }}>
                  {nodeTypes.map((nodeType) => (
                    <ListItem key={nodeType.type} disablePadding sx={{ mb: 1 }}>
                      <Paper
                        sx={{
                          width: '100%',
                          p: 1.5,
                          cursor: 'grab',
                          transition: 'all 0.2s',
                          '&:hover': {
                            bgcolor: 'action.hover',
                            transform: 'translateY(-2px)',
                            boxShadow: (theme) => theme.shadows[4],
                          },
                        }}
                        onClick={() => handleAddNode(nodeType.type)}
                      >
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <Box
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: 1,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            bgcolor: (theme) => {
                              const palette = theme.palette as any;
                              return palette[nodeType.color]?.lighter;
                            },
                            color: (theme) => {
                              const palette = theme.palette as any;
                              return palette[nodeType.color]?.main;
                            },
                            }}
                          >
                            <Iconify icon={nodeType.icon} width={20} />
                          </Box>
                          <Typography variant="body2" fontWeight="medium">
                            {nodeType.label}
                          </Typography>
                        </Stack>
                      </Paper>
                    </ListItem>
                  ))}
                </List>
              </Scrollbar>
            </Card>
          </Grid>

          {/* Canvas */}
          <Grid size={{ xs: 12, md: 6.5 }}>
            <Card sx={{ height: 'calc(100vh - 250px)' }}>
              <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="subtitle1" fontWeight="bold">
                    设计画布
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <IconButton size="small">
                      <Iconify icon="solar:undo-left-bold" />
                    </IconButton>
                    <IconButton size="small">
                      <Iconify icon="solar:undo-right-bold" />
                    </IconButton>
                    <Divider orientation="vertical" flexItem />
                    <IconButton size="small">
                      <Iconify icon="solar:add-circle-bold" />
                    </IconButton>
                    <IconButton size="small">
                      <Iconify icon="solar:minus-circle-bold" />
                    </IconButton>
                    <IconButton size="small">
                      <Iconify icon="solar:refresh-bold" />
                    </IconButton>
                  </Stack>
                </Stack>
              </Box>
              <Box
                ref={canvasRef}
                sx={(theme) => ({
                  height: 'calc(100% - 60px)',
                  bgcolor: theme.palette.grey[50],
                  backgroundImage: `radial-gradient(circle, ${theme.palette.grey[300]} 1px, transparent 1px)`,
                  backgroundSize: '20px 20px',
                  position: 'relative',
                  overflow: 'auto',
                })}
              >
                {/* Render Nodes */}
                {nodes.map((node) => {
                  const nodeConfig = nodeTypes.find((n) => n.type === node.type);
                  return (
                    <Paper
                      key={node.id}
                      onClick={() => handleNodeClick(node)}
                      sx={{
                        position: 'absolute',
                        left: node.position.x,
                        top: node.position.y,
                        p: 2,
                        minWidth: 150,
                        cursor: 'pointer',
                        border: selectedNode?.id === node.id ? 2 : 1,
                        borderColor: selectedNode?.id === node.id ? 'primary.main' : 'divider',
                        transition: 'all 0.2s',
                        '&:hover': {
                          boxShadow: (theme) => theme.shadows[8],
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      <Stack spacing={1} alignItems="center">
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: (theme) => {
                              const palette = theme.palette as any;
                              return nodeConfig ? palette[nodeConfig.color]?.lighter : undefined;
                            },
                            color: (theme) => {
                              const palette = theme.palette as any;
                              return nodeConfig ? palette[nodeConfig.color]?.main : undefined;
                            },
                          }}
                        >
                          <Iconify icon={nodeConfig?.icon || ''} width={24} />
                        </Box>
                        <Typography variant="body2" fontWeight="medium" textAlign="center">
                          {node.label}
                        </Typography>
                      </Stack>
                    </Paper>
                  );
                })}
              </Box>
            </Card>
          </Grid>

          {/* Property Panel */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Card sx={{ height: 'calc(100vh - 250px)' }}>
              <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  属性面板
                </Typography>
              </Box>
              <Scrollbar>
                <Box sx={{ p: 2 }}>
                  {selectedNode ? (
                    <Stack spacing={2.5}>
                      <TextField
                        fullWidth
                        label="节点名称"
                        value={selectedNode.label}
                        size="small"
                      />

                      {selectedNode.type === 'approval' && (
                        <>
                          <FormControl fullWidth size="small">
                            <InputLabel>审批人</InputLabel>
                            <Select label="审批人" defaultValue="manager">
                              <MenuItem value="manager">部门经理</MenuItem>
                              <MenuItem value="director">总监</MenuItem>
                              <MenuItem value="ceo">CEO</MenuItem>
                            </Select>
                          </FormControl>

                          <FormControl fullWidth size="small">
                            <InputLabel>审批类型</InputLabel>
                            <Select label="审批类型" defaultValue="or">
                              <MenuItem value="or">或签（一人通过即可）</MenuItem>
                              <MenuItem value="and">会签（全员通过）</MenuItem>
                              <MenuItem value="sequential">依次审批</MenuItem>
                            </Select>
                          </FormControl>

                          <TextField
                            fullWidth
                            label="超时时间（小时）"
                            type="number"
                            size="small"
                            defaultValue={24}
                          />

                          <FormControlLabel
                            control={<Switch defaultChecked />}
                            label="允许转办"
                          />
                        </>
                      )}

                      {selectedNode.type === 'notify' && (
                        <>
                          <FormControl fullWidth size="small">
                            <InputLabel>通知方式</InputLabel>
                            <Select label="通知方式" defaultValue="email" multiple>
                              <MenuItem value="email">邮件</MenuItem>
                              <MenuItem value="sms">短信</MenuItem>
                              <MenuItem value="wechat">企业微信</MenuItem>
                              <MenuItem value="system">站内消息</MenuItem>
                            </Select>
                          </FormControl>

                          <TextField
                            fullWidth
                            label="通知对象"
                            size="small"
                            placeholder="选择用户或角色"
                          />

                          <TextField
                            fullWidth
                            label="消息模板"
                            multiline
                            rows={3}
                            size="small"
                            placeholder="使用 ${变量名} 引用流程变量"
                          />
                        </>
                      )}

                      {selectedNode.type === 'condition' && (
                        <>
                          <Typography variant="caption" color="text.secondary">
                            条件分支配置
                          </Typography>
                          <TextField
                            fullWidth
                            label="条件1"
                            size="small"
                            placeholder="例：金额 > 10000"
                          />
                          <TextField
                            fullWidth
                            label="条件2"
                            size="small"
                            placeholder="例：部门 = '研发部'"
                          />
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<Iconify icon="solar:add-circle-bold" />}
                          >
                            添加条件
                          </Button>
                        </>
                      )}

                      <Divider />

                      <Stack direction="row" spacing={1}>
                        <Button
                          variant="contained"
                          size="small"
                          fullWidth
                          onClick={() => setPropertyDrawerOpen(false)}
                        >
                          保存
                        </Button>
                        <Button variant="outlined" size="small" fullWidth color="error">
                          删除节点
                        </Button>
                      </Stack>
                    </Stack>
                  ) : (
                    <Box
                      sx={{
                        py: 8,
                        textAlign: 'center',
                        color: 'text.secondary',
                      }}
                    >
                      <Iconify icon="solar:mouse-minimalistic-bold" width={48} sx={{ mb: 2, opacity: 0.3 }} />
                      <Typography variant="body2">
                        点击画布中的节点<br />配置节点属性
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Scrollbar>
            </Card>
          </Grid>
        </Grid>

        {/* Version Management Dialog */}
        <Dialog open={versionDialogOpen} onClose={() => setVersionDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>流程版本管理</DialogTitle>
          <DialogContent>
            <List>
              {mockVersions.map((version) => (
                <ListItem
                  key={version.version}
                  secondaryAction={
                    <Stack direction="row" spacing={1}>
                      <Button size="small" variant="outlined">
                        查看
                      </Button>
                      <Button size="small" variant="outlined">
                        回退
                      </Button>
                    </Stack>
                  }
                >
                  <ListItemText
                    primary={
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="subtitle2">{version.version}</Typography>
                        <Chip
                          label={version.status === 'published' ? '已发布' : version.status === 'draft' ? '草稿' : '已归档'}
                          size="small"
                          color={version.status === 'published' ? 'success' : version.status === 'draft' ? 'warning' : 'default'}
                        />
                      </Stack>
                    }
                    secondary={`${version.date} · ${version.author}`}
                  />
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setVersionDialogOpen(false)}>关闭</Button>
          </DialogActions>
        </Dialog>

        {/* Test Dialog */}
        <Dialog open={testDialogOpen} onClose={() => setTestDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>测试流程</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                fullWidth
                label="测试场景"
                select
                size="small"
                defaultValue="normal"
              >
                <MenuItem value="normal">正常审批</MenuItem>
                <MenuItem value="reject">驳回场景</MenuItem>
                <MenuItem value="timeout">超时场景</MenuItem>
              </TextField>
              <TextField
                fullWidth
                label="模拟参数"
                multiline
                rows={4}
                size="small"
                placeholder='{"amount": 15000, "department": "研发部"}'
              />
              <Box
                sx={{
                  p: 2,
                  borderRadius: 1,
                  bgcolor: 'success.lighter',
                  color: 'success.darker',
                }}
              >
                <Typography variant="caption" fontWeight="bold">
                  ✓ 流程验证通过
                </Typography>
                <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                  预计执行路径：开始 → 部门经理审批 → 结束
                </Typography>
              </Box>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setTestDialogOpen(false)}>取消</Button>
            <Button variant="contained">开始测试</Button>
          </DialogActions>
        </Dialog>

        {/* Form Binding Dialog */}
        <Dialog open={formBindingDialogOpen} onClose={() => setFormBindingDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>表单字段绑定</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <FormControl fullWidth size="small">
                <InputLabel>选择表单</InputLabel>
                <Select label="选择表单" defaultValue="project">
                  <MenuItem value="project">项目申报表单</MenuItem>
                  <MenuItem value="expense">费用报销表单</MenuItem>
                  <MenuItem value="leave">请假申请表单</MenuItem>
                </Select>
              </FormControl>

              <Typography variant="subtitle2" sx={{ mt: 2 }}>
                字段映射
              </Typography>
              <Box sx={{ p: 2, bgcolor: 'background.neutral', borderRadius: 1 }}>
                <Stack spacing={1.5}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="caption">表单字段：项目金额</Typography>
                    <Iconify icon="solar:arrow-right-bold" />
                    <Typography variant="caption">流程变量：amount</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="caption">表单字段：申报部门</Typography>
                    <Iconify icon="solar:arrow-right-bold" />
                    <Typography variant="caption">流程变量：department</Typography>
                  </Stack>
                </Stack>
              </Box>
              <Button variant="outlined" size="small" startIcon={<Iconify icon="solar:add-circle-bold" />}>
                添加字段映射
              </Button>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setFormBindingDialogOpen(false)}>取消</Button>
            <Button variant="contained">保存绑定</Button>
          </DialogActions>
        </Dialog>
      </DashboardContent>
    </>
  );
}

