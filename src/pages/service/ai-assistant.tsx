import { useRef, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import {
  Chip,
  List,
  Paper,
  Dialog,
  Switch,
  ListItem,
  DialogTitle,
  ListItemIcon,
  ListItemText,
  DialogContent,
  DialogActions,
  ListItemButton,
  FormControlLabel,
} from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { getAssetUrl } from 'src/utils/get-asset-url';

// ----------------------------------------------------------------------

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  actions?: QuickAction[];
};

type QuickAction = {
  label: string;
  icon: string;
  action: string;
};

type FAQ = {
  id: string;
  question: string;
  category: string;
  icon: string;
};

// Mock data
const mockFAQs: FAQ[] = [
  {
    id: '1',
    question: '如何申请项目立项？',
    category: '项目管理',
    icon: 'solar:document-text-bold',
  },
  {
    id: '2',
    question: '设备预约流程是什么？',
    category: '设备共享',
    icon: 'solar:clock-circle-outline',
  },
  {
    id: '3',
    question: '如何查看培训证书？',
    category: '能力培养',
    icon: 'solar:star-bold',
  },
  {
    id: '4',
    question: '成果转化申请条件？',
    category: '成果转化',
    icon: 'solar:chart-2-bold-duotone',
  },
  {
    id: '5',
    question: '如何修改个人信息？',
    category: '系统设置',
    icon: 'solar:settings-bold-duotone',
  },
  {
    id: '6',
    question: '忘记密码怎么办？',
    category: '账号安全',
    icon: 'solar:shield-keyhole-bold-duotone',
  },
];

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: '您好！我是智能客服助手，很高兴为您服务。您可以：\n\n1. 点击下方常见问题快速获取答案\n2. 直接输入您的问题\n3. 如需人工服务，请点击"转人工"按钮\n\n请问有什么可以帮助您的？',
    timestamp: '2025-10-12 10:00',
  },
];

// ----------------------------------------------------------------------

export default function ServiceAIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [knowledgeDialogOpen, setKnowledgeDialogOpen] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUser = { name: '张三', avatar: getAssetUrl('assets/images/avatars/avatar-1.jpg') };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date().toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(inputValue),
        timestamp: new Date().toLocaleString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }),
        actions: [
          {
            label: '创建工单',
            icon: 'solar:chat-round-dots-bold',
            action: 'create-ticket',
          },
          {
            label: '预约设备',
            icon: 'solar:clock-circle-outline',
            action: 'book-equipment',
          },
        ],
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (question: string): string => {
    // Simple response generation based on keywords
    if (question.includes('项目') || question.includes('立项')) {
      return '关于项目立项申请，您需要：\n\n1. 登录系统进入"项目管理"模块\n2. 点击"新建项目"按钮\n3. 填写项目基本信息（名称、类型、预算等）\n4. 上传项目方案和相关附件\n5. 提交审批\n\n审批通过后，您会收到消息通知。整个流程通常需要3-5个工作日。\n\n需要我帮您创建工单或预约相关服务吗？';
    }
    if (question.includes('设备') || question.includes('预约')) {
      return '设备预约流程如下：\n\n1. 进入"设备共享"模块\n2. 浏览或搜索需要的设备\n3. 查看设备详情和可用时间\n4. 选择预约时间段\n5. 填写使用目的和项目信息\n6. 提交预约申请\n\n预约成功后会收到确认通知。使用前30分钟会再次提醒您。\n\n是否需要我帮您查看当前可用设备？';
    }
    if (question.includes('培训') || question.includes('课程') || question.includes('证书')) {
      return '关于培训和证书：\n\n1. 在"能力培养"模块可以浏览所有课程\n2. 报名课程后按计划学习\n3. 完成课程学习和考核\n4. 考核通过后自动生成证书\n5. 在"我的学习"中可以查看和下载证书\n\n证书支持在线验证，可以分享给企业或其他机构。\n\n需要我推荐适合您的课程吗？';
    }
    return `我理解您的问题是关于"${question}"。\n\n我会尽力帮助您解答。如果需要更详细的帮助，我可以：\n\n1. 为您创建技术支持工单\n2. 转接人工客服\n3. 查询相关文档\n\n请告诉我您需要哪种帮助？`;
  };

  const handleFAQClick = (faq: FAQ) => {
    setInputValue(faq.question);
    handleSendMessage();
  };

  const handleTransferToHuman = () => {
    const message: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: '正在为您转接人工客服，请稍候...\n\n预计等待时间：2-3分钟\n当前排队人数：3人',
      timestamp: new Date().toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setMessages((prev) => [...prev, message]);
  };

  const handleQuickAction = (action: string) => {
    console.log('Quick action:', action);
    // Handle quick actions like creating ticket, booking equipment, etc.
  };

  return (
    <>
      <Helmet>
        <title>AI智能客服 - 智能服务</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4">AI智能客服</Typography>
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              startIcon={<Iconify icon="solar:document-text-bold" />}
              onClick={() => setKnowledgeDialogOpen(true)}
            >
              知识库管理
            </Button>
            <Button
              variant="outlined"
              startIcon={<Iconify icon="solar:settings-bold-duotone" />}
              onClick={() => setSettingsDialogOpen(true)}
            >
              设置
            </Button>
          </Stack>
        </Stack>

        <Grid container spacing={3}>
          {/* FAQ Section */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: 'calc(100vh - 250px)' }}>
              <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="h6">常见问题</Typography>
              </Box>
              <Scrollbar sx={{ height: 'calc(100% - 60px)' }}>
                <List>
                  {mockFAQs.map((faq) => (
                    <ListItem key={faq.id} disablePadding>
                      <ListItemButton onClick={() => handleFAQClick(faq)}>
                        <ListItemIcon>
                          <Iconify icon={faq.icon as any} width={24} />
                        </ListItemIcon>
                        <ListItemText
                          primary={faq.question}
                          secondary={faq.category}
                          primaryTypographyProps={{ variant: 'body2' }}
                          secondaryTypographyProps={{ variant: 'caption' }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Scrollbar>
            </Card>
          </Grid>

          {/* Chat Section */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card sx={{ height: 'calc(100vh - 250px)', display: 'flex', flexDirection: 'column' }}>
              {/* Chat Header */}
              <Box
                sx={{
                  p: 2,
                  borderBottom: 1,
                  borderColor: 'divider',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <Iconify icon="solar:chat-round-dots-bold" />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1">智能客服助手</Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          bgcolor: 'success.main',
                        }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        在线
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>

                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Iconify icon="solar:chat-round-dots-bold" />}
                  onClick={handleTransferToHuman}
                >
                  转人工
                </Button>
              </Box>

              {/* Messages */}
              <Scrollbar sx={{ flex: 1, p: 2 }}>
                <Stack spacing={2}>
                  {messages.map((message) => (
                    <Box
                      key={message.id}
                      sx={{
                        display: 'flex',
                        flexDirection: message.role === 'user' ? 'row-reverse' : 'row',
                        gap: 1,
                      }}
                    >
                      <Avatar
                        src={message.role === 'user' ? currentUser.avatar : undefined}
                        sx={{
                          bgcolor: message.role === 'assistant' ? 'primary.main' : 'grey.500',
                        }}
                      >
                        {message.role === 'assistant' ? (
                          <Iconify icon="solar:chat-round-dots-bold" />
                        ) : (
                          currentUser.name[0]
                        )}
                      </Avatar>

                      <Box sx={{ maxWidth: '70%' }}>
                        <Paper
                          sx={{
                            p: 2,
                            bgcolor:
                              message.role === 'user' ? 'primary.main' : 'background.neutral',
                            color: message.role === 'user' ? 'primary.contrastText' : 'text.primary',
                          }}
                        >
                          <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                            {message.content}
                          </Typography>
                        </Paper>

                        {/* Quick Actions */}
                        {message.actions && (
                          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                            {message.actions.map((action, index) => (
                              <Chip
                                key={index}
                                label={action.label}
                                icon={<Iconify icon={action.icon as any} />}
                                size="small"
                                onClick={() => handleQuickAction(action.action)}
                                sx={{ cursor: 'pointer' }}
                              />
                            ))}
                          </Stack>
                        )}

                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: 'block', mt: 0.5 }}
                        >
                          {message.timestamp}
                        </Typography>
                      </Box>
                    </Box>
                  ))}

                  {isTyping && (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        <Iconify icon="solar:chat-round-dots-bold" />
                      </Avatar>
                      <Paper sx={{ p: 2, bgcolor: 'background.neutral' }}>
                        <Stack direction="row" spacing={0.5}>
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              bgcolor: 'text.secondary',
                              animation: 'pulse 1.4s infinite',
                              '@keyframes pulse': {
                                '0%, 80%, 100%': { opacity: 0.3 },
                                '40%': { opacity: 1 },
                              },
                            }}
                          />
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              bgcolor: 'text.secondary',
                              animation: 'pulse 1.4s infinite 0.2s',
                              '@keyframes pulse': {
                                '0%, 80%, 100%': { opacity: 0.3 },
                                '40%': { opacity: 1 },
                              },
                            }}
                          />
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              bgcolor: 'text.secondary',
                              animation: 'pulse 1.4s infinite 0.4s',
                              '@keyframes pulse': {
                                '0%, 80%, 100%': { opacity: 0.3 },
                                '40%': { opacity: 1 },
                              },
                            }}
                          />
                        </Stack>
                      </Paper>
                    </Box>
                  )}

                  <div ref={messagesEndRef} />
                </Stack>
              </Scrollbar>

              <Divider />

              {/* Input */}
              <Box sx={{ p: 2 }}>
                <TextField
                  fullWidth
                  multiline
                  maxRows={4}
                  placeholder="输入您的问题..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          color="primary"
                          disabled={!inputValue.trim()}
                          onClick={handleSendMessage}
                        >
                          <Iconify icon="solar:share-bold" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  按 Enter 发送，Shift + Enter 换行
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </DashboardContent>

      {/* Knowledge Base Management Dialog */}
      <Dialog
        open={knowledgeDialogOpen}
        onClose={() => setKnowledgeDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>知识库管理</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              管理AI客服的知识库内容，包括FAQ和文档。
            </Typography>
            <Button variant="outlined" startIcon={<Iconify icon="mingcute:add-line" />}>
              添加FAQ
            </Button>
            <Button variant="outlined" startIcon={<Iconify icon="eva:download-fill" />}>
              导入文档
            </Button>
            <Divider />
            <Typography variant="subtitle2">未回答问题记录</Typography>
            <List>
              {['如何申请专利？', '设备维修流程？', '项目经费如何报销？'].map((q, i) => (
                <ListItem key={i}>
                  <ListItemText primary={q} secondary={`被问 ${3 - i} 次`} />
                  <Button size="small">添加到知识库</Button>
                </ListItem>
              ))}
            </List>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setKnowledgeDialogOpen(false)}>关闭</Button>
        </DialogActions>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog
        open={settingsDialogOpen}
        onClose={() => setSettingsDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>客服设置</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="启用智能回复"
            />
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="保存会话历史"
            />
            <FormControlLabel
              control={<Switch />}
              label="自动转人工（无法回答时）"
            />
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="发送满意度调查"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSettingsDialogOpen(false)}>取消</Button>
          <Button variant="contained" onClick={() => setSettingsDialogOpen(false)}>
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

