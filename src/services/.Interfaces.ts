export interface Login {
	username: string;
	password: string;
}

export interface LoginResponse {
	accessGroup: number;
	accessToken: string;
	email: string;
	name: string;
	refreshToken: string;
}

export interface LoginURL {
	token: string | undefined;
}

export interface ResponseLoginURL {
	COD_USUARIO: string
	DES_SENHA: string
}

export interface ProfileInfo {
	codUsuario: number;
}

export interface ProfileInfoResponse {
	COD_USUARIO: number;
	DES_USUARIO: string;
	EMAIL: string;
	TOKEN_RECOVERY: string | null;
	GRUPO_ACESSO: string;
}

export interface GetFavoritMenu {
	codUsuario: number;
	seqAplicacao?: number;
	seqAplicacaoAnt?: number;
}

export interface GetFavoritMenuResponse {
	codUsuario: number;
	seqAplicacaoAnt: number;
	seqAplicacao: number;
	icone: string;
	codLinkAplicacao: string;
	desAplicacao: string;
}

export interface GetMenuUser {
	codUsuario: number;
	linkAplicacao?: string;
}

export interface GetMenuUserResponse {
	data: GetMenuUserResponseData[];
	papeis: GetMenuUserResponsePapeis[];
}

export interface GetMenuUserResponseData {
	codPerfil: number;
	seqAplicacao: number;
	desAplicacao: string;
	codLinkAplicacao: string;
	icone: string;
	permissoesSubmenu: GetMenuUserResponseDataPermissoesSubmenu[];
}

export interface GetMenuUserResponseDataPermissoesSubmenu {
	codPerfil: number;
	seqAplicacao: number;
	seqSubmenu: number;
	desAplicacao: string;
	codLinkAplicacao: string;
	icone: string;
	menuPai: string;
}

export interface GetMenuUserResponsePapeis {
	codPapel: string;
	desPapel: string;
	txtObservacao: string | null;
}

export interface UpdateInfoUser {
	codUsuario: number;
	email: string;
	password?: string;
}
export interface UpdateInfoUserResponse {
	status: string;
}

export interface GetStatusResponse {
	tipPedido: number;
	desStatus: string;
	pedidosStatus: GetStatusResponsePedidosStatus[];
}

export interface GetStatusResponsePedidosStatus {
	codStatus: number;
	tipPedido: number;
	desStatus: string;
}

export interface GetSeparations {
	codPedido: string;
	dtaPedidoFim: string;
	dtaPedidoIni: string;
	statusPedido: number;
	tipPedido: number;
	unidadeExpedicao: number;
}

export interface GetSeparationsResponse {
	COD_UNIDADE: number;
	COD_EMP: number;
	UNIDADE_EXPEDICAO: number;
	PEDIDO: number;
	DATA_DO_PEDIDO: string;
	CLIENTE: number;
	NOME_DO_CLIENTE: string;
	EMAIL: string | null;
	CELULAR: string | null;
	TRANSPORTADORA: string | null;
	CODIGO_DE_RASTREAMENTO: string | null;
	TIP_PEDIDO: number;
	STATUS_DO_PEDIDO: string;
	LINK: string | null;
	TOTAL_ESPERA: string;
}

export interface GetPendingRequest {
	codUnidade: number;
	numPedidoNL: number;
	numPedidoVTEX: number;
	seq: number;
	status: string;
	dtaInclusao: string;
	txtObservacao: string;
}

export interface GetRegisterLogsResponse {
	seq: number;
	tipErro: number;
	codAplicacao: string;
	txtErro: string;
	oracleCodigo: number;
	oracleErro: string;
	oracleErroLinha: string;
	dtaSistema: string;
}
