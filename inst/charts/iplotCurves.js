// Generated by CoffeeScript 1.8.0
var iplotCurves;

iplotCurves = function(curve_data, scatter1_data, scatter2_data, chartOpts) {
  var allpoints, axispos, chartdivid, curves, curves_nxticks, curves_nyticks, curves_title, curves_xlab, curves_xlim, curves_xticks, curves_ylab, curves_ylim, curves_yticks, g, g_curves, g_scat1, g_scat2, group, hbot, htop, i, margin, mycurvechart, myscatterplot1, myscatterplot2, ngroup, nind, nscatter, pointcolor, pointcolorhilit, points1, points2, pointsize, pointsizehilit, pointstroke, rectcolor, scat1_nxticks, scat1_nyticks, scat1_title, scat1_xNA, scat1_xlab, scat1_xlim, scat1_xticks, scat1_yNA, scat1_ylab, scat1_ylim, scat1_yticks, scat2_nxticks, scat2_nyticks, scat2_title, scat2_xNA, scat2_xlab, scat2_xlim, scat2_xticks, scat2_yNA, scat2_ylab, scat2_ylim, scat2_yticks, shiftdown, strokecolor, strokecolorhilit, strokewidth, strokewidthhilit, svg, titlepos, totalh, totalw, wbot, width, _ref, _ref1, _ref10, _ref11, _ref12, _ref13, _ref14, _ref15, _ref16, _ref17, _ref18, _ref19, _ref2, _ref20, _ref21, _ref22, _ref23, _ref24, _ref25, _ref26, _ref27, _ref28, _ref29, _ref3, _ref30, _ref31, _ref32, _ref33, _ref34, _ref35, _ref36, _ref37, _ref38, _ref39, _ref4, _ref40, _ref41, _ref42, _ref43, _ref44, _ref45, _ref46, _ref47, _ref48, _ref49, _ref5, _ref50, _ref51, _ref52, _ref53, _ref54, _ref6, _ref7, _ref8, _ref9;
  htop = (_ref = chartOpts != null ? chartOpts.htop : void 0) != null ? _ref : 500;
  hbot = (_ref1 = chartOpts != null ? chartOpts.hbot : void 0) != null ? _ref1 : 500;
  width = (_ref2 = chartOpts != null ? chartOpts.width : void 0) != null ? _ref2 : 1000;
  margin = (_ref3 = chartOpts != null ? chartOpts.margin : void 0) != null ? _ref3 : {
    left: 60,
    top: 40,
    right: 40,
    bottom: 40,
    inner: 5
  };
  axispos = (_ref4 = chartOpts != null ? chartOpts.axispos : void 0) != null ? _ref4 : {
    xtitle: 25,
    ytitle: 30,
    xlabel: 5,
    ylabel: 5
  };
  titlepos = (_ref5 = chartOpts != null ? chartOpts.titlepos : void 0) != null ? _ref5 : 20;
  rectcolor = (_ref6 = chartOpts != null ? chartOpts.rectcolor : void 0) != null ? _ref6 : "#E6E6E6";
  pointcolor = (_ref7 = (_ref8 = chartOpts != null ? chartOpts.pointcolor : void 0) != null ? _ref8 : chartOpts != null ? chartOpts.color : void 0) != null ? _ref7 : null;
  pointstroke = (_ref9 = chartOpts != null ? chartOpts.pointstroke : void 0) != null ? _ref9 : "black";
  pointsize = (_ref10 = chartOpts != null ? chartOpts.pointsize : void 0) != null ? _ref10 : 3;
  pointcolorhilit = (_ref11 = (_ref12 = chartOpts != null ? chartOpts.pointcolorhilit : void 0) != null ? _ref12 : chartOpts != null ? chartOpts.colorhilit : void 0) != null ? _ref11 : null;
  pointsizehilit = (_ref13 = chartOpts != null ? chartOpts.pointsizehilit : void 0) != null ? _ref13 : 6;
  strokecolor = (_ref14 = (_ref15 = chartOpts != null ? chartOpts.strokecolor : void 0) != null ? _ref15 : chartOpts != null ? chartOpts.color : void 0) != null ? _ref14 : null;
  strokecolorhilit = (_ref16 = (_ref17 = chartOpts != null ? chartOpts.strokecolorhilit : void 0) != null ? _ref17 : chartOpts != null ? chartOpts.colorhilit : void 0) != null ? _ref16 : null;
  strokewidth = (_ref18 = chartOpts != null ? chartOpts.strokewidth : void 0) != null ? _ref18 : 2;
  strokewidthhilit = (_ref19 = chartOpts != null ? chartOpts.strokewidthhilit : void 0) != null ? _ref19 : 2;
  curves_xlim = (_ref20 = chartOpts != null ? chartOpts.curves_xlim : void 0) != null ? _ref20 : null;
  curves_ylim = (_ref21 = chartOpts != null ? chartOpts.curves_ylim : void 0) != null ? _ref21 : null;
  curves_nxticks = (_ref22 = chartOpts != null ? chartOpts.curves_nxticks : void 0) != null ? _ref22 : 5;
  curves_xticks = (_ref23 = chartOpts != null ? chartOpts.curves_xticks : void 0) != null ? _ref23 : null;
  curves_nyticks = (_ref24 = chartOpts != null ? chartOpts.curves_nyticks : void 0) != null ? _ref24 : 5;
  curves_yticks = (_ref25 = chartOpts != null ? chartOpts.curves_yticks : void 0) != null ? _ref25 : null;
  curves_title = (_ref26 = chartOpts != null ? chartOpts.curves_title : void 0) != null ? _ref26 : "";
  curves_xlab = (_ref27 = (_ref28 = chartOpts != null ? chartOpts.curves_xlab : void 0) != null ? _ref28 : chartOpts != null ? chartOpts.xlab : void 0) != null ? _ref27 : "X";
  curves_ylab = (_ref29 = (_ref30 = chartOpts != null ? chartOpts.curves_ylab : void 0) != null ? _ref30 : chartOpts != null ? chartOpts.ylab : void 0) != null ? _ref29 : "Y";
  scat1_xlim = (_ref31 = chartOpts != null ? chartOpts.scat1_xlim : void 0) != null ? _ref31 : null;
  scat1_ylim = (_ref32 = chartOpts != null ? chartOpts.scat1_ylim : void 0) != null ? _ref32 : null;
  scat1_xNA = (_ref33 = chartOpts != null ? chartOpts.scat1_xNA : void 0) != null ? _ref33 : {
    handle: true,
    force: false,
    width: 15,
    gap: 10
  };
  scat1_yNA = (_ref34 = chartOpts != null ? chartOpts.scat1_yNA : void 0) != null ? _ref34 : {
    handle: true,
    force: false,
    width: 15,
    gap: 10
  };
  scat1_nxticks = (_ref35 = chartOpts != null ? chartOpts.scat1_nxticks : void 0) != null ? _ref35 : 5;
  scat1_xticks = (_ref36 = chartOpts != null ? chartOpts.scat1_xticks : void 0) != null ? _ref36 : null;
  scat1_nyticks = (_ref37 = chartOpts != null ? chartOpts.scat1_nyticks : void 0) != null ? _ref37 : 5;
  scat1_yticks = (_ref38 = chartOpts != null ? chartOpts.scat1_yticks : void 0) != null ? _ref38 : null;
  scat1_title = (_ref39 = chartOpts != null ? chartOpts.scat1_title : void 0) != null ? _ref39 : "";
  scat1_xlab = (_ref40 = chartOpts != null ? chartOpts.scat1_xlab : void 0) != null ? _ref40 : "X";
  scat1_ylab = (_ref41 = chartOpts != null ? chartOpts.scat1_ylab : void 0) != null ? _ref41 : "Y";
  scat2_xlim = (_ref42 = chartOpts != null ? chartOpts.scat2_xlim : void 0) != null ? _ref42 : null;
  scat2_ylim = (_ref43 = chartOpts != null ? chartOpts.scat2_ylim : void 0) != null ? _ref43 : null;
  scat2_xNA = (_ref44 = chartOpts != null ? chartOpts.scat2_xNA : void 0) != null ? _ref44 : {
    handle: true,
    force: false,
    width: 15,
    gap: 10
  };
  scat2_yNA = (_ref45 = chartOpts != null ? chartOpts.scat2_yNA : void 0) != null ? _ref45 : {
    handle: true,
    force: false,
    width: 15,
    gap: 10
  };
  scat2_nxticks = (_ref46 = chartOpts != null ? chartOpts.scat2_nxticks : void 0) != null ? _ref46 : 5;
  scat2_xticks = (_ref47 = chartOpts != null ? chartOpts.scat2_xticks : void 0) != null ? _ref47 : null;
  scat2_nyticks = (_ref48 = chartOpts != null ? chartOpts.scat2_nyticks : void 0) != null ? _ref48 : 5;
  scat2_yticks = (_ref49 = chartOpts != null ? chartOpts.scat2_yticks : void 0) != null ? _ref49 : null;
  scat2_title = (_ref50 = chartOpts != null ? chartOpts.scat2_title : void 0) != null ? _ref50 : "";
  scat2_xlab = (_ref51 = chartOpts != null ? chartOpts.scat2_xlab : void 0) != null ? _ref51 : "X";
  scat2_ylab = (_ref52 = chartOpts != null ? chartOpts.scat2_ylab : void 0) != null ? _ref52 : "Y";
  chartdivid = (_ref53 = chartOpts != null ? chartOpts.chartdivid : void 0) != null ? _ref53 : 'chart';
  nscatter = (scatter1_data != null) + (scatter2_data != null);
  totalh = nscatter === 0 ? htop + margin.top + margin.bottom : htop + hbot + 2 * (margin.top + margin.bottom);
  totalw = width + margin.left + margin.right;
  wbot = (width - margin.left - margin.right) / 2;
  svg = d3.select("div#" + chartdivid).append("svg").attr("height", totalh).attr("width", totalw);
  nind = curve_data.data.length;
  group = (_ref54 = curve_data != null ? curve_data.group : void 0) != null ? _ref54 : (function() {
    var _i, _len, _ref55, _results;
    _ref55 = curve_data.data;
    _results = [];
    for (_i = 0, _len = _ref55.length; _i < _len; _i++) {
      i = _ref55[_i];
      _results.push(1);
    }
    return _results;
  })();
  ngroup = d3.max(group);
  group = (function() {
    var _i, _len, _results;
    _results = [];
    for (_i = 0, _len = group.length; _i < _len; _i++) {
      g = group[_i];
      _results.push(g - 1);
    }
    return _results;
  })();
  pointcolor = pointcolor != null ? pointcolor : selectGroupColors(ngroup, "light");
  pointcolorhilit = pointcolorhilit != null ? pointcolorhilit : selectGroupColors(ngroup, "dark");
  strokecolor = strokecolor != null ? strokecolor : selectGroupColors(ngroup, "light");
  strokecolorhilit = strokecolorhilit != null ? strokecolorhilit : selectGroupColors(ngroup, "dark");
  mycurvechart = curvechart().width(width).height(htop).margin(margin).axispos(axispos).titlepos(titlepos).rectcolor(rectcolor).strokecolor(strokecolor).strokecolorhilit(strokecolorhilit).strokewidth(strokewidth).strokewidthhilit(strokewidthhilit).xlim(curves_xlim).ylim(curves_ylim).nxticks(curves_nxticks).xticks(curves_xticks).nyticks(curves_nyticks).yticks(curves_yticks).title(curves_title).xlab(curves_xlab).ylab(curves_ylab);
  if (nscatter > 0) {
    myscatterplot1 = scatterplot().width(wbot).height(hbot).margin(margin).axispos(axispos).titlepos(titlepos).rectcolor(rectcolor).pointcolor(pointcolor).pointstroke(pointstroke).pointsize(pointsize).xlim(scat1_xlim).ylim(scat1_ylim).xNA(scat1_xNA).yNA(scat1_yNA).nxticks(scat1_nxticks).xticks(scat1_xticks).nyticks(scat1_nyticks).yticks(scat1_yticks).title(scat1_title).xlab(scat1_xlab).ylab(scat1_ylab);
  }
  if (nscatter === 2) {
    myscatterplot2 = scatterplot().width(wbot).height(hbot).margin(margin).axispos(axispos).titlepos(titlepos).rectcolor(rectcolor).pointcolor(pointcolor).pointstroke(pointstroke).pointsize(pointsize).xlim(scat2_xlim).ylim(scat2_ylim).xNA(scat2_xNA).yNA(scat2_yNA).nxticks(scat2_nxticks).xticks(scat2_xticks).nyticks(scat2_nyticks).yticks(scat2_yticks).title(scat2_title).xlab(scat2_xlab).ylab(scat2_ylab);
  }
  g_curves = svg.append("g").attr("id", "curvechart").datum(curve_data).call(mycurvechart);
  shiftdown = htop + margin.top + margin.bottom;
  if (nscatter > 0) {
    g_scat1 = svg.append("g").attr("id", "scatterplot1").attr("transform", "translate(0," + shiftdown + ")").datum(scatter1_data).call(myscatterplot1);
  }
  if (nscatter === 2) {
    g_scat2 = svg.append("g").attr("id", "scatterplot2").attr("transform", "translate(" + (wbot + margin.left + margin.right) + "," + shiftdown + ")").datum(scatter2_data).call(myscatterplot2);
  }
  if (nscatter > 0) {
    points1 = myscatterplot1.pointsSelect();
  }
  if (nscatter === 2) {
    points2 = myscatterplot2.pointsSelect();
  }
  if (nscatter === 1) {
    allpoints = [points1];
  }
  if (nscatter === 2) {
    allpoints = [points1, points2];
  }
  curves = mycurvechart.curvesSelect();
  pointcolor = expand2vector(pointcolor, ngroup);
  pointcolorhilit = expand2vector(pointcolorhilit, ngroup);
  strokecolor = expand2vector(strokecolor, ngroup);
  strokecolorhilit = expand2vector(strokecolorhilit, ngroup);
  curves.on("mouseover", function(d, i) {
    d3.select(this).attr("stroke", strokecolorhilit[group[i]]).moveToFront();
    if (nscatter > 0) {
      d3.selectAll("circle.pt" + i).attr("r", pointsizehilit);
    }
    if (nscatter > 0) {
      return d3.selectAll("circle.pt" + i).attr("fill", pointcolorhilit[group[i]]);
    }
  }).on("mouseout", function(d, i) {
    d3.select(this).attr("stroke", strokecolor[group[i]]).moveToBack();
    if (nscatter > 0) {
      d3.selectAll("circle.pt" + i).attr("r", pointsize);
    }
    if (nscatter > 0) {
      return d3.selectAll("circle.pt" + i).attr("fill", pointcolor[group[i]]);
    }
  });
  if (nscatter > 0) {
    return allpoints.forEach(function(points) {
      return points.on("mouseover", function(d, i) {
        d3.selectAll("circle.pt" + i).attr("r", pointsizehilit);
        d3.selectAll("circle.pt" + i).attr("fill", pointcolorhilit[group[i]]);
        return d3.select("path.path" + i).attr("stroke", strokecolorhilit[group[i]]).moveToFront();
      }).on("mouseout", function(d, i) {
        d3.selectAll("circle.pt" + i).attr("r", pointsize);
        d3.selectAll("circle.pt" + i).attr("fill", pointcolor[group[i]]);
        return d3.select("path.path" + i).attr("stroke", strokecolor[group[i]]).moveToBack();
      });
    });
  }
};
