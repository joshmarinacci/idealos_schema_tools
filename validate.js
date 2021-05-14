import fs from "fs"
import Ajv from "ajv"
// import draft6MetaSchema from "ajv/dist/refs/json-schema-draft-06.json"


async function doit() {
    const ajv = new Ajv()
    let ms = await fs.promises.readFile("node_modules/ajv/dist/refs/json-schema-draft-06.json")
    ajv.addMetaSchema(JSON.parse(ms.toString()))

    let schemas = [
        "app-schema.json",
        "apps-schema.json",
    ]
    let last_schema = null
    for(let sch of schemas) {
        let raw_text = await fs.promises.readFile(sch)
        let json = JSON.parse(raw_text.toString())
        ajv.addSchema(json)
        last_schema = json
    }

    let validate_apps_schema = ajv.compile(last_schema)

    let data = await fs.promises.readFile("apps.json")
    let data_json = JSON.parse(data.toString())
    let valid = validate_apps_schema(data_json)
    if(!valid) console.log("errors",validate_apps_schema.errors)
}
doit().then(()=>(""))
