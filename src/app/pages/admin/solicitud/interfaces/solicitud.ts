export interface SolicitudInterface {
  id: number;
  tipo: string;
  fecha: string;
  primeraVez: string;
  terceraOportunidad: boolean;
  aproboDosParciales: boolean;
  comprobante: string;
}
