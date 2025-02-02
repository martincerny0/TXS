export interface Country {
    code: string;
    country: string;
    flag: string;
    placeholder: string;
    regEx: RegExp;
};

const imageBasePath = "/image/flag";


export const Countries: Country[] = [
    {
      code: "+420",
      country: "CZ",
      flag: imageBasePath + "/cz.webp",
      placeholder: "733 184 857",
      regEx: /^[0-9]{9}$/,
    },
    {
      code: "+1",
      country: "US",
      flag: imageBasePath + "/us.webp",
      placeholder: "(555) 555-1234",
      regEx: /^\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/,
    },
    {
      code: "+380",
      country: "UA",
      flag: imageBasePath + "/ua.webp",
      placeholder: "67 123 45 67",
      regEx: /^[0-9]{9}$/,
    },
    {
      code: "+33",
      country: "FR",
      flag: imageBasePath + "/fr.webp",
      placeholder: "06 12 34 56 78",
      regEx: /^[0-9]{10}$/,
    },
    {
      code: "+421",
      country: "SK",
      flag: imageBasePath + "/sk.webp",
      placeholder: "902 123 456",
      regEx: /^[0-9]{9}$/,
    },
    {
      code: "+49",
      country: "DE",
      flag: imageBasePath + "/de.webp",
      placeholder: "151 12345678",
      regEx: /^[0-9]{11,12}$/,
    },
  ];