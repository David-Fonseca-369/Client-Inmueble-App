
import { Inmueble } from "@app/models/backend/Inmueble";
export {Inmueble as InmuebleResponse} from '@app/models/backend/Inmueble';

//se omita estos
export type InmuebleCreateRequest =  Omit<Inmueble, 'id' | 'fechaCreacion'>;
