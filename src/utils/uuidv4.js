function uuidv4Backup() {
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
    // eslint-disable-next-line no-bitwise
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );
}

export function uuidv4() {
  if ('randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return uuidv4Backup();
}
