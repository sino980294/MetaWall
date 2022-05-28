/**
 * MetaWall_achievement API DOC
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { PostViewModel, UserSignUpViewModel } from '../model/models';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class Posts_Service {

    protected basePath = 'https://damp-plateau-24758.herokuapp.com';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     *
     * 刪除所有貼文
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public postsDelete(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public postsDelete(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public postsDelete(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public postsDelete(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});

        let headers = this.defaultHeaders;

        // authentication (apiKeyAuth) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            queryParameters = queryParameters.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.delete<any>(`${this.basePath}/posts/`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     *
     *   &lt;p&gt;取得所有貼文。&lt;/p&gt;  參數用法：  &lt;ul&gt;  &lt;li&gt;&lt;code&gt;timeSort&lt;/code&gt; 參數：  &lt;ol&gt;  &lt;li&gt;預設新到舊&lt;/li&gt;  &lt;li&gt;是否有 &lt;code&gt;&#39;asc&#39;&lt;/code&gt; 值？，有值有舊到新；沒值有新到舊。&lt;/li&gt;  &lt;/ol&gt;  &lt;/li&gt;  &lt;li&gt;&lt;code&gt;q&lt;/code&gt; 參數：  &lt;ol&gt;  &lt;li&gt;查找物件中的留言 &lt;code&gt;discussContent&lt;/code&gt;。&lt;/li&gt;  &lt;li&gt;用正則表達式以 JS 轉 mongDB 語法 &lt;code&gt;.find( parName: /&lt;查尋字串&gt;/)&lt;/code&gt;。&lt;/li&gt;  &lt;/ol&gt;  &lt;/li&gt;  &lt;li&gt;取得 Token 至上方 Authorize 按鈕以格式 &lt;code&gt;Bearer ＜Token＞&lt;/code&gt; 加入設定，swagger 文件中鎖頭上鎖表示登入，可使用登入權限。&lt;/li&gt;  &lt;/ul&gt;
     * @param timeSort
     * @param q
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public postsGet(timeSort?: string, q?: string, observe?: 'body', reportProgress?: boolean): Observable<PostViewModel>;
    public postsGet(timeSort?: string, q?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PostViewModel>>;
    public postsGet(timeSort?: string, q?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PostViewModel>>;
    public postsGet(timeSort?: string, q?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {



        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (timeSort !== undefined && timeSort !== null) {
            queryParameters = queryParameters.set('timeSort', <any>timeSort);
        }
        if (q !== undefined && q !== null) {
            queryParameters = queryParameters.set('q', <any>q);
        }

        let headers = this.defaultHeaders;

        // authentication (apiKeyAuth) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            queryParameters = queryParameters.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<any>(`${this.basePath}/posts/`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     *
     *   刪除單筆貼文  &lt;ul&gt;  &lt;li&gt;取得 Token 至上方 Authorize 按鈕以格式 &lt;code&gt;Bearer ＜Token＞&lt;/code&gt; 加入設定，swagger 文件中鎖頭上鎖表示登入，可使用登入權限。&lt;/li&gt;  &lt;/ul&gt;
     * @param id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public postsIdDelete(id: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public postsIdDelete(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public postsIdDelete(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public postsIdDelete(id: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling postsIdDelete.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});

        let headers = this.defaultHeaders;

        // authentication (apiKeyAuth) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            queryParameters = queryParameters.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.delete<any>(`${this.basePath}/posts/${encodeURIComponent(String(id))}`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     *
     *   更新單筆貼文  &lt;ul&gt;  &lt;li&gt;取得 Token 至上方 Authorize 按鈕以格式 &lt;code&gt;Bearer ＜Token＞&lt;/code&gt; 加入設定，swagger 文件中鎖頭上鎖表示登入，可使用登入權限。&lt;/li&gt;  &lt;/ul&gt;
     * @param id
     * @param body UserSignUpViewModel 資料格式
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public postsIdPatch(id: string, body: UserSignUpViewModel, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public postsIdPatch(id: string, body: UserSignUpViewModel, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public postsIdPatch(id: string, body: UserSignUpViewModel, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public postsIdPatch(id: string, body: UserSignUpViewModel, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling postsIdPatch.');
        }

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling postsIdPatch.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});

        let headers = this.defaultHeaders;

        // authentication (apiKeyAuth) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            queryParameters = queryParameters.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.patch<any>(`${this.basePath}/posts/${encodeURIComponent(String(id))}`,
            body,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     *
     *   新增單筆貼文  &lt;ul&gt;  &lt;li&gt;取得 Token 至上方 Authorize 按鈕以格式 &lt;code&gt;Bearer ＜Token＞&lt;/code&gt; 加入設定，swagger 文件中鎖頭上鎖表示登入，可使用登入權限。&lt;/li&gt;  &lt;li&gt;新增貼文需先有 user.id 登入取得 Tokne&lt;/li&gt;  &lt;li&gt;資料格式查看必填欄位，點按下方 Model 切換後，屬性欄位名稱的後方紅色的 &lt;code&gt;*&lt;/code&gt;&lt;/li&gt;  &lt;li&gt;透過 user.id 向 posts 的屬性欄位 &lt;code&gt;userData&lt;/code&gt; 關連。&lt;/li&gt;  &lt;/ul&gt;
     * @param body
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public postsPost(body: UserSignUpViewModel, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public postsPost(body: UserSignUpViewModel, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public postsPost(body: UserSignUpViewModel, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public postsPost(body: UserSignUpViewModel, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling postsPost.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});

        let headers = this.defaultHeaders;

        // authentication (apiKeyAuth) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            queryParameters = queryParameters.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<any>(`${this.basePath}/posts/`,
            body,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}