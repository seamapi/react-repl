import "core-js/features/reflect";

//import { Field, Int, ObjectType } from "type-graphql";
import { FC, ReactNode } from "react";

//@ObjectType()
export class Scope {
    name!: string;    
};

export type Value=string;

export type LinesT = LineT[];

export type EvalCodeFunction = (code: string) => Promise<void>;

//@ObjectType()
export class ReactReplPropsT {
  title?: string;
  stealFocus?: boolean;
  tabs?: string[];
  selectedTab?: string;
  onChangeTab?: (tab: string) => void;
  onClear?: () => void;
  onSubmit?: (input: string) => void;
  submitCodeRef?: React.MutableRefObject<EvalCodeFunction|undefined|null>;
  //@Field()
  lines?: LinesT|undefined;
  //@Field()
  initialLines?: LinesT | (() => LinesT);
  //@Field()
  initiallyExecute?: string[];
  
  height?: number;
};

//@ObjectType()
export class LineT {
    type: 'input' | 'output' | 'error' = "input";
    value!: string;
}

export type FCReactReplPropsT = FC<ReactReplPropsT>;
