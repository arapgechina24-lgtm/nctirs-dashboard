// Mock data generator for NCTIRS dashboard

import type {
  ThreatAlert,
  ThreatStatistics,
  SystemMetrics,
  GeographicThreat,
  MLModelMetrics,
  ComplianceStatus,
  IncidentTimeline,
  AgencyCollaboration,
  AutomatedResponse,
  DataProtectionMetric,
  ThreatLevel,
  AttackVector,
  TargetSector,
  ResponseAction,
  ThreatStatus,
} from '@/types';

// Kenyan government systems and agencies
const KENYAN_SYSTEMS = [
  'eCitizen Portal',
  'Huduma Kenya',
  'IFMIS',
  'Digital ID System',
  'KRA iTax',
  'National Police Service Portal',
  'Ministry of Health System',
  'TSC Portal',
  'NTSA Portal',
  'Kenya Power Systems',
  'CBK Core Banking',
  'Safaricom M-Pesa Gateway',
];

const KENYAN_AGENCIES = [
  { name: 'Communications Authority', code: 'CA' },
  { name: 'Kenya Revenue Authority', code: 'KRA' },
  { name: 'National Police Service', code: 'NPS' },
  { name: 'Central Bank of Kenya', code: 'CBK' },
  { name: 'Ministry of ICT', code: 'MICT' },
  { name: 'Data Protection Commission', code: 'DPC' },
  { name: 'National Intelligence Service', code: 'NIS' },
  { name: 'Kenya Defence Forces', code: 'KDF' },
];

const KENYAN_IPS = [
  '197.248.0.0',
  '41.80.0.0',
  '105.48.0.0',
  '154.126.0.0',
  '196.201.0.0',
];

const THREAT_COUNTRIES = [
  { name: 'China', code: 'CN', lat: 35.8617, lon: 104.1954 },
  { name: 'Russia', code: 'RU', lat: 61.524, lon: 105.3188 },
  { name: 'Nigeria', code: 'NG', lat: 9.082, lon: 8.6753 },
  { name: 'United States', code: 'US', lat: 37.0902, lon: -95.7129 },
  { name: 'North Korea', code: 'KP', lat: 40.3399, lon: 127.5101 },
  { name: 'Iran', code: 'IR', lat: 32.4279, lon: 53.688 },
  { name: 'Romania', code: 'RO', lat: 45.9432, lon: 24.9668 },
  { name: 'India', code: 'IN', lat: 20.5937, lon: 78.9629 },
  { name: 'Brazil', code: 'BR', lat: -14.235, lon: -51.9253 },
];

const MITRE_TECHNIQUES = [
  { tactic: 'Initial Access', technique: 'Phishing', id: 'T1566' },
  { tactic: 'Execution', technique: 'Command and Scripting Interpreter', id: 'T1059' },
  { tactic: 'Persistence', technique: 'Account Manipulation', id: 'T1098' },
  { tactic: 'Privilege Escalation', technique: 'Exploitation for Privilege Escalation', id: 'T1068' },
  { tactic: 'Defense Evasion', technique: 'Obfuscated Files or Information', id: 'T1027' },
  { tactic: 'Credential Access', technique: 'Brute Force', id: 'T1110' },
  { tactic: 'Discovery', technique: 'Network Service Discovery', id: 'T1046' },
  { tactic: 'Lateral Movement', technique: 'Remote Services', id: 'T1021' },
  { tactic: 'Collection', technique: 'Data from Local System', id: 'T1005' },
  { tactic: 'Exfiltration', technique: 'Exfiltration Over C2 Channel', id: 'T1041' },
];

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function randomIP(): string {
  return `${randomInt(1, 255)}.${randomInt(0, 255)}.${randomInt(0, 255)}.${randomInt(0, 255)}`;
}

function generateHash(): string {
  return Array.from({ length: 64 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
}

export function generateThreatAlert(): ThreatAlert {
  const severities: ThreatLevel[] = ['critical', 'high', 'medium', 'low', 'info'];
  const vectors: AttackVector[] = ['phishing', 'malware', 'ddos', 'ransomware', 'data-breach', 'credential-theft', 'sql-injection', 'zero-day', 'apt', 'insider-threat'];
  const sectors: TargetSector[] = ['government', 'financial', 'healthcare', 'education', 'telecom', 'energy', 'transportation', 'defense'];
  const statuses: ThreatStatus[] = ['active', 'contained', 'investigating', 'resolved'];
  const actions: ResponseAction[] = ['block-ip', 'quarantine-email', 'isolate-system', 'suspend-account', 'dns-sinkhole', 'firewall-rule', 'alert-only'];

  const severity = randomItem(severities);
  const vector = randomItem(vectors);
  const country = randomItem(THREAT_COUNTRIES);

  const titles: Record<AttackVector, string[]> = {
    phishing: ['Spear Phishing Campaign Detected', 'Credential Harvesting Attempt', 'Fake Government Portal'],
    malware: ['Trojan Detected in System', 'Ransomware Activity Identified', 'Backdoor Installation Attempt'],
    ddos: ['DDoS Attack on Government Portal', 'Distributed Denial of Service', 'Botnet Activity Detected'],
    ransomware: ['Ransomware Encryption Detected', 'Crypto-Locker Variant Found', 'File Encryption in Progress'],
    'data-breach': ['Unauthorized Data Access', 'Database Exfiltration Attempt', 'Sensitive Data Leak Detected'],
    'credential-theft': ['Credential Dumping Activity', 'Password Spray Attack', 'Stolen Credentials Used'],
    'sql-injection': ['SQL Injection Attempt', 'Database Query Manipulation', 'Web Application Exploit'],
    'zero-day': ['Zero-Day Exploit Detected', 'Unknown Vulnerability Exploited', 'Novel Attack Pattern'],
    apt: ['Advanced Persistent Threat Activity', 'State-Sponsored Attack', 'Long-Term Infiltration'],
    'insider-threat': ['Suspicious Insider Activity', 'Unauthorized Access by Employee', 'Data Theft by Insider'],
  };

  return {
    id: `THR-${Date.now()}-${randomInt(1000, 9999)}`,
    timestamp: new Date(Date.now() - randomInt(0, 3600000)),
    title: randomItem(titles[vector]),
    description: `${vector} attack targeting ${randomItem(KENYAN_SYSTEMS)} from ${country.name}. Automated systems detected suspicious patterns matching known threat signatures.`,
    severity,
    status: randomItem(statuses),
    attackVector: vector,
    targetSystem: randomItem(KENYAN_SYSTEMS),
    targetSector: randomItem(sectors),
    sourceIP: randomIP(),
    sourceCountry: country.name,
    destinationIP: randomItem(KENYAN_IPS) + '.' + randomInt(1, 254),
    affectedAssets: Array.from({ length: randomInt(1, 5) }, () => randomItem(KENYAN_SYSTEMS)),
    riskScore: severity === 'critical' ? randomInt(80, 100) :
                severity === 'high' ? randomInt(60, 85) :
                severity === 'medium' ? randomInt(40, 65) :
                randomInt(10, 45),
    confidence: randomInt(70, 99),
    indicators: [
      { type: 'ip', value: randomIP() },
      { type: 'domain', value: `malicious-${randomInt(1000, 9999)}.${randomItem(['com', 'net', 'org', 'ru', 'cn'])}` },
      { type: 'hash', value: generateHash() },
    ],
    mitreAttack: [randomItem(MITRE_TECHNIQUES)],
    responseActions: Array.from({ length: randomInt(1, 3) }, () => randomItem(actions)),
  };
}

export function generateThreatStatistics(): ThreatStatistics {
  const total = randomInt(500, 2000);

  return {
    total,
    byLevel: {
      critical: randomInt(10, 50),
      high: randomInt(50, 150),
      medium: randomInt(100, 300),
      low: randomInt(200, 500),
      info: randomInt(100, 400),
    },
    byVector: {
      phishing: randomInt(50, 200),
      malware: randomInt(40, 150),
      ddos: randomInt(20, 80),
      ransomware: randomInt(10, 40),
      'data-breach': randomInt(15, 60),
      'credential-theft': randomInt(30, 120),
      'sql-injection': randomInt(25, 100),
      'zero-day': randomInt(5, 20),
      apt: randomInt(5, 15),
      'insider-threat': randomInt(10, 40),
    },
    bySector: {
      government: randomInt(100, 400),
      financial: randomInt(80, 300),
      healthcare: randomInt(50, 200),
      education: randomInt(40, 150),
      telecom: randomInt(60, 250),
      energy: randomInt(30, 120),
      transportation: randomInt(20, 100),
      defense: randomInt(15, 80),
    },
    byStatus: {
      active: randomInt(50, 200),
      contained: randomInt(100, 300),
      investigating: randomInt(80, 250),
      resolved: randomInt(200, 800),
    },
    blocked: randomInt(300, 1200),
    investigating: randomInt(50, 200),
    resolved: randomInt(400, 1500),
  };
}

export function generateSystemMetrics(): SystemMetrics {
  return {
    timestamp: new Date(),
    threatsDetected: randomInt(100, 500),
    threatsBlocked: randomInt(80, 450),
    responseTime: randomInt(50, 800),
    falsePositives: randomInt(5, 30),
    systemLoad: randomInt(40, 85),
    activeAnalysts: randomInt(15, 45),
    modelsRunning: randomInt(8, 12),
    dataProcessed: randomInt(1000, 5000),
  };
}

export function generateGeographicThreats(): GeographicThreat[] {
  return THREAT_COUNTRIES.map(country => ({
    country: country.name,
    countryCode: country.code,
    latitude: country.lat,
    longitude: country.lon,
    threatCount: randomInt(10, 200),
    severity: randomItem(['critical', 'high', 'medium', 'low'] as ThreatLevel[]),
  }));
}

export function generateMLModelMetrics(): MLModelMetrics[] {
  const models = [
    'Anomaly Detection Engine',
    'Phishing Classifier',
    'Malware Detection Model',
    'Behavioral Analysis Model',
    'DDoS Prediction Model',
    'Threat Intelligence NLP',
  ];

  return models.map(model => ({
    modelName: model,
    accuracy: randomInt(88, 99) / 100,
    precision: randomInt(85, 98) / 100,
    recall: randomInt(86, 97) / 100,
    f1Score: randomInt(87, 98) / 100,
    inferenceTime: randomInt(50, 300),
    lastUpdated: new Date(Date.now() - randomInt(0, 86400000 * 7)),
    version: `v${randomInt(1, 3)}.${randomInt(0, 9)}.${randomInt(0, 9)}`,
    status: randomItem(['active', 'active', 'active', 'training'] as const),
  }));
}

export function generateComplianceStatus(): ComplianceStatus[] {
  const categories = [
    'Data Protection Act 2019',
    'ISO 27001 Compliance',
    'Access Control Policies',
    'Encryption Standards',
    'Audit Logging',
    'Incident Response',
    'Data Retention',
    'Privacy Controls',
  ];

  return categories.map(category => {
    const score = randomInt(75, 100);
    return {
      category,
      score,
      issues: score < 85 ? randomInt(1, 5) : 0,
      lastAudit: new Date(Date.now() - randomInt(0, 86400000 * 30)),
      status: score >= 90 ? 'compliant' : score >= 75 ? 'warning' : 'non-compliant',
    };
  });
}

export function generateIncidentTimeline(threatId: string): IncidentTimeline[] {
  const events = [
    { event: 'Threat Detected', action: 'Automated detection triggered', actor: 'AI Detection Engine' },
    { event: 'Analysis Started', action: 'Deep analysis initiated', actor: 'Threat Analytics' },
    { event: 'Risk Assessed', action: 'Risk score calculated', actor: 'Risk Engine' },
    { event: 'Alert Sent', action: 'Notification sent to analysts', actor: 'Alert System' },
    { event: 'Investigation', action: 'Manual review started', actor: 'Security Analyst' },
    { event: 'Containment', action: 'Threat isolated', actor: 'ARCM System' },
    { event: 'Mitigation', action: 'Response actions executed', actor: 'Automated Response' },
  ];

  const startTime = Date.now() - randomInt(300000, 3600000);

  return events.map((evt, index) => ({
    id: `${threatId}-EVT-${index}`,
    timestamp: new Date(startTime + (index * randomInt(60000, 300000))),
    event: evt.event,
    actor: evt.actor,
    action: evt.action,
    details: `${evt.action} - Status: Completed`,
    severity: index < 2 ? 'critical' : index < 4 ? 'high' : 'medium' as ThreatLevel,
  }));
}

export function generateAgencyCollaboration(): AgencyCollaboration[] {
  return KENYAN_AGENCIES.map(agency => ({
    agencyName: agency.name,
    agencyCode: agency.code,
    threatsShared: randomInt(20, 150),
    incidentsReported: randomInt(10, 80),
    responseTime: randomInt(5, 60),
    lastContact: new Date(Date.now() - randomInt(0, 86400000 * 3)),
    status: Math.random() > 0.1 ? 'active' : 'inactive' as const,
  }));
}

export function generateAutomatedResponses(): AutomatedResponse[] {
  const actions: ResponseAction[] = ['block-ip', 'quarantine-email', 'isolate-system', 'suspend-account', 'dns-sinkhole', 'firewall-rule'];

  return Array.from({ length: randomInt(5, 15) }, (_, i) => {
    const action = randomItem(actions);
    const status = randomItem(['completed', 'completed', 'completed', 'executing', 'failed'] as const);

    return {
      id: `RESP-${Date.now()}-${i}`,
      timestamp: new Date(Date.now() - randomInt(0, 3600000)),
      threatId: `THR-${Date.now()}-${randomInt(1000, 9999)}`,
      action,
      target: action === 'block-ip' ? randomIP() : randomItem(KENYAN_SYSTEMS),
      status,
      executionTime: randomInt(100, 5000),
      impact: `${action} executed successfully on target`,
      approvedBy: Math.random() > 0.2 ? 'auto' : 'analyst',
      success: status === 'completed',
    };
  });
}

export function generateDataProtectionMetrics(): DataProtectionMetric[] {
  return [
    {
      category: 'Encrypted Data',
      encryptedData: randomInt(100, 500),
      accessRequests: randomInt(1000, 5000),
      deniedAccess: randomInt(10, 100),
      dataBreaches: 0,
      complianceScore: randomInt(92, 100),
    },
    {
      category: 'Access Control',
      encryptedData: 0,
      accessRequests: randomInt(2000, 8000),
      deniedAccess: randomInt(50, 200),
      dataBreaches: randomInt(0, 2),
      complianceScore: randomInt(85, 98),
    },
    {
      category: 'Audit Logs',
      encryptedData: randomInt(50, 200),
      accessRequests: randomInt(5000, 15000),
      deniedAccess: 0,
      dataBreaches: 0,
      complianceScore: randomInt(95, 100),
    },
  ];
}

// Real-time data stream simulation
export function createThreatStream(callback: (threat: ThreatAlert) => void, interval = 5000) {
  const intervalId = setInterval(() => {
    callback(generateThreatAlert());
  }, interval);

  return () => clearInterval(intervalId);
}
