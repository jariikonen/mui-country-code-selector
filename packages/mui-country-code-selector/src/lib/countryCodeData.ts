import {
  CountryName,
  CountryNameRecord,
  IsoAlpha2,
  isoAlpha2Arr,
} from '../types/CountryDataTypes';
import isCountryNameRecord from '../types/isCountryNameRecord';
import callingCodes from './callingCodes';

/**
 * Represents data for an individual country. Contains records for the name,
 * the ITU-T E.164 international calling code, and two letter ISO 3166 country
 * code of the country. Is used as the
 * @alpha
 */
export interface CountryType {
  /**
   * Name(s) of the country.
   *
   * If there are more than one name, the list has the following structure:
   * 1) the official or recommended short name (e.g, "Bolivia"),
   * 2) a complementary addition to the name (e.g., "Plurinational State of") or
   * probably a better known version of the name (e.g., "Czech Republic" for
   * "Czechia"),
   * 3) ...n) alternative spelling(s) of the name (e.g., "Cote d'Ivoire" and
   * "Cote dIvoire" for "Côte d'Ivoire").
   *
   * The first entry can be used as the shortest possible representation of a
   * country's name. If there is more space the second entry could be added in
   * parentheses to make it easier to identify the country. The alternate
   * spellings can help in finding the country when searching.
   */
  country: CountryName;

  /**
   * ITU-T E.164 assigned international calling code for the country. Although
   * a country can have multiple calling codes, a single calling code is stored
   * here. This is because the data structure is meant to be used as the
   * options list for the country code selector, in which each calling code
   * must have its own entry.
   * See {@link https://www.itu.int/pub/T-SP-E.164D} or
   * {@link https://en.wikipedia.org/wiki/List_of_country_calling_codes} for
   * more information about the calling codes.
   */
  code: string;

  /**
   * Two letter ISO 3166 country code of the country. See
   * {@link https://www.iso.org/iso-3166-country-codes.html} or
   * {@link https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes} for
   * more information about the ISO 3166 country codes. See also documentation
   * for the displayIso field for more
   */
  iso: IsoAlpha2;

  /**
   * The display version of the ISO 3166 code in the `iso` field.
   *
   * Some entries are not real countries, but subdivisions of one (e.g.,
   * Ascension, SH-AC). Correct ISO 3166-2 subdivision code includes the two
   * letter ISO 3166-1 code of the larger entity and a two letter code for the
   * subdivision separated with a dash. Due to way Vite imports json files, it
   * is easier to not include the dash in the `iso` field that is used as key
   * in the json files containing the country name translations. In those cases
   * the display version of the ISO 3166-2 code is stored in this field.
   */
  displayIso?: string;
}

function parseCountryNameRecord(jsonModule: unknown): CountryNameRecord {
  if (isCountryNameRecord(jsonModule)) {
    return jsonModule;
  }
  throw new Error('invalid CountryNameRecord');
}

function pushEntry(
  countries: CountryType[],
  countryNames: CountryNameRecord,
  code: string,
  iso: IsoAlpha2,
  displayIso: string
) {
  const entry: CountryType = {
    country: countryNames[iso],
    code,
    iso,
  };
  if (displayIso) {
    entry.displayIso = displayIso;
  }
  countries.push(entry);
}

/**
 * Returns the international calling codes and names for the countries of the
 * world in `CountryType` objects.
 * @alpha
 */
export async function getCountries(
  locale = 'en'
): Promise<readonly CountryType[]> {
  let jsonModule: unknown;
  try {
    jsonModule = await import(`./countryNames/${locale}.json`);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `importing of locale '${locale}' failed: ${error.message}`
      );
    }
  }
  const countryNames = parseCountryNameRecord(jsonModule);

  const countries: CountryType[] = [];
  isoAlpha2Arr.forEach((key) => {
    const codes = callingCodes[key];
    // SHAC is displayed as SH-AC which is the correct ISO 3166-2 subdivision
    // code for Ascension
    const displayKey =
      key.length > 2 ? `${key.slice(0, 2)}-${key.slice(2)}` : '';

    // if country has more than one calling code, create an entry for each of
    // them
    if (Array.isArray(codes)) {
      codes.forEach((alt) => {
        pushEntry(countries, countryNames, alt, key, displayKey);
      });
    } else {
      pushEntry(countries, countryNames, codes, key, displayKey);
    }
  });

  return countries;
}
