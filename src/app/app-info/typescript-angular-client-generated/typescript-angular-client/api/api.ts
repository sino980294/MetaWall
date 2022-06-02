export * from './pay_.service';
import { Pay_Service } from './pay_.service';
export * from './posts_.service';
import { Posts_Service } from './posts_.service';
export * from './tpAuth_.service';
import { TpAuth_Service } from './tpAuth_.service';
export * from './users_.service';
import { Users_Service } from './users_.service';
export const APIS = [Pay_Service, Posts_Service, TpAuth_Service, Users_Service];
