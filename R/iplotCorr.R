## iplotCorr
## Karl W Broman

#' Image of correlation matrix with linked scatterplot
#'
#' Creates an interactive graph with an image of a
#' correlation matrix linked to underlying scatterplots.
#'
#' @param mat Data matrix (individuals x variables)
#' @param group Optional vector of groups of individuals (e.g., a genotype)
#' @param rows Selected rows of the correlation matrix to include in
#'   the image. Ignored if \code{corr} is provided.
#' @param cols Selected columns of the correlation matrix to include
#'   in the image. Ignored if \code{corr} is provided.
#' @param reorder If TRUE, reorder the variables by
#'   clustering. Ignored if \code{corr} is provided as a subset of the
#'   overall correlation matrix
#' @param corr Correlation matrix (optional).
#' @param file Optional character vector with file to contain the
#'   output
#' @param onefile If TRUE, have output file contain all necessary
#'   javascript/css code
#' @param openfile If TRUE, open the plot in the default web browser
#' @param title Character string with title for plot
#' @param chartdivid Character string for id of div to hold the chart
#' @param caption Character vector with text for a caption (to be
#'   combined to one string with \code{\link[base]{paste}}, with
#'   \code{collapse=""})
#' @param chartOpts A list of options for configuring the chart (see
#'   the coffeescript code). Each element must be named using the
#'   corresponding option.
#' @param digits Number of digits in JSON; pass to
#'   \code{\link[jsonlite]{toJSON}}
#' @param print If TRUE, print the output, rather than writing it to a file,
#'   for use within an R Markdown document.
#'
#' @return Character string with the name of the file created.
#'
#' @details \code{corr} may be provided as a subset of the overall
#' correlation matrix for the columns of \code{mat}. In this case, the
#' \code{reorder}, \code{rows} and \code{cols} arguments are ignored. The row and
#' column names of \code{corr} must match the names of some subset of
#' columns of \code{mat}.
#'
#' Individual IDs are taken from \code{rownames(mat)}; they must match
#' \code{names(group)}.
#'
#' @keywords hplot
#' @seealso \code{\link{iheatmap}}, \code{\link{iplotCurves}}
#'
#' @examples
#' data(geneExpr)
#' \donttest{
#' # open iplotCorr in web browser
#' iplotCorr(geneExpr$expr, geneExpr$genotype, reorder=TRUE,
#'           title = "iplotCorr example",
#'           chartOpts=list(cortitle="Correlation matrix",
#'                          scattitle="Scatterplot"))}
#' \dontshow{
#' # save to temporary file but don't open
#' iplotCorr(geneExpr$expr, geneExpr$genotype, reorder=TRUE,
#'           title = "iplotCorr example",
#'           chartOpts=list(cortitle="Correlation matrix",
#'                          scattitle="Scatterplot"),
#'           openfile=FALSE)}
#'
#' @export
iplotCorr <-
function(mat, group, rows, cols, reorder=FALSE, corr=stats::cor(mat, use="pairwise.complete.obs"),
         file, onefile=FALSE, openfile=TRUE, title="",
         chartdivid='chart', caption, chartOpts=NULL, digits=4, print=FALSE)
{
    if(missing(file)) file <- NULL

    if(missing(group) || is.null(group)) group <- rep(1, nrow(mat))
    if(is.data.frame(mat)) mat <- as.matrix(mat)
    stopifnot(length(group) == nrow(mat))
    group <- group2numeric(group)

    if(!missing(corr) && !is.null(corr)) {
        if(!missing(rows) || !missing(cols)) warning("rows and cols ignored when corr provided.")
        if(!missing(reorder)) warning("reorder ignored when corr provided")
        reorder <- FALSE

        cnmat <- colnames(mat)
        if(ncol(mat) != nrow(corr) || ncol(mat) != nrow(corr)) { # correlation matrix is a subset
            rows <- selectMatrixColumns(mat, rownames(corr))
            cols <- selectMatrixColumns(mat, colnames(corr))
        }
        else {
            if((!is.null(rownames(corr)) && any(rownames(corr) != cnmat)) ||
               (!is.null(colnames(corr)) && any(colnames(corr) != cnmat)))
                warning("Possible misalignment of mat and corr")
            rows <- cols <- 1:ncol(mat)
        }

        corr_was_presubset <- TRUE
    }
    else {
        if(missing(rows) || is.null(rows)) rows <- (1:ncol(mat))
        else rows <- selectMatrixColumns(mat, rows)
        if(missing(cols) || is.null(cols)) cols <- (1:ncol(mat))
        else cols <- selectMatrixColumns(mat, cols)
        corr_was_presubset <- FALSE
    }

    json <- convert4iplotcorr(mat, group, rows, cols, reorder, corr, corr_was_presubset,
                              digits)

    if(missing(caption) || is.null(caption))
        caption <- c('The left panel is an image of a correlation matrix, with blue = -1 and red = +1. ',
                     'Hover over pixels in the correlation matrix on the left to see the ',
                     'values; click to see the corresponding scatterplot on the right.')

    file <- write_top(file, onefile, title, links=c("d3", "d3tip", "panelutil"),
                      panels=NULL, charts="iplotCorr", chartdivid=chartdivid,
                      caption=caption, print=print)

    # add chartdivid to chartOpts
    chartOpts <- add2chartOpts(chartOpts, chartdivid=chartdivid)

    append_html_jscode(file, paste0(chartdivid, '_data = '), json, ';')
    append_html_chartopts(file, chartOpts, chartdivid=chartdivid)
    append_html_jscode(file, paste0('iplotCorr(', chartdivid, '_data, ', chartdivid, '_chartOpts);'))

    append_html_bottom(file, print=print)

    if(openfile && !print) utils::browseURL(file)

    invisible(file)
}

# ensure that a "group" vector is really the numbers 1, 2, ..., k
group2numeric <-
function(group)
{
    if(is.factor(group)) return(as.numeric(group))

    match(group, sort(unique(group)))
}
