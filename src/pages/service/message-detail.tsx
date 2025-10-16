import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Chip, List, Paper, Avatar, ListItem, ListItemIcon, ListItemText } from '@mui/material';

import { Iconify } from 'src/components/iconify';
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

type Attachment = {
  id: string;
  name: string;
  size: string;
  type: string;
};

const messageTypeConfig = {
  system: { label: '系统', color: 'info' as const, icon: 'solar:info-circle-bold' },
  approval: { label: '审批', color: 'warning' as const, icon: 'solar:document-text-bold' },
  booking: { label: '预约', color: 'success' as const, icon: 'solar:clock-circle-outline' },
  ticket: { label: '工单', color: 'error' as const, icon: 'solar:chat-round-dots-bold' },
};

// Mock full message content
const mockFullContent = `
尊敬的用户，

您提交的"智能制造平台开发"项目已通过审批。

审批详情：
- 审批人：张主任
- 审批时间：2025-10-12 10:30
- 审批意见：项目方案完整，技术路线清晰，同意立项。

下一步操作：
1. 请在3个工作日内完成项目启动会议
2. 提交详细的项目实施计划
3. 配置项目团队成员

如有疑问，请联系项目管理部门。

此致
敬礼

产教融合平台
2025年10月12日
`;

const mockAttachments: Attachment[] = [
  {
    id: '1',
    name: '项目审批表.pdf',
    size: '2.3 MB',
    type: 'pdf',
  },
  {
    id: '2',
    name: '项目预算明细.xlsx',
    size: '856 KB',
    type: 'excel',
  },
];

// ----------------------------------------------------------------------

export default function ServiceMessageDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  // Get message from location state or mock data
  const message = (location.state?.message as Message) || {
    messageId: searchParams.get('id') || '1',
    type: 'approval' as MessageType,
    title: '项目审批通知',
    bodySnippet: '您提交的"智能制造平台开发"项目已通过审批，请查看详情...',
    sourceModule: '项目管理',
    sourceId: 'proj-001',
    createdAt: '2025-10-12 10:30',
    read: true,
  };

  const config = messageTypeConfig[message.type];

  const handleGoBack = () => {
    navigate('/service/message');
  };

  const handleGoToSource = () => {
    // Navigate to source module
    if (message.sourceId) {
      console.log('Navigate to:', message.sourceModule, message.sourceId);
      // Example: navigate(`/project-management/detail?id=${message.sourceId}`);
    }
  };

  const handleApprove = () => {
    console.log('Approve action');
    // Handle approval action
  };

  const handleReject = () => {
    console.log('Reject action');
    // Handle rejection action
  };

  const handleReply = () => {
    console.log('Reply action');
    // Handle reply action
  };

  const handleDownload = (attachment: Attachment) => {
    console.log('Download:', attachment.name);
    // Handle download
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'solar:document-text-bold';
      case 'excel':
        return 'solar:document-text-bold';
      case 'word':
        return 'solar:document-text-bold';
      case 'image':
        return 'solar:document-text-bold';
      default:
        return 'solar:document-text-bold';
    }
  };

  return (
    <>
      <Helmet>
        <title>消息详情 - 智能服务</title>
      </Helmet>

      <DashboardContent maxWidth="lg">
        {/* Header */}
        <Stack direction="row" alignItems="center" spacing={2} mb={3}>
          <IconButton onClick={handleGoBack}>
            <Iconify icon="eva:arrow-ios-back-fill" />
          </IconButton>
          <Typography variant="h4">消息详情</Typography>
        </Stack>

        <Card>
          {/* Message Header */}
          <Box sx={{ p: 3 }}>
            <Stack spacing={2}>
              {/* Type and Time */}
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" spacing={1} alignItems="center">
                  <Avatar
                    sx={{
                      bgcolor: `${config.color}.main`,
                      width: 40,
                      height: 40,
                    }}
                  >
                    <Iconify icon={config.icon as any} width={24} />
                  </Avatar>
                  <Box>
                    <Chip size="small" label={config.label} color={config.color} />
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                      {message.createdAt}
                    </Typography>
                  </Box>
                </Stack>

                {message.sourceId && (
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
                    onClick={handleGoToSource}
                  >
                    查看来源
                  </Button>
                )}
              </Stack>

              {/* Title */}
              <Typography variant="h5">{message.title}</Typography>

              {/* Source Module */}
              <Stack direction="row" spacing={2}>
                <Typography variant="body2" color="text.secondary">
                  来源模块：
                </Typography>
                <Typography variant="body2">{message.sourceModule}</Typography>
              </Stack>
            </Stack>
          </Box>

          <Divider />

          {/* Message Content */}
          <Box sx={{ p: 3 }}>
            <Paper
              variant="outlined"
              sx={{
                p: 3,
                bgcolor: 'background.neutral',
                whiteSpace: 'pre-wrap',
                fontFamily: 'monospace',
              }}
            >
              {mockFullContent}
            </Paper>
          </Box>

          {/* Attachments */}
          {mockAttachments.length > 0 && (
            <>
              <Divider />
              <Box sx={{ p: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  附件 ({mockAttachments.length})
                </Typography>
                <List>
                  {mockAttachments.map((attachment) => (
                    <ListItem
                      key={attachment.id}
                      sx={{
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 1,
                        mb: 1,
                      }}
                      secondaryAction={
                        <IconButton edge="end" onClick={() => handleDownload(attachment)}>
                          <Iconify icon="eva:download-fill" />
                        </IconButton>
                      }
                    >
                      <ListItemIcon>
                        <Iconify icon={getFileIcon(attachment.type) as any} width={32} />
                      </ListItemIcon>
                      <ListItemText
                        primary={attachment.name}
                        secondary={attachment.size}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </>
          )}

          <Divider />

          {/* Quick Actions */}
          <Box sx={{ p: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              快速操作
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              {message.type === 'approval' && (
                <>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<Iconify icon="eva:checkmark-fill" />}
                    onClick={handleApprove}
                  >
                    批准
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<Iconify icon="mingcute:close-line" />}
                    onClick={handleReject}
                  >
                    驳回
                  </Button>
                </>
              )}
              {message.type === 'ticket' && (
                <Button
                  variant="contained"
                  startIcon={<Iconify icon="solar:chat-round-dots-bold" />}
                  onClick={handleReply}
                >
                  回复
                </Button>
              )}
              {message.sourceId && (
                <Button
                  variant="outlined"
                  startIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
                  onClick={handleGoToSource}
                >
                  跳转到来源
                </Button>
              )}
              <Button
                variant="outlined"
                startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                color="error"
                onClick={handleGoBack}
              >
                删除
              </Button>
            </Stack>
          </Box>
        </Card>

        {/* Related Messages */}
        <Card sx={{ mt: 3 }}>
          <Box sx={{ p: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              相关消息
            </Typography>
            <Stack spacing={2} sx={{ mt: 2 }}>
              {[1, 2].map((i) => (
                <Paper
                  key={i}
                  variant="outlined"
                  sx={{
                    p: 2,
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                  onClick={() => console.log('View related message', i)}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Iconify icon="solar:bell-bing-bold-duotone" width={24} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2">
                        项目进度更新通知 #{i}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        2025-10-{12 - i} 14:30
                      </Typography>
                    </Box>
                    <Iconify icon="eva:arrow-ios-forward-fill" />
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </Box>
        </Card>
      </DashboardContent>
    </>
  );
}

