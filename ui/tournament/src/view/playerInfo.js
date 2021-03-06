var m = require('mithril');
var partial = require('chessground').util.partial;
var util = require('./util');
var status = require('game').status;

function result(win, stat) {
  switch (win) {
    case true:
      return '1';
    case false:
      return '0';
    default:
      return stat >= status.ids.mate ? '½' : '*';
  }
}

module.exports = function(ctrl) {
  var data = ctrl.vm.playerInfo.data;
  if (!data || data.player.id !== ctrl.vm.playerInfo.id) return m('span.square-spin');
  return m('div.player', {
    config: function(el, isUpdate) {
      if (!isUpdate) $('body').trigger('lichess.content_loaded');
    }
  }, [
    m('h2', util.player(data.player)),
    m('div.scroll-shadow-soft', m('table', data.pairings.map(function(p) {
      var res = result(p.win, p.status);
      return m('tr', {
        onclick: function() {
          window.open('/' + p.id + '/' + p.color, '_blank');
        },
        class: res === '1' ? 'win' : (res === '0' ? 'loss' : '')
      }, [
        m('td', (p.op.title ? p.op.title + ' ' : '') + p.op.name),
        m('td', p.op.rating),
        m('td', {
          'class': 'is color-icon ' + p.color
        }),
        m('td', res)
      ]);
    })))
  ]);
};
