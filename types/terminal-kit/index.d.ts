import * as stream from 'stream';

// Terminal.js

export const terminal: Terminal;

export const realTerminal: Terminal;

export function createTerminal(options: CreateTerminalOptions): Terminal;

// TODO : check args
export function getParentTerminalInfo(callback: (error: any,
                                                 codename: string,
                                                 name: string,
                                                 pid: number) => void): void;

export function getDetectedTerminal(callback: (error: any, term: Terminal) => void): void;

export function autoComplete(array: string[],
                             startString: string,
                             returnAlternatives?: boolean,
                             prefix?: string,
                             postfix?: string): void;

export function stripEscapeSequences(str: string): string;

export function stringWidth(str: string): number;

export function truncateString(str: string, maxWidth: number): string;

type BoolFunc = (enable: boolean) => Terminal;

type PrintfFunc = (format: string, ...args: any[]) => Terminal;

type StringFunc = (arg: string)=> Terminal;

type NumFunc = (register: number)=> Terminal;

type TermOrFunc = BoolFunc | PrintfFunc | Terminal;

type TermOrNumFunc = NumFunc | Terminal;

type RgbFunc = (r: number, g: number, b: number) => Terminal;

type TermOrRgbFunc = RgbFunc | BoolFunc | Terminal;

export class Terminal {
    width: number;
    height: number;

    // ??? How to allow chaining?
    defaultColor : TermOrFunc;

    black: TermOrFunc;

    red: TermOrFunc;

    green: TermOrFunc;

    yellow: TermOrFunc;

    blue: TermOrFunc;

    magenta: TermOrFunc;

    cyan: TermOrFunc;

    white: TermOrFunc;

    brightBlack: TermOrFunc;

    brightRed: TermOrFunc;

    brightGreen: TermOrFunc;

    brightYellow: TermOrFunc;

    brightBlue: TermOrFunc

    brightMagenta: TermOrFunc;

    brightCyan: TermOrFunc;

    brightWhite: TermOrFunc;

    color: TermOrNumFunc;

    darkColor: TermOrNumFunc;

    brightColor: TermOrNumFunc;

    color256: TermOrNumFunc;

    colorRgb: TermOrRgbFunc;

    colorRgbHex(rgb: string): StringFunc | Terminal;

    colorGrayscale(l: number): TermOrNumFunc;

    bgDefaultColor(): TermOrFunc

    bgBlack(): TermOrFunc;

    bgRed(): TermOrFunc;

    bgGreen(): TermOrFunc;

    bgYellow(): TermOrFunc;

    bgBlue(): TermOrFunc;

    bgMagenta(): TermOrFunc;

    bgCyan(): TermOrFunc;

    bgWhite(): TermOrFunc;

    bgDarkColor(): TermOrFunc;

    bgBrightBlack(): TermOrFunc;

    bgGray: TermOrFunc;
    bgBrightRed: TermOrFunc;
    bgBrightGreen: TermOrFunc
    bgBrightYellow: TermOrFunc;
    bgBrightBlue: TermOrFunc;
    bgBrightMagenta: TermOrFunc
    bgBrightCyan: TermOrFunc;
    bgColor: TermOrNumFunc;
    bgBrightWhite: TermOrFunc;
    bgBrightColor: TermOrNumFunc;
    bgColor256: TermOrNumFunc;
    bgColorRgb: TermOrRgbFunc;
    bgColorRgbHex: StringFunc | Terminal;
    bgColorGrayScale: TermOrNumFunc;

    styleReset: TermOrFunc;
    bold: TermOrFunc;
    dim: TermOrFunc;
    italic: TermOrFunc;
    underline: TermOrFunc;
    blink: TermOrFunc;
    inverse: TermOrFunc;
    hidden: TermOrFunc;
    strike: TermOrFunc;

    // TODO : missing functions (high-level)


}

type CreateTerminalOptions = {
    stdin: stream.Readable, stdout: stream.Writable, stderr: stream.Writable, generic: string, appId: string, appName: string, processSigwinch: boolean, preferProcessSigwinch: boolean
}

// Rect.js

export class Rect {
    xmin: number;
    xmax: number;
    ymin: number;
    ymax: number;
    width: number;
    height: number;
    isNull: boolean;

    set(object: Rect): void;

    clip(dstRect: number, offsetX: number, offsetY: number, dstClipping: number): Rect;

    static create(xmin: number | RectLike, ymin?: number, xmax?: number, ymax?: number): Rect;

    static wrappingRect(params: WrappingRectParams): WrappingRectParams[];

    constructor();
}

// TODO : inline this?
type RectLike =
    { xmin: number, ymin: number, xmax: number, ymax: number }
    | { x: number, y: number, width: number, height: number };

type WrappingRectParams = { srcRect: Rect, dstRect: Rect, offsetX: number, offsetY: number, wrapOnly: string };

export interface Terminal {

}

// ScreenBuffer.js

interface ScreenBufferOptions {
    width: number,
    height: number,
    dst: Terminal | ScreenBuffer,
    x?: number,
    y?: number,
    wrap: boolean,
    noFill: boolean,
    // AUTHOR'S NOTE : any truthy value, allows extension. Any better way?
    blending: boolean | any
}

type CreateFromStringOptions = { attr: ScreenBufferAttributes, transparencyChar: string, transparencyType: number }

type ShrinkOptions = { width: number, height: number }

type LoadImageOptions = {
    term: Terminal, shrink: ShrinkOptions
}

type ResizeRect = RectLike | { width: number, height: number, x?: number, y?: number };

type ScreenBufferAttributes = {
    color: string | number, bgColor: string | number, defaultColor: boolean, bgDefaultColor: boolean, bold: boolean, dim: boolean, italic: boolean, underline: boolean, blink: boolean, inverse: boolean, hidden: boolean, strike: boolean, //Transparency
    transparency: boolean, fgTransparency: boolean, bgTransperency: boolean, styleTransparency: boolean, charTransparency: boolean
}

type FillOptions<A> = {
    char: string, attr: A, buffer: Buffer, start: number, end: number, clearBuffer: Buffer
}

type PutOptions<A> = {
    x: number, y: number, attr: A | number, wrap: boolean, direction: 'right' | 'left' | 'up' | 'down' | 'none'
    dx: number, dy: number
}

type GetOptions = {
    x?: number, y?: number
}

type GetReturn<A> = {
    char: string, attr: A
}

type DrawOptions = {
    dst: Terminal | ScreenBuffer, x?: number, y?: number, srcClipRect?: Rect, dstClipRect?: Rect, blending?: boolean, delta?: boolean, wrap?: boolean | 'x' | 'y' | 'both', tile?: boolean
}

type DrawCursorOptions = {
    dst: Terminal | ScreenBuffer
}

declare class AScreenBuffer<A> {
    bitsPerColor: number;
    dst: Terminal | ScreenBuffer;
    width: number;
    height: number;
    x: number;
    y: number;
    cx: number;
    cy: number;
    lastBuffer: boolean; // TODO REVIEW
    lastBufferUpToDate: boolean;
    blending: any;
    wrap: boolean;
    buffer: Buffer;
    // prototype "constants"
    ATTR_SIZE: number;
    CHAR_SIZE: number;
    ITEM_SIZE: number;
    DEFAULT_ATTR: number;
    CLEAR_ATTR: number;
    CLEAR_BUFFER: number;

    create(options: any): AScreenBuffer<A>;

    static createFromString(options: CreateFromStringOptions, data: string): ScreenBuffer;

    static createFromChars(options: CreateFromStringOptions, data: string): ScreenBuffer;

    static loadImage(url: string, options?: any, callback?: (error: boolean, image: ScreenBufferHD) => void): void;

    attr2object(attrFlags: number): A;

    object2attr(attrObject: A): number;

    static loadSync(filePath: string): ScreenBuffer;

    fill(options?: any): void;

    clear(): void;

    put(options: PutOptions<A>, format: String, ...args: string[]): void;

    get(options?: GetOptions): GetReturn<ScreenBufferAttributes>;

    resize(fromRect: ResizeRect): void;

    draw(options?: any): void;

    drawCursor(options?: DrawCursorOptions): void;

    moveTo(x: number, y: number): void;

    vScroll(offset: number, drawToTerminal?: boolean): void;

    dumpChars(): string;

    dump(): string;

    saveSync(filepath: string): void;
}

export class ScreenBuffer extends AScreenBuffer<ScreenBufferAttributes> {
    blending: boolean;

    static create(options: ScreenBufferOptions): ScreenBuffer;

    draw(options?: DrawOptions): void;

    fill(options?: FillOptions<ScreenBufferAttributes>): void;

    static loadImage(url: string,
                     options: LoadImageOptions,
                     callback: (error: boolean, image: ScreenBufferHD) => void): void;

    static attr2object(attrFlags: number): ScreenBufferAttributes;

    static object2attr(attrObject: ScreenBufferAttributes): number;
}

// ScreenBufferHD.js

type BlendingOptions = { fn?: (src: number, dst: number) => number, opacity: number, blendSrcFgWithDstBg: boolean };

interface ScreenBufferHDOptions extends ScreenBufferOptions {
    fn: (src: number, dst: number) => number,
    blending: boolean | BlendingOptions;
}

type BlendFunctions = {
    normal: (src: number, dst: number) => number, multiply: (src: number, dst: number) => number, screen: (src: number,
                                                                                                           dst: number) => number, overlay: (src: number,
                                                                                                                                             dst: number) => number, hardLight: (src: number,
                                                                                                                                                                                 dst: number) => number, softLiight: (src: number,
                                                                                                                                                                                                                      dst: number) => number
}

type ScreenBufferHDLoadImageOptions = {
    shrink?: { width: number, height: number }, callback: (error: boolean, image: ScreenBufferHD) => void
};

export class ScreenBufferHD extends AScreenBuffer<ScreenBufferHDAttributes> {
    static blendFn: BlendFunctions;
           blending: false | BlendingOptions;

    fill(options?: FillOptions<ScreenBufferHDAttributes>): void;

    static create(options: boolean | ScreenBufferHDOptions): ScreenBufferHD;

    static loadImage(url: string, options?: ScreenBufferHDLoadImageOptions): void;

    static attr2object(attrFlags: number): ScreenBufferHDAttributes;

    static object2attr(attrObject: ScreenBufferHDAttributes): number;

    draw(options?: false | BlendingOptions): void;
}

type ScreenBufferHDAttributes = {
    r: number, g: number, b: number, a: number, defaultColor: boolean, bgR: number, bgG: number, bgB: number, bgA: number, bgDefaultColor: number, bol: boolean, dim: boolean, italic: boolean, underline: boolean, blink: boolean, inverse: boolean, hidden: boolean, strike: boolean, transparency: boolean, styleTransparency: boolean, charTransparency: boolean
}

// TextBuffer.js

export abstract class TextBuffer {
    x: number;
    y: number;

    getText(): string;

    setText(text: string): void;

    getHidden(): boolean;

    setHidden(state: boolean): void;

    getContentSize(): ContentSize;

    setEmptyCellAttr(attr: number | ScreenBufferAttributes): void;

    setAttrAt(attr: number | ScreenBufferAttributes, x: number, y: number): void;

    setAttrCodeAt(attr: number, x: number, y: number): void;

    setAttrRegion(attr: number | ScreenBufferAttributes, region?: TextBufferRegion): void;

    setAttrCodeRegion(attr: number, region?: TextBufferRegion): void;

    getMisc(): Misc;

    getMiscAt(x: number, y: number): Misc;

    moveTo(x: number, y: number): void;

    moveToColumn(x: number): void;

    moveToLine(y: number): void;

    moveToRow(y: number): void;

    move(x: number, y: number): void;

    moveUp(): void;

    moveDown(): void;

    moveLeft(): void;

    moveRight(): void;

    moveForward(justSkipNullCells: boolean): void;

    moveBackward(justSkipNullCells: boolean): void;

    moveToEndOfLine(): void;

    moveInBound(ignoreCx: boolean): void;

    insert(text: string, attr?: number | ScreenBufferAttributes): void;

    delete(n?: number): void;

    backDelete(n?: number): void;

    newLine(): void;

    joinLine(): void;

    iterate(options: IterateOptions, callback: (cellData: CellData) => void): void;

    draw(options?: TextBufferDrawOptions): void;

    drawCursor(options?: TextBufferDrawCursorOptions): void;

    load(filepath: string, callback: (error?: any) => void): void;

    save(filepath: string, callback: (error?: any) => void): void;

    static create(options: TextBufferOptions): void;
}

type TextBufferOptions = {
    dst: ScreenBuffer, width?: number, height?: number, x?: number, y?: number, tabWidth?: number, forceInBound?: number, hidden?: boolean, wrap?: boolean
}

type ContentSize = {
    width: number, height: number
}

type TextBufferRegion = {
    xmin: number, xmax: number, ymin: number, ymax: number
}

interface Misc {
    [key: string]: any;
}

type IterateOptions = {
    finalCall: boolean;
}

interface CellData {
    offset: number;
    x: number;
    y: number;
    text: string;
    attr: number;
    misc: Misc;
}

type TextBufferDrawOptions = {
    dst?: ScreenBuffer, x?: number, y?: number, srcClipRect?: Rect, dstClipRect?: Rect, blending?: boolean, wrap?: boolean | 'x' | 'y' | 'both', tile?: boolean
}

type TextBufferDrawCursorOptions = {
    dst?: ScreenBuffer
}

// TODO : Events

// TODO : Noteworthy constants (global & class-specific



