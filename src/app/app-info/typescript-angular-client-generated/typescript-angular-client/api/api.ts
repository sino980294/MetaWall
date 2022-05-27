export * from './posts_.service';
import { Posts_Service } from './posts_.service';
export * from './users_.service';
import { Users_Service } from './users_.service';
export const APIS = [Posts_Service, Users_Service];
