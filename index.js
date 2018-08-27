'use strict';
const program = require('commander');
const fs = require('fs');
const chalk = require('chalk');
const changeCase = require('change-case');

const getParams = params => {
    params = params.split(",");

    for (let i in params) {
        let ind = params[i].indexOf(":");
        params[i] = params[i].substr(0, ind);
        params[i] = params[i].trim() + ": $" + params[i].trim()
    }

    return params.toString();
};

const presentational = name => {
    return `
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import styled from 'styled-components'
import Container from '../Elements/Container'



class ${name} extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    styles = {

    };



    render() {

        return (
            <Container className="flex-column full-width justify-center align-center flex-grow">>

            </Container>
        )

    }
}

export default withRouter(${name})

`
};

const query = (name, queryName, returnValues, params) => {
    return `
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import styled from 'styled-components'
import Container from '../Elements/Container'
import {gql} from "apollo-boost/lib/index";
import {Query} from 'react-apollo'



class ${name} extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    styles = {

    };


    render() {

        return (
            <Query query={${changeCase.constantCase(queryName + "Query")}}>
                {({data, loading, error, refetch}) => {

                    if (loading) {
                        return (
                            <div>
                                <div>Loading ...</div>
                            </div>
                        )
                    }

                    if (error) {
                        return (
                            <div>
                                <div>An unexpected error occured.</div>
                            </div>
                        )
                    }

                    return (

                    )
                }}
            </Query>
        )

    }
}

const ${changeCase.constantCase(queryName + "Query")} = gql\`
    query ${changeCase.pascalCase(queryName)}(${params.split(",").map(p => "$" + p.trim()).join(",")}) {
        ${queryName}(${getParams(params)}) {
            ${returnValues}
        }
    }
\`;

export default withRouter(${name})

`
};

const mutation = (name, mutationName, returnValues, params) => {
    return `
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import styled from 'styled-components'
import Container from '../Elements/Container'
import {gql} from "apollo-boost/lib/index";
import {Mutation} from 'react-apollo'



class ${name} extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    styles = {

    };


    render() {

        return (
            <Mutation mutation={${changeCase.constantCase(mutationName + "Mutation")}}>
                {(${mutationName}, {data, loading, error}) => {
                    return (

                    )
                }}
            </Mutation>
        )

    }
}

const ${changeCase.constantCase(mutationName + "Mutation")} = gql\`
    mutation ${changeCase.pascalCase(mutationName)}(${params.split(",").map(p => "$" + p.trim()).join(",")}) {
        ${mutationName}(${getParams(params)}) {
            ${returnValues}
        }
    }
\`;

export default withRouter(${name})

`
};


let createComponent = (cmd) => {
    let content;
    if (!cmd.name || typeof cmd.name === "function") return console.log(chalk.red("You must input a name"));

    if (cmd.presentational || (!cmd.query && !cmd.mutation)) content = presentational(cmd.name);
    if (cmd.query) {
        content = query(cmd.name, cmd.query, cmd.returnValues, cmd.params);
    }

    if (cmd.mutation) {
        content = mutation(cmd.name, cmd.mutation, cmd.returnValues, cmd.params);
    }

    let filepath = `${cmd.name}.js`;

    fs.writeFile(filepath, content, (err) => {
        if (err) console.log(chalk.red(err));

        console.log(chalk.green("Good job. You have created a component."));
    });
}

program
    .version('0.0.1')
    .option('-n, --name <required>','Name of component')
    .option('-q, --query <required>','Creates a query component, name required')
    .option('-m, --mutation <required>','Creates a mutation component, name required')
    .option('-r, --return-values [optional]','Return values of query')
    .option('-p, --params [optional]','Parameters of query')
    .action(createComponent);

program.parse(process.argv);