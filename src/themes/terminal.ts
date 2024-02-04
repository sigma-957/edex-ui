import { IStyle } from '@/models';
import Color from 'color';
import join from 'lodash/join';
import { ITerminalInitOnlyOptions, ITerminalOptions } from 'xterm';

function colorify(color: string, theme: string) {
  return Color(color).mix(Color(theme), 0.3).hex();
}

const FALL_BACK_FONTS = ['Roboto Mono', 'Ubuntu Mono'];
export default function generateTerminalTheme(
  style: IStyle,
): ITerminalOptions | ITerminalInitOnlyOptions {
  return {
    cols: 190,
    rows: 30,
    allowProposedApi: true,
    cursorBlink: true,
    cursorStyle: style.terminal.cursorStyle,
    allowTransparency: false,
    fontFamily: join([style.terminal.fontFamily, ...FALL_BACK_FONTS], ', '),
    fontWeight: 'normal',
    fontWeightBold: 'bold',
    letterSpacing: 0,
    lineHeight: 1,
    scrollback: 10e6,
    theme: {
      foreground: style.terminal.foreground,
      background: style.terminal.background,
      cursor: style.terminal.cursor,
      cursorAccent: style.terminal.cursorAccent,
      black: style.colors.black || colorify('#000000', style.colors.main),
      red: style.colors.red || colorify('#ff3300', style.colors.main),
      green: style.colors.green || colorify('#ff9900', style.colors.main),
      yellow: style.colors.yellow || colorify('#cc9966', style.colors.main),
      blue: style.colors.blue || colorify('#9966ff', style.colors.main),
      magenta: style.colors.magenta || colorify('#cc6699', style.colors.main),
      cyan: style.colors.cyan || colorify('#9999cc', style.colors.main),
      white: style.colors.white || colorify('#cc6639', style.colors.main),
      brightBlack:
        style.colors.brightBlack || colorify('#666699', style.colors.main),
      brightRed:
        style.colors.brightRed || colorify('#ff3300', style.colors.main),
      brightGreen:
        style.colors.brightGreen || colorify('#ff9900', style.colors.main),
      brightYellow:
        style.colors.brightYellow || colorify('#ffcc66', style.colors.main),
      brightBlue:
        style.colors.brightBlue || colorify('#9999ff', style.colors.main),
      brightMagenta:
        style.colors.brightMagenta || colorify('#cc99cc', style.colors.main),
      brightCyan:
        style.colors.brightCyan || colorify('#99ccff', style.colors.main),
      brightWhite:
        style.colors.brightWhite || colorify('#99669f', style.colors.main),
    },
  };
}
