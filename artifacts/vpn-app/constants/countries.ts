export interface Country {
  id: string;
  name: string;
  code: string;
  flag: string;
  city: string;
  ping: number;
  load: number;
  premium: boolean;
  region: string;
}

export const COUNTRIES: Country[] = [
  { id: "us-1", name: "United States", code: "US", flag: "🇺🇸", city: "New York", ping: 28, load: 45, premium: false, region: "Americas" },
  { id: "us-2", name: "United States", code: "US", flag: "🇺🇸", city: "Los Angeles", ping: 35, load: 38, premium: false, region: "Americas" },
  { id: "uk-1", name: "United Kingdom", code: "GB", flag: "🇬🇧", city: "London", ping: 42, load: 52, premium: false, region: "Europe" },
  { id: "de-1", name: "Germany", code: "DE", flag: "🇩🇪", city: "Frankfurt", ping: 38, load: 41, premium: false, region: "Europe" },
  { id: "fr-1", name: "France", code: "FR", flag: "🇫🇷", city: "Paris", ping: 40, load: 37, premium: false, region: "Europe" },
  { id: "nl-1", name: "Netherlands", code: "NL", flag: "🇳🇱", city: "Amsterdam", ping: 36, load: 49, premium: false, region: "Europe" },
  { id: "ch-1", name: "Switzerland", code: "CH", flag: "🇨🇭", city: "Zurich", ping: 44, load: 33, premium: true, region: "Europe" },
  { id: "se-1", name: "Sweden", code: "SE", flag: "🇸🇪", city: "Stockholm", ping: 46, load: 28, premium: false, region: "Europe" },
  { id: "no-1", name: "Norway", code: "NO", flag: "🇳🇴", city: "Oslo", ping: 48, load: 25, premium: true, region: "Europe" },
  { id: "ca-1", name: "Canada", code: "CA", flag: "🇨🇦", city: "Toronto", ping: 32, load: 43, premium: false, region: "Americas" },
  { id: "au-1", name: "Australia", code: "AU", flag: "🇦🇺", city: "Sydney", ping: 95, load: 35, premium: false, region: "Asia Pacific" },
  { id: "jp-1", name: "Japan", code: "JP", flag: "🇯🇵", city: "Tokyo", ping: 88, load: 42, premium: false, region: "Asia Pacific" },
  { id: "sg-1", name: "Singapore", code: "SG", flag: "🇸🇬", city: "Singapore", ping: 72, load: 38, premium: false, region: "Asia Pacific" },
  { id: "hk-1", name: "Hong Kong", code: "HK", flag: "🇭🇰", city: "Hong Kong", ping: 80, load: 55, premium: true, region: "Asia Pacific" },
  { id: "kr-1", name: "South Korea", code: "KR", flag: "🇰🇷", city: "Seoul", ping: 85, load: 40, premium: true, region: "Asia Pacific" },
  { id: "br-1", name: "Brazil", code: "BR", flag: "🇧🇷", city: "São Paulo", ping: 120, load: 30, premium: false, region: "Americas" },
  { id: "mx-1", name: "Mexico", code: "MX", flag: "🇲🇽", city: "Mexico City", ping: 65, load: 28, premium: false, region: "Americas" },
  { id: "es-1", name: "Spain", code: "ES", flag: "🇪🇸", city: "Madrid", ping: 52, load: 36, premium: false, region: "Europe" },
  { id: "it-1", name: "Italy", code: "IT", flag: "🇮🇹", city: "Milan", ping: 48, load: 34, premium: false, region: "Europe" },
  { id: "pl-1", name: "Poland", code: "PL", flag: "🇵🇱", city: "Warsaw", ping: 50, load: 29, premium: false, region: "Europe" },
  { id: "ro-1", name: "Romania", code: "RO", flag: "🇷🇴", city: "Bucharest", ping: 55, load: 22, premium: false, region: "Europe" },
  { id: "in-1", name: "India", code: "IN", flag: "🇮🇳", city: "Mumbai", ping: 110, load: 48, premium: false, region: "Asia Pacific" },
  { id: "za-1", name: "South Africa", code: "ZA", flag: "🇿🇦", city: "Cape Town", ping: 145, load: 20, premium: true, region: "Africa" },
  { id: "ae-1", name: "UAE", code: "AE", flag: "🇦🇪", city: "Dubai", ping: 90, load: 32, premium: true, region: "Middle East" },
  { id: "tr-1", name: "Turkey", code: "TR", flag: "🇹🇷", city: "Istanbul", ping: 75, load: 26, premium: false, region: "Middle East" },
  { id: "nz-1", name: "New Zealand", code: "NZ", flag: "🇳🇿", city: "Auckland", ping: 105, load: 18, premium: true, region: "Asia Pacific" },
  { id: "at-1", name: "Austria", code: "AT", flag: "🇦🇹", city: "Vienna", ping: 42, load: 31, premium: false, region: "Europe" },
  { id: "be-1", name: "Belgium", code: "BE", flag: "🇧🇪", city: "Brussels", ping: 39, load: 27, premium: false, region: "Europe" },
  { id: "pt-1", name: "Portugal", code: "PT", flag: "🇵🇹", city: "Lisbon", ping: 58, load: 24, premium: false, region: "Europe" },
  { id: "fi-1", name: "Finland", code: "FI", flag: "🇫🇮", city: "Helsinki", ping: 52, load: 21, premium: false, region: "Europe" },
  { id: "dk-1", name: "Denmark", code: "DK", flag: "🇩🇰", city: "Copenhagen", ping: 44, load: 23, premium: false, region: "Europe" },
  { id: "cz-1", name: "Czech Republic", code: "CZ", flag: "🇨🇿", city: "Prague", ping: 47, load: 26, premium: false, region: "Europe" },
];

export const REGIONS = ["All", "Americas", "Europe", "Asia Pacific", "Middle East", "Africa"];
