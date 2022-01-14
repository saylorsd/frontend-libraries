import {
  RiBusLine,
  RiCommunityLine,
  RiContactsLine,
  RiDatabase2Fill,
  RiGroupLine,
  RiMailLine,
  RiMapPinLine,
  RiPagesLine,
  RiPhoneLine,
  RiUser3Line,
} from 'react-icons/ri';
import { DataChipIcon } from '@wprdc-types/data-chip';

export const icons: { [key in DataChipIcon]: any } = {
  map: RiMapPinLine,
  phone: RiPhoneLine,
  contacts: RiContactsLine,
  person: RiUser3Line,
  group: RiGroupLine,
  community: RiCommunityLine,
  bus: RiBusLine,
  link: RiPagesLine,
  mail: RiMailLine,
  database: RiDatabase2Fill,
};
