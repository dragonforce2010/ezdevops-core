/**
 * Created by michael.zhang on 1/1/17.
 */
import {JsonMember, JsonObject} from "typedjson-npm/js/typed-json"

@JsonObject
export class Configuration {
    @JsonMember({type : String})
    project_name : string
    @JsonMember({type : String})
    deploy_mode : string
    @JsonMember({type : String})
    remote_ip : string
    @JsonMember({type : String})
    remote_username : string
    @JsonMember({type : String})
    deploy_tag: string
    @JsonMember({type: String})
    svn_rooturl: string
    // @JsonMember({type: Array})
    svn_projects: Array<string>
    @JsonMember({type: String})
    remote_path: string
    @JsonMember({type: String})
    theme_name: string
}