import * as React from 'react';
import { TodoListProvider, todoContext, page } from "../store/todo.store";
import { TodoAdd } from './todo.add'
import { TodoList } from './todo.list'
import { TodoListItem } from './todo.list.item';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

interface AppProps { compiler: string; framework: string; store: string; routing: string; }
interface MainProps {
    history: any
    location: any
    match: any
    staticContext: any
}
const Main: React.FC<MainProps> = (props) => {
    const [todos, dispatch] = React.useContext(todoContext);
    return (
        <div>
            {(todos.records && todos.records.length == 0) ?
                <div className="col-sm-4">
                    <TodoAdd {...props} />
                </div> :
                <div className="col-sm-12 text-right"><Link className="btn btn-primary btn-link" to={`${props.match.url}add`}>Create New Task</Link></div>
            }
            <div className={(todos.records && todos.records.length == 0) ? "col-sm-8" : "col-md-8 col-md-offset-2"}>
                <TodoList {...props} />
            </div>
        </div >
    )
}

const LineItem: React.FC<MainProps> = (props): any => {
    const [todos, dispatch] = React.useContext(todoContext);
    if (!todos.record) {
        return (<Redirect to={page.PATH} />)
    } else {
        return (
            <TodoListItem todo={todos.record} isSelected={true} {...props} />
        )
    }
}

export const App: React.FC<AppProps> = (props) => {
    return (
        <TodoListProvider>
            <h1 className="title">Simple Task List with {props.compiler}, {props.framework} and {props.routing}! <a className="btn btn-primary" target="_blank" href="https://github.com/khairulanshar98/reactrouting">source</a></h1>
            <Router >
                <Switch>
                    <Route path={page.PATH} component={Home} />
                    <Route render={() => <Redirect to={page.PATH} />} />
                </Switch>
            </Router>
        </TodoListProvider>
    )
}

export const Home: React.FC<MainProps> = (props) => {
    return (
        <Router >
            <Switch>
                <Route exact path={`${props.match.path}`} component={Main} />
                <Route path={`${props.match.path}/add`} render={(props) => <div className="col-md-4 col-md-offset-4"><TodoAdd {...props} /></div>} />
                <Route path={`${props.match.path}/select`} render={(props) => <div className="col-md-8 col-md-offset-2"><LineItem {...props} /></div>} />
                <Route render={() => <Redirect to={page.PATH} />} />
            </Switch>
        </Router>
    )
}


