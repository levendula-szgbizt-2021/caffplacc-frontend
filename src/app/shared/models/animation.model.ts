import { Guid } from "guid-typescript";

export interface CaffResponse{
    id: string,
    uploader: string,
    title: string
}



//TODO:
// - ha a preview-t linkkent kapjuk, a tipusa string?
// - lesz id, amit a backendtol kapunk? ha igen, akkor a tipusa Guid, number, string, unique? ugy lattam akosnal string
// - a caff meretet a backendtol kapjuk?  ha igen, a tipusa number, string?