export interface AnimationResponse{
	id: string,
	title: string,
	fileSizeInMb: number,
	uploaderUserName: string,
}

export interface AnimationDetailedResponse{
	id: string,
	userId:string,
	title: string,
	fileSizeInMb: number,
	uploaderUserName: string,
	uploadDate: string,
	hash: string,
	comments: CommentResponse[]
}

export interface CommentResponse{
	content: string,
	date: string,
	id: string,
	userId: string,
	userName: string,
}

export interface Sort{
	empty: boolean,
	sorted: boolean,
	unsorted: boolean,
}

export interface Pageable{
	offset:number,
	pageNumber:number,
	pageSize: number,
	paged: boolean,
	sort: Sort,
	unpaged: boolean,
}

export interface Paged<T>{
	content: T[],
	empty: boolean,
	first: boolean,
	last: boolean,
	number: number,
	numberOfElements: number,
	pageable: Pageable,
	sort: Sort,
	totalElements: number,
	totalPages: number,
}

export type AnimationListResponse = Paged<AnimationResponse>;


export interface UpdateAnimationRequest{
	title:string,
}

export interface CommentCreateUpdateRequest{
	content:string,
}