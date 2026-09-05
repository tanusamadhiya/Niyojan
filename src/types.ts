export type Department = 'Civil' | 'Signal' | 'Traction' | 'MegaBlock';

export type BlockStatus = 'Proposed' | 'Approved' | 'InProgress' | 'Completed' | 'Rejected';

export interface BlockItem {
  id: string;
  code: string;
  title: string;
  section: string;
  trackLine: string;
  chainage: string;
  startTime: string;
  endTime: string;
  durationHours: number;
  department: Department;
  subType?: string;
  machine?: string;
  status: BlockStatus;
  riskFactor: number; // 0-100
  riskLevel: 'Low' | 'Medium' | 'High';
  hasConflict?: boolean;
  conflictDetails?: string;
  interlocked?: boolean;
  token?: string;
  description: string;
  delayImpactMinutes?: number;
  savingsLakhs?: number;
}

export interface ConflictAlert {
  id: string;
  type: 'Critical' | 'Warning' | 'Opportunity';
  title: string;
  location: string;
  timeRemaining: string;
  description: string;
  prescriptiveAction: string;
  recoverySuccess: string;
  delayImpact: string;
  resolved: boolean;
  resolutionNote?: string;
}

export interface TrainRake {
  id: string;
  number: string;
  name: string;
  type: 'Vande Bharat' | 'Rajdhani' | 'Superfast' | 'Freight' | 'Maintenance';
  speedKmH: number;
  currentKm: string;
  track: string;
  direction: 'UP' | 'DOWN';
  status: 'On-Time' | 'Regulated' | 'Holding Loop' | 'Passing';
  delayMinutes: number;
  headwayMargin: string;
}

export interface StationNode {
  id: string;
  name: string;
  code: string;
  km: number;
  interlockType: string;
  x: number; // SVG coordinate
  y: number;
  hasLoop: boolean;
}

export interface WeeklyForecast {
  week: string;
  dateRange: string;
  totalHours: number;
  civilHours: number;
  signalHours: number;
  tractionHours: number;
  safeCeiling: number;
  isBreach: boolean;
  breachExcessHours?: number;
}

export interface SafetyChecklistItem {
  id: string;
  label: string;
  mandatory: boolean;
  checked: boolean;
  lockedBy?: string;
}

export interface FieldPhoto {
  id: string;
  title: string;
  timestamp: string;
  location: string;
  url: string;
  tag: string;
}
