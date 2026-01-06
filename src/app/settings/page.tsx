'use client';

import { Shield, Bell, Lock, Database, Zap, Users } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
        <p className="mt-2 text-sm text-gray-600">
          Configure NCTIRS system parameters and preferences
        </p>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Threat Detection Settings */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center space-x-3 border-b border-gray-200 pb-4">
            <Shield className="h-6 w-6 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900">Threat Detection</h3>
          </div>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Real-time Monitoring</p>
                <p className="text-sm text-gray-500">Enable continuous threat monitoring</p>
              </div>
              <input type="checkbox" className="h-5 w-5" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">ML Model Inference</p>
                <p className="text-sm text-gray-500">Use AI for threat classification</p>
              </div>
              <input type="checkbox" className="h-5 w-5" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Risk Score Threshold</p>
                <p className="text-sm text-gray-500">Minimum score for alerts</p>
              </div>
              <select className="rounded-lg border border-gray-300 px-3 py-2 text-sm">
                <option>60</option>
                <option>70</option>
                <option selected>80</option>
                <option>90</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center space-x-3 border-b border-gray-200 pb-4">
            <Bell className="h-6 w-6 text-yellow-500" />
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          </div>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Email Alerts</p>
                <p className="text-sm text-gray-500">Send critical alerts via email</p>
              </div>
              <input type="checkbox" className="h-5 w-5" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">SMS Notifications</p>
                <p className="text-sm text-gray-500">Emergency alerts only</p>
              </div>
              <input type="checkbox" className="h-5 w-5" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Dashboard Alerts</p>
                <p className="text-sm text-gray-500">In-app notifications</p>
              </div>
              <input type="checkbox" className="h-5 w-5" defaultChecked />
            </div>
          </div>
        </div>

        {/* Automated Response Settings */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center space-x-3 border-b border-gray-200 pb-4">
            <Zap className="h-6 w-6 text-orange-500" />
            <h3 className="text-lg font-semibold text-gray-900">Automated Response</h3>
          </div>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Auto-Block IPs</p>
                <p className="text-sm text-gray-500">Automatically block malicious IPs</p>
              </div>
              <input type="checkbox" className="h-5 w-5" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Email Quarantine</p>
                <p className="text-sm text-gray-500">Auto-quarantine phishing emails</p>
              </div>
              <input type="checkbox" className="h-5 w-5" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">System Isolation</p>
                <p className="text-sm text-gray-500">Isolate compromised systems</p>
              </div>
              <input type="checkbox" className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center space-x-3 border-b border-gray-200 pb-4">
            <Lock className="h-6 w-6 text-purple-500" />
            <h3 className="text-lg font-semibold text-gray-900">Security</h3>
          </div>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Multi-Factor Authentication</p>
                <p className="text-sm text-gray-500">Required for all users</p>
              </div>
              <input type="checkbox" className="h-5 w-5" defaultChecked disabled />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Session Timeout</p>
                <p className="text-sm text-gray-500">Auto-logout after inactivity</p>
              </div>
              <select className="rounded-lg border border-gray-300 px-3 py-2 text-sm">
                <option>15 min</option>
                <option selected>30 min</option>
                <option>1 hour</option>
                <option>2 hours</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">API Rate Limiting</p>
                <p className="text-sm text-gray-500">Requests per minute</p>
              </div>
              <select className="rounded-lg border border-gray-300 px-3 py-2 text-sm">
                <option>100</option>
                <option selected>500</option>
                <option>1000</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data Management Settings */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center space-x-3 border-b border-gray-200 pb-4">
            <Database className="h-6 w-6 text-green-500" />
            <h3 className="text-lg font-semibold text-gray-900">Data Management</h3>
          </div>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Data Retention Period</p>
                <p className="text-sm text-gray-500">Log retention duration</p>
              </div>
              <select className="rounded-lg border border-gray-300 px-3 py-2 text-sm">
                <option>1 year</option>
                <option>3 years</option>
                <option selected>5 years</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Auto-Backup</p>
                <p className="text-sm text-gray-500">Automatic system backups</p>
              </div>
              <input type="checkbox" className="h-5 w-5" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Data Encryption</p>
                <p className="text-sm text-gray-500">AES-256 encryption</p>
              </div>
              <input type="checkbox" className="h-5 w-5" defaultChecked disabled />
            </div>
          </div>
        </div>

        {/* Collaboration Settings */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center space-x-3 border-b border-gray-200 pb-4">
            <Users className="h-6 w-6 text-indigo-500" />
            <h3 className="text-lg font-semibold text-gray-900">Inter-Agency Collaboration</h3>
          </div>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Threat Intelligence Sharing</p>
                <p className="text-sm text-gray-500">Share threats with partners</p>
              </div>
              <input type="checkbox" className="h-5 w-5" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">STIX/TAXII Protocol</p>
                <p className="text-sm text-gray-500">Standard threat exchange</p>
              </div>
              <input type="checkbox" className="h-5 w-5" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Agency Notifications</p>
                <p className="text-sm text-gray-500">Notify partner agencies</p>
              </div>
              <input type="checkbox" className="h-5 w-5" defaultChecked />
            </div>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">System Information</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <p className="text-sm text-gray-500">Version</p>
            <p className="font-semibold text-gray-900">NCTIRS v1.0.0</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Updated</p>
            <p className="font-semibold text-gray-900">January 3, 2026</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">System Status</p>
            <p className="font-semibold text-green-600">Operational</p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">
          Save Settings
        </button>
      </div>
    </div>
  );
}
