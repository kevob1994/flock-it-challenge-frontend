export interface IGetProvince {
  cantidad: number;
  inicio: number;
  parametros: any;
  provincias: IProvince[];
}

export interface IProvince {
  centroide: {
    lat: number;
    lon: number;
  };
  id: string;
  nombre: string;
}

export interface IUser {
  email: string;
  first_name: string;
  last_name: string;
}

export interface ISession extends IUser {
	id?: number;
  token: string;
}

export interface IError {
  message: string;
  code: string;
}
