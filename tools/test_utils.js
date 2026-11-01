/**
 * DOCWEB MULTIGLOSSARY — E2E Test Suite Utilities
 * Pure Node.js zero-dependency test assertion harness.
 * Supports Feature Tracking (F1-F25) and Tier Classification (Tiers 1-4).
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

const FEATURES = {
  F1: 'Non-invasive Codebase Preservation',
  F2: '100% Offline Autonomy Guarantee',
  F3: '177 Primary Terms Integration',
  F4: 'Discrepancy & Duplicate Reconciliation',
  F5: 'Original Rigorous Technical Definitions',
  F6: 'Non-navigable Metadata Provenance',
  F7: 'Expanded AI/LLM Generative Video Terms',
  F8: 'Multi-glossary Catalog Registration',
  F9: 'Cross-Glossary Interconnection',
  F10: '15-Pair Bidirectional Relationship Model',
  F11: 'Schema.org JSON-LD DefinedTerm Integration',
  F12: 'Semantic HTML5 DOM Rendering',
  F13: 'Real-time Search & Multi-field Indexing',
  F14: 'A-Z Navigation & Category Filters',
  F15: 'Contextual SVG Graph Diagram',
  F16: 'Audiovisual Product Taxonomy (14 products)',
  F17: 'Determinant Production Attributes (11 attributes)',
  F18: 'AI Prompt Intention Orientator Module',
  F19: 'Term Linkage in AI Prompt Orientator',
  F20: 'IndexedDB Custom Term Persistence',
  F21: 'SHA-256 Web Crypto Integrity Hash',
  F22: 'JSON Capsule Import / Export',
  F23: 'Decoupled Shared Multi-glossary Architecture',
  F24: 'Complete E2E Automated Verification',
  F25: 'Adversarial Coverage Hardening'
};

const TIERS = {
  1: 'Tier 1 — Unit & Smoke Verification',
  2: 'Tier 2 — Boundary Value & Robustness Analysis',
  3: 'Tier 3 — Pairwise Integration & Cross-Subsystem Integrity',
  4: 'Tier 4 — Real-World Application Workloads'
};

const COLORS = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m'
};

class TestRunner {
  constructor(suiteName) {
    this.suiteName = suiteName;
    this.results = [];
    this.startTime = Date.now();
  }

  record(status, message, meta = {}) {
    const entry = {
      status, // 'PASS', 'FAIL', 'PENDING'
      message,
      feature: meta.feature || 'F24',
      tier: meta.tier || 1,
      error: meta.error || null,
      details: meta.details || null
    };
    this.results.push(entry);

    const symbol = status === 'PASS' 
      ? `${COLORS.green}✔ PASS${COLORS.reset}`
      : status === 'FAIL'
        ? `${COLORS.red}✖ FAIL${COLORS.reset}`
        : `${COLORS.yellow}⚑ PEND${COLORS.reset}`;

    const tag = `[${entry.feature}][T${entry.tier}]`;
    console.log(`  ${symbol} ${COLORS.dim}${tag}${COLORS.reset} ${message}`);
    if (meta.error) {
      console.log(`      ${COLORS.red}Error: ${meta.error.message || meta.error}${COLORS.reset}`);
    }
  }

  assert(condition, message, meta = {}) {
    if (condition) {
      this.record('PASS', message, meta);
      return true;
    } else {
      this.record('FAIL', message, meta);
      return false;
    }
  }

  assertEqual(actual, expected, message, meta = {}) {
    const pass = actual === expected;
    if (pass) {
      this.record('PASS', message, meta);
    } else {
      this.record('FAIL', message, {
        ...meta,
        details: { actual, expected },
        error: new Error(`Expected "${expected}", received "${actual}"`)
      });
    }
    return pass;
  }

  assertDeepEqual(actual, expected, message, meta = {}) {
    const actStr = JSON.stringify(actual);
    const expStr = JSON.stringify(expected);
    const pass = actStr === expStr;
    if (pass) {
      this.record('PASS', message, meta);
    } else {
      this.record('FAIL', message, {
        ...meta,
        details: { actual, expected },
        error: new Error(`Deep equality failed: ${actStr.substring(0, 100)}... vs ${expStr.substring(0, 100)}...`)
      });
    }
    return pass;
  }

  assertMatch(actual, regex, message, meta = {}) {
    const pass = regex.test(String(actual));
    if (pass) {
      this.record('PASS', message, meta);
    } else {
      this.record('FAIL', message, {
        ...meta,
        details: { actual, pattern: regex.toString() },
        error: new Error(`Value "${String(actual).substring(0, 60)}" does not match pattern ${regex}`)
      });
    }
    return pass;
  }

  assertThrows(fn, message, meta = {}) {
    try {
      fn();
      this.record('FAIL', message, {
        ...meta,
        error: new Error('Expected function to throw, but it executed without exception')
      });
      return false;
    } catch (err) {
      this.record('PASS', message, meta);
      return true;
    }
  }

  pending(message, meta = {}) {
    this.record('PENDING', message, meta);
    return false;
  }

  getSummary() {
    const duration = Date.now() - this.startTime;
    const passed = this.results.filter(r => r.status === 'PASS').length;
    const failed = this.results.filter(r => r.status === 'FAIL').length;
    const pending = this.results.filter(r => r.status === 'PENDING').length;
    const total = this.results.length;

    // Feature coverage breakdown
    const featureCoverage = {};
    for (const key of Object.keys(FEATURES)) {
      featureCoverage[key] = { passed: 0, failed: 0, pending: 0, total: 0 };
    }
    for (const r of this.results) {
      if (!featureCoverage[r.feature]) {
        featureCoverage[r.feature] = { passed: 0, failed: 0, pending: 0, total: 0 };
      }
      featureCoverage[r.feature].total++;
      if (r.status === 'PASS') featureCoverage[r.feature].passed++;
      if (r.status === 'FAIL') featureCoverage[r.feature].failed++;
      if (r.status === 'PENDING') featureCoverage[r.feature].pending++;
    }

    // Tier breakdown
    const tierCoverage = {
      1: { passed: 0, failed: 0, pending: 0, total: 0 },
      2: { passed: 0, failed: 0, pending: 0, total: 0 },
      3: { passed: 0, failed: 0, pending: 0, total: 0 },
      4: { passed: 0, failed: 0, pending: 0, total: 0 }
    };
    for (const r of this.results) {
      const t = r.tier || 1;
      if (tierCoverage[t]) {
        tierCoverage[t].total++;
        if (r.status === 'PASS') tierCoverage[t].passed++;
        if (r.status === 'FAIL') tierCoverage[t].failed++;
        if (r.status === 'PENDING') tierCoverage[t].pending++;
      }
    }

    return {
      suite: this.suiteName,
      durationMs: duration,
      total,
      passed,
      failed,
      pending,
      passRate: total > 0 ? ((passed / total) * 100).toFixed(1) : '0.0',
      featureCoverage,
      tierCoverage,
      results: this.results
    };
  }

  printReport() {
    const sum = this.getSummary();
    console.log('\n' + '─'.repeat(78));
    console.log(`${COLORS.bold}Suite Summary: ${sum.suite}${COLORS.reset}`);
    console.log(`Duration: ${sum.durationMs}ms | Total Assertions: ${sum.total}`);
    console.log(`Passed:  ${COLORS.green}${sum.passed}${COLORS.reset}`);
    console.log(`Failed:  ${sum.failed > 0 ? COLORS.red : COLORS.dim}${sum.failed}${COLORS.reset}`);
    console.log(`Pending: ${sum.pending > 0 ? COLORS.yellow : COLORS.dim}${sum.pending}${COLORS.reset}`);
    console.log(`Pass Rate: ${sum.passRate}%`);
    console.log('─'.repeat(78) + '\n');
    return sum;
  }
}

module.exports = {
  ROOT_DIR,
  FEATURES,
  TIERS,
  COLORS,
  TestRunner
};
