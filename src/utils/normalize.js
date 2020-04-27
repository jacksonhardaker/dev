export const normalizeHeading = text => text.replace(/[^A-Za-z\s]/g, '').replace(/\s/g, '-').toLowerCase();
