# (Awesome) React Repl

Display or interact with a REPL (Read Eval Print Loop). Create an interactive terminal for Python,
Javascript or whatever in React.

[Try it out](https://www.seveibar.com/react-repl/?path=/story/reactrepljs--main)


![promises](https://user-images.githubusercontent.com/1910070/107008052-50cc7f80-6761-11eb-8ccc-61f79167f24b.png)
![error](https://user-images.githubusercontent.com/1910070/107008157-7194d500-6761-11eb-8816-03111757ccf4.png)

## Usage

`npm install awesome-react-repl`


### Javascript REPL

```javascript
import { ReactReplJS } from "awesome-react-repl"

const JavascriptRepl = () => {
  return  (
    <ReactReplJS
      title="My Javascript Repl!"
      height={300}
      initiallyExecute={["a = 3", "b = 4", "a * b"]}
    />
  )
}
```

### General-Purpose REPL UI

```javascript
import { ReactReplView } from "awesome-react-repl"

const GeneralPurposeReplUI = () => {
  return  (
    <ReactReplView
      title={`My Awesome Repl!`}
      tabs={["Javascript", "Python"]}
      selectedTab="Javascript"
      onChangeTab={action("onChangeTab")}
      onSubmit={action("onSubmit")}
      onClear={action("onClear")}
      height={200}
      lines={[
        { type: "input", value: "obj = { something: 2 }" },
        { type: "output", value: '{ "something": 2 }' },
        { type: "input", value: "b" },
        { type: "error", value: "TypeError: b is not defined" },
      ]}
    />
  )
}
```

## Advanced Javascript REPL Usage

```javascript
import { useReactReplJS } from "awesome-react-repl"

const JavascriptRepl = () => {
  const { submitCode, ReactRepl } = useReactReplJS() 
  return  (
    <div>
      <ReactRepl
        title="My Javascript Repl!"
        height={300}
        initiallyExecute={["a = 3", "b = 4", "a * b"]}
      />
      <button onClick={() => submitCode('alert(`Button pressed! a=${a}! This will appear in the REPL!`)')}>Alert!</button>
    </div>
  )
}
```

## Development

1. Run `yarn install`
2. Run `yarn storybook`
