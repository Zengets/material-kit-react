import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TableContainer from '@mui/material/TableContainer';

import { Iconify } from 'src/components/iconify';
import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

type ReportStatus = 'completed' | 'generating' | 'failed';
type ExportType = 'PDF' | 'Excel';

type Report = {
  reportId: string;
  reportName: string;
  reportType: string;
  createTime: string;
  exportType: ExportType;
  status: ReportStatus;
};

const mockReports: Report[] = [
  {
    reportId: '1',
    reportName: '2025年10月运营报告',
    reportType: '运营报告',
    createTime: '2025-10-12 10:30',
    exportType: 'PDF',
    status: 'completed',
  },
  {
    reportId: '2',
    reportName: '2025年Q3绩效报告',
    reportType: '绩效报告',
    createTime: '2025-10-10 15:20',
    exportType: 'Excel',
    status: 'completed',
  },
  {
    reportId: '3',
    reportName: '自定义数据分析',
    reportType: '自定义报告',
    createTime: '2025-10-09 09:15',
    exportType: 'PDF',
    status: 'generating',
  },
];

// ----------------------------------------------------------------------

export function BIReportPage() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [reportName, setReportName] = useState('');
  const [reportPeriod, setReportPeriod] = useState('month');
  const [exportType, setExportType] = useState<ExportType>('PDF');

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setReportName('');
    setReportPeriod('month');
    setExportType('PDF');
  };

  const handleGenerateReport = () => {
    console.log('Generate report:', { reportName, reportPeriod, exportType });
    handleCloseDialog();
  };

  const handleViewReport = (reportId: string) => {
    console.log('View report:', reportId);
  };

  const handleDownloadReport = (reportId: string) => {
    console.log('Download report:', reportId);
  };

  const getStatusColor = (status: ReportStatus): 'success' | 'warning' | 'error' => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'generating':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'success';
    }
  };

  const getStatusLabel = (status: ReportStatus): string => {
    switch (status) {
      case 'completed':
        return '已完成';
      case 'generating':
        return '生成中';
      case 'failed':
        return '失败';
      default:
        return status;
    }
  };

  return (
    <>
      <Helmet>
        <title>数据报告 - BI 数据分析</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              variant="text"
              startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
              onClick={() => navigate('/bi/dashboard')}
            >
              返回总览
            </Button>
            <Typography variant="h4">数据报告</Typography>
          </Stack>

          <Button
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={handleOpenDialog}
          >
            生成新报告
          </Button>
        </Stack>

        {/* 报告模板 */}
        <Stack direction="row" spacing={3} mb={3}>
          <Card
            sx={{
              flex: 1,
              p: 3,
              cursor: 'pointer',
              transition: 'all 0.3s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: (theme) => theme.shadows[8],
              },
            }}
            onClick={handleOpenDialog}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'primary.lighter',
                  color: 'primary.main',
                }}
              >
                <Iconify icon="solar:document-text-bold" width={32} />
              </Box>
              <Box>
                <Typography variant="h6">运营报告</Typography>
                <Typography variant="body2" color="text.secondary">
                  生成运营数据分析报告
                </Typography>
              </Box>
            </Stack>
          </Card>

          <Card
            sx={{
              flex: 1,
              p: 3,
              cursor: 'pointer',
              transition: 'all 0.3s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: (theme) => theme.shadows[8],
              },
            }}
            onClick={handleOpenDialog}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'success.lighter',
                  color: 'success.main',
                }}
              >
                <Iconify icon="solar:chart-2-bold-duotone" width={32} />
              </Box>
              <Box>
                <Typography variant="h6">绩效报告</Typography>
                <Typography variant="body2" color="text.secondary">
                  生成绩效评估报告
                </Typography>
              </Box>
            </Stack>
          </Card>

          <Card
            sx={{
              flex: 1,
              p: 3,
              cursor: 'pointer',
              transition: 'all 0.3s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: (theme) => theme.shadows[8],
              },
            }}
            onClick={handleOpenDialog}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'warning.lighter',
                  color: 'warning.main',
                }}
              >
                <Iconify icon="solar:settings-bold-duotone" width={32} />
              </Box>
              <Box>
                <Typography variant="h6">自定义报告</Typography>
                <Typography variant="body2" color="text.secondary">
                  自定义数据报告
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Stack>

        {/* 历史报告列表 */}
        <Card>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" mb={3}>
              历史报告
            </Typography>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>报告名称</TableCell>
                  <TableCell>报告类型</TableCell>
                  <TableCell>创建时间</TableCell>
                  <TableCell>导出格式</TableCell>
                  <TableCell>状态</TableCell>
                  <TableCell align="right">操作</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockReports.map((report) => (
                  <TableRow key={report.reportId} hover>
                    <TableCell>
                      <Typography variant="subtitle2">{report.reportName}</Typography>
                    </TableCell>
                    <TableCell>{report.reportType}</TableCell>
                    <TableCell>{report.createTime}</TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Iconify
                          icon={
                            report.exportType === 'PDF'
                              ? 'solar:document-text-bold'
                              : 'solar:document-text-bold'
                          }
                          width={20}
                          sx={{
                            color:
                              report.exportType === 'PDF'
                                ? 'error.main'
                                : 'success.main',
                          }}
                        />
                        <Typography variant="body2">{report.exportType}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusLabel(report.status)}
                        size="small"
                        color={getStatusColor(report.status)}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Button
                          size="small"
                          startIcon={<Iconify icon="solar:eye-bold" />}
                          onClick={() => handleViewReport(report.reportId)}
                        >
                          预览
                        </Button>
                        <Button
                          size="small"
                          startIcon={<Iconify icon="eva:download-fill" />}
                          onClick={() => handleDownloadReport(report.reportId)}
                          disabled={report.status !== 'completed'}
                        >
                          下载
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        {/* 生成报告对话框 */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>生成新报告</DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="报告名称"
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
                placeholder="请输入报告名称"
              />

              <FormControl fullWidth>
                <InputLabel>统计周期</InputLabel>
                <Select
                  value={reportPeriod}
                  label="统计周期"
                  onChange={(e) => setReportPeriod(e.target.value)}
                >
                  <MenuItem value="week">本周</MenuItem>
                  <MenuItem value="month">本月</MenuItem>
                  <MenuItem value="quarter">本季度</MenuItem>
                  <MenuItem value="year">本年</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>导出格式</InputLabel>
                <Select
                  value={exportType}
                  label="导出格式"
                  onChange={(e) => setExportType(e.target.value as ExportType)}
                >
                  <MenuItem value="PDF">
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Iconify icon="solar:document-text-bold" sx={{ color: 'error.main' }} />
                      <span>PDF</span>
                    </Stack>
                  </MenuItem>
                  <MenuItem value="Excel">
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Iconify icon="solar:document-text-bold" sx={{ color: 'success.main' }} />
                      <span>Excel</span>
                    </Stack>
                  </MenuItem>
                </Select>
              </FormControl>

              <Alert
                severity="info"
                icon={<Iconify icon="solar:info-circle-bold" />}
              >
                <Stack direction="row" spacing={1}>
                  <Typography variant="body2" color="info.dark">
                    报告生成可能需要几分钟时间，生成完成后可在列表中查看和下载
                  </Typography>
                </Stack>
              </Alert>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>取消</Button>
            <Button variant="contained" onClick={handleGenerateReport}>
              生成报告
            </Button>
          </DialogActions>
        </Dialog>
      </DashboardContent>
    </>
  );
}

export default function Page() {
  return <BIReportPage />;
}
