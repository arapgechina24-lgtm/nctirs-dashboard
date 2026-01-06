// Type definitions for NCTIRS

export type ThreatLevel = 'critical' | 'high' | 'medium' | 'low' | 'info';
export type ThreatStatus = 'active' | 'contained' | 'investigating' | 'resolved';
export type AttackVector = 'phishing' | 'malware' | 'ddos' | 'ransomware' | 'data-breach' | 'credential-theft' | 'sql-injection' | 'zero-day' | 'apt' | 'insider-threat';
export type TargetSector = 'government' | 'financial' | 'healthcare' | 'education' | 'telecom' | 'energy' | 'transportation' | 'defense';
export type ResponseAction = 'block-ip' | 'quarantine-email' | 'isolate-system' | 'suspend-account' | 'dns-sinkhole' | 'firewall-rule' | 'alert-only';

export interface ThreatAlert {
  id: string;
  timestamp: Date;
  title: string;
  description: string;
  severity: ThreatLevel;
  status: ThreatStatus;
  attackVector: AttackVector;
  targetSystem: string;
  targetSector: TargetSector;
  sourceIP: string;
  sourceCountry: string;
  destinationIP: string;
  affectedAssets: string[];
  riskScore: number; // 0-100
  confidence: number; // 0-100
  indicators: {
    type: 'ip' | 'domain' | 'url' | 'hash' | 'email';
    value: string;
  }[];
  mitreAttack: {
    tactic: string;
    technique: string;
    id: string;
  }[];
  assignedTo?: string;
  responseActions: ResponseAction[];
}

export interface ThreatStatistics {
  total: number;
  byLevel: Record<ThreatLevel, number>;
  byVector: Record<AttackVector, number>;
  bySector: Record<TargetSector, number>;
  byStatus: Record<ThreatStatus, number>;
  blocked: number;
  investigating: number;
  resolved: number;
}

export interface SystemMetrics {
  timestamp: Date;
  threatsDetected: number;
  threatsBlocked: number;
  responseTime: number; // milliseconds
  falsePositives: number;
  systemLoad: number; // percentage
  activeAnalysts: number;
  modelsRunning: number;
  dataProcessed: number; // MB
}

export interface GeographicThreat {
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  threatCount: number;
  severity: ThreatLevel;
}

export interface MLModelMetrics {
  modelName: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  inferenceTime: number; // milliseconds
  lastUpdated: Date;
  version: string;
  status: 'active' | 'training' | 'deprecated';
}

export interface ComplianceStatus {
  category: string;
  score: number; // 0-100
  issues: number;
  lastAudit: Date;
  status: 'compliant' | 'warning' | 'non-compliant';
}

export interface IncidentTimeline {
  id: string;
  timestamp: Date;
  event: string;
  actor: string;
  action: string;
  details: string;
  severity: ThreatLevel;
}

export interface AgencyCollaboration {
  agencyName: string;
  agencyCode: string;
  threatsShared: number;
  incidentsReported: number;
  responseTime: number;
  lastContact: Date;
  status: 'active' | 'inactive';
}

export interface AutomatedResponse {
  id: string;
  timestamp: Date;
  threatId: string;
  action: ResponseAction;
  target: string;
  status: 'pending' | 'executing' | 'completed' | 'failed' | 'rolled-back';
  executionTime: number;
  impact: string;
  approvedBy: 'auto' | 'analyst';
  success: boolean;
}

export interface DataProtectionMetric {
  category: string;
  encryptedData: number; // GB
  accessRequests: number;
  deniedAccess: number;
  dataBreaches: number;
  complianceScore: number;
}
