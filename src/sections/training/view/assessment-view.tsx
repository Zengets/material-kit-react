import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { fDate } from 'src/utils/format-time';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Exam = {
  id: string;
  examId: string;
  courseId: string;
  courseName: string;
  title: string;
  status: '未开始' | '进行中' | '已完成';
  startTime: string | number | null;
  duration: number;
  totalQuestions: number;
  score: number | null;
  passLine: number;
  result: '合格' | '不合格' | null;
};

type Certificate = {
  id: string;
  certificateId: string;
  courseId: string;
  courseName: string;
  instructorName: string;
  issuedDate: string | number | null;
  score: number;
  certificateUrl: string;
};

type Props = {
  exams: Exam[];
  certificates: Certificate[];
};

export function AssessmentView({ exams, certificates }: Props) {
  const [currentTab, setCurrentTab] = useState('exams');

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '未开始':
        return 'default';
      case '进行中':
        return 'warning';
      case '已完成':
        return 'success';
      default:
        return 'default';
    }
  };

  const getResultColor = (result: string | null) => {
    if (result === '合格') return 'success';
    if (result === '不合格') return 'error';
    return 'default';
  };

  const renderExamCard = (exam: Exam) => (
    <Card key={exam.id} sx={{ p: 3 }}>
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              {exam.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {exam.courseName}
            </Typography>
          </Box>
          <Chip
            label={exam.status}
            color={getStatusColor(exam.status)}
            size="small"
          />
        </Stack>

        <Divider />

        <Grid container spacing={2}>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Stack spacing={0.5}>
              <Typography variant="caption" color="text.secondary">
                考试时间
              </Typography>
              <Typography variant="body2">{fDate(exam.startTime)}</Typography>
            </Stack>
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Stack spacing={0.5}>
              <Typography variant="caption" color="text.secondary">
                考试时长
              </Typography>
              <Typography variant="body2">{exam.duration}分钟</Typography>
            </Stack>
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Stack spacing={0.5}>
              <Typography variant="caption" color="text.secondary">
                题目数量
              </Typography>
              <Typography variant="body2">{exam.totalQuestions}题</Typography>
            </Stack>
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Stack spacing={0.5}>
              <Typography variant="caption" color="text.secondary">
                合格分数
              </Typography>
              <Typography variant="body2">{exam.passLine}分</Typography>
            </Stack>
          </Grid>
        </Grid>

        {exam.status === '已完成' && exam.score !== null && (
          <>
            <Divider />
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="body2" color="text.secondary">
                  考试成绩
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="h4" color={exam.score >= exam.passLine ? 'success.main' : 'error.main'}>
                    {exam.score}分
                  </Typography>
                  <Chip
                    label={exam.result}
                    color={getResultColor(exam.result)}
                    size="small"
                  />
                </Stack>
              </Box>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Iconify icon={'solar:document-text-outline' as any} />}
              >
                查看试卷
              </Button>
            </Stack>
          </>
        )}

        {exam.status === '未开始' && (
          <Button
            variant="contained"
            fullWidth
            startIcon={<Iconify icon={'solar:play-circle-outline' as any} />}
          >
            开始考试
          </Button>
        )}

        {exam.status === '进行中' && (
          <Button
            variant="contained"
            color="warning"
            fullWidth
            startIcon={<Iconify icon={'solar:refresh-outline' as any} />}
          >
            继续考试
          </Button>
        )}
      </Stack>
    </Card>
  );

  const renderCertificateCard = (cert: Certificate) => (
    <Card key={cert.id} sx={{ p: 3 }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: 2,
              bgcolor: 'primary.lighter',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Iconify icon={'solar:diploma-verified-bold' as any} width={40} sx={{ color: 'primary.main' }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              {cert.courseName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              证书编号: {cert.certificateId}
            </Typography>
          </Box>
        </Stack>

        <Divider />

        <Grid container spacing={2}>
          <Grid size={{ xs: 6 }}>
            <Stack spacing={0.5}>
              <Typography variant="caption" color="text.secondary">
                讲师
              </Typography>
              <Typography variant="body2">{cert.instructorName}</Typography>
            </Stack>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Stack spacing={0.5}>
              <Typography variant="caption" color="text.secondary">
                获得日期
              </Typography>
              <Typography variant="body2">{fDate(cert.issuedDate)}</Typography>
            </Stack>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Stack spacing={0.5}>
              <Typography variant="caption" color="text.secondary">
                考试成绩
              </Typography>
              <Typography variant="body2" color="success.main" fontWeight="bold">
                {cert.score}分
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<Iconify icon={'solar:download-outline' as any} />}
          >
            下载证书
          </Button>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<Iconify icon={'solar:qr-code-outline' as any} />}
          >
            验证证书
          </Button>
        </Stack>
      </Stack>
    </Card>
  );

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        考核与证书
      </Typography>

      <Tabs value={currentTab} onChange={handleTabChange} sx={{ mb: 5 }}>
        <Tab
          label={`考试管理 (${exams.length})`}
          value="exams"
          icon={<Iconify icon={'solar:document-text-outline' as any} width={20} />}
          iconPosition="start"
        />
        <Tab
          label={`我的证书 (${certificates.length})`}
          value="certificates"
          icon={<Iconify icon={'solar:diploma-outline' as any} width={20} />}
          iconPosition="start"
        />
      </Tabs>

      {currentTab === 'exams' && (
        <Grid container spacing={3}>
          {exams.map((exam) => (
            <Grid key={exam.id} size={{ xs: 12, md: 6 }}>
              {renderExamCard(exam)}
            </Grid>
          ))}
        </Grid>
      )}

      {currentTab === 'certificates' && (
        <>
          {certificates.length > 0 ? (
            <Grid container spacing={3}>
              {certificates.map((cert) => (
                <Grid key={cert.id} size={{ xs: 12, md: 6 }}>
                  {renderCertificateCard(cert)}
                </Grid>
              ))}
            </Grid>
          ) : (
            <Card sx={{ p: 5, textAlign: 'center' }}>
              <Iconify icon={'solar:diploma-outline' as any} width={80} sx={{ color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                暂无证书
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                完成课程学习并通过考试后即可获得证书
              </Typography>
            </Card>
          )}
        </>
      )}
    </DashboardContent>
  );
}

