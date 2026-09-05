import React, { useState } from 'react';
import { Sidebar, NavView } from './components/Sidebar';
import { Header } from './components/Header';
import { CommandCentreView } from './components/CommandCentreView';
import { SimulatorView } from './components/SimulatorView';
import { BlockPlanningView } from './components/BlockPlanningView';
import { GisMapView } from './components/GisMapView';
import { FieldAppView } from './components/FieldAppView';
import { ImpactRolloutView } from './components/ImpactRolloutView';
import { BlockDetailDrawer } from './components/BlockDetailDrawer';
import { ProposeBlockModal } from './components/ProposeBlockModal';
import { PendingRequestsDrawer } from './components/PendingRequestsDrawer';
import { INITIAL_BLOCKS } from './data/mockData';
import { BlockItem } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<NavView>('command');
  const [blocks, setBlocks] = useState<BlockItem[]>(INITIAL_BLOCKS);
  const [selectedBlockId, setSelectedBlockId] = useState<string>('blk-001');
  const [planningFilter, setPlanningFilter] = useState<string>('all');
  const [megaBlockApproved, setMegaBlockApproved] = useState<boolean>(false);

  // Modals & Drawers
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isProposeModalOpen, setIsProposeModalOpen] = useState<boolean>(false);
  const [isPendingDrawerOpen, setIsPendingDrawerOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const pendingCount = blocks.filter((b) => b.status === 'Proposed').length;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3600);
  };

  const handleOpenDrawer = (blockId: string) => {
    setSelectedBlockId(blockId);
    setIsDrawerOpen(true);
  };

  const handleProposeNewBlock = (newBlock: BlockItem) => {
    setBlocks((prev) => [newBlock, ...prev]);
    setSelectedBlockId(newBlock.id);
    showToast(`✓ Block Request ${newBlock.code} submitted for AI coordination review.`);
  };

  const handleApproveBlock = (blockId: string) => {
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === blockId ? { ...b, status: 'Approved', interlocked: true } : b
      )
    );
    setIsDrawerOpen(false);
    showToast('✓ Block Approved: Track possession locked & dispatched.');
  };

  const handleOptimizeBlock = (_blockId: string) => {
    setIsDrawerOpen(false);
    setCurrentView('simulator');
    showToast('⚡ AI Optimization Engine loaded with Gwalior corridor constraints.');
  };

  const handleRejectBlock = (blockId: string) => {
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === blockId ? { ...b, status: 'Rejected' } : b
      )
    );
    setIsDrawerOpen(false);
    showToast('Block proposal returned for schedule adjustment.');
  };

  const handleApproveMegaBlock = () => {
    setMegaBlockApproved(true);
    setBlocks((prev) =>
      prev.map((b) => {
        if (b.code === 'MB-104') {
          return { ...b, status: 'Approved', interlocked: true };
        }
        if (b.code === 'BLK-001' || b.code === 'BLK-002' || b.code === 'BLK-003') {
          return { ...b, status: 'Approved' };
        }
        return b;
      })
    );
    showToast('✓ Mega-Block MB-104 approved — dispatched to Field Ops & SCADA Interlocking');
  };

  const handleApproveAllPendingIntoMega = () => {
    setMegaBlockApproved(true);
    setBlocks((prev) =>
      prev.map((b) => (b.status === 'Proposed' ? { ...b, status: 'Approved' } : b))
    );
    showToast('✓ All pending requests clustered and approved into synchronized possessions!');
  };

  const handleNavigateToPlanning = (dept?: string) => {
    if (dept) setPlanningFilter(dept);
    setCurrentView('planning');
  };

  const selectedBlock =
    blocks.find((b) => b.id === selectedBlockId) || blocks[0] || INITIAL_BLOCKS[0];

  return (
    <div id="shell" className="flex min-h-screen bg-[#F3F5F9] text-[#0F172A] font-sans">
      {/* 1. Sidebar (Sticky, 246px) */}
      <Sidebar
        currentView={currentView}
        onNavigate={setCurrentView}
        pendingRequestsCount={pendingCount}
      />

      {/* 2. Main Area */}
      <div id="main" className="flex-1 min-w-0 flex flex-col">
        {/* Sticky Topbar (Avatar SC removed per prompt) */}
        <Header
          currentView={currentView}
          pendingCount={pendingCount}
          onProposeBlock={() => setIsProposeModalOpen(true)}
          onTogglePending={() => setIsPendingDrawerOpen(true)}
        />

        {/* Dynamic Main View */}
        <main className="ml-[246px] mt-[84px] p-6 sm:p-8 flex-1 flex flex-col overflow-x-hidden">
          {currentView === 'command' && (
            <CommandCentreView
              blocks={blocks}
              onNavigateToSimulator={() => setCurrentView('simulator')}
              onNavigateToPlanning={handleNavigateToPlanning}
              onOpenDrawer={handleOpenDrawer}
              onApproveMegaBlock={handleApproveMegaBlock}
              megaBlockApproved={megaBlockApproved}
            />
          )}

          {currentView === 'simulator' && (
            <SimulatorView
              onDispatched={() => {
                showToast('✓ Optimized Mega-Block dispatched to Section Controllers & Field Crew!');
                setCurrentView('field');
              }}
            />
          )}

          {currentView === 'planning' && (
            <BlockPlanningView
              blocks={blocks}
              onSelectBlock={setSelectedBlockId}
              onOpenDrawer={handleOpenDrawer}
              onProposeBlock={() => setIsProposeModalOpen(true)}
              initialFilter={planningFilter}
            />
          )}

          {currentView === 'map' && <GisMapView />}

          {currentView === 'field' && (
            <FieldAppView onShowToast={(msg) => showToast(msg)} />
          )}

          {currentView === 'impact' && <ImpactRolloutView />}
        </main>
      </div>

      {/* Slide-out Block Review & Detail Drawer */}
      <BlockDetailDrawer
        block={selectedBlock}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onApprove={handleApproveBlock}
        onOptimize={handleOptimizeBlock}
        onReject={handleRejectBlock}
      />

      {/* Propose Block Request Modal */}
      <ProposeBlockModal
        isOpen={isProposeModalOpen}
        onClose={() => setIsProposeModalOpen(false)}
        onSubmitBlock={handleProposeNewBlock}
      />

      {/* Pending Requests Drawer */}
      <PendingRequestsDrawer
        isOpen={isPendingDrawerOpen}
        onClose={() => setIsPendingDrawerOpen(false)}
        blocks={blocks}
        onSelectBlock={handleOpenDrawer}
        onApproveBlock={handleApproveBlock}
        onApproveAllMega={handleApproveAllPendingIntoMega}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div
          id="toast"
          className="fixed bottom-5.5 right-5.5 bg-[#0A1220] text-white py-3.5 px-4.5 rounded-[10px] text-[13px] font-semibold flex items-center gap-2.5 shadow-2xl z-50 border border-[#25334F] animate-slide-up"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#22C55E"
            strokeWidth="2.4"
            className="shrink-0"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <path d="m22 4-10 10-3-3" />
          </svg>
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-white/60 hover:text-white ml-2 cursor-pointer text-xs"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
