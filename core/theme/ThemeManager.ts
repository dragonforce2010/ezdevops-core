import {ITheme} from "./ITheme";
import {CatTheme} from "./CatTheme";
import {ConfigManager} from "../config/ConfigManager";
/**
 * Created by michael.zhang on 1/5/17.
 */
export class ThemeManager {
    private static instance: ThemeManager
    private themes: Array<ITheme>

    constructor() {
        this.themes = new Array<ITheme>()
    }

    public static getInstance(): ThemeManager {
        if(!this.instance) {
            this.instance = new ThemeManager()
        }
        return this.instance
    }

    public getCurrentTheme(): ITheme {
        let configuration = ConfigManager.getInstance().getConfiguration()
        let themeName = configuration.theme_name
        return new CatTheme()
    }
}