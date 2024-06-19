import { CountryNameRecord, isoAlpha2Arr } from './CountryDataTypes';

function isObject(v: unknown): v is object {
  return typeof v === 'object' && v !== null;
}

/** Type guard for the CountryNameRecord */
export default function isCountryNameRecord(
  value: unknown
): value is CountryNameRecord {
  // record is not an object
  if (!isObject(value)) {
    return false;
  }

  // keys and values are as should?
  return !isoAlpha2Arr.some((key) => {
    // missing key (true breaks some() loop)
    if (!(key in value)) {
      return true;
    }
    const v = value as CountryNameRecord;
    if (typeof v[key] !== 'string') {
      // not a string or an array
      if (!Array.isArray(v[key])) {
        return true;
      }
      // values in the array are strings?
      const a = v[key] as [];
      return a.some((item) => typeof item !== 'string');
    }

    // entry is OK
    return false;
  });
}
