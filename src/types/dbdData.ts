export interface DBDData {
  status: Status;
  data: Daum[];
}

interface Status {
  code: string;
  description: string;
}

interface Daum {
  "cd:OrganizationJuristicPerson": CdOrganizationJuristicPerson;
}

interface CdOrganizationJuristicPerson {
  "cd:OrganizationJuristicID": string;
  "cd:OrganizationJuristicNameTH": string;
  "cd:OrganizationJuristicNameEN": string;
  "cd:OrganizationJuristicType": string;
  "cd:OrganizationJuristicRegisterDate": string;
  "cd:OrganizationJuristicStatus": string;
  "cd:OrganizationJuristicObjective": CdOrganizationJuristicObjective;
  "cd:OrganizationJuristicRegisterCapital": string;
  "cd:OrganizationJuristicBranchName": string;
  "cd:OrganizationJuristicAddress": CdOrganizationJuristicAddress;
}

interface CdOrganizationJuristicObjective {
  "td:JuristicObjective": TdJuristicObjective;
}

interface TdJuristicObjective {
  "td:JuristicObjectiveCode": string;
  "td:JuristicObjectiveTextTH": string;
  "td:JuristicObjectiveTextEN": string;
}

interface CdOrganizationJuristicAddress {
  "cr:AddressType": CrAddressType;
}

interface CrAddressType {
  "cd:Address": string;
  "cd:Building": string;
  "cd:RoomNo": string;
  "cd:Floor": string;
  "cd:AddressNo": string;
  "cd:Moo": string | null;
  "cd:Yaek": string | null;
  "cd:Soi": string | null;
  "cd:Trok": string | null;
  "cd:Village": string | null;
  "cd:Road": string;
  "cd:CitySubDivision": CdCitySubDivision;
  "cd:City": CdCity;
  "cd:CountrySubDivision": CdCountrySubDivision;
}

export interface CdCitySubDivision {
  "cr:CitySubDivisionCode": string;
  "cr:CitySubDivisionTextTH": string;
}

export interface CdCity {
  "cr:CityCode": string;
  "cr:CityTextTH": string;
}

export interface CdCountrySubDivision {
  "cr:CountrySubDivisionCode": string;
  "cr:CountrySubDivisionTextTH": string;
}
