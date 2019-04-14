import {BehaviorSubject, of} from 'rxjs';
import {combineLatest, map, startWith, distinctUntilChanged, debounceTime} from 'rxjs/operators';
import {DataTableSource} from './data-table-souce';
import {DataTableSourceConfig} from './data-table-source-config';

const DEFAULT_PAGE_SIZE = 15;
const DEFAULT_SORT_COLUMN = 'updated_at';
const DEFAULT_SORT_DIRECTION = 'desc';

export class PaginatedDataTableSource<T> extends DataTableSource<T> {

    /**
     * Custom parameters for paginator that can be set by user.
     */
    private params = new BehaviorSubject({});

    /**
     * PaginatedDataTableSource Constructor.
     */
    constructor(public config: DataTableSourceConfig<T>) {
        super(config);
    }

    /**
     * Check if data source does NOT have any results.
     * Will return false if paginator was not initiated yet.
     */
    public isEmpty(): boolean {
        return this.config.dataPaginator.doesNotHaveResults();
    }

    public loading(): boolean {
        return this.config.dataPaginator.isLoading;
    }

    /**
     * Set specified params on data source.
     */
    public setParams(params: object) {
        this.params.next(params);
    }

    /**
     * Check if all table rows are selected.
     */
    public allRowsSelected(): boolean {
        if ( ! this.config.dataPaginator.data || ! this.config.dataPaginator.data.length) return false;
        return this.selectedRows.selected.length === this.config.dataPaginator.data.length;
    }

    /**
     * Selects all rows if they are not all selected. Otherwise clear selected rows.
     */
    public masterToggle() {
        this.allRowsSelected() ?
            this.selectedRows.clear() :
            this.config.dataPaginator.data.forEach(row => this.selectedRows.select(row));
    }

    public refresh(params?: object) {
        this.searchQuery.reset();
        this.resetSort();
        this.selectedRows.clear();
        this.config.dataPaginator.refresh(params);
    }

    public init(params?: object) {
        if ( ! this.params) this.params = new BehaviorSubject({});
        if (params) this.params.next(params);
        if (this.config.initialData) this.setFilteredData(this.config.initialData);

        this.searchQuery.valueChanges.pipe(
            debounceTime(400),
            distinctUntilChanged(),
            map(query => {return {query}}),
        ).pipe(
            combineLatest(
                this.params,
                this.params,
                this.config.matPaginator.page.pipe(startWith(null)),
                this.getMatSort(),
            ),
        ).subscribe(params => {
            this.config.dataPaginator.paginate(this.config.uri, this.transformParams(params)).subscribe(response => {
                this.config.matPaginator.length = response.data.length ? response.total : 0;
                this.data.next(response.data);
            });
        });

        this.params.pipe(
            combineLatest(
                this.config.matPaginator.page.pipe(startWith(null)),
                this.getMatSort(),
            ),
        ).subscribe(params => {
            this.config.dataPaginator.paginate(this.config.uri, this.transformParams(params)).subscribe(response => {
                this.config.matPaginator.length = response.data.length ? response.total : 0;
                this.data.next(response.data);
            });
        });

        return this;
    }

    private getMatSort() {
        if (this.config.matSort) {
            return this.config.matSort.sortChange.pipe(startWith(null));
        } else {
            return of(null);
        }
    }

    /**
     * Transform combined table parameters (sort, filter, pagination, custom etc) into backend params.
     */
    private transformParams(allParams: object[]) {
        this.config.dataPaginator.staticQueryParams = this.config.staticParams;
        allParams.push(Object.assign({}, this.config.dataPaginator.staticQueryParams));
        const params = allParams.reduce((previous, current) => Object.assign({}, previous, current)) as any;

        // per page
        params.per_page = params.pageSize || this.config.matPaginator.pageSize || DEFAULT_PAGE_SIZE;
        delete params.pageSize;

        // current page
        params.page = params.pageIndex + 1 || this.config.matPaginator.pageIndex + 1;
        delete params.pageIndex;

        // order by
        const defaultOrder = params.order_by || DEFAULT_SORT_COLUMN;
        params.order_by = (params.active && params.direction) ? params.active : defaultOrder;
        delete params.active;

        // only use direction from mat sort if it was actually changed by user
        const active = this.config.matSort ? this.config.matSort.active : false;
        params.order_dir = (active && params.direction) ? params.direction : DEFAULT_SORT_DIRECTION;
        delete params.direction;

        // search query
        params.query = params.query || this.searchQuery.value;
        if ( ! params.query) delete params.query;

        delete params['length'];
        delete params['previousPageIndex'];

        return params;
    }

    public disconnect() {
        this.config.dataPaginator.destroy();
    }
}
