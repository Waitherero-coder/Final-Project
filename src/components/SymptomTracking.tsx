import { useState } from 'react';
import { Calendar, Plus, Check } from 'lucide-react';
import { SymptomLog } from '../types';

interface SymptomTrackingProps {
  symptomLogs: SymptomLog[];
  onAddLog: (log: Omit<SymptomLog, 'id'>) => void;
}

const commonSymptoms = [
  'Fatigue',
  'Bloating',
  'Cramps',
  'Mood Swings',
  'Acne',
  'Hair Loss',
  'Weight Gain',
  'Irregular Period',
  'Headache',
  'Anxiety'
];

const moodOptions = ['Great', 'Good', 'Okay', 'Tired', 'Low'];

export default function SymptomTracking({ symptomLogs, onAddLog }: SymptomTrackingProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    mood: 'Good',
    energyLevel: 5,
    sleepHours: 7,
    symptoms: [] as string[],
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddLog(formData);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      mood: 'Good',
      energyLevel: 5,
      sleepHours: 7,
      symptoms: [],
      notes: ''
    });
    setShowForm(false);
  };

  const toggleSymptom = (symptom: string) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Symptom Tracking</h2>
          <p className="text-gray-600">Monitor your daily symptoms and patterns</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>New Entry</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Log Today's Symptoms</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mood
              </label>
              <div className="flex flex-wrap gap-2">
                {moodOptions.map((mood) => (
                  <button
                    key={mood}
                    type="button"
                    onClick={() => setFormData({ ...formData, mood })}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      formData.mood === mood
                        ? 'bg-rose-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Energy Level: {formData.energyLevel}/10
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.energyLevel}
                onChange={(e) => setFormData({ ...formData, energyLevel: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sleep Hours
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                max="24"
                value={formData.sleepHours}
                onChange={(e) => setFormData({ ...formData, sleepHours: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Symptoms
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {commonSymptoms.map((symptom) => (
                  <button
                    key={symptom}
                    type="button"
                    onClick={() => toggleSymptom(symptom)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center space-x-2 ${
                      formData.symptoms.includes(symptom)
                        ? 'bg-rose-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {formData.symptoms.includes(symptom) && <Check className="h-4 w-4" />}
                    <span>{symptom}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="Any additional observations..."
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 px-4 rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all"
              >
                Save Entry
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Recent Entries</h3>
        {symptomLogs.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No entries yet. Start tracking your symptoms to see patterns!</p>
          </div>
        ) : (
          symptomLogs.map((log) => (
            <LogCard key={log.id} log={log} />
          ))
        )}
      </div>
    </div>
  );
}

function LogCard({ log }: { log: SymptomLog }) {
  const date = new Date(log.date);
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="text-lg font-semibold text-gray-900">{formattedDate}</h4>
          <p className="text-sm text-gray-600">Mood: {log.mood}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Energy: {log.energyLevel}/10</p>
          <p className="text-sm text-gray-600">Sleep: {log.sleepHours}h</p>
        </div>
      </div>

      {log.symptoms.length > 0 && (
        <div className="mb-3">
          <p className="text-sm font-medium text-gray-700 mb-2">Symptoms:</p>
          <div className="flex flex-wrap gap-2">
            {log.symptoms.map((symptom) => (
              <span
                key={symptom}
                className="px-3 py-1 bg-rose-50 text-rose-700 text-xs font-medium rounded-full"
              >
                {symptom}
              </span>
            ))}
          </div>
        </div>
      )}

      {log.notes && (
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm text-gray-700">{log.notes}</p>
        </div>
      )}
    </div>
  );
}
