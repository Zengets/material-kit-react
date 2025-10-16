import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ToggleButton from '@mui/material/ToggleButton';
import TableContainer from '@mui/material/TableContainer';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { Iconify } from 'src/components/iconify';
import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

type RankingData = {
  rank: number;
  entityId: string;
  entityName: string;
  score: number;
  rankChange: number;
  category: string;
};

const mockRankingData: RankingData[] = [
  {
    rank: 1,
    entityId: '1',
    entityName: '清华大学',
    score: 98.5,
    rankChange: 0,
    category: 'institution',
  },
  {
    rank: 2,
    entityId: '2',
    entityName: '北京大学',
    score: 96.8,
    rankChange: 1,
    category: 'institution',
  },
  {
    rank: 3,
    entityId: '3',
    entityName: '浙江大学',
    score: 95.2,
    rankChange: -1,
    category: 'institution',
  },
  {
    rank: 4,
    entityId: '4',
    entityName: '复旦大学',
    score: 93.7,
    rankChange: 2,
    category: 'institution',
  },
  {
    rank: 5,
    entityId: '5',
    entityName: '上海交通大学',
    score: 92.4,
    rankChange: -1,
    category: 'institution',
  },
];

const mockMetrics = [
  { id: 'overall', name: '综合评分' },
  { id: 'project', name: '项目数量' },
  { id: 'training', name: '培训完成率' },
  { id: 'satisfaction', name: '满意度' },
];

// ----------------------------------------------------------------------

export function BIRankingPage() {
  const navigate = useNavigate();
  const [selectedMetric, setSelectedMetric] = useState('overall');
  const [viewMode, setViewMode] = useState<'top10' | 'all'>('top10');

  const handleMetricChange = (event: any) => {
    setSelectedMetric(event.target.value);
  };

  const handleViewModeChange = (_event: React.MouseEvent<HTMLElement>, newValue: 'top10' | 'all' | null) => {
    if (newValue !== null) {
      setViewMode(newValue);
    }
  };

  const handleViewDetail = (entityId: string) => {
    console.log('View detail:', entityId);
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return 'solar:star-bold';
    if (rank === 2) return 'solar:star-bold';
    if (rank === 3) return 'solar:star-bold';
    return null;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'warning.main';
    if (rank === 2) return 'grey.500';
    if (rank === 3) return 'error.main';
    return 'text.primary';
  };

  const displayData = viewMode === 'top10' ? mockRankingData.slice(0, 10) : mockRankingData;

  return (
    <>
      <Helmet>
        <title>绩效排名 - BI 数据分析</title>
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
            <Typography variant="h4">绩效排名</Typography>
          </Stack>

          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:download-fill" />}
          >
            导出排名
          </Button>
        </Stack>

        <Card sx={{ p: 3, mb: 3 }}>
          <Stack direction="row" spacing={3} alignItems="center">
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>排名指标</InputLabel>
              <Select value={selectedMetric} label="排名指标" onChange={handleMetricChange}>
                {mockMetrics.map((metric) => (
                  <MenuItem key={metric.id} value={metric.id}>
                    {metric.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={handleViewModeChange}
              size="small"
            >
              <ToggleButton value="top10">Top 10</ToggleButton>
              <ToggleButton value="all">全部</ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Card>

        {/* Top 3 特殊展示 */}
        <Stack direction="row" spacing={3} mb={3}>
          {mockRankingData.slice(0, 3).map((item) => (
            <Card
              key={item.entityId}
              sx={{
                flex: 1,
                p: 3,
                textAlign: 'center',
                position: 'relative',
                overflow: 'visible',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: -20,
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
              >
                <Iconify
                  icon="solar:star-bold"
                  width={40}
                  sx={{ color: getRankColor(item.rank) }}
                />
              </Box>
              <Stack spacing={2} mt={2}>
                <Typography variant="h2" sx={{ color: getRankColor(item.rank) }}>
                  {item.rank}
                </Typography>
                <Typography variant="h6">{item.entityName}</Typography>
                <Typography variant="h4" color="primary">
                  {item.score}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  综合评分
                </Typography>
              </Stack>
            </Card>
          ))}
        </Stack>

        {/* 完整排名列表 */}
        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>排名</TableCell>
                  <TableCell>名称</TableCell>
                  <TableCell align="right">评分</TableCell>
                  <TableCell align="center">排名变化</TableCell>
                  <TableCell align="right">操作</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayData.map((row) => (
                  <TableRow key={row.entityId} hover>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        {getRankIcon(row.rank) && (
                          <Iconify
                            icon={getRankIcon(row.rank)!}
                            width={24}
                            sx={{ color: getRankColor(row.rank) }}
                          />
                        )}
                        <Typography
                          variant="h6"
                          sx={{ color: getRankColor(row.rank) }}
                        >
                          {row.rank}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{row.entityName}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h6" color="primary">
                        {row.score}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      {row.rankChange !== 0 && (
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={0.5}
                          justifyContent="center"
                          sx={{
                            color:
                              row.rankChange > 0
                                ? 'success.main'
                                : 'error.main',
                          }}
                        >
                          <Iconify
                            icon={
                              row.rankChange > 0
                                ? 'eva:arrow-ios-upward-fill'
                                : 'eva:arrow-ios-downward-fill'
                            }
                            width={20}
                          />
                          <Typography variant="body2">
                            {Math.abs(row.rankChange)}
                          </Typography>
                        </Stack>
                      )}
                      {row.rankChange === 0 && (
                        <Typography variant="body2" color="text.secondary">
                          -
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        size="small"
                        onClick={() => handleViewDetail(row.entityId)}
                      >
                        查看详情
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </DashboardContent>
    </>
  );
}

export default function Page() {
  return <BIRankingPage />;
}
