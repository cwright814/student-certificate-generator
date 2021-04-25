export interface MsgBoxOptions {
  [k: string]: any;
}

export default interface IBvModalWrapper {
  msgBoxDefaults: MsgBoxOptions;
  msgBoxConfirm(message: string, options?: MsgBoxOptions): Promise<any>;
  msgBoxOk(message: string, options?: MsgBoxOptions): Promise<any>;
  msgBoxError(message: string, options?: MsgBoxOptions): Promise<any>;
  msgBoxFallback(error?: Error, message?: string): void;
}
