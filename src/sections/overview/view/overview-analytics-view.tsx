import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { getAssetUrl } from 'src/utils/get-asset-url';

import { AnalyticsNews } from '../analytics-news';
import { AnalyticsTasks } from '../analytics-tasks';
import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsOrderTimeline } from '../analytics-order-timeline';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
import { AnalyticsTrafficBySite } from '../analytics-traffic-by-site';
import { AnalyticsCurrentSubject } from '../analytics-current-subject';
import { AnalyticsConversionRates } from '../analytics-conversion-rates';
import { _myAccount } from 'src/_mock';

// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
  const [currentBanner, setCurrentBanner] = useState(0);

  const banners = [
    {
      type: '平台',
      title: '产教融合智能服务平台',
      content:
        '致力于整合优质教育资源与企业资源，提供项目对接、课程共建、设备共享、成果转化等一站式服务，推动产教深度融合，培养高素质技能人才。',
      color: '#9c27b0',
      icon: 'solar:widget-5-bold-duotone' as const,
    },
    {
      type: '通知',
      title: '系统维护通知',
      content:
        '系统将于本周六凌晨 2:00-4:00 进行例行维护，届时服务将暂时中断，请提前做好相关准备。',
      color: '#1976d2',
      icon: 'solar:bell-bing-bold-duotone' as const,
    },
    {
      type: '活动',
      title: '校企共建智能制造实训基地启动仪式',
      content:
        '中等职业技术学校与多家企业共同打造的" 智能制造实训中心"和"现代智能厨房实训基地"正式揭牌启用。这标志着该校的 实践教学条件迎来了新的里程碑。',
      color: '#ed6c02',
      icon: 'solar:cart-3-bold' as const,
    },
    {
      type: '政策',
      title: '教育部：深化产教融合协同育人行动计划',
      content:
        '为深入贯彻落实习近平总书记关于教育的重要论述，推动落实《"十四五"教育发展规划》《国务院办公厅关于深化产教融合的若干意见》，充分调动...',
      color: '#2e7d32',
      icon: 'solar:shield-keyhole-bold-duotone' as const,
    },
  ];

  const handlePrevBanner = () => {
    setCurrentBanner((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const handleNextBanner = () => {
    setCurrentBanner((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  return (
    <DashboardContent maxWidth="xl">
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
          欢迎回来,{_myAccount.displayName}
        </Typography>

        <a href="/enterprise-guide" style={{ color: '#1877F2', textDecoration: 'none' }}>
          企业入驻指南
        </a>
      </Box>

      {/* Banner 轮播 */}
      <Card
        sx={{
          mb: 3,
          p: 3,
          position: 'relative',
          background: `linear-gradient(135deg, ${banners[currentBanner].color}15 0%, ${banners[currentBanner].color}05 100%)`,
          border: `1px solid ${banners[currentBanner].color}40`,
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* 图标 */}
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: banners[currentBanner].color,
            color: 'white',
            flexShrink: 0,
          }}
        >
          <Iconify icon={banners[currentBanner].icon as any} width={32} />
        </Box>

          {/* 内容 */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Typography
                variant="caption"
                sx={{
                  px: 1,
                  py: 0.25,
                  borderRadius: 0.5,
                  bgcolor: banners[currentBanner].color,
                  color: 'white',
                  fontWeight: 600,
                }}
              >
                {banners[currentBanner].type}
              </Typography>
              <Typography variant="subtitle1" fontWeight={600}>
                {banners[currentBanner].title}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
              {banners[currentBanner].content}
            </Typography>
          </Box>

          {/* 导航按钮 */}
          <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
            <IconButton
              size="small"
              onClick={handlePrevBanner}
              sx={{
                bgcolor: 'background.paper',
                boxShadow: 1,
                '&:hover': { bgcolor: 'background.paper', boxShadow: 2 },
              }}
            >
              <Iconify icon="eva:arrow-ios-upward-fill" sx={{ rotate: '-90deg' }} />
            </IconButton>
            <IconButton
              size="small"
              onClick={handleNextBanner}
              sx={{
                bgcolor: 'background.paper',
                boxShadow: 1,
                '&:hover': { bgcolor: 'background.paper', boxShadow: 2 },
              }}
            >
              <Iconify icon="eva:arrow-ios-forward-fill" />
            </IconButton>
          </Box>
        </Box>

        {/* 指示器 */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
            mt: 2,
          }}
        >
          {banners.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentBanner(index)}
              sx={{
                width: currentBanner === index ? 24 : 8,
                height: 8,
                borderRadius: 4,
                bgcolor: currentBanner === index ? banners[currentBanner].color : 'action.disabled',
                transition: 'all 0.3s',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: currentBanner === index ? banners[currentBanner].color : 'action.hover',
                },
              }}
            />
          ))}
        </Box>
      </Card>

      <Grid container spacing={3} sx={{ width: '100%', m: 0 }}>
        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <AnalyticsWidgetSummary
            title="项目"
            percent={2.6}
            total={68}
            icon={<img alt="项目" src={getAssetUrl('assets/icons/glass/ic-glass-bag.svg')} />}
            chart={{
              categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <AnalyticsWidgetSummary
            title="课程"
            percent={-0.1}
            total={245}
            color="secondary"
            icon={<img alt="课程" src={getAssetUrl('assets/icons/glass/ic-glass-users.svg')} />}
            chart={{
              categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
              series: [56, 47, 40, 62, 73, 30, 23, 54],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <AnalyticsWidgetSummary
            title="设备"
            percent={2.8}
            total={1523}
            color="warning"
            icon={<img alt="设备" src={getAssetUrl('assets/icons/glass/ic-glass-buy.svg')} />}
            chart={{
              categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
              series: [40, 70, 50, 28, 70, 75, 7, 64],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <AnalyticsWidgetSummary
            title="成果"
            percent={3.6}
            total={892}
            color="error"
            icon={<img alt="成果" src={getAssetUrl('assets/icons/glass/ic-glass-message.svg')} />}
            chart={{
              categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
              series: [56, 30, 23, 54, 47, 40, 62, 73],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <AnalyticsWidgetSummary
            title="BI"
            percent={5.2}
            total={156}
            color="success"
            icon={<img alt="BI" src={getAssetUrl('assets/icons/glass/ic-glass-buy.svg')} />}
            chart={{
              categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
              series: [30, 45, 60, 55, 70, 80, 85, 90],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsCurrentVisits
            title="资源分布统计"
            chart={{
              series: [
                { label: '项目', value: 248 },
                { label: '课程', value: 359 },
                { label: '设备', value: 127 },
                { label: '企业', value: 112 },
                { label: '学校', value: 68 },
              ],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsWebsiteVisits
            title="月度增长趋势"
            subheader="项目与课程新增趋势"
            chart={{
              categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月'],
              series: [
                { name: '新增项目', data: [18, 22, 15, 28, 32, 25, 20, 35, 28] },
                { name: '新增课程', data: [25, 35, 28, 42, 38, 45, 32, 48, 40] },
              ],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsConversionRates
            title="各类型项目数量对比"
            subheader="按项目类型统计"
            chart={{
              categories: ['智能制造', '数字经济', '现代服务', '文化创意', '医疗健康'],
              series: [
                { name: '2024年', data: [64, 55, 48, 38, 43] },
                { name: '2025年', data: [72, 68, 52, 45, 48] },
              ],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsCurrentSubject
            title="平台核心指标"
            chart={{
              categories: ['项目数', '企业数', '学校数', '课程数', '设备数', '学习人次'],
              series: [
                { name: '当前指标', data: [82, 75, 68, 95, 55, 88] },
                { name: '目标值', data: [90, 85, 80, 100, 70, 95] },
              ],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsNews
            title="通知公告"
            list={[
              {
                id: '1',
                title: '平台升级维护通知',
                description: '系统将于本周日凌晨2:00-5:00进行升级维护',
                coverUrl: getAssetUrl('assets/images/covers/cover-1.webp'),
                postedAt: new Date('2025-10-10').getTime(),
              },
              {
                id: '2',
                title: '2025年春季产教融合项目申报启动',
                description: '面向全省高校和企业开放项目申报通道',
                coverUrl: getAssetUrl('assets/images/covers/cover-2.webp'),
                postedAt: new Date('2025-10-09').getTime(),
              },
              {
                id: '3',
                title: '数字化转型专题培训班报名通知',
                description: '邀请行业专家授课，名额有限，先到先得',
                coverUrl: getAssetUrl('assets/images/covers/cover-3.webp'),
                postedAt: new Date('2025-10-08').getTime(),
              },
            ]}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsNews
            title="最新资讯"
            list={[
              {
                id: '4',
                title: '某科技大学与华为共建人工智能实验室',
                description: '校企合作推动AI人才培养新模式',
                coverUrl: getAssetUrl('assets/images/covers/cover-4.webp'),
                postedAt: new Date('2025-10-11').getTime(),
              },
              {
                id: '5',
                title: '智能制造产教融合基地正式投入使用',
                description: '配备先进设备，年培养能力达500人次',
                coverUrl: getAssetUrl('assets/images/covers/cover-5.webp'),
                postedAt: new Date('2025-10-10').getTime(),
              },
              {
                id: '6',
                title: '校企联合培养项目毕业生就业率达98%',
                description: '产教融合人才培养模式获得显著成效',
                coverUrl: getAssetUrl('assets/images/covers/cover-6.webp'),
                postedAt: new Date('2025-10-09').getTime(),
              },
            ]}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsNews
            title="政策文件"
            list={[
              {
                id: '7',
                title: '教育部：深化产教融合协同育人行动计划',
                description: '推动建立紧密对接产业链、创新链的学科专业体系',
                coverUrl: getAssetUrl('assets/images/covers/cover-7.webp'),
                postedAt: new Date('2025-10-05').getTime(),
              },
              {
                id: '8',
                title: '省政府关于加快发展现代职业教育的实施意见',
                description: '支持校企共建产业学院和企业学院',
                coverUrl: getAssetUrl('assets/images/covers/cover-8.webp'),
                postedAt: new Date('2025-09-28').getTime(),
              },
              {
                id: '9',
                title: '产教融合型企业建设培育实施办法',
                description: '明确产教融合型企业认定标准和支持政策',
                coverUrl: getAssetUrl('assets/images/covers/cover-9.webp'),
                postedAt: new Date('2025-09-20').getTime(),
              },
            ]}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsTasks
            title="推荐项目与课程"
            list={[
              {
                id: '1',
                name: '人工智能应用开发校企合作项目（正在招募）',
              },
              {
                id: '2',
                name: '智能制造技术实训课程（热门课程）',
              },
              {
                id: '3',
                name: '数字营销实战项目合作（正在招募）',
              },
              {
                id: '4',
                name: '工业互联网技术应用课程（新增课程）',
              },
              {
                id: '5',
                name: '大数据分析与可视化项目（合作中）',
              },
              {
                id: '6',
                name: 'UI/UX设计实战课程（热门推荐）',
              },
            ]}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsOrderTimeline
            title="推荐成果案例"
            list={[
              {
                id: '1',
                title: '智能仓储管理系统',
                time: '2025-10-08',
                type: 'order1',
              },
              {
                id: '2',
                title: '新能源汽车维修实训平台',
                time: '2025-10-01',
                type: 'order2',
              },
              {
                id: '3',
                title: '跨境电商运营实战项目',
                time: '2025-09-25',
                type: 'order3',
              },
              {
                id: '4',
                title: '虚拟现实教学系统',
                time: '2025-09-18',
                type: 'order4',
              },
              {
                id: '5',
                title: '智慧物流管理平台',
                time: '2025-09-10',
                type: 'order5',
              },
            ]}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <AnalyticsTrafficBySite
            title="合作企业"
            list={[
              {
                value: 'huawei',
                label: '华为技术有限公司',
                total: 28,
              },
              {
                value: 'tencent',
                label: '腾讯科技有限公司',
                total: 25,
              },
              {
                value: 'alibaba',
                label: '阿里巴巴集团',
                total: 32,
              },
              {
                value: 'baidu',
                label: '百度在线网络技术',
                total: 22,
              },
              {
                value: 'jd',
                label: '京东集团',
                total: 19,
              },
              {
                value: 'bytedance',
                label: '字节跳动科技',
                total: 26,
              },
            ]}
          />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
