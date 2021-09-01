interface ICreateTransacoesDTO {
  idTransacao?: number;
  idConta: number;
  valor: number;
  dataTransacao: Date;
}

export { ICreateTransacoesDTO };
