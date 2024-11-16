export class Paging {
    private _pageIndex!:number;
    private _pageSize!: number;
    private _totalRows!:number;

    constructor(pageSize:number = 20){
        this._pageIndex = 1;
        this._pageSize = pageSize;
        this._totalRows = 0;
    }
    
    public get PageIndex() {
        return this._pageIndex;
    }

    public set PageIndex(value) {
        this._pageIndex = value;
    }
    
    public get PageSize() {
        return this._pageSize;
    }

    public set PageSize(value) {
        this._pageSize = value;
    }

    public get TotalRows() {
        return this._totalRows;
    }

    public set TotalRows(value) {
        this._totalRows = value;
    }
  }