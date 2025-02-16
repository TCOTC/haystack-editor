/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Haystack Software Inc. All rights reserved.
 *  Licensed under the PolyForm Strict License 1.0.0. See License.txt in the project root for
 *  license information.
 *--------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See code-license.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

declare module "vscode" {
  // https://github.com/microsoft/vscode/issues/205317

  /**
   * The parameters of a query for text search.
   */
  export interface TextSearchQuery {
    /**
     * The text pattern to search for.
     */
    pattern: string

    /**
     * Whether or not `pattern` should match multiple lines of text.
     */
    isMultiline?: boolean

    /**
     * Whether or not `pattern` should be interpreted as a regular expression.
     */
    isRegExp?: boolean

    /**
     * Whether or not the search should be case-sensitive.
     */
    isCaseSensitive?: boolean

    /**
     * Whether or not to search for whole word matches only.
     */
    isWordMatch?: boolean
  }

  /**
   * Options common to file and text search
   */
  export interface SearchOptions {
    /**
     * The root folder to search within.
     */
    folder: Uri

    /**
     * Files that match an `includes` glob pattern should be included in the search.
     */
    includes: GlobString[]

    /**
     * Files that match an `excludes` glob pattern should be excluded from the search.
     */
    excludes: GlobString[]

    /**
     * Whether external files that exclude files, like .gitignore, should be respected.
     * See the vscode setting `"search.useIgnoreFiles"`.
     */
    useIgnoreFiles: boolean

    /**
     * Whether symlinks should be followed while searching.
     * See the vscode setting `"search.followSymlinks"`.
     */
    followSymlinks: boolean

    /**
     * Whether global files that exclude files, like .gitignore, should be respected.
     * See the vscode setting `"search.useGlobalIgnoreFiles"`.
     */
    useGlobalIgnoreFiles: boolean

    /**
     * Whether files in parent directories that exclude files, like .gitignore, should be respected.
     * See the vscode setting `"search.useParentIgnoreFiles"`.
     */
    useParentIgnoreFiles: boolean
  }

  /**
   * Options to specify the size of the result text preview.
   * These options don't affect the size of the match itself, just the amount of preview text.
   */
  export interface TextSearchPreviewOptions {
    /**
     * The maximum number of lines in the preview.
     * Only search providers that support multiline search will ever return more than one line in the match.
     */
    matchLines: number

    /**
     * The maximum number of characters included per line.
     */
    charsPerLine: number
  }

  /**
   * Options that apply to AI text search.
   */
  export interface AITextSearchOptions extends SearchOptions {
    /**
     * The maximum number of results to be returned.
     */
    maxResults: number

    /**
     * Options to specify the size of the result text preview.
     */
    previewOptions?: TextSearchPreviewOptions

    /**
     * Exclude files larger than `maxFileSize` in bytes.
     */
    maxFileSize?: number

    /**
     * Number of lines of context to include before each match.
     */
    beforeContext?: number

    /**
     * Number of lines of context to include after each match.
     */
    afterContext?: number
  }

  /**
   * A message regarding a completed search.
   */
  export interface TextSearchCompleteMessage {
    /**
     * Markdown text of the message.
     */
    text: string
    /**
     * Whether the source of the message is trusted, command links are disabled for untrusted message sources.
     * Messaged are untrusted by default.
     */
    trusted?: boolean
    /**
     * The message type, this affects how the message will be rendered.
     */
    type: TextSearchCompleteMessageType
  }

  /**
   * Information collected when text search is complete.
   */
  export interface TextSearchComplete {
    /**
     * Whether the search hit the limit on the maximum number of search results.
     * `maxResults` on {@linkcode AITextSearchOptions} specifies the max number of results.
     * - If exactly that number of matches exist, this should be false.
     * - If `maxResults` matches are returned and more exist, this should be true.
     * - If search hits an internal limit which is less than `maxResults`, this should be true.
     */
    limitHit?: boolean

    /**
     * Additional information regarding the state of the completed search.
     *
     * Messages with "Information" style support links in markdown syntax:
     * - Click to [run a command](command:workbench.action.OpenQuickPick)
     * - Click to [open a website](https://aka.ms)
     *
     * Commands may optionally return { triggerSearch: true } to signal to the editor that the original search should run be again.
     */
    message?: TextSearchCompleteMessage | TextSearchCompleteMessage[]
  }

  /**
   * A preview of the text result.
   */
  export interface TextSearchMatchPreview {
    /**
     * The matching lines of text, or a portion of the matching line that contains the match.
     */
    text: string

    /**
     * The Range within `text` corresponding to the text of the match.
     * The number of matches must match the TextSearchMatch's range property.
     */
    matches: Range | Range[]
  }

  /**
   * A match from a text search
   */
  export interface TextSearchMatch {
    /**
     * The uri for the matching document.
     */
    uri: Uri

    /**
     * The range of the match within the document, or multiple ranges for multiple matches.
     */
    ranges: Range | Range[]

    /**
     * A preview of the text match.
     */
    preview: TextSearchMatchPreview
  }

  /**
   * A line of context surrounding a TextSearchMatch.
   */
  export interface TextSearchContext {
    /**
     * The uri for the matching document.
     */
    uri: Uri

    /**
     * One line of text.
     * previewOptions.charsPerLine applies to this
     */
    text: string

    /**
     * The line number of this line of context.
     */
    lineNumber: number
  }

  /**
   * An AITextSearchProvider provides additional AI text search results in the workspace.
   */
  export interface AITextSearchProvider {
    /**
     * Provide results that match the given text pattern.
     * @param query The parameter for this query.
     * @param options A set of options to consider while searching.
     * @param progress A progress callback that must be invoked for all results.
     * @param token A cancellation token.
     */
    provideAITextSearchResults(
      query: string,
      options: AITextSearchOptions,
      progress: Progress<TextSearchResult>,
      token: CancellationToken,
    ): ProviderResult<TextSearchComplete>
  }

  export namespace workspace {
    /**
     * Register an AI text search provider.
     *
     * Only one provider can be registered per scheme.
     *
     * @param scheme The provider will be invoked for workspace folders that have this file scheme.
     * @param provider The provider.
     * @return A {@link Disposable} that unregisters this provider when being disposed.
     */
    export function registerAITextSearchProvider(
      scheme: string,
      provider: AITextSearchProvider,
    ): Disposable
  }
}
