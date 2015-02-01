// Generated by CoffeeScript 1.8.0
var lodheatmap;

lodheatmap = function() {
  var axispos, cellSelect, chart, chrGap, colors, height, lod_labels, margin, nullcolor, nyticks, quantScale, rectcolor, rotate_ylab, title, titlepos, width, xlab, xscale, ylab, yscale, yticks, zlim, zscale, zthresh;
  width = 1200;
  height = 600;
  margin = {
    left: 60,
    top: 40,
    right: 40,
    bottom: 40
  };
  axispos = {
    xtitle: 25,
    ytitle: 30,
    xlabel: 5,
    ylabel: 5
  };
  chrGap = 8;
  titlepos = 20;
  rectcolor = "#e6e6e6";
  nullcolor = "#e6e6e6";
  colors = ["slateblue", "white", "crimson"];
  title = "";
  xlab = "Chromosome";
  ylab = "";
  rotate_ylab = null;
  zlim = null;
  zthresh = null;
  quantScale = null;
  lod_labels = null;
  nyticks = 5;
  yticks = null;
  xscale = d3.scale.linear();
  yscale = d3.scale.linear();
  zscale = d3.scale.linear();
  cellSelect = null;
  chart = function(selection) {
    return selection.each(function(data) {
      var cells, celltip, chr, extent, g, gEnter, i, j, lod, lodcol, nlod, pos, quant_y_scale, rectHeight, svg, titlegrp, xLR, xaxis, yaxis, zmax, zmin, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _ref1, _ref2, _ref3, _ref4;
      data = reorgLodData(data);
      data = chrscales(data, width, chrGap, margin.left, true);
      xscale = data.xscale;
      nlod = data.lodnames.length;
      yscale.domain([-0.5, nlod - 0.5]).range([margin.top + height, margin.top]);
      rectHeight = yscale(0) - yscale(1);
      xLR = {};
      _ref = data.chrnames;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        chr = _ref[_i];
        xLR[chr] = getLeftRight(data.posByChr[chr]);
      }
      zmin = 0;
      zmax = 0;
      _ref1 = data.lodnames;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        lodcol = _ref1[_j];
        extent = d3.extent(data[lodcol]);
        if (extent[0] < zmin) {
          zmin = extent[0];
        }
        if (extent[1] > zmax) {
          zmax = extent[1];
        }
      }
      if (-zmin > zmax) {
        zmax = -zmin;
      }
      zlim = zlim != null ? zlim : [-zmax, 0, zmax];
      if (zlim.length !== colors.length) {
        displayError("zlim.length (" + zlim.length + ") != colors.length (" + colors.length + ")");
      }
      zscale.domain(zlim).range(colors);
      zthresh = zthresh != null ? zthresh : zmin - 1;
      data.cells = [];
      _ref2 = data.chrnames;
      for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
        chr = _ref2[_k];
        _ref3 = data.posByChr[chr];
        for (i = _l = 0, _len3 = _ref3.length; _l < _len3; i = ++_l) {
          pos = _ref3[i];
          _ref4 = data.lodByChr[chr][i];
          for (j = _m = 0, _len4 = _ref4.length; _m < _len4; j = ++_m) {
            lod = _ref4[j];
            if (lod >= zthresh || lod <= -zthresh) {
              data.cells.push({
                z: lod,
                left: (xscale[chr](pos) + xscale[chr](xLR[chr][pos].left)) / 2,
                right: (xscale[chr](pos) + xscale[chr](xLR[chr][pos].right)) / 2,
                lodindex: j,
                chr: chr,
                pos: pos
              });
            }
          }
        }
      }
      lod_labels = lod_labels != null ? lod_labels : data.lodnames;
      svg = d3.select(this).selectAll("svg").data([data]);
      gEnter = svg.enter().append("svg").append("g");
      svg.attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom);
      g = svg.select("g");
      g.append("g").attr("id", "boxes").selectAll("empty").data(data.chrnames).enter().append("rect").attr("id", function(d) {
        return "box" + d;
      }).attr("x", function(d, i) {
        return data.chrStart[i];
      }).attr("y", function(d) {
        return margin.top;
      }).attr("height", height).attr("width", function(d, i) {
        return data.chrEnd[i] - data.chrStart[i];
      }).attr("fill", rectcolor).attr("stroke", "none");
      titlegrp = g.append("g").attr("class", "title").append("text").attr("x", margin.left + width / 2).attr("y", margin.top - titlepos).text(title);
      xaxis = g.append("g").attr("class", "x axis");
      xaxis.selectAll("empty").data(data.chrnames).enter().append("text").attr("x", function(d, i) {
        return (data.chrStart[i] + data.chrEnd[i]) / 2;
      }).attr("y", margin.top + height + axispos.xlabel).text(function(d) {
        return d;
      });
      xaxis.append("text").attr("class", "title").attr("x", margin.left + width / 2).attr("y", margin.top + height + axispos.xtitle).text(xlab);
      rotate_ylab = rotate_ylab != null ? rotate_ylab : ylab.length > 1;
      yaxis = g.append("g").attr("class", "y axis");
      yaxis.append("text").attr("class", "title").attr("y", margin.top + height / 2).attr("x", margin.left - axispos.ytitle).text(ylab).attr("transform", rotate_ylab ? "rotate(270," + (margin.left - axispos.ytitle) + "," + (margin.top + height / 2) + ")" : "");
      if (quantScale != null) {
        quant_y_scale = d3.scale.linear().domain([quantScale[0], quantScale[quantScale.length - 1]]).range([margin.top + height - rectHeight / 2, margin.top + rectHeight / 2]);
        yticks = yticks != null ? yticks : quant_y_scale.ticks(nyticks);
        yaxis.selectAll("empty").data(yticks).enter().append("text").attr("y", function(d) {
          return quant_y_scale(d);
        }).attr("x", margin.left - axispos.ylabel).text(function(d) {
          return formatAxis(yticks)(d);
        });
      } else {
        yaxis.selectAll("empty").data(lod_labels).enter().append("text").attr("id", function(d, i) {
          return "yaxis" + i;
        }).attr("y", function(d, i) {
          return yscale(i);
        }).attr("x", margin.left - axispos.ylabel).text(function(d) {
          return d;
        }).attr("opacity", 0);
      }
      celltip = d3.tip().attr('class', 'd3-tip').html(function(d) {
        var p, z;
        z = d3.format(".2f")(Math.abs(d.z));
        p = d3.format(".1f")(d.pos);
        return "" + d.chr + "@" + p + ", " + lod_labels[d.lodindex] + " &rarr; " + z;
      }).direction('e').offset([0, 10]);
      svg.call(celltip);
      cells = g.append("g").attr("id", "cells");
      cellSelect = cells.selectAll("empty").data(data.cells).enter().append("rect").attr("x", function(d) {
        return d.left;
      }).attr("y", function(d) {
        return yscale(d.lodindex) - rectHeight / 2;
      }).attr("width", function(d) {
        return d.right - d.left;
      }).attr("height", rectHeight).attr("class", function(d, i) {
        return "cell" + i;
      }).attr("fill", function(d) {
        if (d.z != null) {
          return zscale(d.z);
        } else {
          return nullcolor;
        }
      }).attr("stroke", "none").attr("stroke-width", "1").on("mouseover.paneltip", function(d) {
        yaxis.select("text#yaxis" + d.lodindex).attr("opacity", 1);
        d3.select(this).attr("stroke", "black");
        return celltip.show(d);
      }).on("mouseout.paneltip", function(d) {
        yaxis.select("text#yaxis" + d.lodindex).attr("opacity", 0);
        d3.select(this).attr("stroke", "none");
        return celltip.hide();
      });
      return g.append("g").attr("id", "boxes").selectAll("empty").data(data.chrnames).enter().append("rect").attr("id", function(d) {
        return "box" + d;
      }).attr("x", function(d, i) {
        return data.chrStart[i];
      }).attr("y", function(d) {
        return margin.top;
      }).attr("height", height).attr("width", function(d, i) {
        return data.chrEnd[i] - data.chrStart[i];
      }).attr("fill", "none").attr("stroke", "black").attr("stroke-width", "none");
    });
  };
  chart.width = function(value) {
    if (!arguments.length) {
      return width;
    }
    width = value;
    return chart;
  };
  chart.height = function(value) {
    if (!arguments.length) {
      return height;
    }
    height = value;
    return chart;
  };
  chart.margin = function(value) {
    if (!arguments.length) {
      return margin;
    }
    margin = value;
    return chart;
  };
  chart.axispos = function(value) {
    if (!arguments.length) {
      return axispos;
    }
    axispos = value;
    return chart;
  };
  chart.titlepos = function(value) {
    if (!arguments.length) {
      return titlepos;
    }
    titlepos = value;
    return chart;
  };
  chart.rectcolor = function(value) {
    if (!arguments.length) {
      return rectcolor;
    }
    rectcolor = value;
    return chart;
  };
  chart.nullcolor = function(value) {
    if (!arguments.length) {
      return nullcolor;
    }
    nullcolor = value;
    return chart;
  };
  chart.colors = function(value) {
    if (!arguments.length) {
      return colors;
    }
    colors = value;
    return chart;
  };
  chart.title = function(value) {
    if (!arguments.length) {
      return title;
    }
    title = value;
    return chart;
  };
  chart.xlab = function(value) {
    if (!arguments.length) {
      return xlab;
    }
    xlab = value;
    return chart;
  };
  chart.ylab = function(value) {
    if (!arguments.length) {
      return ylab;
    }
    ylab = value;
    return chart;
  };
  chart.rotate_ylab = function(value) {
    if (!arguments.length) {
      return rotate_ylab;
    }
    rotate_ylab = value;
    return chart;
  };
  chart.zthresh = function(value) {
    if (!arguments.length) {
      return zthresh;
    }
    zthresh = value;
    return chart;
  };
  chart.zlim = function(value) {
    if (!arguments.length) {
      return zlim;
    }
    zlim = value;
    return chart;
  };
  chart.chrGap = function(value) {
    if (!arguments.length) {
      return chrGap;
    }
    chrGap = value;
    return chart;
  };
  chart.nyticks = function(value) {
    if (!arguments.length) {
      return nyticks;
    }
    nyticks = value;
    return chart;
  };
  chart.yticks = function(value) {
    if (!arguments.length) {
      return yticks;
    }
    yticks = value;
    return chart;
  };
  chart.quantScale = function(value) {
    if (!arguments.length) {
      return quantScale;
    }
    quantScale = value;
    return chart;
  };
  chart.lod_labels = function(value) {
    if (!arguments.length) {
      return lod_labels;
    }
    lod_labels = value;
    return chart;
  };
  chart.xscale = function() {
    return xscale;
  };
  chart.yscale = function() {
    return yscale;
  };
  chart.zscale = function() {
    return zscale;
  };
  chart.cellSelect = function() {
    return cellSelect;
  };
  return chart;
};