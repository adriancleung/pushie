export type LicenseType =
  | 'MIT License'
  | 'Apache License 2.0'
  | 'BSD 2-Clause "Simplified" License';

export type License = {
  type: LicenseType;
  name: string;
  copyright: string;
};

export type LicenseText = {
  id: LicenseType;
  licenseText: string;
};
