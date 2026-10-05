import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TopBar } from '../components/TopBar';
import { StatusBadge } from '../components/ui/Badge';

export const ProjectsListScreen: React.FC = () => {
  const navigate = useNavigate();
  const { projects, setActiveProjectId, t } = useApp();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'DONE'>('ALL');

  const filtered = projects.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.foodName.toLowerCase().includes(search.toLowerCase());
    if (filter === 'ACTIVE') return matchSearch && !['EVALUATED', 'COMPLETED', 'FEEDBACK'].includes(p.status);
    if (filter === 'DONE') return matchSearch && ['EVALUATED', 'COMPLETED', 'FEEDBACK'].includes(p.status);
    return matchSearch;
  });

  const navigate2 = (proj: typeof projects[0]) => {
    setActiveProjectId(proj.id);
    const s = proj.status;
    if (['QUOTES_RECEIVED', 'QUOTES_PENDING'].includes(s)) navigate(`/app/projects/${proj.id}/quotes`);
    else if (['ORDER_PLACED', 'DISPATCHED', 'IN_PRODUCTION'].includes(s)) navigate(`/app/projects/${proj.id}/order`);
    else if (['EVALUATED', 'COMPLETED', 'FEEDBACK'].includes(s)) navigate(`/app/projects/${proj.id}/performance`);
    else navigate(`/app/projects/${proj.id}/blueprint`);
  };

  const foodEmojis: Record<string, string> = {
    Fruit: '🍎', Vegetable: '🥦', Processed: '📦', Leafy: '🥬',
  };

  return (
    <div className="screen">
      <TopBar />

      <div className="px-4 pt-2 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-gray-900">{t('My Projects', 'मेरे प्रोजेक्ट्स')}</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {t(`${projects.length} packaging plans tracked`, `${projects.length} पैकेजिंग प्लान`)}
            </p>
          </div>
          <button
            onClick={() => navigate('/app/projects/new')}
            className="w-10 h-10 rounded-2xl bg-green-600 hover:bg-green-700 text-white flex items-center justify-center cursor-pointer shadow-md shadow-green-500/25"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('Search by crop name…', 'फसल का नाम खोजें…')}
            className="form-input pl-9 text-sm"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          {[
            { id: 'ALL', label: `All (${projects.length})` },
            { id: 'ACTIVE', label: 'Active' },
            { id: 'DONE', label: 'Done' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                filter === tab.id ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Project List */}
        {filtered.length === 0 ? (
          <div className="card p-8 text-center">
            <div className="text-4xl mb-3">📦</div>
            <h3 className="font-bold text-gray-900 mb-1">No projects found</h3>
            <p className="text-sm text-gray-500 mb-4">Create your first packaging plan to get started.</p>
            <button
              onClick={() => navigate('/app/projects/new')}
              className="btn-brand py-2.5 px-5 text-sm mx-auto"
            >
              <Plus size={16} /> Create Project
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((proj) => (
              <div
                key={proj.id}
                onClick={() => navigate2(proj)}
                className="card card-hover p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-2xl shrink-0">
                      {foodEmojis[proj.foodCategory] || '📦'}
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-gray-900 leading-snug">{proj.title}</h3>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {proj.targetShelfLifeDays} day target · {proj.storageType?.split(' ')[0]}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={proj.status} />
                </div>

                <div className="flex items-center justify-between text-xs border-t border-gray-100 pt-2.5">
                  <span className="text-gray-400">Created {proj.createdAt}</span>
                  <span className="text-green-600 font-bold flex items-center gap-0.5">
                    View <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
