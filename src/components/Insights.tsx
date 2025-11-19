import { TrendingUp, TrendingDown, Minus, AlertCircle, Sparkles } from 'lucide-react';
import { SymptomLog, HealthMetric } from '../types';

interface InsightsProps {
  symptomLogs: SymptomLog[];
  healthMetrics: HealthMetric[];
}

export default function Insights({ symptomLogs, healthMetrics }: InsightsProps) {
  const insights = generateInsights(symptomLogs, healthMetrics);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Personal Insights</h2>
        <p className="text-gray-600">AI-powered analysis of your health patterns</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Energy Trend"
          value={insights.energyTrend.value}
          trend={insights.energyTrend.trend}
          description={insights.energyTrend.description}
        />
        <MetricCard
          title="Sleep Quality"
          value={insights.sleepTrend.value}
          trend={insights.sleepTrend.trend}
          description={insights.sleepTrend.description}
        />
        <MetricCard
          title="Symptom Frequency"
          value={insights.symptomFrequency.value}
          trend={insights.symptomFrequency.trend}
          description={insights.symptomFrequency.description}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Common Symptoms</h3>
          <div className="space-y-3">
            {insights.topSymptoms.map((item, index) => (
              <div key={item.symptom} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl font-bold text-gray-300">#{index + 1}</span>
                  <span className="text-gray-900 font-medium">{item.symptom}</span>
                </div>
                <span className="text-sm text-gray-600">{item.count} times</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Mood Distribution</h3>
          <div className="space-y-3">
            {insights.moodDistribution.map((item) => (
              <div key={item.mood}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-700 font-medium">{item.mood}</span>
                  <span className="text-gray-600">{item.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-rose-500 to-pink-500 h-2 rounded-full transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Personalized Recommendations</h3>
        {insights.recommendations.map((rec, index) => (
          <RecommendationCard key={index} recommendation={rec} />
        ))}
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, description }: {
  title: string;
  value: string;
  trend: 'up' | 'down' | 'stable';
  description: string;
}) {
  const trendIcon = trend === 'up' ? (
    <TrendingUp className="h-5 w-5 text-green-500" />
  ) : trend === 'down' ? (
    <TrendingDown className="h-5 w-5 text-red-500" />
  ) : (
    <Minus className="h-5 w-5 text-gray-500" />
  );

  const trendColor = trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-500';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-gray-600">{title}</h4>
        {trendIcon}
      </div>
      <p className={`text-3xl font-bold mb-2 ${trendColor}`}>{value}</p>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

function RecommendationCard({ recommendation }: { recommendation: { type: string; title: string; description: string } }) {
  const icons = {
    success: <Sparkles className="h-5 w-5 text-green-500" />,
    warning: <AlertCircle className="h-5 w-5 text-orange-500" />,
    info: <AlertCircle className="h-5 w-5 text-blue-500" />
  };

  const colors = {
    success: 'border-green-200 bg-green-50',
    warning: 'border-orange-200 bg-orange-50',
    info: 'border-blue-200 bg-blue-50'
  };

  return (
    <div className={`rounded-xl border p-6 ${colors[recommendation.type as keyof typeof colors]}`}>
      <div className="flex items-start space-x-3">
        <div className="mt-0.5">
          {icons[recommendation.type as keyof typeof icons]}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-1">{recommendation.title}</h4>
          <p className="text-gray-700 text-sm">{recommendation.description}</p>
        </div>
      </div>
    </div>
  );
}

function generateInsights(symptomLogs: SymptomLog[], healthMetrics: HealthMetric[]) {
  const avgEnergy =
    symptomLogs.length > 0
      ? symptomLogs.reduce((sum, log) => sum + log.energyLevel, 0) / symptomLogs.length
      : 0;

  const avgSleep =
    symptomLogs.length > 0
      ? symptomLogs.reduce((sum, log) => sum + log.sleepHours, 0) / symptomLogs.length
      : 0;

  const recentEnergy =
    symptomLogs.slice(0, 2).reduce((sum, log) => sum + log.energyLevel, 0) /
      Math.min(2, symptomLogs.length) || 0;

  const olderEnergy =
    symptomLogs.slice(2, 4).reduce((sum, log) => sum + log.energyLevel, 0) /
      Math.min(2, symptomLogs.slice(2).length) || recentEnergy;

  // Helper to get trend safely
  function getTrend(value: number, low: number, high: number): 'up' | 'down' | 'stable' {
    if (value > high) return 'up';
    if (value < low) return 'down';
    return 'stable';
  }

  const energyTrendValue: 'up' | 'down' | 'stable' = getTrend(recentEnergy - olderEnergy, -0.5, 0.5);
  const sleepTrendValue: 'up' | 'down' | 'stable' = getTrend(avgSleep, 6, 7);
  const symptomFrequencyTrend: 'up' | 'down' | 'stable' = 'stable';

  // Top symptoms
  const symptomCounts: Record<string, number> = {};
  symptomLogs.forEach(log => {
    log.symptoms.forEach(symptom => {
      symptomCounts[symptom] = (symptomCounts[symptom] || 0) + 1;
    });
  });

  const topSymptoms = Object.entries(symptomCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([symptom, count]) => ({ symptom, count }));

  // Mood distribution
  const moodCounts: Record<string, number> = {};
  symptomLogs.forEach(log => {
    moodCounts[log.mood] = (moodCounts[log.mood] || 0) + 1;
  });

  const moodDistribution = Object.entries(moodCounts)
    .map(([mood, count]) => ({
      mood,
      percentage: Math.round((count / symptomLogs.length) * 100)
    }))
    .sort((a, b) => b.percentage - a.percentage);

  // Recommendations
  const recommendations = [];

  if (avgSleep < 7) {
    recommendations.push({
      type: 'warning',
      title: 'Improve Sleep Duration',
      description:
        'Your average sleep is below 7 hours. Aim for 7-9 hours of quality sleep to improve hormone balance and reduce PCOS symptoms.'
    });
  } else {
    recommendations.push({
      type: 'success',
      title: 'Great Sleep Habits!',
      description:
        "You're maintaining good sleep duration. Keep up this healthy habit for optimal hormone regulation."
    });
  }

  if (avgEnergy < 6) {
    recommendations.push({
      type: 'warning',
      title: 'Address Low Energy Levels',
      description:
        'Consider increasing physical activity, staying hydrated, and reviewing your nutrition. Low energy could indicate insulin resistance.'
    });
  }

  const totalExercise = healthMetrics.reduce((sum, m) => sum + (m.exerciseMinutes || 0), 0);
  if (totalExercise < 150) {
    recommendations.push({
      type: 'info',
      title: 'Increase Physical Activity',
      description:
        'Aim for 150 minutes of moderate exercise per week. Regular movement helps improve insulin sensitivity and manage PCOS symptoms.'
    });
  }

  if (topSymptoms.length > 0 && topSymptoms[0].count >= 2) {
    recommendations.push({
      type: 'info',
      title: `Monitor ${topSymptoms[0].symptom}`,
      description:
        'This is your most frequent symptom. Consider discussing management strategies with your healthcare provider.'
    });
  }

  return {
    energyTrend: {
      value: avgEnergy.toFixed(1),
      trend: energyTrendValue,
      description:
        energyTrendValue === 'up'
          ? 'Improving over time'
          : energyTrendValue === 'down'
          ? 'Needs attention'
          : 'Maintaining steady'
    },
    sleepTrend: {
      value: `${avgSleep.toFixed(1)}h`,
      trend: sleepTrendValue,
      description:
        sleepTrendValue === 'up'
          ? 'Meeting recommendations'
          : sleepTrendValue === 'stable'
          ? 'Below optimal range'
          : 'Below optimal range'
    },
    symptomFrequency: {
      value: topSymptoms.length > 0 ? topSymptoms[0].count.toString() : '0',
      trend: symptomFrequencyTrend,
      description: 'Most common symptom count'
    },
    topSymptoms: topSymptoms.length > 0 ? topSymptoms : [{ symptom: 'No symptoms logged', count: 0 }],
    moodDistribution: moodDistribution.length > 0 ? moodDistribution : [{ mood: 'No data', percentage: 0 }],
    recommendations
  };
}
