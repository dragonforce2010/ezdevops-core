/**
 * Created by michael.zhang on 1/1/17.
 */
"use strict";
/**
 * Created by michael.zhang on 1/1/17.
 */
const Docker = require("dockerode");
class DockerUtil {
    constructor() {
        this.docker = new Docker();
    }

    public printContainerIds() {
        this.docker.listContainers(err, function (err, containers) {
            containers.forEach(function (container) {
                console.log(container.Id)
            })
        })
    }
}
exports.DockerUtil = DockerUtil;