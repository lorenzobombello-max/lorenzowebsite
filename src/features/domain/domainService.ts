export interface DomainCheckResult {
  domain: string;
  available: boolean;
  dnsRecords: string[];
  nextStep: string;
}

export async function prepareDomainCheck(domain: string): Promise<DomainCheckResult> {
  const normalized = domain.trim().toLowerCase();

  return {
    domain: normalized,
    available: !normalized.includes('demo'),
    dnsRecords: ['A 76.76.21.21', 'CNAME www cname.vercel-dns.com'],
    nextStep: 'Koppel registrar API of Vercel Domains API voor automatische aankoop, DNS-validatie en verlenging.',
  };
}
