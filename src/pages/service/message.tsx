import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
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
import { Chip, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

type MessageType = 'system' | 'approval' | 'booking' | 'ticket';

type Message = {
  messageId: string;
  type: MessageType;
  title: string;
  bodySnippet: string;
  sourceModule: string;
  sourceId?: string;
  createdAt: string;
  read: boolean;
};

// Mock data
const mockMessages: Message[] = [
  {
    messageId: '1',
    type: 'approval',
    title: '项目审批通知',
    bodySnippet: '您提交的"智能制造平台开发"项目已通过审批，请查看详情...',
    sourceModule: '项目管理',
    sourceId: 'proj-001',
    createdAt: '2025-10-12 10:30',
    read: false,
  },
  {
    messageId: '2',
    type: 'booking',
    title: '设备预约提醒',
    bodySnippet: '您预约的"高精度3D打印机"将在明天上午9:00开始使用...',
    sourceModule: '设备共享',
    sourceId: 'equip-023',
    createdAt: '2025-10-12 09:15',
    read: false,
  },
  {
    messageId: '3',
    type: 'system',
    title: '系统维护通知',
    bodySnippet: '系统将于本周六凌晨2:00-4:00进行维护升级，期间无法访问...',
    sourceModule: '系统',
    createdAt: '2025-10-11 18:00',
    read: true,
  },
  {
    messageId: '4',
    type: 'ticket',
    title: '工单处理完成',
    bodySnippet: '您提交的技术支持工单已处理完成，请确认解决方案...',
    sourceModule: '智能服务',
    sourceId: 'ticket-156',
    createdAt: '2025-10-11 15:45',
    read: true,
  },
  {
    messageId: '5',
    type: 'approval',
    title: '培训申请待审批',
    bodySnippet: '您有一个新的培训申请需要审批：Python高级编程课程...',
    sourceModule: '能力培养',
    sourceId: 'train-089',
    createdAt: '2025-10-11 14:20',
    read: false,
  },
  {
    messageId: '6',
    type: 'booking',
    title: '预约取消通知',
    bodySnippet: '您预约的"电子显微镜"已被管理员取消，原因：设备故障维修...',
    sourceModule: '设备共享',
    sourceId: 'equip-045',
    createdAt: '2025-10-10 16:30',
    read: true,
  },
  {
    messageId: '7',
    type: 'system',
    title: '新功能上线',
    bodySnippet: '平台新增AI智能客服功能，支持24小时在线咨询...',
    sourceModule: '系统',
    createdAt: '2025-10-10 10:00',
    read: false,
  },
  {
    messageId: '8',
    type: 'ticket',
    title: '工单已分配',
    bodySnippet: '您的工单已分配给技术专家张工，预计24小时内响应...',
    sourceModule: '智能服务',
    sourceId: 'ticket-157',
    createdAt: '2025-10-09 11:20',
    read: true,
  },
];

const messageTypeConfig = {
  system: { label: '系统', color: 'info' as const },
  approval: { label: '审批', color: 'warning' as const },
  booking: { label: '预约', color: 'success' as const },
  ticket: { label: '工单', color: 'error' as const },
};

// ----------------------------------------------------------------------

export default function ServiceMessagePage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [selected, setSelected] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<MessageType | 'all'>('all');
  const [filterRead, setFilterRead] = useState<'all' | 'read' | 'unread'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Filter messages
  const filteredMessages = messages.filter((message) => {
    const typeMatch = filterType === 'all' || message.type === filterType;
    const readMatch =
      filterRead === 'all' ||
      (filterRead === 'read' && message.read) ||
      (filterRead === 'unread' && !message.read);
    const searchMatch =
      message.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.bodySnippet.toLowerCase().includes(searchQuery.toLowerCase());
    return typeMatch && readMatch && searchMatch;
  });

  const unreadCount = messages.filter((m) => !m.read).length;

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(filteredMessages.map((m) => m.messageId));
    } else {
      setSelected([]);
    }
  };

  const handleSelect = (messageId: string) => {
    setSelected((prev) =>
      prev.includes(messageId) ? prev.filter((id) => id !== messageId) : [...prev, messageId]
    );
  };

  const handleMarkAsRead = () => {
    setMessages((prev) =>
      prev.map((msg) => (selected.includes(msg.messageId) ? { ...msg, read: true } : msg))
    );
    setSelected([]);
  };

  const handleDelete = () => {
    setMessages((prev) => prev.filter((msg) => !selected.includes(msg.messageId)));
    setSelected([]);
  };

  const handleViewDetail = (message: Message) => {
    // Mark as read when viewing
    setMessages((prev) =>
      prev.map((msg) => (msg.messageId === message.messageId ? { ...msg, read: true } : msg))
    );
    navigate(`/service/message-detail?id=${message.messageId}`, { state: { message } });
  };

  const handleGoToSource = (message: Message) => {
    // Navigate to source module
    if (message.sourceId) {
      // This would navigate to the actual source page
      console.log('Navigate to:', message.sourceModule, message.sourceId);
    }
  };

  return (
    <>
      <Helmet>
        <title>消息通知 - 智能服务</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Box>
            <Typography variant="h4">消息通知</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              共 {messages.length} 条消息，{unreadCount} 条未读
            </Typography>
          </Box>

          <Button
            variant="outlined"
            startIcon={<Iconify icon="solar:settings-bold-duotone" />}
            onClick={() => setSettingsOpen(true)}
          >
            订阅设置
          </Button>
        </Stack>

        <Card>
          {/* Filters */}
          <Box sx={{ p: 2 }}>
            <Stack spacing={2}>
              {/* Search */}
              <TextField
                fullWidth
                placeholder="搜索消息标题或内容..."
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

              {/* Type and Read Status Filters */}
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Chip
                  label="全部"
                  color={filterType === 'all' ? 'primary' : 'default'}
                  onClick={() => setFilterType('all')}
                />
                {Object.entries(messageTypeConfig).map(([type, config]) => (
                  <Chip
                    key={type}
                    label={config.label}
                    color={filterType === type ? config.color : 'default'}
                    onClick={() => setFilterType(type as MessageType)}
                  />
                ))}
                <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                <Chip
                  label="全部"
                  color={filterRead === 'all' ? 'primary' : 'default'}
                  onClick={() => setFilterRead('all')}
                />
                <Chip
                  label="未读"
                  color={filterRead === 'unread' ? 'error' : 'default'}
                  onClick={() => setFilterRead('unread')}
                />
                <Chip
                  label="已读"
                  color={filterRead === 'read' ? 'default' : 'default'}
                  onClick={() => setFilterRead('read')}
                />
              </Stack>

              {/* Batch Actions */}
              {selected.length > 0 && (
                <Stack direction="row" spacing={1}>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<Iconify icon="eva:done-all-fill" />}
                    onClick={handleMarkAsRead}
                  >
                    标为已读 ({selected.length})
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                    onClick={handleDelete}
                  >
                    删除 ({selected.length})
                  </Button>
                </Stack>
              )}
            </Stack>
          </Box>

          <Divider />

          {/* Messages Table */}
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={
                          filteredMessages.length > 0 &&
                          selected.length === filteredMessages.length
                        }
                        indeterminate={
                          selected.length > 0 && selected.length < filteredMessages.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>状态</TableCell>
                    <TableCell>类型</TableCell>
                    <TableCell>标题</TableCell>
                    <TableCell>来源</TableCell>
                    <TableCell>时间</TableCell>
                    <TableCell align="right">操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredMessages
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((message) => (
                      <TableRow
                        key={message.messageId}
                        hover
                        sx={{
                          cursor: 'pointer',
                          bgcolor: message.read ? 'transparent' : 'action.hover',
                        }}
                        onClick={() => handleViewDetail(message)}
                      >
                        <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            checked={selected.includes(message.messageId)}
                            onChange={() => handleSelect(message.messageId)}
                          />
                        </TableCell>
                        <TableCell>
                          {!message.read && (
                            <Badge color="error" variant="dot">
                              <Iconify icon="solar:bell-bing-bold-duotone" width={20} />
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Chip
                            size="small"
                            label={messageTypeConfig[message.type].label}
                            color={messageTypeConfig[message.type].color}
                          />
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography
                              variant="subtitle2"
                              sx={{ fontWeight: message.read ? 400 : 600 }}
                            >
                              {message.title}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" noWrap>
                              {message.bodySnippet}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{message.sourceModule}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {message.createdAt}
                          </Typography>
                        </TableCell>
                        <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation();
                              setAnchorEl(e.currentTarget);
                            }}
                          >
                            <Iconify icon="eva:more-vertical-fill" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            component="div"
            count={filteredMessages.length}
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

      {/* Subscription Settings Dialog */}
      <Dialog open={settingsOpen} onClose={() => setSettingsOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>消息订阅设置</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            {Object.entries(messageTypeConfig).map(([type, config]) => (
              <Stack key={type} direction="row" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="subtitle2">{config.label}通知</Typography>
                  <Typography variant="caption" color="text.secondary">
                    接收{config.label}相关的消息通知
                  </Typography>
                </Box>
                <Checkbox defaultChecked />
              </Stack>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSettingsOpen(false)}>取消</Button>
          <Button variant="contained" onClick={() => setSettingsOpen(false)}>
            保存设置
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

