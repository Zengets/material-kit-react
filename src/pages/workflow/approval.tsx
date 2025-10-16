import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import {
  Chip,
  Alert,
  Dialog,
  Tooltip,
  AlertTitle,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Timeline,
  TimelineDot,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineConnector,
  TimelineOppositeContent,
} from '@mui/lab';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

type ApprovalNode = {
  id: string;
  nodeName: string;
  nodeType: 'approval' | 'notify' | 'condition';
  status: 'pending' | 'approved' | 'rejected' | 'transferred' | 'completed';
  approver: string;
  approverAvatar?: string;
  action?: string;
  comment?: string;
  timestamp?: string;
  duration?: string;
};

type ApprovalInstance = {
  instanceId: string;
  workflowName: string;
  applicant: string;
  applicantAvatar?: string;
  status: 'running' | 'approved' | 'rejected' | 'cancelled';
  startTime: string;
  currentNode: string;
  nodes: ApprovalNode[];
  formData: any;
};

const mockInstance: ApprovalInstance = {
  instanceId: 'INST-2024-001',
  workflowName: '项目申报审批流程',
  applicant: '张三',
  applicantAvatar: '/avatar-1.jpg',
  status: 'running',
  startTime: '2024-10-13 09:30',
  currentNode: '财务审核',
  nodes: [
    {
      id: 'node-1',
      nodeName: '部门经理审批',
      nodeType: 'approval',
      status: 'approved',
      approver: '李四',
      approverAvatar: '/avatar-2.jpg',
      action: '同意',
      comment: '项目方案详实，同意申报',
      timestamp: '2024-10-13 10:15',
      duration: '45分钟',
    },
    {
      id: 'node-2',
      nodeName: '财务审核',
      nodeType: 'approval',
      status: 'pending',
      approver: '王五',
      approverAvatar: '/avatar-3.jpg',
    },
    {
      id: 'node-3',
      nodeName: '总监审批',
      nodeType: 'approval',
      status: 'pending',
      approver: '赵六',
    },
    {
      id: 'node-4',
      nodeName: '邮件通知',
      nodeType: 'notify',
      status: 'pending',
      approver: '系统',
    },
  ],
  formData: {
    projectName: '智能化实验室建设项目',
    amount: 150000,
    department: '研发部',
    duration: '12个月',
  },
};

// ----------------------------------------------------------------------

export default function WorkflowApprovalPage() {
  const [instance, setInstance] = useState<ApprovalInstance>(mockInstance);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [transferDialogOpen, setTransferDialogOpen] = useState(false);
  const [urgeDialogOpen, setUrgeDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedNode, setSelectedNode] = useState<ApprovalNode | null>(null);
  const [comment, setComment] = useState('');

  const handleApprove = useCallback(() => {
    setCommentDialogOpen(true);
  }, []);

  const handleReject = useCallback(() => {
    setCommentDialogOpen(true);
  }, []);

  const handleTransfer = useCallback(() => {
    setTransferDialogOpen(true);
  }, []);

  const handleUrge = useCallback(() => {
    setUrgeDialogOpen(true);
  }, []);

  const handleRevoke = useCallback(() => {
    console.log('撤回流程');
  }, []);

  const getNodeIcon = (nodeType: string, status: string) => {
    if (status === 'approved') return 'solar:check-circle-bold';
    if (status === 'rejected') return 'solar:close-circle-bold';
    if (nodeType === 'approval') return 'solar:user-check-bold';
    if (nodeType === 'notify') return 'solar:bell-bold';
    return 'solar:widget-bold';
  };

  const getNodeColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      case 'pending':
        return 'warning';
      case 'completed':
        return 'info';
      default:
        return 'default';
    }
  };

  const currentNodeIndex = instance.nodes.findIndex((n) => n.status === 'pending');

  return (
    <>
      <Helmet>
        <title>审批流程视图 - 工作流与数据</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        {/* Header */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
          <Stack spacing={1}>
            <Typography variant="h4">审批流程视图</Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body2" color="text.secondary">
                流程实例：{instance.instanceId}
              </Typography>
              <Chip
                label={instance.status === 'running' ? '进行中' : instance.status === 'approved' ? '已通过' : '已驳回'}
                size="small"
                color={instance.status === 'running' ? 'warning' : instance.status === 'approved' ? 'success' : 'error'}
              />
            </Stack>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<Iconify icon="solar:history-bold" />}
            >
              查看历史
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<Iconify icon="solar:undo-left-bold" />}
              onClick={handleRevoke}
            >
              撤回
            </Button>
          </Stack>
        </Stack>

        {/* Process Overview */}
        <Card sx={{ mb: 3, p: 3 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Stack spacing={2}>
                <Typography variant="h6">{instance.workflowName}</Typography>
                <Stack direction="row" spacing={4}>
                  <Stack spacing={0.5}>
                    <Typography variant="caption" color="text.secondary">
                      申请人
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Avatar src={instance.applicantAvatar} sx={{ width: 24, height: 24 }}>
                        {instance.applicant[0]}
                      </Avatar>
                      <Typography variant="body2">{instance.applicant}</Typography>
                    </Stack>
                  </Stack>
                  <Stack spacing={0.5}>
                    <Typography variant="caption" color="text.secondary">
                      申请时间
                    </Typography>
                    <Typography variant="body2">{instance.startTime}</Typography>
                  </Stack>
                  <Stack spacing={0.5}>
                    <Typography variant="caption" color="text.secondary">
                      当前节点
                    </Typography>
                    <Typography variant="body2" color="warning.main">
                      {instance.currentNode}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Stack spacing={2}>
                <Typography variant="caption" color="text.secondary">
                  流程进度
                </Typography>
                <Box>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <Typography variant="h6">
                      {Math.round((currentNodeIndex / instance.nodes.length) * 100)}%
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      ({currentNodeIndex}/{instance.nodes.length} 步骤)
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={(currentNodeIndex / instance.nodes.length) * 100}
                    sx={{ height: 8, borderRadius: 1 }}
                  />
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Card>

        <Grid container spacing={3}>
          {/* Timeline */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card>
              <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  审批节点状态
                </Typography>
              </Box>
              <Scrollbar sx={{ maxHeight: 'calc(100vh - 400px)' }}>
                <Box sx={{ p: 3 }}>
                  <Timeline>
                    {instance.nodes.map((node, index) => (
                      <TimelineItem key={node.id}>
                        <TimelineOppositeContent sx={{ flex: 0.3 }}>
                          <Typography variant="body2" color="text.secondary">
                            {node.timestamp || '-'}
                          </Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                          <TimelineDot color={getNodeColor(node.status) as any}>
                            <Iconify icon={getNodeIcon(node.nodeType, node.status)} width={20} />
                          </TimelineDot>
                          {index < instance.nodes.length - 1 && <TimelineConnector />}
                        </TimelineSeparator>
                        <TimelineContent>
                          <Card variant="outlined" sx={{ p: 2 }}>
                            <Stack spacing={1.5}>
                              <Stack direction="row" alignItems="center" justifyContent="space-between">
                                <Stack spacing={0.5}>
                                  <Typography variant="subtitle2">{node.nodeName}</Typography>
                                  <Stack direction="row" spacing={1} alignItems="center">
                                    <Avatar src={node.approverAvatar} sx={{ width: 20, height: 20 }}>
                                      {node.approver[0]}
                                    </Avatar>
                                    <Typography variant="caption" color="text.secondary">
                                      {node.approver}
                                    </Typography>
                                    {node.duration && (
                                      <Chip label={node.duration} size="small" variant="outlined" />
                                    )}
                                  </Stack>
                                </Stack>
                                <Stack direction="row" spacing={0.5}>
                                  {node.status === 'pending' && (
                                    <>
                                      <Tooltip title="催办">
                                        <IconButton size="small" onClick={handleUrge}>
                                          <Iconify icon="solar:bell-bold" />
                                        </IconButton>
                                      </Tooltip>
                                      <Tooltip title="转办">
                                        <IconButton size="small" onClick={handleTransfer}>
                                          <Iconify icon="solar:user-plus-bold" />
                                        </IconButton>
                                      </Tooltip>
                                    </>
                                  )}
                                  {node.status === 'approved' && (
                                    <Chip label={node.action} size="small" color="success" />
                                  )}
                                  {node.status === 'rejected' && (
                                    <Chip label={node.action} size="small" color="error" />
                                  )}
                                </Stack>
                              </Stack>
                              {node.comment && (
                                <Box
                                  sx={{
                                    p: 1.5,
                                    borderRadius: 1,
                                    bgcolor: 'background.neutral',
                                  }}
                                >
                                  <Typography variant="caption" color="text.secondary">
                                    审批意见：
                                  </Typography>
                                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                                    {node.comment}
                                  </Typography>
                                </Box>
                              )}
                            </Stack>
                          </Card>
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                  </Timeline>
                </Box>
              </Scrollbar>
            </Card>
          </Grid>

          {/* Form Data & Actions */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={3}>
              {/* Form Data */}
              <Card>
                <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    申请信息
                  </Typography>
                </Box>
                <Box sx={{ p: 2 }}>
                  <Stack spacing={2}>
                    {Object.entries(instance.formData).map(([key, value]) => (
                      <Stack key={key} spacing={0.5}>
                        <Typography variant="caption" color="text.secondary">
                          {key === 'projectName' ? '项目名称' :
                           key === 'amount' ? '申请金额' :
                           key === 'department' ? '申请部门' :
                           key === 'duration' ? '项目周期' : key}
                        </Typography>
                        <Typography variant="body2">
                          {typeof value === 'number' ? `¥${value.toLocaleString()}` : String(value)}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              </Card>

              {/* Approval Actions */}
              {instance.status === 'running' && (
                <Card>
                  <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      审批操作
                    </Typography>
                  </Box>
                  <Box sx={{ p: 2 }}>
                    <Stack spacing={2}>
                      <Alert severity="info">
                        <AlertTitle>当前审批人</AlertTitle>
                        您有权限对此流程进行审批操作
                      </Alert>
                      <Button
                        variant="contained"
                        color="success"
                        fullWidth
                        startIcon={<Iconify icon="solar:check-circle-bold" />}
                        onClick={handleApprove}
                      >
                        同意
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        startIcon={<Iconify icon="solar:close-circle-bold" />}
                        onClick={handleReject}
                      >
                        驳回
                      </Button>
                      <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<Iconify icon="solar:user-plus-bold" />}
                        onClick={handleTransfer}
                      >
                        转办
                      </Button>
                    </Stack>
                  </Box>
                </Card>
              )}

              {/* Quick Actions */}
              <Card>
                <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    其他操作
                  </Typography>
                </Box>
                <Box sx={{ p: 2 }}>
                  <Stack spacing={1}>
                    <Button
                      variant="outlined"
                      size="small"
                      fullWidth
                      startIcon={<Iconify icon="solar:eye-bold" />}
                    >
                      查看流程图
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      fullWidth
                      startIcon={<Iconify icon="solar:download-bold" />}
                    >
                      导出PDF
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      fullWidth
                      startIcon={<Iconify icon="solar:printer-bold" />}
                    >
                      打印
                    </Button>
                  </Stack>
                </Box>
              </Card>
            </Stack>
          </Grid>
        </Grid>

        {/* Comment Dialog */}
        <Dialog open={commentDialogOpen} onClose={() => setCommentDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>审批意见</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="请输入审批意见..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              sx={{ mt: 1 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCommentDialogOpen(false)}>取消</Button>
            <Button variant="contained">提交</Button>
          </DialogActions>
        </Dialog>

        {/* Transfer Dialog */}
        <Dialog open={transferDialogOpen} onClose={() => setTransferDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>转办审批</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                fullWidth
                label="转办人"
                placeholder="搜索并选择转办人"
                size="small"
              />
              <TextField
                fullWidth
                label="转办原因"
                multiline
                rows={3}
                size="small"
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setTransferDialogOpen(false)}>取消</Button>
            <Button variant="contained">确认转办</Button>
          </DialogActions>
        </Dialog>

        {/* Urge Dialog */}
        <Dialog open={urgeDialogOpen} onClose={() => setUrgeDialogOpen(false)} maxWidth="xs" fullWidth>
          <DialogTitle>催办提醒</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <Alert severity="warning">
                将向审批人发送催办消息
              </Alert>
              <TextField
                fullWidth
                label="催办备注（可选）"
                multiline
                rows={2}
                size="small"
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setUrgeDialogOpen(false)}>取消</Button>
            <Button variant="contained">发送催办</Button>
          </DialogActions>
        </Dialog>
      </DashboardContent>
    </>
  );
}

